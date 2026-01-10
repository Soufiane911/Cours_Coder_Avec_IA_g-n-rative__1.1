# Documentation Technique : Dashboard Analytique Dashaalia

## 1. Contexte du Projet

Dashaalia est une infrastructure logicielle dédiée à l'interprétariat médical assisté par Intelligence Artificielle. Sa fonction principale est de lever les barrières linguistiques entre les praticiens de santé et les patients non-francophones. 

Ce dépôt contient le développement d'une solution de Business Intelligence (BI) visant à traiter, analyser et visualiser les données de performance et d'utilisation issues des sessions d'interprétariat.

## 2. Objectifs du Système

- Traitement automatisé de jeux de données volumineux (Dataset CSV).
- Analyse multidimensionnelle des indicateurs de performance (KPI).
- Implémentation d'un moteur de filtrage dynamique et réactif.
- Visualisation de données complexes via des représentations graphiques normalisées.

## 3. Spécifications Techniques

### Stack Logicielle
- **Framework Core** : React 18+ (Environnement de build : Vite)
- **Langage** : JavaScript (ECMAScript 2022+)
- **Moteur Graphique** : Recharts (alternativement Chart.js ou Nivo)
- **Framework CSS** : Tailwind CSS (Méthodologie Utility-First)
- **Parsing de Données** : PapaParse


## 4. Architecture Logicielle

Le projet suit une architecture modulaire segmentée par responsabilités :

```
src/
├── components/
│   ├── charts/        # Logique de rendu des visualisations
│   ├── filters/       # Modules d'interfaçage des paramètres de recherche
│   ├── layout/        # Structure de l'interface utilisateur
│   └── ui/            # Composants atomiques et design system
├── hooks/
│   ├── useSessionData.js # Abstraction de la récupération des données
│   └── useFilters.js     # Logique de traitement des prédicats de filtrage
├── context/
│   └── FilterContext.js  # Bus de données global pour l'état des filtres
├── utils/
│   ├── csvParser.js      # Configuration du processeur CSV
│   ├── dataAggregations.js # Algorithmes de calcul statistique
│   └── formatters.js     # Normalisation des types de données
├── data/
│   └── sessions_dataset_320.csv
├── App.jsx
└── main.jsx
```

## 5. Exigences Fonctionnelles

### Modules de Visualisation
1. **Analyse Linguistique** : Histogramme horizontal des fréquences par langue.
2. **Séries Temporelles** : Analyse de l'évolution du volume de sessions (agrégation hebdomadaire/mensuelle).
3. **Métriques de Durée** : Calcul de tendance centrale (moyenne, médiane) et dispersion (min, max).
4. **Répartition Sectorielle** : Diagramme circulaire de la distribution par service médical.
5. **Indice de Qualité** : Analyse de corrélation entre le score de qualité et les erreurs de reconnaissance.
6. **Flux d'Interactions** : Comparaison volumétrique des échanges patient/praticien.

### Système de Filtrage Dynamique
L'interface doit permettre l'application combinée de filtres temporels (plage de dates), catégoriels (services, langues) et techniques (type d'appareil), avec une mise à jour synchrone du DOM et des graphiques.

## 6. Procédures d'Installation

### Initialisation de l'environnement
```bash
# Création du projet via Vite
npm create vite@latest dashaalia-dashboard -- --template react

# Installation des dépendances de production
cd dashaalia-dashboard
npm install recharts papaparse tailwindcss postcss autoprefixer lucide-react

# Configuration du moteur CSS
npx tailwindcss init -p
```

### Exécution
```bash
npm run dev
```

