import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";

export type CarouselSlide = {
  src: string;
  alt: string;
  caption: string;
};

type Props = {
  slides: CarouselSlide[];
  intervalMs?: number;
  fadeMs?: number;
};

export default function FadeCarousel({ slides, intervalMs = 2000, fadeMs = 200 }: Props) {
  const reduced = useReducedMotion();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (slides.length < 2 || reduced) return;
    const id = window.setInterval(() => {
      setIndex((current) => (current + 1) % slides.length);
    }, intervalMs);
    return () => window.clearInterval(id);
  }, [slides.length, intervalMs, reduced]);

  if (!slides.length) return null;

  return (
    <div className="fade-carousel" style={{ ["--fade-ms" as string]: `${fadeMs}ms` }}>
      {slides.map((slide, i) => (
        <figure
          key={slide.src}
          className={`fade-carousel-slide ${i === index ? "is-active" : ""}`}
          aria-hidden={i !== index}
        >
          <img src={slide.src} alt={slide.alt} loading={i === 0 ? "eager" : "lazy"} decoding="async" width={1400} height={1050} />
          <figcaption>{slide.caption}</figcaption>
        </figure>
      ))}
      <div className="fade-carousel-dots" role="tablist" aria-label="Carousel">
        {slides.map((slide, i) => (
          <button
            key={slide.src}
            type="button"
            role="tab"
            aria-selected={i === index}
            className={i === index ? "active" : ""}
            onClick={() => setIndex(i)}
          />
        ))}
      </div>
    </div>
  );
}
