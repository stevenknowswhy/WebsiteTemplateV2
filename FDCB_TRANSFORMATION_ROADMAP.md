# Forhemit Data Center Builders (FDCB) - Transformation Roadmap

**Project**: Transform TemplateAppV2 → FDCB Production Website
**Style**: Light, architectural, high-end institutional
**Target Audience**: Enterprise clients, investors, engineering talent
**Access Model**: Public content + selective gated investor area

---

## 🏗️ Information Architecture

### Public Routes (Access: All)
```
/                           # Home - Credibility overview + architectural hero
/mission                    # Mission & Principles
/facility                   # Facility & Technology (renders, diagrams, specs)
/security                   # Compliance & Resilience (EMP, SCIF-ready, N+N)
/updates                    # Press & Build Updates
/careers                    # Roles, culture, benefits
/contact                    # Secure inquiry (role-based form + PGP)
/nda                        # Hosted NDA (sign → auto-provision)
```

### Gated Investor Routes (Access: NDA + Auth)
```
/investors                  # Public teaser page with KPIs + "Request Access"
/investors/apply            # Access request form (NDA checkbox + identity)
/investors/login            # Magic link or passphrase authentication
/investors/room             # Data room landing (milestones, documents, KPIs)
/investors/docs/[slug]      # Document viewer (teasers + watermarking)
```

---

## 🎨 Visual System & Design Tokens

### Typography
```typescript
// Typography Hierarchy
fonts: {
  heading: "Public Sans" || "Söhne" || "Inter Display", // Geometric, architectural
  body: "Inter",                                       // Clean, readable
  accent: "Source Serif 4",                           // Optional serif for quotes
}
```

### Color Palette (CSS Variables)
```css
:root {
  --bg-primary: #F8F9FB;      /* Paper background */
  --text-primary: #0F172A;    /* Charcoal text */
  --text-muted: #6B7280;     /* Secondary text */
  --lines: #E6E8EC;           /* Strokes & dividers */
  --accent-primary: #0A61F7;  /* Primary blue (or #335CFF muted) */
  --accent-success: #0BA37F;  /* Engineering green */
  --accent-gold: #C6A15B;     /* Investor highlights (sparingly) */
}
```

### Layout System
- **Grid**: 12-column, generous gutters
- **Vertical Rhythm**: 64-80px on desktop
- **Spacing**: 8px base unit system
- **Dividers**: Thin keylines (1px)
- **Shadows**: Subtle (blur 12, spread 0, opacity 10%)

### Motion & Animation
```typescript
motion: {
  duration: "200-250ms",
  easing: "ease-out",
  scrollReveal: "fade + 8px translate",
  diagramHover: "circuit path animation",
}
```

---

## 🖼️ Imagery & Visual Assets

### Required Hero Renders (3-5)
1. **Sectional Cutaway**: Underground hall + mezzanine view
2. **Isometric Overview**: Full facility layout
3. **Night Exterior**: Above-ground entrance + security perimeter
4. **Technical Interior**: Rack systems + cooling infrastructure
5. **Security Features**: Blast doors, EMP shielding details

### Technical Diagrams
- **Modular System Flow**: Civil → MEP → White Space → Fiber
- **Defense-in-Depth Ladder**: Site → Enclosure → Module → Rack → Data
- **Power Distribution**: Redundancy mapping (N+N)
- **Cooling Systems**: Airflow and heat rejection
- **Network Topology**: Tiered connectivity diagrams

### Styling Approach
- **Blueprint Overlays**: Subtle technical drawings on facility pages
- **Consistent Camera**: Matching lens and material rendering
- **Minimal Textures**: Clean, crisp lighting throughout
- **Technical Annotations**: Measurements and specifications

---

## 📄 Page-by-Page Implementation

### Home (`/`)
```tsx
// Hero Section
<HeroSection>
  <BackgroundImage={sectionalRender}
  <Headline="Sovereign-grade data infrastructure—delivered at private-sector speed."
  <Subhead="Underground. EMP-hardened. Built for AI era."
  <TrustBar={[permittingStrategy, prefabPartners, inspectionPlan, targetSchedule]}
  <CTAs={[
    { label: "See Facility", href: "/facility" },
    { label: "Request Investor Access", href: "/investors" },
    { label: "Careers", href: "/careers" }
  ]}
</HeroSection>

// Content Sections
<ThreePillars pillars={[speed, security, sovereignty]} />
<InteractiveDiagram hotspots={[power, cooling, blastWalls]} />
<MilestoneTracker />
<PartnerShowcase />
<CredibilityBlock />
<FinalCTA />
```

### Facility & Technology (`/facility`)
```tsx
<PageLayout>
  <TechnicalHero render={modularSystemDiagram} />
  <SpecSection
    title="Technical Specifications"
    specs={[
      { title: "Power", value: "MVA capacity", icon: lightning },
      { title: "Cooling", value: "kW/rack", icon: snowflake },
      { title: "Redundancy", value: "N+N", icon: shield },
      { title: "EMP Protection", value: "Hardened", icon: zap },
      { title: "SCIF Ready", value: "Compliant", icon: lock }
    ]}
  />
  <BlueprintOverlay section="power" />
  <TechnicalGallery renders={facilityRenders} />
</PageLayout>
```

### Security & Compliance (`/security`)
```tsx
<PageLayout>
  <DefenseInDepthLadder />
  <StandardsCompliance
    standards={[
      "UL Standards",
      "NFPA Compliance",
      "ICD 705 Pathways",
      "SOC2 Roadmap",
      "ISO 27001 Target"
    ]}
  />
  <AuditTrailProcess />
  <ResilienceBadges />
</PageLayout>
```

### Investor Teaser (`/investors`)
```tsx
<PageLayout gated={true}>
  <InstitutionalHero>
    <Headline="Institutional path to sovereign-grade compute capacity"
    <Subhead="We publish plans, track risks, and prove progress."
  </InstitutionalHero>
  <TimelineGraphic phases={projectPhases} />
  <KPIDashboard public={true} />
  <AccessRequestCTA />
</PageLayout>
```

---

## 🔐 Gated Investor Flow Implementation

### Access Request Flow
```typescript
// /investors/apply
<AccessRequestForm
  validationSchema={investorApplicationSchema}
  fields={[
    "company", "role", "workEmail", "phone",
    "fundAUM", "investmentHorizon", "accreditation"
  ]}
  ndaConsent={{
    required: true,
    documentLink: "/nda",
    version: "1.0"
  }}
  onSubmit={createInvestorApplication}
/>
```

### Authentication System
```typescript
// Supabase Auth Configuration
authConfig = {
  providers: ["magiclink"], // Passwordless magic links
  rowLevelSecurity: true,   // RLS policies for investor data
  sessionExpiry: "7d",      // Auto-expire access
  allowedDomains: [        // Restrict to business emails
    "gmail.com",
    "outlook.com",
    "company.com"
  ]
}
```

### Data Room Features
```typescript
// /investors/room
<DataRoom>
  <Watermark text={`Confidential - ${user.email} - ${timestamp}`} />
  <DocumentViewer
    documents={investorDocuments}
    watermark={true}
    downloadProtection={true}
    readReceipts={true}
  />
  <KPIDashboard
    metrics={["milestones", "budget", "timeline", "risks"]}
    accessLevel={user.tier}
  />
  <ActivityLog userAccess={true} />
</DataRoom>
```

---

## 🧩 Component Inventory

### Layout Components
- `Header.tsx` - Main navigation with investor auth state
- `Footer.tsx` - Institutional footer with compliance links
- `Nav.tsx` - Multi-level navigation with access indicators
- `Section.tsx` - Repeating section container
- `Grid.tsx` - 12-column responsive grid system

### UI Components (shadcn/ui based)
```typescript
// Base Components
Button, Card, Dialog, Tabs, Accordion, Tooltip, Sheet

// Custom Extensions
BlueprintButton, SpecCard, MilestoneTimeline,
SecurityBadge, InvestorCTA, DocumentWatermark
```

### Specialized Cards
```typescript
cards = {
  KPI: KPICard,              // Metrics display
  Milestone: MilestoneCard,  // Project timeline
  Spec: SpecCard,           // Technical specs
  Bio: BioCard,             // Team/advisor info
  Partner: PartnerCard      // Company logos
}
```

### Investor Components
```typescript
investor = {
  AccessRequestForm: InvestorAccessForm,
  NDAConsent: NDAAgreement,
  DataRoomList: DocumentLibrary,
  WatermarkedViewer: SecureDocumentViewer,
  AuthWall: InvestorAuthGate
}
```

### Visual Components
```typescript
visuals = {
  HeroRender: ArchitecturalHero,
  SectionalDiagram: InteractiveBlueprint,
  BlueprintDivider: SectionDivider,
  TechAnimation: CircuitAnimation
}
```

---

## ⚙️ Technical Implementation

### File Structure
```
/app
  /(public)               # Public pages
    /page.tsx            # Home
    /mission/page.tsx    # Mission & Principles
    /facility/page.tsx   # Facility specs
    /security/page.tsx   # Compliance
    /updates/page.tsx    # News/updates
    /careers/page.tsx    # Team/careers
    /contact/page.tsx    # Contact forms
    /nda/page.tsx        # NDA agreement

  /(investors)           # Gated investor area
    /investors/page.tsx        # Public teaser
    /investors/apply/page.tsx  # Access request
    /investors/login/page.tsx  # Authentication
    /investors/room/page.tsx   # Data room
    /investors/docs/[slug]/page.tsx  # Document viewer

/components
  /layout/               # Layout primitives
  /ui/                   # shadcn/ui components
  /cards/                # Specialized cards
  /investors/            # Investor-specific
  /visuals/              # Visual components

/lib
  auth.ts               # Investor authentication
  supabase.ts           # Database config
  zodSchemas.ts         # Form validation
  constants.ts          # Design tokens
  mdx.ts               # MDX processing

/content
  mission.mdx
  security.mdx
  facility.mdx

/styles
  globals.css
  tokens.css            # Design variables
```

### Key Libraries & Dependencies
```json
{
  "core": ["Next.js 16", "TypeScript", "Tailwind CSS"],
  "ui": ["shadcn/ui", "Radix Primitives", "Lucide React"],
  "content": ["MDX", "rehype-highlight", "remark-gfm"],
  "data": ["Supabase", "Zod", "React Hook Form"],
  "motion": ["Framer Motion"],
  "analytics": ["Plausible/Umami (optional)"],
  "security": ["next-secure-headers", "rate-limiter-flexible"]
}
```

---

## 📋 Development Priorities

### Phase 1: Core Infrastructure (Week 1-2)
1. **Design System Setup**
   - Implement design tokens
   - Create base components
   - Set up Tailwind config

2. **Information Architecture**
   - Define routing structure
   - Create layout templates
   - Implement navigation system

3. **Content Framework**
   - Set up MDX processing
   - Create placeholder content
   - Implement SEO metadata

### Phase 2: Public Pages (Week 3-4)
1. **Home Page**
   - Architectural hero
   - Three pillars section
   - Milestone tracker
   - Partner showcase

2. **Core Pages**
   - Mission & Principles
   - Facility specs
   - Security compliance
   - Contact forms

### Phase 3: Investor System (Week 5-6)
1. **Access Control**
   - NDA agreement page
   - Access request form
   - Magic link authentication

2. **Data Room**
   - Document viewer with watermarking
   - Investor dashboard
   - Activity tracking

### Phase 4: Polish & Launch (Week 7-8)
1. **Performance Optimization**
   - Image optimization
   - Bundle analysis
   - Core Web Vitals tuning

2. **Compliance & Security**
   - Accessibility audit
   - Security review
   - Privacy policy implementation

---

## 🎯 Success Metrics

### Technical Metrics
- **Performance**: LCP < 2.5s, CLS < 0.1, FID < 100ms
- **Accessibility**: WCAG 2.2 AA compliant
- **Security**: 100/100 on security headers scan

### Business Metrics
- **Investor Conversion**: Access request → Approval rate
- **Document Engagement**: Time spent in data room
- **Lead Quality**: Qualified inbound inquiries

---

## 🚀 Next Steps

### Immediate Actions
1. **Approve Visual System**: Confirm design tokens and direction
2. **Content Strategy**: Finalize copy for all pages
3. **Asset Production**: Commission renders and diagrams
4. **Technical Setup**: Initialize repository and CI/CD

### Development Kickoff
1. **Sprint 0**: Infrastructure setup (1 week)
2. **Sprint 1**: Core components (1 week)
3. **Sprint 2**: Public pages (2 weeks)
4. **Sprint 3**: Investor system (2 weeks)
5. **Sprint 4**: Polish & launch (1 week)

---

**Prepared for**: Forhemit Data Center Builders Team
**Timeline**: 8 weeks from approval
**Budget**: [To be determined based on asset requirements]
**Stakeholders**: Design, Engineering, Content, Leadership