import Link from 'next/link';

export default function NotFound() {
  return (
    <html lang="en">
      <body className="min-h-screen bg-canvas font-sans text-ink antialiased">
        <main className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-accent-700">404</p>
          <h1 className="mt-3 font-serif text-3xl font-semibold text-primary">
            We couldn&apos;t find that page.
          </h1>
          <p className="mt-2 max-w-md text-ink-soft">
            The link may be out of date. You can return to the homepage and start again from there.
          </p>
          <Link href="/en" className="btn-primary mt-6">
            Back to Avenger
          </Link>
        </main>
      </body>
    </html>
  );
}
