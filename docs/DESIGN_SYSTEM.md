# MangaVerse Design System Foundation

This document describes the design tokens, theming, visual texture system, reusable UI components, and performance/accessibility standards for MangaVerse.

## 1. Design Tokens

All core visual tokens are defined as CSS custom properties in `src/styles/tokens.css` and mapped to Tailwind CSS v4 utilities via `@theme` in `src/index.css`.

### Color Palette

| Token | Light Theme | Dark Theme | Purpose |
| --- | --- | --- | --- |
| `--mv-bg` | `#F7F8FC` | `#0F1117` | Page background |
| `--mv-surface` | `#FFFFFF` | `#161923` | Primary card and surface background |
| `--mv-surface-subtle` | `#F1F3F9` | `#1D2130` | Secondary surface / subtle containers |
| `--mv-surface-elevated` | `#FFFFFF` | `#202536` | Elevated cards and popovers |
| `--mv-accent` | `#635BDB` | `#635BDB` | Primary interactive fill (white text >= 4.5:1) |
| `--mv-accent-text` | `#564ED1` | `#9B95F7` | Accent text, icons, and focus outlines |
| `--mv-text-primary` | `#171923` | `#F3F5FA` | Headings and primary copy |
| `--mv-text-secondary` | `#667085` | `#A1A9BC` | Supporting copy and metadata |
| `--mv-border` | `#E6E8EF` | `#272C3D` | Default hairline borders |
| `--mv-success` | `#16845B` | `#2FB37E` | Success states |
| `--mv-warning` | `#B7791F` | `#E09F3E` | Warning states |
| `--mv-error` | `#D14343` | `#F06464` | Error / destructive states |
| `--mv-info` | `#3974C6` | `#5D9CEC` | Informational states |

### Typography & Layout

- **Headings (`--font-heading`)**: `Manrope`
- **Interface (`--font-sans`)**: `Inter`
- **Novel Reading (`--font-reading`)**: `Literata` (adjustable size and line-height)
- **Monospace / ASCII (`--font-mono`)**: `JetBrains Mono`
- **Container (`Container`)**: Max width `1280px` with responsive horizontal padding (`16px` mobile, `24px` tablet, `40px` desktop).
- **Card Radius**: `12px–16px` (`rounded-xl` / `rounded-2xl`).

## 2. Theme Implementation

- **Default**: Light theme (`data-theme="light"`).
- **Persistence**: Stored in `localStorage` under `mv-theme`.
- **FOUC Prevention**: An inline script in `index.html` applies `.dark` and `data-theme="dark"` before React mounts when dark mode is stored.
- **React API**: `ThemeProvider` and `useTheme()` in `src/context/ThemeContext.jsx`, paired with `ThemeToggle` in `src/components/ui/ThemeToggle.jsx`.
- **Tailwind v4 Dark Variant**: `@custom-variant dark (&:where(.dark, .dark *, [data-theme="dark"], [data-theme="dark"] *));` in `src/index.css`.

## 3. Visual Texture System

All eight treatments live in `src/styles/textures.css` and `src/components/textures/`.

1. **Paper Texture (`PaperTexture` / `.mv-texture-paper`)**: Inline SVG `fractalNoise` overlay for reading surfaces and editorial cards.
2. **Halftone (`HalftoneOverlay` / `.mv-texture-halftone`)**: Pure CSS `radial-gradient` dot matrix for manga-inspired promotional callouts.
3. **Grainy Gradients (`GrainyGradient` / `.mv-texture-grainy`)**: Layered radial gradients with subtle noise grain for hero and featured sections.
4. **Contour Lines (`ContourLines` / `.mv-texture-contour`)**: Repeating SVG topographic paths for section backgrounds and `EmptyState`.
5. **ASCII & Pixels (`AsciiPixelAccent` / `.mv-texture-ascii`)**: Monospace tags with crisp pixel-notched borders.
6. **Blurred Photos (`BlurredBackdrop` / `.mv-texture-blurred-img`)**: Separate atmospheric backdrop image blurred behind a theme-aware scrim (`--mv-blur-scrim`). Never applied to actual manga covers.
7. **Dithered Images (`DitheredArtwork` + `scripts/generate-dithered-assets.mjs`)**: Build-time Floyd-Steinberg duotone dithering using `sharp`, generating static light/dark PNGs in `src/assets/dithered/` via `npm run assets:dither` (automatically executed in `prebuild`).
8. **Pixel Mosaics (`PixelMosaic`)**: Deterministic CSS grid mosaic for decorative bands and section transitions.

## 4. Component Usage

Import reusable primitives from `src/components/ui`:

```jsx
import {
  Alert,
  Badge,
  Button,
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  Checkbox,
  Container,
  EmptyState,
  Input,
  Select,
  Switch,
  Textarea,
  ThemeToggle,
} from './components/ui';
```

All icons must come from `lucide-react`. Never use emojis in the application UI.

## 5. Performance & Accessibility

- **Zero Runtime Canvas Cost**: Dithered assets are pre-generated at build time using `sharp`; textures rely on CSS gradients and lightweight inline SVGs.
- **Reduced Motion**: Global `@media (prefers-reduced-motion: reduce)` rules in `src/index.css` and `src/styles/textures.css` disable transitions and animations.
- **Decorative Isolation**: Texture overlays use `pointer-events: none` and `aria-hidden="true"` so screen readers and keyboard navigation are unaffected.
- **Contrast & Focus**: Interactive controls include visible `:focus-visible` outlines, accessible labels, `aria-invalid`/`aria-describedby` on form fields, and WCAG AA contrast ratios in both themes.
- **Dev-Only Showcase**: `/design-system` is lazy-loaded and registered only when `import.meta.env.DEV` is true, keeping showcase code out of production routing and bundles.
