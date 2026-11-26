import { Link } from 'react-router-dom';
import { Badge } from '../ui/Badge';
import { FORMAT_BADGE_VARIANT, FORMAT_LABELS } from '../../data/mockStories';
import { CheckCircle2, PauseCircle, Star } from 'lucide-react';

function StatusIndicator({ status }) {
  if (status === 'completed') {
    return (
      <span
        aria-label="Completed"
        className="flex h-5 w-5 items-center justify-center rounded-full bg-[var(--mv-success)] text-white shadow-sm"
      >
        <CheckCircle2 className="h-3 w-3" aria-hidden="true" />
      </span>
    );
  }
  if (status === 'hiatus') {
    return (
      <span
        aria-label="On hiatus"
        className="flex h-5 w-5 items-center justify-center rounded-full bg-[var(--mv-warning)] text-white shadow-sm"
      >
        <PauseCircle className="h-3 w-3" aria-hidden="true" />
      </span>
    );
  }
  return null;
}

export function StoryCard({ story }) {
  const formatLabel = FORMAT_LABELS[story.format] ?? story.format;
  const badgeVariant = FORMAT_BADGE_VARIANT[story.format] ?? 'neutral';

  return (
    <article className="group">
      <Link
        to={`/story/${story.id}`}
        className="block rounded-2xl outline-none focus-visible:ring-2 focus-visible:ring-[var(--mv-accent-ring)] focus-visible:ring-offset-2"
        aria-label={`${story.title} — ${formatLabel}`}
      >
        {/* Cover */}
        <div className="relative overflow-hidden rounded-xl" style={{ aspectRatio: '2/3' }}>
          {/* Gradient background (never an actual manga cover image) */}
          <div
            aria-hidden="true"
            className="absolute inset-0"
            style={{ background: story.coverGradient }}
          />

          {/* Subtle radial highlight */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_30%_20%,rgba(255,255,255,0.12),transparent_60%)]"
          />

          {/* Bottom scrim for badge legibility */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-black/55 to-transparent"
          />

          {/* Hover shimmer */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-black/0 transition-colors duration-150 group-hover:bg-black/12"
          />

          {/* Top-right: status or "new" indicator */}
          <div className="absolute right-2 top-2 flex flex-col items-end gap-1">
            {story.isNew && (
              <span className="rounded-full bg-[var(--mv-accent)] px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-white shadow-sm">
                New
              </span>
            )}
            <StatusIndicator status={story.status} />
          </div>

          {/* Bottom-left: format badge */}
          <div className="absolute bottom-2 left-2">
            <Badge variant={badgeVariant} className="shadow-sm text-[10px] py-0 px-2 h-5">
              {formatLabel}
            </Badge>
          </div>
        </div>

        {/* Meta */}
        <div className="px-0.5 pt-2.5 pb-1">
          <h3 className="line-clamp-2 text-sm font-semibold leading-snug text-[var(--mv-text-primary)]">
            {story.title}
          </h3>
          <p className="mt-0.5 truncate text-xs text-[var(--mv-text-secondary)]">
            {story.author}
          </p>
          <div className="mt-1.5 flex items-center gap-1.5">
            <Star
              className="h-3 w-3 shrink-0 fill-[var(--mv-warning)] text-[var(--mv-warning)]"
              aria-hidden="true"
            />
            <span className="text-xs text-[var(--mv-text-muted)]">{story.rating.toFixed(1)}</span>
            <span className="text-[var(--mv-border-strong)] text-xs" aria-hidden="true">
              ·
            </span>
            <span className="text-xs text-[var(--mv-text-muted)]">
              {story.chapters.toLocaleString()} ch.
            </span>
          </div>
        </div>
      </Link>
    </article>
  );
}
