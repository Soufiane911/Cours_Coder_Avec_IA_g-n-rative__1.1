import { useContext } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import FilterContext from '../../context/FilterContext';
import { getInteractionStats } from '../../utils/dataAggregations';

/**
 * Composant pour afficher les interactions patient/praticien (stacked bar chart)
 */
const InteractionsChart = () => {
    const { filteredSessions } = useContext(FilterContext);
    const data = getInteractionStats(filteredSessions);

    return (
        <div className="chart-container p-4 chart-animation">
            <h3 className="chart-title text-lg mb-3 text-center font-semibold text-slate-200">Interactions patient/praticien</h3>
            <ResponsiveContainer width="100%" height={280}>
                <BarChart
                    data={data}
                    margin={{ top: 10, right: 20, left: 15, bottom: 10 }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="service" fontSize={11} />
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
                    <Legend wrapperStyle={{ paddingTop: '5px', fontSize: '12px' }} />
                    <Bar dataKey="patient" stackId="a" fill="url(#patientGradient)" radius={[0, 0, 0, 0]} name="Patient" />
                    <Bar dataKey="praticien" stackId="a" fill="url(#praticienGradient)" radius={[3, 3, 0, 0]} name="Praticien" />
                    <defs>
                        <linearGradient id="patientGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#ec4899" />
                            <stop offset="100%" stopColor="#f472b6" />
                        </linearGradient>
                        <linearGradient id="praticienGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#f97316" />
                            <stop offset="100%" stopColor="#fb923c" />
                        </linearGradient>
                    </defs>
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default InteractionsChart;