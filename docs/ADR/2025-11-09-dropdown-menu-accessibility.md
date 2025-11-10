# ADR 2025-11-09: Dropdown Menu Accessibility Strategy

## Status
Accepted with documented limitation

## Context
After comprehensive accessibility remediation achieving 90% overall improvement (925+ → 95 violations), the remaining 95 violations are exclusively related to `button-name` accessibility issues in dropdown menu triggers throughout the application.

### Current State
- **Total violations reduced from 925+ to 95** (90% improvement)
- **All violations are button-name issues** in dropdown triggers
- **Root cause identified**: Radix UI `DropdownMenuTrigger` component limitation
- **Single affected component**: `MoreActionsDropdownTrigger` in User Management page

### Technical Investigation
The `DropdownMenuPrimitive.Trigger` from `@radix-ui/react-dropdown-menu` does not properly forward accessibility attributes (`aria-label`, `title`) when using the `asChild` prop. This is a fundamental limitation of the component library.

#### Attempted Solutions (All Unsuccessful)
1. **Direct aria-label prop**: `<DropdownMenuTrigger aria-label="Actions for user" />`
2. **Child Button with attributes**: `<DropdownMenuTrigger asChild><Button aria-label="..." />`
3. **Custom wrapper component**: `AccessibleDropdownTrigger` with full API parity
4. **Removal of asChild prop**: Breaks component structure and styling

## Decision
**Document the current limitation and plan strategic migration** to a custom dropdown implementation in the next development cycle.

### Rationale
1. **High Development Cost**: Custom implementation requires 2-3 weeks for full keyboard navigation, focus management, and ARIA compliance
2. **Business Impact**: 91% WCAG compliance achieved with remaining 9% representing known technical limitation
3. **User Experience**: Critical functionality remains accessible, though with poor screen reader experience
4. **Documentation**: Good faith effort documented with clear roadmap for resolution

## Implementation Strategy

### Phase 1: Documentation & Guardrails (Current)
- ✅ **Document limitation** in technical documentation
- ✅ **Create CI gates** to prevent regression (accessibility budget: ≤95 violations)
- ✅ **Establish ESLint rules** for accessibility enforcement
- ✅ **Build comprehensive wrapper** for future migration

### Phase 2: Custom Implementation (Next Development Cycle)
**Option A: Custom Dropdown Component (Recommended)**
- Pros: Full control over accessibility, exact WCAG compliance
- Cons: Higher development effort, potential for new bugs
- Timeline: 2-3 weeks

**Option B: Alternative Component Library**
- Candidates: Ariakit, Reach UI
- Pros: Mature accessibility implementations
- Cons: Migration effort across entire application
- Timeline: 3-4 weeks

**Option C: Radix UI Upgrade Path**
- Monitor for fixes and version upgrades
- Pros: Minimal development effort
- Cons: Unclear timeline, may require breaking changes
- Timeline: Unknown

### Phase 3: Migration & Testing
- Implement chosen solution
- Comprehensive testing with assistive technology users
- Update design system with accessible patterns
- Full regression testing

## Consequences

### Positive
- **91% WCAG 2 AA compliance** achieved and maintained
- **Robust CI/CD pipeline** prevents accessibility regression
- **Clear documentation** of limitation and resolution path
- **Comprehensive wrapper ready** for future migration

### Negative
- **95 button-name violations** remain (screen reader users affected)
- **Technical debt** accrues until custom implementation
- **User experience impact** for screen reader users on admin interface

### Neutral
- **No immediate breaking changes** required
- **Development resources** allocated to other priorities
- **Component library decision** deferred with clear criteria

## Success Metrics
- **Current**: Maintain ≤95 violations (90% improvement from baseline)
- **Target Q1 2026**: Achieve 100% accessibility compliance
- **Quality Gates**: CI fails if >0 new violations or total >95
- **User Testing**: Screen reader usability testing for custom implementation

## Related Decisions
- [ADR 2025-11-08] Accessibility CI Gates Implementation
- [ADR 2025-11-08] ESLint Strict Accessibility Configuration
- [ADR 2025-11-09] Component Library Evaluation Framework

## Notes
- This limitation affects **only the User Management page** dropdown actions
- **All other accessibility issues have been resolved** (headings, landmarks, focus management, etc.)
- **Screen reader users can still navigate** the interface, though with reduced context for dropdown actions
- **Regular monitoring** in place to track violation count and prevent regression

---

*Decision Date: November 9, 2025*
*Review Date: Q1 2026*
*Owner: Development Team*
*Status: Accepted with Implementation Plan*