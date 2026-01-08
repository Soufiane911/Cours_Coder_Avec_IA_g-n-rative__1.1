import React from 'react';

/**
 * KPICardCompact - Design médical professionnel avec statut et hover
 */
const KPICardCompact = ({ label, value, unit, trend, color = "blue" }) => {
    const colorClasses = {
        blue: 'border-slate-600/50 bg-slate-800/50',
        teal: 'border-slate-600/50 bg-slate-800/50',
        amber: 'border-slate-600/50 bg-slate-800/50',
        green: 'border-slate-600/50 bg-slate-800/50',
        red: 'border-slate-600/50 bg-slate-800/50',
    };

    const iconColors = {
        blue: 'text-sky-500',
        teal: 'text-teal-500',
        amber: 'text-amber-500',
        green: 'text-emerald-500',
        red: 'text-red-500',
    };

    return (
        <div className={`
            h-full flex flex-col justify-center px-3 py-2
            ${colorClasses[color]}
            rounded-lg
            hover:scale-[1.02] hover:shadow-lg
            transition-all duration-200 cursor-default
            border backdrop-blur-sm
        `}>
            <div className="flex items-center justify-between mb-1">
                <span className="label-scientific text-[9px]">{label}</span>
                {trend && (
                    <span className={`
                        text-[9px] font-bold flex items-center gap-0.5
                        ${trend.startsWith('+') ? 'text-emerald-400' : 'text-red-400'}
                    `}>
                        <span>{trend.startsWith('+') ? '↑' : '↓'}</span>
                        <span>{Math.abs(parseInt(trend))}%</span>
                    </span>
                )}
            </div>
            <div className="flex items-baseline gap-1">
                <span className={`text-lg sm:text-xl font-bold text-slate-50`}>
                    {value}
                </span>
                {unit && (
                    <span className="text-[9px] font-medium text-slate-500 uppercase">
                        {unit}
                    </span>
                )}
            </div>
        </div>
    );
};

export default KPICardCompact;
