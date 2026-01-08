import React from 'react';

/**
 * DashboardGrid - Premium Bento Grid Layout
 * Spacious, elegant grid with smooth animations
 */
const DashboardGrid = ({ children }) => {
    return (
        <main className="flex-1 px-6 pb-6 overflow-auto">
            <div className="max-w-[1800px] mx-auto">
                <div className="grid grid-cols-12 auto-rows-min gap-5">
                    {children}
                </div>
            </div>
        </main>
    );
};

/**
 * GridItem - Obsidian Glass Container
 * Beautiful card with hover glow effects
 */
export const GridItem = ({
    children,
    colSpan = 1,
    minHeight = 'auto',
    className = "",
    glowColor = "cyan" // cyan, violet, rose, emerald
}) => {
    const colSpans = {
        1: 'col-span-1',
        2: 'col-span-2',
        3: 'col-span-3',
        4: 'col-span-4',
        5: 'col-span-5',
        6: 'col-span-6',
        7: 'col-span-7',
        8: 'col-span-8',
        9: 'col-span-9',
        10: 'col-span-10',
        11: 'col-span-11',
        12: 'col-span-12',
    };

    const glowStyles = {
        cyan: 'hover:border-cyan-500/40 hover:shadow-[0_0_40px_rgba(34,211,238,0.15)]',
        violet: 'hover:border-violet-500/40 hover:shadow-[0_0_40px_rgba(167,139,250,0.15)]',
        rose: 'hover:border-rose-500/40 hover:shadow-[0_0_40px_rgba(251,113,133,0.15)]',
        emerald: 'hover:border-emerald-500/40 hover:shadow-[0_0_40px_rgba(52,211,153,0.15)]',
    };

    return (
        <div
            className={`
                ${colSpans[colSpan] || 'col-span-1'} 
                bg-zinc-900/60 
                backdrop-blur-xl
                border border-zinc-800/80
                rounded-2xl 
                overflow-hidden
                transition-all duration-300 ease-out
                ${glowStyles[glowColor] || glowStyles.cyan}
                ${className}
            `}
            style={{ minHeight }}
        >
            {children}
        </div>
    );
};

export default DashboardGrid;
