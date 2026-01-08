import React from 'react';

/**
 * Loader - Obsidian Analytics Loading Component
 * Animated spinner with pulse effect
 */
const Loader = ({ size = 'medium', text = 'Chargement...' }) => {
    const sizes = {
        small: 'w-8 h-8',
        medium: 'w-12 h-12',
        large: 'w-16 h-16'
    };

    return (
        <div className="flex flex-col items-center gap-5">
            {/* Animated Spinner */}
            <div className={`relative ${sizes[size]}`}>
                {/* Outer ring */}
                <div className="absolute inset-0 rounded-full border-2 border-zinc-800"></div>

                {/* Spinning gradient ring */}
                <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-cyan-400 border-r-violet-400 animate-spin"></div>

                {/* Inner glow */}
                <div className="absolute inset-2 rounded-full bg-gradient-to-br from-cyan-500/20 to-violet-500/20 animate-pulse"></div>

                {/* Center dot */}
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_10px_rgba(34,211,238,0.8)]"></div>
                </div>
            </div>

            {/* Loading text */}
            {text && (
                <div className="flex flex-col items-center gap-1">
                    <span className="text-sm font-medium text-white tracking-wide">
                        {text}
                    </span>
                    <div className="flex gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce" style={{ animationDelay: '0ms' }}></span>
                        <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-bounce" style={{ animationDelay: '150ms' }}></span>
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce" style={{ animationDelay: '300ms' }}></span>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Loader;
