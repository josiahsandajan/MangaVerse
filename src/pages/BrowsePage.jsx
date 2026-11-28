import { Search } from 'lucide-react';
import { Link, useSearchParams } from 'react-router-dom';
import { StoryCard } from '../components/story/StoryCard';
import { StoryGrid } from '../components/story/StoryGrid';
import { HalftoneRamp } from '../components/textures/HalftoneRamp';
import { Container } from '../components/ui/Container';
import { EmptyState } from '../components/ui/EmptyState';
import { MOCK_STORIES, NEW_STORIES, TRENDING_STORIES } from '../data/mockStories';

const ALL_STORIES = { title: 'All stories', stories: MOCK_STORIES };
const COLLECTIONS = new Map([
  ['trending', { title: 'Trending stories', stories: TRENDING_STORIES }],
  ['newest', { title: 'New releases', stories: NEW_STORIES }],
]);

export default function BrowsePage() {
  const [searchParams] = useSearchParams();
  const collection = COLLECTIONS.get(searchParams.get('sort')) ?? ALL_STORIES;
  const query = searchParams.get('q')?.trim() ?? '';
  const searchText = query.toLowerCase();
  const stories = searchText
    ? collection.stories.filter(({ title, author, genres }) =>
        [title, author, ...genres].some((value) => value.toLowerCase().includes(searchText))
      )
    : collection.stories;
  const storyCount = `${stories.length} ${stories.length === 1 ? 'story' : 'stories'}`;

  return (
    <Container className="py-8 sm:py-12">
      <header className="relative overflow-hidden rounded-2xl border border-[var(--mv-border)] bg-[var(--mv-surface)] px-5 py-7 sm:px-8 sm:py-10">
        <div className="pointer-events-none absolute inset-y-0 right-0 w-1/2">
          <HalftoneRamp direction="left" />
        </div>
        <div className="relative max-w-lg">
          <h1 className="text-3xl font-extrabold text-[var(--mv-text-primary)] sm:text-4xl">
            Browse stories
          </h1>
          <p className="mt-2 text-sm leading-relaxed text-[var(--mv-text-secondary)] sm:text-base">
            Explore manga, manhwa, manhua, light novels, and web novels.
          </p>
        </div>
      </header>

      <section aria-labelledby="browse-results" className="mt-8 sm:mt-10">
        <div className="mb-5 flex flex-wrap items-end justify-between gap-x-6 gap-y-2">
          <div className="min-w-0">
            <h2 id="browse-results" className="text-xl font-bold text-[var(--mv-text-primary)]">
              {query ? 'Search results' : collection.title}
            </h2>
            <p role="status" className="mt-1 wrap-anywhere text-sm text-[var(--mv-text-secondary)]">
              {storyCount}{query && <> for “{query}”</>}
            </p>
          </div>
          {(query || collection !== ALL_STORIES) && (
            <Link to="/browse" className="rounded-sm text-sm font-medium text-[var(--mv-accent-text)] underline underline-offset-4">
              View all stories
            </Link>
          )}
        </div>

        {stories.length > 0 ? (
          <StoryGrid>
            {stories.map((story) => (
              <StoryCard key={story.id} story={story} />
            ))}
          </StoryGrid>
        ) : (
          <EmptyState
            icon={Search}
            title="No stories found"
            description="Try a different title, author, or genre."
          />
        )}
      </section>
    </Container>
  );
}
