import type { Metadata } from 'next';
import { SiteFooter } from '@/components/site-footer';
import { SiteHeader } from '@/components/site-header';
import './globals.css';
import { AnalyticsProvider } from '@/components/analytics-provider';

export const metadata: Metadata = {
  title: {
    default: 'ABC Tutoring | Personal K–12 Support',
    template: '%s | ABC Tutoring',
  },
  description:
    'Find friendly, personalized math, science, and reading support for K–12 students.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AnalyticsProvider />
        <a className="skip-link" href="#main-content">
          Skip to content
        </a>
        <div className="site-frame">
          <SiteHeader />
          <main id="main-content" className="main-content">
            {children}
          </main>
          <SiteFooter />
        </div>
      </body>
    </html>
  );
}
