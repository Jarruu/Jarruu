import { socials } from "../data/socials";

const linkCls =
  "font-body-md text-body-md text-on-surface hover:text-secondary transition-colors flex items-center gap-3";

export default function Footer() {
  return (
    <footer className="bg-surface border-t border-on-surface/10 w-full py-stack-lg">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-gutter px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
        <div className="col-span-1 lg:col-span-2 flex flex-col justify-between h-full">
          <div className="font-headline-sm text-headline-sm text-primary mb-stack-md">
            Fajar
          </div>
          <div className="font-body-md text-body-md text-on-surface opacity-80 mt-auto">
            © 2026 Rahmat Fajar Saputra. All rights reserved.
          </div>
        </div>
        <div className="col-span-1 flex flex-col gap-4">
          {socials.slice(0, 2).map(({ label, href, Icon }) => (
            <a
              key={label}
              className={linkCls}
              href={href}
              target={href.startsWith("mailto:") ? undefined : "_blank"}
              rel="noopener noreferrer"
            >
              <Icon />
              {label}
            </a>
          ))}
        </div>
        <div className="col-span-1 flex flex-col gap-4">
          {socials.slice(2).map(({ label, href, Icon }) => (
            <a
              key={label}
              className={linkCls}
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
    </footer>
  );
}
