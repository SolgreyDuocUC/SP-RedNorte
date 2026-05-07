import { useState } from 'react';
import { MessageCircle, X, Send, Star } from 'lucide-react';

export function FloatingElements() {
  const [feedbackOpen, setFeedbackOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);

  const handleSend = () => {
    if (!message.trim()) return;
    // TODO: conectar con tu API
    setSent(true);
    setTimeout(() => {
      setSent(false);
      setMessage('');
      setRating(0);
      setFeedbackOpen(false);
    }, 2200);
  };

  return (
    <>
      <style>{`
        @keyframes waPulse {
          0%, 100% { box-shadow: 0 0 0 0 #25d36660; }
          50%       { box-shadow: 0 0 0 14px #25d36600; }
        }
        .wa-btn { animation: waPulse 2.6s ease-in-out infinite; }
        .wa-btn:hover { transform: scale(1.10); box-shadow: 0 12px 32px #25d36655 !important; }

        @keyframes slideInRight {
          from { opacity: 0; transform: translateX(24px) scale(0.97); }
          to   { opacity: 1; transform: translateX(0)   scale(1); }
        }
        .feedback-panel { animation: slideInRight 0.32s cubic-bezier(0.22,1,0.36,1) both; }

        .tab-btn { transition: background 0.2s, color 0.2s, transform 0.15s; }
        .tab-btn:hover { background: rgba(255,255,255,0.18); transform: translateX(-3px); }

        .star-btn { transition: transform 0.12s; }
        .star-btn:hover { transform: scale(1.2); }

        .send-btn { transition: background 0.18s, transform 0.15s, box-shadow 0.18s; }
        .send-btn:hover:not(:disabled) { transform: translateY(-1px); box-shadow: 0 8px 20px rgba(0,119,182,0.35); }
        .send-btn:active:not(:disabled) { transform: translateY(0); }
      `}</style>

      {/* ── WhatsApp FAB ────────────────────────────────────────────────── */}
      <a
        href="https://wa.me/56962361884"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Contactar por WhatsApp"
        className="wa-btn fixed z-50 flex items-center justify-center rounded-full bg-[#25d366]"
        style={{
          bottom: 'clamp(20px, 3vw, 32px)',
          right: 'clamp(20px, 3vw, 32px)',
          width: 'clamp(52px, 6vw, 62px)',
          height: 'clamp(52px, 6vw, 62px)',
          transition: 'transform 0.18s, box-shadow 0.18s',
        }}
      >
        {/* WhatsApp SVG */}
        <svg viewBox="0 0 32 32" fill="none" style={{ width: '54%', height: '54%' }}>
          <path d="M16 2.667C8.636 2.667 2.667 8.636 2.667 16c0 2.37.638 4.588 1.748 6.5L2.667 29.333l7.042-1.708A13.27 13.27 0 0016 29.333c7.364 0 13.333-5.97 13.333-13.333S23.364 2.667 16 2.667z" fill="white"/>
          <path d="M22.41 19.573c-.31-.155-1.833-.904-2.117-.007-.283.897-1.107 1.13-1.898.523-1.56-1.19-2.59-2.71-2.864-3.162-.274-.453.025-.698.29-.96.24-.236.31-.5.466-.75.155-.25.207-.47.31-.782.103-.31-.025-.583-.155-.817-.13-.233-.855-2.055-1.17-2.816-.31-.75-.635-.648-.855-.648-.22 0-.466-.025-.714-.025-.25 0-.658.093-.1.883-.44.79-.544 1.974-.544 3.094 0 1.12.544 2.19.544 2.19.155.31 2.16 3.44 5.312 4.693 3.152 1.253 3.152.836 3.72.784.57-.052 1.836-.727 2.097-1.43.26-.7.26-1.3.182-1.426-.078-.127-.285-.207-.595-.362z" fill="#25d366"/>
        </svg>
      </a>

      {/* ── Feedback tab + panel ─────────────────────────────────────────── */}
      <div
        className="fixed z-50 flex items-center"
        style={{
          right: 0,
          top: '50%',
          transform: 'translateY(-50%)',
        }}
      >
        {/* Slide-out panel */}
        {feedbackOpen && (
          <div
            className="feedback-panel bg-white rounded-2xl mr-2 overflow-hidden"
            style={{
              width: 'clamp(280px, 30vw, 340px)',
              boxShadow: '0 8px 40px rgba(0,60,120,0.14), 0 2px 8px rgba(0,0,0,0.06)',
              border: '1px solid rgba(0,119,182,0.10)',
            }}
          >
            {/* Panel header */}
            <div style={{ background: 'linear-gradient(135deg, #023e8a 0%, #0096c7 100%)', padding: '20px 22px 18px' }}>
              <div className="flex justify-between items-start">
                <div>
                  <p style={{ color: 'white', fontWeight: 700, fontSize: '15px', marginBottom: '2px' }}>
                    Tu opinión importa
                  </p>
                  <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '12px' }}>
                    Ayúdanos a mejorar tu experiencia
                  </p>
                </div>
                <button
                  onClick={() => setFeedbackOpen(false)}
                  style={{ color: 'rgba(255,255,255,0.7)', padding: '2px', borderRadius: '6px', transition: 'color 0.15s' }}
                  onMouseEnter={e => (e.currentTarget.style.color = 'white')}
                  onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.7)')}
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {sent ? (
              <div className="flex flex-col items-center justify-center" style={{ padding: '36px 24px' }}>
                <div style={{
                  width: '52px', height: '52px', borderRadius: '50%',
                  background: '#f0fdf4', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  marginBottom: '14px',
                }}>
                  <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
                    <path d="M5 13l4 4L19 7" stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <p style={{ fontWeight: 700, color: '#023e8a', fontSize: '15px', marginBottom: '4px' }}>¡Gracias!</p>
                <p style={{ color: '#64748b', fontSize: '13px', textAlign: 'center' }}>Tu mensaje fue enviado correctamente.</p>
              </div>
            ) : (
              <div style={{ padding: '20px 22px 22px' }}>
                {/* Star rating */}
                <p style={{ fontSize: '12px', fontWeight: 600, color: '#475569', marginBottom: '10px', textTransform: 'uppercase', letterSpacing: '0.07em' }}>
                  Calificación
                </p>
                <div className="flex gap-1 mb-5">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <button
                      key={s}
                      className="star-btn"
                      onMouseEnter={() => setHoverRating(s)}
                      onMouseLeave={() => setHoverRating(0)}
                      onClick={() => setRating(s)}
                    >
                      <Star
                        size={26}
                        fill={(hoverRating || rating) >= s ? '#f59e0b' : 'none'}
                        stroke={(hoverRating || rating) >= s ? '#f59e0b' : '#cbd5e1'}
                        strokeWidth={1.5}
                      />
                    </button>
                  ))}
                </div>

                {/* Message */}
                <p style={{ fontSize: '12px', fontWeight: 600, color: '#475569', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.07em' }}>
                  Comentario
                </p>
                <textarea
                  value={message}
                  onChange={e => setMessage(e.target.value)}
                  placeholder="Escribe tu felicitación o sugerencia..."
                  rows={3}
                  style={{
                    width: '100%', resize: 'none', borderRadius: '12px',
                    border: '1.5px solid #e2e8f0', padding: '12px 14px',
                    fontSize: '13.5px', color: '#1e293b', outline: 'none',
                    fontFamily: 'inherit', lineHeight: '1.5',
                    transition: 'border-color 0.18s',
                    boxSizing: 'border-box',
                  }}
                  onFocus={e => (e.target.style.borderColor = '#0096c7')}
                  onBlur={e => (e.target.style.borderColor = '#e2e8f0')}
                />

                {/* Send */}
                <button
                  onClick={handleSend}
                  disabled={!message.trim()}
                  className="send-btn flex items-center justify-center gap-2 w-full rounded-xl text-white font-semibold mt-3"
                  style={{
                    padding: '12px',
                    fontSize: '14px',
                    background: message.trim()
                      ? 'linear-gradient(135deg, #023e8a 0%, #0096c7 100%)'
                      : '#e2e8f0',
                    color: message.trim() ? 'white' : '#94a3b8',
                    cursor: message.trim() ? 'pointer' : 'not-allowed',
                  }}
                >
                  <Send size={15} />
                  Enviar mensaje
                </button>
              </div>
            )}
          </div>
        )}

        {/* Vertical tab */}
        <button
          onClick={() => setFeedbackOpen((v) => !v)}
          aria-label="Felicitaciones y sugerencias"
          className="tab-btn flex items-center justify-center text-white font-semibold rounded-l-xl"
          style={{
            writingMode: 'vertical-rl',
            transform: 'rotate(180deg)',
            padding: 'clamp(14px, 2vw, 20px) clamp(9px, 1.2vw, 13px)',
            fontSize: 'clamp(11px, 1.2vw, 13px)',
            letterSpacing: '0.06em',
            background: feedbackOpen
              ? 'linear-gradient(180deg, #023e8a 0%, #0096c7 100%)'
              : 'linear-gradient(180deg, #0096c7 0%, #023e8a 100%)',
            boxShadow: '-4px 0 20px rgba(0,60,120,0.18)',
            whiteSpace: 'nowrap',
            border: 'none',
            cursor: 'pointer',
          }}
        >
          {feedbackOpen ? 'Cerrar ✕' : 'Felicitaciones y Sugerencias'}
        </button>
      </div>
    </>
  );
}