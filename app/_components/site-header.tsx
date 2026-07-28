import { profile } from "../../content/portfolio";

type SiteHeaderProps = {
  home?: boolean;
};

export function SiteHeader({ home = false }: SiteHeaderProps) {
  const prefix = home ? "" : "/";

  return (
    <header className="site-header">
      <a className="identity" href={home ? "#top" : "/"}>
        {profile.name}
      </a>
      <nav aria-label="Primary navigation">
        <a href={`${prefix}#work`}>Work</a>
        <a href={`${prefix}#teaching`}>Teaching</a>
        <a href={`${prefix}#publications`}>Publications</a>
        <a href={`${prefix}#grants`}>Grants</a>
        <a href={`${prefix}#about`}>About</a>
      </nav>
    </header>
  );
}
