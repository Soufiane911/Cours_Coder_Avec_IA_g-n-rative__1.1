import { useMemo } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { useFilters } from '../../context/FilterContext';

const SessionsByServiceDonut = () => {
    const { filteredSessions } = useFilters();

    const chartData = useMemo(() => {
        const serviceCount = {};

        filteredSessions.forEach(session => {
            serviceCount[session.service] = (serviceCount[session.service] || 0) + 1;
        });

        return Object.entries(serviceCount)
            .map(([name, value]) => ({ name, value }))
            .sort((a, b) => b.value - a.value)
            .slice(0, 5);
    }, [filteredSessions]);

    const COLORS = ['#22d3ee', '#a78bfa', '#fb7185', '#fbbf24', '#34d399'];

    const CustomTooltip = ({ active, payload }) => {
        if (active && payload && payload.length) {
            const data = payload[0].payload;
            const total = chartData.reduce((sum, item) => sum + item.value, 0);
            const percentage = ((data.value / total) * 100).toFixed(1);

            return (
                <div className="bg-zinc-900/95 backdrop-blur-xl border border-zinc-700/50 rounded-xl p-3 shadow-2xl">
                    <p className="text-sm font-semibold text-white">{data.name}</p>
                    <p className="text-xs text-zinc-400 mt-1">
                        {data.value} sessions ({percentage}%)
                    </p>
                </div>
            );
        }
        return null;
    };

    return (
        <div className="h-full flex flex-col">
            {/* Header */}
            <h3 className="text-sm font-semibold text-white mb-4">Sessions By Service</h3>

            <div className="flex-1 flex items-center gap-4">
                {/* Chart */}
                <div className="w-1/2 h-full min-h-[160px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={chartData}
                                cx="50%"
                                cy="50%"
                                innerRadius={40}
                                outerRadius={65}
                                paddingAngle={3}
                                dataKey="value"
                                stroke="none"
                            >
                                {chartData.map((entry, index) => (
                                    <Cell
                                        key={`cell-${index}`}
                                        fill={COLORS[index % COLORS.length]}
                                        style={{
                                            filter: `drop-shadow(0 0 6px ${COLORS[index % COLORS.length]}40)`
                                        }}
                                    />
                                ))}
                            </Pie>
                            <Tooltip content={<CustomTooltip />} />
                        </PieChart>
                    </ResponsiveContainer>
                </div>

                {/* Legend */}
                <div className="w-1/2 space-y-2">
                    {chartData.map((item, index) => (
                        <div key={item.name} className="flex items-center gap-2">
                            <div
                                className="w-2 h-2 rounded-full"
                                style={{ backgroundColor: COLORS[index] }}
                            />
                            <span className="text-xs text-zinc-400 truncate">{item.name}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default SessionsByServiceDonut;
