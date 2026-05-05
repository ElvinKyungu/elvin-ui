export interface BlockDoc {
  id: string
  name: string
  category: string
  description: string
  filename: string
  component: string
  isNew?: boolean
}

export const blockDocs: Record<string, BlockDoc> = {
  navbar: {
    id: 'navbar',
    name: 'Navigation Bar',
    category: 'Navigation',
    description: 'Sticky navbar with logo, navigation links, social icons (GitHub, X, LinkedIn), and a GSAP-animated mobile drawer.',
    filename: 'NavBar',
    component: 'NavBar',
  },
  hero: {
    id: 'hero',
    name: 'Hero Section',
    category: 'Hero',
    description: 'Full-width hero with a radial accent glow, animated badge, headline, subline, and dual CTA buttons. GSAP staggered entrance.',
    filename: 'HeroSection',
    component: 'HeroSection',
    isNew: true,
  },
  marquee: {
    id: 'marquee',
    name: 'Marquee Strip',
    category: 'Marquee',
    description: 'Infinite horizontal scrolling ticker with duplicated items for seamless looping. CSS animation only — zero JS.',
    filename: 'MarqueeStrip',
    component: 'MarqueeStrip',
  },
  'split-feature': {
    id: 'split-feature',
    name: 'Split Feature',
    category: 'Features',
    description: 'Two-column layout with a text panel and a visual/code panel. GSAP scroll-triggered entrance animation.',
    filename: 'SplitFeatureSection',
    component: 'SplitFeatureSection',
  },
  bento: {
    id: 'bento',
    name: 'Bento Grid',
    category: 'Bento',
    description: 'Bento-style stats grid with a GSAP count-up animation. Component count is dynamically sourced from the data layer.',
    filename: 'BentoSection',
    component: 'BentoSection',
    isNew: true,
  },
  features: {
    id: 'features',
    name: 'Features Grid',
    category: 'Features',
    description: 'Six-card feature grid with icons, titles, and descriptions. GSAP scroll-triggered entrance with stagger.',
    filename: 'FeaturesSection',
    component: 'FeaturesSection',
  },
  'scroll-reveal': {
    id: 'scroll-reveal',
    name: 'Scroll Reveal Text',
    category: 'Content',
    description: 'Word-by-word scroll-driven text reveal powered by GSAP ScrollTrigger. Each word fades from muted to full brightness as you scroll.',
    filename: 'ScrollRevealText',
    component: 'ScrollRevealText',
  },
  pricing: {
    id: 'pricing',
    name: 'Pricing Section',
    category: 'Pricing',
    description: 'Three-tier pricing layout with Free, Pro (highlighted), and Enterprise cards. GSAP hover-lift on each card.',
    filename: 'PricingSection',
    component: 'PricingSection',
  },
  'magnetic-cta': {
    id: 'magnetic-cta',
    name: 'Magnetic CTA',
    category: 'CTA',
    description: 'CTA section with a magnetic button that follows the cursor using a GSAP spring animation for a premium feel.',
    filename: 'MagneticCTA',
    component: 'MagneticCTA',
    isNew: true,
  },
  cta: {
    id: 'cta',
    name: 'CTA Section',
    category: 'CTA',
    description: 'Simple, focused call-to-action section with headline, subline, and two action buttons on a gradient background.',
    filename: 'CTASection',
    component: 'CTASection',
  },
  footer: {
    id: 'footer',
    name: 'Footer',
    category: 'Footer',
    description: 'Four-column footer with brand + social icons, Resources, Get Started, and Connect columns. MIT license badge at the bottom.',
    filename: 'FooterSection',
    component: 'FooterSection',
  },
  'floating-stack': {
    id: 'floating-stack',
    name: 'Floating Stack',
    category: 'Showcase',
    description: 'Layered card stack with parallax float animations. Cards offset on scroll for a 3D depth effect.',
    filename: 'FloatingStack',
    component: 'FloatingStack',
  },
  stats: {
    id: 'stats',
    name: 'Stats Counter',
    category: 'Stats',
    description: 'Four-stat grid with GSAP count-up animation on scroll. Each stat has an icon, numeric value, label, and description.',
    filename: 'StatsCounter',
    component: 'StatsCounter',
  },
}
