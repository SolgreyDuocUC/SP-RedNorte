import { useState, useEffect, useCallback } from 'react';
import { ChevronDown, User, Phone, Search, ChevronLeft, ChevronRight, MessageCircle } from 'lucide-react';

// ─── Datos del slider ──────────────────────────────────────────────────────────
const slides = [
  {
    id: 1,
    tag: 'Novedades',
    title: 'Red Norte amplía sus horarios los sábados y domingos',
    body: 'Unidad de Imágenes y Consultas Médicas disponibles,\nSábado 08:00 a 18:00 horas.\nDomingo 08:00 a 14:00 horas.',
    cta: 'Agenda aquí',
    accent: '#0096c7',
  },
  {
    id: 2,
    tag: 'Prevención',
    title: 'Programa de salud preventiva para toda la familia',
    body: 'Controles periódicos, vacunación y atención integral.\nLunes a Viernes 07:30 a 19:00 horas.',
    cta: 'Ver programa',
    accent: '#0077b6',
  },
  {
    id: 3,
    tag: 'Telemedicina',
    title: 'Consultas médicas online desde tu hogar',
    body: 'Atiéndete con nuestros especialistas sin salir de casa.\nDisponible todos los días del año.',
    cta: 'Reservar ahora',
    accent: '#023e8a',
  },
];

// ─── Nav items ─────────────────────────────────────────────────────────────────
const navItems = [
  { label: 'Especialidades', dropdown: false },
  { label: 'Servicios y Unidades', dropdown: true },
  { label: 'Seguros y Convenios', dropdown: false },
  { label: 'Información al Paciente', dropdown: true },
];

// ─── Especialidades rápidas ────────────────────────────────────────────────────
const especialidades = [
  'Medicina General', 'Pediatría', 'Ginecología', 'Traumatología',
  'Cardiología', 'Dermatología', 'Neurología', 'Oftalmología',
];

const examenes = [
  'Hemograma', 'Radiografía', 'Ecografía', 'Electrocardiograma',
  'Resonancia Magnética', 'TAC', 'Mamografía', 'Endoscopía',
];

// ─── Centros ───────────────────────────────────────────────────────────────────
const centros = [
  { nombre: 'Hospital Red Norte Central', ciudad: 'Iquique', telefono: '57 2 123 456' },
  { nombre: 'Centro Médico Alto Hospicio', ciudad: 'Alto Hospicio', telefono: '57 2 654 321' },
  { nombre: 'Clínica Colchane', ciudad: 'Colchane', telefono: '57 2 789 012' },
  { nombre: 'Posta Rural Huara', ciudad: 'Huara', telefono: '57 2 345 678' },
];

// ─── Componente PublicHeader ───────────────────────────────────────────────────
function PublicHeader({ onLogin }: { onLogin: () => void }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-shadow duration-300 bg-white ${
        scrolled ? 'shadow-md' : 'shadow-sm'
      }`}
    >
      {/* Top bar */}
      <div className="hidden md:flex items-center justify-end gap-6 px-8 py-1.5 bg-[#023e8a] text-white text-xs">
        <a href="#centros" className="hover:text-cyan-300 transition-colors flex items-center gap-1">
          <Phone className="h-3 w-3" /> Nuestros centros
        </a>
        <span className="opacity-50">|</span>
        <a href="#" className="hover:text-cyan-300 transition-colors">Urgencias 24/7</a>
        <span className="opacity-50">|</span>
        <a href="#" className="hover:text-cyan-300 transition-colors">Portal Médico</a>
      </div>

      {/* Main nav */}
      <div className="flex h-16 items-center justify-between px-4 md:px-8 max-w-7xl mx-auto">
        {/* Logo */}
        <div className="flex items-center gap-3 select-none">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-[#0077b6] to-[#00b4d8] shadow">
            <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6 text-white">
              <path d="M12 3v18M3 12h18" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
            </svg>
          </div>
          <div className="leading-tight">
            <span className="block font-bold text-[#023e8a] text-lg tracking-tight">Red Norte</span>
            <span className="block text-[10px] text-[#0096c7] font-medium uppercase tracking-widest">
              Red de Salud
            </span>
          </div>
        </div>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-700">
          {navItems.map((item) => (
            <button
              key={item.label}
              className="flex items-center gap-0.5 hover:text-[#0096c7] transition-colors"
            >
              {item.label}
              {item.dropdown && <ChevronDown className="h-3.5 w-3.5 mt-0.5 opacity-60" />}
            </button>
          ))}
        </nav>

        {/* CTA buttons */}
        <div className="hidden md:flex items-center gap-2">
          <button className="px-4 py-2 rounded-full bg-[#0096c7] text-white text-sm font-semibold hover:bg-[#0077b6] transition-colors">
            Mi Portal
          </button>
          <button className="px-4 py-2 rounded-full bg-[#023e8a] text-white text-sm font-semibold hover:bg-[#03306a] transition-colors">
            Reservar hora
          </button>
          <button
            onClick={onLogin}
            className="flex items-center gap-1.5 px-3 py-2 text-sm text-gray-600 hover:text-[#0077b6] transition-colors"
          >
            <User className="h-4 w-4" /> Iniciar sesión
          </button>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? (
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-t bg-white px-4 py-4 flex flex-col gap-3">
          {navItems.map((item) => (
            <button key={item.label} className="text-left text-sm text-gray-700 py-2 border-b border-gray-100">
              {item.label}
            </button>
          ))}
          <div className="flex flex-col gap-2 pt-2">
            <button className="w-full py-2 rounded-full bg-[#0096c7] text-white text-sm font-semibold">
              Mi Portal
            </button>
            <button className="w-full py-2 rounded-full bg-[#023e8a] text-white text-sm font-semibold">
              Reservar hora
            </button>
            <button onClick={onLogin} className="w-full py-2 text-sm text-[#0077b6] font-semibold">
              Iniciar sesión
            </button>
          </div>
        </div>
      )}
    </header>
  );
}

// ─── Hero Slider ───────────────────────────────────────────────────────────────
function HeroSlider() {
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
      {/* Decorative background shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-16 -right-16 w-96 h-96 rounded-full bg-[#caf0f8] opacity-40" />
        <div className="absolute bottom-0 right-1/3 w-64 h-64 rounded-full bg-[#ade8f4] opacity-30" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 md:px-8 py-10 md:py-14 flex flex-col md:flex-row items-center gap-8">
        {/* Text card */}
        <div className="flex-1 bg-white rounded-2xl shadow-lg p-6 md:p-10 max-w-lg w-full">
          <span
            className="inline-block text-xs font-semibold uppercase tracking-widest px-3 py-1 rounded-full mb-4"
            style={{ background: slide.accent + '22', color: slide.accent }}
          >
            {slide.tag}
          </span>
          <h2 className="text-2xl md:text-3xl font-bold text-[#023e8a] mb-4 leading-snug">
            {slide.title}
          </h2>
          <p className="text-gray-600 text-sm md:text-base whitespace-pre-line mb-6">
            {slide.body}
          </p>
          <button
            className="px-6 py-2.5 rounded-full text-white text-sm font-bold shadow-md hover:brightness-110 transition-all"
            style={{ background: slide.accent }}
          >
            {slide.cta}
          </button>
        </div>

        {/* Image placeholder */}
        <div className="flex-1 flex justify-center items-center w-full max-w-md">
          <div className="w-full h-52 md:h-72 rounded-2xl overflow-hidden shadow-lg bg-gradient-to-br from-[#90e0ef] to-[#0077b6] flex items-center justify-center">
            <div className="text-white text-center px-4">
              <svg viewBox="0 0 24 24" fill="none" className="h-20 w-20 mx-auto mb-3 opacity-80">
                <path d="M12 3v18M3 12h18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" />
              </svg>
              <p className="text-sm font-medium opacity-90">Red Norte · Salud para todos</p>
            </div>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-3">
        <button
          onClick={prev}
          className="w-7 h-7 rounded-full bg-white/80 shadow flex items-center justify-center hover:bg-white transition"
        >
          <ChevronLeft className="h-4 w-4 text-[#0077b6]" />
        </button>
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`h-2.5 rounded-full transition-all duration-300 ${
              i === current ? 'w-7 bg-[#0096c7]' : 'w-2.5 bg-gray-300'
            }`}
          />
        ))}
        <button
          onClick={next}
          className="w-7 h-7 rounded-full bg-white/80 shadow flex items-center justify-center hover:bg-white transition"
        >
          <ChevronRight className="h-4 w-4 text-[#0077b6]" />
        </button>
      </div>
    </section>
  );
}

// ─── Booking Section ───────────────────────────────────────────────────────────
function BookingSection() {
  const [bookTab, setBookTab] = useState<'consultas' | 'examenes'>('consultas');
  const [typeTab, setTypeTab] = useState<'especialidad' | 'profesional'>('especialidad');
  const [search, setSearch] = useState('');

  const items = bookTab === 'consultas' ? especialidades : examenes;
  const filtered = items.filter((i) =>
    i.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <section className="bg-white py-10 md:py-14 border-b">
      <div className="max-w-7xl mx-auto px-4 md:px-8 flex flex-col md:flex-row gap-8 md:gap-16 items-start">
        {/* Heading */}
        <div className="md:w-48 flex-shrink-0">
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#023e8a] leading-tight">
            Reserva<br />tu hora
          </h2>
          <p className="text-sm text-gray-500 mt-2">Agenda rápida y segura</p>
        </div>

        {/* Booking panel */}
        <div className="flex-1 w-full">
          {/* Main tabs */}
          <div className="flex gap-1 mb-4">
            <button
              onClick={() => setBookTab('consultas')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-t-xl text-sm font-semibold transition-colors ${
                bookTab === 'consultas'
                  ? 'bg-white border border-b-0 border-gray-200 text-[#0096c7]'
                  : 'bg-gray-100 text-gray-500 hover:text-gray-700'
              }`}
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
              </svg>
              Consultas
            </button>
            <button
              onClick={() => setBookTab('examenes')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-t-xl text-sm font-semibold transition-colors ${
                bookTab === 'examenes'
                  ? 'bg-[#023e8a] text-white'
                  : 'bg-gray-100 text-gray-500 hover:text-gray-700'
              }`}
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              Exámenes
            </button>
          </div>

          {/* Panel content */}
          <div className="border border-gray-200 rounded-b-xl rounded-tr-xl p-5 bg-white shadow-sm">
            {/* Sub-tabs */}
            <div className="flex gap-2 mb-4">
              <button
                onClick={() => setTypeTab('especialidad')}
                className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-colors ${
                  typeTab === 'especialidad'
                    ? 'bg-[#0096c7] text-white shadow'
                    : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                }`}
              >
                Especialidad
              </button>
              <button
                onClick={() => setTypeTab('profesional')}
                className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-colors ${
                  typeTab === 'profesional'
                    ? 'bg-[#0096c7] text-white shadow'
                    : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                }`}
              >
                Profesional
              </button>
            </div>

            {/* Search input */}
            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder={
                  typeTab === 'especialidad'
                    ? `Buscar ${bookTab === 'consultas' ? 'especialidad' : 'tipo de examen'}...`
                    : 'Buscar profesional por nombre...'
                }
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#0096c7]/30 focus:border-[#0096c7]"
              />
            </div>

            {/* Quick options */}
            <div className="flex flex-wrap gap-2 mb-5">
              {filtered.slice(0, 6).map((item) => (
                <button
                  key={item}
                  className="px-3 py-1.5 rounded-full border border-gray-200 text-xs text-gray-600 hover:border-[#0096c7] hover:text-[#0096c7] hover:bg-[#e0f7fa] transition-colors"
                >
                  {item}
                </button>
              ))}
            </div>

            {/* Action row */}
            <div className="flex flex-col sm:flex-row items-center gap-3">
              <button className="w-full sm:w-auto px-8 py-2.5 rounded-full bg-[#0096c7] text-white text-sm font-bold hover:bg-[#0077b6] transition-colors shadow">
                Buscar disponibilidad
              </button>
              <span className="text-gray-400 text-xs hidden sm:block">o</span>
              <button className="flex items-center gap-2 w-full sm:w-auto px-5 py-2.5 rounded-full border border-gray-200 text-sm text-gray-600 hover:border-green-500 hover:text-green-600 transition-colors">
                <MessageCircle className="h-4 w-4 text-green-500" />
                Agenda por WhatsApp
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Centros Section ───────────────────────────────────────────────────────────
function CentrosSection() {
  return (
    <section id="centros" className="bg-[#f0f6fa] py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-[#023e8a]">Nuestros Centros</h2>
          <p className="text-gray-500 mt-2 text-sm">Red de atención en toda la región de Tarapacá</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {centros.map((c) => (
            <div
              key={c.nombre}
              className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-md hover:border-[#90e0ef] transition-all"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-[#0096c7] to-[#023e8a] mb-3">
                <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5 text-white">
                  <path d="M12 3v18M3 12h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </div>
              <h3 className="font-semibold text-[#023e8a] text-sm mb-1">{c.nombre}</h3>
              <p className="text-xs text-gray-400 mb-3">{c.ciudad}</p>
              <a
                href={`tel:${c.telefono}`}
                className="flex items-center gap-1.5 text-xs text-[#0096c7] font-medium hover:underline"
              >
                <Phone className="h-3 w-3" /> {c.telefono}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Servicios Section ─────────────────────────────────────────────────────────
const servicios = [
  { icon: '🏥', titulo: 'Urgencias 24/7', desc: 'Atención de emergencias las 24 horas todos los días del año.' },
  { icon: '💊', titulo: 'Farmacia', desc: 'Medicamentos con convenio y entrega a domicilio.' },
  { icon: '🔬', titulo: 'Laboratorio', desc: 'Resultados en línea con tecnología de punta.' },
  { icon: '📱', titulo: 'Telemedicina', desc: 'Consulta con especialistas desde cualquier lugar.' },
  { icon: '🦷', titulo: 'Odontología', desc: 'Atención dental integral para adultos y niños.' },
  { icon: '👶', titulo: 'Maternidad', desc: 'Programa de parto humanizado y control prenatal.' },
];

function ServiciosSection() {
  return (
    <section className="bg-white py-12 md:py-16 border-b">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-[#023e8a]">Servicios y Unidades</h2>
          <p className="text-gray-500 mt-2 text-sm">Atención integral en salud para toda la comunidad</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {servicios.map((s) => (
            <button
              key={s.titulo}
              className="group flex flex-col items-center text-center p-4 rounded-2xl border border-gray-100 hover:border-[#0096c7] hover:shadow-md transition-all"
            >
              <span className="text-3xl mb-2">{s.icon}</span>
              <h3 className="font-semibold text-[#023e8a] text-xs mb-1 group-hover:text-[#0096c7] transition-colors">
                {s.titulo}
              </h3>
              <p className="text-[11px] text-gray-400 leading-snug hidden md:block">{s.desc}</p>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Footer ────────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer className="bg-[#023e8a] text-white py-10">
      <div className="max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <div className="h-8 w-8 rounded-lg bg-white/20 flex items-center justify-center">
              <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5 text-white">
                <path d="M12 3v18M3 12h18" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
              </svg>
            </div>
            <span className="font-bold text-lg">Red Norte</span>
          </div>
          <p className="text-xs text-blue-200 leading-relaxed">
            Red de Salud comprometida con la comunidad de la región de Tarapacá, brindando atención de calidad con calidez humana.
          </p>
        </div>
        <div>
          <h4 className="font-semibold text-sm mb-3 text-cyan-300">Acceso rápido</h4>
          <ul className="space-y-1.5 text-xs text-blue-200">
            {['Especialidades', 'Servicios y Unidades', 'Seguros y Convenios', 'Información al Paciente', 'Portal de Resultados'].map((l) => (
              <li key={l}><a href="#" className="hover:text-white transition-colors">{l}</a></li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="font-semibold text-sm mb-3 text-cyan-300">Contacto</h4>
          <ul className="space-y-1.5 text-xs text-blue-200">
            <li>📍 Iquique, Región de Tarapacá</li>
            <li>📞 600 123 4567</li>
            <li>✉️ contacto@rednorte.cl</li>
          </ul>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 md:px-8 mt-8 pt-6 border-t border-white/10 text-xs text-blue-300 text-center">
        © {new Date().getFullYear()} Red Norte · Red de Salud. Todos los derechos reservados.
      </div>
    </footer>
  );
}

// ─── Floating elements ─────────────────────────────────────────────────────────
function FloatingElements() {
  return (
    <>
      {/* WhatsApp FAB */}
      <a
        href="https://wa.me/56900000000"
        target="_blank"
        rel="noreferrer"
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25d366] shadow-lg hover:shadow-xl hover:scale-110 transition-all"
        title="Agenda por WhatsApp"
      >
        <svg viewBox="0 0 24 24" fill="currentColor" className="h-8 w-8 text-white">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
      </a>

      {/* Sugerencias side tab */}
      <div className="fixed right-0 top-1/2 -translate-y-1/2 z-50">
        <button className="flex items-center gap-2 bg-[#0096c7] text-white text-xs font-semibold py-3 px-3 shadow-lg"
          style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}>
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"
            style={{ transform: 'rotate(180deg)' }}>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
          Felicitaciones y Sugerencias
        </button>
      </div>
    </>
  );
}

// ─── HomePage (export) ─────────────────────────────────────────────────────────
export function HomePage({ onLogin }: { onLogin: () => void }) {
  return (
    <div className="min-h-screen flex flex-col font-sans">
      <PublicHeader onLogin={onLogin} />
      <main className="flex-1">
        <HeroSlider />
        <BookingSection />
        <ServiciosSection />
        <CentrosSection />
      </main>
      <Footer />
      <FloatingElements />
    </div>
  );
}
