import { useMemo } from 'react';
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Legend
} from 'recharts';
import { useFilters } from '../../context/FilterContext';

const SessionsLineChart = () => {
    const { filteredSessions } = useFilters();

    const chartData = useMemo(() => {
        // Group sessions by month
        const monthlyData = {};
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

        filteredSessions.forEach(session => {
            const date = new Date(session.date);
            const monthKey = months[date.getMonth()];

            if (!monthlyData[monthKey]) {
                monthlyData[monthKey] = {
                    month: monthKey,
                    sessionsCreated: 0,
                    sessionsCompleted: 0
                };
            }

            monthlyData[monthKey].sessionsCreated += 1;
            // Sessions with high quality score (>= 0.85) are considered "completed successfully"
            if (session.qualite_score >= 0.85) {
                monthlyData[monthKey].sessionsCompleted += 1;
            }
        });

        return Object.values(monthlyData);
    }, [filteredSessions]);

    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-zinc-900/95 backdrop-blur-xl border border-zinc-700/50 rounded-xl p-4 shadow-2xl">
                    <p className="text-sm font-semibold text-white mb-2">{label}</p>
                    {payload.map((entry, index) => (
                        <div key={index} className="flex items-center gap-2 text-sm">
                            <div
                                className="w-2 h-2 rounded-full"
                                style={{ backgroundColor: entry.color }}
                            />
                            <span className="text-zinc-400">{entry.name}:</span>
                            <span className="font-semibold text-white">{entry.value}</span>
                        </div>
                    ))}
                </div>
            );
        }
        return null;
    };

    // Find max value for the reference annotation
    const maxData = chartData.reduce((max, item) =>
        item.sessionsCreated > max.sessionsCreated ? item : max
        , chartData[0] || { sessionsCreated: 0, month: '' });

    return (
        <div className="h-full flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
                <div>
                    <h3 className="text-sm font-semibold text-white">Sessions Created vs Sessions Completed</h3>
                    <p className="text-xs text-zinc-500 mt-0.5">Monthly overview</p>
                </div>
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-0.5 bg-violet-400 rounded" />
                        <span className="text-xs text-zinc-400">Sessions Completed</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-0.5 bg-cyan-400 rounded" />
                        <span className="text-xs text-zinc-400">Sessions Created</span>
                    </div>
                </div>
            </div>

            {/* Chart */}
            <div className="flex-1 min-h-0">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                        data={chartData}
                        margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
                    >
                        <defs>
                            <linearGradient id="colorCreated" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#22d3ee" stopOpacity={0.3} />
                                <stop offset="95%" stopColor="#22d3ee" stopOpacity={0} />
                            </linearGradient>
                            <linearGradient id="colorCompleted" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#a78bfa" stopOpacity={0.3} />
                                <stop offset="95%" stopColor="#a78bfa" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid
                            strokeDasharray="3 3"
                            stroke="rgba(255,255,255,0.05)"
                            vertical={false}
                        />
                        <XAxis
                            dataKey="month"
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: '#71717a', fontSize: 11 }}
                            dy={10}
                        />
                        <YAxis
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: '#71717a', fontSize: 11 }}
                            dx={-10}
                        />
                        <Tooltip content={<CustomTooltip />} />

                        <Area
                            type="monotone"
                            dataKey="sessionsCompleted"
                            name="Sessions Completed"
                            stroke="#a78bfa"
                            strokeWidth={2}
                            fillOpacity={1}
                            fill="url(#colorCompleted)"
                        />
                        <Area
                            type="monotone"
                            dataKey="sessionsCreated"
                            name="Sessions Created"
                            stroke="#22d3ee"
                            strokeWidth={2}
                            fillOpacity={1}
                            fill="url(#colorCreated)"
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>

            {/* Max annotation badge */}
            {maxData && maxData.month && (
                <div className="absolute top-16 right-8">
                    <div className="bg-cyan-500/10 border border-cyan-500/30 rounded-lg px-3 py-1.5">
                        <span className="text-xs text-cyan-400 font-medium">
                            Max = {maxData.sessionsCreated}
                        </span>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SessionsLineChart;
