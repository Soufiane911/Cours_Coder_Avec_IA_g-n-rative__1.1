---
name: scientific-dashboard
description: Guide de conception pour dashboards analytiques scientifiques avec React et Recharts
license: MIT
compatibility: opencode
metadata:
  domain: data-visualization
  framework: react
  audience: developers
---

# Scientific Dashboard Design System

## 1. Principes fondamentaux

### 1.1 Rigueur visuelle
- Elimination des elements decoratifs superflus (emojis, icones fantaisistes)
- Hierarchie typographique claire (titres, sous-titres, labels, valeurs)
- Contraste suffisant pour la lisibilite (WCAG AA minimum)
- Alignement strict sur une grille de base

### 1.2 Precision des donnees
- Affichage des unites de mesure explicites
- Nombre de decimales adapte au contexte (2 pour les pourcentages, 1 pour les moyennes)
- Axes avec echelles coherentes et labels lisibles
- Legendes positionnees de maniere non intrusive

## 2. Architecture de layout

### 2.1 Structure hierarchique

```
┌─────────────────────────────────────────────────────────────────┐
│  HEADER                                                         │
│  - Logo et titre de l'application                               │
│  - Actions globales (export, parametres, theme)                 │
├─────────────────────────────────────────────────────────────────┤
│  FILTRES (bandeau horizontal ou sidebar)                        │
│  - Selecteur de periode (date range)                            │
│  - Filtres categoriques (multi-select)                          │
│  - Bouton de reinitialisation                                   │
├─────────────────────────────────────────────────────────────────┤
│  KPI CARDS (indicateurs cles)                                   │
│  - 4 a 6 metriques principales                                  │
│  - Valeur + label + tendance optionnelle                        │
├─────────────────────────────────────────────────────────────────┤
│  VISUALISATIONS (grille responsive)                             │
│  - Graphiques primaires (large, 8-12 colonnes)                  │
│  - Graphiques secondaires (medium, 4-6 colonnes)                │
│  - Graphiques tertiaires (small, 3-4 colonnes)                  │
└─────────────────────────────────────────────────────────────────┘
```

### 2.2 Grille CSS (12 colonnes)

```jsx
// DashboardGrid.jsx
const DashboardGrid = ({ children }) => (
  <div className="grid grid-cols-12 gap-6 p-6">
    {children}
  </div>
);

// Utilisation avec span
<GridItem colSpan={8}>  // Graphique principal
<GridItem colSpan={4}>  // Graphique secondaire
<GridItem colSpan={6}>  // Demi-largeur
<GridItem colSpan={12}> // Pleine largeur
```

## 3. Composants graphiques

### 3.1 KPI Card

```jsx
const KPICard = ({ title, value, unit, trend }) => (
  <div className="bg-slate-800 rounded-lg p-4 border border-slate-700">
    <p className="text-slate-400 text-sm font-medium">{title}</p>
    <p className="text-2xl font-bold text-white mt-1">
      {value}
      {unit && <span className="text-sm text-slate-400 ml-1">{unit}</span>}
    </p>
    {trend && (
      <p className={`text-sm mt-2 ${trend > 0 ? 'text-green-400' : 'text-red-400'}`}>
        {trend > 0 ? '+' : ''}{trend}%
      </p>
    )}
  </div>
);
```

### 3.2 Chart Container

```jsx
const ChartCard = ({ title, children, className }) => (
  <div className={`bg-slate-800 rounded-lg p-4 border border-slate-700 ${className}`}>
    <h3 className="text-white font-semibold mb-4">{title}</h3>
    <div className="h-64">
      {children}
    </div>
  </div>
);
```

### 3.3 Bar Chart (Horizontal)

```jsx
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const HorizontalBarChart = ({ data, dataKey, nameKey }) => (
  <ResponsiveContainer width="100%" height="100%">
    <BarChart data={data} layout="vertical" margin={{ left: 80 }}>
      <XAxis type="number" stroke="#94A3B8" />
      <YAxis type="category" dataKey={nameKey} stroke="#94A3B8" />
      <Tooltip
        contentStyle={{ backgroundColor: '#1E293B', border: '1px solid #334155' }}
        labelStyle={{ color: '#F8FAFC' }}
      />
      <Bar dataKey={dataKey} fill="#3B82F6" radius={[0, 4, 4, 0]} />
    </BarChart>
  </ResponsiveContainer>
);
```

### 3.4 Line Chart (Series temporelles)

```jsx
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

const TimeSeriesChart = ({ data, dataKey, xKey }) => (
  <ResponsiveContainer width="100%" height="100%">
    <LineChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
      <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
      <XAxis dataKey={xKey} stroke="#94A3B8" />
      <YAxis stroke="#94A3B8" />
      <Tooltip
        contentStyle={{ backgroundColor: '#1E293B', border: '1px solid #334155' }}
      />
      <Line
        type="monotone"
        dataKey={dataKey}
        stroke="#3B82F6"
        strokeWidth={2}
        dot={{ fill: '#3B82F6', strokeWidth: 2 }}
      />
    </LineChart>
  </ResponsiveContainer>
);
```

### 3.5 Pie Chart (Repartition)

```jsx
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const COLORS = ['#3B82F6', '#8B5CF6', '#10B981', '#F59E0B', '#EF4444', '#06B6D4'];

const DistributionChart = ({ data, dataKey, nameKey }) => (
  <ResponsiveContainer width="100%" height="100%">
    <PieChart>
      <Pie
        data={data}
        dataKey={dataKey}
        nameKey={nameKey}
        cx="50%"
        cy="50%"
        outerRadius={80}
        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
      >
        {data.map((entry, index) => (
          <Cell key={entry[nameKey]} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <Tooltip />
      <Legend />
    </PieChart>
  </ResponsiveContainer>
);
```

### 3.6 Scatter Plot (Correlation)

```jsx
import { ScatterChart, Scatter, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

const CorrelationChart = ({ data, xKey, yKey, xLabel, yLabel }) => (
  <ResponsiveContainer width="100%" height="100%">
    <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
      <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
      <XAxis type="number" dataKey={xKey} name={xLabel} stroke="#94A3B8" />
      <YAxis type="number" dataKey={yKey} name={yLabel} stroke="#94A3B8" />
      <Tooltip
        cursor={{ strokeDasharray: '3 3' }}
        contentStyle={{ backgroundColor: '#1E293B', border: '1px solid #334155' }}
      />
      <Scatter data={data} fill="#8B5CF6" />
    </ScatterChart>
  </ResponsiveContainer>
);
```

## 4. Palette chromatique

### 4.1 Couleurs de fond (Dark Theme)

| Usage | Classe Tailwind | Hex |
|-------|-----------------|-----|
| Background principal | bg-slate-900 | #0F172A |
| Surface (cards) | bg-slate-800 | #1E293B |
| Surface elevee | bg-slate-700 | #334155 |
| Bordures | border-slate-700 | #334155 |

### 4.2 Couleurs de texte

| Usage | Classe Tailwind | Hex |
|-------|-----------------|-----|
| Texte principal | text-white | #FFFFFF |
| Texte secondaire | text-slate-300 | #CBD5E1 |
| Labels | text-slate-400 | #94A3B8 |
| Texte desactive | text-slate-500 | #64748B |

### 4.3 Couleurs d'accent (graphiques)

| Categorie | Classe Tailwind | Hex |
|-----------|-----------------|-----|
| Primaire | blue-500 | #3B82F6 |
| Secondaire | purple-500 | #8B5CF6 |
| Succes | green-500 | #10B981 |
| Avertissement | amber-500 | #F59E0B |
| Erreur | red-500 | #EF4444 |
| Info | cyan-500 | #06B6D4 |

## 5. Filtres

### 5.1 Structure des filtres

```jsx
const FilterBar = ({ filters, onChange, onReset }) => (
  <div className="flex flex-wrap gap-4 p-4 bg-slate-800 border-b border-slate-700">
    <DateRangeFilter
      startDate={filters.startDate}
      endDate={filters.endDate}
      onChange={(start, end) => onChange({ ...filters, startDate: start, endDate: end })}
    />
    <MultiSelectFilter
      label="Service"
      options={serviceOptions}
      selected={filters.services}
      onChange={(services) => onChange({ ...filters, services })}
    />
    <MultiSelectFilter
      label="Langue"
      options={langueOptions}
      selected={filters.langues}
      onChange={(langues) => onChange({ ...filters, langues })}
    />
    <ToggleFilter
      label="Device"
      options={['webapp', 'mobile']}
      selected={filters.devices}
      onChange={(devices) => onChange({ ...filters, devices })}
    />
    <button
      onClick={onReset}
      className="px-4 py-2 text-sm text-slate-300 hover:text-white transition-colors"
    >
      Reinitialiser
    </button>
  </div>
);
```

## 6. Conventions de nommage

### 6.1 Fichiers

```
src/
├── components/
│   ├── charts/
│   │   ├── LanguagesChart.jsx      # PascalCase
│   │   ├── SessionsEvolutionChart.jsx
│   │   └── index.js                # Barrel export
│   ├── filters/
│   │   ├── DateRangeFilter.jsx
│   │   └── MultiSelectFilter.jsx
│   └── ui/
│       ├── Card.jsx
│       └── KPICard.jsx
├── hooks/
│   ├── useSessionData.js           # camelCase avec prefixe use
│   └── useFilters.js
├── utils/
│   ├── dataAggregations.js         # camelCase
│   └── formatters.js
└── context/
    └── FilterContext.jsx
```

### 6.2 Variables et fonctions

```javascript
// Constantes en SCREAMING_SNAKE_CASE
const CHART_COLORS = ['#3B82F6', '#8B5CF6'];
const MAX_ITEMS_DISPLAYED = 10;

// Fonctions en camelCase
const calculateAverage = (data) => { };
const formatPercentage = (value) => { };

// Composants en PascalCase
const SessionsChart = () => { };
const KPICard = () => { };
```

## 7. Checklist de validation

Avant de considerer un dashboard comme termine, verifier :

- [ ] Tous les graphiques sont responsive (ResponsiveContainer)
- [ ] Les tooltips sont stylises de maniere coherente
- [ ] Les axes ont des labels explicites
- [ ] Les couleurs sont accessibles (contraste suffisant)
- [ ] Les filtres mettent a jour tous les graphiques
- [ ] Les etats vides sont geres (message "Aucune donnee")
- [ ] Les etats de chargement sont presents (skeleton/spinner)
- [ ] La grille est responsive sur mobile/tablet/desktop
- [ ] Aucun emoji n'est present dans l'interface
- [ ] Les valeurs numeriques ont le bon formatage
