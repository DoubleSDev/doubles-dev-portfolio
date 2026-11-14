import Link from 'next/link';

const sections = [
  { href: '/', label: 'Models' },
  { href: '/scripting', label: 'Scripting' },
  { href: '/projects', label: 'Projects' },
] as const;

export function SiteHeader({ current }: { current: (typeof sections)[number]['href'] }) {
  return (
    <header className="siteHeader">
      <div className="shell headerInner">
        <Link className="wordmark" href="/" aria-label="DoubleS Dev home">
          <span className="wordmarkIcon" aria-hidden="true">DS</span>
          <span>DoubleS Dev</span>
        </Link>
        <nav className="siteNav" aria-label="Main navigation">
          {sections.map(({ href, label }) => (
            <Link key={href} href={href} aria-current={href === current ? 'page' : undefined}>{label}</Link>
          ))}
          <a href="#contact">Contact</a>
        </nav>
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="siteFooter" id="contact">
      <section className="shell contactBlock" aria-labelledby="contact-title">
        <h2 id="contact-title">Contact</h2>
        <dl className="contactDetails">
          <div>
            <dt>Email</dt>
            <dd><a href="mailto:godapd059@gmail.com">godapd059@gmail.com</a></dd>
          </div>
          <div>
            <dt>Discord</dt>
            <dd>apd059</dd>
          </div>
          <div>
            <dt>X</dt>
            <dd><a href="https://x.com/ApdGod25081">@ApdGod25081</a></dd>
          </div>
        </dl>
      </section>
      <div className="shell footerInner">
        <span>© 2026 DoubleS Dev</span>
        <a href="#top">Back to top <span aria-hidden="true">↑</span></a>
      </div>
    </footer>
  );
}
