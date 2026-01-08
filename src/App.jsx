import { useState, useMemo } from 'react';
import './index.css';
import Sidebar from './components/layout/Sidebar';
import GradientStatCard, { MiniStatRow } from './components/ui/StatWidgets';
import Loader from './components/ui/Loader';
import { FilterProvider, useFilters } from './context/FilterContext';
import useSessionData from './hooks/useSessionData';
import {
    getGlobalKPIs,
    getSessionsByMonth,
    getSessionsByWeek,
    getSessionsByService,
    getInteractionStats,
    getRatingDistribution,
    getDurationStats,
    getSessionsByLanguage
} from './utils/dataAggregations';

// Charts
import SessionsEvolutionChart from './components/charts/SessionsEvolutionChart';
import ServicesChart from './components/charts/ServicesChart';
import ReturnRateChart from './components/charts/ReturnRateChart';
import LanguagesChart from './components/charts/LanguagesChart';
import InteractionsChart from './components/charts/InteractionsChart';
import RatingsChart from './components/charts/RatingsChart';
import QualityChart from './components/charts/QualityChart';

/**
 * Filter Pill Component
 */
const FilterPill = ({ label, active, onClick, color = "purple" }) => (
    <button
        onClick={onClick}
        className={`px-3 py-1.5 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all border ${active
            ? `bg-${color}-500/20 border-${color}-500/40 text-${color}-400`
            : 'bg-white/5 border-white/5 text-zinc-500 hover:text-zinc-300 hover:border-white/10'
            }`}
    >
        {label}
    </button>
);

/**
 * VIEW: DASHBOARD (Overview)
 */
const OverviewView = ({ kpis, monthlyData, serviceData, languageData, durationStats }) => {
    const avgDurationHours = Math.floor(durationStats.avg / 60);
    const avgDurationMinutes = Math.round(durationStats.avg % 60);

    return (
        <div className="flex flex-col gap-6 animate-fade-in pb-10">
            <div className="grid grid-cols-12 gap-6">
                <div className="col-span-4">
                    <GradientStatCard
                        label="Total Sessions Médicales"
                        value={kpis.totalSessions}
                        subtitle="sur la période"
                        gradient="linear-gradient(135deg, #CF57D3 0%, #9048F7 100%)"
                    />
                </div>
                <div className="col-span-4">
                    <GradientStatCard
                        label="Durée Moyenne / Session"
                        valueH={avgDurationHours.toString().padStart(2, '0')}
                        valueM={avgDurationMinutes.toString().padStart(2, '0')}
                        gradient="linear-gradient(135deg, #22D3EE 0%, #3B82F6 100%)"
                    />
                </div>
                <div className="col-span-4 flex flex-col justify-between">
                    <MiniStatRow label="Satisfaction Praticien" value={`${kpis.avgRating}/5.0`} trend="+0.4" icon={<svg className="w-5 h-5 text-amber-400" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>} />
                    <div className="h-6"></div>
                    <MiniStatRow label="Précision IA (Score)" value={`${kpis.avgQuality}%`} trend="+1.2%" icon={<svg className="w-5 h-5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>} />
                </div>
            </div>
            <div className="h-[340px] bg-[#1C1C24] rounded-3xl border border-[#ffffff05] shadow-lg overflow-hidden flex-shrink-0">
                <SessionsEvolutionChart data={monthlyData} />
            </div>
            <div className="h-[300px] grid grid-cols-2 gap-6 flex-shrink-0">
                <div className="bg-[#1C1C24] rounded-3xl border border-[#ffffff05] shadow-lg overflow-hidden">
                    <ServicesChart data={serviceData} />
                </div>
                <div className="bg-[#1C1C24] rounded-3xl border border-[#ffffff05] shadow-lg overflow-hidden">
                    <LanguagesChart data={languageData} />
                </div>
            </div>
        </div>
    );
};

/**
 * VIEW: ANALYSES (Deep Dive with Time Filter)
 */
const AnalyticsView = ({ sessions, monthlyData }) => {
    const [selectedWeek, setSelectedWeek] = useState(null);

    // Local filtering by week
    const filteredByWeek = useMemo(() => {
        if (!selectedWeek) return sessions;
        return sessions.filter(s => {
            const sessionDate = new Date(s.date);
            const day = sessionDate.getDay();
            // Adjust day to make Monday the first day (0 for Monday, 6 for Sunday)
            const diff = sessionDate.getDate() - day + (day === 0 ? -6 : 1);
            const monday = new Date(sessionDate.setDate(diff)).toISOString().split('T')[0];
            return monday === selectedWeek;
        });
    }, [sessions, selectedWeek]);

    const kpis = useMemo(() => getGlobalKPIs(filteredByWeek), [filteredByWeek]);
    const serviceData = useMemo(() => getSessionsByService(filteredByWeek), [filteredByWeek]);
    const languageData = useMemo(() => getSessionsByLanguage(filteredByWeek).slice(0, 5), [filteredByWeek]);
    const interactionData = useMemo(() => getInteractionStats(filteredByWeek), [filteredByWeek]);
    const ratingData = useMemo(() => getRatingDistribution(filteredByWeek), [filteredByWeek]);

    return (
        <div className="flex flex-col gap-6 animate-fade-in pb-10">
            {/* Top Row: Temporal Filter */}
            <div className="h-[280px] bg-[#1C1C24] rounded-3xl border border-[#ffffff05] shadow-lg overflow-hidden flex-shrink-0 relative group">
                <SessionsEvolutionChart
                    data={monthlyData}
                    onSelect={(week) => setSelectedWeek(week === selectedWeek ? null : week)}
                    activeFilter={selectedWeek}
                />
                {selectedWeek && (
                    <button
                        onClick={() => setSelectedWeek(null)}
                        className="absolute top-6 right-36 px-3 py-1 bg-rose-500/10 border border-rose-500/20 rounded-lg text-rose-500 text-[10px] font-bold uppercase tracking-widest hover:bg-rose-500/20 transition-all z-20"
                    >
                        Réinitialiser Période
                    </button>
                )}
            </div>

            {/* Second Row: Granular KPIs for selected period */}
            <div className="grid grid-cols-4 gap-6">
                <div className="bg-[#1C1C24] border border-white/5 p-5 rounded-3xl relative overflow-hidden">
                    <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-1">Sessions Période</p>
                    <p className="text-2xl font-black text-white">{kpis.totalSessions}</p>
                    <div className="absolute -right-4 -bottom-4 w-16 h-16 bg-purple-500/10 rounded-full blur-xl"></div>
                </div>
                <div className="bg-[#1C1C24] border border-white/5 p-5 rounded-3xl">
                    <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-1">Durée Moyenne</p>
                    <p className="text-2xl font-black text-cyan-400">{kpis.avgDuration} min</p>
                </div>
                <div className="bg-[#1C1C24] border border-white/5 p-5 rounded-3xl">
                    <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-1">Score Qualité</p>
                    <p className="text-2xl font-black text-emerald-400">{kpis.avgQuality}%</p>
                </div>
                <div className="bg-[#1C1C24] border border-white/5 p-5 rounded-3xl">
                    <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-1">Note Moyenne</p>
                    <p className="text-2xl font-black text-amber-400">{kpis.avgRating}/5</p>
                </div>
            </div>

            {/* Third Row: Languages & Services */}
            <div className="grid grid-cols-12 gap-6 h-[320px]">
                <div className="col-span-12 lg:col-span-7 bg-[#1C1C24] rounded-3xl border border-[#ffffff05] shadow-lg overflow-hidden">
                    <LanguagesChart data={languageData} />
                </div>
                <div className="col-span-12 lg:col-span-5 bg-[#1C1C24] rounded-3xl border border-[#ffffff05] shadow-lg overflow-hidden">
                    <ServicesChart data={serviceData} />
                </div>
            </div>

            {/* Fourth Row: Interactions & Ratings Comparison */}
            <div className="grid grid-cols-12 gap-6 h-[360px]">
                <div className="col-span-12 lg:col-span-8 bg-[#1C1C24] rounded-3xl border border-[#ffffff05] shadow-lg overflow-hidden">
                    <InteractionsChart data={interactionData} />
                </div>
                <div className="col-span-12 lg:col-span-4 bg-[#1C1C24] rounded-3xl border border-[#ffffff05] shadow-lg overflow-hidden">
                    <RatingsChart data={ratingData} />
                </div>
            </div>

            {/* Status indicators */}
            <div className="grid grid-cols-3 gap-6">
                <MiniStatRow label="Intensité Patient" value="Élevée" trend="+12%" icon={<svg className="w-5 h-5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>} />
                <MiniStatRow label="Satisfaction" value="Optimale" trend="+5%" icon={<svg className="w-5 h-5 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>} />
                <MiniStatRow label="Précision ASR" value="98.2%" trend="+0.4%" icon={<svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>} />
            </div>
        </div>
    );
};

/**
 * VIEW: EXPLORATION (Session Cards)
 */
const ExplorationView = ({ sessions }) => {
    return (
        <div className="flex flex-col gap-4 animate-fade-in pb-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {sessions.slice(0, 20).map((s, i) => (
                    <div key={s.session_id || i} className="bg-[#1C1C24] border border-white/5 rounded-2xl p-5 hover:border-purple-500/30 transition-all group">
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <h4 className="text-white font-bold text-sm tracking-tight">{s.service}</h4>
                                <p className="text-[10px] text-zinc-500 font-mono">{s.session_id}</p>
                            </div>
                            <span className="px-2 py-0.5 bg-white/5 border border-white/5 rounded text-[9px] font-bold text-zinc-400 uppercase tracking-wider">
                                {s.langue}
                            </span>
                        </div>
                        <div className="flex items-center gap-6">
                            <div className="flex flex-col">
                                <span className="text-[9px] font-bold text-zinc-600 uppercase tracking-tighter">Durée</span>
                                <span className="text-xs font-bold text-white">{s.duree_minutes} min</span>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-[9px] font-bold text-zinc-600 uppercase tracking-tighter">Score IA</span>
                                <span className="text-xs font-bold text-cyan-400">{(s.qualite_score * 100).toFixed(0)}%</span>
                            </div>
                            <div className="flex flex-col ml-auto">
                                <span className="text-[9px] font-bold text-zinc-600 uppercase tracking-tighter">Note</span>
                                <span className="text-xs font-bold text-amber-400">{s.note_praticien} ★</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            {sessions.length > 20 && (
                <div className="py-8 text-center">
                    <button className="px-6 py-2 bg-white/5 border border-white/10 rounded-xl text-[10px] font-bold text-zinc-400 uppercase tracking-widest hover:bg-white/10 transition-colors">
                        Charger plus de sessions
                    </button>
                </div>
            )}
        </div>
    );
};

/**
 * VIEW: QUALITY IA (Technical)
 */
const QualityView = ({ kpis }) => {
    return (
        <div className="flex flex-col gap-6 animate-fade-in pb-10">
            <div className="grid grid-cols-12 gap-6 h-[300px]">
                <div className="col-span-8 bg-[#1C1C24] rounded-3xl border border-[#ffffff05] shadow-lg overflow-hidden">
                    <QualityChart />
                </div>
                <div className="col-span-4 bg-[#1C1C24] rounded-3xl border border-[#ffffff05] shadow-lg overflow-hidden">
                    <ReturnRateChart totalSessions={kpis.totalSessions} score={kpis.avgQuality} />
                </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
                <div className="bg-gradient-to-br from-cyan-500/10 to-transparent rounded-3xl border border-cyan-500/10 p-8">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="w-12 h-12 rounded-2xl bg-cyan-400/10 flex items-center justify-center text-cyan-400">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
                        </div>
                        <div>
                            <h3 className="text-white font-bold text-xl leading-tight">Moteur d'Analyse IA</h3>
                            <p className="text-cyan-400/60 text-xs font-bold uppercase tracking-widest">Score actuel : {kpis.avgQuality}%</p>
                        </div>
                    </div>
                    <p className="text-gray-400 text-sm mb-8 leading-relaxed">
                        Le système de reconnaissance vocale médicale (ASR) de Dashaalia maintient une précision de haut niveau. Les segments non reconnus sont automatiquement flaggés.
                    </p>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="p-4 bg-black/20 rounded-2xl border border-white/5">
                            <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1">Stabilité</p>
                            <p className="text-lg font-bold text-white">99.8%</p>
                        </div>
                        <div className="p-4 bg-black/20 rounded-2xl border border-white/5">
                            <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1">Latence Moy.</p>
                            <p className="text-lg font-bold text-white">120ms</p>
                        </div>
                    </div>
                </div>

                <div className="bg-gradient-to-br from-purple-500/10 to-transparent rounded-3xl border border-purple-500/10 p-8">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="w-12 h-12 rounded-2xl bg-purple-400/10 flex items-center justify-center text-purple-400">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.644.322a6 6 0 01-3.86.517l-2.387-.477a2 2 0 00-1.022.547l-1.168 1.168a2 2 0 00-.556 1.414V19a2 2 0 002 2h10a2 2 0 002-2v-1.414a2 2 0 00-.556-1.414l-1.168-1.168zM12 11a4 4 0 100-8 4 4 0 000 8z" /></svg>
                        </div>
                        <div>
                            <h3 className="text-white font-bold text-xl leading-tight">Impact Praticien</h3>
                            <p className="text-purple-400/60 text-xs font-bold uppercase tracking-widest">Satisfaction : {kpis.avgRating}/5.0</p>
                        </div>
                    </div>
                    <p className="text-gray-400 text-sm mb-8 leading-relaxed">
                        L'ergonomie de l'interface et la pertinence des traductions sont évaluées après chaque session.
                    </p>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="p-4 bg-black/20 rounded-2xl border border-white/5">
                            <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1">Taux d'Adoption</p>
                            <p className="text-lg font-bold text-white">84%</p>
                        </div>
                        <div className="p-4 bg-black/20 rounded-2xl border border-white/5">
                            <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1">NPS Score</p>
                            <p className="text-lg font-bold text-white">+62</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

/**
 * Main Content Orchestrator
 */
const DashboardContent = () => {
    const { filteredSessions, hasActiveFilters, resetFilters, updateFilter, filters } = useFilters();
    const [activeView, setActiveView] = useState('Dashboard');

    // Available filter options
    const availableLanguages = ['Soninké', 'Russe', 'Arabe', 'Espagnol', 'Anglais'];
    const availableDevices = ['webapp', 'mobile'];

    const handleNavigation = (name) => {
        const medicalServices = ['Urgences', 'Cardiologie', 'Pédiatrie', 'Gériatrie'];

        if (medicalServices.includes(name)) {
            // Toggle logic for services
            const newServices = filters.services.includes(name)
                ? filters.services.filter(s => s !== name)
                : [...filters.services, name];

            updateFilter('services', newServices);

            // Switch to Analyses view if filtering by services
            if (activeView !== 'Analyses') {
                setActiveView('Analyses');
            }
            return;
        }

        setActiveView(name);
        if (name === 'Dashboard') resetFilters();
    };

    // Aggregations
    const kpis = useMemo(() => getGlobalKPIs(filteredSessions), [filteredSessions]);
    const monthlyData = useMemo(() => getSessionsByWeek(filteredSessions), [filteredSessions]);
    const serviceData = useMemo(() => getSessionsByService(filteredSessions), [filteredSessions]);
    const languageData = useMemo(() => getSessionsByLanguage(filteredSessions), [filteredSessions]);
    const interactionData = useMemo(() => getInteractionStats(filteredSessions), [filteredSessions]);
    const ratingData = useMemo(() => getRatingDistribution(filteredSessions), [filteredSessions]);
    const durationStats = useMemo(() => getDurationStats(filteredSessions), [filteredSessions]);

    const toggleLanguage = (lang) => {
        const newLangs = filters.langues.includes(lang)
            ? filters.langues.filter(l => l !== lang)
            : [...filters.langues, lang];
        updateFilter('langues', newLangs);
    };

    const toggleDevice = (dev) => {
        const newDevs = filters.devices.includes(dev)
            ? filters.devices.filter(d => d !== dev)
            : [...filters.devices, dev];
        updateFilter('devices', newDevs);
    };

    const renderCurrentView = () => {
        switch (activeView) {
            case 'Dashboard':
                return <OverviewView kpis={kpis} monthlyData={monthlyData} serviceData={serviceData} languageData={languageData} durationStats={durationStats} />;
            case 'Analyses':
                return <AnalyticsView sessions={filteredSessions} monthlyData={monthlyData} />;
            case 'Qualité IA':
                return <QualityView kpis={kpis} />;
            case 'Exploration':
                return <ExplorationView sessions={filteredSessions} />;
            default:
                return <OverviewView kpis={kpis} monthlyData={monthlyData} serviceData={serviceData} languageData={languageData} durationStats={durationStats} />;
        }
    };

    return (
        <div className="flex bg-[#121216]">
            <Sidebar
                active={activeView}
                activeServices={filters.services}
                onNavigate={handleNavigation}
                hasActiveFilters={hasActiveFilters}
                onResetFilters={resetFilters}
            />

            <main className="flex-1 h-screen overflow-hidden p-8 flex flex-col gap-6">
                <div className="flex flex-col gap-6 mb-2">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <h2 className="text-2xl font-extrabold text-white tracking-tight">{activeView}</h2>
                            {filters.services.length > 0 && (
                                <div className="flex items-center gap-2">
                                    <span className="text-zinc-700">/</span>
                                    <div className="flex items-center gap-1.5 animate-fade-in">
                                        {filters.services.length <= 2 ? (
                                            filters.services.map(s => (
                                                <div key={s} className="px-3 py-1 bg-purple-500/10 border border-purple-500/20 rounded-lg text-purple-400 text-[10px] font-bold uppercase tracking-widest">
                                                    {s}
                                                </div>
                                            ))
                                        ) : (
                                            <div className="px-3 py-1 bg-purple-500/10 border border-purple-500/20 rounded-lg text-purple-400 text-[10px] font-bold uppercase tracking-widest">
                                                {filters.services.length} Services Sélectionnés
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="text-right">
                                <p className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest">Station de Contrôle</p>
                                <p className="text-xs text-white font-medium">Connecté | {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                            </div>
                            <div className="p-1 px-3 rounded-xl bg-green-500/10 border border-green-500/20 flex items-center gap-2">
                                <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div>
                                <span className="text-[10px] font-bold text-green-500 uppercase italic">Live</span>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center justify-between py-4 border-y border-white/[0.03] bg-white/[0.01] -mx-8 px-8">
                        <div className="flex items-center gap-10">
                            <div className="flex items-center gap-3">
                                <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-tighter">Langues :</span>
                                <div className="flex items-center gap-2">
                                    {availableLanguages.map(lang => (
                                        <FilterPill
                                            key={lang}
                                            label={lang}
                                            active={filters.langues.includes(lang)}
                                            onClick={() => toggleLanguage(lang)}
                                        />
                                    ))}
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-tighter">Support :</span>
                                <div className="flex items-center gap-2">
                                    {availableDevices.map(dev => (
                                        <FilterPill
                                            key={dev}
                                            label={dev}
                                            active={filters.devices.includes(dev)}
                                            onClick={() => toggleDevice(dev)}
                                            color="cyan"
                                        />
                                    ))}
                                </div>
                            </div>
                            <div className="w-px h-6 bg-white/5"></div>
                            <div className="flex items-center gap-2 text-xs font-bold text-zinc-400 font-mono">
                                <span className="text-purple-400">{filteredSessions.length}</span>
                                <span className="text-[9px] text-zinc-600 uppercase tracking-widest">Sessions filtrées</span>
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            {hasActiveFilters && (
                                <button
                                    onClick={resetFilters}
                                    className="text-[10px] font-bold text-zinc-500 hover:text-white transition-colors uppercase tracking-widest flex items-center gap-2 group"
                                >
                                    <svg className="w-3.5 h-3.5 group-hover:rotate-180 transition-transform duration-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
                                    Reset
                                </button>
                            )}
                        </div>
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
                    {renderCurrentView()}
                </div>
            </main>
        </div>
    );
};

function App() {
    const { sessions, loading, error } = useSessionData();

    if (loading) return <div className="min-h-screen bg-[#121216] flex items-center justify-center"><Loader size="large" text="Flux Médical en cours..." /></div>;
    if (error) return <div className="min-h-screen bg-[#121216] flex items-center justify-center p-8"><div className="text-center p-12 bg-[#1C1C24] border border-rose-500/30 rounded-3xl max-w-md shadow-2xl"><div className="w-16 h-16 bg-rose-500/10 text-rose-500 rounded-full flex items-center justify-center mx-auto mb-6"><svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg></div><h2 className="text-2xl font-bold text-white mb-3">Erreur de Flux</h2><p className="text-sm text-gray-400 leading-relaxed mb-6">{error}</p><button onClick={() => window.location.reload()} className="px-6 py-2 bg-rose-500 text-white font-bold rounded-xl hover:bg-rose-600 transition-colors">Réessayer</button></div></div>;

    return (
        <FilterProvider sessions={sessions}>
            <DashboardContent />
        </FilterProvider>
    );
}

export default App;
