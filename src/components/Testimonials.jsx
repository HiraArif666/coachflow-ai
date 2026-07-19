const testimonials = [
  {
    quote: "I stopped confusing being busy with being effective. That shift alone changed how I lead my team.",
    name: 'Priya M.',
    role: 'VP of Operations',
  },
  {
    quote: "Six months in, I finally have a business that doesn't fall apart when I take a week off.",
    name: 'David K.',
    role: 'Founder, small business',
  },
  {
    quote: "The clarity I got in our first session was worth more than a year of trying to figure it out alone.",
    name: 'Sarah T.',
    role: 'Director of Marketing',
  },
]

export default function Testimonials() {
  return (
    <section id="testimonials" className="bg-[var(--color-seafoam-pale)] py-20">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="font-[var(--font-display)] text-3xl font-semibold text-[var(--color-ink)] mb-12 text-center">
          What clients say
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <div key={i} className="bg-white rounded-2xl p-6 border border-[var(--color-seafoam)]">
              <p className="text-[var(--color-ink)] mb-4 leading-relaxed">"{t.quote}"</p>
              <p className="text-sm font-medium text-[var(--color-teal)]">{t.name}</p>
              <p className="text-xs text-[var(--color-ink-soft)]">{t.role}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}