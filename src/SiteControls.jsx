import { useEffect, useLayoutEffect, useRef, useState, useSyncExternalStore } from "react";
import { shouldShowEnvironmentBadge } from "./environment.js";
import { getRouteHref } from "./routes.js";

const FONT_STACK =
  "'Inter', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif";

const useIsomorphicLayoutEffect =
  typeof window === "undefined" ? useEffect : useLayoutEffect;

function getDocumentTheme() {
  if (typeof document === "undefined") {
    return "light";
  }

  return document.documentElement.dataset.theme === "dark" ? "dark" : "light";
}

function subscribeToDocumentTheme(onStoreChange) {
  if (typeof MutationObserver === "undefined") {
    return () => {};
  }

  const observer = new MutationObserver(onStoreChange);
  observer.observe(document.documentElement, {
    attributeFilter: ["data-theme"],
    attributes: true,
  });

  return () => observer.disconnect();
}

function getAccessibleClassificationColors(color) {
  const accent = typeof color === "string" && /^#[\da-f]{6}$/i.test(color.trim())
    ? color.trim()
    : "#475569";
  return { background: accent, text: "#ffffff" };
}

export function NavigationPillLink({
  children,
  className = "",
  href,
  onClick,
}) {
  return (
    <a
      className={`navigation-pill-link ${className}`.trim()}
      href={href}
      onClick={onClick}
    >
      <span className="navigation-pill-link-inner">{children}</span>
    </a>
  );
}

export function ProjectClassificationBadge({
  activeCategory = false,
  activeKind = false,
  color,
  copy,
  kind,
  maxWidth = "100%",
  name,
  onCategoryFilter,
  onKindFilter,
}) {
  const label = kind === "sector" ? copy.card.sector : copy.card.enabler;
  const groupLabel = kind === "sector"
    ? copy.categoryFilters.sectors
    : copy.categoryFilters.enablers;
  const interactive = Boolean(onCategoryFilter && onKindFilter);
  const classificationColors = getAccessibleClassificationColors(color);
  const classificationRef = useRef(null);
  const kindRef = useRef(null);
  const nameRef = useRef(null);
  const [indicatorMetrics, setIndicatorMetrics] = useState(null);

  useIsomorphicLayoutEffect(() => {
    if (!interactive) {
      return undefined;
    }

    const updateIndicatorMetrics = () => {
      const root = classificationRef.current;
      const kindButton = kindRef.current;
      const nameButton = nameRef.current;

      if (!root || !kindButton || !nameButton) {
        return;
      }

      const getMetrics = (element) => {
        return {
          // Use layout dimensions instead of getBoundingClientRect(). The
          // project grid scales cards during filter transitions, and a
          // transformed rect would otherwise leave the active highlight
          // narrower than its button after the animation settles.
          left: element.offsetLeft,
          width: element.offsetWidth,
        };
      };

      setIndicatorMetrics({
        kind: getMetrics(kindButton),
        name: getMetrics(nameButton),
      });
    };

    updateIndicatorMetrics();

    const resizeObserver = typeof ResizeObserver === "undefined"
      ? null
      : new ResizeObserver(updateIndicatorMetrics);

    [classificationRef.current, kindRef.current, nameRef.current].forEach((element) => {
      resizeObserver?.observe(element);
    });
    window.addEventListener("resize", updateIndicatorMetrics);

    return () => {
      resizeObserver?.disconnect();
      window.removeEventListener("resize", updateIndicatorMetrics);
    };
  }, [interactive, kind, label, maxWidth, name]);

  if (interactive) {
    const kindActionLabel = activeKind
      ? copy.categoryFilters.clearGroup(groupLabel)
      : copy.categoryFilters.showGroup(groupLabel);
    const categoryActionLabel = activeCategory
      ? copy.categoryFilters.clearCategory(name)
      : copy.categoryFilters.showCategory(name);
    const handleFilterClick = (event, action) => {
      action();

      if (event.detail > 0) {
        event.currentTarget.blur();
      }
    };

    return (
      <div
        className="project-classification project-classification--interactive"
        data-active-target={activeCategory ? "name" : "kind"}
        data-indicator-ready={indicatorMetrics ? "true" : "false"}
        role="group"
        aria-label={copy.categoryFilters.label(label, name)}
        ref={classificationRef}
        style={{
          "--project-classification-accent": color,
          "--project-classification-kind-left": `${indicatorMetrics?.kind.left ?? 0}px`,
          "--project-classification-kind-width": `${indicatorMetrics?.kind.width ?? 0}px`,
          "--project-classification-name-left": `${indicatorMetrics?.name.left ?? 0}px`,
          "--project-classification-name-width": `${indicatorMetrics?.name.width ?? 0}px`,
          "--project-classification-fill": classificationColors.background,
          "--project-classification-contrast": classificationColors.text,
          maxWidth,
        }}
      >
        <span className="project-classification-indicator" aria-hidden="true" />
        <button
          className="project-classification-button project-classification-kind"
          type="button"
          onClick={(event) => handleFilterClick(event, onKindFilter)}
          aria-label={kindActionLabel}
          aria-pressed={activeKind}
          ref={kindRef}
        >
          <span>{label}</span>
        </button>
        <button
          className="project-classification-button project-classification-name"
          type="button"
          onClick={(event) => handleFilterClick(event, onCategoryFilter)}
          aria-label={categoryActionLabel}
          aria-pressed={activeCategory}
          ref={nameRef}
        >
          <span>{name}</span>
        </button>
      </div>
    );
  }

  return (
    <span
      className="project-classification"
      style={{
        "--project-classification-accent": color,
        "--project-classification-fill": classificationColors.background,
        "--project-classification-contrast": classificationColors.text,
        display: "inline-flex",
        alignItems: "center",
        position: "relative",
        width: "max-content",
        maxWidth,
      }}
    >
      <span
        style={{
          display: "inline-flex",
          alignItems: "center",
          position: "absolute",
          inset: "0 auto 0 0",
          zIndex: 2,
          minHeight: "28px",
          padding: "7px 10px",
          border: "1px solid var(--project-classification-accent)",
          borderRadius: "999px",
          backgroundColor: "var(--project-classification-fill)",
          color: "var(--project-classification-contrast)",
          fontFamily: FONT_STACK,
          fontSize: "11px",
          fontWeight: 800,
          letterSpacing: "0",
          lineHeight: 1,
          whiteSpace: "nowrap",
        }}
      >
        {label}
      </span>
      <span
        style={{
          minWidth: 0,
          minHeight: "28px",
          padding: `7px 11px 7px ${kind === "sector" ? "68px" : "78px"}`,
          border: "1px solid var(--project-classification-accent)",
          borderRadius: "999px",
          backgroundColor: "var(--surface)",
          color: "color-mix(in srgb, var(--project-classification-accent) 78%, var(--accent-text-mix))",
          fontFamily: FONT_STACK,
          fontSize: "11px",
          fontWeight: 800,
          lineHeight: 1.25,
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
        }}
      >
        {name}
      </span>
    </span>
  );
}

export function LanguageToggle({
  copy,
  englishRouteId,
  language,
  malayRouteId,
  onNavigate,
}) {
  const options = [
    { id: "en", label: "EN", routeId: englishRouteId },
    { id: "ms", label: "BM", routeId: malayRouteId },
  ];

  return (
    <div
      className="language-toggle"
      role="group"
      aria-label={copy.languageControl.label}
      style={{
        display: "inline-flex",
        alignItems: "center",
        minHeight: "var(--pill-control-height)",
        padding: "3px",
        border: "1px solid var(--border)",
        borderRadius: "var(--pill-control-radius)",
        backgroundColor: "var(--surface)",
      }}
    >
      {options.map((option, index) => (
        <span
          key={option.id}
          style={{ display: "inline-flex", alignItems: "center" }}
        >
          {index > 0 && (
            <span
              aria-hidden="true"
              style={{ color: "var(--text-faint)", fontSize: "10px" }}
            >
              |
            </span>
          )}
          <a
            className={`language-toggle-option${language === option.id ? " language-toggle-option--active" : ""}`}
            href={getRouteHref(option.routeId)}
            hrefLang={option.id === "en" ? "en" : "ms"}
            lang={option.id === "en" ? "en" : "ms"}
            aria-current={language === option.id ? "page" : undefined}
            onClick={(event) => onNavigate(event, option.routeId)}
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              minWidth: "38px",
              minHeight: "var(--pill-control-inner-height)",
              padding: "5px 8px",
              borderRadius: "var(--pill-control-radius)",
              cursor: "pointer",
              fontSize: "var(--pill-control-font-size)",
              fontWeight: 850,
              lineHeight: 1,
              textDecoration: "none",
            }}
          >
            {option.label}
          </a>
        </span>
      ))}
    </div>
  );
}

export function EnvironmentBadge({ environment, copy }) {
  if (!shouldShowEnvironmentBadge(environment)) {
    return null;
  }

  return (
    <div
      className="environment-badge"
      aria-label={copy.accessibility.environment(environment.name)}
      style={{
        border: `1px solid ${environment.badgeColor}`,
        backgroundColor: "var(--surface)",
        color: environment.badgeColor,
        boxShadow: "0 6px 16px var(--shadow)",
        fontFamily: FONT_STACK,
        pointerEvents: "none",
      }}
    >
      {environment.badgeLabel}
    </div>
  );
}

export function ThemeToggle({ onThemeToggle, copy }) {
  const currentTheme = useSyncExternalStore(
    subscribeToDocumentTheme,
    getDocumentTheme,
    () => "light"
  );
  const nextTheme = currentTheme === "dark" ? "light" : "dark";
  const actionLabel = nextTheme === "dark"
    ? copy.themeToggle.switchToDark
    : copy.themeToggle.switchToLight;
  const handleThemeToggle = () => {
    const requestedTheme =
      document.documentElement.dataset.theme === "dark" ? "light" : "dark";
    onThemeToggle(requestedTheme);
  };

  return (
    <button
      className="theme-toggle"
      type="button"
      onClick={handleThemeToggle}
      aria-label={actionLabel}
      title={actionLabel}
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        width: "var(--pill-control-height)",
        height: "var(--pill-control-height)",
        padding: 0,
        borderRadius: "var(--pill-control-radius)",
        cursor: "pointer",
      }}
    >
      <svg className="theme-icon-morph" aria-hidden="true" width="18" height="18" viewBox="0 0 24 24">
        <mask id="theme-toggle-moon-mask">
          <rect width="24" height="24" fill="#fff" />
          <circle className="theme-icon-hole" cx="17" cy="7" r="7" fill="#000" />
        </mask>
        <circle className="theme-icon-core" cx="12" cy="12" r="9" mask="url(#theme-toggle-moon-mask)" />
        <g className="theme-icon-rays">
          <line x1="12" y1="1.6" x2="12" y2="3.8" />
          <line x1="12" y1="20.2" x2="12" y2="22.4" />
          <line x1="1.6" y1="12" x2="3.8" y2="12" />
          <line x1="20.2" y1="12" x2="22.4" y2="12" />
          <line x1="4.6" y1="4.6" x2="6.2" y2="6.2" />
          <line x1="17.8" y1="17.8" x2="19.4" y2="19.4" />
          <line x1="4.6" y1="19.4" x2="6.2" y2="17.8" />
          <line x1="17.8" y1="6.2" x2="19.4" y2="4.6" />
        </g>
      </svg>
    </button>
  );
}
