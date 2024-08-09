import { Orbitron } from '@next/font/google';
import { Metadata } from 'next';
import './index.css';

const orbitron = Orbitron({
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Nextjs-ssr-app-router-api',
  description: 'Nextjs-ssr-app-router-api',
};

export default function RootLayout({
  // Layouts must accept a children prop.
  // This will be populated with nested layouts or pages
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={orbitron.className}>
      <body>{children}</body>
    </html>
  );
}
