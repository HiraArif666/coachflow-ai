export default function Header() {
  return (
    <header className="border-b border-[var(--color-seafoam)] bg-[var(--color-bg)]/90 backdrop-blur sticky top-0 z-40">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <span className="font-[var(--font-display)] text-xl font-semibold text-[var(--color-ink)]">
          Elevate Growth Coaching
        </span>
        <nav className="hidden sm:flex gap-8 text-sm text-[var(--color-ink-soft)]">
          <a href="#process" className="hover:text-[var(--color-teal)]">How it works</a>
          <a href="#about" className="hover:text-[var(--color-teal)]">About</a>
          <a href="#testimonials" className="hover:text-[var(--color-teal)]">Testimonials</a>
        </nav>
      </div>
    </header>
  )
}