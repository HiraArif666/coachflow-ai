export default function CoachStory() {
  return (
    <section id="about" className="max-w-6xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-12 items-center">
      <div className="bg-[var(--color-seafoam-pale)] rounded-2xl h-96 order-2 md:order-1 flex items-center justify-center">
        <span className="text-[var(--color-teal)] font-[var(--font-display)] text-xl px-8 text-center">
          Photo placeholder — swap for a real coach portrait
        </span>
      </div>
      <div className="order-1 md:order-2">
        <p className="text-sm tracking-wide uppercase text-[var(--color-teal)] font-semibold mb-4">
          Meet Your Coach
        </p>
        <h2 className="font-[var(--font-display)] text-3xl font-semibold text-[var(--color-ink)] mb-5">
          I've stood where you're standing.
        </h2>
        <p className="text-[var(--color-ink-soft)] mb-4 leading-relaxed">
          After a decade in senior leadership, I hit a wall that no promotion could fix — burnout dressed
          up as ambition. Working with my own coach was the first time someone helped me separate who I
          was from what I'd achieved.
        </p>
        <p className="text-[var(--color-ink-soft)] leading-relaxed">
          Now I help founders and executives do the same: build a business and a career that doesn't
          require sacrificing everything else to sustain it.
        </p>
      </div>
    </section>
  )
}