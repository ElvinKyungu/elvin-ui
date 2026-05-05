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

## Phase 1 — Qualité composants ✅

- ✅ Emits documentés pour tous les composants concernés
- ✅ Slots documentés (Modal, Card, Dropdown, Tooltip, Table, Tag, Alert…)
- ✅ Onglet Source dans `[id].vue` — `.vue` complet pour copy-paste
- ⬜ 1.3 — Vérifier/mettre à jour les flags `isNew` dans `ui-components.ts`

---

## Phase 2 — Homepage polish ✅

- ✅ Section "Recently added" — liste dynamique des composants `isNew`
- ✅ Stats animées : nb composants dynamique via `allItems.length` dans BentoSection
- ✅ SEO : `useSeoMeta` sur toutes les pages (title, description, og:image, og:url, twitter card)
- ⬜ Créer `/public/og.png` (1200×630) — image de partage social

---

## Phase 3 — Footer enrichi ✅

- ✅ Colonnes structurées : Resources, Get started, Connect
- ✅ Icônes sociales (GitHub, X, LinkedIn) dans la brand column
- ✅ Texte de license MIT avec lien vers le fichier LICENSE

---

## Phase 4 — Blocks & Templates

- ✅ Pages de détail `/blocks/[id]` — Preview live + onglet Source (code complet)
- ✅ Cards dans `/blocks` cliquables → lien vers la page de détail
- ✅ `app/data/blocks.ts` — descriptions et mapping composants pour les 13 blocks
- ✅ `LICENSE` — MIT License
- ✅ Pages de détail `/templates/[id]` — preview wireframe + "What's included" + CTA "Notify me" / "Get template"
- ✅ `app/data/templates.ts` — descriptions, tags, comingSoon flag pour les 13 templates

---

## Conventions à respecter

- Toujours `<script setup lang="ts">`
- Props via `withDefaults(defineProps<Props>(), {...})`
- GSAP uniquement pour micro-interactions (hover, enter, exit)
- TailwindCSS only — pas de CSS custom sauf dans `main.css`
- Nommage : `UiXxx.vue` pour composants, `XxxSection.vue` pour blocks
- Chaque nouveau composant doit avoir une entrée dans `componentDocs` + un template preview dans `[id].vue`
