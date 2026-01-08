import React, { useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

/**
 * TicketsEvolutionChart - Interactive area chart with real data
 */
const TicketsEvolutionChart = ({ data = [] }) => {
    const [activeIndex, setActiveIndex] = useState(null);

    // Transform data for display
    const chartData = data.map((d, idx) => ({
        name: d.month ? d.month.split('-')[1] : `M${idx + 1}`,
        fullMonth: d.month,
        sessions: d.count,
        trend: Math.round(d.count * 0.7) // Simulated secondary line
    }));

    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-[#1C1C24] border border-[#ffffff10] rounded-xl px-4 py-3 shadow-xl">
                    <p className="text-[10px] text-gray-500 uppercase mb-1">{payload[0]?.payload?.fullMonth || label}</p>
                    <div className="flex items-baseline gap-2">
                        <span className="text-lg font-bold text-white">{payload[0]?.value}</span>
                        <span className="text-xs text-cyan-400">sessions</span>
                    </div>
                </div>
            );
        }
        return null;
    };

    return (
        <div className="w-full h-full p-6 flex flex-col">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h3 className="text-white font-bold text-sm">Sessions Evolution</h3>
                    <p className="text-[10px] text-gray-500 mt-1">Monthly session count over time</p>
                </div>
                <div className="flex gap-4 text-xs font-medium text-gray-400">
                    <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-[#22D3EE]"></span>
                        Sessions
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-[#8F48F8]"></span>
                        Trend
                    </div>
                </div>
            </div>

            <div className="flex-1 relative">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                        data={chartData}
                        margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                        onMouseMove={(e) => {
                            if (e.activeTooltipIndex !== undefined) {
                                setActiveIndex(e.activeTooltipIndex);
                            }
                        }}
                        onMouseLeave={() => setActiveIndex(null)}
                    >
                        <defs>
                            <linearGradient id="colorSessions" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#22D3EE" stopOpacity={0.4} />
                                <stop offset="95%" stopColor="#22D3EE" stopOpacity={0} />
                            </linearGradient>
                            <linearGradient id="colorTrend" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#8F48F8" stopOpacity={0.3} />
                                <stop offset="95%" stopColor="#8F48F8" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={true} stroke="rgba(255,255,255,0.03)" />
                        <XAxis
                            dataKey="name"
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: '#6B7280', fontSize: 10 }}
                            dy={10}
                        />
                        <YAxis
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: '#6B7280', fontSize: 10 }}
                        />
                        <Tooltip content={<CustomTooltip />} cursor={{ stroke: '#22D3EE', strokeWidth: 1, strokeDasharray: '4 4' }} />
                        <Area
                            type="monotone"
                            dataKey="sessions"
                            stroke="#22D3EE"
                            strokeWidth={2.5}
                            fillOpacity={1}
                            fill="url(#colorSessions)"
                            dot={false}
                            activeDot={{ r: 6, fill: '#22D3EE', stroke: '#1C1C24', strokeWidth: 3 }}
                        />
                        <Area
                            type="monotone"
                            dataKey="trend"
                            stroke="#CF57D3"
                            strokeWidth={2}
                            strokeDasharray="4 4"
                            fillOpacity={1}
                            fill="url(#colorTrend)"
                            dot={false}
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default TicketsEvolutionChart;
