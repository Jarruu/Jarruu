import { useState } from "react";
import { Link, NavLink } from "react-router-dom";

const linkBase =
  "font-label-caps text-label-caps transition-colors duration-300";
const linkActive = "text-primary border-b border-primary pb-1";
const linkIdle = "text-on-surface-variant/70 hover:text-primary";

const links = [
  { to: "/", label: "Work", end: true },
  { to: "/expertise", label: "Expertise", end: false },
  { to: "/about", label: "About", end: false },
  { to: "/contact", label: "Contact", end: false },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 w-full z-50 bg-surface/80 backdrop-blur-md border-b border-on-surface/5 transition-all duration-300 ease-in-out">
      <div className="flex justify-between items-center h-20 px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
        <Link
          to="/"
          onClick={() => setOpen(false)}
          className="font-headline-sm text-headline-sm tracking-tighter text-on-surface"
        >
          Fajar
        </Link>
        <nav className="hidden md:flex space-x-8">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.end}
              className={({ isActive }) =>
                `${linkBase} ${isActive ? linkActive : linkIdle}`
              }
            >
              {l.label}
            </NavLink>
          ))}
        </nav>
        <Link
          to="/contact"
          className="hidden md:inline-block font-label-caps text-label-caps bg-primary text-on-primary px-6 py-3 hover:bg-secondary hover:text-on-secondary transition-colors duration-300 border border-primary hover:border-secondary"
        >
          Inquiry
        </Link>
        <button
          className="md:hidden text-on-surface"
          aria-label="Menu"
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
        >
          <span className="material-symbols-outlined">
            {open ? "close" : "menu"}
          </span>
        </button>
      </div>
      {open && (
        <nav className="md:hidden border-t border-on-surface/5 px-margin-mobile py-4 flex flex-col gap-4 bg-surface">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.end}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `${linkBase} ${isActive ? linkActive : linkIdle}`
              }
            >
              {l.label}
            </NavLink>
          ))}
          <Link
            to="/contact"
            onClick={() => setOpen(false)}
            className="font-label-caps text-label-caps bg-primary text-on-primary px-6 py-3 text-center"
          >
            Inquiry
          </Link>
        </nav>
      )}
    </header>
  );
}
