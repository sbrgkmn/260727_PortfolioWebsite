import { SiteHeader } from "./_components/site-header";
import { ProjectCarousel } from "./_components/project-carousel";
import {
  featuredWorkProjects,
  getSingleYear,
  grants,
  profile,
  publications,
  selectedWorkLabels,
  teachingProjects,
} from "../content/portfolio";

function formatPublicationTitle(title: string) {
  return title.replace(/[.,]+$/, "");
}

const inactiveGrantSlugs = new Set([
  "graft",
  "designhub-ist",
  "digital-design-fabrication-lab",
]);

function DisclosureHeading({
  id,
  label,
}: {
  id: string;
  label: string;
}) {
  return (
    <summary className="section-heading">
      <span className="section-title" id={id}>
        {label}
      </span>
      <span className="section-toggle" aria-hidden="true" />
    </summary>
  );
}

export default function Home() {
  return (
    <main>
      <SiteHeader home />

      <h1 className="sr-only">{profile.name} — {profile.headline}</h1>
      <section className="intro" aria-label="Featured projects">
        <ProjectCarousel />
      </section>

      <section className="work" id="work" aria-labelledby="work-title">
        <details className="landing-disclosure">
          <DisclosureHeading id="work-title" label="Work" />
          <div className="landing-disclosure__content">
            <div className="catalog-list">
              {featuredWorkProjects.map((project) => (
                <a
                  className="catalog-row"
                  href={`/work/${project.slug}`}
                  key={project.slug}
                >
                  <span className="catalog-year">
                    {project.slug === "archive-previous-work"
                      ? project.year
                      : getSingleYear(project.year)}
                  </span>
                  <h3>{project.title}</h3>
                  <span className="catalog-type">
                    {selectedWorkLabels[project.slug] ?? project.tags[0]}
                  </span>
                </a>
              ))}
            </div>
          </div>
        </details>
      </section>

      <section
        className="text-section"
        id="teaching"
        aria-labelledby="teaching-title"
      >
        <details className="landing-disclosure">
          <DisclosureHeading id="teaching-title" label="Teaching" />
          <div className="landing-disclosure__content">
            <div className="catalog-list">
              {teachingProjects.map((project) => (
                <a
                  className="catalog-row"
                  href={`/teaching/${project.slug}`}
                  key={project.slug}
                >
                  <span className="catalog-year">{project.year}</span>
                  <h3>{project.title}</h3>
                  <span className="catalog-type">{project.subtitle}</span>
                </a>
              ))}
            </div>
          </div>
        </details>
      </section>

      <section
        className="text-section"
        id="publications"
        aria-labelledby="publications-title"
      >
        <details className="landing-disclosure">
          <DisclosureHeading id="publications-title" label="Publications" />
          <div className="landing-disclosure__content">
            <div className="catalog-list">
              {publications.map((publication) => {
                const row = (
                  <>
                  <span className="catalog-year publication-year">
                    {publication.year}
                  </span>
                  <div className="publication-copy">
                    <h3 title={formatPublicationTitle(publication.title)}>
                      {formatPublicationTitle(publication.title)}
                    </h3>
                  </div>
                  <span className="catalog-type publication-type">
                    {publication.venue}
                  </span>
                  </>
                );

                if (!publication.href) {
                  return (
                    <div
                      className="catalog-row catalog-row--static publication-entry"
                      key={publication.title}
                    >
                      {row}
                    </div>
                  );
                }

                return (
                  <a
                    className="catalog-row publication-entry"
                    href={publication.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`Open ${formatPublicationTitle(
                      publication.title,
                    )}`}
                    key={publication.title}
                  >
                    {row}
                  </a>
                );
              })}
            </div>
          </div>
        </details>
      </section>

      <section
        className="text-section"
        id="grants"
        aria-labelledby="grants-title"
      >
        <details className="landing-disclosure">
          <DisclosureHeading id="grants-title" label="Grants" />
          <div className="landing-disclosure__content">
            <div className="catalog-list">
              {grants.map((grant) => {
                const row = (
                  <>
                    <span className="catalog-year">{grant.periodLabel}</span>
                    <div>
                      <h3>{grant.title}</h3>
                    </div>
                    <span className="catalog-type">{grant.fundingSource}</span>
                  </>
                );

                if (inactiveGrantSlugs.has(grant.slug)) {
                  return (
                    <div
                      className="catalog-row catalog-row--static grant-entry"
                      key={grant.title}
                    >
                      {row}
                    </div>
                  );
                }

                return (
                  <a
                    className="catalog-row grant-entry"
                    href={
                      grant.slug === "steambot"
                        ? "/work/steambot"
                        : `/grants/${grant.slug}`
                    }
                    key={grant.title}
                  >
                    {row}
                  </a>
                );
              })}
            </div>
          </div>
        </details>
      </section>

      <section className="about" id="about" aria-labelledby="about-title">
        <details className="landing-disclosure">
          <DisclosureHeading id="about-title" label="About" />
          <div className="landing-disclosure__content">
            <div className="about-content">
          <p className="about-statement">
            Sabri Gokmen is a computational designer and researcher with more
            than 15 years of experience in parametric modeling, generative art,
            digital fabrication, and software development. Originally trained
            as an architect, he later became a researcher and completed his{" "}
            <a href={profile.links.phd} target="_blank" rel="noreferrer">
              PhD
            </a>{" "}
            in the United States. Along the way, he designed, manufactured, and
            built numerous{" "}
            <a href={profile.links.publicArt} target="_blank" rel="noreferrer">
              public artworks
            </a>
            , taught technology-oriented design courses, created a{" "}
            <a href={profile.links.youtube} target="_blank" rel="noreferrer">
              YouTube channel
            </a>
            , and developed generative code for his{" "}
            <a href={profile.links.research} target="_blank" rel="noreferrer">
              research and art
            </a>
            . He currently works in{" "}
            <a
              href={profile.links.academicProfile}
              target="_blank"
              rel="noreferrer"
            >
              academia
            </a>
            , dividing his time among teaching, research, and coding.
          </p>
          <div className="about-links">
            <a href={profile.links.youtube} target="_blank" rel="noreferrer">
              YouTube
            </a>
            <a href={profile.links.research} target="_blank" rel="noreferrer">
              Academia
            </a>
            <a href={profile.links.blog} target="_blank" rel="noreferrer">
              Blog
            </a>
            <a href="/CV_Sabri_Gokmen_2026.docx" download>
              CV
            </a>
          </div>
            </div>
          </div>
        </details>
      </section>

    </main>
  );
}
