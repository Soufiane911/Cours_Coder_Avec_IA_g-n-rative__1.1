import { useContext } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import FilterContext from '../../context/FilterContext';
import { getDurationStats } from '../../utils/dataAggregations';
import KPICard from '../ui/KPICard';

/**
 * Composant pour afficher la durée moyenne (KPI + histogramme)
 */
const DurationChart = () => {
    const { filteredSessions } = useContext(FilterContext);
    const stats = getDurationStats(filteredSessions);

    return (
        <div className="chart-container p-4 chart-animation">
            <h3 className="chart-title text-lg mb-3 text-center font-semibold text-slate-200">Durée moyenne des sessions</h3>

            {/* KPI Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
                <div className="kpi-card-modern p-3 rounded-lg text-center">
                    <div className="text-lg font-bold text-blue-400">{stats.avg.toFixed(1)} min</div>
                    <div className="text-xs text-slate-400">Moyenne</div>
                </div>
                <div className="kpi-card-modern p-3 rounded-lg text-center">
                    <div className="text-lg font-bold text-blue-400">{stats.median} min</div>
                    <div className="text-xs text-slate-400">Médiane</div>
                </div>
                <div className="kpi-card-modern p-3 rounded-lg text-center">
                    <div className="text-lg font-bold text-blue-400">{stats.min} min</div>
                    <div className="text-xs text-slate-400">Minimum</div>
                </div>
                <div className="kpi-card-modern p-3 rounded-lg text-center">
                    <div className="text-lg font-bold text-blue-400">{stats.max} min</div>
                    <div className="text-xs text-slate-400">Maximum</div>
                </div>
            </div>

            {/* Histogramme de distribution */}
            <div className="w-full h-48">
                <h4 className="text-sm font-medium mb-2 text-slate-300">Distribution des durées</h4>
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                        data={stats.distribution}
                        margin={{ top: 10, right: 20, left: 15, bottom: 10 }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="range" fontSize={10} />
                        <YAxis fontSize={10} />
                        <Tooltip
                            contentStyle={{
                                background: 'linear-gradient(135deg, rgba(30, 41, 59, 0.95), rgba(51, 65, 85, 0.9))',
                                border: '1px solid rgba(59, 130, 246, 0.5)',
                                borderRadius: '6px',
                                color: '#cbd5e1',
                                fontSize: '12px'
                            }}
                        />
                        <Bar dataKey="count" fill="url(#durationGradient)" radius={[3, 3, 0, 0]} />
                        <defs>
                            <linearGradient id="durationGradient" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="#8b5cf6" />
                                <stop offset="100%" stopColor="#a78bfa" />
                            </linearGradient>
                        </defs>
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default DurationChart;