import type { ReactNode } from 'react';
import './globals.css';

// Root layout intentionally minimal. The locale layout under
// `app/[locale]/layout.tsx` renders the <html> and <body> with the
// correct `lang` attribute for the active locale.
export default function RootLayout({ children }: { children: ReactNode }) {
  return children;
}
