import { useState } from 'react';
import {
  BookMarked,
  BookOpen,
  Check,
  Compass,
  Eye,
  Layers,
  Palette,
  Search,
  Sparkles,
  Type,
} from 'lucide-react';
import {
  Alert,
  Badge,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Checkbox,
  Container,
  EmptyState,
  Input,
  Select,
  Switch,
  Textarea,
  ThemeToggle,
} from '../components/ui';
import {
  AsciiPixelAccent,
  BlurredBackdrop,
  ContourLines,
  DitheredArtwork,
  GrainyGradient,
  HalftoneOverlay,
  PaperTexture,
  PixelMosaic,
} from '../components/textures';
import promoSource from '../assets/dithered/promo-horizon-source.png';

const COLOR_GROUPS = [
  {
    title: 'Surfaces & Borders',
    tokens: [
      { name: 'Background', cssVar: '--mv-bg', hexLight: '#F7F8FC', hexDark: '#0F1117' },
      { name: 'Surface', cssVar: '--mv-surface', hexLight: '#FFFFFF', hexDark: '#161923' },
      { name: 'Surface Subtle', cssVar: '--mv-surface-subtle', hexLight: '#F1F3F9', hexDark: '#1D2130' },
      { name: 'Border', cssVar: '--mv-border', hexLight: '#E6E8EF', hexDark: '#272C3D' },
    ],
  },
  {
    title: 'Brand & Typography',
    tokens: [
      { name: 'Primary Accent', cssVar: '--mv-accent', hexLight: '#635BDB', hexDark: '#635BDB' },
      { name: 'Accent Text', cssVar: '--mv-accent-text', hexLight: '#564ED1', hexDark: '#9B95F7' },
      { name: 'Primary Text', cssVar: '--mv-text-primary', hexLight: '#171923', hexDark: '#F3F5FA' },
      { name: 'Secondary Text', cssVar: '--mv-text-secondary', hexLight: '#667085', hexDark: '#A1A9BC' },
    ],
  },
  {
    title: 'Semantic Status',
    tokens: [
      { name: 'Success', cssVar: '--mv-success', hexLight: '#16845B', hexDark: '#2FB37E' },
      { name: 'Warning', cssVar: '--mv-warning', hexLight: '#B7791F', hexDark: '#E09F3E' },
      { name: 'Error', cssVar: '--mv-error', hexLight: '#D14343', hexDark: '#F06464' },
      { name: 'Info', cssVar: '--mv-info', hexLight: '#3974C6', hexDark: '#5D9CEC' },
    ],
  },
];

function SectionHeader({ id, icon: Icon, eyebrow, title, description }) {
  return (
    <div id={id} className="scroll-mt-24 mb-6">
      <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[var(--mv-accent-text)]">
        {Icon && <Icon className="h-3.5 w-3.5" aria-hidden="true" />}
        <span>{eyebrow}</span>
      </div>
      <h2 className="mt-1 text-2xl font-bold text-[var(--mv-text-primary)] sm:text-3xl">
        {title}
      </h2>
      {description && (
        <p className="mt-1.5 max-w-2xl text-sm text-[var(--mv-text-secondary)]">
          {description}
        </p>
      )}
    </div>
  );
}

export default function DesignSystemPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [formatFilter, setFormatFilter] = useState('manga');
  const [notes, setNotes] = useState('');
  const [spoilerGuard, setSpoilerGuard] = useState(true);
  const [compactCards, setCompactCards] = useState(false);
  const [isLoadingDemo, setIsLoadingDemo] = useState(false);
  const [readingSize, setReadingSize] = useState('17');
  const [readingLeading, setReadingLeading] = useState('1.75');

  const triggerLoadingDemo = () => {
    setIsLoadingDemo(true);
    window.setTimeout(() => setIsLoadingDemo(false), 1200);
  };

  return (
    <div className="min-h-screen bg-[var(--mv-bg)] text-[var(--mv-text-primary)]">
      {/* Top Bar */}
      <header className="sticky top-0 z-30 border-b border-[var(--mv-border)] bg-[var(--mv-surface)]/90 backdrop-blur-md">
        <Container className="flex h-16 items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[var(--mv-accent)] text-[var(--mv-on-accent)]">
              <BookMarked className="h-4 w-4" aria-hidden="true" />
            </div>
            <div>
              <span className="font-[family-name:var(--font-heading)] text-base font-bold tracking-tight">
                MangaVerse
              </span>
              <span className="ml-2 hidden rounded-md bg-[var(--mv-accent-soft)] px-2 py-0.5 text-[11px] font-semibold text-[var(--mv-accent-text)] sm:inline-block">
                DEV / DESIGN SYSTEM
              </span>
            </div>
          </div>

          <nav aria-label="Design system sections" className="hidden items-center gap-5 text-sm font-medium text-[var(--mv-text-secondary)] md:flex">
            <a href="#tokens" className="hover:text-[var(--mv-text-primary)]">Tokens</a>
            <a href="#typography" className="hover:text-[var(--mv-text-primary)]">Typography</a>
            <a href="#controls" className="hover:text-[var(--mv-text-primary)]">Controls</a>
            <a href="#surfaces" className="hover:text-[var(--mv-text-primary)]">Surfaces</a>
            <a href="#textures" className="hover:text-[var(--mv-text-primary)]">Textures</a>
          </nav>

          <div className="flex items-center gap-2">
            <ThemeToggle showLabel />
          </div>
        </Container>
      </header>

      <main className="py-8 sm:py-12">
        <Container className="space-y-16">
          {/* Hero */}
          <GrainyGradient className="rounded-2xl border border-[var(--mv-border)] p-6 shadow-[var(--mv-shadow-sm)] sm:p-10">
            <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div className="max-w-2xl space-y-3">
                <AsciiPixelAccent glyph="01">
                  DESIGN SYSTEM FOUNDATION
                </AsciiPixelAccent>
                <h1 className="text-3xl font-extrabold tracking-tight text-[var(--mv-text-primary)] sm:text-4xl">
                  Visual Tokens, Components &amp; Eight Texture Treatments
                </h1>
                <p className="text-sm leading-relaxed text-[var(--mv-text-secondary)] sm:text-base">
                  Development-only reference route for MangaVerse. Built with React,
                  Tailwind CSS v4, CSS custom properties, Lucide icons, and
                  build-time dithered static assets.
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                <Badge variant="accent">Light Default</Badge>
                <Badge variant="success">WCAG AA Contrast</Badge>
                <Badge variant="neutral">Dev-Only Route</Badge>
              </div>
            </div>
          </GrainyGradient>

          {/* 1. Color Palette */}
          <section aria-labelledby="tokens">
            <SectionHeader
              id="tokens"
              icon={Palette}
              eyebrow="01 / Color System"
              title="Design Tokens & Theme Palette"
              description="Semantic CSS variables switch cleanly between light and dark themes while preserving contrast."
            />
            <div className="grid gap-6 md:grid-cols-3">
              {COLOR_GROUPS.map((group) => (
                <Card key={group.title}>
                  <CardHeader>
                    <CardTitle>{group.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {group.tokens.map((token) => (
                      <div
                        key={token.cssVar}
                        className="flex items-center justify-between gap-3 rounded-xl border border-[var(--mv-border)] p-2.5"
                      >
                        <div className="flex items-center gap-3">
                          <span
                            className="h-8 w-8 shrink-0 rounded-lg border border-[var(--mv-border-strong)]"
                            style={{ backgroundColor: `var(${token.cssVar})` }}
                            aria-hidden="true"
                          />
                          <div>
                            <p className="text-sm font-medium text-[var(--mv-text-primary)]">
                              {token.name}
                            </p>
                            <p className="font-mono text-[11px] text-[var(--mv-text-muted)]">
                              {token.cssVar}
                            </p>
                          </div>
                        </div>
                        <span className="font-mono text-[11px] text-[var(--mv-text-secondary)]">
                          {token.hexLight}
                        </span>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* 2. Typography */}
          <section aria-labelledby="typography">
            <SectionHeader
              id="typography"
              icon={Type}
              eyebrow="02 / Typography"
              title="Manrope, Inter & Adjustable Novel Reading Font"
              description="Distinct roles for editorial headings, clean UI copy, and comfortable long-form novel reading."
            />
            <div className="grid gap-6 lg:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Display &amp; Interface Scale</CardTitle>
                  <CardDescription>
                    Manrope for headings, Inter for UI controls and body text.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="border-b border-[var(--mv-border)] pb-3">
                    <span className="font-mono text-xs text-[var(--mv-text-muted)]">
                      H1 / Manrope Bold
                    </span>
                    <p className="mt-1 font-[family-name:var(--font-heading)] text-3xl font-bold">
                      Unified Story Identity
                    </p>
                  </div>
                  <div className="border-b border-[var(--mv-border)] pb-3">
                    <span className="font-mono text-xs text-[var(--mv-text-muted)]">
                      H2 / Manrope SemiBold
                    </span>
                    <p className="mt-1 font-[family-name:var(--font-heading)] text-xl font-semibold">
                      Editions, Adaptations &amp; Reading Lists
                    </p>
                  </div>
                  <div>
                    <span className="font-mono text-xs text-[var(--mv-text-muted)]">
                      Body / Inter Regular (14px–16px)
                    </span>
                    <p className="mt-1 text-sm leading-relaxed text-[var(--mv-text-secondary)]">
                      Track progress across manga, manhwa, manhua, light novels,
                      and web novels with clean metadata and spoiler-aware
                      discussions.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <PaperTexture className="rounded-2xl border border-[var(--mv-border)] shadow-[var(--mv-shadow-xs)]">
                <div className="p-5">
                  <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--mv-border)] pb-4">
                    <div>
                      <h3 className="text-base font-semibold">
                        Novel Reading Surface (Literata)
                      </h3>
                      <p className="text-xs text-[var(--mv-text-secondary)]">
                        Adjustable size and line-height over subtle paper grain.
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <select
                        aria-label="Reading font size"
                        value={readingSize}
                        onChange={(e) => setReadingSize(e.target.value)}
                        className="h-9 rounded-lg border border-[var(--mv-border)] bg-[var(--mv-surface)] px-2.5 text-xs"
                      >
                        <option value="15">15px</option>
                        <option value="17">17px</option>
                        <option value="19">19px</option>
                      </select>
                      <select
                        aria-label="Reading line height"
                        value={readingLeading}
                        onChange={(e) => setReadingLeading(e.target.value)}
                        className="h-9 rounded-lg border border-[var(--mv-border)] bg-[var(--mv-surface)] px-2.5 text-xs"
                      >
                        <option value="1.6">1.6x</option>
                        <option value="1.75">1.75x</option>
                        <option value="1.9">1.9x</option>
                      </select>
                    </div>
                  </div>
                  <p
                    className="mt-4 font-[family-name:var(--font-reading)] text-[var(--mv-text-primary)]"
                    style={{
                      fontSize: `${readingSize}px`,
                      lineHeight: readingLeading,
                    }}
                  >
                    Beyond the observatory ridge, ink-dark clouds gathered above
                    the archival tower. Every volume cataloged within its vaults
                    carried the same story across shifting languages and mediums.
                  </p>
                </div>
              </PaperTexture>
            </div>
          </section>

          {/* 3. Buttons & Form Controls */}
          <section aria-labelledby="controls">
            <SectionHeader
              id="controls"
              icon={Sparkles}
              eyebrow="03 / Interactive Controls"
              title="Buttons, Inputs & Form States"
              description="Consistent focus rings, minimum touch targets, and explicit loading, error, success, and disabled states."
            />
            <div className="grid gap-6 lg:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Button Variants &amp; States</CardTitle>
                  <CardDescription>
                    Primary, secondary, outline, ghost, danger, and loading states.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-5">
                  <div className="flex flex-wrap items-center gap-2.5">
                    <Button variant="primary">Primary Action</Button>
                    <Button variant="secondary">Secondary</Button>
                    <Button variant="outline">Outline</Button>
                    <Button variant="ghost">Ghost</Button>
                    <Button variant="danger">Danger</Button>
                  </div>
                  <div className="flex flex-wrap items-center gap-2.5">
                    <Button size="sm" leftIcon={BookOpen}>
                      Small
                    </Button>
                    <Button size="md" leftIcon={Compass}>
                      Medium
                    </Button>
                    <Button size="lg" rightIcon={Check}>
                      Large
                    </Button>
                    <Button
                      variant="outline"
                      iconOnly
                      aria-label="Preview item"
                      leftIcon={Eye}
                    />
                  </div>
                  <div className="flex flex-wrap items-center gap-2.5 pt-1">
                    <Button loading={isLoadingDemo} onClick={triggerLoadingDemo}>
                      {isLoadingDemo ? 'Saving...' : 'Test Loading State'}
                    </Button>
                    <Button disabled>Disabled</Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Form Elements &amp; Validation</CardTitle>
                  <CardDescription>
                    Accessible labels, descriptions, and semantic feedback.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <Input
                      label="Search Catalog"
                      placeholder="Filter by title or author..."
                      leftIcon={Search}
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <Select
                      label="Story Format"
                      value={formatFilter}
                      onChange={(e) => setFormatFilter(e.target.value)}
                      options={[
                        { value: 'manga', label: 'Manga' },
                        { value: 'manhwa', label: 'Manhwa' },
                        { value: 'manhua', label: 'Manhua' },
                        { value: 'light-novel', label: 'Light Novel' },
                        { value: 'web-novel', label: 'Web Novel' },
                      ]}
                    />
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <Input
                      label="Valid Input"
                      defaultValue="josiah_reader"
                      success="Username format is valid."
                    />
                    <Input
                      label="Invalid Input"
                      defaultValue="http://invalid"
                      error="External provider URL must use HTTPS."
                    />
                  </div>
                  <Textarea
                    label="Reader Note"
                    rows={2}
                    placeholder="Add a personal reading note..."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    helperText="Supports spoiler-safe personal annotations."
                  />
                  <div className="flex flex-col gap-3 pt-1 sm:flex-row sm:items-center sm:justify-between">
                    <Checkbox
                      label="Hide spoiler chapters"
                      description="Blur unvisited discussion previews"
                      checked={spoilerGuard}
                      onChange={(e) => setSpoilerGuard(e.target.checked)}
                    />
                    <Switch
                      label="Compact density"
                      checked={compactCards}
                      onChange={setCompactCards}
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* 4. Cards, Alerts, Badges & Empty States */}
          <section aria-labelledby="surfaces">
            <SectionHeader
              id="surfaces"
              icon={Layers}
              eyebrow="04 / Surfaces & Feedback"
              title="Cards, Badges, Alerts & Empty States"
              description="Reusable structural containers with 12–16px radii and clear visual hierarchy."
            />
            <div className="grid gap-6 lg:grid-cols-3">
              <Card interactive>
                <CardHeader>
                  <div className="flex items-center justify-between gap-2">
                    <Badge variant="accent">Surface Card</Badge>
                    <Badge variant="success">Completed</Badge>
                  </div>
                  <CardTitle className="mt-3">Interactive Card Container</CardTitle>
                  <CardDescription>
                    Uses 16px border radius, subtle border elevation, and clear
                    header/content/footer rhythm.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-1.5">
                    <Badge variant="neutral">Neutral</Badge>
                    <Badge variant="info">Info</Badge>
                    <Badge variant="warning">Warning</Badge>
                    <Badge variant="error">Error</Badge>
                  </div>
                </CardContent>
                <CardFooter>
                  <span className="text-xs text-[var(--mv-text-muted)]">
                    Radius: 16px
                  </span>
                  <Button size="sm" variant="ghost">
                    Inspect
                  </Button>
                </CardFooter>
              </Card>

              <div className="space-y-3">
                <Alert variant="info" title="External Reading Provider">
                  Chapters link out to verified external reading sources.
                </Alert>
                <Alert variant="success" title="Progress Saved">
                  Bookmark and reading status updated cleanly.
                </Alert>
                <Alert variant="warning" title="Spoiler Guard Active">
                  Unmarked late-chapter comments are collapsed.
                </Alert>
                <Alert variant="error" title="Validation Failed">
                  Please check required fields before submitting.
                </Alert>
              </div>

              <EmptyState
                title="No Matching Entries"
                description="Contour-line texture gives empty states quiet visual depth without competing with the call to action."
                action={
                  <Button size="sm" variant="secondary">
                    Reset Filters
                  </Button>
                }
              />
            </div>
          </section>

          {/* 5. Eight Visual Texture Treatments */}
          <section aria-labelledby="textures">
            <SectionHeader
              id="textures"
              icon={Sparkles}
              eyebrow="05 / Visual Texture System"
              title="Eight Approved Visual Treatments"
              description="Balanced, intentional application across both themes. Respects prefers-reduced-motion and never alters actual manga cover artwork."
            />

            <div className="grid gap-6 md:grid-cols-2">
              {/* 1. Paper Texture */}
              <PaperTexture className="rounded-2xl border border-[var(--mv-border)] p-5">
                <Badge variant="neutral">1 / Paper Texture</Badge>
                <h3 className="mt-3 text-base font-semibold">
                  Reading &amp; Editorial Surfaces
                </h3>
                <p className="mt-1 text-sm text-[var(--mv-text-secondary)]">
                  Subtle inline SVG fractalNoise overlay calibrated for light and
                  dark reading backgrounds.
                </p>
              </PaperTexture>

              {/* 2. Halftone */}
              <HalftoneOverlay className="rounded-2xl border border-[var(--mv-border)] bg-[var(--mv-surface)] p-5">
                <Badge variant="accent">2 / Halftone</Badge>
                <h3 className="mt-3 text-base font-semibold">
                  Manga-Inspired Dot Matrix
                </h3>
                <p className="mt-1 text-sm text-[var(--mv-text-secondary)]">
                  Pure CSS radial-gradient dot grid for promotional callouts and
                  accent panels.
                </p>
              </HalftoneOverlay>

              {/* 3. Grainy Gradients */}
              <GrainyGradient className="rounded-2xl border border-[var(--mv-border)] p-5">
                <Badge variant="info">3 / Grainy Gradients</Badge>
                <h3 className="mt-3 text-base font-semibold">
                  Atmospheric Hero Backdrops
                </h3>
                <p className="mt-1 text-sm text-[var(--mv-text-secondary)]">
                  Multi-point radial gradients paired with fine noise grain for
                  featured headers.
                </p>
              </GrainyGradient>

              {/* 4. Contour Lines */}
              <ContourLines className="rounded-2xl border border-[var(--mv-border)] bg-[var(--mv-surface)] p-5">
                <Badge variant="success">4 / Contour Lines</Badge>
                <h3 className="mt-3 text-base font-semibold">
                  Topographic Empty States &amp; Sections
                </h3>
                <p className="mt-1 text-sm text-[var(--mv-text-secondary)]">
                  Lightweight repeating SVG contour paths for quiet structural
                  depth.
                </p>
              </ContourLines>

              {/* 5. ASCII & Pixels */}
              <Card>
                <CardContent className="pt-5">
                  <Badge variant="neutral">5 / ASCII &amp; Pixels</Badge>
                  <h3 className="mt-3 text-base font-semibold">
                    Decorative Monospace Accents
                  </h3>
                  <p className="mt-1 text-sm text-[var(--mv-text-secondary)]">
                    Crisp monospace tags and pixel-notched badges used sparingly
                    so body readability is never compromised.
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2.5">
                    <AsciiPixelAccent glyph="::">VOL.01</AsciiPixelAccent>
                    <AsciiPixelAccent glyph="[]">CH.142</AsciiPixelAccent>
                    <AsciiPixelAccent glyph=">>">EDITION</AsciiPixelAccent>
                  </div>
                </CardContent>
              </Card>

              {/* 6. Blurred Photos */}
              <BlurredBackdrop className="rounded-2xl border border-[var(--mv-border)] p-5">
                <Badge variant="warning">6 / Blurred Photos</Badge>
                <h3 className="mt-3 text-base font-semibold">
                  Atmospheric Backdrop Imagery
                </h3>
                <p className="mt-1 text-sm text-[var(--mv-text-secondary)]">
                  Separate ambient imagery blurred behind a contrast-safe scrim.
                  Never applied to actual manga covers.
                </p>
              </BlurredBackdrop>

              {/* 7. Dithered Images */}
              <Card className="md:col-span-2">
                <CardHeader>
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <Badge variant="accent">7 / Dithered Images (Build-Time Sharp)</Badge>
                    <span className="font-mono text-xs text-[var(--mv-text-muted)]">
                      scripts/generate-dithered-assets.mjs
                    </span>
                  </div>
                  <CardTitle className="mt-2">
                    Floyd-Steinberg Build-Time Dithering
                  </CardTitle>
                  <CardDescription>
                    Static promotional artwork dithered at build time with sharp
                    for crisp theme-aware rendering without runtime canvas cost.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="overflow-hidden rounded-xl border border-[var(--mv-border)]">
                      <img
                        src={promoSource}
                        alt="Original promotional landscape artwork"
                        className="block h-auto w-full object-cover"
                      />
                      <div className="border-t border-[var(--mv-border)] bg-[var(--mv-surface-subtle)] px-3 py-2 text-xs text-[var(--mv-text-secondary)]">
                        Original source artwork (preserved untouched)
                      </div>
                    </div>
                    <div className="overflow-hidden rounded-xl border border-[var(--mv-border)]">
                      <DitheredArtwork alt="Build-time Floyd-Steinberg dithered promotional artwork" />
                      <div className="border-t border-[var(--mv-border)] bg-[var(--mv-surface-subtle)] px-3 py-2 text-xs text-[var(--mv-text-secondary)]">
                        Build-time dithered output (auto-switches with theme)
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* 8. Pixel Mosaics */}
              <Card className="md:col-span-2 overflow-hidden">
                <CardHeader>
                  <Badge variant="info">8 / Pixel Mosaics</Badge>
                  <CardTitle className="mt-2">
                    Section Dividers &amp; Transitions
                  </CardTitle>
                  <CardDescription>
                    Deterministic CSS grid mosaic for decorative bands and
                    visual transitions.
                  </CardDescription>
                </CardHeader>
                <CardContent className="pb-0">
                  <div className="overflow-hidden rounded-t-xl border border-b-0 border-[var(--mv-border)]">
                    <PixelMosaic cols={24} rows={3} />
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>
        </Container>
      </main>
    </div>
  );
}
