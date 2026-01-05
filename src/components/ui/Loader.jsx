/**
 * Loader - Composant de chargement animé
 */
const Loader = ({ size = 'medium', text = 'Chargement...' }) => {
    const sizeClasses = {
        small: 'w-6 h-6',
        medium: 'w-10 h-10',
        large: 'w-16 h-16'
    };

    return (
        <div className="flex flex-col items-center justify-center gap-4 p-8">
            {/* Spinner */}
            <div className={`${sizeClasses[size]} relative`}>
                <div className="absolute inset-0 border-4 border-slate-700 rounded-full"></div>
                <div className="absolute inset-0 border-4 border-transparent border-t-blue-500 rounded-full animate-spin"></div>
            </div>
            {text && <p className="text-slate-400 text-sm">{text}</p>}
        </div>
    );
};

/**
 * SkeletonCard - Placeholder animé pour les cartes
 */
export const SkeletonCard = ({ height = 'h-48' }) => {
    return (
        <div className={`glass-card p-5 ${height} animate-pulse`}>
            <div className="h-4 bg-slate-700 rounded w-1/3 mb-4"></div>
            <div className="h-8 bg-slate-700 rounded w-2/3 mb-2"></div>
            <div className="h-4 bg-slate-700 rounded w-1/2"></div>
        </div>
    );
};

/**
 * SkeletonChart - Placeholder animé pour les graphiques
 */
export const SkeletonChart = ({ height = 'h-64' }) => {
    return (
        <div className={`glass-card p-5 ${height} animate-pulse`}>
            <div className="h-4 bg-slate-700 rounded w-1/4 mb-4"></div>
            <div className="flex items-end gap-2 h-3/4">
                {[60, 80, 45, 90, 70, 55, 85].map((h, i) => (
                    <div
                        key={i}
                        className="flex-1 bg-slate-700 rounded-t"
                        style={{ height: `${h}%` }}
                    ></div>
                ))}
            </div>
        </div>
    );
};

export default Loader;
