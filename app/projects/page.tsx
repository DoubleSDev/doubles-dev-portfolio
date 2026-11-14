import type { Metadata } from 'next';
import { SiteFooter, SiteHeader } from '../site-shell';
import { collaboration, trailers } from '../video-work';
import { VideoGallery } from '../video-gallery';

export const metadata: Metadata = {
  title: 'Collaborative Projects',
  description: 'Game collaborations and trailers from the DoubleS Dev portfolio.',
};

export default function ProjectsPage() {
  return (
    <div id="top">
      <SiteHeader current="/projects" />
      <main className="shell modelPortfolio">
        <section className="portfolioIntro" id="collaborations" aria-labelledby="projects-title">
          <div>
            <p className="eyebrow">DoubleS Dev / Collaborations</p>
            <h1 id="projects-title">Game <em>Projects</em></h1>
          </div>
          <p className="introDescription">Roblox game collaborations and published trailers.</p>
        </section>
        <VideoGallery entries={[collaboration]} featured />
        <section className="trailerSection" aria-labelledby="bizblox">
          <h2 id="bizblox">Bizblox Adventure</h2>
          <VideoGallery entries={trailers} />
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
