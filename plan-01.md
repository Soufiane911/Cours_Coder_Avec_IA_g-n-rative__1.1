# Plan de Refonte UI/UX - Dashboard Dashaalia

## Document : plan-01.md
## Date : 05/01/2026
## Version : 1.0

---

## 1. Diagnostic de l'existant

### 1.1 Problemes identifies

| Categorie | Probleme | Impact |
|-----------|----------|--------|
| Layout | Scroll vertical obligatoire | Critique |
| Layout | Sidebar fixe de 288px consomme trop d'espace | Eleve |
| Layout | Grille non optimisee (gaps de 24-32px) | Eleve |
| Layout | Header de 73px trop volumineux | Moyen |
| Design | Emojis presents dans les composants | Moyen |
| Design | Marges excessives (mb-12, mb-16, p-8) | Eleve |
| Design | Titres de sections redondants | Moyen |
| Charts | Hauteur fixe de 280px non adaptee | Eleve |
| Charts | Labels de legende trop grands | Moyen |
| UX | Filtres dans sidebar = clics supplementaires | Moyen |
| Performance | Composants non optimises (re-renders) | Faible |

### 1.2 Metriques actuelles (viewport 1920x1080)

- Header : 73px
- Sidebar : 288px (ou 64px collapsed)
- Content padding : 32px (p-8)
- Gaps entre sections : 32-64px
- Hauteur totale estimee : ~1800px (scroll necessaire)

### 1.3 Espace disponible cible

```
Viewport : 1920 x 1080
Header : 56px (reduction)
Filtres inline : 0px (integres dans header)
Contenu : 1024px
Marges : 16px top + bottom = 32px
```

---

## 2. Architecture cible

### 2.1 Structure de page (No-Scroll)

```
┌─────────────────────────────────────────────────────────────────────────────┐
│ HEADER (h-14 = 56px)                                                        │
│ [Logo] Dashaalia │ Periode [___] │ Service [v] │ Langue [v] │ Device │ 320  │
├─────────────────────────────────────────────────────────────────────────────┤
│ KPI ROW (h-20 = 80px)                                                       │
│ ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐           │
│ │ Sessions │ │  Duree   │ │   Note   │ │ Qualite  │ │ Erreurs  │           │
│ │   320    │ │ 24.5 min │ │  4.2/5   │ │   87%    │ │   12     │           │
│ └──────────┘ └──────────┘ └──────────┘ └──────────┘ └──────────┘           │
├────────────────────────────────────────┬────────────────────────────────────┤
│ EVOLUTION (col-span-5, h-[280px])      │ TOP LANGUES + SERVICES             │
│                                        │ (col-span-7, split vertical)       │
│ ┌────────────────────────────────────┐ │ ┌────────────────────────────────┐ │
│ │                                    │ │ │ Top 5 Langues (h-[130px])      │ │
│ │     Area Chart                     │ │ │ Horizontal Bar Chart           │ │
│ │     Sessions par semaine           │ │ └────────────────────────────────┘ │
│ │                                    │ │ ┌────────────────────────────────┐ │
│ │                                    │ │ │ Services (h-[130px])           │ │
│ └────────────────────────────────────┘ │ │ Donut Chart                    │ │
│                                        │ └────────────────────────────────┘ │
├────────────────────────────────────────┼────────────────────────────────────┤
│ INTERACTIONS (col-span-6, h-[260px])   │ QUALITE + NOTES (col-span-6)       │
│                                        │                                    │
│ ┌────────────────────────────────────┐ │ ┌────────────────────────────────┐ │
│ │                                    │ │ │ Gauge Qualite │ Gauge Notes    │ │
│ │     Stacked Bar Chart              │ │ │    (h-[120px])                 │ │
│ │     Patient vs Praticien           │ │ ├────────────────────────────────┤ │
│ │                                    │ │ │ Sparkline Distribution         │ │
│ │                                    │ │ │    (h-[120px])                 │ │
│ └────────────────────────────────────┘ │ └────────────────────────────────┘ │
└────────────────────────────────────────┴────────────────────────────────────┘
```

### 2.2 Calcul des hauteurs

```
Total viewport : 1080px
- Header : 56px
- Padding top : 8px
- KPI Row : 80px
- Gap : 8px
- Row 1 (Evolution + Langues/Services) : 280px
- Gap : 8px
- Row 2 (Interactions + Qualite) : 260px
- Padding bottom : 8px
-----------------------------------------
Total : 56 + 8 + 80 + 8 + 280 + 8 + 260 + 8 = 708px

Marge restante : 1080 - 708 = 372px (buffer de securite)
```

---

## 3. Modifications par composant

### 3.1 Header (Header.jsx)

**Avant :**
- Hauteur : ~73px
- Contenu : Logo + Titre + Toggle theme + Info

**Apres :**
- Hauteur : 56px (h-14)
- Contenu : Logo + Titre + Filtres inline + Total sessions

```jsx
// Structure cible
<header className="h-14 bg-slate-900 border-b border-slate-800 px-4 flex items-center gap-4">
  <Logo />
  <Divider />
  <DateRangeCompact />
  <ServiceSelect />
  <LanguageSelect />
  <DeviceToggle />
  <Spacer />
  <SessionCount />
  <ResetButton />
</header>
```

### 3.2 Sidebar (A SUPPRIMER)

La sidebar sera completement supprimee. Les filtres migrent dans le header.

### 3.3 DashboardGrid (DashboardGrid.jsx)

**Avant :**
- Grille 4 colonnes avec gaps de 24px
- Overflow-y-auto (scroll)

**Apres :**
- Grille 12 colonnes CSS Grid
- Height fixe (h-screen - header)
- Overflow hidden

```jsx
// Structure cible
<main className="h-[calc(100vh-56px)] p-2 bg-slate-900">
  <div className="h-full grid grid-cols-12 grid-rows-[80px_280px_260px] gap-2">
    {children}
  </div>
</main>
```

### 3.4 KPI Cards

**Avant :**
- 4 cartes dans grid-cols-4
- Hauteur variable avec padding p-6

**Apres :**
- 5 cartes compactes en ligne
- Hauteur fixe 80px
- Layout horizontal : icone + valeur + label

```jsx
// Structure cible
<div className="col-span-12 grid grid-cols-5 gap-2">
  <KPICard value={320} label="Sessions" trend="+12%" color="blue" />
  <KPICard value="24.5" unit="min" label="Duree moy." color="teal" />
  <KPICard value="4.2" unit="/5" label="Note moy." color="amber" />
  <KPICard value="87" unit="%" label="Qualite" color="green" />
  <KPICard value={12} label="Erreurs" trend="-3" color="red" />
</div>
```

### 3.5 Charts (Refonte complete)

#### SessionsEvolutionChart
- Type : LineChart -> AreaChart avec gradient
- Hauteur : 280px -> 260px (sans titre)
- Supprimer le titre h3 (contexte suffisant)

#### LanguagesChart
- Type : BarChart horizontal
- Limiter a 5 langues max
- Hauteur : 130px
- Labels compacts

#### ServicesChart
- Type : PieChart -> Donut Chart
- Hauteur : 130px
- Legende integree dans le centre

#### InteractionsChart
- Type : Stacked BarChart horizontal
- Hauteur : 240px
- Grouper par service (top 5)

#### QualityChart + RatingsChart
- Fusionner en un seul composant
- 2 gauges semi-circulaires cote a cote
- Sparkline de distribution en dessous

#### DurationChart
- Supprimer (information redondante avec KPI)
- Ou integrer comme mini-histogram dans le KPI

---

## 4. Palette de couleurs

### 4.1 Variables CSS

```css
:root {
  /* Fond */
  --bg-primary: #0F172A;
  --bg-card: #1E293B;
  --bg-hover: #334155;
  
  /* Accents medicaux */
  --medical-blue: #0EA5E9;
  --medical-teal: #14B8A6;
  --medical-indigo: #6366F1;
  --medical-cyan: #22D3EE;
  
  /* Donnees */
  --data-positive: #10B981;
  --data-warning: #F59E0B;
  --data-negative: #EF4444;
  
  /* Texte */
  --text-primary: #F8FAFC;
  --text-secondary: #94A3B8;
  --text-muted: #64748B;
  
  /* Bordures */
  --border-subtle: #334155;
}
```

### 4.2 Mapping Tailwind

| Variable | Tailwind Class |
|----------|----------------|
| --bg-primary | bg-slate-900 |
| --bg-card | bg-slate-800 |
| --bg-hover | bg-slate-700 |
| --medical-blue | text-sky-500 / bg-sky-500 |
| --medical-teal | text-teal-500 / bg-teal-500 |
| --text-primary | text-slate-50 |
| --text-secondary | text-slate-400 |
| --border-subtle | border-slate-700 |

---

## 5. Plan d'implementation

### Phase 1 : Restructuration du layout (Priorite HAUTE)

1. **Creer index.css v2** avec les nouvelles variables CSS
2. **Modifier App.jsx** :
   - Supprimer Sidebar
   - Integrer filtres dans Header
   - Restructurer DashboardContent avec grid 12 colonnes
3. **Modifier Header.jsx** :
   - Reduire hauteur a 56px
   - Ajouter filtres compacts inline
4. **Supprimer Sidebar.jsx** (deprecie)
5. **Modifier DashboardGrid.jsx** :
   - Grid 12 colonnes
   - Rows fixes (80px, 280px, 260px)

### Phase 2 : Refonte des KPI Cards (Priorite HAUTE)

1. **Creer KPICardCompact.jsx** :
   - Layout horizontal
   - Hauteur fixe 80px
   - Support icone + trend
2. **Integrer dans App.jsx**

### Phase 3 : Refonte des Charts (Priorite MOYENNE)

1. **SessionsEvolutionChart.jsx** :
   - Convertir en AreaChart
   - Supprimer titre
   - Ajuster hauteur
2. **LanguagesChart.jsx** :
   - Limiter a 5 items
   - Compacter hauteur
3. **ServicesChart.jsx** :
   - Convertir en Donut
   - Legende centrale
4. **Creer MetricsGauges.jsx** :
   - Fusionner Quality + Ratings
   - 2 gauges + sparkline
5. **InteractionsChart.jsx** :
   - Passer en horizontal
   - Top 5 services

### Phase 4 : Filtres compacts (Priorite MOYENNE)

1. **Creer FilterBar.jsx** (composant inline)
2. **Creer DateRangeCompact.jsx**
3. **Creer SelectCompact.jsx** (generique)
4. **Creer ToggleCompact.jsx**

### Phase 5 : Polish et optimisation (Priorite BASSE)

1. Supprimer tous les emojis
2. Ajuster les transitions (200ms)
3. Verifier le rendu sur 1920x1080
4. Tester les filtres
5. Optimiser les re-renders

---

## 6. Fichiers a modifier

| Fichier | Action | Priorite |
|---------|--------|----------|
| src/index.css | Refonte complete | P1 |
| src/App.jsx | Restructuration majeure | P1 |
| src/components/layout/Header.jsx | Refonte + filtres | P1 |
| src/components/layout/Sidebar.jsx | Supprimer | P1 |
| src/components/layout/DashboardGrid.jsx | Refonte grid 12 cols | P1 |
| src/components/ui/KPICard.jsx | Creer version compacte | P2 |
| src/components/charts/SessionsEvolutionChart.jsx | AreaChart | P3 |
| src/components/charts/LanguagesChart.jsx | Compacter | P3 |
| src/components/charts/ServicesChart.jsx | Donut | P3 |
| src/components/charts/QualityChart.jsx | Fusionner | P3 |
| src/components/charts/RatingsChart.jsx | Fusionner | P3 |
| src/components/charts/InteractionsChart.jsx | Horizontal | P3 |
| src/components/charts/DurationChart.jsx | Supprimer ou mini | P3 |
| src/components/filters/DateRangeFilter.jsx | Version compacte | P4 |
| src/components/filters/ServiceFilter.jsx | Version compacte | P4 |
| src/components/filters/LanguageFilter.jsx | Version compacte | P4 |
| src/components/filters/DeviceFilter.jsx | Version compacte | P4 |

---

## 7. Nouveaux composants a creer

| Composant | Description | Priorite |
|-----------|-------------|----------|
| FilterBar.jsx | Container horizontal pour filtres | P2 |
| KPICardCompact.jsx | KPI horizontal avec icone | P2 |
| MetricsGauges.jsx | Double gauge + sparkline | P3 |
| SelectCompact.jsx | Dropdown minimaliste | P4 |
| GaugeChart.jsx | Gauge semi-circulaire Recharts | P3 |

---

## 8. Checklist de validation finale

- [ ] Aucun scroll vertical sur 1920x1080
- [ ] Aucun scroll horizontal
- [ ] Header de 56px exactement
- [ ] 5 KPI visibles en ligne
- [ ] 6 visualisations dans la grille
- [ ] Filtres fonctionnels dans le header
- [ ] Palette medicale respectee
- [ ] Aucun emoji dans l'interface
- [ ] Tous les graphiques responsive dans leur conteneur
- [ ] Tooltips stylises uniformement
- [ ] Transitions de 200ms sur hover
- [ ] Performance : pas de lag visible

---

## 9. Estimation de temps

| Phase | Duree estimee |
|-------|---------------|
| Phase 1 : Layout | 2-3h |
| Phase 2 : KPI Cards | 1h |
| Phase 3 : Charts | 3-4h |
| Phase 4 : Filtres | 2h |
| Phase 5 : Polish | 1-2h |
| **Total** | **9-12h** |

---

## 10. Notes techniques

### 10.1 Grid CSS recommande

```css
.dashboard-grid {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-template-rows: 80px 280px 260px;
  gap: 8px;
  height: calc(100vh - 56px);
  padding: 8px;
}
```

### 10.2 Breakpoints

Ce dashboard est concu pour **desktop uniquement** (1920x1080 minimum).
Pas de responsive mobile pour cette version.

### 10.3 Performance

- Utiliser `React.memo` sur les composants de charts
- Eviter les recalculs inutiles avec `useMemo`
- Limiter les donnees affichees (top 5 langues, top 5 services)

---

**Fin du document plan-01.md**
