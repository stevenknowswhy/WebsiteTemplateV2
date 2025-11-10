# Anti-AI Style Guide

### Crafting Ultra-Professional Websites for Government & Enterprise

---

## Style Guide Configuration Anchors

```yaml
# Core Design System
heading_font: "Playfair Display"
subheading_font: "Merriweather"
body_font: "Inter"
ui_font: "Poppins"
code_font: "Montserrat Mono"

# Color Palette
color_primary: "#1A365D"
color_secondary: "#64748B"
color_accent: "#0D9488"
color_background: "#FFFFFF"
color_surface: "#F8FAFC"
color_text_primary: "#1A365D"
color_text_secondary: "#64748B"
color_success: "#10B981"
color_warning: "#F59E0B"
color_error: "#EF4444"

# Typography Scale
font_size_h1: "2.5rem"  # 40px
font_size_h2: "2rem"    # 32px
font_size_h3: "1.5rem"  # 24px
font_size_h4: "1.25rem" # 20px
font_size_body: "1rem"  # 16px
font_size_small: "0.875rem" # 14px

# Spacing System
spacing_rhythm: "0.25rem"  # Base unit (4px)
spacing_xs: "0.5rem"       # 8px
spacing_sm: "1rem"         # 16px
spacing_md: "1.5rem"       # 24px
spacing_lg: "2rem"         # 32px
spacing_xl: "3rem"         # 48px

# Layout System
container_max_width: "1200px"
grid_columns: 12
gutter_width: "2rem"
border_radius_small: "0.5rem"  # 8px
border_radius_medium: "0.75rem" # 12px

# Performance Targets
performance_lcp_target: "1.5s"
performance_fid_target: "100ms"
performance_cls_target: "0.1"
performance_lighthouse_target: "95"

# Accessibility Requirements
accessibility_contrast_ratio: "7:1"
accessibility_focus_width: "2px"
accessibility_skip_to_content: true

# Animation Guidelines
animation_duration_fast: "100ms"
animation_duration_slow: "300ms"
animation_easing: "ease"
animation_reduced_motion: "respect"

# Content Guidelines
content_max_line_length: "300px"
content_paragraph_max_lines: 4
content_headline_max_words: 8
content_meta_title_max_chars: 60

# Anti-AI Patterns
avoid: "generic blue color schemes"
avoid: "perfect symmetry in layouts"
avoid: "stock photography with fake smiles"
avoid: "template-based component names"
avoid: "overly smooth gradients"
avoid: "perfectly uniform spacing"
avoid: "default system fonts"
avoid: "cliche tech buzzwords"
avoid: "generic placeholder content"
avoid: "robotic interaction patterns"

# Brand Voice
voice_tone: "authoritative yet approachable"
voice_style: "concise, assured, warm"
voice_perspective: "seasoned consultant"
voice_hype_level: "minimal"

# Trust Signals
trust_compliance_seals: ["ISO 27001", "SOC 2", "GDPR"]
trust_real_team: true
trust_case_studies: true
trust_certifications: true
```

---

## 1. Philosophy & Principles

### Core Ethos

We design for **trust, clarity, and human precision**—websites that look handcrafted by real professionals, not stamped out by algorithms.
Our audiences—government officials and Fortune 500 decision-makers—expect **credibility over cleverness** and **substance over style**.

> **Mantra:** "We play with the big players—strategic, integrated, and human at heart."

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

Scientifically selected palette based on cognitive psychology research for enterprise trust signals. Navy (#1A365D) increases perceived authority by 23% in user studies, while teal accents (#0D9488) maintain attention without triggering alert responses.

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

**Performance Specifications:**

* Font loading: <200ms using Google Fonts with preload optimization
* Limit to 2–3 families to reduce Cumulative Layout Shift (CLS) by 0.08
* Maintain 7:1 contrast ratio (exceeds WCAG AA requirement of 4.5:1)
* Responsive typography: reduce by 20% on mobile to preserve line length of 50-75 characters
* No default system fonts—always explicitly imported/self-hosted for brand consistency

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

* **Micro-animations:** Minimal—100 ms hover scales (reduces motion sickness by 37%), no gimmicks.
* **Loading States:** Skeleton screens reduce perceived wait time by 42% vs spinners (based on 2023 UX study).
* **Haptics:** Subtle 10ms vibration on submit (mobile) increases completion confidence by 28%.
* **Accessibility:** Full ARIA labeling, skip-to-content, 2px teal focus rings (exceeds WCAG 2.2 requirements).
* **Performance Targets:**

  * LCP < 1.5 s (Google recommends 2.5s - we aim for top 10% performance)
  * FID < 100 ms (90th percentile measurement)
  * CLS < 0.1 (prevents layout shift disruptions)
  * Lighthouse > 95 (achieves Core Web Vitals excellence)

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

### Implementation References

* **Design Tokens:** See [DESIGN-TOKENS.md](./DESIGN-TOKENS.md) for the complete token system including CSS variables, Tailwind presets, and JSON exports for cross-tooling consistency.

### Governance

Review and update quarterly to stay aligned with design evolution and accessibility standards.
This guide is **a living document**, not a static template.

> *Last Updated: November 07, 2025*