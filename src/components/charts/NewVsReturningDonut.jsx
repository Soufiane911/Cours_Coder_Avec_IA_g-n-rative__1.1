import { useMemo } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { useFilters } from '../../context/FilterContext';

const NewVsReturningDonut = () => {
    const { filteredSessions } = useFilters();

    const chartData = useMemo(() => {
        // Simulate new vs returning based on quality score
        // High quality (>0.9) = returning patients (familiar with system)
        // Lower quality = new patients (learning the system)
        const newSessions = filteredSessions.filter(s => s.qualite_score < 0.9).length;
        const returningSessions = filteredSessions.length - newSessions;

        return [
            { name: 'Returning Sessions', value: returningSessions, color: '#22d3ee' },
            { name: 'New Sessions', value: newSessions, color: '#a78bfa' }
        ];
    }, [filteredSessions]);

    const total = chartData.reduce((sum, item) => sum + item.value, 0);

    const CustomTooltip = ({ active, payload }) => {
        if (active && payload && payload.length) {
            const data = payload[0].payload;
            const percentage = ((data.value / total) * 100).toFixed(1);

            return (
                <div className="bg-zinc-900/95 backdrop-blur-xl border border-zinc-700/50 rounded-xl p-3 shadow-2xl">
                    <p className="text-sm font-semibold text-white">{data.name}</p>
                    <p className="text-xs text-zinc-400 mt-1">
                        {data.value} ({percentage}%)
                    </p>
                </div>
            );
        }
        return null;
    };

    return (
        <div className="h-full flex flex-col">
            {/* Header */}
            <h3 className="text-sm font-semibold text-white mb-4">New Sessions vs Returning Sessions</h3>

            <div className="flex-1 flex items-center">
                {/* Chart with center text */}
                <div className="relative w-2/3 h-full min-h-[160px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={chartData}
                                cx="50%"
                                cy="50%"
                                innerRadius={45}
                                outerRadius={70}
                                paddingAngle={2}
                                dataKey="value"
                                stroke="none"
                                startAngle={90}
                                endAngle={-270}
                            >
                                {chartData.map((entry, index) => (
                                    <Cell
                                        key={`cell-${index}`}
                                        fill={entry.color}
                                        style={{
                                            filter: `drop-shadow(0 0 8px ${entry.color}50)`
                                        }}
                                    />
                                ))}
                            </Pie>
                            <Tooltip content={<CustomTooltip />} />
                        </PieChart>
                    </ResponsiveContainer>

                    {/* Center text */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                        <span className="text-xs text-zinc-500">Returning</span>
                        <span className="text-lg font-bold text-cyan-400">
                            {chartData[0]?.value?.toLocaleString() || 0}
                        </span>
                    </div>
                </div>

                {/* Legend with percentages */}
                <div className="w-1/3 space-y-3">
                    {chartData.map((item) => {
                        const percentage = ((item.value / total) * 100).toFixed(1);
                        return (
                            <div key={item.name} className="flex items-center gap-2">
                                <div
                                    className="w-3 h-3 rounded-full"
                                    style={{ backgroundColor: item.color }}
                                />
                                <div className="flex flex-col">
                                    <span className="text-[10px] text-zinc-500 uppercase tracking-wider">
                                        {percentage}%
                                    </span>
                                    <span className="text-xs text-zinc-300">
                                        {item.name.split(' ')[0]}
                                    </span>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default NewVsReturningDonut;
