import React from 'react';
import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Legend } from 'recharts';

const data = [
    { subject: 'Efficacité', A: 120, fullMark: 150 },
    { subject: 'Qualité IA', A: 98, fullMark: 150 },
    { subject: 'Vitesse', A: 86, fullMark: 150 },
    { subject: 'Satisfaction', A: 99, fullMark: 150 },
    { subject: 'Volume', A: 85, fullMark: 150 },
    { subject: 'Fiabilité', A: 65, fullMark: 150 },
];

/**
 * PerformanceRadar - Obsidian Analytics Radar Chart
 * Multi-dimensional performance analysis with violet accent
 */
const PerformanceRadar = () => {
    return (
        <div className="w-full h-full p-5 flex flex-col">
            {/* Header */}
            <div className="flex justify-between items-center mb-3">
                <div>
                    <h3 className="text-sm font-semibold text-white tracking-wide uppercase">
                        Performance Matrix
                    </h3>
                    <p className="text-xs text-zinc-500 mt-0.5">Analyse multi-dimensionnelle</p>
                </div>
                <span className="text-[10px] font-bold text-emerald-400 bg-emerald-400/10 px-2.5 py-1 rounded-lg border border-emerald-400/20">
                    OPTIMAL
                </span>
            </div>

            {/* Chart */}
            <div className="flex-1 -ml-4">
                <ResponsiveContainer width="100%" height="100%">
                    <RadarChart cx="50%" cy="50%" outerRadius="70%" data={data}>
                        <defs>
                            <linearGradient id="radarGradient" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="#a78bfa" stopOpacity={0.6} />
                                <stop offset="100%" stopColor="#a78bfa" stopOpacity={0.1} />
                            </linearGradient>
                        </defs>
                        <PolarGrid
                            stroke="rgba(63, 63, 70, 0.5)"
                            strokeDasharray="3 3"
                        />
                        <PolarAngleAxis
                            dataKey="subject"
                            tick={{ fill: '#71717a', fontSize: 10, fontFamily: 'Inter' }}
                        />
                        <PolarRadiusAxis
                            angle={30}
                            domain={[0, 150]}
                            tick={false}
                            axisLine={false}
                        />
                        <Radar
                            name="Performance"
                            dataKey="A"
                            stroke="#a78bfa"
                            strokeWidth={2}
                            fill="url(#radarGradient)"
                            style={{ filter: 'drop-shadow(0 0 8px rgba(167, 139, 250, 0.5))' }}
                        />
                    </RadarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default PerformanceRadar;
