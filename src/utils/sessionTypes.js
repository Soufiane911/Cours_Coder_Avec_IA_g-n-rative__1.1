/**
 * Session - Représente une session d'interprétariat médical
 * @typedef {Object} Session
 * @property {string} session_id - Identifiant unique de la session
 * @property {Date} date - Date de la session
 * @property {string} service - Service médical (Urgences, Cardiologie, etc.)
 * @property {string} langue - Langue parlée par le patient
 * @property {number} duree_minutes - Durée totale en minutes
 * @property {number} interactions_patient - Nombre d'interactions du patient
 * @property {number} interactions_praticien - Nombre d'interactions du praticien
 * @property {number} interactions_totales - Total des interactions
 * @property {number} note_praticien - Note sur 5 étoiles (1.0 - 5.0)
 * @property {number} qualite_score - Score de qualité (0.0 - 1.0)
 * @property {number} segments_non_reconnus - Segments audio mal reconnus
 * @property {string} device - Type d'appareil (webapp / mobile)
 */

/**
 * FilterState - État des filtres du dashboard
 * @typedef {Object} FilterState
 * @property {Date|null} startDate - Date de début
 * @property {Date|null} endDate - Date de fin
 * @property {string[]} services - Services sélectionnés
 * @property {string[]} langues - Langues sélectionnées
 * @property {string[]} devices - Appareils sélectionnés
 */

/**
 * Liste des services médicaux disponibles
 */
export const SERVICES = [
    'Urgences',
    'Pédiatrie',
    'Cardiologie',
    'Gériatrie',
    'Oncologie',
    'Maternité',
    'ORL',
    'Neurologie',
    'Psychiatrie'
];

/**
 * Liste des langues disponibles
 */
export const LANGUES = [
    'Anglais',
    'Arabe',
    'Espagnol',
    'Portugais',
    'Allemand',
    'Russe',
    'Ukrainien',
    'Roumain',
    'Somali',
    'Soninké',
    'Ourdou',
    'Tamoul',
    'Créole_haïtien'
];

/**
 * Liste des appareils disponibles
 */
export const DEVICES = ['webapp', 'mobile'];

/**
 * Crée un état de filtre par défaut
 * @returns {FilterState}
 */
export const createDefaultFilterState = () => ({
    startDate: null,
    endDate: null,
    services: [],
    langues: [],
    devices: []
});
