const steps = [
  {
    number: '01',
    title: 'Understand where you actually are',
    text: "We start with a clear-eyed look at your goals, challenges, and what's really in the way — no assumptions.",
  },
  {
    number: '02',
    title: 'Build a plan that fits your life',
    text: 'Practical strategy and tools tailored to your role, not generic frameworks pulled from a textbook.',
  },
  {
    number: '03',
    title: 'Put it into practice, together',
    text: "Ongoing sessions to adjust, refine, and keep momentum — you're never figuring it out alone.",
  },
]

export default function Process() {
  return (
    <section id="process" className="max-w-6xl mx-auto px-6 py-20">
      <h2 className="font-[var(--font-display)] text-3xl font-semibold text-[var(--color-ink)] mb-12 text-center">
        How we'll work together
      </h2>
      <div className="grid md:grid-cols-3 gap-8">
        {steps.map((s) => (
          <div key={s.number} className="relative pl-2">
            <span className="font-[var(--font-display)] text-5xl font-semibold text-[var(--color-seafoam)]">
              {s.number}
            </span>
            <h3 className="text-lg font-semibold text-[var(--color-ink)] mt-3 mb-2">{s.title}</h3>
            <p className="text-[var(--color-ink-soft)] text-sm leading-relaxed">{s.text}</p>
          </div>
        ))}
      </div>
    </section>
  )
}