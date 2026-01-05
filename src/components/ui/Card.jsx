/**
 * Card - Composant carte avec glassmorphism
 */
const Card = ({ title, subtitle, icon, children, className = '' }) => {
    return (
        <div className={`glass-card p-5 ${className}`}>
            {(title || icon) && (
                <div className="flex items-center gap-3 mb-4">
                    {icon && <span className="text-2xl">{icon}</span>}
                    <div>
                        {title && <h3 className="text-lg font-semibold text-white">{title}</h3>}
                        {subtitle && <p className="text-sm text-slate-400">{subtitle}</p>}
                    </div>
                </div>
            )}
            {children}
        </div>
    );
};

export default Card;
