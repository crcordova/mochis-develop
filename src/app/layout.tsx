import type { Metadata } from 'next';
import { Inter, Nunito } from 'next/font/google';
import { Analytics } from '@/lib/analytics';
import { generateOrganizationSchema, JsonLd } from '@/lib/structured-data';
import { Header, Footer } from '@/components/layout';
import siteData from '@/data/site.json';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const nunito = Nunito({
  subsets: ['latin'],
  weight: ['400', '600', '700', '800'],
  variable: '--font-nunito',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: siteData.site.name,
    template: `%s | ${siteData.site.name}`,
  },
  description: siteData.site.description,
  keywords: siteData.site.keywords,
  openGraph: {
    type: 'website',
    locale: siteData.site.locale,
    url: siteData.site.url,
    siteName: siteData.site.name,
    title: siteData.site.name,
    description: siteData.site.description,
  },
  twitter: {
    card: 'summary_large_image',
    title: siteData.site.name,
    description: siteData.site.description,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={`${inter.variable} ${nunito.variable}`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Fredoka:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen bg-[var(--color-bg)] text-[var(--color-text)] antialiased">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 rounded-md bg-primary px-4 py-2 text-sm font-medium text-white"
        >
          Saltar al contenido
        </a>
        <Header />
        {children}
        <Footer />
        <JsonLd data={generateOrganizationSchema()} />
        <Analytics />
      </body>
    </html>
  );
}
