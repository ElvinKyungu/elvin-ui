export interface TemplateDoc {
  id: string
  name: string
  category: string
  description: string
  tags: string[]
  isNew?: boolean
  isPro?: boolean
  comingSoon?: boolean
  chariowUrl?: string
}

export const templateDocs: Record<string, TemplateDoc> = {
  'saas-landing': {
    id: 'saas-landing',
    name: 'SaaS Landing',
    category: 'SaaS',
    description: 'Complete landing page for a SaaS product — animated hero, features, bento grid, testimonials, pricing, and CTA. GSAP scroll reveals throughout.',
    tags: ['Landing', 'Marketing', 'Nuxt 4', 'GSAP'],
    isNew: true,
  },
  'saas-pricing': {
    id: 'saas-pricing',
    name: 'Pricing Page',
    category: 'SaaS',
    description: 'Standalone pricing page with monthly/yearly toggle, three-tier layout, feature comparison table, FAQ accordion, and upgrade modal.',
    tags: ['Pricing', 'SaaS', 'GSAP'],
    isNew: true,
  },
  'saas-docs': {
    id: 'saas-docs',
    name: 'Documentation',
    category: 'SaaS',
    description: 'Full documentation site with collapsible sidebar, ⌘K search modal, code blocks with copy, table of contents, and breadcrumb.',
    tags: ['Docs', 'SaaS', 'Sidebar'],
    isNew: true,
  },
  'dashboard-analytics': {
    id: 'dashboard-analytics',
    name: 'Analytics Dashboard',
    category: 'Dashboard',
    description: 'Admin dashboard with collapsible sidebar, 4 KPI cards with sparklines, SVG area chart, donut chart, bar chart, and recent transactions table.',
    tags: ['Dashboard', 'Analytics', 'Charts', 'GSAP'],
    isNew: true,
  },
  'dashboard-saas': {
    id: 'dashboard-saas',
    name: 'SaaS Metrics',
    category: 'Dashboard',
    description: 'SaaS metrics dashboard with MRR hero, multi-line growth chart, feature adoption bars, activity heatmap, and recent signups. No sidebar.',
    tags: ['Dashboard', 'SaaS', 'Charts', 'Heatmap'],
    isNew: true,
  },
  'dashboard-crm': {
    id: 'dashboard-crm',
    name: 'CRM Dashboard',
    category: 'Dashboard',
    description: 'CRM dashboard with contacts table, deal pipeline, contact detail drawer, add-contact modal, and animated KPI counters.',
    tags: ['CRM', 'Dashboard', 'Table', 'GSAP'],
    isNew: true,
  },
  'ecommerce-store': {
    id: 'ecommerce-store',
    name: 'Online Store',
    category: 'E-commerce',
    description: 'Dark product listing page with category filter, brand/rating filters, product quick-view modal, wishlist toggle, and cart drawer.',
    tags: ['E-commerce', 'Store', 'Dark', 'GSAP'],
    isNew: true,
  },
  'ecommerce-product': {
    id: 'ecommerce-product',
    name: 'Product Page',
    category: 'E-commerce',
    description: 'Dark product detail page with image gallery, color/quantity picker, add-to-cart animation, tabs (reviews, specs), and lightbox modal.',
    tags: ['E-commerce', 'Product', 'Dark', 'GSAP'],
    isNew: true,
  },
  'ecommerce-checkout': {
    id: 'ecommerce-checkout',
    name: 'Checkout',
    category: 'E-commerce',
    description: 'Dark 3-step checkout with shipping address, method selection, payment form, coupon code, order summary, and animated order success.',
    tags: ['E-commerce', 'Checkout', 'Forms', 'GSAP'],
    isNew: true,
  },
  'marketing-agency': {
    id: 'marketing-agency',
    name: 'Agency Landing',
    category: 'Marketing',
    description: 'Bold agency homepage with gradient hero, work showcase grid, services section, team cards, and contact form.',
    tags: ['Agency', 'Landing', 'Dark', 'GSAP'],
    isNew: true,
  },
  'marketing-startup': {
    id: 'marketing-startup',
    name: 'Startup Landing',
    category: 'Marketing',
    description: 'Clean startup landing page with split-feature layout, testimonials, pricing teaser, and a magnetic CTA button.',
    tags: ['Startup', 'Landing', 'GSAP'],
    isNew: true,
  },
  'blog-home': {
    id: 'blog-home',
    name: 'Blog Home',
    category: 'Blog',
    description: 'Blog index page with featured post hero, article card grid, category filter tabs, and newsletter signup.',
    tags: ['Blog', 'Content', 'Dark', 'GSAP'],
    isNew: true,
  },
  'blog-post': {
    id: 'blog-post',
    name: 'Blog Post',
    category: 'Blog',
    description: 'Article detail page with reading progress bar, sticky table of contents, reactions, comments, and related posts.',
    tags: ['Blog', 'Article', 'Dark'],
    isNew: true,
  },
  portfolio: {
    id: 'portfolio',
    name: 'Portfolio',
    category: 'Portfolio',
    description: 'Personal portfolio with animated hero, role cycling, filterable project grid, skills section, and contact form.',
    tags: ['Portfolio', 'Personal', 'GSAP'],
    isNew: true,
  },
}
