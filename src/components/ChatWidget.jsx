import { useState } from 'react'
import { askGemini } from '../lib/gemini'
import { scoreLead } from '../lib/scoring'
import { saveLead } from '../lib/supabaseClient'
import { triggerEmailWorkflow } from '../lib/n8n'
import CalendlyEmbed from './CalendlyEmbed'

const emptyFields = {
  full_name: null, email: null, phone: null, company_name: null,
  job_title: null, industry: null, monthly_revenue: null,
  business_goals: null, current_challenges: null, budget: null,
  preferred_timeframe: null,
}

export default function ChatWidget({ open, onClose }) {
  const [messages, setMessages] = useState([
    { role: 'assistant', content: "Hi! I'm here to help you learn about our coaching programs. What brings you here today?" },
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [leadFields, setLeadFields] = useState(emptyFields)
  const [handoff, setHandoff] = useState(false)
  const [sentiment, setSentiment] = useState('neutral')
  const [leadId, setLeadId] = useState(null)
  const [showBooking, setShowBooking] = useState(false)
  const [emailTriggered, setEmailTriggered] = useState(false)

  async function handleSend() {
    if (!input.trim() || loading) return

    const userMessage = { role: 'user', content: input }
    const updatedMessages = [...messages, userMessage]
    setMessages(updatedMessages)
    setInput('')
    setLoading(true)

    try {
      const result = await askGemini(updatedMessages)

      const mergedFields = { ...leadFields }
      for (const key in result.extracted_fields) {
        if (result.extracted_fields[key]) mergedFields[key] = result.extracted_fields[key]
      }
      setLeadFields(mergedFields)

      const isHandoff = result.handoff_requested || handoff
      if (result.handoff_requested) setHandoff(true)
      setSentiment(result.sentiment)

      const finalMessages = [...updatedMessages, { role: 'assistant', content: result.reply }]
      setMessages(finalMessages)

      if (mergedFields.email || mergedFields.phone) {
        const { score, status } = scoreLead(mergedFields)
        const summary = finalMessages.map((m) => `${m.role}: ${m.content}`).join('\n')
        const newId = await saveLead(
          leadId,
          mergedFields,
          score,
          status,
          isHandoff,
          summary,
          result.sentiment
        )
        setLeadId((prev) => prev ?? newId)

        if (!emailTriggered && mergedFields.email) {
          setEmailTriggered(true)
          triggerEmailWorkflow({
            full_name: mergedFields.full_name || 'there',
            email: mergedFields.email,
            lead_status: status,
          })
        }
      }
    } catch (err) {
      setMessages((prev) => [...prev, { role: 'assistant', content: "Sorry, I'm having trouble responding right now. Please try again." }])
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  if (!open) return null

  const { score, status } = scoreLead(leadFields)
  const canBook = status === 'hot' || status === 'warm'

  const sentimentColor =
    sentiment === 'negative' ? 'text-[var(--color-warn)]' :
    sentiment === 'positive' ? 'text-[var(--color-mint)]' :
    'text-[var(--color-ink-soft)]'

  return (
    <div className="fixed bottom-6 right-6 w-96 max-w-[calc(100vw-3rem)] h-[560px] bg-white rounded-2xl shadow-2xl border border-[var(--color-seafoam)] flex flex-col z-50">
      <div className="bg-[var(--color-teal)] text-white px-5 py-4 rounded-t-2xl flex items-center justify-between">
        <span className="font-medium">Elevate Growth Coaching</span>
        <button onClick={onClose} className="text-white/80 hover:text-white">✕</button>
      </div>

      {showBooking ? (
        <div className="flex-1 overflow-y-auto flex flex-col">
          <div className="px-4 py-3 border-b border-[var(--color-seafoam)] flex items-center justify-between">
            <span className="text-sm font-medium text-[var(--color-ink)]">Book your discovery call</span>
            <button
              onClick={() => setShowBooking(false)}
              className="text-xs text-[var(--color-teal)] hover:underline"
            >
              ← Back to chat
            </button>
          </div>
          <CalendlyEmbed prefillName={leadFields.full_name} prefillEmail={leadFields.email} />
        </div>
      ) : (
        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
          {messages.map((m, i) => (
            <div
              key={i}
              className={`max-w-[80%] px-4 py-2 rounded-2xl text-sm ${
                m.role === 'user'
                  ? 'bg-[var(--color-teal)] text-white ml-auto rounded-br-sm'
                  : 'bg-[var(--color-seafoam-pale)] text-[var(--color-ink)] rounded-bl-sm'
              }`}
            >
              {m.content}
            </div>
          ))}
          {loading && (
            <div className="bg-[var(--color-seafoam-pale)] text-[var(--color-ink-soft)] text-sm px-4 py-2 rounded-2xl rounded-bl-sm w-fit">
              typing...
            </div>
          )}
          {canBook && (
            <button
              onClick={() => setShowBooking(true)}
              className="bg-[var(--color-mint)] text-[var(--color-ink)] font-medium text-sm px-4 py-2 rounded-full hover:brightness-95 mx-auto block"
            >
              📅 Book a discovery call
            </button>
          )}
        </div>
      )}

      <div className="px-4 py-2 border-t border-[var(--color-seafoam)] text-xs text-[var(--color-ink-soft)] bg-[var(--color-seafoam-pale)]/50 flex flex-wrap gap-x-3 gap-y-1">
        <span>Score: {score} · Status: <strong className="uppercase">{status}</strong></span>
        <span className={sentimentColor}>Sentiment: <strong className="capitalize">{sentiment}</strong></span>
        {handoff && <span className="text-[var(--color-warn)]">· Handoff requested</span>}
      </div>

      {!showBooking && (
        <div className="border-t border-[var(--color-seafoam)] p-3 flex gap-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Type a message..."
            disabled={loading}
            className="flex-1 border border-[var(--color-seafoam)] rounded-full px-4 py-2 text-sm outline-none focus:border-[var(--color-teal)] disabled:opacity-50"
          />
          <button
            onClick={handleSend}
            disabled={loading}
            className="bg-[var(--color-teal)] text-white rounded-full w-10 h-10 flex items-center justify-center hover:bg-[var(--color-teal-dark)] disabled:opacity-50"
          >
            →
          </button>
        </div>
      )}
    </div>
  )
}