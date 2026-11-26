const PATTERN = [
  'a', 'b', '0', 'c', 'a', '0', 'b', 'a', '0', 'c', 'b', '0',
  '0', 'a', 'c', 'b', '0', 'a', '0', 'c', 'a', '0', 'c', 'b',
  'b', '0', 'a', '0', 'c', 'b', 'a', '0', 'b', 'a', '0', 'c',
];

const CELL_BG = {
  a: 'var(--mv-mosaic-a)',
  b: 'var(--mv-mosaic-b)',
  c: 'var(--mv-mosaic-c)',
  '0': 'transparent',
};

export function PixelMosaic({ className = '', cols = 12, rows = 3 }) {
  const total = cols * rows;
  const cells = Array.from({ length: total }, (_, idx) => PATTERN[idx % PATTERN.length]);

  return (
    <div
      aria-hidden="true"
      className={`grid w-full overflow-hidden ${className}`.trim()}
      style={{
        gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
      }}
    >
      {cells.map((token, idx) => (
        <span
          key={idx}
          className="mv-pixel-mosaic-cell aspect-square w-full"
          style={{ backgroundColor: CELL_BG[token] }}
        />
      ))}
    </div>
  );
}
