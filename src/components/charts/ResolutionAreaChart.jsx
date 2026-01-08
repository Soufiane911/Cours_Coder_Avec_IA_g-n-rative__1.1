import React from 'react';
import { AreaChart, Area, ResponsiveContainer, XAxis, Tooltip } from 'recharts';

/**
 * ResolutionAreaChart - Small sparkline with duration data
 */
const ResolutionAreaChart = ({ avgDuration = 0 }) => {
    // Generate sparkline data based on average
    const generateSparkline = (avg) => {
        const points = 12;
        return Array.from({ length: points }, (_, i) => ({
            name: i + 1,
            value: Math.max(5, avg + (Math.random() - 0.5) * avg * 0.4)
        }));
    };

    const data = generateSparkline(avgDuration);
    const avgHours = Math.floor(avgDuration / 60);
    const avgMinutes = Math.round(avgDuration % 60);

    return (
        <div className="w-full h-full p-6 flex flex-col justify-between">
            <div>
                <h3 className="text-white font-bold text-sm mb-1">Avg Session Duration</h3>
                <div className="flex items-center gap-2 mt-2">
                    <span className="text-[10px] text-gray-400">Average</span>
                    <div className="bg-[#2A2A35] px-3 py-1 rounded-lg text-sm text-[#22D3EE] font-bold">
                        {avgHours}h {avgMinutes}min
                    </div>
                </div>
            </div>

            <div className="flex-1 min-h-[80px] mt-4">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={data} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
                        <defs>
                            <linearGradient id="durationGradient" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.6} />
                                <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <XAxis dataKey="name" hide />
                        <Tooltip
                            contentStyle={{
                                backgroundColor: '#1C1C24',
                                border: '1px solid #ffffff10',
                                borderRadius: '8px',
                                fontSize: '11px'
                            }}
                            formatter={(value) => [`${Math.round(value)} min`, 'Duration']}
                        />
                        <Area
                            type="monotone"
                            dataKey="value"
                            stroke="#3B82F6"
                            strokeWidth={2}
                            fill="url(#durationGradient)"
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>

            <div className="mt-2 pt-3 border-t border-[#ffffff05] flex justify-between items-center text-[10px] text-gray-400 cursor-pointer hover:text-white transition-colors group">
                <span>View full statistics</span>
                <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
            </div>
        </div>
    );
};

export default ResolutionAreaChart;
