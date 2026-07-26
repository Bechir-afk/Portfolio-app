'use client';

import { Translate } from '@phosphor-icons/react';
import { useLocale, useTranslations } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/navigation';

export default function LanguageToggle() {
  const locale   = useLocale();
  const router   = useRouter();
  const pathname = usePathname();
  const t        = useTranslations('languageToggle');

  const nextLocale = (locale === 'en' ? 'fr' : 'en') as 'en' | 'fr';

  return (
    <button
      type="button"
      onClick={() => router.replace(pathname, { locale: nextLocale })}
      aria-label={t('label')}
      className="glass"
      style={{
        position: 'fixed',
        top: '1.5rem',
        right: '1.5rem',
        zIndex: 100,
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.5rem',
        padding: '0.55rem 0.9rem',
        borderRadius: '0.9rem',
        border: 'none',
        cursor: 'pointer',
        color: 'var(--text-dark)',
        fontFamily: 'var(--font-mono)',
        fontSize: '0.9rem',
        fontWeight: 700,
        lineHeight: 1,
      }}
    >
      <Translate size={20} />
      <span>{locale.toUpperCase()}</span>
    </button>
  );
}
