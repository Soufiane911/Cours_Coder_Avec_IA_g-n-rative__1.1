/**
 * KPICard - Carte pour afficher un indicateur clé
 */
const KPICard = ({
    title,
    value,
    subtitle,
    icon,
    trend,
    trendValue,
    color = 'blue',
    size = 'normal'
}) => {
    const colorClasses = {
        blue: 'from-blue-500 to-blue-600 text-blue-400',
        purple: 'from-purple-500 to-purple-600 text-purple-400',
        green: 'from-green-500 to-green-600 text-green-400',
        amber: 'from-amber-500 to-amber-600 text-amber-400',
        red: 'from-red-500 to-red-600 text-red-400',
        cyan: 'from-cyan-500 to-cyan-600 text-cyan-400',
        pink: 'from-pink-500 to-pink-600 text-pink-400',
    };

    const bgClasses = {
        blue: 'bg-blue-500/20',
        purple: 'bg-purple-500/20',
        green: 'bg-green-500/20',
        amber: 'bg-amber-500/20',
        red: 'bg-red-500/20',
        cyan: 'bg-cyan-500/20',
        pink: 'bg-pink-500/20',
    };

    const textClasses = {
        blue: 'text-blue-400',
        purple: 'text-purple-400',
        green: 'text-green-400',
        amber: 'text-amber-400',
        red: 'text-red-400',
        cyan: 'text-cyan-400',
        pink: 'text-pink-400',
    };

    const sizeClasses = {
        small: 'p-3',
        normal: 'p-5',
        large: 'p-6'
    };

    const valueSizeClasses = {
        small: 'text-2xl',
        normal: 'text-3xl',
        large: 'text-4xl'
    };

    return (
        <div className={`glass-card ${sizeClasses[size]} hover:scale-[1.02] transition-transform duration-200`}>
            <div className="flex items-start justify-between">
                <div className="flex-1">
                    <p className="text-slate-400 text-sm font-medium mb-1">{title}</p>
                    <p className={`${valueSizeClasses[size]} font-bold ${textClasses[color]}`}>
                        {value}
                    </p>
                    {subtitle && (
                        <p className="text-slate-500 text-xs mt-1">{subtitle}</p>
                    )}
                    {trend && (
                        <div className={`flex items-center gap-1 mt-2 text-sm ${trend === 'up' ? 'text-green-400' : 'text-red-400'}`}>
                            <span>{trend === 'up' ? '↑' : '↓'}</span>
                            <span>{trendValue}</span>
                        </div>
                    )}
                </div>
                {icon && (
                    <div className={`w-12 h-12 ${bgClasses[color]} rounded-xl flex items-center justify-center`}>
                        <span className="text-2xl">{icon}</span>
                    </div>
                )}
            </div>
        </div>
    );
};

export default KPICard;
