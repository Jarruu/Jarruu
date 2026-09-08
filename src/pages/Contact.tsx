import { useState, type FormEvent } from "react";
import {
  LinkedinIcon,
  InstagramIcon,
  WhatsappIcon,
  MailIcon,
} from "../components/icons";

const initialForm = {
  firstName: "",
  lastName: "",
  email: "",
  subject: "",
  message: "",
};

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
          placeholder=" "
          value={value}
          onChange={onChange}
          className={`${cls} h-full resize-none`}
        />
      ) : (
        <input
          id={id}
          type={type}
          placeholder=" "
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

const socials = [
  {
    label: "LINKEDIN",
    href: "https://www.linkedin.com/in/rahmat-fajar-saputra-90690a287/",
    Icon: LinkedinIcon,
  },
  {
    label: "INSTAGRAM",
    href: "https://www.instagram.com/jaarruu_",
    Icon: InstagramIcon,
  },
  {
    label: "WHATSAPP",
    href: "https://wa.me/62895600077007",
    Icon: WhatsappIcon,
  },
];

export default function Contact() {
  const [form, setForm] = useState(initialForm);
  const [sent, setSent] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    setForm((f) => ({ ...f, [id]: value }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <main className="flex-grow pt-[120px] pb-section-gap px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto w-full">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter">
        <div className="lg:col-span-12 mb-stack-lg">
          <h1 className="font-display-lg-mobile md:font-display-lg text-display-lg-mobile md:text-display-lg text-primary mb-stack-sm">
            Initiate Dialogue
          </h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl">
            For inquiries regarding executive representation, strategic
            consultations, or media engagements, please use the form below.
            Discretion is assured.
          </p>
        </div>

        <div className="lg:col-span-7 pr-0 lg:pr-gutter mb-stack-lg lg:mb-0">
          <form
            onSubmit={handleSubmit}
            className="space-y-stack-md bg-surface p-8 border border-outline-variant/20 rounded-xl relative overflow-hidden group"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-surface-container-highest/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-stack-md">
              <Field id="firstName" label="FIRST NAME" value={form.firstName} onChange={handleChange} />
              <Field id="lastName" label="LAST NAME" value={form.lastName} onChange={handleChange} />
            </div>
            <Field id="email" label="EMAIL ADDRESS" type="email" value={form.email} onChange={handleChange} />
            <Field id="subject" label="INQUIRY TYPE" value={form.subject} onChange={handleChange} />
            <Field id="message" label="YOUR MESSAGE" textarea value={form.message} onChange={handleChange} />
            <div className="pt-stack-sm flex justify-end items-center gap-4">
              {sent && (
                <p className="font-body-md text-body-md text-secondary">
                  Inquiry received — discretion assured.
                </p>
              )}
              <button
                className="bg-primary text-on-primary font-label-caps text-label-caps px-8 py-4 rounded-DEFAULT hover:bg-secondary hover:text-on-secondary transition-all duration-300 flex items-center space-x-2"
                type="submit"
              >
                <span>SEND INQUIRY</span>
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </button>
            </div>
          </form>
        </div>

        <div className="lg:col-span-5 flex flex-col justify-between">
          <div className="space-y-stack-lg">
            <div className="border-b border-on-surface/10 pb-stack-md">
              <h3 className="font-headline-sm text-headline-sm text-primary mb-stack-sm">
                Headquarters
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
                  href="mailto:fajar.saputra2907@gmail.com"
                >
                  <MailIcon />
                  fajar.saputra2907@gmail.com
                </a>
                <a
                  className="font-body-md text-body-md text-on-surface hover:text-secondary transition-colors flex items-center gap-3"
                  href="https://wa.me/62895600077007"
                  target="_blank"
                  rel="noreferrer"
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
                {socials.map(({ label, href, Icon }) => (
                  <a
                    key={label}
                    className="font-label-caps text-label-caps text-on-surface hover:text-secondary transition-colors flex items-center gap-2 border-b border-transparent hover:border-secondary pb-1"
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <Icon />
                    {label}
                  </a>
                ))}
              </div>
            </div>
          </div>
          <div className="mt-stack-lg lg:mt-auto hidden lg:block overflow-hidden rounded-xl h-64 relative group">
            <img
              alt="New York office architecture"
              loading="lazy"
              className="w-full h-full object-cover grayscale opacity-80 group-hover:scale-105 group-hover:opacity-100 transition-all duration-700"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAdxdRj2C7TNwKmXibcEAXuyaS7SFiPaJQksQ4DDxjBWCpkYhxXFqsG404jRzZJW1GvtU5wfQX_548VVA_yCyzIpayrv--7CN0epMsYyY2R9VYAeRD9AknDOKFVoed1Kc3BVa6x-4Y02-RUGtxLsi7cWwSl37VUdk_fWt0jFOgx5hm6uJXpontrHoNhuERJXBEYqF588EzQwLjG_EQ2Z4oI21UY9zMNqf2CzFwD2TAa0vMbJ50LjLL4Qw"
            />
            <div className="absolute inset-0 border border-on-surface/10 rounded-xl pointer-events-none" />
          </div>
        </div>
      </div>
    </main>
  );
}
