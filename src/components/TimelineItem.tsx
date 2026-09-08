import type { Experience } from "../data/experience";

type Props = {
  item: Experience;
  left: boolean;
};

export default function TimelineItem({ item, left }: Props) {
  return (
    <div
      className={`relative pl-12 md:pl-0 md:w-1/2 ${
        left ? "md:pr-12 md:text-right" : "md:ml-auto md:pl-12"
      }`}
    >
      <span
        aria-hidden
        className={`absolute top-1.5 left-4 -translate-x-1/2 w-3 h-3 rounded-full bg-secondary ring-4 ring-background ${
          left ? "md:left-auto md:right-0 md:translate-x-1/2" : "md:left-0"
        }`}
      />
      <p className="font-label-caps text-label-caps text-secondary mb-2">
        {item.period} · {item.tag}
      </p>
      <h3 className="font-headline-sm text-headline-sm text-primary">
        {item.role}
      </h3>
      <p className="font-body-md text-body-md text-on-surface-variant">
        {item.org}
      </p>
    </div>
  );
}
