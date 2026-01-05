# 🏥 Projet Dashboard Analytique - Dashaalia

## 📋 Contexte

**Dashaalia** est une plateforme d'interprétariat médical augmentée par Intelligence Artificielle. Elle permet de faciliter la communication entre patients non-francophones et praticiens médicaux.

Ce projet consiste à développer un **dashboard analytique** permettant de visualiser et analyser les données issues des sessions d'interprétariat.

---

## 🎯 Objectifs pédagogiques

- Utilisation d'IA générative pour assister le développement
- Construction d'une application de data analytics
- Structuration d'une architecture maintenable
- Manipulation et visualisation d'un dataset complet

---

## 🛠️ Stack Technique

| Catégorie | Technologie |
|-----------|-------------|
| Framework | React 18+ (Vite) |
| Langage | TypeScript |
| Graphiques | Recharts / Chart.js / Nivo |
| Styling | Tailwind CSS |
| Parsing CSV | PapaParse |
| State Management | React Context / Zustand |
| IA Générative | GitHub Copilot / ChatGPT / Claude |

---

## 📊 Dataset

Fichier : `sessions_dataset_320.csv` (320 lignes)

| Colonne | Type | Description |
|---------|------|-------------|
| `session_id` | string | Identifiant unique de la session |
| `date` | date | Date de la session (YYYY-MM-DD) |
| `service` | string | Service médical (Urgences, Cardiologie, etc.) |
| `langue` | string | Langue parlée par le patient |
| `duree_minutes` | number | Durée totale de la session en minutes |
| `interactions_patient` | number | Nombre d'interactions du patient |
| `interactions_praticien` | number | Nombre d'interactions du praticien |
| `interactions_totales` | number | Total des interactions |
| `note_praticien` | number | Note sur 5 étoiles (1.0 - 5.0) |
| `qualite_score` | number | Score de qualité (0.0 - 1.0) |
| `segments_non_reconnus` | number | Segments audio mal reconnus |
| `device` | string | Type d'appareil (webapp / mobile) |

---

## 📈 Visualisations requises

### 1. Top des langues
- **Type** : Bar chart horizontal
- **Données** : Nombre de sessions par langue
- **Tri** : Décroissant

### 2. Évolution du nombre de sessions
- **Type** : Line chart / Area chart
- **Données** : Sessions groupées par semaine ou mois
- **Axe X** : Temps
- **Axe Y** : Nombre de sessions

### 3. Durée moyenne
- **Type** : KPI Card + Histogramme de distribution
- **Données** : `duree_minutes`
- **Afficher** : Moyenne, médiane, min, max

### 4. Répartition par service
- **Type** : Pie chart / Donut chart
- **Données** : Pourcentage de sessions par service médical

### 5. Indicateurs qualité
- **Type** : Gauge + Scatter plot
- **Données** : `qualite_score`, `segments_non_reconnus`
- **Afficher** : Score moyen, corrélation avec durée

### 6. Interactions patient/praticien
- **Type** : Stacked bar chart / Grouped bar
- **Données** : `interactions_patient`, `interactions_praticien`
- **Analyse** : Ratio, moyennes par service

### 7. Notes praticiens
- **Type** : Histogramme + KPI
- **Données** : `note_praticien`
- **Afficher** : Distribution des notes, moyenne globale

---

## 🔍 Filtres à implémenter

| Filtre | Type de composant | Champ CSV |
|--------|-------------------|-----------|
| Période | Date Range Picker | `date` |
| Service | Multi-select dropdown | `service` |
| Langue | Multi-select dropdown | `langue` |
| Device | Toggle / Checkbox | `device` |

> Les filtres doivent mettre à jour **toutes** les visualisations en temps réel.

---

## 🏗️ Architecture suggérée

```
src/
├── components/
│   ├── charts/
│   │   ├── LanguagesChart.tsx
│   │   ├── SessionsEvolutionChart.tsx
│   │   ├── DurationChart.tsx
│   │   ├── ServicesChart.tsx
│   │   ├── QualityChart.tsx
│   │   ├── InteractionsChart.tsx
│   │   └── RatingsChart.tsx
│   ├── filters/
│   │   ├── DateRangeFilter.tsx
│   │   ├── ServiceFilter.tsx
│   │   ├── LanguageFilter.tsx
│   │   └── DeviceFilter.tsx
│   ├── layout/
│   │   ├── Header.tsx
│   │   ├── Sidebar.tsx
│   │   └── DashboardGrid.tsx
│   └── ui/
│       ├── Card.tsx
│       ├── KPICard.tsx
│       └── Loader.tsx
├── hooks/
│   ├── useSessionData.ts
│   └── useFilters.ts
├── context/
│   └── FilterContext.tsx
├── utils/
│   ├── csvParser.ts
│   ├── dataAggregations.ts
│   └── formatters.ts
├── types/
│   └── session.ts
├── data/
│   └── sessions_dataset_320.csv
├── App.tsx
└── main.tsx
```

---

## ✅ Checklist de développement

### Phase 1 : Setup
- [ ] Initialiser le projet avec Vite + React + TypeScript
- [ ] Installer les dépendances (Tailwind, Recharts, PapaParse)
- [ ] Configurer l'IA générative (Copilot/ChatGPT)
- [ ] Créer la structure de dossiers

### Phase 2 : Data Layer
- [ ] Définir les types TypeScript pour les sessions
- [ ] Implémenter le parser CSV
- [ ] Créer les fonctions d'agrégation
- [ ] Tester avec le dataset

### Phase 3 : Composants de base
- [ ] Layout principal (Header, Sidebar, Grid)
- [ ] Composants UI réutilisables (Card, KPICard)
- [ ] Système de filtres avec Context

### Phase 4 : Visualisations
- [ ] Top des langues
- [ ] Évolution des sessions
- [ ] Durée moyenne
- [ ] Répartition par service
- [ ] Indicateurs qualité
- [ ] Interactions patient/praticien
- [ ] Notes praticiens

### Phase 5 : Finitions
- [ ] Responsive design
- [ ] États de chargement
- [ ] Gestion des erreurs
- [ ] Tests manuels

### Phase 6 : Documentation
- [ ] Captures d'écran IA générative
- [ ] Rédaction du rapport
- [ ] Screenshots du dashboard final

---

## 📝 Rapport attendu (3-5 pages)

1. **Contribution de chaque membre**
2. **Choix techniques** (stack, bibliothèques, justifications)
3. **Usage de l'IA générative** (captures obligatoires)
4. **Architecture** (schéma des composants)
5. **Résultats** (screenshots)
6. **Limites et améliorations possibles**

---

## 🏆 Barème

| Critère | Points |
|---------|--------|
| Fonctionnalités | 6 pts |
| Visualisations | 4 pts |
| Architecture / Qualité du code | 3 pts |
| Usage IA générative | 3 pts |
| Rapport | 3 pts |
| **Bonus** | +1 pt |

**Total** : 19 pts + 1 bonus

---

## 📅 Deadline

**12 janvier 2026**

Soumission via : [Google Forms](https://forms.gle/fw1erRSivDo3Suso8)

---

## 💡 Idées bonus (+1 pt)

- Export PDF du dashboard
- Mode sombre / clair
- Animations sur les graphiques
- Comparaison entre deux périodes
- Tableau de données avec tri et recherche
- Prédictions basées sur les tendances

---

## 🚀 Commandes de démarrage

```bash
# Créer le projet
npm create vite@latest dashaalia-dashboard -- --template react-ts

# Installer les dépendances
cd dashaalia-dashboard
npm install
npm install recharts papaparse tailwindcss postcss autoprefixer
npm install -D @types/papaparse

# Initialiser Tailwind
npx tailwindcss init -p

# Lancer le dev server
npm run dev
```

---

*Projet réalisé dans le cadre de l'atelier "Coder avec l'IA Générative" - EPSI B3 DEV IA*