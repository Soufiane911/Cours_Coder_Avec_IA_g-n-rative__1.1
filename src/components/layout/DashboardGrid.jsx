/**
 * DashboardGrid - Grille responsive pour les graphiques
 */
const DashboardGrid = ({ children }) => {
    return (
        <main className="flex-1 p-6 overflow-y-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 auto-rows-min">
                {children}
            </div>
        </main>
    );
};

/**
 * GridItem - Container pour un élément de la grille
 * @param {Object} props
 * @param {string} props.colSpan - Nombre de colonnes (1, 2, 3, 4 ou 'full')
 * @param {string} props.rowSpan - Nombre de lignes (1, 2)
 */
export const GridItem = ({ children, colSpan = 1, rowSpan = 1 }) => {
    const colSpanClasses = {
        1: 'md:col-span-1',
        2: 'md:col-span-2',
        3: 'md:col-span-2 lg:col-span-3',
        4: 'md:col-span-2 lg:col-span-3 xl:col-span-4',
        'full': 'col-span-full'
    };

    const rowSpanClasses = {
        1: 'row-span-1',
        2: 'row-span-2'
    };

    return (
        <div className={`${colSpanClasses[colSpan] || ''} ${rowSpanClasses[rowSpan] || ''}`}>
            {children}
        </div>
    );
};

export default DashboardGrid;
