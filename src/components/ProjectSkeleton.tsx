type Props = {
  span: string;
  aspect: string;
};

/** Skeleton bentuk kartu proyek. Samakan span/aspect biar tak loncat layout. */
export default function ProjectSkeleton({ span, aspect }: Props) {
  return (
    <div aria-hidden="true" className={`${span} animate-pulse`}>
      <div className={`${aspect} bg-surface-container rounded-sm mb-6`} />
      <div className="h-3 w-24 bg-surface-container rounded-sm mb-2" />
      <div className="h-6 w-3/4 bg-surface-container rounded-sm mb-2" />
      <div className="h-4 w-full bg-surface-container rounded-sm" />
    </div>
  );
}
