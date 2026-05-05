# Elvin UI — Plan d'action

## État actuel (mai 2026)

- ✅ 23 composants UI documentés avec props, usage, et live preview
- ✅ Page `/components` avec sidebar, search, filtres par catégorie
- ✅ Page `/components/[id]` avec onglets Preview / Usage / Source
- ✅ Onglet **Source** — affiche le `.vue` complet pour copy-paste
- ✅ Page `/blocks` et `/templates` (grilles avec previews)
- ✅ Page `/docs` — Introduction, Installation, Theming, Contributing
- ✅ Syntax highlighting custom dans `UiCodeBlock`
- ✅ NavBar avec liens sociaux (GitHub, X, LinkedIn) desktop + mobile
- ✅ Mobile : sidebar auto-close, scrollbar fine, props table scrollable
- ✅ Tous les boutons CTA liés (Browse, GitHub, Docs, Footer)

---

## Phase 1 — Qualité composants (priorité haute) ← PROCHAINE ÉTAPE

### 1.1 Emits manquants dans les fiches
Ajouter une section **Emits** dans `ComponentDoc` et dans `[id].vue`.

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
Vérifier et mettre à jour les flags `isNew` dans `ui-components.ts`.

---

## Phase 2 — Homepage polish (priorité moyenne)

- [ ] Section "Recently added" — liste dynamique des composants `isNew`
- [ ] Stats animées : nb composants, blocks, templates
- [ ] Améliorer le SEO (og:image, meta description)

---

## Phase 3 — Footer enrichi (priorité basse)

Ajouter dans `FooterSection.vue` :
- Colonnes structurées : Resources, Connect
- Texte de license (MIT)

---

## Phase 4 — Blocks & Templates (priorité basse)

Même système que `/components` :
- Pages de détail `/blocks/[id]` et `/templates/[id]`
- Preview + code source de chaque block/template
- Templates : preview only + téléchargement zip (payant via Chariow)

---

## Conventions à respecter

- Toujours `<script setup lang="ts">`
- Props via `withDefaults(defineProps<Props>(), {...})`
- GSAP uniquement pour micro-interactions (hover, enter, exit)
- TailwindCSS only — pas de CSS custom sauf dans `main.css`
- Nommage : `UiXxx.vue` pour composants, `XxxSection.vue` pour blocks
- Chaque nouveau composant doit avoir une entrée dans `componentDocs` + un template preview dans `[id].vue`
