import React from 'react';
import { BarChart, Bar, XAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

/**
 * RatingsChart - CRM Style for Medical Intelligence
 * Distribution of practitioner satisfaction ratings.
 */
const RatingsChart = ({ data = [] }) => {
    // data is { avg, distribution }
    const chartData = (data.distribution || []).map(d => ({
        name: d.note,
        value: d.count
    }));

    const CustomTooltip = ({ active, payload }) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-[#1C1C24] border border-[#ffffff10] rounded-lg px-3 py-1.5 shadow-xl">
                    <span className="text-sm font-bold text-white">{payload[0].value} <span className="text-[10px] text-gray-500 font-medium">avis ({payload[0].payload.name}★)</span></span>
                </div>
            );
        }
        return null;
    };

    return (
        <div className="w-full h-full p-6 flex flex-col">
            <div className="flex justify-between items-center mb-6">
                <h3 className="text-white font-bold text-sm tracking-tight">Satisfaction Praticiens</h3>
                <div className="flex items-center gap-1.5 px-2 py-1 bg-[#fbbf24]/10 rounded border border-[#fbbf24]/20">
                    <span className="text-[10px] font-bold text-[#fbbf24] tracking-wider uppercase">Distribution</span>
                </div>
            </div>

            <div className="flex-1">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={chartData} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                        <XAxis
                            dataKey="name"
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: '#6B7280', fontSize: 10 }}
                            dy={5}
                        />
                        <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(255,255,255,0.02)' }} />
                        <Bar dataKey="value" radius={[4, 4, 4, 4]} barSize={20}>
                            {chartData.map((entry, index) => {
                                // Highlight high ratings
                                const color = parseFloat(entry.name) >= 4 ? '#fbbf24' : '#6B7280';
                                return <Cell key={`cell-${index}`} fill={color} fillOpacity={0.8} />;
                            })}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>

            <div className="mt-4 pt-3 border-t border-white/5 flex justify-between items-center">
                <span className="text-[10px] text-gray-500">Moyenne pondérée</span>
                <span className="text-xs font-bold text-white">{data.avg?.toFixed(2) || '0.00'}/5.0</span>
            </div>
        </div>
    );
};

export default RatingsChart;
