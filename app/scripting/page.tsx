import type { Metadata } from 'next';
import { SiteFooter, SiteHeader } from '../site-shell';
import { systems } from '../video-work';
import { VideoGallery } from '../video-gallery';

export const metadata: Metadata = {
  title: 'Roblox Scripting',
  description: 'Roblox gameplay, world, interface, inventory, and live operations systems by DoubleS Dev.',
};

export default function ScriptingPage() {
  return (
    <div id="top">
      <SiteHeader current="/scripting" />
      <main className="shell modelPortfolio">
        <section className="portfolioIntro" id="work" aria-labelledby="scripting-title">
          <div>
            <p className="eyebrow">DoubleS Dev / Systems Portfolio</p>
            <h1 id="scripting-title">Roblox <em>Scripting</em></h1>
          </div>
          <p className="introDescription">Gameplay systems, player interfaces, and live operations tools in action.</p>
        </section>
        <VideoGallery entries={systems} />
      </main>
      <SiteFooter />
    </div>
  );
}
