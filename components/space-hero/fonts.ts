import { Instrument_Sans, JetBrains_Mono, Syne } from 'next/font/google';

/* REFERENCE loads these from Google Fonts. next/font self-hosts them and exposes the CSS variables
   that space-hero.css maps to --display / --body / --mono (same fallback stacks as REFERENCE). */
export const syne = Syne({ subsets: ['latin'], weight: ['700', '800'], variable: '--font-syne', display: 'swap' });
export const instrument = Instrument_Sans({ subsets: ['latin'], weight: ['400', '500', '600'], variable: '--font-instrument', display: 'swap' });
export const jetbrains = JetBrains_Mono({ subsets: ['latin'], weight: ['400', '500'], variable: '--font-jetbrains', display: 'swap' });
