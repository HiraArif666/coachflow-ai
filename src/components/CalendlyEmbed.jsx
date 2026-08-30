import { useEffect } from 'react'

export default function CalendlyEmbed({ prefillName, prefillEmail, onScheduled }) {
  useEffect(() => {
    function handleCalendlyEvent(e) {
      if (e.data.event === 'calendly.event_scheduled') {
        if (onScheduled) onScheduled(e.data.payload)
      }
    }

    window.addEventListener('message', handleCalendlyEvent)
    return () => window.removeEventListener('message', handleCalendlyEvent)
  }, [onScheduled])

  // Replace with your actual Calendly URL
  const calendlyUrl = `https://calendly.com/your-handle/discovery-call?name=${encodeURIComponent(
    prefillName || ''
  )}&email=${encodeURIComponent(prefillEmail || '')}`

  return (
    <iframe
      src={calendlyUrl}
      className="w-full h-full border-0 rounded-b-2xl"
      title="Book a discovery call"
    />
  )
}