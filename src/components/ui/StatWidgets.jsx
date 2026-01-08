import React from 'react';

const GradientStatCard = ({ label, value, valueH, valueM, subtitle, gradient }) => {
    // If valueH/valueM are provided, show time format, otherwise show single value
    const showTimeFormat = valueH !== undefined && valueM !== undefined;

    return (
        <div
            className="p-6 rounded-3xl relative overflow-hidden h-full flex flex-col justify-center shadow-lg group cursor-pointer transition-transform hover:scale-[1.02]"
            style={{ background: gradient }}
        >
            {/* Background Texture */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-5 rounded-full blur-2xl transform translate-x-10 -translate-y-10 group-hover:opacity-10 transition-opacity"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-black opacity-5 rounded-full blur-xl transform -translate-x-5 translate-y-5"></div>

            <div className="relative z-10">
                <h3 className="text-white text-xs font-medium opacity-90 mb-4">{label}</h3>

                {showTimeFormat ? (
                    <div className="flex items-baseline gap-1">
                        <span className="text-4xl font-bold text-white tracking-tight">{valueH}</span>
                        <span className="text-sm font-medium text-white/70 mr-3">h</span>
                        <span className="text-4xl font-bold text-white tracking-tight">{valueM}</span>
                        <span className="text-sm font-medium text-white/70">min</span>
                    </div>
                ) : (
                    <div className="flex items-baseline gap-2">
                        <span className="text-4xl font-bold text-white tracking-tight">{value}</span>
                        {subtitle && <span className="text-xs text-white/60">{subtitle}</span>}
                    </div>
                )}
            </div>
        </div>
    );
};

export const MiniStatRow = ({ label, value, icon, trend }) => {
    const isPositive = trend && !trend.includes('-');

    return (
        <div className="flex items-center justify-between p-4 bg-[#1C1C24] rounded-2xl border border-[#ffffff05] shadow-sm group cursor-pointer hover:border-[#ffffff10] transition-all">
            <div className="flex items-center gap-3">
                <div className={`
                    w-10 h-10 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110
                    ${label === 'Satisfaction' ? 'bg-[#fbbf24]/10 text-[#fbbf24]' : 'bg-[#22D3EE]/10 text-[#22D3EE]'}
                `}>
                    {icon}
                </div>
                <div className="flex flex-col">
                    <span className="text-sm font-bold text-white">{label}</span>
                    <span className="text-lg font-bold text-white">{value}</span>
                </div>
            </div>
            {trend && (
                <div className={`
                    px-2 py-1 rounded-lg text-xs font-bold
                    ${isPositive ? 'bg-[#102A2A] text-[#22D3EE]' : 'bg-[#2A1A1A] text-rose-400'}
                `}>
                    {trend}
                </div>
            )}
        </div>
    );
};

export default GradientStatCard;
