import ProjectCard from "../components/ProjectCard";
import { projects } from "../data/projects";

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

export default function Expertise() {
  return (
    <main className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-section-gap pt-32">
      <header className="mb-section-gap max-w-3xl">
        <h1 className="font-display-lg-mobile md:font-display-lg text-display-lg-mobile md:text-display-lg text-on-surface mb-stack-md">
          Selected Works
        </h1>
        <p className="font-body-lg text-body-lg text-on-surface-variant">
          Web apps and AI-integrated products — from internal inventory tools
          to village information systems.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-gutter gap-y-section-gap">
        {projects.map((p, i) => (
          <ProjectCard
            key={p.title}
            project={p}
            span={layout[i % layout.length].span}
            aspect={layout[i % layout.length].aspect}
            titleClass={layout[i % layout.length].titleClass}
            eager={i === 0}
          />
        ))}
      </div>

      <div className="mt-section-gap flex justify-center w-full">
        <button className="border border-primary/20 text-on-surface font-label-caps text-label-caps py-4 px-12 hover:border-primary transition-all duration-300 group flex items-center gap-2">
          Load More
          <span className="material-symbols-outlined text-[16px] group-hover:translate-y-1 transition-transform">
            arrow_downward
          </span>
        </button>
      </div>
    </main>
  );
}
