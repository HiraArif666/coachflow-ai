export default function Footer() {
  return (
    <footer className="bg-[var(--color-teal-dark)] text-white py-12">
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-8">
        <div>
          <p className="font-[var(--font-display)] text-xl font-semibold mb-2">Elevate Growth Coaching</p>
          <p className="text-white/70 text-sm">
            Executive and business coaching for leaders who want more than another promotion.
          </p>
        </div>
        <div>
          <p className="font-medium mb-2">Quick Links</p>
          <ul className="text-white/70 text-sm space-y-1">
            <li><a href="#process" className="hover:text-white">How it works</a></li>
            <li><a href="#about" className="hover:text-white">About</a></li>
            <li><a href="#testimonials" className="hover:text-white">Testimonials</a></li>
          </ul>
        </div>
        <div>
          <p className="font-medium mb-2">Contact</p>
          <p className="text-white/70 text-sm">hello@elevategrowthcoaching.co.uk</p>
          <p className="text-white/70 text-sm">United Kingdom</p>
        </div>
      </div>
      <p className="text-white/50 text-xs text-center mt-10">
        © 2026 Elevate Growth Coaching. All rights reserved.
      </p>
    </footer>
  )
}