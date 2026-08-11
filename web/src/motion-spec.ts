/** Scroll progress 0–1: video scrub + identity reveal timing. */

export const scrollDuration = {
  desktop: 420,
  tablet: 360,
  mobile: 300,
} as const;

/** Still → video crossfade on load (ms) */
export const introCrossfadeMs = 3200;

export const progressSmoothing = 0.12;

export const videoScroll = {
  start: 0.03,
  end: 0.9,
} as const;

/** Video clock catch-up (higher = more responsive to scroll) */
export const videoTimeSmoothing = 0.16;

function clamp01(t: number) {
  return Math.min(1, Math.max(0, t));
}

function smoothstep(t: number) {
  const p = clamp01(t);
  return p * p * (3 - 2 * p);
}

function phaseT(progress: number, start: number, end: number) {
  if (progress <= start) return 0;
  if (progress >= end) return 1;
  return (progress - start) / (end - start);
}

export function mapScrollToVideoTime(scrollProgress: number): number {
  const p = clamp01(scrollProgress);
  const { start, end } = videoScroll;
  if (p <= start) return 0;
  if (p >= end) return 1;
  const t = (p - start) / (end - start);
  return smoothstep(t);
}

export function scrollPosterFade(progress: number): number {
  const p = clamp01(progress);
  if (p <= 0.005) return 1;
  if (p >= 0.35) return 0;
  return 1 - smoothstep((p - 0.005) / 0.345);
}

export function combinedPosterOpacity(
  introBlend: number,
  scrollProgress: number,
): number {
  const introPoster = 1 - smoothstep(introBlend);
  const scrollPoster = scrollPosterFade(scrollProgress);
  return clamp01(introPoster * scrollPoster);
}

export function sampleTextReveal(progress: number) {
  const p = clamp01(progress);
  const text = phaseT(p, 0.25, 0.48);
  const ease = smoothstep(text);
  return {
    line1: ease,
    line2: ease,
    line3: ease,
  };
}

export function computeScrollProgress(section: HTMLElement): number {
  const vh = window.innerHeight;
  const scrollable = section.offsetHeight - vh;
  if (scrollable <= 1) return 0;
  const top = section.getBoundingClientRect().top;
  const scrolled = Math.min(scrollable, Math.max(0, -top));
  return scrolled / scrollable;
}

function seekVideo(video: HTMLVideoElement, time: number) {
  const t = Math.max(0, Math.min(time, video.duration || time));
  if (Number.isFinite(t) && Math.abs(video.currentTime - t) > 0.01) {
    if (typeof video.fastSeek === 'function') {
      try {
        video.fastSeek(t);
        return;
      } catch {
        /* fall through */
      }
    }
    video.currentTime = t;
  }
}

export { seekVideo };
