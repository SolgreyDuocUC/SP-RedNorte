import { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { slides } from '../../types/HomeSlides';

export function HeroSlider() {
  const [current, setCurrent] = useState(0);
  const next = useCallback(() => setCurrent((c) => (c + 1) % slides.length), []);
  const prev = useCallback(() => setCurrent((c) => (c - 1 + slides.length) % slides.length), []);

  useEffect(() => {
    const t = setInterval(next, 5000);
    return () => clearInterval(t);
  }, [next]);

  const slide = slides[current];

  return (
    <section className="relative mt-[104px] md:mt-[88px] bg-[#f0f6fa] overflow-hidden min-h-[380px] md:min-h-[420px]">
      {/* Background Decor */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-16 -right-16 w-96 h-96 rounded-full bg-[#caf0f8] opacity-40" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 md:px-8 py-10 md:py-14 flex flex-col md:flex-row items-center gap-8">
        <div className="flex-1 bg-white rounded-2xl shadow-lg p-6 md:p-10 max-w-lg w-full">
          <span className="inline-block text-xs font-semibold uppercase tracking-widest px-3 py-1 rounded-full mb-4"
            style={{ background: slide.accent + '22', color: slide.accent }}>
            {slide.tag}
          </span>
          <h2 className="text-2xl md:text-3xl font-bold text-[#023e8a] mb-4 leading-snug">{slide.title}</h2>
          <p className="text-gray-600 text-sm md:text-base mb-6">{slide.body}</p>
          <button className="px-6 py-2.5 rounded-full text-white font-bold shadow-md hover:brightness-110 transition-all"
            style={{ background: slide.accent }}>
            {slide.cta}
          </button>
        </div>

        <div className="flex-1 flex justify-center w-full max-w-md">
           <div className="w-full h-52 md:h-72 rounded-2xl bg-gradient-to-br from-[#90e0ef] to-[#0077b6] flex items-center justify-center shadow-lg">
              {/* SVG Placeholder */}
           </div>
        </div>
      </div>

      {/* Dots & Nav */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-3">
        <button onClick={prev} className="w-7 h-7 rounded-full bg-white/80 shadow flex items-center justify-center"><ChevronLeft className="h-4 w-4 text-[#0077b6]" /></button>
        {slides.map((_, i) => (
          <button key={i} onClick={() => setCurrent(i)} 
            className={`h-2.5 rounded-full transition-all ${i === current ? 'w-7 bg-[#0096c7]' : 'w-2.5 bg-gray-300'}`} />
        ))}
        <button onClick={next} className="w-7 h-7 rounded-full bg-white/80 shadow flex items-center justify-center"><ChevronRight className="h-4 w-4 text-[#0077b6]" /></button>
      </div>
    </section>
  );
}