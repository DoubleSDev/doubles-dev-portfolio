import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://nineframe-video-portfolio.godapd059.chatgpt.site'),
  title: 'DoubleS Dev — Roblox Game Developer',
  description: 'พอร์ตโฟลิโอนักพัฒนา Roblox เชี่ยวชาญการมองภาพรวมเกม ให้คำปรึกษาการบริหารเกม และเขียน Script ใน Roblox Studio',
  openGraph: {
    title: 'DoubleS Dev — Roblox Game Developer',
    description: 'Game overview, Roblox scripting, animation, UI and game consulting.',
    type: 'website',
    images: [{ url: '/og.png', width: 1200, height: 630, alt: 'DoubleS Dev — Roblox Game Developer' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'DoubleS Dev — Roblox Game Developer',
    description: 'Game overview, Roblox scripting, animation, UI and game consulting.',
    images: ['/og.png'],
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
