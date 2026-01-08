import React from 'react';
import { LANGUES } from '../../utils/sessionTypes';
import SelectCompact from './SelectCompact';

/**
 * LanguageFilter - Filtre pour les langues
 */
const LanguageFilter = ({ selected, onChange, compact = false }) => {
    if (compact) {
        return (
            <SelectCompact 
                label="Langue"
                options={LANGUES}
                selected={selected}
                onChange={onChange}
            />
        );
    }

    return null;
};

export default LanguageFilter;
