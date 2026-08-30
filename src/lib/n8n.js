const N8N_WEBHOOK_URL = import.meta.env.VITE_N8N_WEBHOOK_URL

export async function triggerN8nWorkflow(payload) {
  if (!N8N_WEBHOOK_URL) {
    console.warn('n8n webhook URL not set — skipping trigger')
    return
  }
  try {
    await fetch(N8N_WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
  } catch (err) {
    console.error('Failed to trigger n8n workflow:', err)
  }
}o