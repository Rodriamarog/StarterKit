# Alertas Design Specification

This document defines the design system and style guidelines for the Alertas application. All pages and components should follow these specifications to maintain visual consistency.

## Design Philosophy

- **Clean and Professional**: Inspired by Astroship template
- **Minimalist**: No unnecessary decoration, emojis, or gradients
- **Light Theme Only**: White backgrounds, dark text for readability
- **Typography-Driven**: Strong hierarchy through font sizes and weights

---

## Typography

### Fonts
- **Primary Font**: Bricolage Grotesque Variable
- **Secondary Font**: Inter Variable
- **Fallback**: Inter, ui-sans-serif, system-ui, sans-serif

### Font Sizes & Hierarchy
```
Hero Heading (h1):     text-5xl lg:text-6xl xl:text-7xl
Section Heading (h2):  text-4xl lg:text-5xl
Card/Feature Title (h3): text-lg (font-semibold)
Body Text:             text-lg
Secondary Text:        text-sm
Tiny Text:             text-xs
```

### Font Weights
- **Bold**: Headings, emphasis, navigation brand
- **Semibold**: Subheadings, card titles
- **Medium**: Buttons, important links
- **Normal**: Body text, secondary text

### Tracking
```
Tight:        lg:tracking-tight (for large headings)
Tighter:      xl:tracking-tighter (for extra large headings)
Normal:       Default for body text
```

---

## Color Palette

### Primary Colors
```css
Background:       bg-white (#ffffff)
Text Primary:     text-gray-900 (#111827)
Text Secondary:   text-slate-600 (#475569)
Text Muted:       text-slate-500 (#64748b)
```

### Interactive Elements
```css
Primary Button:   bg-black text-white
Button Hover:     hover:bg-gray-800
Link Default:     text-gray-600
Link Hover:       hover:text-gray-900
Border:           border-gray-300 or border-black
```

### Brand Colors
```css
Logo Primary:     text-slate-800 (for "Alert")
Logo Secondary:   text-slate-500 (for "as")
```

### Accents
```css
Feature Icons:    bg-black (circular backgrounds)
Icon Color:       text-white (on black backgrounds)
Technology Icons: text-gray-800
```

---

## Layout System

### Container Widths
```css
Main Container:   max-w-screen-xl mx-auto px-5
Content Max:      max-w-xl (for text blocks)
CTA Max:          max-w-5xl (for call-to-action sections)
```

### Spacing Scale
```css
Extra Small:  gap-3, mt-4
Small:        gap-4, mt-5, my-5
Medium:       gap-8, mt-6, mt-16
Large:        gap-16, mt-20, mt-24
Extra Large:  py-20, md:px-20 md:py-20
```

### Grid Layouts
```css
Features Grid:    grid sm:grid-cols-2 md:grid-cols-3 gap-16
Hero Layout:      grid lg:grid-cols-2 place-items-center
```

---

## Components

### Navigation Bar
```html
- Container: max-w-screen-xl
- Height: my-5
- Logo: text-lg, font-bold text-slate-800 + text-slate-500
- Menu Items: text-gray-600 hover:text-gray-900, lg:px-3 py-2
- Primary CTA: bg-black text-white px-5 py-2.5 rounded text-sm
- Layout: flex justify-between items-center
```

### Buttons

#### Primary Button
```css
Classes: bg-black text-white px-6 py-3 rounded font-medium
Hover:   hover:bg-gray-800 transition-colors
```

#### Secondary Button (Outline)
```css
Classes: border-2 border-black text-black px-6 py-3 rounded
Hover:   hover:bg-gray-50 transition-colors
```

#### Small Button
```css
Classes: px-5 py-2.5 bg-black text-white rounded text-sm
```

### Cards/Features
```html
Structure:
- Container: flex gap-4 items-start
- Icon: bg-black rounded-full p-2 w-8 h-8
- Title: font-semibold text-lg text-gray-900
- Description: text-slate-500 mt-2 leading-relaxed
```

### Icons
- Feature Icons: 24x24 (w-4 h-4) white on black circular background
- Technology Logos: 32-48px (w-8 md:w-12) text-gray-800
- Button Icons: 16-20px (w-4 h-4)

---

## Sections

### Hero Section
```css
Padding: pt-16 pb-8 md:pt-12 md:pb-24
Layout:  grid lg:grid-cols-2 place-items-center
```

### Features Section
```css
Padding: py-20
Heading: text-4xl lg:text-5xl font-bold lg:tracking-tight text-gray-900
Grid:    grid sm:grid-cols-2 md:grid-cols-3 mt-16 gap-16
```

### Trust Badges / Logos
```css
Spacing:  mt-24
Heading:  text-center text-slate-500
Icons:    flex gap-8 md:gap-20 items-center justify-center mt-10 flex-wrap
```

### Call-to-Action
```css
Container: bg-black p-8 md:px-20 md:py-20 mt-20 mx-auto max-w-5xl rounded-lg
Layout:    flex flex-col items-center text-center
Heading:   text-white text-4xl md:text-6xl tracking-tight
Body:      text-slate-400 mt-4 text-lg md:text-xl
Button:    bg-white text-black px-6 py-3 rounded
```

### Footer
```css
Padding: my-20
Text:    text-center text-sm text-slate-500
Links:   hover:underline
```

---

## Spacing Guidelines

### Vertical Spacing
- Between sections: `mt-16` or `mt-20` or `mt-24`
- Within sections: `mt-4` to `mt-6`
- Component internal: `mt-2` for small spacing
- Hero padding: `pt-16 pb-8 md:pt-12 md:pb-24`

### Horizontal Spacing
- Container padding: `px-5` (or `px-4 sm:px-6 lg:px-8` for varied screens)
- Button padding: `px-6 py-3` or `px-5 py-2.5`
- Icon gaps: `gap-3` to `gap-4`
- Grid gaps: `gap-8` or `gap-16`

---

## Responsive Breakpoints

### Tailwind Defaults
```
sm:  640px
md:  768px
lg:  1024px
xl:  1280px
```

### Common Patterns
```css
Mobile-first grid:    grid sm:grid-cols-2 md:grid-cols-3
Hidden on mobile:     hidden lg:flex
Font size scaling:    text-5xl lg:text-6xl xl:text-7xl
Padding scaling:      p-8 md:px-20 md:py-20
```

---

## Forms & Inputs

### Form Fields
```css
Container: form-control
Label:     label text-white font-medium
Input:     input input-bordered w-full bg-[#232842] border-[#2d3451] text-white focus:border-primary
```

### Dark Form Sections (Login/Register)
```css
Background: bg-[#1a1f37]
Input BG:   bg-[#232842]
Border:     border-[#2d3451]
Text:       text-white
```

---

## Do's and Don'ts

### ✅ Do
- Use explicit color classes (text-gray-900, not just relying on inheritance)
- Maintain white backgrounds throughout
- Use proper heading hierarchy
- Include hover states on interactive elements
- Use consistent spacing scale
- Follow mobile-first responsive design
- Use rounded corners on buttons (rounded or rounded-lg)

### ❌ Don't
- Use emojis or decorative icons
- Use blue/purple gradients
- Use overly bright or saturated colors
- Create AI-looking designs
- Skip color classes (leading to invisible text)
- Use inconsistent spacing
- Overcomplicate layouts

---

## Implementation Notes

### DaisyUI Configuration
- Theme: `data-theme="light"` (set on `<html>` tag)
- Body background: `class="bg-white"` on `<body>` tag

### Font Loading
```javascript
// In +layout.svelte
import '@fontsource-variable/inter';
import '@fontsource-variable/bricolage-grotesque';
```

### CSS Configuration
```css
/* In app.css */
@layer base {
  html, body {
    font-family: "Bricolage Grotesque Variable", "Inter Variable", "Inter", ui-sans-serif, system-ui, sans-serif;
    background-color: white;
  }
}
```

---

## Accessibility

- Maintain sufficient contrast ratios (black on white, dark gray on white)
- Use semantic HTML elements
- Provide alt text for images
- Ensure keyboard navigation works
- Use hover states for interactive elements

---

## Reference

This design system is based on the **Astroship** template for Astro.build, adapted for SvelteKit with consistent styling principles.

**Last Updated**: February 2026
