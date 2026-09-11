import { createContext, useContext, useEffect, useRef, useState } from "react";

import {
  ECONOMIC_SECTOR_IDS,
  LAST_UPDATED,
  SECTORS,
} from "./trackerData.js";
import { getAppEnvironment } from "./environment.js";
import {
  DEFAULT_LANGUAGE,
  getUiCopy,
  localizeSectors,
} from "./localization.js";
import { getProjectAnchor, getRouteHref } from "./routes.js";
import {
  EnvironmentBadge,
  LanguageToggle,
  NavigationPillLink,
  ProjectClassificationBadge,
  ThemeToggle,
} from "./SiteControls.jsx";
import SiteFooter from "./SiteFooter.jsx";
import { applyDocumentTheme } from "./theme.js";

const FONT_STACK = "'Inter', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif";
const FILTER_EXIT_DURATION_MS = 240;
const FILTER_ENTER_SETTLE_MS = 1500;
const FILTER_ENTER_LEAD_MS = 100;
const FILTER_ENTER_STAGGER_MS = 72;
const FILTER_ENTER_MAX_STAGGER_INDEX = 14;

const STATUS_CONFIG = {
  "Awaiting Decision": {
    group: "ongoing",
    order: 1,
  },
  "In Progress": {
    group: "ongoing",
    order: 1,
  },
  Planning: {
    group: "planning",
    order: 0,
  },
  Operational: {
    group: "completed",
    order: 2,
  },
  Designated: {
    group: "completed",
    order: 2,
  },
  Enacted: {
    group: "completed",
    order: 2,
  },
};

function getFilters(copy) {
  return [
    { id: "all", label: copy.filters.all },
    { id: "planning", label: copy.filters.planning },
    { id: "ongoing", label: copy.filters.ongoing },
    { id: "completed", label: copy.filters.completed },
  ];
}

function getStatusMeta(status, copy) {
  const config = STATUS_CONFIG[status] || {
    group: "unknown",
    order: 99,
  };
  const translated = copy.status[status] || {
    ...copy.status.fallback,
    label: status,
  };

  return { ...translated, ...config };
}

function getPublicStatusMeta(status, milestones, copy) {
  const statusMeta = getStatusMeta(status, copy);
  const hasOpenMilestone = milestones.some((milestone) => !milestone.done);

  if (statusMeta.group === "completed" && hasOpenMilestone) {
    return getStatusMeta("In Progress", copy);
  }

  return statusMeta;
}

function filterRowsByStatus(rows, filter) {
  if (filter.id === "all") {
    return rows;
  }

  return rows.filter((row) => row.statusMeta.group === filter.id);
}

function filterRowsByClassification(rows, filterId) {
  if (filterId.startsWith("group:")) {
    return rows.filter((row) => row.kind === filterId.slice("group:".length));
  }

  if (filterId.startsWith("category:")) {
    return rows.filter((row) => row.sectorId === filterId.slice("category:".length));
  }

  return rows;
}

function getSearchableProjectFields(row) {
  return [
    row.displayName,
    row.name,
    row.sectorName,
    row.summary,
    row.lead,
    row.value,
    ...row.milestones.map((milestone) => milestone.text),
    ...row.sources.map((source) => source.label),
  ].filter(Boolean);
}

function filterRowsBySearch(rows, query) {
  const normalizedQuery = query.trim().replace(/\s+/g, " ").toLocaleLowerCase();

  if (!normalizedQuery) {
    return rows;
  }

  // A complete phrase must occur within one public field. This deliberately
  // avoids loose multi-token matches spread across unrelated card content.
  return rows.filter((row) =>
    getSearchableProjectFields(row).some((field) =>
      field.toLocaleLowerCase().includes(normalizedQuery)
    )
  );
}

function getInitialSearchQuery() {
  if (typeof window === "undefined") {
    return "";
  }

  return new URLSearchParams(window.location.search).get("q") || "";
}

function getMilestoneCountLabel(row, copy) {
  if (row.totalMilestones === 0) {
    return copy.milestones.none;
  }

  return copy.milestones.count(row.doneMilestones, row.totalMilestones, row.statusMeta.group);
}

function TrackerWordCycle({ finalWord }) {
  const ref = useRef(null);
  useEffect(() => {
    const element = ref.current;
    const measure = () => {
      element.querySelectorAll('.tracker-word-rotator-track > span').forEach((word, index) => {
        element.style.setProperty(`--word-width-${index}`, `${word.offsetWidth}px`);
      });
    };
    const observer = new ResizeObserver(measure);
    element.querySelectorAll('.tracker-word-rotator-track > span').forEach(word => observer.observe(word));
    measure();
    return () => observer.disconnect();
  }, []);
  return <span ref={ref} className="tracker-word-rotator" aria-label={finalWord}>
    <span className="tracker-word-sizer" aria-hidden="true">{finalWord}</span>
    <span className="tracker-word-rotator-track" aria-hidden="true">
      {['Status', 'Milestones', 'Links', finalWord].map((word, wordIndex) => (
        <span key={wordIndex} style={{ '--word-start': `${300 + wordIndex * 1400}ms` }}>
          {Array.from(word).map((letter, index) => <span className="tracker-cycle-letter" key={index} style={{ '--letter-delay': `${index * 28}ms` }}>{letter}</span>)}
        </span>
      ))}
    </span>
  </span>;
}

function renderTrackerHeroTitle(title, concept = false) {
  const match = title.match(/^(.*?)(Tracker)$/i);

  if (!match) {
    return title;
  }

  return <>
    <span className="tracker-title-word tracker-title-word-prefix">{match[1].trim()}</span>{" "}
    <span className="tracker-title-word tracker-title-word-accent">
      {concept ? <TrackerWordCycle finalWord={match[2]} /> : match[2]}
    </span>
  </>;
}

function getProjectRows(sectors, copy) {
  return sectors.filter((sector) => !sector.isOverview).flatMap((sector) => {
    const kind = ECONOMIC_SECTOR_IDS.has(sector.id) ? "sector" : "enabler";

    return sector.projects.map((project) => {
      const displayName = project.displayName || project.name;
      const doneMilestones = project.milestones.filter((milestone) => milestone.done).length;
      const totalMilestones = project.milestones.length;
      const nextMilestone = project.milestones.find((milestone) => !milestone.done);
      const latestMilestone = [...project.milestones].reverse().find((milestone) => milestone.done);
      const statusMeta = getPublicStatusMeta(project.status, project.milestones, copy);

      return {
        ...project,
        id: `${sector.id}-${project.name}`,
        displayName,
        sectorId: sector.id,
        sectorName: sector.name,
        sectorColor: sector.color,
        kind,
        doneMilestones,
        totalMilestones,
        progress: totalMilestones > 0 ? Math.round((doneMilestones / totalMilestones) * 100) : 0,
        nextMilestone,
        latestMilestone,
        statusMeta,
        attentionOrder: statusMeta.order,
      };
    });
  });
}

function sortProjectRows(rows, language = DEFAULT_LANGUAGE) {
  return [...rows].sort((a, b) => {
    if (a.attentionOrder !== b.attentionOrder) {
      return a.attentionOrder - b.attentionOrder;
    }

    return a.displayName.localeCompare(b.displayName, language === "ms" ? "ms-MY" : "en-MY");
  });
}

function formatLastUpdated(value, language = DEFAULT_LANGUAGE) {
  const [year, month, day] = value.split("-").map(Number);

  if (![year, month, day].every(Number.isInteger)) {
    return value;
  }

  return new Intl.DateTimeFormat(language === "ms" ? "ms-MY" : "en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(Date.UTC(year, month - 1, day)));
}

const MetricEntranceContext = createContext(true);

function useCountUp(target, duration = 1400) {
  const entranceStarted = useContext(MetricEntranceContext);
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (!Number.isFinite(target) || target === 0 || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      const frameId = window.requestAnimationFrame(() => setDisplayValue(Number.isFinite(target) ? target : 0));
      return () => window.cancelAnimationFrame(frameId);
    }

    let frameId = null;
    if (!entranceStarted) return;
    let startTime = null;
    const animate = (timestamp) => {
      if (startTime === null) {
        startTime = timestamp;
      }

      const progress = Math.min((timestamp - startTime) / duration, 1);
      const easedProgress = 1 - Math.pow(1 - progress, 3);
      setDisplayValue(Math.round(target * easedProgress));

      if (progress < 1) {
        frameId = window.requestAnimationFrame(animate);
      }
    };

    frameId = window.requestAnimationFrame(animate);

    return () => {
      if (frameId !== null) {
        window.cancelAnimationFrame(frameId);
      }
    };
  }, [duration, target, entranceStarted]);

  return displayValue;
}

function AnimatedMetricNumber({ value }) {
  const displayValue = useCountUp(value);

  return <span>{displayValue}</span>;
}

function AnimatedMetricValue({ value }) {
  const segments = String(value).split(/(\d+)/);

  return (
    <span aria-hidden="true">
      {segments.map((segment, index) => {
        if (!segment) {
          return null;
        }

        return /^\d+$/.test(segment)
          ? <AnimatedMetricNumber key={`${segment}-${index}`} value={Number(segment)} />
          : <span key={`${segment}-${index}`}>{segment}</span>;
      })}
    </span>
  );
}

function StatusBadge({ statusMeta }) {
  return (
    <span
      className="project-status-badge"
      title={statusMeta.description}
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "6px",
        justifySelf: "start",
        width: "max-content",
        maxWidth: "100%",
        minHeight: "24px",
        padding: "4px 9px",
        borderRadius: "5px",
        border: "1px solid var(--border)",
        backgroundColor: "var(--surface)",
        color: "var(--text-body)",
        fontSize: "10px",
        fontWeight: 850,
        letterSpacing: "0.08em",
        lineHeight: 1,
        textTransform: "uppercase",
        whiteSpace: "nowrap",
        fontFamily: FONT_STACK,
      }}
    >
      <span className="project-status-dot" aria-hidden="true" />
      {statusMeta.label}
    </span>
  );
}

function MetricCue({ type, expanded = false, inline = false }) {
  const path =
    type === "projects"
      ? "M1 2h14M1 7h14M1 12h14"
      : type === "milestones"
        ? "M2 3.5 8 10.5 14 3.5"
        : "M1 2h14M3.5 7h9M6 12h4";

  return (
    <span
      className={`summary-metric-cue${inline ? " summary-metric-cue--inline" : ""}`}
      aria-hidden="true"
    >
      <svg
        className={type === "milestones" && expanded ? "summary-metric-cue-chevron--expanded" : ""}
        viewBox="0 0 16 14"
        width="9"
        height="9"
        fill="none"
      >
        <path
          d={path}
          stroke="currentColor"
          strokeWidth={type === "filter" ? "1.35" : "1.4"}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}

function Metric({
  value,
  label,
  active = false,
  flatActive = false,
  ariaLabel,
  expanded,
  cue,
  cuePersistent = false,
  onClick,
}) {
  const interactive = typeof onClick === "function";
  const MetricElement = interactive ? "button" : "div";
  const interactionProps = interactive
    ? {
        type: "button",
        onClick,
        "aria-label": ariaLabel || `${label}: ${value}`,
        ...(expanded === undefined ? { "aria-pressed": active } : { "aria-expanded": expanded }),
      }
    : ariaLabel
      ? { "aria-label": ariaLabel, role: "group" }
      : {};

  return (
    <MetricElement
      {...interactionProps}
      className={`summary-metric${interactive ? " summary-metric--interactive" : ""}${active ? " summary-metric--active" : ""}${flatActive ? " summary-metric--flat-active" : ""}${cue ? " summary-metric--cue" : ""}${cuePersistent ? " summary-metric--cue-persistent" : ""}`}
      style={{
        minHeight: "78px",
        padding: "13px 15px 14px",
        width: "100%",
        textAlign: "left",
      }}
    >
      <div
        style={{
          color: "var(--text-strong)",
          fontFamily: FONT_STACK,
          fontSize: "23px",
          fontWeight: 800,
          fontVariantNumeric: "tabular-nums",
          lineHeight: 1,
        }}
      >
        <AnimatedMetricValue value={value} />
      </div>
      <div
        style={{
          marginTop: "9px",
          color: "var(--text-muted)",
          fontFamily: FONT_STACK,
          fontSize: "10px",
          fontWeight: 700,
          letterSpacing: "0.1em",
          lineHeight: 1.4,
          textTransform: "uppercase",
        }}
      >
        {label}
      </div>
      {cue && <MetricCue type={cue} expanded={expanded} />}
    </MetricElement>
  );
}

function SummaryMetrics({ activeFilter, onFilter, rows, copy }) {
  const planning = rows.filter((row) => row.statusMeta.group === "planning").length;
  const ongoing = rows.filter((row) => row.statusMeta.group === "ongoing").length;
  const completeLike = rows.filter((row) => row.statusMeta.group === "completed").length;
  const doneMilestones = rows.reduce((sum, row) => sum + row.doneMilestones, 0);
  const totalMilestones = rows.reduce((sum, row) => sum + row.totalMilestones, 0);
  const milestoneProgress = totalMilestones ? (doneMilestones / totalMilestones) * 100 : 0;
  const statusMetrics = [
    { id: "all", value: rows.length, label: copy.metrics.trackedProjects },
    { id: "planning", value: planning, label: copy.metrics.planning },
    { id: "ongoing", value: ongoing, label: copy.metrics.ongoing },
    { id: "completed", value: completeLike, label: copy.metrics.completed },
  ];

  return (
    <section className="summary-wrap">
      <div
        className="summary-metrics"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(132px, 1fr))",
          gap: "10px",
        }}
      >
        {statusMetrics.map((metric) => (
          <Metric
            flatActive={metric.id === "all"}
            key={metric.id}
            active={activeFilter === metric.id}
            cue={metric.id === "all" ? "projects" : "filter"}
            cuePersistent={
              (metric.id === "all" ? activeFilter !== "all" : activeFilter === metric.id)
            }
            label={metric.label}
            onClick={() => onFilter(metric.id)}
            value={metric.value}
          />
        ))}
        <div className="desktop-milestone-metric">
          <Metric
            ariaLabel={copy.milestones.progress(doneMilestones, totalMilestones)}
            label={copy.metrics.milestones}
            value={`${doneMilestones}/${totalMilestones}`}
          />
        </div>
      </div>
      <div
        className="mobile-milestone-summary summary-metric"
        aria-label={copy.milestones.progress(doneMilestones, totalMilestones)}
        role="group"
        style={{
          display: "none",
          padding: "16px 18px",
          marginTop: "10px",
          width: "100%",
          textAlign: "left",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            justifyContent: "space-between",
            gap: "14px",
          }}
        >
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "7px",
              color: "var(--text-muted)",
              fontSize: "10px",
              fontWeight: 800,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
            }}
          >
            {copy.metrics.milestones}
          </div>
          <div
            style={{
              color: "var(--text-strong)",
              fontSize: "22px",
              fontWeight: 800,
              fontVariantNumeric: "tabular-nums",
              lineHeight: 1,
            }}
          >
            <AnimatedMetricValue value={`${doneMilestones}/${totalMilestones}`} />
          </div>
        </div>
        <div
          aria-label={copy.milestones.progress(doneMilestones, totalMilestones)}
          style={{
            height: "6px",
            marginTop: "12px",
            overflow: "hidden",
            borderRadius: "999px",
            backgroundColor: "var(--progress-track)",
          }}
        >
          <div
            style={{
              width: `${milestoneProgress}%`,
              height: "100%",
              borderRadius: "999px",
              backgroundColor: "var(--brand)",
            }}
          />
        </div>
      </div>
    </section>
  );
}

function ProjectResultStatus({ copy, resultCount }) {
  return (
    <span className="visually-hidden" aria-live="polite">
      {copy.categoryFilters.results(resultCount)}
    </span>
  );
}

function DetailSection({ title, children }) {
  return (
    <section style={{ display: "grid", gap: "8px" }}>
      <h3
        style={{
          margin: 0,
          color: "var(--text-faint)",
          fontFamily: FONT_STACK,
          fontSize: "10px",
          fontWeight: 800,
          letterSpacing: "0.1em",
          textTransform: "uppercase",
        }}
      >
        {title}
      </h3>
      <div
        style={{
          color: "var(--text-secondary)",
          fontSize: "14px",
          lineHeight: 1.6,
        }}
      >
        {children}
      </div>
    </section>
  );
}

function MilestoneIndicator({ row, copy }) {
  return (
    <div
      className="project-milestone-indicator"
      style={{
        display: "flex",
        alignItems: "center",
        gap: "9px",
        flexWrap: "wrap",
      }}
    >
      <span
        className="project-milestone-label"
        style={{
          color: "var(--text-faint)",
          fontFamily: FONT_STACK,
          fontSize: "10px",
          fontWeight: 800,
          letterSpacing: "0.1em",
          textTransform: "uppercase",
        }}
      >
        {copy.milestones.label}
      </span>
      <div className="project-milestone-bars" style={{ display: "flex", alignItems: "center", gap: "4px" }} aria-hidden="true">
        {row.milestones.map((milestone, index) => (
          <span
            className="project-milestone-segment"
            key={`${row.id}-indicator-${index}`}
            style={{
              width: "18px",
              height: "6px",
              borderRadius: "999px",
              backgroundColor: milestone.done ? "var(--text-icon)" : "var(--border)",
              opacity: milestone.done ? 1 : 0.95,
            }}
          />
        ))}
      </div>
      <span
        className="project-milestone-count"
        style={{
          color: "var(--text-muted)",
          fontFamily: FONT_STACK,
          fontSize: "11px",
          fontWeight: 700,
          whiteSpace: "nowrap",
        }}
      >
        <span aria-hidden="true">
          {copy.milestones.count(row.doneMilestones, row.totalMilestones, row.statusMeta.group)}
        </span>
        <span className="visually-hidden">
          {copy.milestones.progress(row.doneMilestones, row.totalMilestones)}
        </span>
      </span>
    </div>
  );
}

function CollapsedMilestoneSummary({ row, copy }) {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "7px",
        minHeight: "24px",
        color: "var(--text-muted)",
        fontFamily: FONT_STACK,
        fontSize: "11px",
        fontWeight: 750,
        lineHeight: 1.2,
        whiteSpace: "nowrap",
      }}
    >
      <span aria-hidden={row.totalMilestones > 0 ? "true" : undefined}>
        {getMilestoneCountLabel(row, copy)}
      </span>
      {row.totalMilestones > 0 && (
        <span className="visually-hidden">
          {copy.milestones.progress(row.doneMilestones, row.totalMilestones)}
        </span>
      )}
      <span style={{ display: "inline-flex", alignItems: "center", gap: "4px" }} aria-hidden="true">
        {row.milestones.map((milestone, index) => (
          <span
            key={`${row.id}-collapsed-indicator-${index}`}
            style={{
              width: "15px",
              height: "5px",
              borderRadius: "999px",
              backgroundColor: milestone.done ? "var(--text-icon)" : "var(--border)",
              opacity: milestone.done ? 1 : 0.95,
            }}
          />
        ))}
      </span>
    </span>
  );
}

function FactList({ row, copy }) {
  const undisclosedValues = new Set(["Not disclosed", "Tidak didedahkan"]);
  const hasReportedValue = row.value && row.value !== "—" && !undisclosedValues.has(row.value);

  return (
    <div
      className="project-facts"
      style={{
        display: "grid",
        gridTemplateColumns: hasReportedValue ? "repeat(2, minmax(0, 1fr))" : "1fr",
        border: "1px solid var(--border)",
        borderRadius: "6px",
        backgroundColor: "var(--surface)",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          display: "grid",
          gap: "4px",
          padding: "8px 10px",
          minWidth: 0,
        }}
      >
        <span
          style={{
            color: "var(--text-faint)",
            fontSize: "8px",
            fontWeight: 800,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
          }}
        >
          {copy.facts.lead}
        </span>
        <span style={{ color: "var(--text-body)", fontSize: "12px", fontWeight: 750, lineHeight: 1.35, overflowWrap: "anywhere" }}>{row.lead}</span>
      </div>
      {hasReportedValue && (
        <div
          className="project-facts-value"
          style={{
            display: "grid",
            gap: "4px",
            padding: "8px 10px",
            borderLeft: "1px solid var(--border)",
            minWidth: 0,
          }}
        >
          <span
            style={{
              color: "var(--text-faint)",
              fontSize: "8px",
              fontWeight: 800,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
            }}
          >
            {copy.facts.value}
          </span>
          <span style={{ color: "var(--text-body)", fontSize: "12px", fontWeight: 850, lineHeight: 1.35, overflowWrap: "anywhere" }}>{row.value}</span>
        </div>
      )}
    </div>
  );
}

function SourceLinks({ sources, interactive = true }) {
  return (
    <div style={{ display: "grid", gap: "7px" }}>
      {sources.map((source, index) => (
        <a
          key={source.url}
          className="source-link"
          href={source.url}
          target="_blank"
          rel="noopener noreferrer"
          tabIndex={interactive ? undefined : -1}
          onClick={(event) => event.stopPropagation()}
          style={{
            display: "grid",
            gridTemplateColumns: "20px minmax(0, 1fr) auto",
            alignItems: "center",
            gap: "9px",
            padding: "7px 9px",
            border: "1px solid var(--border-soft)",
            borderRadius: "6px",
            backgroundColor: "var(--surface)",
            color: "var(--text-body)",
            fontFamily: FONT_STACK,
            fontSize: "11px",
            fontWeight: 700,
            textDecoration: "none",
            lineHeight: 1.35,
          }}
        >
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              width: "20px",
              height: "20px",
              borderRadius: "50%",
              border: "1px solid var(--border-soft)",
              backgroundColor: "var(--surface)",
              color: "var(--text-icon)",
              fontSize: "9px",
              fontWeight: 800,
            }}
          >
            {index + 1}
          </span>
          <span>{source.label}</span>
          <span style={{ color: "var(--text-faint)", fontSize: "12px" }}>↗</span>
        </a>
      ))}
    </div>
  );
}

function AccordionReveal({ expanded, children, className = "", id }) {
  return (
    <div
      id={id}
      className={`accordion-reveal ${className}`.trim()}
      aria-hidden={!expanded}
      inert={expanded ? undefined : true}
    >
      <div className="accordion-reveal-inner">{children}</div>
    </div>
  );
}

function formatMilestoneDate(value, language = DEFAULT_LANGUAGE) {
  const date = value?.trim();

  if (!date || date.toLowerCase() === "tbd") {
    return null;
  }

  if (date.toLowerCase() === "ongoing") {
    return language === "ms" ? "Berterusan" : "Ongoing";
  }

  if (date.toLowerCase() === "achieved") {
    return language === "ms" ? "Dicapai" : "Achieved";
  }

  const yearQuarter = date.match(/^(\d{4})-Q([1-4])$/);
  if (yearQuarter) {
    return language === "ms"
      ? `Suku ${yearQuarter[2]} ${yearQuarter[1]}`
      : `Quarter ${yearQuarter[2]} ${yearQuarter[1]}`;
  }

  const yearRange = date.match(/^(\d{4})-(\d{4})$/);
  if (yearRange) {
    return `${yearRange[1]}–${yearRange[2]}`;
  }

  const yearOnward = date.match(/^(\d{4})\+$/);
  if (yearOnward) {
    return language === "ms" ? `mulai ${yearOnward[1]}` : `${yearOnward[1]} onward`;
  }

  const fullDate = date.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (fullDate) {
    return new Intl.DateTimeFormat(language === "ms" ? "ms-MY" : "en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
      timeZone: "UTC",
    }).format(new Date(Date.UTC(Number(fullDate[1]), Number(fullDate[2]) - 1, Number(fullDate[3]))));
  }

  const yearMonth = date.match(/^(\d{4})-(\d{2})$/);
  if (yearMonth) {
    return new Intl.DateTimeFormat(language === "ms" ? "ms-MY" : "en-GB", {
      month: "long",
      year: "numeric",
      timeZone: "UTC",
    }).format(new Date(Date.UTC(Number(yearMonth[1]), Number(yearMonth[2]) - 1, 1)));
  }

  return date;
}

function MilestoneList({ milestones, language }) {
  return (
    <div role="list" style={{ display: "grid", gap: "0" }}>
      {milestones.map((milestone, index) => {
        const formattedDate = formatMilestoneDate(milestone.date, language);

        if (!formattedDate) {
          return (
            <div
              role="listitem"
              key={`${milestone.date}-${index}`}
              style={{
                display: "grid",
                gridTemplateColumns: "8px minmax(0, 1fr)",
                alignItems: "start",
                gap: "10px",
                padding: "7px 0",
              }}
            >
              <span
                aria-hidden="true"
                style={{
                  width: "5px",
                  height: "5px",
                  marginTop: "7px",
                  borderRadius: "50%",
                  backgroundColor: "var(--text-icon)",
                }}
              />
              <span style={{ color: "var(--text-secondary)", fontSize: "13px", lineHeight: 1.45 }}>
                {milestone.text}
              </span>
            </div>
          );
        }

        return (
          <div
            role="listitem"
            key={`${milestone.date}-${index}`}
            style={{
              display: "grid",
              gridTemplateColumns: "118px minmax(0, 1fr)",
              gap: "12px",
              padding: "9px 0",
              borderTop: index === 0 ? "1px solid var(--border)" : "1px solid var(--border-faint)",
            }}
          >
            <span
              style={{
                color: milestone.done ? "var(--text-secondary)" : "var(--text-faint)",
                fontFamily: FONT_STACK,
                fontSize: "11px",
                fontWeight: 700,
              }}
            >
              {formattedDate}
            </span>
            <span style={{ color: "var(--text-secondary)", fontSize: "13px", lineHeight: 1.45 }}>
              {milestone.text}
            </span>
          </div>
        );
      })}
    </div>
  );
}

function CompletedMilestoneRows({ row, language }) {
  const loggedMilestones = row.milestones.filter((milestone) => milestone.done);
  const isComplete = row.totalMilestones > 0 && row.doneMilestones === row.totalMilestones;
  const visibleMilestones = isComplete ? loggedMilestones.slice(0, -1) : loggedMilestones;

  if (visibleMilestones.length === 0) {
    return null;
  }

  return <MilestoneList milestones={visibleMilestones} language={language} />;
}

function FollowingMilestones({ row, copy, language }) {
  const followingMilestones = row.milestones.filter((milestone) => !milestone.done).slice(1);

  if (followingMilestones.length === 0) {
    return null;
  }

  return (
    <DetailSection title={copy.milestones.remaining}>
      <MilestoneList milestones={followingMilestones} language={language} />
    </DetailSection>
  );
}

function getMilestoneCalloutContent(milestone, copy, language) {
  if (!milestone) {
    return { date: null, text: copy.milestones.noOpen };
  }

  const text = milestone.text.replace(/^(ongoing|planning|completed|berterusan|perancangan|selesai):\s*/i, "");

  return { date: formatMilestoneDate(milestone.date, language), text };
}

function NextMilestoneCallout({ row, expanded, copy, language }) {
  const isComplete = row.totalMilestones > 0 && row.doneMilestones === row.totalMilestones;
  const completionMilestone = isComplete ? [...row.milestones].reverse().find((milestone) => milestone.done) : null;
  const content = getMilestoneCalloutContent(isComplete ? completionMilestone : row.nextMilestone, copy, language);

  return (
    <div
      style={{
        display: "grid",
        gap: "5px",
        padding: expanded ? "10px 12px" : "9px 11px",
        border: "1px solid var(--border)",
        borderRadius: "6px",
        backgroundColor: "var(--surface)",
      }}
    >
      <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: "12px" }}>
        <span
          style={{
            color: "var(--text-secondary)",
            fontFamily: FONT_STACK,
            fontSize: "10px",
            fontWeight: 850,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
          }}
        >
          {isComplete ? copy.milestones.final : copy.milestones.next}
        </span>
        {content.date && (
          <span
            style={{
              color: "var(--text-muted)",
              fontFamily: FONT_STACK,
              fontSize: "11px",
              fontWeight: 750,
              lineHeight: 1.3,
              textAlign: "right",
            }}
          >
            {content.date}
          </span>
        )}
      </div>
      <div
        style={{
          color: "var(--text-body)",
          fontSize: "13px",
          fontWeight: expanded ? 700 : 650,
          lineHeight: 1.45,
          overflowWrap: "anywhere",
        }}
      >
        {content.text}
      </div>
    </div>
  );
}

function ProjectCard({
  filterIndex = 0,
  row,
  expanded,
  onToggle,
  copy,
  language,
}) {
  const cardBorderColor = "var(--border-strong)";
  const cardAnchor = getProjectAnchor(row.name);
  const cardButtonId = `${cardAnchor}-toggle`;
  const detailIds = {
    overview: `${cardAnchor}-overview`,
    completed: `${cardAnchor}-completed-milestones`,
    remaining: `${cardAnchor}-remaining-milestones`,
    sources: `${cardAnchor}-sources`,
  };

  return (
    <article
      id={cardAnchor}
      className="project-card"
      data-expanded={expanded ? "true" : "false"}
      style={{
        "--project-filter-delay": `${FILTER_ENTER_LEAD_MS + filterIndex * FILTER_ENTER_STAGGER_MS}ms`,
        position: "relative",
        border: `1px solid ${cardBorderColor}`,
        borderTop: `1px solid ${cardBorderColor}`,
        borderRadius: "8px",
        backgroundColor: "var(--surface)",
        overflow: "hidden",
        transition: "background-color 0.15s ease, border-color 200ms ease, transform 200ms cubic-bezier(0.22, 1, 0.36, 1), box-shadow 200ms ease",
      }}
    >
      <div
        className="project-classification-slot"
        style={{
          position: "absolute",
          top: expanded ? "18px" : "30px",
          left: "18px",
          zIndex: 2,
          display: "flex",
          maxWidth: "calc(100% - 158px)",
        }}
      >
        <ProjectClassificationBadge
          color={row.sectorColor}
          copy={copy}
          kind={row.kind}
          name={row.sectorName}
        />
      </div>
      <button
        id={cardButtonId}
        className="project-card-button"
        type="button"
        onClick={onToggle}
        aria-expanded={expanded}
        aria-controls={Object.values(detailIds).join(" ")}
        aria-label={expanded ? copy.card.collapse(row.displayName) : copy.card.expand(row.displayName)}
        style={{
          width: "100%",
          minWidth: 0,
          minHeight: expanded ? "190px" : "263px",
          display: "grid",
          gridTemplateRows: expanded ? "auto 1fr auto" : "auto auto auto",
          alignContent: expanded ? "stretch" : "space-between",
          gap: expanded ? "14px" : "10px",
          padding: expanded ? "18px" : "30px 18px",
          border: "none",
          backgroundColor: "transparent",
          color: "inherit",
          cursor: "pointer",
          textAlign: "left",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            gap: "12px",
            alignItems: "center",
            minWidth: 0,
          }}
        >
          <span aria-hidden="true" style={{ minHeight: "28px", minWidth: 0 }} />
          <span
            aria-hidden="true"
            className="project-card-details-pill"
            data-expanded={expanded ? "true" : "false"}
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
              minHeight: "24px",
              padding: "5px 8px",
              border: "1px solid var(--border)",
              borderRadius: "999px",
              backgroundColor: "var(--surface)",
              color: "var(--text-secondary)",
              fontFamily: FONT_STACK,
              fontSize: "11px",
              fontWeight: 800,
              letterSpacing: "0",
              lineHeight: 1,
              whiteSpace: "nowrap",
            }}
          >
            {expanded ? copy.card.hideDetails : copy.card.viewDetails}
          </span>
        </div>

        <div>
          <h2
            className="project-card-title"
            style={{
              margin: 0,
              minHeight: expanded ? 0 : "44px",
              display: expanded ? "block" : "-webkit-box",
              WebkitBoxOrient: "vertical",
              WebkitLineClamp: expanded ? "unset" : 2,
              overflow: "hidden",
              color: "var(--text-strong)",
              fontSize: "18px",
              fontWeight: 800,
              lineHeight: 1.22,
            }}
          >
            {row.displayName}
          </h2>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              flexWrap: "wrap",
              marginTop: expanded ? "12px" : "10px",
            }}
          >
            <StatusBadge statusMeta={row.statusMeta} />
            {!expanded && <CollapsedMilestoneSummary row={row} copy={copy} />}
          </div>
          <AccordionReveal expanded={expanded} className="project-card-intro-reveal" id={detailIds.overview}>
            <div
              style={{
                display: "grid",
                gap: "8px",
                paddingTop: "12px",
                color: "var(--text-secondary)",
                fontSize: "13px",
                lineHeight: 1.55,
              }}
            >
              <FactList row={row} copy={copy} />
              <p style={{ margin: 0 }}>{row.summary}</p>
            </div>
          </AccordionReveal>
        </div>

        <div style={{ display: "grid", gap: expanded ? "12px" : 0 }}>
          {expanded && <MilestoneIndicator row={row} copy={copy} />}
          <AccordionReveal expanded={expanded} className="project-card-completed-reveal" id={detailIds.completed}>
            <CompletedMilestoneRows row={row} language={language} />
          </AccordionReveal>
          <NextMilestoneCallout row={row} expanded={expanded} copy={copy} language={language} />
          <AccordionReveal expanded={expanded} className="project-card-timeline-reveal" id={detailIds.remaining}>
            <div style={{ display: "grid", gap: "12px", paddingTop: "2px" }}>
              <FollowingMilestones row={row} copy={copy} language={language} />
            </div>
          </AccordionReveal>
        </div>
      </button>

      <AccordionReveal expanded={expanded} className="project-card-sources-reveal" id={detailIds.sources}>
        <div
          style={{
            display: "grid",
            padding: "18px",
            borderTop: "1px solid var(--border)",
          }}
        >
          <DetailSection title={copy.facts.sources}>
            <SourceLinks sources={row.sources} interactive={expanded} />
          </DetailSection>
        </div>
      </AccordionReveal>
    </article>
  );
}

function ProjectGrid({
  filterPhase,
  rows,
  expandedIds,
  onToggle,
  copy,
  language,
}) {
  const maxFilterIndex = Math.min(Math.max(rows.length - 1, 0), FILTER_ENTER_MAX_STAGGER_INDEX);
  const filterIndexDenominator = Math.max(rows.length - 1, 1);

  return (
    <section
      id="project-card-grid"
      className={`project-card-grid${filterPhase ? ` project-card-grid--filter-${filterPhase}` : ""}`}
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
        alignItems: "start",
        gap: "14px",
      }}
    >
      {rows.map((row, index) => (
        <ProjectCard
          filterIndex={Math.round((index / filterIndexDenominator) * maxFilterIndex)}
          key={row.id}
          row={row}
          expanded={expandedIds.includes(row.id)}
          onToggle={() => onToggle(row.id)}
          copy={copy}
          language={language}
        />
      ))}
    </section>
  );
}

function HeaderControls({ language, onNavigate, onThemeToggle, copy }) {
  return (
    <div className="header-controls" style={{ display: "flex", alignItems: "center", gap: "8px" }}>
      <LanguageToggle
        copy={copy}
        englishRouteId="tracker-en"
        language={language}
        malayRouteId="tracker-ms"
        onNavigate={onNavigate}
      />
      <ThemeToggle copy={copy} onThemeToggle={onThemeToggle} />
    </div>
  );
}

function DiscoveryControls({
  activeClassificationFilter,
  copy,
  onClassificationFilter,
  onSearchChange,
  query,
  rows,
}) {
  const classificationStripRef = useRef(null);
  const [canScrollClassificationBack, setCanScrollClassificationBack] = useState(false);
  const [canScrollClassificationForward, setCanScrollClassificationForward] = useState(false);
  const classificationOptions = [
    { id: "all", label: copy.classificationFilters.all },
    ...Array.from(
      new Map(
        rows.map((row) => [
          row.sectorId,
          { id: `category:${row.sectorId}`, label: row.sectorName },
        ])
      ).values()
    ).sort((a, b) => a.label.localeCompare(b.label)),
  ];
  const classificationOptionCount = classificationOptions.length;

  useEffect(() => {
    const strip = classificationStripRef.current;

    if (!strip) {
      return undefined;
    }

    const updateScrollControls = () => {
      const maximumScrollLeft = Math.max(0, strip.scrollWidth - strip.clientWidth);
      setCanScrollClassificationBack(strip.scrollLeft > 2);
      setCanScrollClassificationForward(strip.scrollLeft < maximumScrollLeft - 2);
    };

    updateScrollControls();
    strip.addEventListener("scroll", updateScrollControls, { passive: true });
    window.addEventListener("resize", updateScrollControls);

    return () => {
      strip.removeEventListener("scroll", updateScrollControls);
      window.removeEventListener("resize", updateScrollControls);
    };
  }, [classificationOptionCount]);

  useEffect(() => {
    const strip = classificationStripRef.current;

    if (!strip) {
      return undefined;
    }

    const ensureSelectedOptionIsVisible = () => {
      const selectedOption = Array.from(strip.children).find(
        (option) => option.dataset.classificationFilter === activeClassificationFilter
      );

      if (!selectedOption) {
        return;
      }

      const stripRect = strip.getBoundingClientRect();
      const optionRect = selectedOption.getBoundingClientRect();
      const edgeInset = 44;
      let scrollOffset = 0;

      if (optionRect.left < stripRect.left + edgeInset) {
        scrollOffset = optionRect.left - stripRect.left - edgeInset;
      } else if (optionRect.right > stripRect.right - edgeInset) {
        scrollOffset = optionRect.right - stripRect.right + edgeInset;
      }

      if (scrollOffset !== 0) {
        strip.scrollBy({
          left: scrollOffset,
          behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
        });
      }
    };

    const frameId = window.requestAnimationFrame(ensureSelectedOptionIsVisible);
    window.addEventListener("resize", ensureSelectedOptionIsVisible);

    return () => {
      window.cancelAnimationFrame(frameId);
      window.removeEventListener("resize", ensureSelectedOptionIsVisible);
    };
  }, [activeClassificationFilter]);

  return (
    <section className="discovery-controls" aria-label={copy.discovery.label}>
      <div
        className={`classification-filter-area${canScrollClassificationBack ? " classification-filter-area--can-back" : ""}${canScrollClassificationForward ? " classification-filter-area--can-forward" : ""}`}
      >
        <button
          className="classification-filter-scroll classification-filter-back"
          type="button"
          aria-label={copy.classificationFilters.scrollBackward}
          disabled={!canScrollClassificationBack}
          onClick={() => classificationStripRef.current?.scrollBy({ left: -260, behavior: "smooth" })}
        >
          <span aria-hidden="true">‹</span>
        </button>
        <div
          className="classification-filter-strip"
          role="group"
          aria-label={copy.classificationFilters.label}
          ref={classificationStripRef}
        >
          {classificationOptions.map((option) => (
            <button
              type="button"
              key={option.id}
              data-classification-filter={option.id}
              className={`classification-filter-option${activeClassificationFilter === option.id ? " classification-filter-option--active" : ""}`}
              onClick={() => onClassificationFilter(
                activeClassificationFilter !== "all" && activeClassificationFilter === option.id
                  ? "all"
                  : option.id
              )}
              aria-pressed={activeClassificationFilter === option.id}
            >
              {option.label}
            </button>
          ))}
        </div>
        <button
          className="classification-filter-scroll classification-filter-forward"
          type="button"
          aria-label={copy.classificationFilters.scrollForward}
          disabled={!canScrollClassificationForward}
          onClick={() => classificationStripRef.current?.scrollBy({ left: 260, behavior: "smooth" })}
        >
          <span aria-hidden="true">›</span>
        </button>
      </div>
      <div className="project-search">
        <label className="visually-hidden" htmlFor="project-search-input">
          {copy.discovery.searchLabel}
        </label>
        <span className="project-search-icon" aria-hidden="true">
          <svg viewBox="0 0 20 20" focusable="false">
            <circle cx="8.5" cy="8.5" r="5.5" />
            <path d="m12.5 12.5 4 4" />
          </svg>
        </span>
        <input
          id="project-search-input"
          type="search"
          value={query}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder=""
          autoComplete="off"
          spellCheck="false"
        />
        {query && (
          <button
            type="button"
            className="project-search-clear"
            onClick={() => onSearchChange("")}
            aria-label={copy.discovery.clearSearch}
          >
            <span aria-hidden="true">×</span>
          </button>
        )}
      </div>
    </section>
  );
}

function NoResults({ copy, query }) {
  return (
    <div className="project-empty-state" role="status">
      <p>{query ? copy.discovery.noSearchResults(query) : copy.discovery.noFilteredResults}</p>
      <span>{copy.discovery.refineHint}</span>
    </div>
  );
}

function renderIntroParagraph(paragraph, programmeName) {
  const programmeNameStart = paragraph.indexOf(programmeName);

  if (programmeNameStart === -1) {
    return paragraph;
  }

  return (
    <>
      {paragraph.slice(0, programmeNameStart)}
      <span className="tracker-programme-name">{programmeName}</span>
      {paragraph.slice(programmeNameStart + programmeName.length)}
    </>
  );
}

export default function App({ language = DEFAULT_LANGUAGE, onNavigate, headingRef, concept = false }) {
  const [summaryEntranceStarted, setSummaryEntranceStarted] = useState(false);
  useEffect(() => {
    if (!concept || !('IntersectionObserver' in window)) return;
    const grid = document.getElementById('project-card-grid');
    if (!grid) return;
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const mobileEntrance = window.matchMedia('(max-width: 760px)').matches;
    const seen = new Set();
    const pending = new Set();
    const reveal = (card) => {
      if (!pending.delete(card)) return false;
      card.style.removeProperty('opacity');
      return true;
    };
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(({ target, isIntersecting }) => {
        if (!isIntersecting) return;
        observer.unobserve(target);
        const wasHidden = reveal(target);
        if (seen.has(target.id)) return;
        seen.add(target.id);
        if (motion.matches || grid.className.includes('--filter-')) return;
        const cards = [...grid.querySelectorAll('.project-card')];
        const index = cards.indexOf(target);
        const previous = cards[index - 1];
        const secondInRow = previous && Math.abs(previous.offsetTop - target.offsetTop) < 2;
        // Fast scrolling can deliver the observer callback after the card is visible.
        // Never hide a card that the user can already see.
        const alreadyVisible = target.getBoundingClientRect().top < window.innerHeight;
        target.animate([
          { opacity: wasHidden ? 0 : alreadyVisible ? 1 : 0, translate: mobileEntrance ? '0 20px' : '0 12px' },
          { opacity: 1, translate: '0 0' },
        ], { duration: 450, delay: !alreadyVisible && secondInRow ? 70 : 0, easing: 'cubic-bezier(.22,1,.36,1)', fill: 'backwards' });
      });
    }, { threshold: 0, rootMargin: mobileEntrance ? '0px 0px -16px 0px' : '0px 0px 64px 0px' });
    const observeCards = () => grid.querySelectorAll('.project-card').forEach((card) => {
      if (seen.has(card.id)) { reveal(card); return; }
      if (mobileEntrance && !motion.matches && !grid.className.includes('--filter-') && card.getBoundingClientRect().top >= window.innerHeight && !pending.has(card)) {
        pending.add(card);
        card.style.opacity = '0';
      }
      observer.observe(card);
    });
    observeCards();
    const mutations = new MutationObserver(observeCards);
    mutations.observe(grid, { childList: true });
    const stopMotion = () => {
      if (motion.matches) {
        [...pending].forEach(reveal);
        grid.querySelectorAll('.project-card').forEach((card) => card.getAnimations().forEach((animation) => animation.cancel()));
      }
    };
    const revealFocused = (event) => {
      const card = event.target.closest('.project-card');
      if (card && pending.has(card)) {
        reveal(card);
        seen.add(card.id);
        observer.unobserve(card);
      }
    };
    grid.addEventListener('focusin', revealFocused);
    motion.addEventListener('change', stopMotion);
    return () => { observer.disconnect(); mutations.disconnect(); [...pending].forEach(reveal); grid.removeEventListener('focusin', revealFocused); motion.removeEventListener('change', stopMotion); };
  }, [concept]);
  const [activeFilter, setActiveFilter] = useState("all");
  const [activeClassificationFilter, setActiveClassificationFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState(getInitialSearchQuery);
  const [expandedIds, setExpandedIds] = useState([]);
  const [filterPhase, setFilterPhase] = useState(null);
  const filterExitTimerRef = useRef(null);
  const filterEnterTimerRef = useRef(null);
  const environment = getAppEnvironment();
  const copy = getUiCopy(language);
  const filters = getFilters(copy);
  const lastUpdatedLabel = formatLastUpdated(LAST_UPDATED, language);

  useEffect(() => () => {
    if (filterExitTimerRef.current) {
      window.clearTimeout(filterExitTimerRef.current);
    }
    if (filterEnterTimerRef.current) {
      window.clearTimeout(filterEnterTimerRef.current);
    }
  }, []);

  useEffect(() => {
    const updateSearchFromLocation = () => {
      setSearchQuery(getInitialSearchQuery());
    };

    window.addEventListener("popstate", updateSearchFromLocation);
    return () => window.removeEventListener("popstate", updateSearchFromLocation);
  }, []);

  const localizedSectors = localizeSectors(SECTORS, language);
  const rows = sortProjectRows(getProjectRows(localizedSectors, copy), language);
  const selectedFilter = filters.find((filter) => filter.id === activeFilter) || filters[0];
  const filteredRows = sortProjectRows(
    filterRowsBySearch(
      filterRowsByClassification(
        filterRowsByStatus(rows, selectedFilter),
        activeClassificationFilter
      ),
      searchQuery
    ),
    language
  );
  const transitionFilter = (updateFilter) => {
    if (filterExitTimerRef.current) {
      window.clearTimeout(filterExitTimerRef.current);
    }
    if (filterEnterTimerRef.current) {
      window.clearTimeout(filterEnterTimerRef.current);
    }

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      updateFilter();
      setFilterPhase(null);
      return;
    }

    setFilterPhase("exit");
    filterExitTimerRef.current = window.setTimeout(() => {
      updateFilter();
      setFilterPhase("enter");
      filterExitTimerRef.current = null;
      filterEnterTimerRef.current = window.setTimeout(() => {
        setFilterPhase(null);
        filterEnterTimerRef.current = null;
      }, FILTER_ENTER_SETTLE_MS);
    }, FILTER_EXIT_DURATION_MS);
  };

  const toggleExpanded = (id) => {
    setExpandedIds((current) =>
      current.includes(id) ? current.filter((expandedId) => expandedId !== id) : [...current, id]
    );
  };
  const handleStatusFilter = (filterId) => {
    setExpandedIds([]);
    transitionFilter(() => {
      setActiveFilter((current) => current === filterId && filterId !== "all" ? "all" : filterId);
    });
  };
  const setGlobalClassificationFilter = (filterId) => {
    setExpandedIds([]);
    transitionFilter(() => setActiveClassificationFilter(filterId));
  };
  const handleSearchChange = (nextQuery) => {
    setExpandedIds([]);
    setSearchQuery(nextQuery);

    try {
      const nextUrl = new URL(window.location.href);
      const normalizedQuery = nextQuery.trim();

      if (normalizedQuery) {
        nextUrl.searchParams.set("q", normalizedQuery);
      } else {
        nextUrl.searchParams.delete("q");
      }

      window.history.replaceState(window.history.state, "", nextUrl);
    } catch {
      // Search remains useful when the browser does not permit URL updates.
    }
  };
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
      className={`app-shell${concept ? " tracker-shell" : ""}`}
      style={{
        minHeight: "100vh",
        backgroundColor: "var(--page-bg)",
        color: "var(--text-body)",
        fontFamily: FONT_STACK,
      }}
    >
      <a className="skip-link" href="#projects">
        {copy.accessibility.skipToProjects}
      </a>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
        * { box-sizing: border-box; }
        body { background: var(--page-bg); }
        .app-shell { animation: app-fade-in 0.5s ease; }
        @keyframes app-fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        button { font: inherit; }
        a:hover { opacity: 0.8; }
        ::selection { background: color-mix(in srgb, var(--brand) 26%, transparent); }
        .accordion-reveal {
          display: grid;
          grid-template-rows: 0fr;
          opacity: 0;
          overflow: hidden;
          transition:
            grid-template-rows 260ms cubic-bezier(0.22, 1, 0.36, 1),
            opacity 160ms ease;
        }
        .accordion-reveal-inner {
          min-height: 0;
          overflow: hidden;
        }
        .project-card[data-expanded="true"] .accordion-reveal {
          grid-template-rows: 1fr;
          opacity: 1;
        }
        @supports (interpolate-size: allow-keywords) {
          .project-card {
            interpolate-size: allow-keywords;
          }
          .accordion-reveal {
            display: block;
            height: 0;
            overflow: clip;
            transition:
              height 280ms cubic-bezier(0.22, 1, 0.36, 1),
              opacity 160ms ease;
          }
          .project-card[data-expanded="true"] .accordion-reveal {
            height: auto;
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .app-shell {
            animation: none !important;
          }
          .accordion-reveal {
            transition: none !important;
          }
        }
        @media (min-width: 761px) and (max-width: 980px) {
          .project-card-button {
            min-height: 295px !important;
          }
        }
        @media (max-width: 760px) {
          main {
            padding: 32px 20px 64px !important;
          }
          header {
            margin-bottom: 24px !important;
          }
          .tracker-kicker {
            font-size: 9px !important;
            letter-spacing: 0.14em !important;
          }
          .header-meta-row {
            align-items: flex-start !important;
            gap: 12px !important;
          }
          .header-controls {
            flex-shrink: 0;
          }
          .summary-metrics {
            grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
          }
          .desktop-milestone-metric {
            display: none !important;
          }
          .mobile-milestone-summary {
            display: block !important;
          }
          .summary-wrap {
            margin-bottom: 24px !important;
          }
          .project-card-grid {
            grid-template-columns: 1fr !important;
          }
          .project-card-button {
            min-height: 0 !important;
            padding: 18px !important;
          }
          .project-classification-slot {
            top: 18px !important;
            max-width: calc(100% - 58px) !important;
          }
          .project-classification-slot .project-classification--interactive {
            max-width: 100%;
          }
          .project-classification-slot .project-classification-name {
            justify-content: flex-start;
            min-width: 0;
          }
          .project-classification-slot .project-classification-name {
            white-space: normal;
          }
          .project-classification-slot .project-classification-name span {
            display: block;
            min-width: 0;
            max-width: 100%;
            overflow: visible;
            text-overflow: clip;
            white-space: normal;
          }
          .project-milestone-indicator {
            flex-wrap: nowrap !important;
            gap: 6px !important;
          }
          .project-milestone-indicator .project-milestone-label,
          .project-milestone-indicator .project-milestone-bars {
            flex: 0 0 auto;
          }
          .project-milestone-indicator .project-milestone-bars {
            gap: 3px !important;
          }
          .project-milestone-indicator .project-milestone-segment {
            width: 15px !important;
          }
          .project-milestone-indicator .project-milestone-count {
            min-width: 0;
            flex: 1 1 auto;
            white-space: normal !important;
            font-size: 10px !important;
            line-height: 1.2 !important;
          }
          .tracker-title-context {
            font-size: 32px !important;
          }
          .tracker-title-product {
            font-size: 36px !important;
          }
          .tracker-description {
            font-size: 16px !important;
            line-height: 1.6 !important;
            margin-top: 18px !important;
          }
          .tracker-description strong {
            color: var(--text-body);
            font-weight: 700;
          }
          .tracker-programme-name {
            white-space: normal;
          }
          .project-facts {
            grid-template-columns: 1fr !important;
          }
          .project-facts-value {
            border-left: 0 !important;
            border-top: 1px solid var(--border) !important;
          }
        }
      `}</style>

      <main style={{ maxWidth: "1040px", margin: "0 auto", padding: "40px 24px 80px" }}>
        <header
          style={{
            marginBottom: "10px",
          }}
        >
          <div
            className="header-meta-row"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "20px",
              marginBottom: "12px",
            }}
          >
            <div
              className="tracker-kicker"
              style={{
                color: "var(--text-muted)",
                fontFamily: FONT_STACK,
                fontSize: "10px",
                fontWeight: 800,
                letterSpacing: "0.15em",
                textTransform: "uppercase",
              }}
            >
              {copy.header.kicker}
            </div>
            <HeaderControls
              language={language}
              onNavigate={onNavigate}
              onThemeToggle={toggleTheme}
              copy={copy}
            />
          </div>
          <h1
            className="tracker-title page-heading"
            ref={headingRef}
            tabIndex={-1}
            style={{
              margin: 0,
              color: "var(--text-strong)",
              fontWeight: 800,
              letterSpacing: "0",
              lineHeight: 1.04,
              display: "grid",
              justifyItems: "start",
            }}
          >
            <span className="tracker-title-context" style={{ fontSize: "42px", lineHeight: 1.04 }}>
              PCDS 2030
            </span>
            <span
              className="tracker-title-product"
              style={{ color: "var(--brand)", fontSize: "48px", lineHeight: 1.04 }}
            >
              {renderTrackerHeroTitle(copy.header.title, concept)}
            </span>
          </h1>
          <div
            className="tracker-description"
            style={{
              maxWidth: "720px",
              margin: "18px 0 0",
              color: "var(--text-muted)",
              fontSize: "16px",
              lineHeight: 1.6,
            }}
          >
            {copy.header.intro.map((paragraph, index) => (
              <p key={paragraph} style={{ margin: index === 0 ? 0 : "10px 0 0" }}>
                {renderIntroParagraph(paragraph, copy.header.programmeName)}
              </p>
            ))}
          </div>
        </header>

        <p
          className="tracker-last-updated"
          style={{
            margin: "0 0 14px",
            color: "var(--text-muted)",
            fontSize: "12px",
            fontWeight: 600,
            lineHeight: 1.4,
          }}
        >
          {concept ? <span>{copy.header.lastUpdated} {lastUpdatedLabel}</span> : <NavigationPillLink
            className="tracker-updates-link"
            href={getRouteHref(language === "ms" ? "updates-ms" : "updates")}
            onClick={(event) =>
              onNavigate(
                event,
                language === "ms" ? "updates-ms" : "updates"
              )
            }
          >
            {copy.header.lastUpdated} {lastUpdatedLabel}
            <span
              className="tracker-updates-link-arrow"
              aria-hidden="true"
              style={{ marginLeft: "5px" }}
            >
              {"\u2197\uFE0E"}
            </span>
          </NavigationPillLink>}
        </p>

        <div className="tracker-summary-stage" style={{ marginBottom: "24px" }}
          onAnimationStart={(event) => {
            if (event.target === event.currentTarget && event.animationName === 'concept-section-enter') {
              setSummaryEntranceStarted(true);
            }
          }}>
          <MetricEntranceContext.Provider value={!concept || summaryEntranceStarted}>
          <SummaryMetrics
            activeFilter={activeFilter}
            onFilter={handleStatusFilter}
            rows={rows}
            copy={copy}
          />
          </MetricEntranceContext.Provider>
        </div>

        <DiscoveryControls
          activeClassificationFilter={activeClassificationFilter}
          copy={copy}
          onClassificationFilter={setGlobalClassificationFilter}
          onSearchChange={handleSearchChange}
          query={searchQuery}
          rows={rows}
        />

        <section
          id="projects"
          tabIndex={-1}
          aria-label={copy.accessibility.projects}
          style={{ scrollMarginTop: "24px" }}
        >
          <ProjectResultStatus copy={copy} resultCount={filteredRows.length} />
          <ProjectGrid
            filterPhase={filterPhase}
            rows={filteredRows}
            expandedIds={expandedIds}
            onToggle={toggleExpanded}
            copy={copy}
            language={language}
          />
          {filteredRows.length === 0 && <NoResults copy={copy} query={searchQuery.trim()} />}
        </section>

        <SiteFooter
          concept={concept}
          copy={copy}
          currentPage="tracker"
          language={language}
          onNavigate={onNavigate}
        />
      </main>
      <EnvironmentBadge environment={environment} copy={copy} />
    </div>
  );
}
