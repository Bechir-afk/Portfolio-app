import type { Metadata } from 'next';
import { NextIntlClientProvider, hasLocale } from 'next-intl';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import { getMessages } from 'next-intl/server';
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import PageShell from '@/components/layout/PageShell';
import '@/app/globals.css';

export const metadata: Metadata = {
  title: 'Bechir Ben Rabia — Portfolio',
  description:
    'Computer Engineering student, freelance developer, and gamer based in Tunis, Tunisia.',
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();

  const messages = await getMessages();

  return (
    <html
      lang={locale}
      className={`${GeistSans.variable} ${GeistMono.variable}`}
    >
      <body>
        <NextIntlClientProvider messages={messages}>
          {/* PageShell renders InteractiveBackground (fixed z-0) + children (z-10) */}
          <PageShell>
            {children}
          </PageShell>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
