# Accessibility Checklist - TemplateAppV2

## Overview
This checklist provides critical accessibility tests that must be performed for all remediation work. Use this checklist during development, code review, and QA testing.

## 🔴 Critical Tests (Must Pass - P0/P1 Issues)

### 1. Keyboard Navigation
**Test Frequency**: Every page, every component change
**Tools**: Keyboard only (no mouse)

- [ ] **Tab Navigation**: All interactive elements reachable via Tab
- [ ] **Logical Order**: Tab order follows visual reading order
- [ ] **Focus Visible**: All focused elements have visible focus indicator
- [ ] **Skip Links**: Skip navigation link works and bypasses repeated content
- [ ] **Modal Focus**: Modals/traps properly trap focus and return on close
- [ ] **Keyboard Operation**: All functionality works without mouse
- [ ] **Focus Management**: Dynamic content manages focus appropriately

#### How to Test
1. **Tab Through Page**: Use Tab key to navigate through entire page
2. **Check Order**: Verify tab order matches visual layout
3. **Test Interactive Elements**: Buttons, links, forms, custom components
4. **Test Modals**: Open/close modals with keyboard, verify focus behavior
5. **Test Dynamic Content**: Verify focus moves to new/updated content

#### Pass/Fail Criteria
- **PASS**: All interactive elements reachable and functional via keyboard
- **FAIL**: Any element unreachable or non-functional via keyboard

### 2. Screen Reader Testing
**Test Frequency**: Every page, every form change
**Tools**: VoiceOver (macOS), NVDA (Windows), or JAWS

- [ ] **Page Structure**: Proper heading structure announced (H1, H2, etc.)
- [ ] **Form Labels**: All form fields properly labeled and associated
- [ ] **Error Messages**: Validation errors announced and associated with fields
- [ ] **Status Messages**: Dynamic content changes announced appropriately
- [ ] **Navigation**: Navigation structure and purpose clear
- [ ] **Interactive Elements**: Buttons, links, controls have accessible names
- [ ] **Language**: Page language correctly identified and announced

#### How to Test - VoiceOver (macOS)
1. **Enable VoiceOver**: Cmd + F5
2. **Navigate**: Use Control + Option + arrows to navigate
3. **Test Reading**: Listen to page structure and content
4. **Test Forms**: Navigate through forms using VO commands
5. **Test Interactive Elements**: Verify all controls are operable

#### How to Test - NVDA (Windows)
1. **Enable NVDA**: Ctrl + Alt + N
2. **Navigate**: Use arrow keys, Tab, and screen reader commands
3. **Test Reading**: Listen to page announcements
4. **Test Forms**: Use forms mode (Enter/Exit)
5. **Test Navigation**: Verify logical reading order

#### Pass/Fail Criteria
- **PASS**: All content accessible and operable via screen reader
- **FAIL**: Any content inaccessible or confusing to screen reader users

### 3. Form Accessibility
**Test Frequency**: Every form change
**Tools**: Keyboard, screen reader, automated tools

- [ ] **Field Labels**: Every input has associated `<label>` with `htmlFor`
- [ ] **Error Association**: Error messages linked with `aria-describedby`
- [ ] **Required Fields**: Required fields clearly indicated
- [ ] **Instructions**: Form instructions provided and associated
- [ ] **Validation**: Real-time validation feedback preferred
- [ ] **Error Handling**: Errors announced and associated with specific fields
- [ ] **Form Submission**: Success/error states properly announced

#### How to Test
1. **Label Test**: Each field has visible and programatic label
2. **Error Test**: Submit form with errors, verify announcements
3. **Validation Test**: Test real-time validation if implemented
4. **Success Test**: Submit valid form, verify success announcement
5. **Screen Reader Test**: Test complete form flow with screen reader

#### Pass/Fail Criteria
- **PASS**: Forms fully operable with clear feedback
- **FAIL**: Any form field inaccessible or confusing

---

## 🟠 High Priority Tests (P1 Issues)

### 4. Color Contrast
**Test Frequency**: Every UI change
**Tools**: Axe DevTools, Contrast Checker, Lighthouse

- [ ] **Text Contrast**: All text meets minimum 4.5:1 ratio
- [ ] **Large Text**: Large text (18pt+) meets 3:1 ratio
- [ ] **UI Components**: Interactive elements meet 3:1 ratio
- [ ] **Graphics**: Meaningful graphics have sufficient contrast
- [ ] **States**: Hover/focus states maintain sufficient contrast
- [ ] **Color-Only Information**: No information conveyed by color alone

#### How to Test
1. **Automated Scan**: Use Axe DevTools or Lighthouse
2. **Manual Check**: Use color contrast checker tool
3. **State Testing**: Test hover, focus, active states
- [ ] **Color Blindness**: Test with color blindness simulator
- [ ] **Dark/Light Mode**: Test both theme modes

#### Pass/Fail Criteria
- **PASS**: All elements meet WCAG contrast requirements
- **FAIL**: Any element fails contrast requirements

### 5. Focus Management
**Test Frequency**: Every component with focus changes
**Tools**: Keyboard, screen reader

- [ ] **Focus Traps**: Modals properly trap focus until dismissed
- [ ] **Focus Return**: Focus returns to trigger when component closes
- [ ] **Dynamic Focus**: New content receives appropriate focus
- [ ] **Focus Indicators**: Clear, visible focus indicators in both themes
- [ ] **Programatic Focus**: JavaScript focus changes work correctly
- [ ] **No Negative TabIndex**: No inappropriate `tabIndex="-1"` usage

#### How to Test
1. **Modal Test**: Open modal, verify focus trapped and returned
2. **Dynamic Content**: Test focus moves to new content
3. **Component Test**: Test all focus interactions
4. **Theme Test**: Verify focus indicators in both themes
5. **Keyboard Test**: Test all keyboard interactions

#### Pass/Fail Criteria
- **PASS**: Focus management works predictably and accessibly
- **FAIL**: Any focus management issue or confusion

### 6. ARIA Implementation
**Test Frequency**: Every component with ARIA attributes
**Tools**: Screen reader, accessibility inspector

- [ ] **Correct Usage**: ARIA attributes used correctly per specifications
- [ ] **No Redundancy**: No redundant ARIA that conflicts with native semantics
- [ ] **Live Regions**: `aria-live` used appropriately for dynamic content
- [ ] **Roles and States**: Custom components have proper ARIA roles
- [ ] **Labels and Descriptions**: ARIA labels and descriptions accurate and helpful
- [ ] **No ARIA Overuse**: Native HTML used where possible

#### How to Test
1. **Screen Reader Test**: Verify ARIA announcements are accurate
2. **Inspector Test**: Use browser accessibility inspector
3. **Component Test**: Test custom component accessibility
4. **Dynamic Content**: Test live region announcements
5. **Comparison Test**: Compare with/without ARIA

#### Pass/Fail Criteria
- **PASS**: ARIA enhances accessibility without conflicts
- **FAIL**: ARIA misused or conflicts with native semantics

---

## 🟡 Medium Priority Tests (P2 Issues)

### 7. Responsive Design
**Test Frequency**: Every layout change
**Tools**: Browser dev tools, various devices

- [ ] **Mobile Layout**: All content accessible on mobile (320px+)
- [ ] **Touch Targets**: All interactive elements minimum 44x44px
- [ ] **Zoom Support**: Content readable and operable at 200% zoom
- [ ] **Orientation**: Works in portrait and landscape modes
- [ ] **Viewport**: Proper viewport meta tag implementation
- [ ] **Responsive Navigation**: Navigation works on all screen sizes

#### How to Test
1. **Device Testing**: Test on actual mobile devices
2. **Viewport Testing**: Use browser dev tools viewport resizing
3. **Zoom Testing**: Test at 200% zoom level
4. **Touch Testing**: Verify touch target sizes and spacing
5. **Orientation Testing**: Test both device orientations

#### Pass/Fail Criteria
- **PASS**: Application fully functional across all devices/zoom levels
- **FAIL**: Any functionality broken or inaccessible on certain devices

### 8. Media Accessibility
**Test Frequency**: Every image/video addition
**Tools**: Screen reader, alt text checker

- [ ] **Meaningful Images**: All meaningful images have descriptive alt text
- [ ] **Decorative Images**: Decorative images marked with empty alt or aria-hidden
- [ ] **Complex Images**: Charts, graphs have detailed descriptions
- [ ] **Video Captions**: All videos have accurate captions
- [ ] **Audio Transcripts**: Audio content has transcripts
- [ ] **Media Controls**: Media player controls are accessible

#### How to Test
1. **Alt Text Test**: Check all images with screen reader
2. **Decorative Test**: Verify decorative images are hidden
3. **Media Test**: Test video captions and audio transcripts
4. **Complex Image Test**: Verify complex image descriptions
5. **Control Test**: Test media player accessibility

#### Pass/Fail Criteria
- **PASS**: All media content accessible to users with disabilities
- **FAIL**: Any media content inaccessible or unclear

### 9. Cognitive Accessibility
**Test Frequency**: Major UX changes
**Tools**: Various user testing approaches

- [ ] **Clear Language**: Content uses simple, clear language
- [ ] **Consistent Navigation**: Navigation patterns consistent throughout
- [ ] **Error Messages**: Error messages clear and helpful
- [ ] **Instructions**: Instructions provided for complex interactions
- [ ] **Time Limits**: No unnecessary time limits or controls provided
- [ ] **Flashing Content**: No content flashes more than 3 times per second

#### How to Test
1. **Language Review**: Review content for clarity and simplicity
2. **Navigation Test**: Verify consistency across application
3. **Error Testing**: Test various error scenarios
4. **Instructions Test**: Verify instructions for complex features
5. **Content Review**: Check for flashing or problematic content

#### Pass/Fail Criteria
- **PASS**: Content and interactions easy to understand and use
- **FAIL**: Any content confusing or difficult to understand

---

## 🟢 Low Priority Tests (P3 Issues)

### 10. Link Accessibility
**Test Frequency**: Every link addition/change
**Tools**: Keyboard, screen reader

- [ ] **Descriptive Text**: Link text describes destination when out of context
- [ ] **Unique Links**: Links to same destination have consistent text
- [ ] **Link Purpose**: Clear purpose of each link
- [ ] **New Window Warning**: Links opening new windows warn users
- [ ] **Skip Navigation**: Skip links provided for repeated navigation

#### How to Test
1. **Out of Context Test**: Read link text alone, check if purpose is clear
2. **Consistency Test**: Check links to same destination
3. **New Window Test**: Verify warnings for new window links
4. **Skip Link Test**: Test skip navigation functionality

#### Pass/Fail Criteria
- **PASS**: All links clearly describe their purpose
- **FAIL**: Any link purpose unclear or confusing

### 11. Document Structure
**Test Frequency**: Every page structure change
**Tools**: Screen reader, accessibility inspector

- [ ] **Single H1**: Each page has exactly one H1 element
- [ ] **Logical Headings**: Heading levels follow logical order
- [ ] **Landmarks**: Proper use of HTML5 landmark elements
- [ ] **Language**: Page language properly declared
- [ ] **Page Titles**: Descriptive page titles for each page

#### How to Test
1. **Heading Test**: Verify single H1 and logical heading structure
2. **Landmark Test**: Check proper use of header, nav, main, footer
3. **Language Test**: Verify lang attribute on html element
4. **Title Test**: Check page titles are descriptive

#### Pass/Fail Criteria
- **PASS**: Document structure follows accessibility best practices
- **FAIL**: Any structural issues affecting accessibility

---

## 🛠️ Testing Tools and Resources

### Automated Testing Tools

#### Browser Extensions
- **Axe DevTools**: Comprehensive accessibility testing
- **WAVE Extension**: Web accessibility evaluation tool
- **Lighthouse**: Accessibility audit as part of performance suite
- **Color Contrast Analyzer**: Detailed contrast checking
- **Accessibility Insights**: Microsoft's accessibility tool

#### Command Line Tools
- **axe-core**: Automated testing framework
- **pa11y**: Command line accessibility testing
- **Lighthouse CI**: Automated accessibility in CI/CD

### Screen Readers

#### Windows
- **NVDA** (Free): Most popular Windows screen reader
- **JAWS** (Paid): Enterprise screen reader
- **Windows Eyes** (Paid): Alternative screen reader

#### macOS
- **VoiceOver** (Built-in): macOS screen reader
- **ZoomText** (Paid): Screen magnification and reading

#### Mobile
- **VoiceOver** (iOS): Built-in iOS screen reader
- **TalkBack** (Android): Android screen reader
- **ChromeVox** (ChromeOS): ChromeOS screen reader

### Color Blindness Tools
- **Coblis Color Blindness Simulator**: Test various color vision types
- **Color Oracle**: Color blindness simulator from Oracle
- **Toptal Color Blind Filter**: Online color blindness testing

### Device Testing
- **BrowserStack**: Cross-browser and device testing
- **Sauce Labs**: Cloud-based testing platform
- **Real Devices**: Test on actual mobile devices
- **Emulators**: iOS Simulator, Android Emulator

---

## 📋 Test Session Checklist

### Before Testing
- [ ] **Test Environment**: Clear cache, disable extensions
- [ ] **Tools Ready**: Accessibility tools installed and configured
- [ ] **Test Data**: Prepare test accounts and data
- [ ] **Test Plan**: Review what features to test
- [ ] **Baseline**: Document current state before changes

### During Testing
- [ ] **Document Issues**: Take screenshots and record issues
- [ ] **Severity Levels**: Assign severity to each issue found
- [ ] **Reproduction Steps**: Document exact steps to reproduce issues
- [ ] **Browser/OS**: Document test environment
- [ ] **Assistive Tech**: Note which screen reader/tools used

### After Testing
- [ ] **Issues Tracked**: All issues documented in tracking system
- [ ] **Severity Priority**: Critical issues prioritized for fixing
- [ ] **Retest Schedule**: Plan retesting after fixes
- [ ] **Test Report**: Create summary of accessibility testing
- [ ] **Improvement Areas**: Identify areas for accessibility improvement

---

## 🎯 Testing Success Criteria

### Automated Testing
- **0** accessibility violations from automated tools
- **95+** Lighthouse accessibility score
- **100%** automated test coverage for accessibility features

### Manual Testing
- **100%** of core functionality tested with keyboard
- **100%** of core functionality tested with screen reader
- **100%** of forms tested for accessibility
- **100%** of pages tested for contrast and structure

### User Testing
- **Positive** feedback from users with disabilities
- **Zero** accessibility-related support requests
- **Successful** completion of core tasks by users with disabilities

### Compliance
- **100%** WCAG 2.2 AA compliance verified
- **Documented** accessibility conformance
- **Regular** accessibility audits and assessments
- **Published** accessibility statement