import { useContext } from 'react';
import { PieChart, Pie, Cell, ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import FilterContext from '../../context/FilterContext';
import { getQualityMetrics } from '../../utils/dataAggregations';

/**
 * Composant pour afficher les indicateurs qualité (gauge + scatter plot)
 */
const QualityChart = () => {
    const { filteredSessions } = useContext(FilterContext);
    const metrics = getQualityMetrics(filteredSessions);

    // Données pour le gauge (score moyen)
    const gaugeData = [
        { name: 'Score', value: metrics.avgScore * 100, fill: '#00C49F' },
        { name: 'Rest', value: 100 - (metrics.avgScore * 100), fill: '#F0F0F0' }
    ];

    return (
        <div className="chart-container p-4 chart-animation">
            <h3 className="chart-title text-lg mb-3 text-center font-semibold text-slate-200">Indicateurs qualité</h3>

            {/* Gauge pour le score moyen */}
            <div className="w-full h-40 mb-4">
                <h4 className="text-sm font-medium mb-2 text-slate-300">Score de qualité moyen</h4>
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={gaugeData}
                            cx="50%"
                            cy="50%"
                            startAngle={180}
                            endAngle={0}
                            innerRadius={35}
                            outerRadius={55}
                            paddingAngle={5}
                            dataKey="value"
                        >
                            <Cell fill="url(#gaugeGradient)" />
                            <Cell fill="rgba(71, 85, 105, 0.3)" />
                        </Pie>
                        <text x="50%" y="50%" textAnchor="middle" dominantBaseline="middle" fontSize="14" fontWeight="bold" fill="#cbd5e1">
                            {`${(metrics.avgScore * 100).toFixed(1)}%`}
                        </text>
                        <defs>
                            <linearGradient id="gaugeGradient" x1="0" y1="0" x2="1" y2="1">
                                <stop offset="0%" stopColor="#10b981" />
                                <stop offset="100%" stopColor="#34d399" />
                            </linearGradient>
                        </defs>
                    </PieChart>
                </ResponsiveContainer>
            </div>

            {/* Scatter plot pour corrélation durée vs qualité */}
            <div className="w-full h-48">
                <h4 className="text-sm font-medium mb-2 text-slate-300">Corrélation durée vs qualité</h4>
                <ResponsiveContainer width="100%" height="100%">
                    <ScatterChart
                        margin={{ top: 15, right: 15, bottom: 15, left: 15 }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis type="number" dataKey="duree" name="Durée (min)" fontSize={10} />
                        <YAxis type="number" dataKey="qualite" name="Qualité" domain={[0, 1]} fontSize={10} />
                        <Tooltip
                            contentStyle={{
                                background: 'linear-gradient(135deg, rgba(30, 41, 59, 0.95), rgba(51, 65, 85, 0.9))',
                                border: '1px solid rgba(59, 130, 246, 0.5)',
                                borderRadius: '6px',
                                color: '#cbd5e1',
                                fontSize: '12px'
                            }}
                            cursor={{ strokeDasharray: '3 3' }}
                        />
                        <Scatter name="Sessions" data={metrics.correlation} fill="#f97316" />
                    </ScatterChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default QualityChart;