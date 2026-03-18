# Deployment Guide

This guide covers how to deploy the Qualify landing page to various platforms.

## 🚀 Quick Deploy Options

### Vercel (Recommended)

Vercel is the easiest way to deploy Next.js applications.

#### Option 1: Deploy from GitHub

1. Push your code to GitHub
2. Visit [vercel.com](https://vercel.com)
3. Click "Import Project"
4. Select your repository
5. Click "Deploy"

#### Option 2: Deploy using Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Navigate to project
cd Landing

# Deploy
vercel
```

---

### Netlify

#### Deploy using Netlify CLI

```bash
# Install Netlify CLI
npm i -g netlify-cli

# Navigate to project
cd Landing

# Build
npm run build

# Deploy
netlify deploy --prod
```

Build settings:
- **Build command**: `npm run build`
- **Publish directory**: `.next`

---

### Railway

```bash
# Install Railway CLI
npm i -g @railway/cli

# Navigate to project
cd Landing

# Login
railway login

# Deploy
railway up
```

---

### Docker

#### Dockerfile

Create a `Dockerfile` in the `Landing` directory:

```dockerfile
FROM node:23-alpine AS base

FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm ci

FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN npm run build

FROM base AS runner
WORKDIR /app

ENV NODE_ENV production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

CMD ["node", "server.js"]
```

#### Build and Run

```bash
# Build
docker build -t qualify-landing .

# Run
docker run -p 3000:3000 qualify-landing
```

---

## 🔧 Environment Variables

Currently, no environment variables are required. If you add API integrations in the future:

Create `.env.local`:

```env
NEXT_PUBLIC_API_URL=https://api.qualify.com
```

---

## 📊 Production Checklist

Before deploying to production:

- [ ] Test on multiple devices and browsers
- [ ] Check performance with Lighthouse
- [ ] Verify all animations work smoothly
- [ ] Test mobile responsiveness
- [ ] Ensure all links work
- [ ] Add Google Analytics (if needed)
- [ ] Set up error tracking (e.g., Sentry)
- [ ] Configure custom domain
- [ ] Set up SSL certificate
- [ ] Test page speed
- [ ] Verify SEO meta tags
- [ ] Check accessibility with axe DevTools

---

## 🎯 Performance Tips

### Image Optimization

If you add images later:

```tsx
import Image from 'next/image';

<Image
  src="/hero-image.jpg"
  alt="Description"
  width={1200}
  height={800}
  priority
/>
```

### Font Optimization

Already implemented with `next/font/google`:

```tsx
import { Geist } from 'next/font/google';

const geist = Geist({
  subsets: ['latin'],
  display: 'swap',
});
```

---

## 📈 Monitoring

### Vercel Analytics

Add to `app/layout.tsx`:

```tsx
import { Analytics } from '@vercel/analytics/react';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
```

Install:
```bash
npm install @vercel/analytics
```

---

## 🔒 Security Headers

Add to `next.config.ts`:

```typescript
const nextConfig = {
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
        ],
      },
    ];
  },
};
```

---

## 🌐 Custom Domain

### Vercel

1. Go to project settings
2. Click "Domains"
3. Add your custom domain
4. Follow DNS setup instructions

### Cloudflare (Optional)

For additional DDoS protection and CDN:

1. Add site to Cloudflare
2. Update nameservers
3. Enable "Full (strict)" SSL
4. Enable "Auto Minify"
5. Configure caching rules

---

## 🚨 Rollback

If deployment fails:

### Vercel
```bash
vercel rollback
```

### Netlify
- Go to "Deploys"
- Click on previous successful deploy
- Click "Publish deploy"

---

## 📱 PWA (Optional)

To make it a Progressive Web App:

```bash
npm install next-pwa
```

Update `next.config.ts`:

```typescript
const withPWA = require('next-pwa')({
  dest: 'public',
  disable: process.env.NODE_ENV === 'development',
});

module.exports = withPWA({
  // your config
});
```

---

## 🔍 SEO Checklist

- [x] Page title set
- [x] Meta description set
- [ ] Open Graph tags (add if needed)
- [ ] Twitter Card tags (add if needed)
- [ ] Sitemap.xml
- [ ] Robots.txt
- [ ] Structured data (JSON-LD)

---

## 📞 Support

For deployment issues:
- Vercel: [vercel.com/support](https://vercel.com/support)
- Netlify: [netlify.com/support](https://netlify.com/support)
- Railway: [railway.app/help](https://railway.app/help)

---

## 🎉 Post-Deployment

After successful deployment:

1. Test the live URL
2. Share with stakeholders
3. Monitor performance
4. Collect user feedback
5. Iterate and improve

**Your landing page is now live! 🚀**
