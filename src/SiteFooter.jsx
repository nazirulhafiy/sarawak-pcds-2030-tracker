import { getRouteHref } from "./routes.js";

const HAFIY_URL = "https://hafiy.my";
const CONTACT_URL =
  "mailto:contact@pcds2030.com?subject=PCDS%202030%20Project%20Tracker";

function FooterLink({ children, currentPage, href, onClick, page }) {
  const isCurrentPage = currentPage === page;

  return (
    <a
      aria-current={isCurrentPage ? "page" : undefined}
      className="site-footer-link"
      href={href}
      onClick={onClick}
    >
      {children}
    </a>
  );
}

export default function SiteFooter({ copy, currentPage, language, onNavigate, concept = false }) {
  const trackerRouteId = language === "ms" ? "tracker-ms" : "tracker-en";
  const updatesRouteId = language === "ms" ? "updates-ms" : "updates";
  const aboutRouteId = language === "ms" ? "about-ms" : "about";
  const footerHref = (id) => getRouteHref(id) + (concept && import.meta.env.VITE_DESIGN_CONCEPT !== 'v2' ? '?concept=v2' : '');
  const independentParts = copy.footer.independent.split("hafiy.my");
  const methodologyMarker = " Status";
  const methodologyParts = copy.footer.methodology.split(methodologyMarker);
  const methodologyNote =
    methodologyParts.length === 2 ? (
      <>
        {methodologyParts[0]}
        <br className="site-footer-note-break" />
        {methodologyMarker.trimStart()}
        {methodologyParts[1]}
      </>
    ) : (
      copy.footer.methodology
    );

  return (
    <footer className="site-footer">
      <div className="site-footer-main">
        <div className="site-footer-summary">
          <p className="site-footer-brand">PCDS 2030 Project Tracker</p>
          <p className="site-footer-note">{methodologyNote}</p>
        </div>

        <nav aria-label={copy.footer.explore} className="site-footer-nav">
          <h2>{copy.footer.explore}</h2>
          <ul>
            <li>
              <FooterLink
                currentPage={currentPage}
                href={footerHref(trackerRouteId)}
                onClick={(event) => onNavigate(event, trackerRouteId)}
                page="tracker"
              >
                {concept ? (language === 'ms' ? 'Projek' : 'Projects') : copy.footer.tracker}
              </FooterLink>
            </li>
            <li>
              <FooterLink
                currentPage={currentPage}
                href={footerHref(updatesRouteId)}
                onClick={(event) => onNavigate(event, updatesRouteId)}
                page="updates"
              >
                {copy.footer.updates}
              </FooterLink>
            </li>
            {concept && <li><FooterLink currentPage={currentPage} href={footerHref(aboutRouteId)} onClick={(event) => onNavigate(event, aboutRouteId)} page="about">{language === 'ms' ? 'Tentang' : 'About'}</FooterLink></li>}
            <li>
              <a className="site-footer-link" href={CONTACT_URL}>
                {copy.footer.contact}
              </a>
            </li>
          </ul>
        </nav>
      </div>

      <div className="site-footer-bottom">
        <p>
          {independentParts[0]}
          <a
            className="site-footer-link site-footer-credit-link"
            href={HAFIY_URL}
            rel="noopener noreferrer"
            target="_blank"
          >
            hafiy.my
          </a>
          {independentParts[1]}
        </p>
      </div>
    </footer>
  );
}
