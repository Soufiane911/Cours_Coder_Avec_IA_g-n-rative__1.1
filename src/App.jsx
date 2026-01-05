import { useState } from 'react';
import './index.css';
import Header from './components/layout/Header';
import Sidebar from './components/layout/Sidebar';
import DashboardGrid, { GridItem } from './components/layout/DashboardGrid';
import Card from './components/ui/Card';
import KPICard from './components/ui/KPICard';
import Loader, { SkeletonChart } from './components/ui/Loader';
import { FilterProvider, useFilters } from './context/FilterContext';
import useSessionData from './hooks/useSessionData';
import { getGlobalKPIs, getSessionsByLanguage, getSessionsByService } from './utils/dataAggregations';

/**
 * Dashboard Content - Composant principal du dashboard
 */
const DashboardContent = () => {
  const { filteredSessions, filters, setFilters } = useFilters();
  const kpis = getGlobalKPIs(filteredSessions);
  const topLangues = getSessionsByLanguage(filteredSessions).slice(0, 5);
  const services = getSessionsByService(filteredSessions);

  return (
    <div className="flex flex-1 overflow-hidden">
      <Sidebar
        filters={filters}
        onFilterChange={setFilters}
        sessions={filteredSessions}
      />

      <DashboardGrid>
        {/* KPI Cards Row */}
        <GridItem>
          <KPICard
            title="Total Sessions"
            value={kpis.totalSessions}
            icon="📊"
            color="blue"
          />
        </GridItem>

        <GridItem>
          <KPICard
            title="Durée moyenne"
            value={`${kpis.avgDuration} min`}
            icon="⏱️"
            color="purple"
          />
        </GridItem>

        <GridItem>
          <KPICard
            title="Score qualité"
            value={`${kpis.avgQuality}%`}
            icon="✨"
            color="green"
          />
        </GridItem>

        <GridItem>
          <KPICard
            title="Note moyenne"
            value={`${kpis.avgRating}/5`}
            icon="⭐"
            color="amber"
          />
        </GridItem>

        {/* Top Langues Card */}
        <GridItem colSpan={2}>
          <Card title="Top Langues" icon="🌍">
            <div className="space-y-3">
              {topLangues.map((lang, i) => (
                <div key={lang.langue} className="flex items-center gap-3">
                  <span className="w-6 h-6 flex items-center justify-center bg-blue-500/20 text-blue-400 rounded-full text-xs font-bold">
                    {i + 1}
                  </span>
                  <span className="flex-1 text-white">{lang.langue}</span>
                  <span className="text-blue-400 font-semibold">{lang.count}</span>
                  <div className="w-24 bg-slate-700 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full"
                      style={{ width: `${(lang.count / topLangues[0].count) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </GridItem>

        {/* Services Card */}
        <GridItem colSpan={2}>
          <Card title="Répartition Services" icon="🏥">
            <div className="grid grid-cols-2 gap-2">
              {services.map((service) => (
                <div key={service.service} className="bg-slate-700/50 p-3 rounded-lg flex justify-between items-center">
                  <span className="text-sm text-slate-300">{service.service}</span>
                  <span className="text-purple-400 font-semibold">{service.percentage}%</span>
                </div>
              ))}
            </div>
          </Card>
        </GridItem>

        {/* Placeholder for future charts */}
        <GridItem colSpan={2}>
          <Card title="Évolution Sessions" icon="📈" className="h-64">
            <div className="flex items-center justify-center h-40 text-slate-500">
              📊 Graphique Phase 4
            </div>
          </Card>
        </GridItem>

        <GridItem colSpan={2}>
          <Card title="Indicateurs Qualité" icon="✨" className="h-64">
            <div className="flex items-center justify-center h-40 text-slate-500">
              📊 Graphique Phase 4
            </div>
          </Card>
        </GridItem>
      </DashboardGrid>
    </div>
  );
};

/**
 * App - Composant racine avec providers
 */
function App() {
  const [darkMode, setDarkMode] = useState(true);
  const { sessions, loading, error } = useSessionData();

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <Loader size="large" text="Chargement des données..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-400 text-xl mb-2">❌ Erreur</p>
          <p className="text-slate-400">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <FilterProvider sessions={sessions}>
      <div className="min-h-screen bg-slate-900 flex flex-col">
        <Header darkMode={darkMode} setDarkMode={setDarkMode} />
        <DashboardContent />
      </div>
    </FilterProvider>
  );
}

export default App;
