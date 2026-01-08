import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

/**
 * LanguagesChart - CRM Style for Medical Intelligence
 * Horizontal bar chart for linguistic analysis.
 */
const LanguagesChart = ({ data = [] }) => {
    const [activeIndex, setActiveIndex] = useState(null);

    // Take top 5 languages
    const chartData = data.slice(0, 5).map(d => ({
        name: d.langue,
        value: d.count
    }));

    const maxValue = Math.max(...chartData.map(d => d.value), 1);

    const CustomTooltip = ({ active, payload }) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-[#1C1C24] border border-[#ffffff10] rounded-xl px-3 py-2 shadow-xl">
                    <p className="text-[10px] text-gray-400 uppercase font-bold">{payload[0].payload.name}</p>
                    <p className="text-sm font-bold text-white">{payload[0].value} <span className="text-[10px] text-gray-500 font-medium">sessions</span></p>
                </div>
            );
        }
        return null;
    };

    return (
        <div className="w-full h-full p-6 flex flex-col">
            <div className="flex justify-between items-start mb-4">
                <div>
                    <h3 className="text-white font-bold text-sm tracking-tight">Analyse Linguistique</h3>
                    <p className="text-[10px] text-gray-500 mt-0.5">Top 5 des langues sollicitées</p>
                </div>
                <div className="text-[10px] font-bold text-gray-500 uppercase tracking-widest px-2 py-1 bg-white/5 rounded">
                    Global
                </div>
            </div>

            <div className="flex-1 min-h-0">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                        layout="vertical"
                        data={chartData}
                        margin={{ top: 5, right: 30, left: 10, bottom: 5 }}
                        onMouseMove={(state) => {
                            if (state.activeTooltipIndex !== undefined) {
                                setActiveIndex(state.activeTooltipIndex);
                            }
                        }}
                        onMouseLeave={() => setActiveIndex(null)}
                    >
                        <XAxis type="number" hide />
                        <YAxis
                            type="category"
                            dataKey="name"
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: '#fff', fontSize: 11, fontWeight: 600 }}
                            width={80}
                        />
                        <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(255,255,255,0.02)' }} />
                        <Bar
                            dataKey="value"
                            radius={[0, 4, 4, 0]}
                            barSize={18}
                        >
                            {chartData.map((entry, index) => {
                                const opacity = activeIndex === null || activeIndex === index ? 1 : 0.3;
                                return (
                                    <Cell
                                        key={`cell-${index}`}
                                        fill={index % 2 === 0 ? '#22D3EE' : '#8F48F8'}
                                        fillOpacity={opacity}
                                        style={{ transition: 'fill-opacity 0.3s ease' }}
                                    />
                                );
                            })}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>

            {/* Legend / Info */}
            <div className="mt-4 flex justify-between items-center text-[10px] text-gray-500">
                <span>Volume total par idiome</span>
                <span className="text-gray-400 italic">Trié par fréquence</span>
            </div>
        </div>
    );
};

export default LanguagesChart;
