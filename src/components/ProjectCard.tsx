import type { Project } from "../data/projects";
import { ArrowOutwardIcon } from "./icons";

type Props = {
  project: Project;
  span: string;
  aspect: string;
  titleClass: string;
  focal?: string;
  eager?: boolean;
};

function ProjectLinks({ project }: { project: Project }) {
  const links = [
    project.github && { label: "Code", href: project.github },
    project.demo && { label: "Visit Site", href: project.demo },
  ].filter(Boolean) as { label: string; href: string }[];

  if (links.length === 0) return null;
  return (
    <div className="flex gap-6 mt-4">
      {links.map((l) => (
        <a
          key={l.label}
          href={l.href}
          target="_blank"
          rel="noopener noreferrer"
          className="font-label-caps text-label-caps text-on-surface-variant hover:text-primary transition-colors flex items-center gap-1"
        >
          {l.label}
          <ArrowOutwardIcon className="w-4 h-4" />
        </a>
      ))}
    </div>
  );
}

export default function ProjectCard({ project, span, aspect, titleClass, focal = "object-top", eager }: Props) {
  const projectUrl = project.demo || project.github;

  return (
    <article className={`${span} group card-container`}>
      <div className="relative bg-surface-container-lowest border border-on-surface/10 p-0.5 mb-6">
        <span aria-hidden className="absolute -top-[7px] -left-[7px] w-6 h-6 border-t-2 border-l-2 border-secondary" />
        <span aria-hidden className="absolute -top-[7px] -right-[7px] w-6 h-6 border-t-2 border-r-2 border-secondary" />
        <span aria-hidden className="absolute -bottom-[7px] -left-[7px] w-6 h-6 border-b-2 border-l-2 border-secondary" />
        <span aria-hidden className="absolute -bottom-[7px] -right-[7px] w-6 h-6 border-b-2 border-r-2 border-secondary" />
        <div
          className={`relative overflow-hidden ${aspect} bg-surface-container border border-on-surface/5`}
        >
          {project.image ? (
            <a
              href={projectUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`View ${project.title}`}
              className="block w-full h-full"
            >
              <img
                alt={`${project.title} screenshot`}
                src={project.image}
                loading={eager ? undefined : "lazy"}
                decoding="async"
                className={`w-full h-full object-cover ${focal} image-hover-zoom`}
              />
            </a>
          ) : (
            <div className="w-full h-full flex items-center justify-center font-label-caps text-label-caps text-on-surface-variant">
              {project.category}
            </div>
          )}
        </div>
      </div>
      <div className="flex flex-col">
        <p className="font-label-caps text-label-caps text-on-surface-variant mb-2">
          {project.category} \ {project.year}
        </p>
        <h3
          className={`${titleClass} text-primary group-hover:text-secondary transition-colors`}
        >
          {project.title}
        </h3>
        <p className="font-body-md text-body-md text-on-surface-variant mt-2 line-clamp-3">
          {project.desc}
        </p>
        <ProjectLinks project={project} />
      </div>
    </article>
  );
}
