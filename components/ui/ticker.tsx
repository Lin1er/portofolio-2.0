interface TickerProps {
  items: string[];
  /** Seconds for one full loop. */
  duration?: number;
  reverse?: boolean;
  className?: string;
}

/**
 * Endless horizontal ticker. The items are rendered twice and the track slides
 * by half its width, so the loop has no visible seam. The copy is hidden from
 * assistive tech.
 */
export function Ticker({
  items,
  duration = 28,
  reverse = false,
  className = "",
}: TickerProps) {
  const row = (copy: number) => (
    <div
      className="flex shrink-0 items-center"
      aria-hidden={copy > 0 ? true : undefined}
    >
      {items.map((item, i) => (
        <span key={`${copy}-${i}`} className="flex items-center whitespace-nowrap">
          <span className="px-[0.35em]">{item.toUpperCase()}</span>
          <span className="px-[0.35em]">+</span>
        </span>
      ))}
    </div>
  );

  return (
    <div className={`overflow-hidden ${className}`}>
      <div
        data-testid="ticker-track"
        className={`marquee-track flex w-max ${reverse ? "reverse" : ""}`}
        style={{ "--marquee-duration": `${duration}s` } as React.CSSProperties}
      >
        {row(0)}
        {row(1)}
      </div>
    </div>
  );
}
