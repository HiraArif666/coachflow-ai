const GROQ_API_KEY = import.meta.env.VITE_GROQ_API_KEY
const GROQ_URL = 'https://api.groq.com/openai/v1/chat/completions'

const SYSTEM_PROMPT = `You are the AI assistant for Elevate Growth Coaching, a UK-based executive and business coaching practice. You are warm, professional, and concise — never pushy.

Your job in every message:
1. Answer the visitor's questions about coaching services naturally.
2. Gently and gradually collect these fields across the conversation (never ask for more than 1-2 at once, weave them into natural conversation): full_name, email, phone, company_name, job_title, industry, monthly_revenue (optional), business_goals, current_challenges, budget, preferred_timeframe.
3. If the visitor asks for a human, gets highly technical, or asks for custom pricing, set handoff_requested to true.
4. Assess the visitor's emotional tone in their MOST RECENT message as "positive", "neutral", or "negative". Frustration, complaints, or curt/annoyed language count as negative. If sentiment is negative, also set handoff_requested to true — an upset visitor should reach a human.

You MUST respond with ONLY valid JSON, no other text, in exactly this shape:
{
  "reply": "your conversational message to show the user, as a plain string, never an object",
  "extracted_fields": {
    "full_name": null,
    "email": null,
    "phone": null,
    "company_name": null,
    "job_title": null,
    "industry": null,
    "monthly_revenue": null,
    "business_goals": null,
    "current_challenges": null,
    "budget": null,
    "preferred_timeframe": null
  },
  "handoff_requested": false,
  "sentiment": "neutral"
}

The "reply" field must always be a plain text string — never a nested object. Only fill in extracted_fields the visitor has actually told you in THIS message or previous messages. Leave everything else null. Never invent information.`

export async function askGemini(conversationHistory) {
  const messages = [
    { role: 'system', content: SYSTEM_PROMPT },
    ...conversationHistory.map((m) => ({ role: m.role, content: m.content })),
  ]

  const response = await fetch(GROQ_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${GROQ_API_KEY}`,
    },
    body: JSON.stringify({
      model: 'llama-3.1-8b-instant',
      messages,
      response_format: { type: 'json_object' },
    }),
  })

  if (!response.ok) {
    const errText = await response.text()
    throw new Error(`Groq API error: ${response.status} — ${errText}`)
  }

  const data = await response.json()
  const raw = data.choices?.[0]?.message?.content ?? '{}'
  const parsed = JSON.parse(raw)

  // Defensive normalization — Groq occasionally nests reply as { text: "..." } instead of a plain string
  if (parsed.reply && typeof parsed.reply === 'object') {
    parsed.reply = parsed.reply.text ?? JSON.stringify(parsed.reply)
  }
  if (typeof parsed.reply !== 'string') {
    parsed.reply = String(parsed.reply ?? "Sorry, I didn't quite catch that — could you rephrase?")
  }

  // Defensive fallback for extracted_fields in case Groq omits it entirely
  if (!parsed.extracted_fields || typeof parsed.extracted_fields !== 'object') {
    parsed.extracted_fields = {}
  }

  // Defensive fallback for sentiment
  if (!['positive', 'neutral', 'negative'].includes(parsed.sentiment)) {
    parsed.sentiment = 'neutral'
  }

  return parsed
}