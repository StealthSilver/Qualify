# Components Documentation

This document provides an overview of all the components used in the Qualify landing page.

## Component Architecture

```
Page (app/page.tsx)
├── Navbar
├── Hero
├── Stats
├── About
├── Features
├── Testimonials
├── CTA
└── Footer
```

## Components Overview

### Navbar (`components/Navbar.tsx`)

**Purpose**: Fixed navigation bar with smooth scroll and background blur on scroll.

**Features**:
- Fixed position with backdrop blur
- Animated appearance on page load
- Gradient logo text
- Responsive mobile menu
- Smooth scroll to sections
- Glass morphism effect

**Props**: None (static links)

**Key Animations**:
- Fade in from top on mount
- Background blur on scroll
- Hover effects on links
- Mobile menu slide in

---

### Hero (`components/Hero.tsx`)

**Purpose**: Main landing section with headline, CTA buttons, and animated background.

**Features**:
- Large gradient headline
- Animated wave SVG background
- Floating gradient blobs
- Dual CTA buttons
- Stats showcase (50K+ Questions, 10K+ Users, 95% Success Rate)
- Scroll indicator animation

**Animations**:
- Staggered text appearance
- Flowing wave animation
- Button hover effects with gradient shift
- Scroll indicator bounce
- Stats counter on scroll into view

---

### Stats (`components/Stats.tsx`)

**Purpose**: Display key metrics with animated counting.

**Features**:
- Animated number counting
- 4 key statistics
- Gradient text
- Animated progress bars
- Hover scale effects

**Metrics**:
- 50,000+ Practice Questions
- 10,000+ Active Learners
- 95% Success Rate
- 500+ Mock Tests

**Animations**:
- Numbers count up on scroll into view
- Gradient underline animation
- Hover scale effect

---

### About (`components/About.tsx`)

**Purpose**: Explain the Qualify philosophy and approach.

**Features**:
- 3 philosophy cards
- Icon-based design
- Glass morphism cards
- Gradient accents
- Brand messaging section

**Philosophy Cards**:
1. **Consistency > Motivation**
   - Icon: Target
   - Color: Indigo to Purple
   
2. **Practice > Theory**
   - Icon: Brain
   - Color: Purple to Pink
   
3. **Data-Driven Growth**
   - Icon: TrendingUp
   - Color: Pink to Rose

**Animations**:
- Card slide up on scroll
- Icon rotation on hover
- Text gradient effect on hover
- Progress bar animation

---

### Features (`components/Features.tsx`)

**Purpose**: Showcase the 5 core features of the platform.

**Features**:
- Grid layout (3 columns on desktop)
- Icon-based cards
- Glass morphism effect
- Gradient borders
- Glow effects on hover
- 3D tilt animation

**Feature Cards**:
1. **Daily Practice Questions**
   - Icon: BookOpen
   - Gradient: Indigo to Blue
   
2. **Smart Analytics Dashboard**
   - Icon: BarChart3
   - Gradient: Purple to Pink
   
3. **Mock Test Simulation**
   - Icon: Timer
   - Gradient: Pink to Rose
   
4. **Weak Topic Detection**
   - Icon: AlertCircle
   - Gradient: Cyan to Blue
   
5. **Leaderboard & Ranking**
   - Icon: Trophy
   - Gradient: Amber to Orange

**Animations**:
- Card lift on hover
- 3D rotation effect
- Glow expansion
- Icon rotation
- Border animation

---

### Testimonials (`components/Testimonials.tsx`)

**Purpose**: Display user success stories and social proof.

**Features**:
- 4 testimonial cards
- Glass morphism design
- Star ratings
- Avatar initials
- Success metrics banner

**Testimonials**:
1. Arjun Sharma - JEE Advanced AIR 234
2. Priya Mehta - NEET AIR 156
3. Karthik Reddy - JEE Mains 99.8%ile
4. Sneha Gupta - NEET 680/720

**Metrics Banner**:
- 4.9/5 Average Rating
- 10K+ Happy Students
- 95% Success Rate

**Animations**:
- Card slide up
- Avatar rotation on hover
- Quote fade in
- Star rating stagger
- Border animation

---

### CTA (`components/CTA.tsx`)

**Purpose**: Strong call-to-action section to drive conversions.

**Features**:
- Large gradient background
- Dual CTA buttons
- Benefits checklist
- Glass morphism card
- Animated gradient background

**Benefits**:
- Start practicing in under 2 minutes
- No credit card required
- Cancel anytime
- Join 10,000+ active learners

**Animations**:
- Background gradient shift
- Button hover effects
- Text stagger animation
- Checklist slide in

---

### Footer (`components/Footer.tsx`)

**Purpose**: Site footer with links and social media.

**Features**:
- Multi-column link layout
- Social media icons
- Scroll to top button
- Brand information
- Legal links

**Link Sections**:
- Product (Features, Pricing, Testimonials, FAQ)
- Company (About, Blog, Careers, Contact)
- Resources (Documentation, Help Center, Community, Status)

**Social Links**:
- Twitter
- GitHub
- LinkedIn
- Email

**Animations**:
- Link underline on hover
- Social icon lift on hover
- Scroll to top button bounce
- Staggered link appearance

---

## Design Patterns Used

### Glass Morphism
- `.glass` - Light blur with transparent background
- `.glass-strong` - Stronger blur effect

### Gradient Text
- `.gradient-text` - Animated gradient text effect

### Noise Texture
- `.noise` - Subtle texture overlay

### Animations
- `whileInView` - Trigger on scroll into view
- `whileHover` - Interactive hover states
- `whileTap` - Click feedback
- Staggered children animations

### Color System
- Primary: Indigo (#4f46e5)
- Secondary: Purple (#7c3aed)
- Accent: Pink (#ec4899)
- Background: Dark Green (#070a05)

---

## Accessibility Features

- Focus visible states
- Keyboard navigation
- Semantic HTML
- ARIA labels on interactive elements
- Reduced motion support
- Proper heading hierarchy

---

## Performance Optimizations

- Server Components where possible
- Client Components only when needed
- Lazy loading with viewport detection
- Optimized animations with Framer Motion
- CSS-based animations where possible
- Efficient re-renders with React hooks

---

## Responsive Design

All components are fully responsive with:
- Mobile-first approach
- Breakpoints: sm, md, lg
- Flexible grid layouts
- Touch-friendly interaction areas
- Adaptive typography

---

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Android)

---

## Dependencies

- `framer-motion` - Animation library
- `lucide-react` - Icon library
- `next` - React framework
- `react` - UI library
- `tailwindcss` - Utility CSS framework
