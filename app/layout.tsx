import type { Metadata } from 'next';
import { asset } from './asset-path';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://doublesdev.github.io'),
  title: { default: 'DoubleS Dev — Roblox Models', template: '%s | DoubleS Dev' },
  description: 'A portfolio of stylized Roblox characters, outfits, armor, and weapons by DoubleS Dev.',
  openGraph: {
    title: 'DoubleS Dev — Roblox Models',
    description: 'Stylized Roblox characters, outfits, armor, and weapons.',
    type: 'website',
    images: [{ url: asset('models/anime-mysterious.webp'), width: 1672, height: 941, alt: 'Suoming character duo' }],
  },
  icons: { icon: asset('favicon.svg') },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
