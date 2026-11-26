import { ArrowRight, BookOpen, Compass, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Container } from '../components/ui/Container';
import { GrainyGradient } from '../components/textures/GrainyGradient';
import { HalftoneOverlay } from '../components/textures/HalftoneOverlay';
import { PixelMosaic } from '../components/textures/PixelMosaic';
import { AsciiPixelAccent } from '../components/textures/AsciiPixelAccent';
import { StoryCard } from '../components/story/StoryCard';
import { StoryGrid } from '../components/story/StoryGrid';
import { TRENDING_STORIES, NEW_STORIES } from '../data/mockStories';

function SectionHeader({ eyebrow, icon: Icon, title, linkTo, linkLabel }) {
  return (
    <div className="mb-5 flex items-end justify-between gap-4">
      <div>
        <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[var(--mv-accent-text)]">
          {Icon && <Icon className="h-3.5 w-3.5" aria-hidden="true" />}
          <span>{eyebrow}</span>
        </div>
        <h2 className="mt-1 text-xl font-bold text-[var(--mv-text-primary)] sm:text-2xl">
          {title}
        </h2>
      </div>
      {linkTo && (
        <Link
          to={linkTo}
          className="flex shrink-0 items-center gap-1 text-sm font-medium text-[var(--mv-accent-text)] transition-opacity duration-150 hover:opacity-70"
        >
          {linkLabel ?? 'View all'}
          <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
        </Link>
      )}
    </div>
  );
}

export default function HomePage() {
  return (
    <>
      {/* Hero Section */}
      <GrainyGradient as="section" className="relative overflow-hidden">
        <HalftoneOverlay className="absolute inset-0" />
        <Container className="relative py-14 sm:py-20">
          <div className="max-w-2xl">
            <AsciiPixelAccent glyph="//">DISCOVER & TRACK</AsciiPixelAccent>
            <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-[var(--mv-text-primary)] sm:text-5xl">
              Your next story
              <br />
              <span className="text-[var(--mv-accent-text)]">starts here.</span>
            </h1>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-[var(--mv-text-secondary)] sm:text-lg">
              Discover manga, manhwa, manhua, light novels, and web novels.
              Organize your library, track progress, and join the conversation.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                to="/browse"
                className="inline-flex h-11 items-center gap-2 rounded-xl border border-transparent bg-[var(--mv-accent)] px-5 text-sm font-medium text-[var(--mv-on-accent)] shadow-[var(--mv-shadow-xs)] transition-colors duration-150 hover:bg-[var(--mv-accent-hover)] active:bg-[var(--mv-accent-active)]"
              >
                <Compass className="h-4 w-4 shrink-0" aria-hidden="true" />
                Browse Catalog
              </Link>
              <Link
                to="/library"
                className="inline-flex h-11 items-center gap-2 rounded-xl border border-[var(--mv-border)] bg-[var(--mv-surface-subtle)] px-5 text-sm font-medium text-[var(--mv-text-primary)] transition-colors duration-150 hover:bg-[var(--mv-border)]"
              >
                <BookOpen className="h-4 w-4 shrink-0" aria-hidden="true" />
                My Library
              </Link>
            </div>
          </div>
        </Container>
      </GrainyGradient>

      {/* Pixel mosaic divider */}
      <PixelMosaic cols={24} rows={2} />

      {/* Trending Now */}
      <section aria-labelledby="trending-heading" className="py-8 sm:py-10">
        <Container>
          <SectionHeader
            eyebrow="Trending Now"
            icon={TrendingUp}
            title="What everyone is reading"
            linkTo="/browse?sort=trending"
            linkLabel="See all trending"
          />
          <StoryGrid>
            {TRENDING_STORIES.map((story) => (
              <StoryCard key={story.id} story={story} />
            ))}
          </StoryGrid>
        </Container>
      </section>

      {/* Pixel mosaic divider */}
      <PixelMosaic cols={24} rows={2} />

      {/* New Releases */}
      <section aria-labelledby="new-heading" className="py-8 sm:py-10">
        <Container>
          <SectionHeader
            eyebrow="New Releases"
            icon={BookOpen}
            title="Recently added &amp; updated"
            linkTo="/browse?sort=newest"
            linkLabel="See all new"
          />
          <StoryGrid>
            {NEW_STORIES.map((story) => (
              <StoryCard key={story.id} story={story} />
            ))}
          </StoryGrid>
        </Container>
      </section>

      {/* Bottom spacer */}
      <div className="py-6 sm:py-10" />
    </>
  );
}
