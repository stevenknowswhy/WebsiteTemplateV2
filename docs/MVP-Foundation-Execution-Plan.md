# Forhem PBC: MVP Foundation Execution Plan
**Phase 1 — 12 Week Sprint (Next 90 Days)**

> **Objective**: Ship a demonstrable, data-driven MVP that shows real network activity + partner usability.

---

## 🚀 Executive Summary

This execution plan transforms the comprehensive feature audit findings into actionable sprint tasks across three core tracks: **Product Engineering**, **Business Enablement**, and **Governance & Compliance**.

**Current State Assessment**: 40% MVP complete, strong tech foundation, significant business functionality gaps.

**Critical Success Factors**:
- Real analytics dashboard replaces mock data (Week 4)
- Admin panel enables partner management (Week 8)
- Partner onboarding system operational (Week 10)
- Full end-to-end demo pipeline complete (Week 12)

---

## 📊 RICE-Prioritized Roadmap Summary

| Priority | Feature | RICE Score | Timeline | Owner |
|----------|---------|------------|----------|-------|
| 🔴 Critical | Real Analytics Dashboard | 13.5 | Weeks 1-4 | Engineering |
| 🟠 High | Admin Panel v1 | 9.0 | Weeks 5-8 | Engineering |
| 🟡 Medium | Partner Onboarding System | 6.0 | Weeks 6-10 | Product |
| 🟡 Medium | Core Network APIs | 6.0 | Weeks 7-12 | Engineering |

---

## 🏗️ Track 1: Product Engineering

### 1. Real Analytics Dashboard (Weeks 1-4)

**Goal**: Replace mock metrics with live (or simulated) data from pilot nodes via Supabase.

| Task | Description | Dependencies | Output | Target |
|------|-------------|--------------|--------|--------|
| 1.1 Define analytics schema | Create Supabase tables for node telemetry, uptime, performance | Core DB structure | `analytics_schema.sql` | Day 3 |
| 1.2 Create analytics service | Build TypeScript module to query Supabase and stream data | Supabase SDK | `/lib/analytics.ts` | Day 7 |
| 1.3 Real-time subscription | Use Supabase Realtime for live updates | Supabase enabled | Live charts | Day 10 |
| 1.4 Integrate charts | Use Recharts/D3 for uptime, throughput, node count | Next.js + Tailwind | `/dashboard/analytics.tsx` | Day 14 |
| 1.5 Add KPI cards | Display top metrics with tooltips | UX/UI pass | `DashboardKPI.tsx` | Day 21 |
| 1.6 QA & validation | Verify data matches telemetry feed | Simulation complete | QA log | Day 28 |

**Verification Criteria**:
- ✅ Live updates without page refresh
- ✅ Values match telemetry JSON feed
- ✅ Dashboard loads in <2 seconds

### 2. Admin Panel v1 (Weeks 5-8)

**Goal**: Manage cities, building owners, investors, and API keys.

| Task | Description | Dependencies | Output | Target |
|------|-------------|--------------|--------|--------|
| 2.1 Define roles & permissions | Map Superadmin, PartnerAdmin, CityAdmin | Security model | `roles_config.json` | Day 31 |
| 2.2 Implement auth layer | Add NextAuth + Supabase adapter | Supabase setup | `/auth/[...nextauth].ts` | Day 35 |
| 2.3 Secure admin routes | Role-based middleware | Auth complete | Protected `/admin/*` | Day 42 |
| 2.4 Build CRUD pages | Cities, Nodes, Users, API Keys | DB schema | `/admin/dashboard.tsx` | Day 49 |
| 2.5 Add audit log | Capture all admin actions | API logging | `/admin/audit.tsx` | Day 56 |

**Verification Criteria**:
- ✅ Only authorized users access routes
- ✅ CRUD operations logged to audit table
- ✅ No console errors or schema mismatches

### 3. Core Network APIs (Weeks 7-12)

**Goal**: Establish REST endpoints for node telemetry → database → dashboard.

| Task | Description | Dependencies | Output | Target |
|------|-------------|--------------|--------|--------|
| 3.1 Define API spec | `/api/nodes`, `/api/telemetry`, `/api/alerts` | Schema | `api_spec.md` | Day 49 |
| 3.2 Implement endpoints | Next.js API routes with Zod validation | Supabase DB | `/pages/api/*.ts` | Day 56 |
| 3.3 Add authentication | HMAC/JWT between nodes and API | Security keys | Secure endpoints | Day 63 |
| 3.4 Rate limiting + logging | Prevent overload, capture logs | Middleware | `rate_limit.ts` | Day 70 |
| 3.5 Integrate with analytics | Data persistence to telemetry tables | DB schema | End-to-end flow | Day 77 |
| 3.6 API monitoring | Add uptime & latency tracking | Logging | Monitoring dashboard | Day 84 |

**Verification Criteria**:
- ✅ API returns 200 OK for valid payloads
- ✅ Rejects unauthenticated requests
- ✅ Rate-limit enforcement verified

### 4. Pilot Data Stream Simulation (Weeks 3-4)

**Goal**: Generate realistic synthetic telemetry for testing & demos.

| Task | Description | Dependencies | Output | Target |
|------|-------------|--------------|--------|--------|
| 4.1 Define telemetry schema | Match real node data format | DB schema | `telemetry_schema.json` | Day 21 |
| 4.2 Build simulator script | Node.js script pushing data every 5s | API key | `/scripts/simulator.ts` | Day 24 |
| 4.3 Add noise & variance | Randomize metrics per node type | Config | Realistic stream | Day 26 |
| 4.4 Test with dashboard | Validate charts react correctly | Analytics ready | Live demo data | Day 28 |
| 4.5 Document usage | CLI commands + parameters | Script | `SIMULATOR.md` | Day 28 |

---

## 💼 Track 2: Business Enablement

### 1. Partner Onboarding System (Weeks 6-10)

**Goal**: Self-service onboarding for city departments, property owners, pilot participants.

| Task | Description | Dependencies | Output | Target |
|------|-------------|--------------|--------|--------|
| 1.1 Define partner schema | Design partner tables (type, org, contact, permissions) | Supabase | `partner_schema.sql` | Day 42 |
| 1.2 Create onboarding UX | `/onboard` route: Org Info → Contact → Use Case → Agreement | Design tokens | `/onboard/index.tsx` | Day 49 |
| 1.3 Form validation | Zod + React Hook Form validation | Schema | `onboardForm.tsx` | Day 56 |
| 1.4 Email verification | Send verification link via Supabase Auth/Resend | Auth + SMTP | Working verification | Day 63 |
| 1.5 Admin approval queue | Review/activate new partners | Admin Panel v1 | `/admin/partners.tsx` | Day 70 |
| 1.6 Welcome kit generator | PDF/email with partner ID, API key, resources | Email system | `welcomeKit.pdf` | Day 77 |
| 1.7 Metrics tracking | Track completion rate and onboarding time | Analytics API | Metrics dashboard | Day 84 |

**Verification Criteria**:
- ✅ End-to-end onboarding works for test user
- ✅ Verified partner appears in admin dashboard
- ✅ Welcome email delivered successfully
- ✅ Completion rate tracked in analytics

### 2. Node Registry Schema (Weeks 4-6)

**Goal**: Unified database linking every node to owner, city, network data.

| Task | Description | Dependencies | Output | Target |
|------|-------------|--------------|--------|--------|
| 2.1 Define registry model | nodes table with location, city, partner, type, status | Supabase | `node_registry.sql` | Day 28 |
| 2.2 Add foreign keys | Enforce ownership mapping and data lineage | Partner schema | Data integrity | Day 35 |
| 2.3 Implement endpoints | `/api/nodes` CRUD (admin), `/api/nodes/public` (read-only) | Core API | Registry endpoints | Day 42 |
| 2.4 Status dashboard | Internal dashboard showing all nodes live status | Analytics module | `/admin/nodes.tsx` | Day 49 |
| 2.5 Audit trail | Auto-log node lifecycle changes | Audit table | `registry_audit_log.sql` | Day 56 |

**Verification Criteria**:
- ✅ Each node linked to correct partner & city
- ✅ CRUD operations work with validation + logging
- ✅ Dashboard shows real-time node status

### 3. Investor Portal Stub (Weeks 8-10)

**Goal**: MVP-level read-only investor dashboard with mock KPIs and public metrics.

| Task | Description | Dependencies | Output | Target |
|------|-------------|--------------|--------|--------|
| 3.1 Define investor schema | Tables for investors, access levels, documents | Supabase | `investor_schema.sql` | Day 56 |
| 3.2 Create landing route | Intro to investment structure (Reg CF placeholder) | Website layout | `/invest/index.tsx` | Day 63 |
| 3.3 Login-restricted data room | Require verified investor access | Auth system | `/invest/data-room.tsx` | Day 70 |
| 3.4 Mock KPI dashboard | Pull pseudo data from analytics tables | Analytics API | Investor dashboard | Day 77 |
| 3.5 Document repository | Static folder for PDFs (pitch deck, charter, financials) | Storage | Document viewer | Day 84 |
| 3.6 Metrics tracking | Track page visits, logins, downloads | Analytics events | `/admin/investor-analytics` | Day 84 |

**Verification Criteria**:
- ✅ Investor login restricted & secure
- ✅ Mock KPIs and charts render correctly
- ✅ Document downloads tracked and logged
- ✅ Legal disclaimers present on all routes

---

## 🛡️ Track 3: Governance & Compliance

### 1. Privacy & Transparency Page Launch (Weeks 4-8)

**Goal**: Publish live, auditable web page documenting privacy practices and transparency.

| Task | Description | Dependencies | Output | Target |
|------|-------------|--------------|--------|--------|
| 1.1 Draft policy framework | Consolidate privacy, data handling, transparency policies | Legal + Charter | `privacy_policy_draft.md` | Day 28 |
| 1.2 Define transparency disclosures | Identify what's public: code repos, audits, partner logs, revenue | Product input | `transparency_manifest.yml` | Day 35 |
| 1.3 Design page layout | `/transparency` wireframe: Privacy, Open Code, Specs, Revenue | UI tokens | `/transparency/index.tsx` | Day 42 |
| 1.4 GitHub integration | Embed links to repos, auto-sync commit count/status | Repo URLs | Dynamic component | Day 49 |
| 1.5 Revenue widget | Mock dashboard pulling anonymized data from Supabase | Analytics module | `TransparencyRevenueCard.tsx` | Day 56 |
| 1.6 Accessibility review | WCAG 2.2 AA compliance, legal review, alt text | Design + Legal | Certified build | Day 63 |
| 1.7 Deploy & audit | Publish to production, validate links, Lighthouse audit | Deployment pipeline | Live page | Day 70 |
| 1.8 Public announcement | Post launch note on LinkedIn & GitHub | Marketing | Announcement post | Day 70 |

**Verification Criteria**:
- ✅ Page deployed on production domain
- ✅ GitHub links functional and current
- ✅ Lighthouse score ≥ 90%
- ✅ Plain-language explanations
- ✅ At least one public audit report visible

### 2. Internal Security Checklist (Weeks 8-12)

**Goal**: SOC2/ISO readiness foundation - internal control inventory and vendor review.

| Task | Description | Dependencies | Output | Target |
|------|-------------|--------------|--------|--------|
| 2.1 Define security domains | Map five SOC2 trust principles | Research | `security_domains.md` | Day 56 |
| 2.2 Draft control checklist | 60-100 line items across physical, cloud, data, personnel | Domains mapped | `SOC2_checklist.md` | Day 63 |
| 2.3 Create vendor inventory | List all 3rd-party services with data access scope | Vendor list | `vendor_inventory.csv` | Day 70 |
| 2.4 Classify data types | Label all data handled (telemetry, contact info, payments) | Product schema | `data_classification.md` | Day 77 |
| 2.5 Risk heat map | Rate each system on Likelihood × Impact | Risk matrix | `security_risk_matrix.md` | Day 84 |
| 2.6 Incident response template | Define contact chain, escalation flow, reporting format | Compliance sign-off | `incident_response.md` | Day 84 |
| 2.7 Audit readiness binder | Compile all docs (controls, vendors, risk, response) | All docs | `/docs/compliance-binder/` | Day 84 |
| 2.8 Review & approval | Internal review (Founders + Tech Lead), assign owners | Binder compiled | Signed `audit_signoff.md` | Day 84 |

**Verification Criteria**:
- ✅ SOC2-style checklist complete and versioned
- ✅ All vendors categorized by data sensitivity
- ✅ Incident plan approved and distributed
- ✅ Binder accessible and updated quarterly

---

## 📅 Integration Milestones & Checkpoints

| Week | Milestone | Description | Success Criteria |
|------|-----------|-------------|------------------|
| **Week 4** | Analytics Foundation | Real analytics visible + Transparency layout | Live dashboard + draft policies |
| **Week 8** | Admin & Governance | Admin Panel functional + Security checklist v1 | Partner management + SOC2 foundation |
| **Week 10** | Business Enablement | Partner onboarding + Investor portal ready | Self-service flow + mock KPIs |
| **Week 12** | MVP Integration | Full pipeline verified + Demo prepared | End-to-end flow complete |

---

## 🎯 Success Metrics

### Technical Metrics
- System uptime: >99.5%
- API response time: <200ms
- Dashboard load time: <3 seconds
- Security incidents: 0 critical

### Business Metrics
- Partner acquisition: 2-3 new cities per quarter
- Node deployment: 10+ nodes per city per month
- Revenue growth: 50% quarter-over-quarter
- User engagement: 1000+ active users per city

### Impact Metrics
- CO₂ reduction: Measured and reported monthly
- Digital equity: % coverage in underserved areas
- Energy generated: MWh tracked and verified
- Community benefits: Quantified and transparent

---

## 🚨 Risk Assessment & Mitigation

### High-Risk Areas
1. **Hardware Dependencies**: Real analytics require deployed nodes
   - **Mitigation**: Build simulation framework for development/demo
2. **Regulatory Compliance**: City contracts have strict requirements
   - **Mitigation**: Engage legal counsel early, compliance-first architecture
3. **Technical Complexity**: Real-time network monitoring at scale
   - **Mitigation**: Start simple, plan for scaling

### Medium-Risk Areas
1. **Market Timing**: Smart city adoption cycles can be long
   - **Mitigation**: Focus on quick wins, demonstrate value quickly
2. **Competition**: Large tech entering smart infrastructure
   - **Mitigation**: Privacy-first approach + PBC differentiation

---

## 📋 Decision Checkpoints

| Date | Decision | Go/No-Go Criteria |
|------|----------|-------------------|
| **Week 4** | Demo Release | Real analytics visible + stable performance |
| **Week 8** | Pilot Testing | Admin Panel + Onboarding functional for partners |
| **Week 12** | Investor Launch | MVP complete + demo materials ready |

---

## 🔄 Continuous Improvement Loop

1. **Weekly Standups** - Track progress against sprint goals
2. **Bi-weekly Demos** - Show working features to stakeholders
3. **Monthly Reviews** - Adjust roadmap based on feedback and data
4. **Quarterly Planning** - Plan next phase based on learnings

---

## 📚 Documentation & Knowledge Management

All project documentation will be maintained in `/docs/`:
- `/docs/technical/` - Architecture, APIs, database schemas
- `/docs/business/` - Partner agreements, investor materials
- `/docs/compliance/` - Security policies, audit documentation
- `/docs/product/` - User stories, feature specifications

---

**Last Updated**: 2025-11-08
**Version**: 1.0
**Next Review**: 2025-11-15