import { useContext } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import FilterContext from '../../context/FilterContext';
import { getRatingDistribution } from '../../utils/dataAggregations';
import KPICard from '../ui/KPICard';

/**
 * Composant pour afficher les notes praticiens (histogramme + KPI)
 */
const RatingsChart = () => {
    const { filteredSessions } = useContext(FilterContext);
    const { avg, distribution } = getRatingDistribution(filteredSessions);

    return (
        <div className="chart-container p-4 chart-animation">
            <h3 className="chart-title text-lg mb-3 text-center font-semibold text-slate-200">Notes praticiens</h3>

            {/* KPI pour la moyenne */}
            <div className="flex justify-center mb-4">
                <div className="kpi-card-modern p-4 rounded-lg text-center min-w-[150px]">
                    <div className="text-2xl font-bold text-blue-400 mb-1">{avg.toFixed(2)} / 5</div>
                    <div className="text-sm text-slate-400">Note moyenne</div>
                </div>
            </div>

            {/* Histogramme de distribution */}
            <div className="w-full h-48">
                <h4 className="text-sm font-medium mb-2 text-slate-300">Distribution des notes</h4>
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                        data={distribution}
                        margin={{ top: 10, right: 20, left: 15, bottom: 10 }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="note" fontSize={10} />
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
                        <Bar dataKey="count" fill="url(#ratingGradient)" radius={[3, 3, 0, 0]} />
                        <defs>
                            <linearGradient id="ratingGradient" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="#06b6d4" />
                                <stop offset="100%" stopColor="#22d3ee" />
                            </linearGradient>
                        </defs>
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default RatingsChart;