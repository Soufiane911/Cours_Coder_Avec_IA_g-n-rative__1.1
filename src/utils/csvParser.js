import Papa from 'papaparse';

/**
 * Parse le fichier CSV et convertit les données en objets Session
 * @param {string} csvText - Contenu brut du fichier CSV
 * @returns {Session[]} - Tableau de sessions parsées
 */
export const parseCSV = (csvText) => {
    const result = Papa.parse(csvText, {
        header: true,
        skipEmptyLines: true,
        dynamicTyping: false, // On gère manuellement les types
    });

    return result.data.map((row) => ({
        session_id: row.session_id,
        date: new Date(row.date),
        service: row.service,
        langue: row.langue,
        duree_minutes: parseInt(row.duree_minutes, 10),
        interactions_patient: parseInt(row.interactions_patient, 10),
        interactions_praticien: parseInt(row.interactions_praticien, 10),
        interactions_totales: parseInt(row.interactions_totales, 10),
        note_praticien: parseFloat(row.note_praticien),
        qualite_score: parseFloat(row.qualite_score),
        segments_non_reconnus: parseInt(row.segments_non_reconnus, 10),
        device: row.device,
    }));
};

/**
 * Charge et parse le fichier CSV depuis une URL ou un chemin
 * @param {string} url - URL du fichier CSV
 * @returns {Promise<Session[]>} - Promesse contenant les sessions
 */
export const loadCSVFromURL = async (url) => {
    try {
        const response = await fetch(url);
        const csvText = await response.text();
        return parseCSV(csvText);
    } catch (error) {
        console.error('Erreur lors du chargement du CSV:', error);
        throw error;
    }
};

/**
 * Filtre les sessions selon les critères spécifiés
 * @param {Session[]} sessions - Tableau de sessions
 * @param {FilterState} filters - État des filtres
 * @returns {Session[]} - Sessions filtrées
 */
export const filterSessions = (sessions, filters) => {
    return sessions.filter((session) => {
        // Filtre par date
        if (filters.startDate && session.date < filters.startDate) {
            return false;
        }
        if (filters.endDate && session.date > filters.endDate) {
            return false;
        }

        // Filtre par service
        if (filters.services.length > 0 && !filters.services.includes(session.service)) {
            return false;
        }

        // Filtre par langue
        if (filters.langues.length > 0 && !filters.langues.includes(session.langue)) {
            return false;
        }

        // Filtre par device
        if (filters.devices.length > 0 && !filters.devices.includes(session.device)) {
            return false;
        }

        return true;
    });
};


//test 
