import { useContext } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import FilterContext from '../../context/FilterContext';
import { getSessionsByMonth } from '../../utils/dataAggregations';

/**
 * Composant pour afficher l'évolution du nombre de sessions (line chart)
 */
const SessionsEvolutionChart = () => {
    const { filteredSessions } = useContext(FilterContext);
    const data = getSessionsByMonth(filteredSessions);

    return (
        <div className="chart-container p-4 chart-animation">
            <h3 className="chart-title text-lg mb-3 text-center font-semibold text-slate-200">Évolution du nombre de sessions</h3>
            <ResponsiveContainer width="100%" height={280}>
                <LineChart
                    data={data}
                    margin={{ top: 10, right: 20, left: 15, bottom: 10 }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" fontSize={11} />
                    <YAxis fontSize={11} />
                    <Tooltip
                        contentStyle={{
                            background: 'linear-gradient(135deg, rgba(30, 41, 59, 0.95), rgba(51, 65, 85, 0.9))',
                            border: '1px solid rgba(59, 130, 246, 0.5)',
                            borderRadius: '6px',
                            color: '#cbd5e1',
                            fontSize: '12px'
                        }}
                    />
                    <Line
                        type="monotone"
                        dataKey="count"
                        stroke="url(#turquoiseLineGradient)"
                        strokeWidth={3}
                        dot={{ fill: '#06b6d4', strokeWidth: 2, r: 4 }}
                        activeDot={{ r: 6, stroke: '#06b6d4', strokeWidth: 2 }}
                    />
                    <defs>
                        <linearGradient id="turquoiseLineGradient" x1="0" y1="0" x2="1" y2="0">
                            <stop offset="0%" stopColor="#06b6d4" />
                            <stop offset="50%" stopColor="#22d3ee" />
                            <stop offset="100%" stopColor="#67e8f9" />
                        </linearGradient>
                    </defs>
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};

export default SessionsEvolutionChart;