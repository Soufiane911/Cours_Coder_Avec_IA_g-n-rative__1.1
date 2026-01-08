import React from 'react';

/**
 * Sparkline - Animated mini chart for KPI trend visualization
 */
const Sparkline = ({ color, trend, className = "" }) => {
    const isUp = trend === 'up';

    // Generate smooth bezier curve points
    const path = isUp
        ? "M0,24 C10,22 15,18 25,16 C35,14 40,8 50,10 C60,12 65,4 75,2"
        : "M0,4 C10,6 15,12 25,10 C35,8 40,16 50,18 C60,20 65,22 75,24";

    return (
        <svg
            width="75"
            height="28"
            viewBox="0 0 75 28"
            className={`overflow-visible ${className}`}
        >
            <defs>
                <linearGradient id={`sparkGrad-${color}`} x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor={color} stopOpacity="0.3" />
                    <stop offset="100%" stopColor={color} stopOpacity="1" />
                </linearGradient>
            </defs>
            <path
                d={path}
                fill="none"
                stroke={`url(#sparkGrad-${color})`}
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="drop-shadow-sm"
            />
            {/* End dot with glow */}
            <circle
                cx="75"
                cy={isUp ? "2" : "24"}
                r="3"
                fill={color}
                className="animate-pulse"
                style={{ filter: `drop-shadow(0 0 4px ${color})` }}
            />
        </svg>
    );
};

/**
 * KPICardPremium - Obsidian Analytics KPI Card
 * Premium design with gradient accents and smooth animations
 */
const KPICardPremium = ({
    label,
    value,
    unit,
    trend,
    color = "cyan",
    icon
}) => {
    const colorSchemes = {
        cyan: {
            hex: '#22d3ee',
            gradient: 'from-cyan-500/20 to-cyan-500/5',
            text: 'text-cyan-400',
            border: 'group-hover:border-cyan-500/50',
            glow: 'group-hover:shadow-[0_0_30px_rgba(34,211,238,0.2)]'
        },
        violet: {
            hex: '#a78bfa',
            gradient: 'from-violet-500/20 to-violet-500/5',
            text: 'text-violet-400',
            border: 'group-hover:border-violet-500/50',
            glow: 'group-hover:shadow-[0_0_30px_rgba(167,139,250,0.2)]'
        },
        amber: {
            hex: '#fbbf24',
            gradient: 'from-amber-500/20 to-amber-500/5',
            text: 'text-amber-400',
            border: 'group-hover:border-amber-500/50',
            glow: 'group-hover:shadow-[0_0_30px_rgba(251,191,36,0.2)]'
        },
        rose: {
            hex: '#fb7185',
            gradient: 'from-rose-500/20 to-rose-500/5',
            text: 'text-rose-400',
            border: 'group-hover:border-rose-500/50',
            glow: 'group-hover:shadow-[0_0_30px_rgba(251,113,133,0.2)]'
        },
        emerald: {
            hex: '#34d399',
            gradient: 'from-emerald-500/20 to-emerald-500/5',
            text: 'text-emerald-400',
            border: 'group-hover:border-emerald-500/50',
            glow: 'group-hover:shadow-[0_0_30px_rgba(52,211,153,0.2)]'
        },
        sky: {
            hex: '#38bdf8',
            gradient: 'from-sky-500/20 to-sky-500/5',
            text: 'text-sky-400',
            border: 'group-hover:border-sky-500/50',
            glow: 'group-hover:shadow-[0_0_30px_rgba(56,189,248,0.2)]'
        },
        teal: {
            hex: '#2dd4bf',
            gradient: 'from-teal-500/20 to-teal-500/5',
            text: 'text-teal-400',
            border: 'group-hover:border-teal-500/50',
            glow: 'group-hover:shadow-[0_0_30px_rgba(45,212,191,0.2)]'
        },
        indigo: {
            hex: '#818cf8',
            gradient: 'from-indigo-500/20 to-indigo-500/5',
            text: 'text-indigo-400',
            border: 'group-hover:border-indigo-500/50',
            glow: 'group-hover:shadow-[0_0_30px_rgba(129,140,248,0.2)]'
        }
    };

    const scheme = colorSchemes[color] || colorSchemes.cyan;
    const isPositive = trend && trend.includes('+');
    const isNegative = trend && trend.includes('-');

    return (
        <div className={`
            group relative overflow-hidden rounded-2xl 
            bg-zinc-900/70 backdrop-blur-xl
            border border-zinc-800/80
            p-5
            transition-all duration-300 ease-out
            hover:-translate-y-1
            ${scheme.border}
            ${scheme.glow}
        `}>
            {/* Background gradient accent */}
            <div
                className={`absolute -right-8 -top-8 w-32 h-32 rounded-full bg-gradient-to-br ${scheme.gradient} blur-2xl opacity-60 group-hover:opacity-100 transition-opacity duration-500`}
            />

            {/* Content */}
            <div className="relative z-10">
                {/* Header: Label + Trend */}
                <div className="flex items-start justify-between mb-3">
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-zinc-500">
                        {label}
                    </span>

                    {trend && (
                        <div className={`
                            flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold
                            ${isPositive
                                ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/20'
                                : isNegative
                                    ? 'bg-rose-500/15 text-rose-400 border border-rose-500/20'
                                    : 'bg-zinc-800 text-zinc-400 border border-zinc-700'
                            }
                        `}>
                            {isPositive && (
                                <svg className="w-2.5 h-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                                </svg>
                            )}
                            {isNegative && (
                                <svg className="w-2.5 h-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                                </svg>
                            )}
                            <span>{trend.replace('+', '').replace('-', '')}</span>
                        </div>
                    )}
                </div>

                {/* Value Display */}
                <div className="flex items-baseline gap-1.5 mb-3">
                    <span className={`text-3xl font-bold font-mono tracking-tight text-white`}>
                        {value}
                    </span>
                    {unit && (
                        <span className="text-sm font-medium text-zinc-500">
                            {unit}
                        </span>
                    )}
                </div>

                {/* Sparkline */}
                <div className="flex justify-end">
                    <Sparkline
                        color={scheme.hex}
                        trend={isPositive ? 'up' : 'down'}
                    />
                </div>
            </div>

            {/* Bottom accent line */}
            <div
                className="absolute bottom-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                    background: `linear-gradient(90deg, transparent, ${scheme.hex}, transparent)`
                }}
            />
        </div>
    );
};

export default KPICardPremium;
