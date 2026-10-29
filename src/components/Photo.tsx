/* eslint-disable @next/next/no-img-element */
// Renders a real photo when one has been uploaded. Otherwise renders a clearly
// labelled placeholder so a stand-in is never mistaken for the real farm.

type Props = {
  src?: string;
  alt: string;
  /** What the owner should upload here, shown inside the placeholder */
  slot: string;
  className?: string;
  priority?: boolean;
  /** Marks a stand-in photo that is not from the farm */
  sample?: boolean;
};

export function Photo({ src, alt, slot, className = "", priority, sample }: Props) {
  if (src) {
    return (
      <figure className={`relative overflow-hidden bg-stone ${className}`}>
        <img
          src={src}
          alt={alt}
          loading={priority ? "eager" : "lazy"}
          decoding="async"
          fetchPriority={priority ? "high" : "auto"}
          className="h-full w-full object-cover"
        />
        {sample && (
          <figcaption className="absolute bottom-2 left-2 rounded bg-black/70 px-2 py-1 text-xs text-white">
            Жишээ зураг
          </figcaption>
        )}
      </figure>
    );
  }
  return (
    <div
      role="img"
      aria-label={`Зураг оруулах байрлал: ${slot}`}
      className={`flex flex-col items-center justify-center gap-2 border-2 border-dashed border-green-700/30 bg-green-100/60 p-6 text-center text-green-800 ${className}`}
    >
      <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <circle cx="9" cy="10" r="1.6" />
        <path d="m4 17 5-5 4 4 3-3 4 4" />
      </svg>
      <span className="text-sm font-semibold">Бодит зураг оруулах байрлал</span>
      <span className="max-w-[28ch] text-xs leading-snug text-green-800/80">{slot}</span>
    </div>
  );
}
