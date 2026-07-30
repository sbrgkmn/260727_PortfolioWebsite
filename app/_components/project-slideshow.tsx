"use client";

import { useEffect, useRef, useState } from "react";
import type { Project } from "../../content/portfolio";

type ProjectSlideshowProps = {
  title: string;
  items: Project["media"];
};

export function ProjectSlideshow({ title, items }: ProjectSlideshowProps) {
  const [activeSlide, setActiveSlide] = useState(0);
  const slideshowRef = useRef<HTMLDivElement>(null);
  const slideCount = items.length;

  useEffect(() => {
    slideshowRef.current
      ?.querySelectorAll<HTMLVideoElement>("video[data-slide-index]")
      .forEach((video) => {
        if (Number(video.dataset.slideIndex) !== activeSlide) {
          video.pause();
        }
      });
  }, [activeSlide]);

  function showSlide(index: number) {
    setActiveSlide((index + slideCount) % slideCount);
  }

  return (
    <div
      className="project-slideshow"
      ref={slideshowRef}
      aria-label={`${title} media gallery`}
      aria-roledescription="carousel"
      onKeyDown={(event) => {
        if (event.key === "ArrowLeft") {
          showSlide(activeSlide - 1);
        }
        if (event.key === "ArrowRight") {
          showSlide(activeSlide + 1);
        }
      }}
      tabIndex={0}
    >
      <div className="project-slideshow__viewport">
        <div
          className="project-slideshow__track"
          style={{ transform: `translateX(-${activeSlide * 100}%)` }}
        >
          {items.map((item, index) => (
            <figure
              aria-label={`${index + 1} of ${slideCount}`}
              aria-roledescription="slide"
              key={item.src}
            >
              {/\.(mp4|webm)$/i.test(item.src) ? (
                <video
                  aria-label={item.alt}
                  controls
                  data-slide-index={index}
                  playsInline
                  preload="metadata"
                >
                  <source src={item.src} />
                </video>
              ) : (
                <img
                  src={item.src}
                  alt={item.alt}
                  loading={index === 0 ? "eager" : "lazy"}
                />
              )}
              {item.caption && <figcaption>{item.caption}</figcaption>}
            </figure>
          ))}
        </div>

        <button
          aria-label="Show previous slide"
          className="project-slideshow__arrow project-slideshow__arrow--previous"
          onClick={() => showSlide(activeSlide - 1)}
          type="button"
        >
          {"\u2190"}
        </button>
        <button
          aria-label="Show next slide"
          className="project-slideshow__arrow project-slideshow__arrow--next"
          onClick={() => showSlide(activeSlide + 1)}
          type="button"
        >
          {"\u2192"}
        </button>
      </div>

      <div className="project-slideshow__counter" aria-live="polite">
        {String(activeSlide + 1).padStart(2, "0")} /{" "}
        {String(slideCount).padStart(2, "0")}
      </div>
    </div>
  );
}
