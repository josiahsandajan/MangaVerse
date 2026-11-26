import ditheredLight from '../../assets/dithered/promo-horizon-light.png';
import ditheredDark from '../../assets/dithered/promo-horizon-dark.png';
import { useTheme } from '../../context/ThemeContext';

export function DitheredArtwork({
  lightSrc = ditheredLight,
  darkSrc = ditheredDark,
  alt = 'Dithered promotional artwork',
  className = '',
}) {
  const { isDark } = useTheme();

  return (
    <img
      src={isDark ? darkSrc : lightSrc}
      alt={alt}
      className={`mv-texture-dithered block h-auto w-full object-cover ${className}`.trim()}
      loading="lazy"
    />
  );
}
