import { useContext } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import FilterContext from '../../context/FilterContext';
import { getSessionsByService } from '../../utils/dataAggregations';

// Palette de couleurs moderne et variée pour le pie chart
const COLORS = [
    'url(#colorGradient1)', // Bleu
    'url(#colorGradient2)', // Vert
    'url(#colorGradient3)', // Violet
    'url(#colorGradient4)', // Orange
    'url(#colorGradient5)', // Rose
    'url(#colorGradient6)'  // Turquoise
];

/**
 * Composant pour afficher la répartition par service (pie chart)
 */
const ServicesChart = () => {
    const { filteredSessions } = useContext(FilterContext);
    const data = getSessionsByService(filteredSessions);

    return (
        <div className="chart-container p-4 chart-animation">
            <h3 className="chart-title text-lg mb-3 text-center font-semibold text-slate-200">Répartition par service</h3>
            <ResponsiveContainer width="100%" height={280}>
                <PieChart>
                    <Pie
                        data={data}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ service, percentage }) => `${service}: ${percentage}%`}
                        outerRadius={70}
                        fill="#8884d8"
                        dataKey="count"
                    >
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <Tooltip
                        contentStyle={{
                            background: 'linear-gradient(135deg, rgba(30, 41, 59, 0.95), rgba(51, 65, 85, 0.9))',
                            border: '1px solid rgba(59, 130, 246, 0.5)',
                            borderRadius: '6px',
                            color: '#cbd5e1',
                            fontSize: '12px'
                        }}
                    />
                    <Legend
                        wrapperStyle={{ paddingTop: '10px', fontSize: '12px' }}
                        iconType="circle"
                    />
                    <defs>
                        <linearGradient id="colorGradient1" x1="0" y1="0" x2="1" y2="1">
                            <stop offset="0%" stopColor="#3b82f6" />
                            <stop offset="100%" stopColor="#60a5fa" />
                        </linearGradient>
                        <linearGradient id="colorGradient2" x1="0" y1="0" x2="1" y2="1">
                            <stop offset="0%" stopColor="#10b981" />
                            <stop offset="100%" stopColor="#34d399" />
                        </linearGradient>
                        <linearGradient id="colorGradient3" x1="0" y1="0" x2="1" y2="1">
                            <stop offset="0%" stopColor="#8b5cf6" />
                            <stop offset="100%" stopColor="#a78bfa" />
                        </linearGradient>
                        <linearGradient id="colorGradient4" x1="0" y1="0" x2="1" y2="1">
                            <stop offset="0%" stopColor="#f97316" />
                            <stop offset="100%" stopColor="#fb923c" />
                        </linearGradient>
                        <linearGradient id="colorGradient5" x1="0" y1="0" x2="1" y2="1">
                            <stop offset="0%" stopColor="#ec4899" />
                            <stop offset="100%" stopColor="#f472b6" />
                        </linearGradient>
                        <linearGradient id="colorGradient6" x1="0" y1="0" x2="1" y2="1">
                            <stop offset="0%" stopColor="#06b6d4" />
                            <stop offset="100%" stopColor="#22d3ee" />
                        </linearGradient>
                    </defs>
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
};

export default ServicesChart;