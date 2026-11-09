import SiteFooter from "./SiteFooter.jsx";
import { getAppEnvironment } from "./environment.js";
import { getUiCopy } from "./localization.js";
import { EnvironmentBadge } from "./SiteControls.jsx";

export default function NotFoundPage({ onNavigate, headingRef }) {
  const copy = getUiCopy("en");
  const environment = getAppEnvironment();

  return (
    <div className="app-shell">
      <main className="concept-about concept-not-found">
        <header>
          <h1 className="page-heading" ref={headingRef} tabIndex={-1}>
            Page not found
          </h1>
          <p>The page you&apos;re looking for doesn&apos;t exist or has moved.</p>
          <p className="concept-not-found-home">
            <a href="/" onClick={(event) => onNavigate(event, "tracker-en")}>
              {copy.navigation.home}
            </a>
          </p>
        </header>
        <SiteFooter
          concept
          currentPage={null}
          copy={copy}
          language="en"
          onNavigate={onNavigate}
        />
      </main>
      <EnvironmentBadge environment={environment} copy={copy} />
    </div>
  );
}
