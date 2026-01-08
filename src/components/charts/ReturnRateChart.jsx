import React from 'react';
import { RadialBarChart, RadialBar, ResponsiveContainer, PolarAngleAxis } from 'recharts';

/**
 * ReturnRateChart (Reused as Quality Gauge) - CRM Style
 * Visualizes the average AI quality score (IA Accuracy).
 */
const ReturnRateChart = ({ score = 0, totalSessions = 0 }) => {
    // Score is 0-100 (percentage)
    const data = [
        { name: 'Quality', value: score, fill: '#CF57D3' },
    ];

    return (
        <div className="w-full h-full p-6 flex flex-col">
            <h3 className="text-white font-bold text-sm mb-1">Indice de Qualité IA</h3>
            <p className="text-[10px] text-gray-500 mb-6">Précision de reconnaissance audio</p>

            <div className="flex-1 flex items-center justify-between">
                <div className="relative w-[130px] h-[130px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <RadialBarChart
                            innerRadius="75%"
                            outerRadius="100%"
                            barSize={12}
                            data={data}
                            startAngle={225}
                            endAngle={-45}
                        >
                            <PolarAngleAxis
                                type="number"
                                domain={[0, 100]}
                                angleAxisId={0}
                                tick={false}
                            />
                            <RadialBar
                                background={{ fill: '#2A2A35' }}
                                clockWise
                                dataKey="value"
                                cornerRadius={10}
                            />
                        </RadialBarChart>
                    </ResponsiveContainer>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className="text-3xl font-bold text-white tracking-tighter">{score}%</span>
                        <span className="text-[9px] text-[#CF57D3] font-bold uppercase tracking-widest">Score IA</span>
                    </div>
                </div>

                <div className="flex flex-col gap-5 pl-4 flex-1">
                    <div className="flex flex-col">
                        <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">Sessions</span>
                        <span className="text-xl font-bold text-white">{totalSessions}</span>
                    </div>
                    <div className="h-px bg-white/5 w-full"></div>
                    <div className="flex flex-col">
                        <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">Statut</span>
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)]"></div>
                            <span className="text-xs font-bold text-green-500">OPTIMAL</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ReturnRateChart;
