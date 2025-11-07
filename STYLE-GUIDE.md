# Anti-AI Style Guide

### Crafting Ultra-Professional Websites for Government & Enterprise

---

## 1. Philosophy & Principles

### Core Ethos

We design for **trust, clarity, and human precision**—websites that look handcrafted by real professionals, not stamped out by algorithms.
Our audiences—government officials and Fortune 500 decision-makers—expect **credibility over cleverness** and **substance over style**.

> **Mantra:** "We play with the big players—strategic, seamless, and human at heart."

### Brand Voice

Authoritative yet approachable.
Speak like a seasoned consultant in a boardroom:

* **Concise:** Short, active sentences.
* **Assured:** Lead with facts, not adjectives.
* **Warm:** Subtle empathy builds confidence ("Let's secure your path forward").
* **No hype:** Replace buzzwords with proof—badges, certifications, and case studies.

### Audience Priorities

* **Speed:** Load under 2 seconds.
* **Clarity:** Logical navigation, predictable layouts.
* **Trust:** Visual and structural signals of compliance, reliability, and privacy.

### Anti-AI Design Philosophy

Reject the "AI gloss"—overly symmetrical, sterile, template-driven interfaces.
Favor **subtle humanity**:

* Asymmetric spacing, tactile textures.
* Bespoke layouts and type hierarchies.
* Genuine photography and handcrafted iconography.
* Full WCAG 2.2 AA/AAA compliance—because accessibility is a *trust amplifier*.

---

## 2. Visual Identity

### Color System

Use muted, confident tones that communicate permanence and security.
Accent sparingly with teal to convey sophistication without flash.

| Category          | Name             | Hex       | Use Case            | Rationale                            |
| ----------------- | ---------------- | --------- | ------------------- | ------------------------------------ |
| **Primary**       | Navy Authority   | `#1A365D` | Headers, navs       | Depth, reliability—"the vault" feel. |
| **Secondary**     | Slate Competence | `#64748B` | Body text, borders  | Neutral, professional balance.       |
| **Accent**        | Teal Trust       | `#0D9488` | CTAs, links         | Subtle vitality, signals action.     |
| **Light Neutral** | Crisp White      | `#FFFFFF` | Backgrounds         | Clean foundation, high contrast.     |
| **Dark Neutral**  | Dusk Gray        | `#334155` | Dark mode base      | Soft luxury tone.                    |
| **Status**        | Soft Alert Green | `#10B981` | Success, validation | Calm reassurance.                    |

**Dark / Light Mode:**
Use CSS vars (`--bg-primary`) and smooth transitions (0.3s ease).
**Textures:** Optional linen/paper overlays add depth and individuality.

---

## 3. Typography

**Goal:** Readable, elegant, and distinctive. Authority through serif headings; clarity through sans-serif bodies.

| Role          | Font             | Weight / Size                | Notes                        |
| ------------- | ---------------- | ---------------------------- | ---------------------------- |
| **H1–H3**     | Playfair Display | 700 / 32–48px                | Gravitas and elegance.       |
| **H4–H6**     | Merriweather     | 500 / 20–28px                | Balanced warmth.             |
| **Body**      | Inter            | 400 / 16px (1.6 line-height) | Screen-optimized clarity.    |
| **UI / CTAs** | Poppins          | 500 / 14–18px                | Geometric confidence.        |
| **Code**      | Montserrat Mono  | 400 / 14px                   | Precision without stiffness. |

**Rules:**

* Limit to 2–3 families.
* Maintain 7:1 contrast ratio.
* Responsive typography: reduce by 20% on mobile.
* No default system fonts—always explicitly imported/self-hosted.

---

## 4. Iconography & Imagery

* **Icons:** Custom SVGs (Feather/Heroicons base), manually tweaked for asymmetry.
* **Photography:** Real professionals in real environments. Avoid stock smiles or AI composites.
* **Graphics:** Data visualizations with soft gradients (navy → slate). Prefer D3.js or Chart.js for dynamic rendering.
* **Compression:** <100 KB per image; always include descriptive `alt` text.

---

## 5. Layout & Structure

### Design Philosophy

Our grids breathe. They guide without constraining.

* **Grid:** 12-column base with calculated variance (`calc(1fr + 10px)`).
* **Whitespace:** 40–60px gutters—air, not clutter.
* **Navigation:** Sticky top bar (navy base), keyboard-friendly teal focus.
* **Hero Sections:** Asymmetric full-bleed images offset by 5%.
* **Cards:** Rounded 8px, slate shadow `rgba(0,0,0,0.05)`.
* **Forms:** Friendly validation copy ("Let's refine that—try again").

### Micro-Patterns

Introduce micro-irregularities—slight offsets, staggered heights—to communicate craftsmanship and avoid robotic uniformity.

---

## 6. Frameworks & UI Libraries

Favor **headless and modular** frameworks—control every pixel.

| Library          | Role                | Customization Focus                   | Anti-AI Advantage        |
| ---------------- | ------------------- | ------------------------------------- | ------------------------ |
| **Shadcn/UI**    | Base primitives     | Tailwind + textures                   | Feels hand-built.        |
| **Radix UI**     | Accessibility layer | Palette via CSS vars                  | Zero default styling.    |
| **Tailwind CSS** | Utility foundation  | Custom utilities (e.g., `.asym-lean`) | Rapid, unique iteration. |
| **Ant Design**   | Enterprise modules  | Replace blues with navy/teal          | Familiar yet bespoke.    |
| **Chakra UI**    | Inclusive design    | Inject custom icons                   | WCAG baked-in trust.     |

> **Tip:** Audit for template residue (`class="container"`, default blue tones) before launch.

---

## 7. UX, Performance & Accessibility

### Interaction Guidelines

* **Micro-animations:** Minimal—100 ms hover scales, no gimmicks.
* **Loading States:** Skeleton screens > spinners.
* **Haptics:** Subtle vibration on submit (mobile).
* **Accessibility:** Full ARIA labeling, skip-to-content, teal focus rings.
* **Performance Targets:**

  * LCP < 1.5 s
  * FID < 100 ms
  * CLS < 0.1
  * Lighthouse > 95

### Trust & Compliance

Prominently feature compliance seals (ISO 27001, SOC 2, GDPR).
Ensure all external links and contact modals communicate authenticity—real names, real bios.

---

## 8. Content & Messaging

### Tone Guidelines

* Competent, confident, and concise.
* Each sentence should earn its place.
* Replace adjectives with evidence.

**Patterns:**

* **Headlines:** 6–8 words, active voice.
* **Body:** Max 300 px width, 3–4 line paragraphs.
* **CTAs:** Imperative tone ("Request Secure Demo").
* **Empty / Error States:** Empathetic guidance ("No results? Let's refine your search.").

### SEO / Metadata

Use natural keyword integration ("enterprise compliance platform")—never keyword stuffing.
Add descriptive meta titles (<60 chars) and accessible alt tags for every visual.

---

## 9. Implementation & Review

### Workflow

* **Design:** Figma → Component tokens in Storybook.
* **QA:** Pre-commit Lighthouse + Axe audits.
* **Performance Tests:** WebPageTest, GTmetrix, or Chrome Profiler.

### Audit Checklist

☑ Asymmetry present in at least 3 layouts
☑ Font families match guide (no Roboto/Arial)
☑ Load < 2 s
☑ WCAG 2.2 AA+ compliance verified

### Governance

Review and update quarterly to stay aligned with design evolution and accessibility standards.
This guide is **a living document**, not a static template.

> *Last Updated: November 07, 2025*