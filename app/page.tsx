import { ModelGallery } from './model-gallery';
import { SiteFooter, SiteHeader } from './site-shell';

export default function Home() {
  return (
    <div id="top">
      <SiteHeader current="/" />
      <main className="shell modelPortfolio">
        <section className="portfolioIntro" aria-labelledby="portfolio-title">
          <div>
            <p className="eyebrow">DoubleS Dev / 3D Portfolio</p>
            <h1 id="portfolio-title">Roblox <em>Models</em></h1>
          </div>
          <p className="introDescription">Stylized characters, outfits, armor, and weapons for Roblox.</p>
        </section>
        <ModelGallery />
      </main>
      <SiteFooter />
    </div>
  );
}
