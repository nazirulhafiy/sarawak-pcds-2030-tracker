import site from "../data/site.json";

export const SITE_COPY_FIELDS = [
  "title",
  "tagline",
  "deck",
  "description",
  "about_lead",
];

export function getSiteCopy() {
  for (const field of SITE_COPY_FIELDS) {
    const value = site[field];
    if (typeof value !== "string" || !value.trim()) {
      throw new Error(`data/site.json is missing ${field}`);
    }
  }
  return site;
}

/** Split the brand title into the hero context line and product label. */
export function getBrandTitleParts(copy = getSiteCopy()) {
  const product = "Project Tracker";
  const suffix = ` ${product}`;
  if (!copy.title.endsWith(suffix)) {
    return { context: copy.title, product: copy.title };
  }
  return {
    context: copy.title.slice(0, -suffix.length),
    product,
  };
}

/** Wrap the strategy name inside the About lead for the existing accent span. */
export function renderAboutLeadNodes(aboutLead) {
  const match = aboutLead.match(
    /Sarawak[\u2019']s Post COVID-19 Development Strategy 2030\.?/
  );
  if (!match) {
    return aboutLead;
  }
  const start = match.index;
  const end = start + match[0].length;
  return {
    before: aboutLead.slice(0, start),
    strategy: match[0],
    after: aboutLead.slice(end),
  };
}
