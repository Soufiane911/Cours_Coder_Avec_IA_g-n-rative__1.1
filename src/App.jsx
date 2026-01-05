import { useState, useEffect } from 'react'
import './App.css'
import { loadCSVFromURL } from './utils/csvParser'
import {
  getSessionsByLanguage,
  getSessionsByService,
  getDurationStats,
  getGlobalKPIs
} from './utils/dataAggregations'

function App() {
  const [sessions, setSessions] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [stats, setStats] = useState(null)

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await loadCSVFromURL('/src/data/sessions_dataset_320.csv')
        setSessions(data)

        // Test des fonctions d'agrégation
        const kpis = getGlobalKPIs(data)
        const byLanguage = getSessionsByLanguage(data)
        const byService = getSessionsByService(data)
        const duration = getDurationStats(data)

        setStats({ kpis, byLanguage, byService, duration })
        setLoading(false)
      } catch (err) {
        setError(err.message)
        setLoading(false)
      }
    }
    loadData()
  }, [])

  if (loading) return <div className="p-8 text-white">Chargement des données...</div>
  if (error) return <div className="p-8 text-red-500">Erreur: {error}</div>

  return (
    <div className="min-h-screen bg-slate-900 p-8 text-white">
      <h1 className="text-3xl font-bold mb-6 gradient-text">
        🏥 Dashaalia - Test Data Layer
      </h1>

      {stats && (
        <div className="space-y-6">
          {/* KPIs */}
          <div className="glass-card p-6">
            <h2 className="text-xl font-semibold mb-4">📊 KPIs Globaux</h2>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              <div className="bg-slate-800 p-4 rounded-lg">
                <p className="text-slate-400 text-sm">Total Sessions</p>
                <p className="text-2xl font-bold text-blue-400">{stats.kpis.totalSessions}</p>
              </div>
              <div className="bg-slate-800 p-4 rounded-lg">
                <p className="text-slate-400 text-sm">Durée moyenne</p>
                <p className="text-2xl font-bold text-purple-400">{stats.kpis.avgDuration} min</p>
              </div>
              <div className="bg-slate-800 p-4 rounded-lg">
                <p className="text-slate-400 text-sm">Qualité moyenne</p>
                <p className="text-2xl font-bold text-green-400">{stats.kpis.avgQuality}%</p>
              </div>
              <div className="bg-slate-800 p-4 rounded-lg">
                <p className="text-slate-400 text-sm">Note moyenne</p>
                <p className="text-2xl font-bold text-amber-400">{stats.kpis.avgRating}/5</p>
              </div>
              <div className="bg-slate-800 p-4 rounded-lg">
                <p className="text-slate-400 text-sm">Interactions totales</p>
                <p className="text-2xl font-bold text-cyan-400">{stats.kpis.totalInteractions}</p>
              </div>
            </div>
          </div>

          {/* Top Langues */}
          <div className="glass-card p-6">
            <h2 className="text-xl font-semibold mb-4">🌍 Top Langues</h2>
            <div className="space-y-2">
              {stats.byLanguage.slice(0, 5).map((lang, i) => (
                <div key={lang.langue} className="flex items-center gap-3">
                  <span className="text-slate-400 w-6">{i + 1}.</span>
                  <span className="flex-1">{lang.langue}</span>
                  <span className="text-blue-400 font-semibold">{lang.count} sessions</span>
                </div>
              ))}
            </div>
          </div>

          {/* Services */}
          <div className="glass-card p-6">
            <h2 className="text-xl font-semibold mb-4">🏥 Répartition par Service</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {stats.byService.map((service) => (
                <div key={service.service} className="bg-slate-800 p-3 rounded-lg flex justify-between">
                  <span>{service.service}</span>
                  <span className="text-purple-400">{service.percentage}%</span>
                </div>
              ))}
            </div>
          </div>

          {/* Durée Stats */}
          <div className="glass-card p-6">
            <h2 className="text-xl font-semibold mb-4">⏱️ Statistiques Durée</h2>
            <div className="grid grid-cols-4 gap-4">
              <div className="bg-slate-800 p-3 rounded-lg text-center">
                <p className="text-slate-400 text-sm">Min</p>
                <p className="text-xl font-bold">{stats.duration.min} min</p>
              </div>
              <div className="bg-slate-800 p-3 rounded-lg text-center">
                <p className="text-slate-400 text-sm">Max</p>
                <p className="text-xl font-bold">{stats.duration.max} min</p>
              </div>
              <div className="bg-slate-800 p-3 rounded-lg text-center">
                <p className="text-slate-400 text-sm">Moyenne</p>
                <p className="text-xl font-bold">{stats.duration.avg.toFixed(1)} min</p>
              </div>
              <div className="bg-slate-800 p-3 rounded-lg text-center">
                <p className="text-slate-400 text-sm">Médiane</p>
                <p className="text-xl font-bold">{stats.duration.median} min</p>
              </div>
            </div>
          </div>

          <p className="text-green-400 text-center">
            ✅ Data Layer fonctionne correctement ! {sessions.length} sessions chargées.
          </p>
        </div>
      )}
    </div>
  )
}

export default App
