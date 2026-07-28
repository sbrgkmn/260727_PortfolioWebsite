import { SiteHeader } from "./_components/site-header";
import {
  featuredWorkProjects,
  grants,
  profile,
  publications,
  teachingProjects,
} from "../content/portfolio";

export default function Home() {
  return (
    <main>
      <SiteHeader home />

      <section className="intro" id="top">
        <h1>{profile.headline}</h1>
        <p>{profile.introduction}</p>
      </section>

      <section className="work" id="work" aria-labelledby="work-title">
        <div className="section-heading">
          <h2 id="work-title">Selected work</h2>
        </div>
        <div className="catalog-list">
          {featuredWorkProjects.map((project) => (
            <a
              className="catalog-row"
              href={`/work/${project.slug}`}
              key={project.slug}
            >
              <span className="catalog-year">{project.year}</span>
              <h3>{project.title}</h3>
              <span className="catalog-type">{project.tags[0]}</span>
            </a>
          ))}
        </div>
      </section>

      <section
        className="text-section"
        id="teaching"
        aria-labelledby="teaching-title"
      >
        <div className="section-heading">
          <h2 id="teaching-title">Teaching</h2>
        </div>
        <div className="catalog-list">
          {teachingProjects.map((project) => (
            <a
              className="catalog-row"
              href={`/teaching/${project.slug}`}
              key={project.slug}
            >
              <span className="catalog-year">{project.year}</span>
              <h3>{project.title}</h3>
              <span className="catalog-type">{project.tags[0]}</span>
            </a>
          ))}
        </div>
      </section>

      <section
        className="text-section"
        id="publications"
        aria-labelledby="publications-title"
      >
        <div className="section-heading">
          <h2 id="publications-title">Publications</h2>
        </div>
        <div className="catalog-list">
          {publications.map((publication) => (
            <a
              className="catalog-row publication-entry"
              href={publication.href}
              target="_blank"
              rel="noreferrer"
              aria-label={`Open ${publication.title}`}
              key={publication.title}
            >
              <span className="catalog-year publication-year">
                {publication.year}
              </span>
              <div className="publication-copy">
                <h3>{publication.title}</h3>
                <p>{publication.citation}</p>
              </div>
              <span className="catalog-type publication-type">
                {publication.category}
              </span>
            </a>
          ))}
        </div>
      </section>

      <section
        className="text-section"
        id="grants"
        aria-labelledby="grants-title"
      >
        <div className="section-heading">
          <h2 id="grants-title">Grants</h2>
        </div>
        <div className="catalog-list">
          {grants.map((grant) => (
            <a
              className="catalog-row"
              href={`/grants/${grant.slug}`}
              key={grant.title}
            >
              <span className="catalog-year">{grant.periodLabel}</span>
              <div>
                <h3>{grant.title}</h3>
                <p className="catalog-detail">{grant.agency}</p>
              </div>
              <span className="catalog-type">{grant.status}</span>
            </a>
          ))}
        </div>
      </section>

      <section className="about" id="about" aria-labelledby="about-title">
        <h2 id="about-title">About</h2>
        <div>
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
            <a href={profile.links.website} target="_blank" rel="noreferrer">
              Website
            </a>
            <a href={`mailto:${profile.email}`}>Email</a>
            <a href={profile.links.research} target="_blank" rel="noreferrer">
              Academia
            </a>
            <a href={profile.links.youtube} target="_blank" rel="noreferrer">
              YouTube
            </a>
            <a href={profile.links.linktree} target="_blank" rel="noreferrer">
              Linktree
            </a>
            <a href="/CV_SabriGokmen_2026.docx" download>
              Download CV
            </a>
          </div>
        </div>
      </section>

      <footer>
        <span>© 2026 {profile.name}. All rights reserved.</span>
        <span>{profile.location}</span>
        <a href="#top">Back to top ↑</a>
      </footer>
    </main>
  );
}
