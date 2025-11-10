# Forhem PBC Deployment Guide

## Overview

This guide covers the deployment process for the Forhem PBC website, including development setup, production deployment, and maintenance procedures.

## Prerequisites

### Development Environment

**Required Software**:
- Node.js 18.x or higher
- pnpm (recommended) or npm/yarn
- Git
- VS Code (recommended)

**System Requirements**:
- 8GB RAM minimum
- 20GB available disk space
- Stable internet connection

### Development Setup

```bash
# Clone the repository
git clone https://github.com/stevenknowswhy/ForhemPBC.git
cd ForhemPBC

# Install dependencies
pnpm install

# Copy environment template
cp .env.template .env.local

# Start development server
pnpm dev
```

## Environment Configuration

### Environment Variables

```env
# Application Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_APP_NAME=Forhem PBC
NODE_ENV=development

# Stripe Configuration (for future payment processing)
STRIPE_SECRET_KEY=sk_test_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...

# Analytics (Phase 2)
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
NEXT_PUBLIC_HOTJAR_ID=XXXXXX

# API Keys (Phase 2)
NEXT_PUBLIC_MAPBOX_API_KEY=pk.xxxxxxxxxxxxxx
NEXT_PUBLIC_SENTRY_DSN=https://xxxxxxxxxxxxx.ingest.sentry.io/xxxxx
```

### Environment Files

- `.env.local` - Local development (gitignored)
- `.env.production` - Production environment
- `.env.template` - Template with required variables

## Development Workflow

### Branch Strategy

**Main Branches**:
- `main` - Production-ready code
- `develop` - Integration branch
- `fix/batch-x-emergency` - Emergency fixes

**Feature Branches**:
- `feature/feature-name` - New features
- `fix/issue-description` - Bug fixes
- `hotfix/critical-fix` - Urgent production fixes

### Git Workflow

```bash
# Create feature branch
git checkout -b feature/new-feature

# Make changes and commit
git add .
git commit -m "feat: add new feature description"

# Push to remote
git push origin feature/new-feature

# Create pull request
# (via GitHub UI)
```

### Commit Message Convention

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

**Types**:
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes
- `refactor`: Code refactoring
- `test`: Test additions/changes
- `chore`: Maintenance tasks

**Examples**:
```
feat(tools): add revenue calculator component
fix(contact): resolve form validation issue
docs(readme): update deployment instructions
```

## Build Process

### Development Build

```bash
# Start development server with hot reload
pnpm dev

# Development build (for testing)
pnpm build:dev
```

### Production Build

```bash
# Install production dependencies
pnpm install --prod

# Build for production
pnpm build

# Start production server
pnpm start

# Type checking
pnpm type-check

# Linting
pnpm lint
```

### Build Optimization

**Next.js Configuration**:
```javascript
// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  experimental: {
    optimizePackageImports: ['lucide-react']
  },
  images: {
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384]
  }
};

module.exports = nextConfig;
```

## Deployment Platforms

### Vercel (Recommended)

**Setup**:
1. Connect GitHub repository to Vercel
2. Configure environment variables
3. Set build command: `pnpm build`
4. Set output directory: `.next`
5. Deploy automatically on push to `main`

**Environment Variables in Vercel**:
- Navigate to Project Settings → Environment Variables
- Add all required variables from `.env.template`
- Mark sensitive variables as "secret"

**Custom Domain**:
- Add custom domain in Vercel dashboard
- Configure DNS records (CNAME or A record)
- Enable automatic HTTPS

### Netlify

**Setup**:
1. Connect GitHub repository
2. Configure build settings:
   - Build command: `pnpm build`
   - Publish directory: `.next`
3. Add environment variables
4. Deploy on push to `main`

**Netlify Configuration**:
```toml
# netlify.toml
[build]
  command = "pnpm build"
  publish = ".next"

[build.environment]
  NODE_VERSION = "18"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

### AWS Amplify

**Setup**:
1. Connect GitHub repository
2. Configure build settings:
   - Build command: `pnpm build`
   - Base directory: `/`
   - Output directory: `.next`
3. Add environment variables
4. Configure custom domain and SSL

### Self-Hosted (Docker)

**Dockerfile**:
```dockerfile
FROM node:18-alpine AS base

# Install dependencies only when needed
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY package.json pnpm-lock.yaml* ./
RUN corepack enable pnpm && pnpm install --frozen-lockfile

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN corepack enable pnpm && pnpm run build

# Production image, copy all the files and run next
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

**Docker Compose**:
```yaml
version: '3.8'

services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - NEXT_PUBLIC_APP_URL=https://forhem.com
    restart: unless-stopped
```

## Performance Monitoring

### Core Web Vitals

**Monitoring Tools**:
- Google PageSpeed Insights
- WebPageTest
- Chrome DevTools Lighthouse
- Vercel Analytics (built-in)

**Target Metrics**:
- Largest Contentful Paint (LCP): < 2.5s
- First Input Delay (FID): < 100ms
- Cumulative Layout Shift (CLS): < 0.1

### Optimization Techniques

**Image Optimization**:
```tsx
import Image from 'next/image';

<Image
  src="/image.jpg"
  alt="Description"
  width={800}
  height={600}
  priority={false}
  placeholder="blur"
  blurDataURL="data:image/jpeg;base64,..."
/>
```

**Code Splitting**:
```tsx
// Dynamic imports for heavy components
const HeavyComponent = dynamic(() => import('./HeavyComponent'), {
  loading: () => <div>Loading...</div>,
  ssr: false
});
```

## Security Best Practices

### Environment Security

- Never commit `.env.local` files
- Use secret management services
- Rotate API keys regularly
- Use HTTPS in production

### Application Security

**Headers Configuration**:
```javascript
// next.config.js
const securityHeaders = [
  {
    key: 'X-DNS-Prefetch-Control',
    value: 'on'
  },
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload'
  },
  {
    key: 'X-XSS-Protection',
    value: '1; mode=block'
  },
  {
    key: 'X-Frame-Options',
    value: 'DENY'
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff'
  }
];

module.exports = {
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: securityHeaders
      }
    ];
  }
};
```

### Dependency Security

```bash
# Audit dependencies for vulnerabilities
pnpm audit

# Update dependencies
pnpm update

# Check for outdated packages
pnpm outdated
```

## Error Handling and Monitoring

### Error Tracking

**Sentry Integration** (Phase 2):
```javascript
// sentry.client.config.js
import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  environment: process.env.NODE_ENV,
});
```

### Logging

**Structured Logging**:
```javascript
// lib/logger.ts
export const logger = {
  info: (message: string, data?: any) => {
    console.log(JSON.stringify({
      level: 'info',
      message,
      data,
      timestamp: new Date().toISOString()
    }));
  },
  error: (message: string, error?: any) => {
    console.error(JSON.stringify({
      level: 'error',
      message,
      error: error?.stack || error,
      timestamp: new Date().toISOString()
    }));
  }
};
```

## Backup and Recovery

### Database Backups

**Automated Backups**:
- Daily database backups
- Weekly full system backups
- Off-site backup storage
- Backup retention policy (30 days)

### Recovery Procedures

1. **Identify Issue**: Monitor alerts and error reports
2. **Assess Impact**: Determine affected systems and users
3. **Implement Fix**: Deploy patch or rollback changes
4. **Verify Recovery**: Test all systems and functionality
5. **Communicate**: Notify stakeholders of resolution

## Maintenance Schedule

### Daily Tasks

- Monitor system performance and uptime
- Review error logs and alerts
- Check security notifications
- Verify backup completion

### Weekly Tasks

- Update dependencies (security patches)
- Review analytics and performance metrics
- Clean up temporary files and logs
- Test critical functionality

### Monthly Tasks

- Full security audit
- Performance optimization review
- Content updates and publishing
- Documentation updates

### Quarterly Tasks

- Major dependency updates
- Security penetration testing
- Accessibility audit
- Disaster recovery testing

## Scaling Considerations

### Horizontal Scaling

**Load Balancer Configuration**:
```nginx
upstream app {
    server app1:3000;
    server app2:3000;
    server app3:3000;
}

server {
    listen 80;
    location / {
        proxy_pass http://app;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

### Database Scaling

**Read Replicas**:
- Primary database for writes
- Read replicas for analytics
- Connection pooling
- Query optimization

### CDN Configuration

**CloudFlare Settings**:
- Static asset caching
- DDoS protection
- SSL termination
- Geographic distribution

## Troubleshooting

### Common Issues

**Build Failures**:
```bash
# Clear build cache
rm -rf .next

# Clear node modules
rm -rf node_modules pnpm-lock.yaml

# Fresh install
pnpm install
pnpm build
```

**Memory Issues**:
```bash
# Increase Node.js memory limit
export NODE_OPTIONS="--max-old-space-size=4096"
pnpm build
```

**Port Conflicts**:
```bash
# Find process using port 3000
lsof -ti:3000

# Kill process
kill -9 $(lsof -ti:3000)
```

### Debug Mode

```bash
# Run with debug logging
DEBUG=* pnpm dev

# Build with verbose output
pnpm build --debug
```

## Rollback Procedures

### Emergency Rollback

```bash
# Rollback to previous commit
git checkout [previous-commit-hash]

# Force push rollback
git push --force-with-lease origin main

# Trigger redeployment
# (depends on hosting platform)
```

### Blue-Green Deployment

1. Deploy new version to staging environment
2. Run smoke tests and health checks
3. Switch traffic to new version
4. Monitor for issues
5. Keep previous version available for rollback

## Compliance and Governance

### PBC Compliance

**Transparency Requirements**:
- Public impact reporting
- Financial transparency
- Environmental impact disclosure
- Community benefit metrics

**Documentation Standards**:
- Technical documentation
- Process documentation
- Decision records
- Meeting minutes

### Audit Trail

**Change Management**:
- All changes tracked in Git
- Pull request approval process
- Deployment logs and records
- Rollback documentation

---

*This deployment guide is maintained as part of Forhem PBC's commitment to operational excellence and transparency. For questions or support, contact the development team.*