import React from 'react';
import { BarChart, Bar, ResponsiveContainer, XAxis, Tooltip, Cell, CartesianGrid } from 'recharts';

/**
 * WeekdayChart - Bar chart using monthly session data
 */
const WeekdayChart = ({ data = [] }) => {
    // Use last 7 data points as "weekdays" for visual consistency
    const chartData = data.slice(-7).map((d, idx) => ({
        name: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][idx % 7],
        value: d.count || 0
    }));

    const maxValue = Math.max(...chartData.map(d => d.value), 1);

    return (
        <div className="w-full h-full p-6 flex flex-col">
            <div className="mb-4">
                <h3 className="text-white font-bold text-sm">Sessions by Period</h3>
                <p className="text-[10px] text-gray-500 mt-1">Last 7 data points</p>
            </div>

            <div className="flex-1">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={chartData} margin={{ top: 10, right: 10, left: 10, bottom: 5 }}>
                        <CartesianGrid vertical={false} stroke="rgba(255,255,255,0.03)" />
                        <XAxis
                            dataKey="name"
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: '#6B7280', fontSize: 10 }}
                            dy={10}
                        />
                        <Tooltip
                            cursor={{ fill: 'rgba(255,255,255,0.02)' }}
                            contentStyle={{
                                backgroundColor: '#1C1C24',
                                border: '1px solid #ffffff10',
                                borderRadius: '8px',
                                fontSize: '11px'
                            }}
                            formatter={(value) => [value, 'Sessions']}
                        />
                        <Bar dataKey="value" radius={[4, 4, 4, 4]} barSize={20}>
                            {chartData.map((entry, index) => {
                                const intensity = entry.value / maxValue;
                                const color = intensity > 0.7 ? '#22D3EE' : intensity > 0.4 ? '#3B82F6' : '#6366F1';
                                return (
                                    <Cell
                                        key={`cell-${index}`}
                                        fill={color}
                                        style={{ filter: intensity > 0.5 ? `drop-shadow(0 0 4px ${color}60)` : 'none' }}
                                    />
                                );
                            })}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default WeekdayChart;
