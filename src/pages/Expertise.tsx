import { useEffect, useMemo, useState } from "react";
import ProjectCard from "../components/ProjectCard";
import ProjectSkeleton from "../components/ProjectSkeleton";
import usePageTitle from "../hooks/usePageTitle";
import useProjects from "../hooks/useProjects";

const layout = [
  {
    span: "col-span-1 lg:col-span-8",
    aspect: "aspect-video",
    titleClass: "font-headline-md text-headline-md",
  },
  {
    span: "col-span-1 lg:col-span-4 lg:mt-section-gap",
    aspect: "aspect-video",
    titleClass: "font-headline-sm text-headline-sm",
  },
  {
    span: "col-span-1 lg:col-span-6",
    aspect: "aspect-video",
    titleClass: "font-headline-sm text-headline-sm",
  },
  {
    span: "col-span-1 lg:col-span-6",
    aspect: "aspect-video",
    titleClass: "font-headline-sm text-headline-sm",
  },
];

const description =
  "Websites, apps, interfaces, and 3D work, from company tools to public-facing products.";

/** Kartu terakhir yang sebatang kara ditengahkan selebar wajarnya. */
function slot(i: number, total: number) {
  const base = layout[i % layout.length];
  if (i !== total - 1) return base;
  if (i % layout.length === 0)
    return { ...base, span: "col-span-1 lg:col-span-8 lg:col-start-3" };
  if (i % layout.length === 2)
    return { ...base, span: "col-span-1 lg:col-span-6 lg:col-start-4" };
  return base;
}

const focalFor = (category: string) =>
  category === "3D Design" || category === "UI/UX"
    ? "object-center"
    : "object-top";

export default function Expertise() {
  usePageTitle("Selected Works | Rahmat Fajar Saputra");
  const { list, loading } = useProjects();
  const [filter, setFilter] = useState("Semua");
  const cats = useMemo(
    () => ["Semua", ...Array.from(new Set(list.map((p) => p.category)))],
    [list],
  );
  const active = cats.includes(filter) ? filter : "Semua";
  const shown =
    active === "Semua" ? list : list.filter((p) => p.category === active);

  useEffect(() => {
    const setTag = (
      attr: "name" | "property",
      key: string,
      value: string
    ) => {
      const selector = `meta[${attr}="${key}"]`;
      let tag = document.querySelector(selector);
      if (!tag) {
        tag = document.createElement("meta");
        tag.setAttribute(attr, key);
        document.head.appendChild(tag);
      }
      tag.setAttribute("content", value);
    };

    setTag("name", "description", description);
    setTag("property", "og:title", "Selected Works | Rahmat Fajar Saputra");
    setTag("property", "og:description", description);
    setTag("property", "og:type", "website");
    setTag("property", "og:url", window.location.href);

    const ld = {
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: "Selected Works",
      itemListElement: list.map((p, i) => ({
        "@type": "CreativeWork",
        position: i + 1,
        name: p.title,
        description: p.desc,
        image: p.image,
        url: p.demo || p.github,
      })),
    };

    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.innerHTML = JSON.stringify(ld);
    script.setAttribute("data-expertise-ld", "true");
    document.head.appendChild(script);

    return () => {
      document.querySelector('script[data-expertise-ld]')?.remove();
    };
  }, [list]);

  return (
    <main className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-section-gap pt-32">
      <section aria-labelledby="works-heading">
        <header className="mb-stack-lg md:mb-section-gap max-w-3xl" id="works-heading">
          <h1 className="font-display-lg-mobile md:font-display-lg text-display-lg-mobile md:text-display-lg text-on-surface mb-stack-md">
            Selected Works
          </h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant">
            {description}
          </p>
        </header>

        <div
          role="group"
          aria-label="Filter kategori"
          className="flex flex-wrap gap-3 mb-stack-lg"
        >
          {cats.map((c) => (
            <button
              key={c}
              type="button"
              aria-pressed={active === c}
              onClick={() => setFilter(c)}
              className={`font-label-caps text-label-caps px-4 py-2 border transition-colors duration-300 ${active === c ? "bg-primary text-on-primary border-primary" : "text-on-surface-variant border-on-surface/15 hover:text-primary hover:border-primary"}`}
            >
              {c}
            </button>
          ))}
        </div>

        <div
          aria-busy={loading}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-gutter gap-y-stack-lg"
        >
          {loading ? (
            layout.map((l, i) => (
              <ProjectSkeleton key={i} span={l.span} aspect={l.aspect} />
            ))
          ) : shown.length === 0 ? (
            <p className="font-body-md text-body-md text-on-surface-variant col-span-full">
              {list.length === 0
                ? "Belum ada proyek."
                : `Belum ada proyek di kategori ${active}.`}
            </p>
          ) : (
            shown.map((p, i) => {
              const s = slot(i, shown.length);
              return (
                <ProjectCard
                  key={p.id ?? p.title}
                  project={p}
                  span={s.span}
                  aspect={s.aspect}
                  titleClass={s.titleClass}
                  focal={focalFor(p.category)}
                  eager={i === 0}
                />
              );
            })
          )}
        </div>
      </section>
    </main>
  );
}
