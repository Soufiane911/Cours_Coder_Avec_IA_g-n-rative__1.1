import React from 'react';
import { SERVICES } from '../../utils/sessionTypes';
import SelectCompact from './SelectCompact';

/**
 * ServiceFilter - Filtre pour les services médicaux
 */
const ServiceFilter = ({ selected, onChange, compact = false }) => {
    if (compact) {
        return (
            <SelectCompact 
                label="Service"
                options={SERVICES}
                selected={selected}
                onChange={onChange}
            />
        );
    }

    // Garder la version originale pour compatibilité si nécessaire (mais non utilisée dans la nouvelle refonte)
    return null; 
};

export default ServiceFilter;
