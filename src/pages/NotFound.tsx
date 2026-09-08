import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <main className="pt-32 pb-section-gap px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto text-center">
      <p className="font-label-caps text-label-caps text-on-surface-variant mb-stack-sm">
        404
      </p>
      <h1 className="font-headline-md text-headline-md text-primary mb-stack-md">
        This page chose silence.
      </h1>
      <Link
        to="/"
        className="inline-block font-label-caps text-label-caps bg-primary text-on-primary px-8 py-4 hover:bg-secondary hover:text-on-secondary transition-colors duration-300"
      >
        Back Home
      </Link>
    </main>
  );
}
