import { useEffect, useRef } from 'react'

export default function CalendlyEmbed({ prefillName, prefillEmail }) {
  const containerRef = useRef(null)

  useEffect(() => {
    if (!window.Calendly || !containerRef.current) return

    containerRef.current.innerHTML = ''

    window.Calendly.initInlineWidget({
      url: import.meta.env.VITE_CALENDLY_URL,
      parentElement: containerRef.current,
      prefill: {
        name: prefillName || '',
        email: prefillEmail || '',
      },
    })
  }, [prefillName, prefillEmail])

  return <div ref={containerRef} style={{ minWidth: '280px', height: '480px' }} />
}