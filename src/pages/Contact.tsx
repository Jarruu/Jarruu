import { useState, type FormEvent } from "react";
import { ArrowForwardIcon, MailIcon, WhatsappIcon } from "../components/icons";
import { socials } from "../data/socials";
import usePageTitle from "../hooks/usePageTitle";

const initialForm = {
  firstName: "",
  lastName: "",
  email: "",
  subject: "",
  message: "",
};

// Isi VITE_CONTACT_ENDPOINT di .env dengan URL layanan form (mis. Formspree/Web3Forms)
// untuk pengiriman langsung. Kosong = fallback mailto yang jujur (buka aplikasi email).
const EMAIL = "fajar.saputra2907@gmail.com";
const ENDPOINT = import.meta.env.VITE_CONTACT_ENDPOINT as string | undefined;
type Status = "idle" | "sending" | "sent" | "error";

type FieldProps = {
  id: keyof typeof initialForm;
  label: string;
  value: string;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  type?: string;
  textarea?: boolean;
};

function Field({ id, label, value, onChange, type = "text", textarea }: FieldProps) {
  const cls =
    "input-underline w-full font-body-lg text-body-lg text-primary block placeholder-transparent";
  return (
    <div className={`relative pt-6 ${textarea ? "textarea-container h-48" : ""}`}>
      {textarea ? (
        <textarea
          id={id}
          name={id}
          placeholder=" "
          required
          value={value}
          onChange={onChange}
          className={`${cls} h-full resize-none`}
        />
      ) : (
        <input
          id={id}
          name={id}
          type={type}
          placeholder=" "
          required
          value={value}
          onChange={onChange}
          className={cls}
        />
      )}
      <label
        htmlFor={id}
        className="floating-label font-label-caps text-label-caps text-on-surface-variant"
      >
        {label}
      </label>
    </div>
  );
}

export default function Contact() {
  usePageTitle("Contact | Rahmat Fajar Saputra");

  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState<Status>("idle");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    setForm((f) => ({ ...f, [id]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (status === "sending") return;
    const subject = `${form.subject ? `[${form.subject}] ` : ""}Portfolio inquiry from ${form.firstName} ${form.lastName}`.trim();
    const body =
      `${form.message}\n\n${form.firstName} ${form.lastName} <${form.email}>`.trim();
    if (!ENDPOINT) {
      window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      setStatus("sent");
      return;
    }
    setStatus("sending");
    try {
      const res = await fetch(ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      setStatus("sent");
      setForm(initialForm);
    } catch {
      setStatus("error");
    }
  };

  return (
    <main className="flex-grow pt-[120px] pb-section-gap px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto w-full">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter">
        <div className="lg:col-span-12 mb-stack-lg">
          <h1 className="font-display-lg-mobile md:font-display-lg text-display-lg-mobile md:text-display-lg text-primary mb-stack-sm">
            Let&apos;s Work Together
          </h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl">
            Open for internships, freelance work, and AI projects.
            Tell me about your project through the form below, or reach me
            directly by email or WhatsApp.
          </p>
        </div>

        <div className="lg:col-span-7 pr-0 lg:pr-gutter mb-stack-lg lg:mb-0">
          <form
            onSubmit={handleSubmit}
            className="space-y-stack-md bg-surface p-4 md:p-8 border border-outline-variant/20 rounded-xl relative overflow-hidden"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-stack-md">
              <Field id="firstName" label="FIRST NAME" value={form.firstName} onChange={handleChange} />
              <Field id="lastName" label="LAST NAME" value={form.lastName} onChange={handleChange} />
            </div>
            <Field id="email" label="EMAIL ADDRESS" type="email" value={form.email} onChange={handleChange} />
            <Field id="subject" label="SUBJECT" value={form.subject} onChange={handleChange} />
            <Field id="message" label="YOUR MESSAGE" textarea value={form.message} onChange={handleChange} />
            <div className="pt-stack-sm flex justify-end items-center gap-4">
              {status === "sent" && (
                <p className="font-body-md text-body-md text-secondary">
                  {ENDPOINT
                    ? "Message sent. I'll get back to you soon."
                    : "Opening your email app. Press send to deliver your message."}
                </p>
              )}
              {status === "error" && (
                <p className="font-body-md text-body-md text-error">
                  Couldn&apos;t send the message. Please email me directly
                  instead.
                </p>
              )}
              <button
                className="bg-primary text-on-primary font-label-caps text-label-caps px-8 py-4 rounded-DEFAULT hover:bg-secondary hover:text-on-secondary transition-all duration-300 flex items-center space-x-2 disabled:opacity-60 disabled:cursor-not-allowed"
                type="submit"
                disabled={status === "sending"}
              >
                <span>{status === "sending" ? "SENDING..." : "SEND MESSAGE"}</span>
                <ArrowForwardIcon className="w-4 h-4" />
              </button>
            </div>
          </form>
        </div>

        <div className="lg:col-span-5 flex flex-col justify-between">
          <div className="space-y-stack-lg">
            <div className="border-b border-on-surface/10 pb-stack-md">
              <h3 className="font-headline-sm text-headline-sm text-primary mb-stack-sm">
                Based In
              </h3>
              <p className="font-body-md text-body-md text-on-surface-variant">
                Padang,
                <br />
                Sumatera Barat,
                <br />
                Indonesia
              </p>
            </div>
            <div className="border-b border-on-surface/10 pb-stack-md">
              <h3 className="font-headline-sm text-headline-sm text-primary mb-stack-sm">
                Direct Line
              </h3>
              <div className="space-y-2">
                <a
                  className="font-body-md text-body-md text-on-surface hover:text-secondary transition-colors flex items-center gap-3"
                  href={`mailto:${EMAIL}`}
                >
                  <MailIcon />
                  {EMAIL}
                </a>
                <a
                  className="font-body-md text-body-md text-on-surface hover:text-secondary transition-colors flex items-center gap-3"
                  href="https://wa.me/62895600077007"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <WhatsappIcon />
                  +62 895-6000-77007
                </a>
              </div>
            </div>
            <div>
              <h3 className="font-headline-sm text-headline-sm text-primary mb-stack-sm">
                Network
              </h3>
              <div className="flex space-x-6">
                {socials.slice(0, 3).map(({ label, href, Icon }) => (
                  <a
                    key={label}
                    className="font-label-caps text-label-caps text-on-surface hover:text-secondary transition-colors flex items-center gap-2 border-b border-transparent hover:border-secondary pb-1 uppercase"
                    href={href}
                    target={href.startsWith("mailto:") ? undefined : "_blank"}
                    rel="noopener noreferrer"
                  >
                    <Icon />
                    {label}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
