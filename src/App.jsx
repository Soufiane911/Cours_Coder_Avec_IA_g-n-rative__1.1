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
import { getGlobalKPIs } from './utils/dataAggregations';
import LanguagesChart from './components/charts/LanguagesChart';
import SessionsEvolutionChart from './components/charts/SessionsEvolutionChart';
import DurationChart from './components/charts/DurationChart';
import ServicesChart from './components/charts/ServicesChart';
import QualityChart from './components/charts/QualityChart';
import InteractionsChart from './components/charts/InteractionsChart';
import RatingsChart from './components/charts/RatingsChart';

/**
 * Dashboard Content - Composant principal du dashboard
 */
const DashboardContent = () => {
  const { filteredSessions, filters, setFilters } = useFilters();
  const kpis = getGlobalKPIs(filteredSessions);

  return (
    <div className="flex flex-1 overflow-hidden">
      <Sidebar
        filters={filters}
        onFilterChange={setFilters}
        sessions={filteredSessions}
      />

      {/* Dashboard optimisé - Meilleure configuration */}
      <div className="flex-1 p-8 overflow-y-auto bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        {/* Header élégant */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 via-blue-300 to-blue-500 bg-clip-text text-transparent mb-2">
            Dashaalia Analytics
          </h1>
          <p className="text-slate-400 text-sm">Plateforme d'interprétation médicale</p>
        </div>

        {/* KPIs principaux - Design amélioré */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <div className="bg-gradient-to-br from-blue-500/10 to-blue-600/5 border border-blue-500/20 rounded-xl p-6 text-center hover:bg-blue-500/15 transition-all duration-300">
            <div className="text-3xl font-bold text-blue-400 mb-2">{kpis.totalSessions}</div>
            <div className="text-sm text-slate-400 uppercase tracking-wider font-medium">Sessions Totales</div>
          </div>
          <div className="bg-gradient-to-br from-green-500/10 to-green-600/5 border border-green-500/20 rounded-xl p-6 text-center hover:bg-green-500/15 transition-all duration-300">
            <div className="text-3xl font-bold text-green-400 mb-2">{kpis.avgDuration}<span className="text-lg text-green-300">min</span></div>
            <div className="text-sm text-slate-400 uppercase tracking-wider font-medium">Durée Moyenne</div>
          </div>
          <div className="bg-gradient-to-br from-purple-500/10 to-purple-600/5 border border-purple-500/20 rounded-xl p-6 text-center hover:bg-purple-500/15 transition-all duration-300">
            <div className="text-3xl font-bold text-purple-400 mb-2">{kpis.avgQuality}<span className="text-lg text-purple-300">%</span></div>
            <div className="text-sm text-slate-400 uppercase tracking-wider font-medium">Qualité Moyenne</div>
          </div>
          <div className="bg-gradient-to-br from-orange-500/10 to-orange-600/5 border border-orange-500/20 rounded-xl p-6 text-center hover:bg-orange-500/15 transition-all duration-300">
            <div className="text-3xl font-bold text-orange-400 mb-2">{kpis.avgRating}<span className="text-lg text-orange-300">/5</span></div>
            <div className="text-sm text-slate-400 uppercase tracking-wider font-medium">Note Moyenne</div>
          </div>
        </div>

        {/* Section Tendances - Charts principaux */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-slate-200 mb-6 flex items-center">
            <div className="w-1 h-6 bg-blue-500 rounded-full mr-3"></div>
            Tendances & Évolution
          </h2>
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
            <div className="xl:col-span-2 bg-slate-800/40 backdrop-blur-sm border border-slate-600/30 rounded-xl p-6 hover:bg-slate-800/50 transition-all duration-300">
              <SessionsEvolutionChart />
            </div>
            <div className="bg-slate-800/40 backdrop-blur-sm border border-slate-600/30 rounded-xl p-6 hover:bg-slate-800/50 transition-all duration-300">
              <LanguagesChart />
            </div>
          </div>
        </div>

        {/* Section Répartition & Qualité */}
        <div className="mb-16">
          <h2 className="text-xl font-semibold text-slate-200 mb-6 flex items-center">
            <div className="w-1 h-6 bg-blue-500 rounded-full mr-3"></div>
            Répartition & Qualité
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-slate-800/40 backdrop-blur-sm border border-slate-600/30 rounded-xl p-6 hover:bg-slate-800/50 transition-all duration-300">
              <ServicesChart />
            </div>
            <div className="bg-slate-800/40 backdrop-blur-sm border border-slate-600/30 rounded-xl p-6 hover:bg-slate-800/50 transition-all duration-300">
              <QualityChart />
            </div>
          </div>
        </div>

        {/* Section Détails Opérationnels */}
        <div className="mb-16">
          <h2 className="text-xl font-semibold text-slate-200 mb-6 flex items-center">
            <div className="w-1 h-6 bg-blue-500 rounded-full mr-3"></div>
            Détails Opérationnels
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            <div className="bg-slate-800/40 backdrop-blur-sm border border-slate-600/30 rounded-xl p-6 hover:bg-slate-800/50 transition-all duration-300">
              <DurationChart />
            </div>
            <div className="bg-slate-800/40 backdrop-blur-sm border border-slate-600/30 rounded-xl p-6 hover:bg-slate-800/50 transition-all duration-300">
              <InteractionsChart />
            </div>
            <div className="bg-slate-800/40 backdrop-blur-sm border border-slate-600/30 rounded-xl p-6 hover:bg-slate-800/50 transition-all duration-300 md:col-span-2 xl:col-span-1">
              <RatingsChart />
            </div>
          </div>
        </div>
      </div>
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
