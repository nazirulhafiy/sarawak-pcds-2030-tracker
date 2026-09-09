import { useEffect, useRef, useState } from "react";

import App from "./App.jsx";
import AboutPage from "./AboutPage.jsx";
import BackToTop from "./BackToTop.jsx";
import { applyDocumentRouteMetadata } from "./documentMetadata.js";
import { getUiCopy } from "./localization.js";
import {
  getRouteById,
  getRouteHref,
  resolveRoute,
} from "./routes.js";
import UpdatesPage from "./UpdatesPage.jsx";
import { LanguageToggle, ThemeToggle } from "./SiteControls.jsx";
import { applyDocumentTheme } from "./theme.js";

export default function Site({ route, concept = false }) {
  const [activeRoute, setActiveRoute] = useState(route);
  const [menuOpen, setMenuOpen] = useState(false);
  const [navIntroDone, setNavIntroDone] = useState(false);
  const [skipIntro, setSkipIntro] = useState(false);
  const introChecked = useRef(false);
  useEffect(() => {
    if (!concept || introChecked.current) return;
    introChecked.current = true;
    try {
      if (sessionStorage.getItem('pcds-v2-intro-seen') === '1') {
        queueMicrotask(() => {
          setNavIntroDone(true);
          setSkipIntro(true);
        });
      }
      sessionStorage.setItem('pcds-v2-intro-seen', '1');
    } catch { /* In-memory navigation still skips the introduction. */ }
  }, [concept]);
  const menuButtonRef = useRef(null);
  const navRef = useRef(null);
  const pageHeadingRef = useRef(null);
  const previousPageRef = useRef(route.page);
  const copy = getUiCopy(activeRoute.language);

  useEffect(() => {
    if (!menuOpen) return;
    const dismiss = (event) => {
      if (event.type === "keydown" && event.key === "Escape") {
        setMenuOpen(false);
        menuButtonRef.current?.focus();
      } else if (event.type === "pointerdown" && !navRef.current?.contains(event.target)) {
        setMenuOpen(false);
      }
    };
    const resize = () => { if (window.innerWidth > 760) setMenuOpen(false); };
    document.addEventListener("keydown", dismiss);
    document.addEventListener("pointerdown", dismiss);
    window.addEventListener("resize", resize);
    return () => {
      document.removeEventListener("keydown", dismiss);
      document.removeEventListener("pointerdown", dismiss);
      window.removeEventListener("resize", resize);
    };
  }, [menuOpen]);

  useEffect(() => {
    const handlePopState = () => {
      setSkipIntro(true);
      setNavIntroDone(true);
      setMenuOpen(false);
      setActiveRoute(
        resolveRoute(window.location.pathname, import.meta.env.BASE_URL)
      );
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  useEffect(() => {
    applyDocumentRouteMetadata(activeRoute);

    const pageChanged = previousPageRef.current !== activeRoute.page;
    previousPageRef.current = activeRoute.page;

    if (!pageChanged) {
      return undefined;
    }

    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    const frameId = window.requestAnimationFrame(() => {
      pageHeadingRef.current?.focus({ preventScroll: true });
    });

    return () => window.cancelAnimationFrame(frameId);
  }, [activeRoute]);

  const navigate = (event, routeId, hash = "") => {
    if (
      event.defaultPrevented ||
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey
    ) {
      return;
    }

    event.preventDefault();
    setSkipIntro(true);
    setNavIntroDone(true);
    setMenuOpen(false);
    const nextRoute = getRouteById(routeId);
    const pageChanged = nextRoute.page !== activeRoute.page;

    const navigationQuery = new URLSearchParams(window.location.search);
    if (import.meta.env.VITE_DESIGN_CONCEPT === 'v2') navigationQuery.delete('concept');
    else if (concept) navigationQuery.set('concept', 'v2');
    const queryString = navigationQuery.toString();
    window.history.pushState(
      {},
      "",
      `${getRouteHref(routeId, import.meta.env.BASE_URL)}${queryString ? `?${queryString}` : ""}${hash ? `#${hash}` : ""}`
    );
    setActiveRoute(nextRoute);

    if (hash) {
      window.requestAnimationFrame(() => {
        document.getElementById(hash)?.scrollIntoView();
      });
    } else if (pageChanged || concept) {
      window.scrollTo({ top: 0 });
    }
  };

  const page = activeRoute.page === "about"
    ? <AboutPage language={activeRoute.language} onNavigate={navigate} headingRef={pageHeadingRef} />
    : activeRoute.page === "updates"
    ? (
      <UpdatesPage
        concept={concept}
        language={activeRoute.language}
        onNavigate={navigate}
        headingRef={pageHeadingRef}
      />
    )
    : (
      <App
        concept={concept}
        language={activeRoute.language}
        onNavigate={navigate}
        headingRef={pageHeadingRef}
      />
    );

  return (
    <>
      {concept && <nav ref={navRef} className={`concept-nav${navIntroDone ? " concept-nav--ready" : ""}${skipIntro ? " concept-nav--skip-intro" : ""}`} aria-label="Primary navigation"
        onFocusCapture={() => setNavIntroDone(true)}
        onAnimationEnd={(event) => {
          if (event.animationName === "concept-logo-enter") setNavIntroDone(true);
        }}>
        <a className="concept-brand" href={import.meta.env.VITE_DESIGN_CONCEPT === "v2" ? "/" : "/?concept=v2"} onClick={(event) => navigate(event, activeRoute.language === "ms" ? "tracker-ms" : "tracker-en")} aria-label="PCDS 2030 Project Tracker home">
          <img src="/favicon-production-browser.png?v=20260804d" alt="" width="32" height="32" />
          <span className="concept-brand-name" aria-hidden="true">{Array.from("PCDS 2030 Project Tracker").map((letter, index) => <span key={index} className="concept-brand-letter" style={{ "--letter-index": index }}>{letter === " " ? "\u00a0" : letter}</span>)}</span>
        </a>
        <div id="concept-navigation-links" className={`concept-links${menuOpen ? " concept-links--open" : ""}`}>
          <a aria-current={activeRoute.page === 'tracker' ? 'page' : undefined} href={getRouteHref(activeRoute.language === "ms" ? "tracker-ms" : "tracker-en") + (import.meta.env.VITE_DESIGN_CONCEPT === "v2" ? "" : "?concept=v2")} onClick={(event) => navigate(event, activeRoute.language === "ms" ? "tracker-ms" : "tracker-en")}>{activeRoute.language === "ms" ? "Projek" : "Projects"}</a>
          <a aria-current={activeRoute.page === 'updates' ? 'page' : undefined} href={getRouteHref(activeRoute.language === "ms" ? "updates-ms" : "updates") + (import.meta.env.VITE_DESIGN_CONCEPT === "v2" ? "" : "?concept=v2")} onClick={(event) => navigate(event, activeRoute.language === "ms" ? "updates-ms" : "updates")}>{activeRoute.language === "ms" ? "Kemas kini" : "Updates"}</a>
          <a aria-current={activeRoute.page === 'about' ? 'page' : undefined} href={getRouteHref(activeRoute.language === "ms" ? "about-ms" : "about") + (import.meta.env.VITE_DESIGN_CONCEPT === "v2" ? "" : "?concept=v2")} onClick={(event) => navigate(event, activeRoute.language === "ms" ? "about-ms" : "about")}>{activeRoute.language === "ms" ? "Tentang" : "About"}</a>
          <div className="concept-language-menu">
            <LanguageToggle copy={copy} language={activeRoute.language} englishRouteId={activeRoute.page === "about" ? "about" : activeRoute.page === "updates" ? "updates" : "tracker-en"} malayRouteId={activeRoute.page === "about" ? "about-ms" : activeRoute.page === "updates" ? "updates-ms" : "tracker-ms"} onNavigate={navigate} />
          </div>
        </div>
        <div className="concept-utilities">
          <div className="concept-language-desktop">
            <LanguageToggle copy={copy} language={activeRoute.language} englishRouteId={activeRoute.page === "about" ? "about" : activeRoute.page === "updates" ? "updates" : "tracker-en"} malayRouteId={activeRoute.page === "about" ? "about-ms" : activeRoute.page === "updates" ? "updates-ms" : "tracker-ms"} onNavigate={navigate} />
          </div>
          <ThemeToggle copy={copy} onThemeToggle={(theme) => {
            applyDocumentTheme(theme);
            try { localStorage.setItem("pcds-theme", theme); } catch { /* Theme still works without storage. */ }
          }} />
          <button ref={menuButtonRef} className="concept-menu-toggle" type="button" aria-expanded={menuOpen} aria-controls="concept-navigation-links" aria-label={activeRoute.language === "ms" ? (menuOpen ? "Tutup menu" : "Buka menu") : (menuOpen ? "Close menu" : "Open menu")} onClick={() => setMenuOpen(!menuOpen)}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
              <path d={menuOpen ? "M6 6l12 12M18 6L6 18" : "M4 7h16M4 12h16M4 17h16"} />
            </svg>
          </button>
        </div>
      </nav>}
      {page}
      <BackToTop label={copy.accessibility.backToTop} />
    </>
  );
}
