import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

/**
 * InteractionsChart - CRM Style for Medical Intelligence
 * Comparison of Patient vs Practitioner interactions.
 */
const InteractionsChart = ({ data = [] }) => {
    const [activeIndex, setActiveIndex] = useState(null);

    // Filter top 5 services for clarity
    const chartData = data.slice(0, 5).map(d => ({
        name: d.service,
        patient: d.patient,
        praticien: d.praticien
    }));

    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-[#1C1C24] border border-[#ffffff10] rounded-xl px-4 py-3 shadow-xl">
                    <p className="text-[10px] text-gray-400 uppercase font-bold mb-2">{label}</p>
                    <div className="flex flex-col gap-1">
                        <div className="flex justify-between items-center gap-4">
                            <span className="text-[10px] text-[#22D3EE]">Patient</span>
                            <span className="text-sm font-bold text-white">{payload[0].value}</span>
                        </div>
                        <div className="flex justify-between items-center gap-4">
                            <span className="text-[10px] text-[#CF57D3]">Praticien</span>
                            <span className="text-sm font-bold text-white">{payload[1].value}</span>
                        </div>
                    </div>
                </div>
            );
        }
        return null;
    };

    return (
        <div className="w-full h-full p-6 flex flex-col">
            <div className="flex justify-between items-start mb-6">
                <div>
                    <h3 className="text-white font-bold text-sm tracking-tight">Flux d'Interactions</h3>
                    <p className="text-[10px] text-gray-500 mt-0.5">Ratio Patient / Praticien par service</p>
                </div>
                <div className="flex gap-3">
                    <div className="flex items-center gap-1.5">
                        <div className="w-2 h-2 rounded-full bg-[#22D3EE]"></div>
                        <span className="text-[9px] font-bold text-gray-500 uppercase">Patient</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                        <div className="w-2 h-2 rounded-full bg-[#CF57D3]"></div>
                        <span className="text-[9px] font-bold text-gray-500 uppercase">Praticien</span>
                    </div>
                </div>
            </div>

            <div className="flex-1 min-h-0">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                        data={chartData}
                        margin={{ top: 5, right: 10, left: -20, bottom: 0 }}
                        barGap={8}
                    >
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.03)" />
                        <XAxis
                            dataKey="name"
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: '#6B7280', fontSize: 9 }}
                            dy={5}
                        />
                        <YAxis
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: '#6B7280', fontSize: 9 }}
                        />
                        <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(255,255,255,0.02)' }} />
                        <Bar dataKey="patient" fill="#22D3EE" radius={[4, 4, 0, 0]} barSize={12} />
                        <Bar dataKey="praticien" fill="#CF57D3" radius={[4, 4, 0, 0]} barSize={12} />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default InteractionsChart;
