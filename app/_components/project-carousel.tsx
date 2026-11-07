"use client";

import { useEffect, useState } from "react";
import slides from "../../content/carousel/slides.json";

const rotationInterval = 5000;

export function ProjectCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const syncPreference = () => setReducedMotion(mediaQuery.matches);

    syncPreference();
    mediaQuery.addEventListener("change", syncPreference);
    return () => mediaQuery.removeEventListener("change", syncPreference);
  }, []);

  useEffect(() => {
    if (paused || reducedMotion) return;

    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % slides.length);
    }, rotationInterval);

    return () => window.clearInterval(timer);
  }, [paused, reducedMotion]);

  if (slides.length === 0) return null;

  const activeSlide = slides[activeIndex];

  return (
    <section
      className="project-carousel"
      aria-label="Selected projects carousel"
    >
      <div className="project-carousel__viewport" aria-live="off">
        {slides.map((slide, index) => (
          <a
            className={`project-carousel__slide${
              index === activeIndex ? " is-active" : ""
            }`}
            href={slide.href}
            aria-hidden={index !== activeIndex}
            tabIndex={index === activeIndex ? 0 : -1}
            key={slide.src}
          >
            <img
              src={slide.src}
              alt={slide.alt}
              style={slide.fit === "contain" ? { objectFit: "contain", backgroundColor: "#fff" } : undefined}
              loading={index === 0 ? "eager" : "lazy"}
              decoding="async"
            />
          </a>
        ))}
      </div>

      <div className="project-carousel__footer">
        <a className="project-carousel__caption" href={activeSlide.href}>
          <strong>{activeSlide.title}</strong>
          <span>{activeSlide.type}</span>
        </a>

        <div className="project-carousel__controls">
          <button
            type="button"
            onClick={() => setPaused((current) => !current)}
            aria-pressed={paused}
          >
            {paused ? "Play" : "Pause"}
          </button>
          <div className="project-carousel__pagination" aria-label="Choose slide">
            {slides.map((slide, index) => (
              <button
                type="button"
                className={index === activeIndex ? "is-active" : ""}
                onClick={() => setActiveIndex(index)}
                aria-label={`Show ${slide.title}`}
                aria-current={index === activeIndex ? "true" : undefined}
                key={slide.src}
              >
                {String(index + 1).padStart(2, "0")}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
