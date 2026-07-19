import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export async function saveLead(leadId, fields, score, status, handoff, conversationSummary, sentiment) {
  const payload = {
    ...fields,
    lead_score: score,
    lead_status: status,
    handoff_requested: handoff,
    conversation_summary: conversationSummary,
    sentiment: sentiment,
  }

  if (leadId) {
    const { error } = await supabase.from('leads').update(payload).eq('id', leadId)
    if (error) throw error
    return leadId
  } else {
    const { data, error } = await supabase.from('leads').insert(payload).select('id').single()
    if (error) throw error
    return data.id
  }
}