export default function Hero({ onStartChat }) {
  return (
    <section className="relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 pt-20 pb-28 grid md:grid-cols-2 gap-12 items-center">
        <div>
          <p className="text-sm tracking-wide uppercase text-[var(--color-teal)] font-semibold mb-4">
            Executive & Business Coaching
          </p>
          <h1 className="font-[var(--font-display)] text-4xl md:text-5xl font-semibold text-[var(--color-ink)] leading-tight mb-6">
            Grow with clarity, not guesswork.
          </h1>
          <p className="text-[var(--color-ink-soft)] text-lg mb-8 max-w-md">
            One-on-one coaching, leadership programs, and business consulting for founders and
            executives who are ready to move faster with a clear plan.
          </p>
          <button
            onClick={onStartChat}
            className="bg-[var(--color-teal)] hover:bg-[var(--color-teal-dark)] text-white px-6 py-3 rounded-lg font-medium transition-colors"
          >
            Start a conversation
          </button>
        </div>
        <div className="bg-[var(--color-seafoam-pale)] rounded-2xl h-80 flex items-center justify-center">
          <span className="text-[var(--color-teal)] font-[var(--font-display)] text-2xl">
            Your growth, mapped out.
          </span>
        </div>
      </div>

      {/* Signature wave divider */}
      <svg
        viewBox="0 0 1440 100"
        className="absolute bottom-0 left-0 w-full"
        preserveAspectRatio="none"
        style={{ height: '60px' }}
      >
        <path
          d="M0,40 C240,90 480,0 720,30 C960,60 1200,10 1440,50 L1440,100 L0,100 Z"
          fill="var(--color-seafoam-pale)"
        />
      </svg>
    </section>
  )
}