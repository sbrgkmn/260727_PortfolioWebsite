import type { Project } from "../../content/portfolio";
import { SiteHeader } from "./site-header";

type ProjectDetailProps = {
  project: Project;
};

export function ProjectDetail({ project }: ProjectDetailProps) {
  const isTeaching = project.section === "teaching";
  const isArchive = project.slug === "archive-previous-work";
  const isPreviousWork = project.tags.includes("Previous Work");
  const returnHref = isTeaching
    ? "/#teaching"
    : isPreviousWork
      ? "/work/archive-previous-work"
      : "/#work";
  const sectionLabel = isTeaching
    ? "Teaching"
    : isPreviousWork
      ? "Previous work"
      : "Selected work";

  return (
    <main className="project-page">
      <SiteHeader />

      <article className={`project-detail project-detail--${project.section}`}>
        <header className="project-detail__header">
          <div>
            <a className="eyebrow-link" href={returnHref}>
              {sectionLabel}
            </a>
            <h1>{project.title}</h1>
          </div>
          <div className="project-detail__meta">
            <span>{project.year}</span>
            <span>{project.subtitle}</span>
            <span>{project.tags.join(" · ")}</span>
          </div>
        </header>

        {!isTeaching && !isArchive && (
          <figure className="project-hero">
            <img src={project.coverImage} alt={project.coverAlt} />
          </figure>
        )}

        {!isArchive && (
          <div className="project-detail__body">
            <div className="project-copy">
              <p className="project-summary">{project.summary}</p>
              {project.body.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>

            <dl className="project-facts">
              {project.facts.map(([label, value]) => (
                <div key={`${label}-${value}`}>
                  <dt>{label}</dt>
                  <dd>
                    {value.startsWith("http") ? (
                      <a href={value}>{value}</a>
                    ) : (
                      value
                    )}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        )}

        {project.media.length > 0 && (
          <section
            className={`project-gallery${
              isArchive ? " project-gallery--archive" : ""
            }`}
            aria-labelledby="project-gallery-title"
          >
            <div className="section-heading">
              <h2 id="project-gallery-title">
                {isArchive
                  ? "Previous projects"
                  : isTeaching
                    ? "Selected student work"
                    : "Selected media"}
              </h2>
            </div>
            <div className="project-gallery__grid">
              {project.media.map((item) => (
                <figure key={item.src}>
                  <img src={item.src} alt={item.alt} loading="lazy" />
                  <figcaption>{item.caption}</figcaption>
                </figure>
              ))}
            </div>
          </section>
        )}

        <a className="project-return" href={returnHref}>
          Return to {sectionLabel.toLowerCase()}
        </a>
      </article>
    </main>
  );
}
