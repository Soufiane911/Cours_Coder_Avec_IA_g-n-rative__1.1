import React, { useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

/**
 * SessionsEvolutionChart - CRM Style for Medical Intelligence
 * Visualizes the volume of medical sessions over time.
 */
const SessionsEvolutionChart = ({ data = [], onSelect, activeFilter }) => {
    const [activeIndex, setActiveIndex] = useState(null);

    // Transform data for display
    const chartData = data.map((d, idx) => {
        let label = '';
        let fullLabel = '';
        let rawKey = d.week || d.month || `P${idx + 1}`;

        if (d.week) {
            // week format: YYYY-MM-DD (Monday)
            const weekDate = new Date(d.week);
            const weekNumber = Math.ceil((weekDate.getDate() + 6) /     7); // Rough week in month
            // Better: use direct date if it's weekly
            label = d.week.split('-')[2]; // Day of month
            fullLabel = `Semaine du ${new Date(d.week).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' })}`;
        } else if (d.month) {
            label = d.month.split('-')[1];
            fullLabel = d.month;
        }

        return {
            name: label || `P${idx + 1}`,
            fullLabel,
            rawKey,
            sessions: d.count,
        };
    });

    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-[#1C1C24] border border-[#ffffff10] rounded-xl px-4 py-3 shadow-xl">
                    <p className="text-[10px] text-gray-400 uppercase mb-1 font-bold">{payload[0]?.payload?.fullLabel || label}</p>
                    <div className="flex items-baseline gap-2">
                        <span className="text-xl font-bold text-white">{payload[0]?.value}</span>
                        <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-widest">sessions</span>
                    </div>
                </div>
            );
        }
        return null;
    };

    const hasData = chartData.length > 0;

    return (
        <div className="w-full h-full p-6 flex flex-col">
            <div className="flex justify-between items-start mb-6">
                <div>
                    <h3 className="text-white font-bold text-base tracking-tight">Flux de Sessions Médicales</h3>
                    <p className="text-[11px] text-zinc-500 mt-0.5 font-medium">Évolution temporelle du volume d'interprétariat</p>
                </div>
                <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2 px-3 py-1 bg-cyan-500/10 rounded-full border border-cyan-500/20">
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
                        <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-widest">Volume Réel</span>
                    </div>
                </div>
            </div>

            <div className="flex-1 relative min-h-0">
                {!hasData ? (
                    <div className="absolute inset-0 flex items-center justify-center text-zinc-600 text-[10px] font-bold uppercase tracking-widest border border-white/5 border-dashed rounded-2xl">
                        Aucune donnée sur cette période
                    </div>
                ) : (
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart
                            data={chartData}
                            margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                            onClick={(e) => {
                                if (e && e.activePayload && onSelect) {
                                    onSelect(e.activePayload[0].payload.rawKey);
                                }
                            }}
                            className="cursor-pointer"
                        >
                            <defs>
                                <linearGradient id="sessionGradient" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#22D3EE" stopOpacity={0.3} />
                                    <stop offset="95%" stopColor="#22D3EE" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.02)" />
                            <XAxis
                                dataKey="name"
                                axisLine={false}
                                tickLine={false}
                                tick={{ fill: '#52525b', fontSize: 10, fontWeight: 600 }}
                                dy={10}
                            />
                            <YAxis
                                axisLine={false}
                                tickLine={false}
                                tick={{ fill: '#52525b', fontSize: 10 }}
                            />
                            <Tooltip content={<CustomTooltip />} cursor={{ stroke: '#22D3EE', strokeWidth: 1, strokeDasharray: '4 4' }} />
                            <Area
                                type="monotone"
                                dataKey="sessions"
                                stroke="#22D3EE"
                                strokeWidth={2}
                                fillOpacity={1}
                                fill="url(#sessionGradient)"
                                dot={(props) => {
                                    const { cx, cy, payload } = props;
                                    const isSelected = activeFilter === payload.rawKey;
                                    if (isSelected) {
                                        return (
                                            <circle key={`dot-${payload.rawKey}`} cx={cx} cy={cy} r={6} fill="#22D3EE" stroke="#fff" strokeWidth={2} />
                                        );
                                    }
                                    return <circle key={`dot-${payload.rawKey}`} cx={cx} cy={cy} r={3} fill="#22D3EE" stroke="#1C1C24" strokeWidth={1.5} />;
                                }}
                                activeDot={{ r: 6, fill: '#22D3EE', stroke: '#fff', strokeWidth: 2 }}
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                )}
            </div>
        </div>
    );
};

export default SessionsEvolutionChart;
