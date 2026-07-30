import { profile } from "../../content/portfolio";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <span>
        {"\u00A9"} 2026 {profile.name}. All rights reserved.
      </span>
      <span>{profile.location}</span>
      <a href="#site-top">
        Back to top {"\u2191"}
      </a>
    </footer>
  );
}
