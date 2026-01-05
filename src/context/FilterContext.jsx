import { createContext, useContext, useState, useMemo } from 'react';
import { filterSessions } from '../utils/csvParser';
import { createDefaultFilterState } from '../utils/sessionTypes';

/**
 * Context pour gérer les filtres et les données filtrées
 */
const FilterContext = createContext(null);

/**
 * Provider pour le contexte des filtres
 */
export const FilterProvider = ({ children, sessions }) => {
    const [filters, setFilters] = useState(createDefaultFilterState());

    // Données filtrées (memoized pour performance)
    const filteredSessions = useMemo(() => {
        if (!sessions || sessions.length === 0) return [];
        return filterSessions(sessions, filters);
    }, [sessions, filters]);

    // Vérifier si des filtres sont actifs
    const hasActiveFilters = useMemo(() => {
        return (
            filters.startDate !== null ||
            filters.endDate !== null ||
            filters.services.length > 0 ||
            filters.langues.length > 0 ||
            filters.devices.length > 0
        );
    }, [filters]);

    // Réinitialiser les filtres
    const resetFilters = () => {
        setFilters(createDefaultFilterState());
    };

    // Mettre à jour un filtre spécifique
    const updateFilter = (key, value) => {
        setFilters(prev => ({ ...prev, [key]: value }));
    };

    const value = {
        filters,
        setFilters,
        updateFilter,
        resetFilters,
        filteredSessions,
        allSessions: sessions,
        hasActiveFilters
    };

    return (
        <FilterContext.Provider value={value}>
            {children}
        </FilterContext.Provider>
    );
};

/**
 * Hook pour accéder au contexte des filtres
 */
export const useFilters = () => {
    const context = useContext(FilterContext);
    if (!context) {
        throw new Error('useFilters must be used within a FilterProvider');
    }
    return context;
};

export default FilterContext;
