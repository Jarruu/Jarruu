import { useEffect, useRef, useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../lib/supabase";
import type { Project } from "../data/projects";
import {
  createProject,
  deleteProject,
  loadProjects,
  updateProject,
} from "../data/projectStore";
import usePageTitle from "../hooks/usePageTitle";

type Draft = Omit<Project, "id">;

const CATEGORIES = ["Website", "Aplikasi", "UI/UX", "3D Design"] as const;

const THIS_YEAR = new Date().getFullYear();
// ponytail: dropdown tahun cukup, lib kalender overkill untuk tahun saja
const YEARS = Array.from(
  { length: THIS_YEAR + 1 - 2000 + 1 },
  (_, i) => String(THIS_YEAR + 1 - i),
);

const empty: Draft = {
  title: "",
  category: "Website",
  year: String(new Date().getFullYear()),
  desc: "",
  image: "",
  github: "",
  demo: "",
};

const shell =
  "pt-[120px] pb-section-gap px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto w-full";
const inputCls =
  "input-underline w-full font-body-md text-body-md text-primary block bg-transparent";
const labelCls =
  "font-label-caps text-label-caps text-on-surface-variant";
const primaryBtn =
  "bg-primary text-on-primary font-label-caps text-label-caps px-8 py-4 hover:bg-secondary hover:text-on-secondary transition-colors duration-300 disabled:opacity-60 disabled:cursor-not-allowed";

function FieldSelect({
  value,
  options,
  onChange,
}: {
  value: string;
  options: readonly string[];
  onChange: (v: string) => void;
}) {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative">
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
        onKeyDown={(e) => {
          if (e.key === "Escape") setOpen(false);
        }}
        className={`${inputCls} flex items-center justify-between gap-4 cursor-pointer text-left`}
      >
        <span>{value}</span>
        <svg
          aria-hidden="true"
          className={`h-4 w-4 shrink-0 text-on-surface-variant transition-transform duration-300 ${open ? "rotate-180" : ""}`}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </button>
      {open && (
        <>
          <button
            type="button"
            aria-hidden="true"
            tabIndex={-1}
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-10 cursor-default"
          />
          <ul
            role="listbox"
            className="absolute left-0 right-0 top-full z-20 mt-2 max-h-60 overflow-auto bg-surface border border-outline-variant/20 rounded-xl"
          >
            {options.map((c) => (
              <li key={c}>
                <button
                  type="button"
                  role="option"
                  aria-selected={value === c}
                  onClick={() => {
                    onChange(c);
                    setOpen(false);
                  }}
                  className={`block w-full text-left px-4 py-3 font-body-md text-body-md transition-colors hover:bg-surface-container-low ${value === c ? "text-primary bg-surface-container-low" : "text-on-surface-variant"}`}
                >
                  {c}
                </button>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}

export default function Admin() {
  usePageTitle("Admin | Rahmat Fajar Saputra", { noindex: true });
  const [session, setSession] = useState<boolean | null>(null);
  const [list, setList] = useState<Project[]>([]);
  const [form, setForm] = useState<Draft>(empty);
  const [editId, setEditId] = useState<string | null>(null);
  const [pendingDelete, setPendingDelete] = useState<Project | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!supabase) {
      setSession(false);
      return;
    }
    supabase.auth.getSession().then(({ data }) => setSession(!!data.session));
    const { data: sub } = supabase.auth.onAuthStateChange((_event, s) => {
      setSession(!!s);
    });
    return () => {
      sub.subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (!session) return;
    let on = true;
    setLoading(true);
    setError("");
    loadProjects()
      .then((p) => {
        if (on) setList(p);
      })
      .catch((e: unknown) => {
        if (on) setError(e instanceof Error ? e.message : "Gagal memuat.");
      })
      .finally(() => {
        if (on) setLoading(false);
      });
    return () => {
      on = false;
    };
  }, [session]);

  useEffect(() => {
    if (!pendingDelete) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setPendingDelete(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [pendingDelete]);

  const refresh = async () => {
    setList(await loadProjects());
  };

  const storagePathFromUrl = (url: string) => {
    const m = url.split("/project-images/");
    return m.length > 1 ? m[1].split("?")[0] : null;
  };

  const uploadImage = async (file: File) => {
    if (!supabase) throw new Error("Penyimpanan online belum disambungkan.");
    const ext = file.name.split(".").pop()?.toLowerCase() || "webp";
    const path = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
    const { error } = await supabase.storage
      .from("project-images")
      .upload(path, file, { cacheControl: "3600", upsert: false });
    if (error) throw error;
    return supabase.storage.from("project-images").getPublicUrl(path).data
      .publicUrl;
  };

  const handlePickFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    if (!f.type.startsWith("image/")) {
      setError("File harus berupa gambar.");
      return;
    }
    if (f.size > 2 * 1024 * 1024) {
      setError("Maksimal 2MB.");
      return;
    }
    setError("");
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setImageFile(f);
    setPreviewUrl(URL.createObjectURL(f));
  };

  const clearImage = () => {
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setImageFile(null);
    setPreviewUrl("");
    setForm((f) => ({ ...f, image: "" }));
    if (fileRef.current) fileRef.current.value = "";
  };

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    if (!supabase) return;
    setSaving(true);
    setError("");
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    setSaving(false);
    if (error) setError(error.message);
  };

  const bind =
    (key: keyof Draft) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setForm((f) => ({ ...f, [key]: e.target.value }));
    };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    try {
      const oldImage = editId !== null ? list.find((p) => p.id === editId)?.image : undefined;
      let imageUrl = form.image;
      if (imageFile) imageUrl = await uploadImage(imageFile);
      const payload = { ...form, image: imageUrl };
      if (editId === null) await createProject(payload);
      else {
        await updateProject(editId, payload);
        // ponytail: hapus file lama agar tak jadi orphan, abaikan bila gagal
        const oldPath = oldImage ? storagePathFromUrl(oldImage) : null;
        const newPath = storagePathFromUrl(imageUrl);
        if (oldPath && oldPath !== newPath)
          await supabase?.storage.from("project-images").remove([oldPath]);
      }
      await refresh();
      setForm(empty);
      setEditId(null);
      setImageFile(null);
      if (previewUrl) URL.revokeObjectURL(previewUrl);
      setPreviewUrl("");
      window.scrollTo({ top: 0 });
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Gagal menyimpan.");
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (project: Project) => {
    if (!project.id) return;
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setImageFile(null);
    setPreviewUrl("");
    setForm({
      title: project.title,
      category: project.category,
      year: project.year,
      desc: project.desc,
      image: project.image,
      github: project.github ?? "",
      demo: project.demo ?? "",
    });
    setEditId(project.id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = (project: Project) => {
    if (!project.id) return;
    setPendingDelete(project);
  };

  const confirmDelete = async () => {
    const id = pendingDelete?.id;
    if (!id) return;
    setDeleting(true);
    setError("");
    try {
      await deleteProject(id);
      const oldPath = pendingDelete?.image
        ? storagePathFromUrl(pendingDelete.image)
        : null;
      if (oldPath)
        await supabase?.storage.from("project-images").remove([oldPath]);
      setList(await loadProjects());
      if (editId === id) {
        setForm(empty);
        setEditId(null);
        setImageFile(null);
        if (previewUrl) URL.revokeObjectURL(previewUrl);
        setPreviewUrl("");
      }
      setPendingDelete(null);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Gagal menghapus.");
    } finally {
      setDeleting(false);
    }
  };

  if (!supabase) {
    return (
      <main className={shell}>
        <h1 className="font-headline-md text-headline-md text-primary mb-stack-sm">
          Admin
        </h1>
        <p className="font-body-md text-body-md text-on-surface-variant max-w-2xl mb-stack-lg">
          Sambungkan penyimpanan online dulu: isi alamat dan kunci di file
          .env (lihat contoh di .env.example), lalu jalankan ulang.
        </p>
        <Link to="/" className="text-underline-hover">
          ← Beranda
        </Link>
      </main>
    );
  }

  if (session === null) {
    return (
      <main className={shell}>
        <p className="font-body-md text-body-md text-on-surface-variant">
          Memeriksa login...
        </p>
      </main>
    );
  }

  if (!session) {
    return (
      <main className={shell}>
        <p className="font-label-caps text-label-caps text-on-surface-variant mb-stack-sm uppercase tracking-widest">
          <Link to="/" className="text-underline-hover">
            ← Beranda
          </Link>
        </p>
        <h1 className="font-headline-md text-headline-md text-primary mb-stack-lg">
          Masuk Pengelola
        </h1>
        <form
          onSubmit={handleLogin}
          className="bg-surface p-4 md:p-8 border border-outline-variant/20 rounded-xl space-y-stack-md max-w-md"
        >
          <label className="block">
            <span className={labelCls}>Email</span>
            <input
              className={inputCls}
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>
          <label className="block">
            <span className={labelCls}>Password</span>
            <input
              className={inputCls}
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
          {error && (
            <p className="font-body-md text-body-md text-error">{error}</p>
          )}
          <button className={primaryBtn} type="submit" disabled={saving}>
            {saving ? "MASUK..." : "MASUK"}
          </button>
        </form>
      </main>
    );
  }

  return (
    <main className={shell}>
      <div className="flex justify-between items-center mb-stack-sm">
        <p className="font-label-caps text-label-caps text-on-surface-variant uppercase tracking-widest">
          <Link to="/" className="text-underline-hover">
            ← Beranda
          </Link>
        </p>
        <button
          className="font-label-caps text-label-caps text-on-surface-variant hover:text-primary transition-colors"
          type="button"
          onClick={() => void supabase?.auth.signOut()}
        >
          KELUAR
        </button>
      </div>
      <h1 className="font-headline-md text-headline-md text-primary mb-stack-sm">
        {editId === null ? "Tambah Proyek" : "Ubah Proyek"}
      </h1>
      <p className="font-body-md text-body-md text-on-surface-variant max-w-2xl mb-stack-lg">
        Tersimpan otomatis dan langsung tampil di website. Pilih gambar untuk pratinjau, gambar terkirim saat Tambah/Simpan.
      </p>
      {error && (
        <p className="font-body-md text-body-md text-error mb-stack-md">
          {error}
        </p>
      )}

      <form
        onSubmit={handleSubmit}
        className="bg-surface p-4 md:p-8 border border-outline-variant/20 rounded-xl space-y-stack-md mb-stack-lg"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-stack-md">
          <label className="block">
            <span className={labelCls}>Judul *</span>
            <input
              className={inputCls}
              value={form.title}
              onChange={bind("title")}
              required
            />
          </label>
          <div className="block">
            <span className={labelCls}>Kategori</span>
            <FieldSelect
              value={form.category}
              options={CATEGORIES}
              onChange={(v) => setForm((f) => ({ ...f, category: v }))}
            />
          </div>
          <div className="block">
            <span className={labelCls}>Tahun</span>
            <FieldSelect
              value={form.year}
              options={
                YEARS.includes(form.year) ? YEARS : [form.year, ...YEARS]
              }
              onChange={(v) => setForm((f) => ({ ...f, year: v }))}
            />
          </div>
          <div className="block">
            <span className={labelCls}>Gambar</span>
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              onChange={handlePickFile}
              className="mt-2 block text-sm text-on-surface-variant file:mr-4 file:py-2 file:px-4 file:border file:border-primary/20 file:bg-transparent file:font-label-caps file:text-label-caps file:text-on-surface hover:file:border-primary file:cursor-pointer"
            />
            {(previewUrl || form.image) && (
              <div className="relative mt-3 inline-block">
                <img
                  src={previewUrl || form.image}
                  alt="Preview"
                  className="h-32 w-auto rounded-lg border border-on-surface/10 object-cover"
                />
                <button
                  type="button"
                  onClick={clearImage}
                  aria-label="Hapus gambar"
                  className="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full bg-error text-on-error hover:opacity-90 transition-opacity"
                >
                  <svg
                    aria-hidden="true"
                    className="h-3.5 w-3.5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                  >
                    <path d="M18 6 6 18M6 6l12 12" />
                  </svg>
                </button>
              </div>
            )}
            {!imageFile && editId !== null && (
              <p className="mt-1 text-xs text-on-surface-variant">Kosongkan bila tidak ganti gambar.</p>
            )}
          </div>
        </div>
        <label className="block">
          <span className={labelCls}>Deskripsi *</span>
          <textarea
            className={`${inputCls} h-24 resize-none`}
            value={form.desc}
            onChange={bind("desc")}
            required
          />
        </label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-stack-md">
          <label className="block">
            <span className={labelCls}>Tautan Kode Sumber</span>
            <input
              className={inputCls}
              value={form.github ?? ""}
              onChange={bind("github")}
              placeholder="https://..."
            />
          </label>
          <label className="block">
            <span className={labelCls}>Tautan Website Jadi</span>
            <input
              className={inputCls}
              value={form.demo ?? ""}
              onChange={bind("demo")}
              placeholder="https://..."
            />
          </label>
        </div>
        <div className="flex flex-wrap gap-4">
          <button className={primaryBtn} type="submit" disabled={saving}>
            {saving ? "MENYIMPAN..." : editId === null ? "TAMBAH" : "SIMPAN"}
          </button>
          {editId !== null && (
            <button
              className="font-label-caps text-label-caps border border-primary/20 text-on-surface px-8 py-4 hover:border-primary transition-colors duration-300"
              type="button"
              onClick={() => {
                setForm(empty);
                setEditId(null);
                setImageFile(null);
                if (previewUrl) URL.revokeObjectURL(previewUrl);
                setPreviewUrl("");
              }}
            >
              BATAL
            </button>
          )}
        </div>
      </form>

      <div className="mb-stack-md border-b border-on-surface/10 pb-4">
        <h2 className="font-headline-sm text-headline-sm text-primary">
          Daftar Proyek ({list.length})
        </h2>
      </div>
      {loading ? (
        <ul aria-busy="true" className="space-y-4">
          {[0, 1, 2].map((i) => (
            <li
              key={i}
              aria-hidden="true"
              className="bg-surface border border-outline-variant/20 rounded-xl p-4 flex gap-4 items-center animate-pulse"
            >
              <div className="h-20 w-28 shrink-0 rounded-lg bg-surface-container" />
              <div className="flex-1 space-y-2">
                <div className="h-5 w-1/3 bg-surface-container rounded-sm" />
                <div className="h-3 w-24 bg-surface-container rounded-sm" />
                <div className="h-4 w-full bg-surface-container rounded-sm" />
              </div>
            </li>
          ))}
        </ul>
      ) : list.length === 0 ? (
        <p className="font-body-md text-body-md text-on-surface-variant py-8">
          Belum ada project.
        </p>
      ) : (
        <ul className="space-y-4">
          {list.map((p, i) => (
            <li
              key={p.id ?? `${p.title}-${i}`}
              className={`bg-surface border border-outline-variant/20 rounded-xl p-4 flex flex-col sm:flex-row gap-4 sm:items-center ${editId === p.id ? "border-primary/40" : ""}`}
            >
              {p.image ? (
                <img
                  src={p.image}
                  alt={p.title}
                  loading="lazy"
                  className="h-20 w-full sm:w-28 shrink-0 rounded-lg border border-on-surface/10 object-cover"
                />
              ) : (
                <div
                  aria-hidden="true"
                  className="h-20 w-full sm:w-28 shrink-0 rounded-lg border border-on-surface/10 bg-surface-container flex items-center justify-center font-label-caps text-label-caps text-on-surface-variant"
                >
                  {p.category}
                </div>
              )}
              <div className="min-w-0 flex-1">
                <h3 className="font-headline-sm text-headline-sm text-primary truncate">
                  {p.title}
                </h3>
                <p className="font-label-caps text-label-caps text-on-surface-variant">
                  {p.category} · {p.year}
                </p>
                <p className="font-body-md text-body-md text-on-surface-variant line-clamp-2 mt-1">
                  {p.desc}
                </p>
              </div>
              <div className="flex shrink-0 gap-6 sm:flex-col lg:flex-row">
                <button
                  className="font-label-caps text-label-caps text-on-surface hover:text-secondary transition-colors py-2"
                  type="button"
                  onClick={() => handleEdit(p)}
                >
                  UBAH
                </button>
                <button
                  className="font-label-caps text-label-caps text-on-surface hover:text-error transition-colors py-2"
                  type="button"
                  onClick={() => handleDelete(p)}
                >
                  HAPUS
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
      {pendingDelete && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-primary/50 px-margin-mobile"
          onClick={() => setPendingDelete(null)}
        >
          <div
            role="alertdialog"
            aria-modal="true"
            aria-label="Konfirmasi hapus"
            className="bg-surface border border-on-surface/10 rounded-xl p-8 w-full max-w-sm"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="font-headline-sm text-headline-sm text-primary mb-stack-sm">
              Hapus proyek?
            </h3>
            <p className="font-body-md text-body-md text-on-surface-variant mb-stack-lg">
              &quot;{pendingDelete.title}&quot; akan dihapus permanen.
            </p>
            <div className="flex flex-wrap gap-4">
              <button
                className="font-label-caps text-label-caps border border-primary/20 text-on-surface px-8 py-4 hover:border-primary transition-colors duration-300 disabled:opacity-60"
                type="button"
                disabled={deleting}
                onClick={() => setPendingDelete(null)}
              >
                BATAL
              </button>
              <button
                className="bg-error text-on-error font-label-caps text-label-caps px-8 py-4 hover:opacity-90 transition-opacity disabled:opacity-60 disabled:cursor-not-allowed"
                type="button"
                disabled={deleting}
                onClick={() => void confirmDelete()}
              >
                {deleting ? "MENGHAPUS..." : "HAPUS"}
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
