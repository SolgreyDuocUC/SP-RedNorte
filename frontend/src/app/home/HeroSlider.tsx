import { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { slides } from '../types/home-slides';

export function HeroSlider() {
  const [current, setCurrent] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const goTo = useCallback((index: number) => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrent(index);
    setTimeout(() => setIsAnimating(false), 500);
  }, [isAnimating]);

  const next = useCallback(() => goTo((current + 1) % slides.length), [current, goTo]);
  const prev = useCallback(() => goTo((current - 1 + slides.length) % slides.length), [current, goTo]);

  useEffect(() => {
    const t = setInterval(next, 6000);
    return () => clearInterval(t);
  }, [next]);

  const slide = slides[current];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=DM+Sans:wght@300;400;500;600&display=swap');

        .hero-section {
          font-family: 'DM Sans', sans-serif;
        }
        .hero-display {
          font-family: 'Playfair Display', serif;
        }

        .hero-slide-content {
          animation: heroFadeUp 0.55s cubic-bezier(0.22, 1, 0.36, 1) both;
        }
        @keyframes heroFadeUp {
          from { opacity: 0; transform: translateY(18px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .hero-image-panel {
          animation: heroScaleIn 0.6s cubic-bezier(0.22, 1, 0.36, 1) both;
        }
        @keyframes heroScaleIn {
          from { opacity: 0; transform: scale(0.96); }
          to   { opacity: 1; transform: scale(1); }
        }

        .hero-dot {
          transition: width 0.35s cubic-bezier(0.22, 1, 0.36, 1), background 0.35s;
        }

        .hero-nav-btn {
          transition: background 0.2s, transform 0.15s, box-shadow 0.2s;
        }
        .hero-nav-btn:hover {
          transform: scale(1.08);
          box-shadow: 0 8px 24px rgba(0,0,0,0.13);
        }
        .hero-nav-btn:active {
          transform: scale(0.96);
        }

        .hero-cta {
          position: relative;
          overflow: hidden;
          transition: transform 0.18s, box-shadow 0.18s;
        }
        .hero-cta::after {
          content: '';
          position: absolute;
          inset: 0;
          background: rgba(255,255,255,0.15);
          opacity: 0;
          transition: opacity 0.2s;
        }
        .hero-cta:hover { transform: translateY(-2px); box-shadow: 0 12px 32px rgba(0,0,0,0.18); }
        .hero-cta:hover::after { opacity: 1; }
        .hero-cta:active { transform: translateY(0); }

        .hero-card {
          transition: box-shadow 0.3s;
        }

        .progress-bar {
          height: 3px;
          background: rgba(0,0,0,0.08);
          border-radius: 99px;
          overflow: hidden;
        }
        .progress-bar-fill {
          height: 100%;
          border-radius: 99px;
          animation: progressFill 6s linear infinite;
          transform-origin: left;
        }
        @keyframes progressFill {
          from { width: 0%; }
          to   { width: 100%; }
        }
      `}</style>

      <section
        className="hero-section relative overflow-hidden"
        style={{
          marginTop: 'var(--header-height, 88px)',
          background: 'linear-gradient(135deg, #f0f7ff 0%, #e8f4fd 50%, #f5f9ff 100%)',
          minHeight: 'clamp(520px, 70vh, 760px)',
        }}
      >
        {/* ── Background decoration ──────────────────────────────────────── */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden>
          {/* Large soft blob top-right */}
          <div style={{
            position: 'absolute', top: '-120px', right: '-120px',
            width: '600px', height: '600px', borderRadius: '50%',
            background: 'radial-gradient(circle, #bde0f8 0%, transparent 70%)',
            opacity: 0.5,
          }} />
          {/* Small accent blob bottom-left */}
          <div style={{
            position: 'absolute', bottom: '-80px', left: '-60px',
            width: '360px', height: '360px', borderRadius: '50%',
            background: 'radial-gradient(circle, #caf0f8 0%, transparent 70%)',
            opacity: 0.45,
          }} />
          {/* Subtle grid texture */}
          <div style={{
            position: 'absolute', inset: 0,
            backgroundImage: 'radial-gradient(circle, #0077b620 1px, transparent 1px)',
            backgroundSize: '36px 36px',
            opacity: 0.25,
          }} />
        </div>

        {/* ── Main layout ────────────────────────────────────────────────── */}
        <div
          className="relative mx-auto flex flex-col lg:flex-row items-center"
          style={{
            maxWidth: '1280px',
            padding: 'clamp(48px, 8vw, 96px) clamp(20px, 5vw, 64px)',
            gap: 'clamp(32px, 5vw, 72px)',
            minHeight: 'inherit',
          }}
        >
          {/* ── Text card ────────────────────────────────────────────────── */}
          <div
            key={`text-${current}`}
            className="hero-slide-content hero-card flex-1 bg-white rounded-3xl w-full"
            style={{
              maxWidth: '560px',
              padding: 'clamp(32px, 5vw, 56px)',
              boxShadow: '0 4px 6px -1px rgba(0,0,0,0.04), 0 24px 48px -12px rgba(0,119,182,0.10)',
              border: '1px solid rgba(0,119,182,0.07)',
            }}
          >
            {/* Tag */}
            <span
              className="inline-flex items-center gap-1.5 font-semibold uppercase tracking-widest rounded-full mb-6"
              style={{
                fontSize: 'clamp(10px, 1.2vw, 12px)',
                padding: '6px 14px',
                background: slide.accent + '18',
                color: slide.accent,
                letterSpacing: '0.12em',
              }}
            >
              <span style={{
                width: '6px', height: '6px', borderRadius: '50%',
                background: slide.accent, display: 'inline-block',
                flexShrink: 0,
              }} />
              {slide.tag}
            </span>

            {/* Title */}
            <h2
              className="hero-display text-[#023e8a] mb-5 leading-tight"
              style={{ fontSize: 'clamp(26px, 3.5vw, 44px)', fontWeight: 900 }}
            >
              {slide.title}
            </h2>

            {/* Body */}
            <p
              className="text-gray-500 mb-8 leading-relaxed"
              style={{ fontSize: 'clamp(15px, 1.5vw, 18px)', fontWeight: 300 }}
            >
              {slide.body}
            </p>

            {/* CTA + progress */}
            <div className="flex flex-col gap-5">
              <div>
                <button
                  className="hero-cta font-semibold text-white rounded-2xl"
                  style={{
                    background: slide.accent,
                    padding: 'clamp(12px, 1.5vw, 16px) clamp(28px, 3vw, 40px)',
                    fontSize: 'clamp(14px, 1.3vw, 16px)',
                    letterSpacing: '0.01em',
                    boxShadow: `0 8px 24px ${slide.accent}44`,
                  }}
                >
                  {slide.cta}
                </button>
              </div>

              {/* Progress bar */}
              <div className="progress-bar">
                <div
                  key={`progress-${current}`}
                  className="progress-bar-fill"
                  style={{ background: slide.accent }}
                />
              </div>
            </div>
          </div>

          {/* ── Visual panel ─────────────────────────────────────────────── */}
          <div
            key={`img-${current}`}
            className="hero-image-panel flex-1 flex justify-center items-center w-full"
            style={{ maxWidth: '560px' }}
          >
            <div
              className="w-full rounded-3xl flex items-center justify-center relative overflow-hidden"
              style={{
                height: 'clamp(260px, 38vw, 440px)',
                background: `linear-gradient(135deg, ${slide.accent}cc 0%, ${slide.accent} 100%)`,
                boxShadow: `0 32px 80px ${slide.accent}40`,
              }}
            >
              {/* Decorative rings */}
              <div style={{
                position: 'absolute', top: '-40px', right: '-40px',
                width: '220px', height: '220px', borderRadius: '50%',
                border: '40px solid rgba(255,255,255,0.10)',
              }} />
              <div style={{
                position: 'absolute', bottom: '-60px', left: '-60px',
                width: '280px', height: '280px', borderRadius: '50%',
                border: '50px solid rgba(255,255,255,0.07)',
              }} />

              {/* Centered icon / placeholder area */}
              <div style={{
                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px',
                position: 'relative', zIndex: 1,
              }}>
                <div style={{
                  width: 'clamp(64px, 8vw, 96px)', height: 'clamp(64px, 8vw, 96px)',
                  borderRadius: '24px',
                  background: 'rgba(255,255,255,0.2)',
                  backdropFilter: 'blur(8px)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
                }}>
                  <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                    <rect x="4" y="12" width="32" height="22" rx="4" fill="white" fillOpacity=".9"/>
                    <rect x="12" y="6" width="16" height="8" rx="3" fill="white" fillOpacity=".5"/>
                    <circle cx="20" cy="23" r="5" fill={slide.accent}/>
                  </svg>
                </div>
                <p style={{
                  color: 'rgba(255,255,255,0.75)',
                  fontSize: 'clamp(12px, 1.2vw, 14px)',
                  fontWeight: 500,
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                }}>
                  {slide.tag}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ── Navigation ─────────────────────────────────────────────────── */}
        <div
          className="absolute flex items-center"
          style={{
            bottom: 'clamp(20px, 3vw, 36px)',
            left: '50%',
            transform: 'translateX(-50%)',
            gap: '10px',
          }}
        >
          <button
            onClick={prev}
            aria-label="Anterior"
            className="hero-nav-btn flex items-center justify-center rounded-full bg-white"
            style={{
              width: 'clamp(36px, 4vw, 44px)',
              height: 'clamp(36px, 4vw, 44px)',
              boxShadow: '0 2px 12px rgba(0,0,0,0.10)',
              border: '1px solid rgba(0,119,182,0.10)',
            }}
          >
            <ChevronLeft style={{ width: '18px', height: '18px', color: '#0077b6' }} />
          </button>

          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              aria-label={`Ir a slide ${i + 1}`}
              className="hero-dot rounded-full"
              style={{
                height: '10px',
                width: i === current ? '32px' : '10px',
                background: i === current ? slide.accent : '#cbd5e1',
                border: 'none',
                cursor: 'pointer',
                padding: 0,
              }}
            />
          ))}

          <button
            onClick={next}
            aria-label="Siguiente"
            className="hero-nav-btn flex items-center justify-center rounded-full bg-white"
            style={{
              width: 'clamp(36px, 4vw, 44px)',
              height: 'clamp(36px, 4vw, 44px)',
              boxShadow: '0 2px 12px rgba(0,0,0,0.10)',
              border: '1px solid rgba(0,119,182,0.10)',
            }}
          >
            <ChevronRight style={{ width: '18px', height: '18px', color: '#0077b6' }} />
          </button>
        </div>

        {/* ── Slide counter ──────────────────────────────────────────────── */}
        <div
          className="absolute"
          style={{
            bottom: 'clamp(20px, 3vw, 40px)',
            right: 'clamp(20px, 4vw, 48px)',
            display: 'flex',
            alignItems: 'baseline',
            gap: '3px',
            color: '#94a3b8',
          }}
        >
          <span style={{ fontSize: 'clamp(18px, 2vw, 22px)', fontWeight: 700, color: '#023e8a' }}>
            {String(current + 1).padStart(2, '0')}
          </span>
          <span style={{ fontSize: '13px' }}>/</span>
          <span style={{ fontSize: '13px' }}>{String(slides.length).padStart(2, '0')}</span>
        </div>
      </section>
    </>
  );
}