import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { CloseIcon, MenuIcon } from "./icons";

const linkBase =
  "font-label-caps text-label-caps transition-colors duration-300";
const linkActive = "text-primary border-b border-primary pb-1";
const linkIdle = "text-on-surface-variant/70 hover:text-primary";

const links = [
  { to: "/", label: "Work", end: true },
  { to: "/expertise", label: "Expertise", end: false },
  { to: "/about", label: "About", end: false },
];

function NavLinkList({ onNavigate }: { onNavigate?: () => void }) {
  return links.map((l) => (
    <NavLink
      key={l.to}
      to={l.to}
      end={l.end}
      onClick={onNavigate}
      className={({ isActive }) =>
        `${linkBase} ${isActive ? linkActive : linkIdle}`
      }
    >
      {l.label}
    </NavLink>
  ));
}

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
          <NavLinkList />
        </nav>
        <Link
          to="/contact"
          className="hidden md:inline-block font-label-caps text-label-caps bg-primary text-on-primary px-6 py-3 hover:bg-secondary hover:text-on-secondary transition-colors duration-300 border border-primary hover:border-secondary"
        >
          Contact
        </Link>
        <button
          className="md:hidden text-on-surface p-2 -m-2"
          aria-label="Menu"
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
        >
          {open ? <CloseIcon className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
        </button>
      </div>
      {open && (
        <nav className="md:hidden border-t border-on-surface/5 px-margin-mobile py-4 flex flex-col gap-4 bg-surface">
          <NavLinkList onNavigate={() => setOpen(false)} />
          <Link
            to="/contact"
            onClick={() => setOpen(false)}
            className="font-label-caps text-label-caps bg-primary text-on-primary px-6 py-3 text-center"
          >
            Contact
          </Link>
        </nav>
      )}
    </header>
  );
}
