export const PALETTE = {
  bgPrimary:   '#DAE3E5',
  bgSecondary: '#BBD1EA',
  accent:      '#507DBC',
  accentLight: '#A1C6EA',
  textDark:    '#04080F',
} as const;

export const BREAKPOINTS = {
  mobile: 640,
  tablet: 1024,
} as const;

export const LOCALES = ['en', 'fr'] as const;
export type Locale = (typeof LOCALES)[number];
