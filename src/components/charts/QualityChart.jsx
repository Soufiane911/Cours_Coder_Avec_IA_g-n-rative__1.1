import { useContext } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import FilterContext from '../../context/FilterContext';
import { getQualityMetrics } from '../../utils/dataAggregations';

/**
 * QualityChart - Obsidian Analytics Gauge
 * Semi-circular gauge with emerald glow
 */
const QualityChart = () => {
    const { filteredSessions } = useContext(FilterContext);
    const metrics = getQualityMetrics(filteredSessions);
    const scoreValue = metrics.avgScore * 100;

    const data = [
        { name: 'Score', value: scoreValue },
        { name: 'Rest', value: 100 - scoreValue }
    ];

    // Determine status based on score
    const getStatus = (score) => {
        if (score >= 90) return { label: 'EXCELLENT', color: 'emerald' };
        if (score >= 70) return { label: 'BON', color: 'cyan' };
        if (score >= 50) return { label: 'MOYEN', color: 'amber' };
        return { label: 'FAIBLE', color: 'rose' };
    };

    const status = getStatus(scoreValue);

    return (
        <div className="w-full h-full p-6 flex flex-col">
            {/* Header */}
            <div className="mb-2">
                <h3 className="text-sm font-semibold text-white tracking-wide uppercase">
                    Indice Qualité IA
                </h3>
                <p className="text-xs text-zinc-500 mt-0.5">Précision algorithmique</p>
            </div>

            {/* Gauge */}
            <div className="flex-1 relative flex items-center justify-center">
                <div className="w-full h-full max-w-[280px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <defs>
                                <linearGradient id="gaugeGradient" x1="0" y1="0" x2="1" y2="0">
                                    <stop offset="0%" stopColor="#34d399" />
                                    <stop offset="100%" stopColor="#22d3ee" />
                                </linearGradient>
                            </defs>
                            <Pie
                                data={data}
                                cx="50%"
                                cy="70%"
                                startAngle={180}
                                endAngle={0}
                                innerRadius="60%"
                                outerRadius="90%"
                                paddingAngle={0}
                                dataKey="value"
                                stroke="none"
                            >
                                <Cell
                                    fill="url(#gaugeGradient)"
                                    style={{ filter: 'drop-shadow(0 0 12px rgba(52, 211, 153, 0.5))' }}
                                />
                                <Cell fill="rgba(39, 39, 42, 0.8)" />
                            </Pie>
                        </PieChart>
                    </ResponsiveContainer>
                </div>

                {/* Center Value */}
                <div className="absolute inset-0 flex flex-col items-center justify-center pt-6">
                    <span className="text-4xl font-bold text-white font-mono tracking-tight">
                        {scoreValue.toFixed(1)}%
                    </span>
                    <span className={`
                        text-[10px] font-bold uppercase tracking-wider mt-2 px-3 py-1 rounded-full
                        ${status.color === 'emerald' ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30' : ''}
                        ${status.color === 'cyan' ? 'bg-cyan-500/15 text-cyan-400 border border-cyan-500/30' : ''}
                        ${status.color === 'amber' ? 'bg-amber-500/15 text-amber-400 border border-amber-500/30' : ''}
                        ${status.color === 'rose' ? 'bg-rose-500/15 text-rose-400 border border-rose-500/30' : ''}
                    `}>
                        {status.label}
                    </span>
                </div>
            </div>
        </div>
    );
};

export default QualityChart;
