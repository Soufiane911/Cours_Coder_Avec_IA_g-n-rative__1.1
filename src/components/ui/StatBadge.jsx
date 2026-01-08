const StatBadge = ({ label, value, trend, trendDirection = 'up', color = 'cyan' }) => {
    const colorClasses = {
        cyan: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30',
        violet: 'bg-violet-500/10 text-violet-400 border-violet-500/30',
        emerald: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
        rose: 'bg-rose-500/10 text-rose-400 border-rose-500/30'
    };

    return (
        <div className={`
            inline-flex items-center gap-3 px-4 py-2.5 rounded-xl
            ${colorClasses[color]} border backdrop-blur-sm
        `}>
            {/* Icon */}
            <div className={`
                w-8 h-8 rounded-lg flex items-center justify-center
                ${color === 'cyan' ? 'bg-cyan-500/20' : ''}
                ${color === 'violet' ? 'bg-violet-500/20' : ''}
                ${color === 'emerald' ? 'bg-emerald-500/20' : ''}
                ${color === 'rose' ? 'bg-rose-500/20' : ''}
            `}>
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 14H4V6h16v12zM6 10h2v2H6v-2zm0 4h8v2H6v-2zm10 0h2v2h-2v-2zm-6-4h8v2h-8v-2z"/>
                </svg>
            </div>

            {/* Label */}
            <span className="text-sm font-medium">{label}</span>

            {/* Trend */}
            {trend && (
                <span className={`
                    flex items-center gap-1 text-xs font-semibold
                    ${trendDirection === 'up' ? 'text-emerald-400' : 'text-rose-400'}
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
                </span>
            )}
        </div>
    );
};

export default StatBadge;
