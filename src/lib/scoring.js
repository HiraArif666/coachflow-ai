export function scoreLead(fields) {
  let score = 0

  if (fields.budget) score += 30
  if (fields.preferred_timeframe) score += 20
  if (fields.business_goals) score += 15
  if (fields.current_challenges) score += 15
  if (fields.company_name) score += 10
  if (fields.job_title) score += 10

  let status = 'cold'
  if (score >= 60) status = 'hot'
  else if (score >= 30) status = 'warm'

  return { score, status }
}