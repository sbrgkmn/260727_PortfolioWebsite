import type { Grant } from "../../content/portfolio";
import { SiteHeader } from "./site-header";

type GrantDetailProps = {
  grant: Grant;
};

export function GrantDetail({ grant }: GrantDetailProps) {
  return (
    <main>
      <SiteHeader />

      <article className="grant-detail">
        <header className="grant-detail__header">
          <div>
            <a className="eyebrow-link" href="/#grants">
              Selected grants
            </a>
            <h1>{grant.title}</h1>
          </div>
          <div className="grant-detail__meta">
            <span>{grant.periodLabel}</span>
            <span>{grant.group}</span>
          </div>
        </header>

        <div className="grant-detail__body">
          <p className="grant-summary">{grant.summary}</p>

          <dl className="project-facts">
            <div>
              <dt>Agency</dt>
              <dd>{grant.agency}</dd>
            </div>
            <div>
              <dt>Role</dt>
              <dd>{grant.role}</dd>
            </div>
            <div>
              <dt>Year / duration</dt>
              <dd>{grant.periodLabel}</dd>
            </div>
            <div>
              <dt>Status</dt>
              <dd>{grant.status}</dd>
            </div>
          </dl>
        </div>

        <a className="project-return" href="/#grants">
          Return to selected grants
        </a>
      </article>
    </main>
  );
}
