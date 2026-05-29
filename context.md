# Minimalist Monochrome UI Design System & Styling Guide

This guide documents the design tokens, theme overrides, CSS rules, and component recipes used to achieve the clean, high-contrast, borderless **monochrome (black-and-white)** light-theme aesthetic. You can copy this file directly into new projects to replicate this look.

---

## 📐 Design Philosophy & Tokens

1. **Aesthetic**: Minimalist, clean developer-tool UI. High-contrast typography with white backgrounds, strong black accents, and soft gray highlights.
2. **No Hard Borders**: Complete removal of visible borders (`border-color: transparent !important`). Section separations are handled using clean whitespace, soft spacing, grids, and subtle background shade transitions.
3. **Pure Monochrome Colors**:
   - **Backgrounds**: Solid `#FFFFFF` (pure white) for main sections.
   - **Text**: Solid `#000000` (pure black) for high readability (avoid low-contrast grays for standard text/copy).
   - **Primary Actions**: Black backgrounds with white text, or white backgrounds with black borders and black text/icons.
   - **Secondary Highlights**: Soft grays (`#F3F4F6` or `#FAFAFA`) for badges, lists, search inputs, and hover states.
4. **Fluid Widths**: Layout wrappers stretch dynamically to use 100% of the screen width rather than being capped by fixed narrow max-widths, creating a spacious and modern layout.

---

## 🎨 Tailwind CSS v4 Theme Overrides

In Tailwind CSS v4, color variables are overridden directly inside the `@theme` directive. By mapping standard color palettes like `indigo` and `purple` to grayscale values, components that use default Tailwind colors automatically render in monochrome without requiring major HTML refactoring:

```css
@theme {
  /* Map indigo color utilities to grayscale (monochrome) */
  --color-indigo-50: #f3f4f6;
  --color-indigo-100: #e5e7eb;
  --color-indigo-200: #d1d5db;
  --color-indigo-300: #9ca3af;
  --color-indigo-400: #374151;
  --color-indigo-500: #111827;
  --color-indigo-600: #000000; /* Pure black for primary actions */
  --color-indigo-700: #111827;
  --color-indigo-800: #111827;
  --color-indigo-900: #111827;
  --color-indigo-950: #000000;
}
```

---

## 📄 Complete Monochrome `index.css`

Save this CSS block into your main CSS entry point (`src/index.css` or `src/App.css`) to apply the theme:

```css
@import "tailwindcss";

@theme {
  /* Map indigo color palette to grayscale (monochrome) */
  --color-indigo-50: #f3f4f6;
  --color-indigo-100: #e5e7eb;
  --color-indigo-200: #d1d5db;
  --color-indigo-300: #9ca3af;
  --color-indigo-400: #374151;
  --color-indigo-500: #111827;
  --color-indigo-600: #000000;
  --color-indigo-700: #111827;
  --color-indigo-800: #111827;
  --color-indigo-900: #111827;
  --color-indigo-950: #000000;

  /* Map purple color palette to grayscale (monochrome) */
  --color-purple-50: #f3f4f6;
  --color-purple-100: #e5e7eb;
  --color-purple-200: #d1d5db;
  --color-purple-300: #9ca3af;
  --color-purple-400: #374151;
  --color-purple-500: #111827;
  --color-purple-600: #000000;
  --color-purple-700: #111827;
  --color-purple-850: #111827;
  --color-purple-900: #000000;
}

@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 0 0% 0%;
    
    --card: 0 0% 100%;
    --card-foreground: 0 0% 0%;
    
    --popover: 0 0% 100%;
    --popover-foreground: 0 0% 0%;
    
    /* Primary brand color is pure black */
    --primary: 0 0% 0%;
    --primary-foreground: 0 0% 100%;
    
    --secondary: 0 0% 96%;
    --secondary-foreground: 0 0% 0%;
    
    --muted: 0 0% 95%;
    --muted-foreground: 0 0% 0%;
    
    --accent: 0 0% 95%;
    --accent-foreground: 0 0% 0%;
    
    --destructive: 0 84.2% 60.2%;
    --destructive-foreground: 210 20% 98%;
    
    --border: transparent;
    --input: transparent;
    --ring: 0 0% 0%;
    --radius: 0.75rem;

    /* --- OVERRIDE SYSTEM MEDIA AND DARK CLASSES GLOBALLY WITH !IMPORTANT --- */
    --color-slate-50: #fafafa !important;
    --color-slate-100: #f3f4f6 !important;
    --color-slate-200: #ffffff !important;
    --color-slate-300: #000000 !important;
    --color-slate-400: #000000 !important;
    --color-slate-500: #000000 !important;
    --color-slate-600: #000000 !important;
    --color-slate-700: #f3f4f6 !important;
    --color-slate-800: #ffffff !important;
    --color-slate-850: #ffffff !important;
    --color-slate-900: #ffffff !important;
    --color-slate-950: #ffffff !important;

    /* Enforce same bright variables for generic gray scales */
    --color-gray-50: #fafafa !important;
    --color-gray-100: #f3f4f6 !important;
    --color-gray-200: #ffffff !important;
    --color-gray-300: #000000 !important;
    --color-gray-400: #000000 !important;
    --color-gray-500: #000000 !important;
    --color-gray-600: #000000 !important;
    --color-gray-700: #f3f4f6 !important;
    --color-gray-800: #ffffff !important;
    --color-gray-900: #ffffff !important;
    --color-gray-950: #ffffff !important;
  }
}

* {
  border-color: transparent !important;
  box-sizing: border-box;
}

body {
  background-color: #ffffff !important;
  color: #000000 !important;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  overflow-y: scroll;
}

/* Force standard text elements to be solid black */
body, p, span, h1, h2, h3, h4, h5, h6, label, div, input, textarea, select {
  color: #000000;
}

/* Force backgrounds of all potential dark/slate panels to render as white */
.bg-slate-950, .bg-slate-900, .bg-slate-900\/80, .bg-slate-850, .bg-slate-800,
.bg-gray-950, .bg-gray-900, .bg-gray-850, .bg-gray-800 {
  background-color: #ffffff !important;
}

/* Force gray background placeholders to render as soft light gray */
.bg-slate-50, .bg-slate-100 {
  background-color: #f3f4f6 !important;
}

/* Force primary buttons (using indigo/purple bg classes) to render as white with a black border and black text */
.bg-indigo-600, .bg-indigo-750, .bg-indigo-700, .bg-purple-600, .bg-purple-700 {
  background-color: #ffffff !important;
  color: #000000 !important;
  border: 1.5px solid #000000 !important;
}

/* Change icon and text color inside primary buttons to black */
.bg-indigo-600 *, .bg-indigo-700 *, .bg-purple-600 *, .bg-purple-700 * {
  color: #000000 !important;
}

/* Hover state for primary buttons (soft gray background) */
.bg-indigo-600:hover, .bg-indigo-700:hover, .bg-purple-600:hover, .bg-purple-700:hover {
  background-color: #f3f4f6 !important;
}

/* Allow semantic status text colors to bypass global text color force */
.text-indigo-600, .text-indigo-500, .text-indigo-400, .text-indigo-700,
.text-purple-600, .text-purple-500, .text-purple-400, .text-purple-700,
.text-primary, .text-amber-500, .text-emerald-500, .text-rose-500 {
  color: inherit !important;
}

/* High-contrast solid black outline for focused inputs */
input:focus, textarea:focus, select:focus {
  outline: 2px solid #000000 !important;
  outline-offset: 1px;
}

/* Custom Scrollbar */
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}
::-webkit-scrollbar-track {
  background: transparent;
}
::-webkit-scrollbar-thumb {
  background: rgba(0, 0, 0, 0.1);
  border-radius: 4px;
}
::-webkit-scrollbar-thumb:hover {
  background: rgba(0, 0, 0, 0.2);
}

/* Prose and Markdown styling overrides */
.prose pre {
  background-color: #f3f4f6;
  border-radius: var(--radius);
  padding: 1rem;
  overflow-x: auto;
}
.prose code {
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
  font-size: 0.9em;
  color: #000000;
  background-color: rgba(0, 0, 0, 0.05);
  padding: 0.2rem 0.4rem;
  border-radius: 4px;
}
.prose p {
  margin-bottom: 0.75rem;
  color: #000000 !important;
}
.prose ul, .prose ol {
  margin-left: 1.5rem;
  margin-bottom: 0.75rem;
}
.prose li {
  list-style-type: disc;
  color: #000000 !important;
}
.prose h1, .prose h2, .prose h3 {
  font-weight: 700;
  margin-top: 1rem;
  margin-bottom: 0.5rem;
  color: #000000 !important;
}
```

---

## 🧱 Component Layout & Tailwind Recipes

Below are code recipes for common UI components built with this design system:

### 1. Primary Highlight Button
Perfect for core triggers (e.g. "Login", "Sign Up", "Ask Question").
```tsx
<button className="px-4 py-2 bg-indigo-600 text-black font-semibold rounded-md border border-black hover:bg-gray-100 transition-colors flex items-center gap-2">
  <span>Confirm Details</span>
</button>
```

### 2. Secondary / Neutral Button
Perfect for dismissals, cancel states, or secondary filters.
```tsx
<button className="px-4 py-2 bg-transparent text-black font-semibold rounded-md hover:bg-gray-100 transition-colors">
  Cancel
</button>
```

### 3. Inputs & Forms
Clean grey input blocks with strong, high-contrast, black active focus rings:
```tsx
<div className="flex flex-col gap-1.5 w-full">
  <label className="text-xs font-bold uppercase tracking-wide text-black">
    Email Address
  </label>
  <input
    type="email"
    placeholder="you@domain.com"
    className="w-full px-4 py-3 bg-slate-100 text-black rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black transition-all"
  />
</div>
```

### 4. Navigation Headers (Borderless)
Fluid layout alignment without visual borders:
```tsx
<header className="w-full bg-white py-4 px-8 flex items-center justify-between">
  <div className="flex items-center gap-3">
    <div className="h-8 w-8 bg-black rounded-full flex items-center justify-center text-white font-extrabold text-sm">
      C
    </div>
    <span className="font-extrabold text-xl tracking-tight">CampusFAQ</span>
  </div>
  <nav className="flex items-center gap-6">
    <a href="/feed" className="font-medium hover:underline text-black">Feed</a>
    <a href="/badges" className="font-medium hover:underline text-black">Badges</a>
  </nav>
</header>
```

### 5. Tag Badge (Secondary highlight)
Pills that provide contrast without breaking the monochrome rule:
```tsx
<span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-slate-100 text-black">
  React
</span>
```

### 6. Card / Feed Item (Spacing & Shade-based)
Instead of borders, cards use clear margin separation, light slate highlights, or white boxes grouped on top of a soft gray main background:
```tsx
<div className="w-full bg-white p-6 rounded-2xl flex flex-col gap-3 hover:bg-slate-50 transition-colors">
  <div className="flex items-center gap-2 text-xs opacity-60">
    <span>Posted by Alice</span>
    <span>•</span>
    <span>2 hours ago</span>
  </div>
  <h2 className="text-xl font-bold hover:underline cursor-pointer">
    How do you handle routing dynamically in TanStack Router?
  </h2>
  <p className="text-sm line-clamp-2">
    I am building an app and need to pass type-safe parameters down to nested views...
  </p>
</div>
```
