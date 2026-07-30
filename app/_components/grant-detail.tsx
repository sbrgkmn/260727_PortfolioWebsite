import type { Grant } from "../../content/portfolio";
import { grantDetails } from "../../content/grants/details";
import { ProjectSlideshow } from "./project-slideshow";
import { SiteHeader } from "./site-header";

type GrantDetailProps = {
  grant: Grant;
};

export function GrantDetail({ grant }: GrantDetailProps) {
  const detail = grantDetails[grant.slug];
  const title = detail?.title ?? grant.title;

  return (
    <main>
      <SiteHeader />

      <article
        className={`grant-detail${detail ? " grant-detail--expanded" : ""}`}
      >
        <header className="grant-detail__header">
          <div>
            <a className="eyebrow-link" href="/#grants">
              Grants
            </a>
            <h1>{title}</h1>
          </div>
        </header>

        <div className="grant-detail__body">
          <div className="grant-copy">
            <p className="grant-summary">{detail?.summary ?? grant.summary}</p>
            {detail?.body.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
            {detail && detail.publications.length >= 2 && (
              <p className="grant-outcomes">
                The project’s research outcomes have been published in{" "}
                <a
                  href={detail.publications[0].href}
                  rel="noreferrer"
                  target="_blank"
                >
                  Journal on Computing and Cultural Heritage
                </a>{" "}
                and{" "}
                <a
                  href={detail.publications[1].href}
                  rel="noreferrer"
                  target="_blank"
                >
                  Nexus Network Journal
                </a>{" "}
                and presented at conferences and in symposium.
              </p>
            )}
          </div>

          <dl className="project-facts">
            <div>
              <dt>Agency</dt>
              <dd>{detail?.agency ?? grant.agency}</dd>
            </div>
            {detail?.projectNumber && (
              <div>
                <dt>Project number</dt>
                <dd>{detail.projectNumber}</dd>
              </div>
            )}
            {detail?.amount && (
              <div>
                <dt>Amount</dt>
                <dd>{detail.amount}</dd>
              </div>
            )}
            {detail && (
              <div>
                <dt>Role</dt>
                <dd>{detail.role}</dd>
              </div>
            )}
            {!detail && (
              <div>
                <dt>Role</dt>
                <dd>{grant.role}</dd>
              </div>
            )}
            {detail && (
              <div>
                <dt>Team</dt>
                <dd>
                  {detail.team.map((person) => (
                    <span className="grant-team-member" key={person}>
                      {person}
                    </span>
                  ))}
                </dd>
              </div>
            )}
            <div>
              <dt>Year / duration</dt>
              <dd>{detail?.duration ?? grant.periodLabel}</dd>
            </div>
            <div>
              <dt>Status</dt>
              <dd>{detail?.status ?? grant.status}</dd>
            </div>
          </dl>
        </div>

        {detail && (
          <section
            className="project-gallery project-gallery--slides grant-gallery"
            aria-label={`${title} gallery`}
          >
            <ProjectSlideshow title={title} items={detail.media} />
          </section>
        )}

        <a className="project-return" href="/#grants">
          Return to grants
        </a>
      </article>
    </main>
  );
}
