"use client";

import { useEffect } from "react";
import { profile } from "../../content/portfolio";

function expandSection(hash: string) {
  const section = document.getElementById(hash.slice(1));
  const disclosure = section?.querySelector<HTMLDetailsElement>("details.landing-disclosure");
  if (disclosure) disclosure.open = true;
  return section;
}

type SiteHeaderProps = {
  home?: boolean;
};

export function SiteHeader({ home = false }: SiteHeaderProps) {
  const prefix = home ? "" : "/";

  useEffect(() => {
    if (!home) return;

    const expandHashSection = () => {
      const section = expandSection(window.location.hash);
      section?.scrollIntoView();
    };

    expandHashSection();
    window.addEventListener("hashchange", expandHashSection);
    return () => window.removeEventListener("hashchange", expandHashSection);
  }, [home]);

  return (
    <header className="site-header" id="site-top">
      <a className="identity" href={home ? "#site-top" : "/"}>
        {profile.name}
      </a>
      <nav
        aria-label="Primary navigation"
        onClick={(event) => {
          if (!home || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
          const link = (event.target as Element).closest("a");
          if (link) expandSection(link.hash);
        }}
      >
        <a href={`${prefix}#work`}>Work</a>
        <a href={`${prefix}#teaching`}>Teaching</a>
        <a href={`${prefix}#publications`}>Publications</a>
        <a href={`${prefix}#grants`}>Grants</a>
        <a href={`${prefix}#about`}>About</a>
      </nav>
    </header>
  );
}
