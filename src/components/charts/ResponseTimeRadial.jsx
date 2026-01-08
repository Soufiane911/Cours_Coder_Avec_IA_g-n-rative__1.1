import { useMemo } from 'react';
import { RadialBarChart, RadialBar, ResponsiveContainer, PolarAngleAxis } from 'recharts';
import { useFilters } from '../../context/FilterContext';

const ResponseTimeRadial = () => {
    const { filteredSessions } = useFilters();

    const stats = useMemo(() => {
        if (filteredSessions.length === 0) {
            return { avgDuration: 0, avgQuality: 0 };
        }

        const avgDuration = filteredSessions.reduce((sum, s) => sum + s.duree_minutes, 0) / filteredSessions.length;
        const avgQuality = (filteredSessions.reduce((sum, s) => sum + s.qualite_score, 0) / filteredSessions.length) * 100;

        return {
            avgDuration: Math.round(avgDuration * 10) / 10,
            avgQuality: Math.round(avgQuality)
        };
    }, [filteredSessions]);

    // Convert duration to a percentage (assuming 30 min is max/100%)
    const durationPercentage = Math.min((stats.avgDuration / 30) * 100, 100);

    const chartData = [
        {
            name: 'Duration',
            value: durationPercentage,
            fill: '#a78bfa'
        }
    ];

    return (
        <div className="h-full flex flex-col">
            {/* Header */}
            <h3 className="text-sm font-semibold text-white mb-2">First Reply and Full Resolve Time</h3>

            <div className="flex-1 flex items-center justify-center relative">
                {/* Radial Chart */}
                <div className="w-full h-full min-h-[140px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <RadialBarChart
                            cx="50%"
                            cy="50%"
                            innerRadius="60%"
                            outerRadius="90%"
                            barSize={12}
                            data={chartData}
                            startAngle={180}
                            endAngle={0}
                        >
                            <PolarAngleAxis
                                type="number"
                                domain={[0, 100]}
                                angleAxisId={0}
                                tick={false}
                            />
                            <RadialBar
                                background={{ fill: 'rgba(255,255,255,0.05)' }}
                                clockWise
                                dataKey="value"
                                cornerRadius={10}
                            />
                        </RadialBarChart>
                    </ResponsiveContainer>
                </div>

                {/* Center content */}
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                    <span className="text-2xl font-bold text-violet-400">
                        {stats.avgDuration}
                    </span>
                    <span className="text-[10px] text-zinc-500 uppercase tracking-wider">
                        hours
                    </span>
                </div>

                {/* Decorative element */}
                <div className="absolute bottom-2 right-2">
                    <div className="w-6 h-6 rounded-full bg-violet-500/20 flex items-center justify-center">
                        <div className="w-3 h-3 rounded-full bg-violet-400" />
                    </div>
                </div>
            </div>

            {/* View full statement link */}
            <button className="text-xs text-cyan-400 hover:text-cyan-300 transition-colors mt-2 self-start">
                View full statement
            </button>
        </div>
    );
};

export default ResponseTimeRadial;
