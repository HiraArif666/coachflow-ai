import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabaseClient'

export default function Dashboard() {
  const [leads, setLeads] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('all')

  useEffect(() => {
    async function fetchLeads() {
      const { data, error } = await supabase
        .from('leads')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) {
        console.error(error)
      } else {
        setLeads(data)
      }
      setLoading(false)
    }
    fetchLeads()
  }, [])

  const filtered = filter === 'all' ? leads : leads.filter((l) => l.lead_status === filter)

  const totalConversations = leads.length
  const qualifiedLeads = leads.filter((l) => l.lead_status === 'hot' || l.lead_status === 'warm').length
  const handoffCount = leads.filter((l) => l.handoff_requested).length
  const conversionRate = totalConversations > 0 ? Math.round((qualifiedLeads / totalConversations) * 100) : 0

  if (loading) {
    return <div className="p-10 text-[var(--color-ink-soft)]">Loading dashboard...</div>
  }

  return (
    <div className="min-h-screen bg-[var(--color-bg)] p-8">
      <h1 className="font-[var(--font-display)] text-3xl font-semibold text-[var(--color-ink)] mb-8">
        Coach Dashboard
      </h1>

      {/* Analytics cards — Module 7 */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
        <StatCard label="Total Conversations" value={totalConversations} />
        <StatCard label="Qualified Leads" value={qualifiedLeads} />
        <StatCard label="Conversion Rate" value={`${conversionRate}%`} />
        <StatCard label="Handoff Requests" value={handoffCount} highlight={handoffCount > 0} />
      </div>

      {/* Filters */}
      <div className="flex gap-2 mb-4">
        {['all', 'hot', 'warm', 'cold'].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium capitalize ${
              filter === f
                ? 'bg-[var(--color-teal)] text-white'
                : 'bg-[var(--color-seafoam-pale)] text-[var(--color-ink-soft)]'
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Leads table */}
      <div className="bg-white rounded-xl border border-[var(--color-seafoam)] overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-[var(--color-seafoam-pale)] text-[var(--color-ink-soft)] text-left">
            <tr>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Score</th>
              <th className="px-4 py-3">Handoff</th>
              <th className="px-4 py-3">Date</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((lead) => (
              <tr key={lead.id} className="border-t border-[var(--color-seafoam-pale)]">
                <td className="px-4 py-3">{lead.full_name || '—'}</td>
                <td className="px-4 py-3">{lead.email || '—'}</td>
                <td className="px-4 py-3">
                  <span
                    className={`px-2 py-0.5 rounded-full text-xs font-medium uppercase ${
                      lead.lead_status === 'hot'
                        ? 'bg-red-100 text-red-700'
                        : lead.lead_status === 'warm'
                        ? 'bg-[var(--color-seafoam-pale)] text-[var(--color-teal-dark)]'
                        : 'bg-gray-100 text-gray-500'
                    }`}
                  >
                    {lead.lead_status || 'unknown'}
                  </span>
                </td>
                <td className="px-4 py-3">{lead.lead_score ?? '—'}</td>
                <td className="px-4 py-3">
                  {lead.handoff_requested ? (
                    <span className="text-[var(--color-warn)] font-medium">Yes</span>
                  ) : (
                    '—'
                  )}
                </td>
                <td className="px-4 py-3 text-[var(--color-ink-soft)]">
                  {new Date(lead.created_at).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && (
          <p className="text-center text-[var(--color-ink-soft)] py-8">No leads in this category yet.</p>
        )}
      </div>
    </div>
  )
}

function StatCard({ label, value, highlight }) {
  return (
    <div
      className={`rounded-xl p-5 border ${
        highlight
          ? 'border-[var(--color-warn)] bg-orange-50'
          : 'border-[var(--color-seafoam)] bg-white'
      }`}
    >
      <p className="text-xs text-[var(--color-ink-soft)] uppercase tracking-wide mb-1">{label}</p>
      <p className="font-[var(--font-display)] text-2xl font-semibold text-[var(--color-ink)]">{value}</p>
    </div>
  )
}