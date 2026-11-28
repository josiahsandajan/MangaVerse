# MangaVerse texture system

MangaVerse uses eight restrained, reusable visual treatments to support content hierarchy. Textures are accents for surfaces and transitions; they must not compete with reading, navigation, metadata, or calls to action.

Texture CSS lives in `src/styles/textures.css`. Reusable React wrappers are exported from `src/components/textures/index.js`. The dev-only `/design-system` route is the reference surface for inspecting the treatments.

## Shared rules

- Use one primary treatment per surface. A second subtle treatment is acceptable for a hero or promotional panel; do not stack several high-intensity effects behind text.
- Keep content in each wrapper's foreground child. Decorative layers must be `aria-hidden` and must not capture pointer events.
- Verify contrast in light and dark themes, especially at narrow widths. Textures support hierarchy; they never replace readable backgrounds.
- Respect `prefers-reduced-motion`. `textures.css` disables mosaic transitions and blur-image animation/transition behavior; the global stylesheet shortens other transitions and animations.
- Do not blur, dither, pixelate, or otherwise alter actual manga cover artwork. Prefer CSS/SVG and the existing optimized assets over new runtime dependencies.

## 1. Paper

**Purpose:** Quiet paper grain for reading and editorial surfaces.

```jsx
<PaperTexture as="article" className="rounded-2xl border border-[var(--mv-border)]">
  {children}
</PaperTexture>
```

- **API:** `PaperTexture({ children, className = '', as: Component = 'div' })`
- **CSS:** `.mv-texture-paper`
- **Placement:** Long-form reading, editorial cards, and calm supporting panels.
- **Theme:** Inline SVG noise opacity uses `--mv-paper-opacity`; the wrapper surface uses `--mv-surface`.
- **Accessibility/performance:** Its pseudo-element has `pointer-events: none`; it is a small repeated inline SVG with no canvas work.
- **Do not use:** Avoid dense story grids or combining it with a strong grainy gradient on the same reading surface.

## 2. Halftone

**Purpose:** Manga-inspired dot texture for promotional areas and isolated accents.

```jsx
<HalftoneOverlay dense className="rounded-2xl">
  {children}
</HalftoneOverlay>
```

- **API:** `HalftoneOverlay({ dense = false, className = '', children })`
- **CSS:** `.mv-texture-halftone`; `.mv-texture-halftone-dense` when `dense` is true.
- **Placement:** Heroes, promotional callouts, and isolated decorative layers.
- **Theme:** Dot color comes from `--mv-halftone-color` in each theme.
- **Accessibility/performance:** The dot layer is `aria-hidden` and `pointer-events-none`; content renders above it. CSS radial gradients add no image request or drawing loop.
- **Do not use:** Do not place dense dots under long paragraphs, small metadata, form controls, or every repeated card.

## 3. Grainy gradients

**Purpose:** Atmospheric editorial backdrops for heroes and featured sections.

```jsx
<GrainyGradient as="section" className="overflow-hidden">
  {children}
</GrainyGradient>
```

- **API:** `GrainyGradient({ children, className = '', as: Component = 'section' })`
- **CSS:** `.mv-texture-grainy`
- **Placement:** Page heroes and spacious featured sections.
- **Theme:** The base uses `--mv-surface` and grain opacity uses `--mv-grain-opacity`. The current radial-gradient color stops are fixed rgba values, rather than independently theme-tokenized.
- **Accessibility/performance:** The noise pseudo-element is non-interactive and sits behind the foreground child. It is a static inline SVG tile, so avoid many simultaneous instances.
- **Do not use:** Do not use on dense lists, readers, small cards, or beneath another high-contrast treatment.

## 4. Contour lines

**Purpose:** Quiet topographic structure for empty states and section backgrounds.

```jsx
<ContourLines as="section" className="rounded-2xl">
  {children}
</ContourLines>
```

- **API:** `ContourLines({ children, className = '', as: Component = 'div' })`
- **CSS:** `.mv-texture-contour`
- **Placement:** Empty states, the 404 surface, and low-emphasis section backdrops.
- **Theme:** The repeating SVG currently embeds violet stroke colors and opacities. It remains visible in both themes but does not consume `--mv-contour-color`.
- **Accessibility/performance:** Children render in a `z-10` container; the repeated inline SVG has no runtime canvas work.
- **Do not use:** Avoid busy controls, information-dense tables, or a surface already using strong halftone and grain.

## 5. ASCII and pixels

**Purpose:** Compact monospace labels and pixel-notched accents with meaningful text content.

```jsx
<AsciiPixelAccent glyph="//">DISCOVER &amp; TRACK</AsciiPixelAccent>
```

- **API:** `AsciiPixelAccent({ glyph = '//', children, className = '' })`
- **CSS:** `.mv-texture-ascii` and `.mv-pixel-notch`
- **Placement:** Short eyebrows, edition-style tags, and selected promotional accents.
- **Theme:** Uses surface, border, accent-soft, and accent-text variables. The glyph alone is `aria-hidden`; children remain accessible text.
- **Accessibility/performance:** This is normal semantic text, not a replacement for labels or icons. Use Lucide for interface icons. It adds only two spans.
- **Do not use:** Do not render large ASCII fields, encode required meaning only in the glyph, or use it for body copy or dense metadata.

## 6. Blurred photos

**Purpose:** A separate atmospheric image behind foreground content, without altering foreground artwork.

```jsx
<BlurredBackdrop className="rounded-2xl border border-[var(--mv-border)]">
  {children}
</BlurredBackdrop>
```

- **API:** `BlurredBackdrop({ src = defaultBackdrop, children, className = '' })`
- **CSS:** `.mv-texture-blurred-img`
- **Default asset:** `src/assets/dithered/ambient-backdrop.png`
- **Placement:** An occasional promotional panel or atmospheric section. Pass `src` only for background imagery.
- **Theme:** The scrim uses `--mv-blur-scrim`, with light and dark values.
- **Accessibility/performance:** The image has `alt=""` and `aria-hidden`; image and scrim use `pointer-events-none`, while content is at `z-10`. CSS blur is costly, so avoid repeated lists and large animated containers.
- **Do not use:** Never blur a manga cover, story cover, reader image, or any image whose detail conveys content.

## 7. Dithered images

**Purpose:** Crisp manga-adjacent promotional artwork generated before runtime.

```jsx
<DitheredArtwork alt="Dithered promotional artwork" className="rounded-xl" />
```

- **API:** `DitheredArtwork({ lightSrc, darkSrc, alt = 'Dithered promotional artwork', className = '' })`
- **CSS:** `.mv-texture-dithered`
- **Default assets:** `promo-horizon-light.png` and `promo-horizon-dark.png` in `src/assets/dithered/`
- **Generator:** `scripts/generate-dithered-assets.mjs`; run `npm run assets:dither` (also invoked by `prebuild`).
- **Placement:** Promotional artwork and featured editorial panels.
- **Theme:** `DitheredArtwork` reads `isDark` from `useTheme()` and selects the corresponding source image.
- **Accessibility/performance:** This is a lazy native `<img>`. Supply useful `alt` text for meaningful artwork, or `alt=""` for decoration. Floyd-Steinberg dithering runs at build time with `sharp`, not in a browser canvas.
- **Do not use:** Do not dither story covers, chapter images, or artwork that must retain original detail.

## 8. Pixel mosaics

**Purpose:** Deterministic geometric dividers and section transitions.

```jsx
<PixelMosaic cols={24} rows={2} className="my-6" />
```

- **API:** `PixelMosaic({ className = '', cols = 12, rows = 3 })`
- **CSS:** `.mv-pixel-mosaic-cell` is applied to each cell.
- **Placement:** Between large homepage sections, as a decorative band, or in a spacious panel.
- **Theme:** Cells use `--mv-mosaic-a`, `--mv-mosaic-b`, and `--mv-mosaic-c`, so the same pattern adapts to both themes.
- **Accessibility/performance:** The root is `aria-hidden="true"`. One span is created per cell; keep `cols` and `rows` modest. Cell transitions are disabled under reduced motion.
- **Do not use:** Do not use in repeated cards, as a focusable element, or at counts large enough to create unnecessary DOM nodes.

## Current implementation boundaries

- These eight components are exported from `src/components/textures`.
- No current component supports intensity presets, fade directions, seeded randomness, or generic layer-only APIs. Do not document or use those options until implemented.
- `--mv-contour-color` exists in the token file but is not currently consumed by `.mv-texture-contour`; the embedded SVG is the current source of contour color.
