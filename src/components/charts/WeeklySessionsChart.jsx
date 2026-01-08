import { useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useFilters } from '../../context/FilterContext';

const WeeklySessionsChart = () => {
    const { filteredSessions } = useFilters();

    const chartData = useMemo(() => {
        const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
        const dayCount = { Mon: 0, Tue: 0, Wed: 0, Thu: 0, Fri: 0, Sat: 0, Sun: 0 };

        filteredSessions.forEach(session => {
            const date = new Date(session.date);
            const dayIndex = date.getDay();
            // Convert Sunday (0) to last position, adjust Monday (1) to first
            const dayName = days[dayIndex === 0 ? 6 : dayIndex - 1];
            dayCount[dayName] += 1;
        });

        return days.map(day => ({
            day,
            sessions: dayCount[day]
        }));
    }, [filteredSessions]);

    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-zinc-900/95 backdrop-blur-xl border border-zinc-700/50 rounded-xl p-3 shadow-2xl">
                    <p className="text-sm font-semibold text-white">{label}</p>
                    <p className="text-xs text-zinc-400 mt-1">
                        {payload[0].value} sessions
                    </p>
                </div>
            );
        }
        return null;
    };

    return (
        <div className="h-full flex flex-col">
            {/* Header */}
            <h3 className="text-sm font-semibold text-white mb-4">Number of Sessions / Week Day</h3>

            {/* Chart */}
            <div className="flex-1 min-h-0">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                        data={chartData}
                        margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                        barCategoryGap="20%"
                    >
                        <defs>
                            <linearGradient id="barGradientCyan" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="#22d3ee" stopOpacity={1} />
                                <stop offset="100%" stopColor="#22d3ee" stopOpacity={0.4} />
                            </linearGradient>
                            <linearGradient id="barGradientViolet" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="#a78bfa" stopOpacity={1} />
                                <stop offset="100%" stopColor="#a78bfa" stopOpacity={0.4} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid
                            strokeDasharray="3 3"
                            stroke="rgba(255,255,255,0.05)"
                            vertical={false}
                        />
                        <XAxis
                            dataKey="day"
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: '#71717a', fontSize: 10 }}
                            dy={5}
                        />
                        <YAxis
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: '#71717a', fontSize: 10 }}
                        />
                        <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(255,255,255,0.02)' }} />
                        <Bar
                            dataKey="sessions"
                            radius={[4, 4, 0, 0]}
                            fill="url(#barGradientCyan)"
                            style={{
                                filter: 'drop-shadow(0 0 8px rgba(34, 211, 238, 0.3))'
                            }}
                        />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default WeeklySessionsChart;
