import {
  EnvironmentBadge,
  LanguageToggle,
  NavigationPillLink,
  ProjectClassificationBadge,
  ThemeToggle,
} from "./SiteControls.jsx";
import { applyDocumentTheme } from "./theme.js";
import { getAppEnvironment } from "./environment.js";
import { getUiCopy } from "./localization.js";
import { getRouteHref } from "./routes.js";
import { getUpdateHistory } from "./updateHistory.js";
import SiteFooter from "./SiteFooter.jsx";

const FONT_STACK =
  "'Inter', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif";

function formatUpdateDate(value, language) {
  const [year, month, day] = value.split("-").map(Number);

  return new Intl.DateTimeFormat(language === "ms" ? "ms-MY" : "en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(Date.UTC(year, month - 1, day)));
}

export default function UpdatesPage({ language, onNavigate, headingRef, concept = false }) {
  const copy = getUiCopy(language);
  const updates = getUpdateHistory(language);
  const environment = getAppEnvironment();

  const toggleTheme = (nextTheme) => {
    applyDocumentTheme(nextTheme);
    try {
      localStorage.setItem("pcds-theme", nextTheme);
    } catch {
      // Theme selection still works for this session when storage is unavailable.
    }
  };

  return (
    <div
      className="app-shell updates-shell"
      style={{
        minHeight: "100vh",
        backgroundColor: "var(--page-bg)",
        color: "var(--text-body)",
        fontFamily: FONT_STACK,
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
        * { box-sizing: border-box; }
        body { background: var(--page-bg); }
        .app-shell { animation: app-fade-in 0.5s ease; }
        @keyframes app-fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        a:hover { opacity: 0.8; }
        ::selection { background: color-mix(in srgb, var(--brand) 26%, transparent); }
        @media (prefers-reduced-motion: reduce) {
          .app-shell { animation: none !important; }
        }
        @media (max-width: 760px) {
          .updates-main { padding: 32px 20px 64px !important; }
          .updates-title { font-size: 36px !important; }
          .updates-header-row { align-items: center !important; }
          .updates-entry { grid-template-columns: 1fr !important; gap: 10px !important; }
        }
      `}</style>

      <main
        className="updates-main"
        style={{ maxWidth: "860px", margin: "0 auto", padding: "40px 24px 80px" }}
      >
        <header style={{ marginBottom: "34px" }}>
          <div
            className="updates-header-row"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "20px",
              marginBottom: "18px",
            }}
          >
            <NavigationPillLink
              className="updates-back-link"
              href={getRouteHref(
                language === "ms" ? "tracker-ms" : "tracker-en"
              )}
              onClick={(event) =>
                onNavigate(
                  event,
                  language === "ms" ? "tracker-ms" : "tracker-en"
                )
              }
            >
              ← {copy.updatesPage.backToTracker}
            </NavigationPillLink>
            <div
              className="header-controls"
              style={{ display: "flex", alignItems: "center", gap: "8px" }}
            >
              <LanguageToggle
                copy={copy}
                englishRouteId="updates"
                language={language}
                malayRouteId="updates-ms"
                onNavigate={onNavigate}
              />
              <ThemeToggle copy={copy} onThemeToggle={toggleTheme} />
            </div>
          </div>

          <p
            className="tracker-kicker"
            style={{
              margin: "0 0 12px",
              color: "var(--text-muted)",
              fontSize: "10px",
              fontWeight: 800,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
            }}
          >
            {copy.header.kicker}
          </p>

          <h1
            className={`updates-title page-heading${concept ? ' tracker-title' : ''}`}
            ref={headingRef}
            tabIndex={-1}
            style={{
              margin: 0,
              color: "var(--text-strong)",
              fontSize: "48px",
              fontWeight: 800,
              lineHeight: 1.04,
            }}
          >
            <span className={concept ? 'tracker-title-context' : undefined}>PCDS 2030</span>
            {!concept && <br />}
            <span className={concept ? 'tracker-title-product' : undefined} style={{ color: "var(--brand)" }}>
              {concept ? (language === 'ms' ? 'Kemas Kini Tracker' : 'Tracker Updates') : copy.updatesPage.title}
            </span>
          </h1>
          <p
            style={{
              maxWidth: "690px",
              margin: "18px 0 0",
              color: "var(--text-muted)",
              fontSize: "16px",
              lineHeight: 1.6,
            }}
          >
            {copy.updatesPage.intro}
          </p>
        </header>

        <section aria-label={copy.updatesPage.entriesLabel}>
          {updates.map((update) => (
            <article
              className="updates-entry"
              key={`${update.date}-${update.projectName}`}
              style={{
                display: "grid",
                gridTemplateColumns: "210px minmax(0, 1fr)",
                gap: "24px",
                padding: "24px 0",
                borderTop: "1px solid var(--border)",
              }}
            >
              <div>
                <time
                  dateTime={update.date}
                  style={{
                    display: "block",
                    color: "var(--text-secondary)",
                    fontSize: "12px",
                    fontWeight: 750,
                    lineHeight: 1.4,
                  }}
                >
                  {formatUpdateDate(update.date, language)}
                </time>
                <div style={{ marginTop: "9px" }}>
                  <ProjectClassificationBadge
                    color={update.sectorColor}
                    copy={copy}
                    kind={update.kind}
                    name={update.sectorName}
                  />
                </div>
              </div>

              <div>
                <h2
                  style={{
                    margin: 0,
                    color: "var(--text-strong)",
                    fontSize: "20px",
                    fontWeight: 800,
                    lineHeight: 1.25,
                  }}
                >
                  {update.projectDisplayName}
                </h2>
                <p
                  style={{
                    margin: "9px 0 0",
                    color: "var(--text-secondary)",
                    fontSize: "14px",
                    lineHeight: 1.6,
                  }}
                >
                  {update.description}
                </p>
                <a
                  href={update.source.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "inline-block",
                    marginTop: "13px",
                    color: "var(--brand-strong)",
                    fontSize: "12px",
                    fontWeight: 700,
                    lineHeight: 1.45,
                    textDecoration: "underline",
                    textDecorationColor:
                      "color-mix(in srgb, var(--brand-strong) 45%, transparent)",
                    textUnderlineOffset: "3px",
                  }}
                >
                  {copy.updatesPage.source} {update.source.label}
                </a>
              </div>
            </article>
          ))}
        </section>

        <SiteFooter
          concept={concept}
          copy={copy}
          currentPage="updates"
          language={language}
          onNavigate={onNavigate}
        />
      </main>

      <EnvironmentBadge environment={environment} copy={copy} />
    </div>
  );
}
