import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://doublesdev.github.io/doubles-dev-portfolio/'),
  title: 'DoubleS Dev — Roblox Developer & 3D Artist',
  description: 'ผลงาน DoubleS Dev: ระบบเกม Roblox, Scripting, โมเดล 3D ตัวละคร ชุดเกราะ อาวุธ และให้คำปรึกษาด้านภาพรวมเกม',
  openGraph: {
    title: 'DoubleS Dev — Roblox Game Developer',
    description: 'Game overview, Roblox scripting, animation, UI and game consulting.',
    type: 'website',
    images: [{ url: 'https://doublesdev.github.io/doubles-dev-portfolio/og.png', width: 1200, height: 630, alt: 'DoubleS Dev — Roblox Game Developer' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'DoubleS Dev — Roblox Game Developer',
    description: 'Game overview, Roblox scripting, animation, UI and game consulting.',
    images: ['https://doublesdev.github.io/doubles-dev-portfolio/og.png'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="th">
      <body>{children}</body>
    </html>
  );
}
