import cvUrl from "../assets/CV-ATS-Fajar.pdf";
import photoUrl from "../assets/fajar.webp";

const services = [
  {
    title: "Software Engineering",
    desc: "Building fast, maintainable web apps — from internal admin tools to public information systems with modern stacks.",
  },
  {
    title: "AI & Machine Learning",
    desc: "Integrating AI into real products: intelligent features, automation, and model-backed experiences.",
  },
  {
    title: "Embedded System & IoT",
    desc: "Robotics and embedded systems — from the university laboratory to Neo Telemetri student projects.",
  },
];

export default function About() {
  return (
    <main className="pt-[120px] pb-section-gap">
      <section className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop mb-section-gap">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter items-center">
          <div className="col-span-1 md:col-span-7 pr-0 md:pr-12">
            <p className="font-label-caps text-label-caps text-on-surface-variant mb-stack-md uppercase tracking-widest">
              Rahmat Fajar Saputra — Padang, Indonesia
            </p>
            <h1 className="font-display-lg-mobile text-display-lg-mobile md:font-display-lg md:text-display-lg text-primary mb-stack-md leading-tight">
              AI Software Engineer building intelligent products for the real
              world.
            </h1>
            <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl">
              I&apos;m Fajar, a Computer Engineering undergrad at Universitas
              Andalas focused on software and AI. Previously a web developer
              intern at PAM Techno, now a Robotic and Embedded System
              Laboratory assistant and member of UKM Neo Telemetri.
            </p>
          </div>
          <div className="col-span-1 md:col-span-5 mt-stack-lg md:mt-0 relative group">
            <div className="w-full aspect-[3/4] overflow-hidden rounded-sm bg-surface-container relative border border-on-surface/5">
              <img
                alt="Rahmat Fajar Saputra"
                src={photoUrl}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-surface-container-low py-section-gap mb-section-gap border-y border-on-surface/5">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter">
            <div className="col-span-1 md:col-span-4">
              <h2 className="font-label-caps text-label-caps text-on-surface-variant mb-stack-sm uppercase tracking-widest">
                Philosophy
              </h2>
            </div>
            <div className="col-span-1 md:col-span-8">
              <h3 className="font-headline-md text-headline-md text-primary mb-stack-md">
                &quot;Intelligence, engineered simply.&quot;
              </h3>
              <div className="font-body-lg text-body-lg text-on-surface-variant space-y-6 max-w-3xl">
                <p>
                  Technology should solve real problems, not create new ones.
                  I believe the best products are practical, maintainable,
                  and honest — AI where it adds value, simplicity everywhere
                  else.
                </p>
                <p>
                  Every project starts from the actual need: an inventory
                  system that staff will really use, a village website that
                  villagers can really update. Clean code and clear interfaces
                  follow from that.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop mb-section-gap">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter">
          <div className="col-span-1 md:col-span-4 mb-stack-lg md:mb-0">
            <h2 className="font-label-caps text-label-caps text-on-surface-variant mb-stack-md uppercase tracking-widest">
              Expertise
            </h2>
            <p className="font-body-md text-body-md text-on-surface-variant mb-stack-lg max-w-xs">
              Three disciplines shaped by internship, laboratory work, and
              student tech community.
            </p>
            <a
              className="inline-flex items-center gap-2 font-label-caps text-label-caps text-primary text-underline-hover group"
              href={cvUrl}
              download="CV-Rahmat-Fajar-Saputra.pdf"
            >
              Download CV
              <span className="material-symbols-outlined text-[16px] group-hover:translate-x-1 transition-transform">
                arrow_forward
              </span>
            </a>
          </div>
          <div className="col-span-1 md:col-span-8">
            {services.map((s, i) => (
              <div
                key={s.title}
                className={`py-8 border-t border-on-surface/10 group cursor-pointer hover:bg-surface-container-low transition-colors duration-300 -mx-6 px-6 ${
                  i === services.length - 1 ? "border-b" : ""
                }`}
              >
                <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-4">
                  <div className="md:w-1/3">
                    <h4 className="font-headline-sm text-headline-sm text-primary group-hover:text-secondary transition-colors">
                      {s.title}
                    </h4>
                  </div>
                  <div className="md:w-2/3">
                    <p className="font-body-md text-body-md text-on-surface-variant">
                      {s.desc}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
