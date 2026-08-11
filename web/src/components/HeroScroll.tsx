import { useEffect, useRef, useState } from 'react';
import {
  combinedPosterOpacity,
  computeScrollProgress,
  introCrossfadeMs,
  mapScrollToVideoTime,
  progressSmoothing,
  sampleTextReveal,
  scrollDuration,
  seekVideo,
  videoTimeSmoothing,
} from '../motion-spec';
import { useReducedMotion } from '../hooks/useReducedMotion';
import './HeroScroll.css';

const base = import.meta.env.BASE_URL;

const KEYFRAME = `${base}references/hero-keyframe-start.png`;
const MOTION_VIDEO = `${base}references/hero-motion-reference.mp4`;

function getScrollHeightVh() {
  const w = window.innerWidth;
  if (w < 640) return scrollDuration.mobile;
  if (w < 1024) return scrollDuration.tablet;
  return scrollDuration.desktop;
}

function readDebugProgress(): number | null {
  const raw = new URLSearchParams(window.location.search).get('heroProgress');
  if (raw == null) return null;
  const n = Number(raw);
  return Number.isFinite(n) ? Math.min(1, Math.max(0, n)) : null;
}

export function HeroScroll() {
  const reduced = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const posterRef = useRef<HTMLImageElement>(null);
  const identityRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(reduced ? 1 : 0);
  const [videoReady, setVideoReady] = useState(false);

  const targetProgressRef = useRef(reduced ? 1 : 0);
  const smoothProgressRef = useRef(reduced ? 1 : 0);
  const introBlendRef = useRef(1);
  const introStartRef = useRef<number | null>(null);
  const durationRef = useRef(0);
  const smoothVideoTimeRef = useRef(0);
  const snapRef = useRef(false);

  const scrollVh = reduced ? 0 : getScrollHeightVh();
  const spacerVh = Math.max(0, scrollVh - 100);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || reduced) return;

    const ready = () => {
      const d = video.duration;
      if (!Number.isFinite(d) || d <= 0) return;
      durationRef.current = d;
      video.pause();
      seekVideo(video, 0);
      setVideoReady(true);
      if (introStartRef.current == null) {
        introStartRef.current = performance.now();
      }
    };

    video.addEventListener('loadedmetadata', ready);
    video.addEventListener('loadeddata', ready);
    video.addEventListener('canplay', ready);
    if (video.readyState >= 2) ready();

    return () => {
      video.removeEventListener('loadedmetadata', ready);
      video.removeEventListener('loadeddata', ready);
      video.removeEventListener('canplay', ready);
    };
  }, [reduced]);

  useEffect(() => {
    const syncScroll = () => {
      const section = sectionRef.current;
      if (!section) return;

      const forced = readDebugProgress();
      if (forced != null) {
        snapRef.current = true;
        targetProgressRef.current = forced;
        smoothProgressRef.current = forced;
        introBlendRef.current = 1;
        setScrollProgress(forced);
        return;
      }
      snapRef.current = false;

      if (reduced) {
        targetProgressRef.current = 1;
        smoothProgressRef.current = 1;
        return;
      }

      const p = computeScrollProgress(section);
      targetProgressRef.current = p;
      setScrollProgress(p);

      if (p > 0.015) {
        introBlendRef.current = 1;
      }
    };

    window.addEventListener('scroll', syncScroll, { passive: true });
    window.addEventListener('resize', syncScroll);
    syncScroll();
    return () => {
      window.removeEventListener('scroll', syncScroll);
      window.removeEventListener('resize', syncScroll);
    };
  }, [reduced, scrollVh]);

  useEffect(() => {
    if (reduced) return;

    let raf = 0;

    const tick = (now: number) => {
      const section = sectionRef.current;
      if (section) {
        const p = computeScrollProgress(section);
        targetProgressRef.current = p;
        if (p > 0.015) introBlendRef.current = 1;
      }

      if (
        videoReady &&
        introStartRef.current != null &&
        introBlendRef.current < 1
      ) {
        const t = (now - introStartRef.current) / introCrossfadeMs;
        introBlendRef.current = Math.min(1, t * t * (3 - 2 * t));
      }

      const target = targetProgressRef.current;
      let smooth = smoothProgressRef.current;

      if (snapRef.current) {
        smooth = target;
      } else {
        smooth += (target - smooth) * progressSmoothing;
        if (Math.abs(target - smooth) < 0.0005) smooth = target;
      }
      smoothProgressRef.current = smooth;

      const videoTarget = mapScrollToVideoTime(smooth);
      const posterAlpha = combinedPosterOpacity(introBlendRef.current, smooth);

      const poster = posterRef.current;
      const video = videoRef.current;
      if (poster) {
        poster.style.opacity = String(posterAlpha);
        poster.style.visibility = posterAlpha < 0.02 ? 'hidden' : 'visible';
      }
      if (video) {
        video.style.opacity = '1';
      }

      if (video && videoReady && durationRef.current > 0) {
        const targetTime = videoTarget * durationRef.current;

        if (snapRef.current) {
          smoothVideoTimeRef.current = targetTime;
        } else {
          smoothVideoTimeRef.current +=
            (targetTime - smoothVideoTimeRef.current) * videoTimeSmoothing;
        }

        seekVideo(video, smoothVideoTimeRef.current);
      }

      const reveal = sampleTextReveal(smooth);
      const root = identityRef.current;
      const el = root?.querySelector<HTMLElement>('[data-line="1"]');
      if (el) {
        el.style.setProperty('--reveal', String(reveal.line1));
        el.style.opacity = String(reveal.line1 > 0.02 ? 1 : 0);
      }

      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [reduced, videoReady]);

  useEffect(() => {
    if (!reduced) return;
    const poster = posterRef.current;
    if (poster) poster.style.opacity = '1';
    const root = identityRef.current;
    const el = root?.querySelector<HTMLElement>('[data-line="1"]');
    if (el) {
      el.style.setProperty('--reveal', '1');
      el.style.opacity = '1';
    }
  }, [reduced]);

  const showCue = !reduced && scrollProgress < 0.06;

  return (
    <section ref={sectionRef} className="hero-scroll" aria-label="Introduction">
      <div className="hero-scroll__pin">
        <div className="hero-stage">
          <div className="hero-media">
            {!reduced && (
              <video
                ref={videoRef}
                className="hero-video"
                src={MOTION_VIDEO}
                muted
                playsInline
                preload="auto"
                aria-hidden="true"
                tabIndex={-1}
              />
            )}

            <img
              ref={posterRef}
              className="hero-poster"
              src={KEYFRAME}
              alt=""
              decoding="async"
              fetchPriority="high"
            />
          </div>

          <div ref={identityRef} className="hero-identity">
            <h1 data-line="1" className="hero-identity__name">
              <span className="hero-identity__inner">Cal AI robot</span>
            </h1>
          </div>

          {!reduced && (
            <p
              className="hero-cue"
              style={{ opacity: showCue ? 1 : 0 }}
              aria-hidden={!showCue}
            >
              Scroll to explore
            </p>
          )}
        </div>
      </div>

      {!reduced && spacerVh > 0 && (
        <div
          className="hero-scroll__spacer"
          style={{ height: `${spacerVh}svh` }}
          aria-hidden="true"
        />
      )}
    </section>
  );
}
