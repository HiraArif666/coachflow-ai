import { TrendingDown, Clock, HeartCrack } from 'lucide-react'

const points = [
  {
    icon: TrendingDown,
    text: 'Feel stuck in a leadership role that no longer excites you',
  },
  {
    icon: Clock,
    text: 'Spend every hour reacting instead of building toward a real plan',
  },
  {
    icon: HeartCrack,
    text: 'Achieve every milestone on paper, yet feel disconnected from the work',
  },
]

export default function PainPoints() {
  return (
    <section className="bg-[var(--color-seafoam-pale)] py-16">
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-8">
        {points.map(({ icon: Icon, text }, i) => (
          <div key={i} className="flex flex-col items-start gap-4">
            <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-[var(--color-teal)]">
              <Icon size={22} strokeWidth={1.75} />
            </div>
            <p className="text-[var(--color-ink)] text-lg leading-snug">{text}</p>
          </div>
        ))}
      </div>
    </section>
  )
}