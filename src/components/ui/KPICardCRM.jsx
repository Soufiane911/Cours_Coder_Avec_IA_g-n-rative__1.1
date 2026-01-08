const KPICardCRM = ({
    title,
    value,
    subValue,
    unit,
    trend,
    trendDirection = 'up',
    color = 'cyan',
    size = 'default',
    icon
}) => {
    const colorClasses = {
        cyan: {
            bg: 'from-cyan-500/20 to-cyan-500/5',
            border: 'border-cyan-500/30',
            text: 'text-cyan-400',
            glow: 'shadow-cyan-500/20'
        },
        violet: {
            bg: 'from-violet-500/20 to-violet-500/5',
            border: 'border-violet-500/30',
            text: 'text-violet-400',
            glow: 'shadow-violet-500/20'
        },
        emerald: {
            bg: 'from-emerald-500/20 to-emerald-500/5',
            border: 'border-emerald-500/30',
            text: 'text-emerald-400',
            glow: 'shadow-emerald-500/20'
        },
        rose: {
            bg: 'from-rose-500/20 to-rose-500/5',
            border: 'border-rose-500/30',
            text: 'text-rose-400',
            glow: 'shadow-rose-500/20'
        }
    };

    const colors = colorClasses[color];

    return (
        <div className={`
            relative overflow-hidden rounded-2xl
            bg-gradient-to-br ${colors.bg}
            border ${colors.border}
            backdrop-blur-xl
            p-5
            transition-all duration-300
            hover:shadow-lg hover:${colors.glow}
            ${size === 'large' ? 'col-span-2' : ''}
        `}>
            {/* Background decoration */}
            <div className={`absolute -right-4 -top-4 w-24 h-24 rounded-full bg-gradient-to-br ${colors.bg} opacity-50 blur-2xl`} />

            {/* Title */}
            <div className="flex items-center gap-2 mb-3">
                <div className={`w-2 h-2 rounded-full ${colors.text.replace('text-', 'bg-')}`} />
                <span className="text-xs font-medium text-zinc-400 uppercase tracking-wider">
                    {title}
                </span>
            </div>

            {/* Value */}
            <div className="flex items-baseline gap-2">
                <span className={`text-4xl font-bold ${colors.text} tracking-tight`}>
                    {value}
                </span>
                {subValue && (
                    <>
                        <span className="text-xl text-zinc-500">.</span>
                        <span className={`text-2xl font-semibold ${colors.text} opacity-70`}>
                            {subValue}
                        </span>
                    </>
                )}
                {unit && (
                    <span className="text-sm text-zinc-500 font-medium ml-1">
                        {unit}
                    </span>
                )}
            </div>

            {/* Trend */}
            {trend && (
                <div className={`
                    inline-flex items-center gap-1 mt-3 px-2 py-1 rounded-full text-xs font-medium
                    ${trendDirection === 'up'
                        ? 'bg-emerald-500/10 text-emerald-400'
                        : 'bg-rose-500/10 text-rose-400'
                    }
                `}>
                    <svg
                        className={`w-3 h-3 ${trendDirection === 'down' ? 'rotate-180' : ''}`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                    </svg>
                    {trend}
                </div>
            )}

            {/* Icon */}
            {icon && (
                <div className={`absolute right-4 bottom-4 ${colors.text} opacity-20`}>
                    {icon}
                </div>
            )}
        </div>
    );
};

export default KPICardCRM;
