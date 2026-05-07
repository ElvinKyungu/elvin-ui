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
    description: 'Complete landing page for a SaaS product — hero, features, bento grid, pricing, and CTA sections. Optimised for conversions.',
    tags: ['Landing', 'Marketing', 'Nuxt 4', 'GSAP'],
    isNew: true,
    comingSoon: true,
  },
  'saas-pricing': {
    id: 'saas-pricing',
    name: 'Pricing Page',
    category: 'SaaS',
    description: 'Standalone pricing page with monthly/yearly toggle, three-tier layout, feature comparison table, and FAQ accordion.',
    tags: ['Pricing', 'SaaS', 'Nuxt 4'],
    comingSoon: true,
  },
  'saas-docs': {
    id: 'saas-docs',
    name: 'Documentation',
    category: 'SaaS',
    description: 'Full documentation site layout with collapsible sidebar, search, breadcrumb, and code blocks. Ready to fill with your content.',
    tags: ['Docs', 'SaaS', 'Sidebar'],
    comingSoon: true,
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
    description: 'CRM-style dashboard with contacts table, deal pipeline, and status badges. Built on top of UiTable and UiBadge.',
    tags: ['CRM', 'Dashboard', 'Table'],
    comingSoon: true,
  },
  'ecommerce-store': {
    id: 'ecommerce-store',
    name: 'Online Store',
    category: 'E-commerce',
    description: 'Product listing page with category filter, grid/list toggle, search, and pagination. Light theme.',
    tags: ['E-commerce', 'Store', 'Light'],
    isNew: true,
    comingSoon: true,
  },
  'ecommerce-product': {
    id: 'ecommerce-product',
    name: 'Product Page',
    category: 'E-commerce',
    description: 'Product detail page with image gallery, variant picker, add to cart, and related products.',
    tags: ['E-commerce', 'Product', 'Light'],
    comingSoon: true,
  },
  'ecommerce-checkout': {
    id: 'ecommerce-checkout',
    name: 'Checkout',
    category: 'E-commerce',
    description: 'Multi-step checkout with address form, payment fields, and order summary sidebar.',
    tags: ['E-commerce', 'Checkout', 'Forms'],
    comingSoon: true,
  },
  'marketing-agency': {
    id: 'marketing-agency',
    name: 'Agency Landing',
    category: 'Marketing',
    description: 'Bold agency homepage with gradient hero, work showcase grid, services section, and team cards.',
    tags: ['Agency', 'Landing', 'Dark'],
    comingSoon: true,
  },
  'marketing-startup': {
    id: 'marketing-startup',
    name: 'Startup Landing',
    category: 'Marketing',
    description: 'Clean startup landing page with split-feature layout, testimonials, and a magnetic CTA.',
    tags: ['Startup', 'Landing', 'GSAP'],
    comingSoon: true,
  },
  'blog-home': {
    id: 'blog-home',
    name: 'Blog Home',
    category: 'Blog',
    description: 'Blog index page with featured post hero, article card grid, category filter, and newsletter signup.',
    tags: ['Blog', 'Content', 'Light'],
    comingSoon: true,
  },
  'blog-post': {
    id: 'blog-post',
    name: 'Blog Post',
    category: 'Blog',
    description: 'Article detail page with reading progress bar, table of contents, author card, and related posts.',
    tags: ['Blog', 'Article', 'Light'],
    comingSoon: true,
  },
  portfolio: {
    id: 'portfolio',
    name: 'Portfolio',
    category: 'Portfolio',
    description: 'Personal portfolio with animated hero, filterable project grid, skills section, and contact form.',
    tags: ['Portfolio', 'Personal', 'GSAP'],
    comingSoon: true,
  },
}
