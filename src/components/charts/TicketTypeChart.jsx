import React, { useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Sector } from 'recharts';

const COLORS = ['#22D3EE', '#3B82F6', '#8F48F8', '#D255D1', '#06B6D4'];

/**
 * TicketTypeChart - Interactive donut with real service data
 */
const TicketTypeChart = ({ data = [] }) => {
    const [activeIndex, setActiveIndex] = useState(null);

    // Transform service data
    const chartData = data.slice(0, 5).map((d, idx) => ({
        name: d.service,
        value: d.count,
        color: COLORS[idx % COLORS.length]
    }));

    const renderActiveShape = (props) => {
        const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill, payload, value } = props;
        return (
            <g>
                <Sector
                    cx={cx}
                    cy={cy}
                    innerRadius={innerRadius}
                    outerRadius={outerRadius + 8}
                    startAngle={startAngle}
                    endAngle={endAngle}
                    fill={fill}
                    style={{ filter: `drop-shadow(0 0 8px ${fill}80)` }}
                />
                <text x={cx} y={cy - 10} textAnchor="middle" fill="#fff" fontSize={18} fontWeight="bold">
                    {value}
                </text>
                <text x={cx} y={cy + 10} textAnchor="middle" fill="#6B7280" fontSize={10}>
                    {payload.name}
                </text>
            </g>
        );
    };

    return (
        <div className="w-full h-full p-6 flex flex-col">
            <h3 className="text-white font-bold text-sm mb-2">Sessions by Service</h3>
            <p className="text-[10px] text-gray-500 mb-4">Top 5 services</p>

            <div className="flex-1 flex items-center">
                <ResponsiveContainer width="55%" height="100%">
                    <PieChart>
                        <Pie
                            data={chartData}
                            cx="50%"
                            cy="50%"
                            innerRadius={45}
                            outerRadius={65}
                            paddingAngle={2}
                            dataKey="value"
                            stroke="none"
                            activeIndex={activeIndex}
                            activeShape={renderActiveShape}
                            onMouseEnter={(_, index) => setActiveIndex(index)}
                            onMouseLeave={() => setActiveIndex(null)}
                        >
                            {chartData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                        </Pie>
                    </PieChart>
                </ResponsiveContainer>

                <div className="flex flex-col gap-2">
                    {chartData.map((item, idx) => (
                        <div
                            key={item.name}
                            className={`flex items-center gap-2 cursor-pointer transition-opacity ${activeIndex !== null && activeIndex !== idx ? 'opacity-40' : 'opacity-100'}`}
                            onMouseEnter={() => setActiveIndex(idx)}
                            onMouseLeave={() => setActiveIndex(null)}
                        >
                            <div
                                className="w-2.5 h-2.5 rounded-full"
                                style={{ backgroundColor: item.color }}
                            ></div>
                            <span className="text-xs text-gray-300 font-medium truncate max-w-[80px]">{item.name}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default TicketTypeChart;
