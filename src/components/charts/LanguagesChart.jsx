import { useContext } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import FilterContext from '../../context/FilterContext';
import { getSessionsByLanguage } from '../../utils/dataAggregations';

/**
 * Composant pour afficher le top des langues (bar chart horizontal)
 */
const LanguagesChart = () => {
    const { filteredSessions } = useContext(FilterContext);
    const data = getSessionsByLanguage(filteredSessions);

    return (
        <div className="chart-container p-4 chart-animation">
            <h3 className="chart-title text-lg mb-3 text-center font-semibold text-slate-200">Top des langues</h3>
            <ResponsiveContainer width="100%" height={280}>
                <BarChart
                    data={data}
                    layout="horizontal"
                    margin={{ top: 10, right: 20, left: 15, bottom: 10 }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" />
                    <YAxis dataKey="langue" type="category" width={70} fontSize={11} />
                    <Tooltip
                        contentStyle={{
                            background: 'linear-gradient(135deg, rgba(30, 41, 59, 0.95), rgba(51, 65, 85, 0.9))',
                            border: '1px solid rgba(59, 130, 246, 0.5)',
                            borderRadius: '6px',
                            color: '#cbd5e1',
                            fontSize: '12px'
                        }}
                    />
                    <Bar dataKey="count" fill="url(#colorfulGradient)" radius={[0, 3, 3, 0]} />
                    <defs>
                        <linearGradient id="colorfulGradient" x1="0" y1="0" x2="1" y2="0">
                            <stop offset="0%" stopColor="#3b82f6" />
                            <stop offset="50%" stopColor="#10b981" />
                            <stop offset="100%" stopColor="#8b5cf6" />
                        </linearGradient>
                    </defs>
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default LanguagesChart;