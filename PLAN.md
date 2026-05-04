# Elvin UI — Plan d'action

## État actuel (mai 2026)

- ✅ 23 composants UI documentés avec props, usage, et live preview
- ✅ Page `/components` avec sidebar, search, filtres par catégorie
- ✅ Page `/components/[id]` avec preview/code, props table, prev/next
- ✅ Page `/blocks` et `/templates` (grilles avec previews)
- ✅ Syntax highlighting custom dans `UiCodeBlock`
- ✅ NavBar avec liens sociaux (GitHub, X, LinkedIn)
- ✅ Mobile : sidebar auto-close, scrollbar fine

---

## Phase 1 — Qualité composants (priorité haute)

### 1.1 Emits manquants dans les fiches
Les props tables ne documentent pas les emits. Ajouter une section **Emits** dans `ComponentDoc` et dans `[id].vue`.

Composants concernés :
- `UiTag` → `remove`
- `UiAlert` → `dismiss`
- `UiModal` → `update:modelValue`
- `UiToast` → `close`
- `UiSelect` → `update:modelValue`
- `UiCheckbox`, `UiToggle`, `UiButtonGroup`, `UiPagination`, `UiTabs` → `update:modelValue`

### 1.2 Slots manquants dans les fiches
- `UiModal` → `#header`, `#footer`, `default`
- `UiCard` → `default`
- `UiDropdown` → `default` (trigger)
- `UiTooltip` → `default` (trigger)
- `UiTable` → `#[key]` dynamique

### 1.3 Marquer les nouveaux composants
Vérifier et mettre à jour les flags `isNew` dans `ui-components.ts` (alert, switch, icon-button sont déjà marqués).

---

## Phase 2 — Page `/docs` (priorité haute)

Architecture de la sidebar docs (modèle identique à `/components`) :

```
Getting Started
  ├── Introduction
  ├── Installation
  └── Configuration (thème, accent color)

Usage
  ├── Copy-paste workflow
  ├── Nuxt 4 auto-imports
  └── GSAP animations

Theming
  ├── CSS variables
  └── Changer l'accent color

Contributing
  └── Ajouter un composant
```

### Fichiers à créer
- `pages/docs.vue` — layout parent avec sidebar (même pattern que `components.vue`)
- `pages/docs/index.vue` — Introduction
- `pages/docs/installation.vue`
- `pages/docs/theming.vue`
- `pages/docs/contributing.vue`
- `data/docs.ts` — structure de la sidebar docs

### Contenu clé de la page Installation
```bash
# 1. Créer un projet Nuxt 4
npx nuxi@latest init my-app

# 2. Installer les dépendances
npm install gsap @nuxt/icon

# 3. Copier les composants depuis elvin-ui
# 4. Ajouter dans nuxt.config.ts
modules: ['@nuxt/icon']
```

---

## Phase 3 — Homepage polish (priorité moyenne)

- [ ] Section "Recently added" — liste dynamique des composants `isNew`
- [ ] Stats animées : nb composants, blocks, templates
- [ ] CTA vers `/docs` avec snippet de code
- [ ] Améliorer le SEO (og:image, meta description)

---

## Phase 4 — Footer enrichi (priorité basse)

Ajouter dans `FooterSection.vue` :
- Colonne "Resources" : Components, Blocks, Templates, Docs
- Colonne "Connect" : GitHub, X, LinkedIn
- Texte de license (MIT)

---

## Phase 5 — Blocks & Templates (priorité basse)

Même système que `/components` :
- Pages de détail `/blocks/[id]` et `/templates/[id]`
- Documentation + code source de chaque block/template
- Preview en iframe ou composant direct

---

## Conventions à respecter

- Toujours `<script setup lang="ts">`
- Props via `withDefaults(defineProps<Props>(), {...})`
- GSAP uniquement pour micro-interactions (hover, enter, exit)
- TailwindCSS only — pas de CSS custom sauf dans `main.css`
- Nommage : `UiXxx.vue` pour composants, `XxxSection.vue` pour blocks
- Chaque nouveau composant doit avoir une entrée dans `componentDocs` + un template preview dans `[id].vue`
