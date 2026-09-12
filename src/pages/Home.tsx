import { Link } from "react-router-dom";
import { ArrowForwardIcon } from "../components/icons";
import ProjectCard from "../components/ProjectCard";
import ProjectSkeleton from "../components/ProjectSkeleton";
import TimelineItem from "../components/TimelineItem";
import { experience, skills } from "../data/experience";
import cvUrl from "../assets/CV-ATS-Fajar.pdf";
import illustrationUrl from "../assets/pacheco.png";
import usePageTitle from "../hooks/usePageTitle";
import useProjects from "../hooks/useProjects";

export default function Home() {
  usePageTitle("Rahmat Fajar Saputra | AI Software Developer");
  const { list, loading } = useProjects();

  return (
    <main className="flex-grow pt-20">
      <section className="min-h-[calc(100svh-5rem)] flex flex-col justify-center px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter items-center w-full">
          <div className="lg:col-span-4">
            <p className="font-label-caps text-label-caps text-on-surface-variant mb-stack-md uppercase tracking-widest">
              Rahmat Fajar Saputra : AI Software Developer
            </p>
            <h1 className="font-display-lg-mobile text-display-lg-mobile lg:font-headline-md lg:text-headline-md text-primary leading-tight text-reveal">
              Building simple websites and smart features people actually use.
            </h1>
          </div>
          <div className="lg:col-span-4 flex justify-center">
            <img
              alt="Pacheco, illustration of a boy running with a robotics backpack"
              src={illustrationUrl}
              decoding="async"
              className="w-full max-w-xs lg:max-w-none"
            />
          </div>
          <div className="lg:col-span-4">
            <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mb-stack-md">
              I&apos;m Fajar, a Computer Engineering student at Universitas
              Andalas focused on software and AI, from company tools to
              public-facing products.
            </p>
            <div className="flex flex-wrap gap-3 mb-stack-lg">
              {skills.map((s) => (
                <span
                  key={s}
                  className="font-label-caps text-label-caps text-on-surface-variant border border-on-surface/15 px-4 py-2"
                >
                  {s}
                </span>
              ))}
            </div>
            <div className="flex flex-wrap gap-4 items-center">
              <a
                className="font-label-caps text-label-caps bg-primary text-on-primary px-8 py-4 hover:bg-secondary hover:text-on-secondary transition-colors duration-300"
                href="#projects"
              >
                View My Work
              </a>
              <Link
                className="font-label-caps text-label-caps border border-primary/20 text-on-surface px-8 py-4 hover:border-primary transition-colors duration-300"
                to="/contact"
              >
                Get in Touch
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section
        className="px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto pb-section-gap scroll-mt-24"
        id="projects"
      >
        <div className="flex justify-between items-end mb-stack-lg border-b border-on-surface/10 pb-4">
          <h2 className="font-headline-md text-headline-md text-primary">
            Selected Work
          </h2>
          <Link
            className="font-label-caps text-label-caps text-on-surface-variant hover:text-primary transition-colors flex items-center gap-2 group"
            to="/expertise"
          >
            See All Work
            <ArrowForwardIcon className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
        <div
          aria-busy={loading}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-gutter"
        >
          {loading ? (
            <>
              <ProjectSkeleton span="col-span-1 lg:col-span-8" aspect="aspect-video" />
              <ProjectSkeleton span="col-span-1 lg:col-span-4 lg:mt-section-gap" aspect="aspect-video" />
            </>
          ) : (
            <>
              {list[0] && (
                <ProjectCard
                  project={list[0]}
                  span="col-span-1 lg:col-span-8"
                  aspect="aspect-video"
                  titleClass="font-headline-md text-headline-md"
                  eager
                />
              )}
              {list[1] && (
                <ProjectCard
                  project={list[1]}
                  span="col-span-1 lg:col-span-4 lg:mt-section-gap"
                  aspect="aspect-video"
                  titleClass="font-headline-sm text-headline-sm"
                />
              )}
            </>
          )}
        </div>
      </section>

      <section className="px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto pb-section-gap">
        <div className="mb-stack-lg border-b border-on-surface/10 pb-4">
          <h2 className="font-headline-md text-headline-md text-primary">
            Experience
          </h2>
        </div>
        <div className="relative">
          <span
            aria-hidden
            className="absolute top-0 bottom-0 left-4 md:left-1/2 w-px bg-on-surface/15"
          />
          <div className="space-y-12">
            {experience.map((e, i) => (
              <TimelineItem key={e.role} item={e} left={i % 2 === 0} />
            ))}
          </div>
        </div>
      </section>

      <section className="px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto pb-section-gap">
        <div className="bg-surface border border-on-surface/10 px-8 py-16 md:p-16 text-center">
          <h2 className="font-headline-md text-headline-md text-primary mb-stack-sm">
            Have a project in mind?
          </h2>
          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-xl mx-auto mb-stack-lg">
            Open for internships, freelance web apps, and AI-integrated
            products.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              className="font-label-caps text-label-caps bg-primary text-on-primary px-8 py-4 hover:bg-secondary hover:text-on-secondary transition-colors duration-300"
              to="/contact"
            >
              Get in Touch
            </Link>
            <a
              className="font-label-caps text-label-caps border border-primary/20 text-on-surface px-8 py-4 hover:border-primary transition-colors"
              href={cvUrl}
              download="CV-Rahmat-Fajar-Saputra.pdf"
            >
              Download CV
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
