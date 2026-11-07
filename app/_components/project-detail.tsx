import {
  getSingleYear,
  selectedWorkLabels,
  type Project,
} from "../../content/portfolio";
import { ProjectSlideshow } from "./project-slideshow";
import { SiteHeader } from "./site-header";

type ProjectDetailProps = {
  project: Project;
};

const workLocationFallbacks: Record<string, string> = {
  steambot: "UNC Charlotte",
  spiromorphs: "Online / Art Blocks",
};

function findFact(project: Project, labelIncludes: string) {
  return project.facts.find(([label]) =>
    label.toLowerCase().includes(labelIncludes),
  )?.[1];
}

function getArchiveMeta(
  item: Project["media"][number],
  isTeachingArchive: boolean,
) {
  const values = isTeachingArchive
    ? [item.institution, item.year]
    : [item.year, item.type, item.recognition];

  return values.filter(Boolean).join(" \u00b7 ");
}

export function ProjectDetail({ project }: ProjectDetailProps) {
  const isTeaching = project.section === "teaching";
  const isWorkArchive = project.slug === "archive-previous-work";
  const isTeachingArchive = project.slug === "archive-previous-teaching";
  const isArchive = isWorkArchive || isTeachingArchive;
  const isPreviousWork = project.tags.includes("Previous Work");
  const hasProjectIndex = !isArchive;
  const returnHref = isTeaching
    ? "/#teaching"
    : isPreviousWork
      ? "/work/archive-previous-work"
      : "/#work";
  const sectionLabel = isTeaching
    ? "Teaching"
    : isPreviousWork
      ? "Previous work"
      : "Work";

  const teachingInfo = [
    ["Term", findFact(project, "term") ?? project.year],
    ["Topics", project.tags.join(", ")],
    ["Level", findFact(project, "level") ?? ""],
    ["Number of students", findFact(project, "enrollment") ?? ""],
    ["Location", "UNC Charlotte"],
  ];

  const workType = selectedWorkLabels[project.slug] ?? project.tags[0] ?? "";
  const workTopics =
    project.tags
      .filter(
        (tag) =>
          tag.toLowerCase() !== workType.toLowerCase() &&
          tag !== "Previous Work",
      )
      .join(", ") || project.tags.join(", ");
  const workInfo = [
    ["Year", getSingleYear(project.year)],
    ["Type", workType],
    ["Topics", workTopics],
    [
      "Location",
      findFact(project, "location") ??
        workLocationFallbacks[project.slug] ??
        "",
    ],
  ];
  const projectInfo = isTeaching ? teachingInfo : workInfo;
  const collectionUrl = findFact(project, "collection");

  return (
    <main className="project-page">
      <SiteHeader />

      <article
        className={`project-detail project-detail--${project.section}${
          hasProjectIndex ? " project-detail--indexed" : ""
        }`}
      >
        <header
          className={`project-detail__header${
            hasProjectIndex ? " project-detail__header--indexed" : ""
          }${isArchive ? " project-detail__header--archive" : ""}`}
        >
          <div>
            <h1>{project.title}</h1>
            {hasProjectIndex && (
              <dl
                className={`project-index${
                  isTeaching ? "" : " project-index--work"
                }`}
              >
                {projectInfo.map(([label, value]) => (
                  <div key={label}>
                    <dt>{label}</dt>
                    <dd>{value}</dd>
                  </div>
                ))}
              </dl>
            )}
          </div>

        </header>

        {!isArchive && (
          <div className="project-detail__body">
            <div className="project-copy">
              <p className="project-summary">
                {project.summary}
              </p>
              {project.body.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
              {collectionUrl && (
                <a
                  className="project-external-link"
                  href={collectionUrl}
                  rel="noreferrer"
                  target="_blank"
                >
                  View Spiromorphs collection
                </a>
              )}
            </div>
          </div>
        )}

        {project.media.length > 0 && (
          <section
            className={`project-gallery${
              isArchive
                ? " project-gallery--archive"
                : " project-gallery--slides"
            }`}
            aria-label={`${project.title} gallery`}
          >
            {isArchive ? (
              <div className="project-gallery__grid">
                {project.media.map((item) => (
                  <figure key={item.src}>
                    <img src={item.src} alt={item.alt} loading="lazy" />
                    {item.caption && (
                      <figcaption>
                        <span className="project-gallery__caption-title">
                          {item.caption}
                        </span>
                        {getArchiveMeta(item, isTeachingArchive) && (
                          <span className="project-gallery__caption-meta">
                            {getArchiveMeta(item, isTeachingArchive)}
                          </span>
                        )}
                      </figcaption>
                    )}
                  </figure>
                ))}
              </div>
            ) : (
              <ProjectSlideshow title={project.title} items={project.media} />
            )}
          </section>
        )}

        <a className="project-return" href={returnHref}>
          Return to {sectionLabel.toLowerCase()}
        </a>
      </article>
    </main>
  );
}
