/**
 * Fonctions de formatage pour l'affichage
 */

/**
 * Formate une date en français
 * @param {Date} date
 * @returns {string}
 */
export const formatDate = (date) => {
    return new Intl.DateTimeFormat('fr-FR', {
        day: '2-digit',
        month: 'short',
        year: 'numeric'
    }).format(date);
};

/**
 * Formate un mois (YYYY-MM) en libellé français
 * @param {string} monthKey - Format YYYY-MM
 * @returns {string}
 */
export const formatMonth = (monthKey) => {
    const [year, month] = monthKey.split('-');
    const date = new Date(parseInt(year), parseInt(month) - 1);
    return new Intl.DateTimeFormat('fr-FR', {
        month: 'short',
        year: 'numeric'
    }).format(date);
};

/**
 * Formate une durée en heures et minutes
 * @param {number} minutes
 * @returns {string}
 */
export const formatDuration = (minutes) => {
    if (minutes < 60) {
        return `${minutes} min`;
    }
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return mins > 0 ? `${hours}h ${mins}min` : `${hours}h`;
};

/**
 * Formate un nombre avec séparateur de milliers
 * @param {number} num
 * @returns {string}
 */
export const formatNumber = (num) => {
    return new Intl.NumberFormat('fr-FR').format(num);
};

/**
 * Formate un pourcentage
 * @param {number} value - Valeur entre 0 et 1
 * @param {number} decimals - Nombre de décimales
 * @returns {string}
 */
export const formatPercentage = (value, decimals = 1) => {
    return `${(value * 100).toFixed(decimals)}%`;
};

/**
 * Formate un score de qualité
 * @param {number} score - Score entre 0 et 1
 * @returns {string}
 */
export const formatQualityScore = (score) => {
    return `${(score * 100).toFixed(0)}%`;
};

/**
 * Formate une note sur 5
 * @param {number} rating
 * @returns {string}
 */
export const formatRating = (rating) => {
    return `${rating.toFixed(1)}/5`;
};

/**
 * Retourne une couleur basée sur le score de qualité
 * @param {number} score - Score entre 0 et 1
 * @returns {string} - Couleur CSS
 */
export const getQualityColor = (score) => {
    if (score >= 0.9) return '#22c55e'; // green
    if (score >= 0.7) return '#f59e0b'; // amber
    return '#ef4444'; // red
};

/**
 * Retourne une couleur basée sur la note praticien
 * @param {number} rating - Note entre 1 et 5
 * @returns {string} - Couleur CSS
 */
export const getRatingColor = (rating) => {
    if (rating >= 4.5) return '#22c55e'; // green
    if (rating >= 3.5) return '#f59e0b'; // amber
    return '#ef4444'; // red
};

/**
 * Palette de couleurs pour les graphiques
 */
export const CHART_COLORS = [
    '#3b82f6', // blue
    '#8b5cf6', // violet
    '#22c55e', // green
    '#f59e0b', // amber
    '#ef4444', // red
    '#06b6d4', // cyan
    '#ec4899', // pink
    '#84cc16', // lime
    '#f97316', // orange
    '#6366f1', // indigo
];

/**
 * Obtient une couleur de la palette par index
 * @param {number} index
 * @returns {string}
 */
export const getChartColor = (index) => {
    return CHART_COLORS[index % CHART_COLORS.length];
};
