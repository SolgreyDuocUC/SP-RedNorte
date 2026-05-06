import { useState } from 'react';
import { Search, MessageCircle } from 'lucide-react';
import { especialidades, examenes } from '../types/home-slides';

export function BookingSection({ onReserva }: { onReserva?: () => void }) {
  const [bookTab, setBookTab] = useState<'consultas' | 'examenes'>('consultas');
  const [typeTab, setTypeTab] = useState<'especialidad' | 'profesional'>('especialidad');
  const [search, setSearch] = useState('');

  const items = bookTab === 'consultas' ? especialidades : examenes;
  const filtered = items.filter(i => i.toLowerCase().includes(search.toLowerCase()));

  return (
    <section className="bg-white py-14 md:py-20 border-b">
      <div className="max-w-7xl mx-auto px-4 md:px-8 flex flex-col md:flex-row gap-10 md:gap-20 items-start">

        {/* TITULO */}
        <div className="md:w-56 flex-shrink-0">
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#023e8a] leading-tight">
            Reserva<br />tu hora
          </h2>
          <p className="text-sm text-gray-500 mt-3">
            Agenda rápida, simple y segura
          </p>
        </div>

        {/* PANEL */}
        <div className="flex-1 w-full">

          {/* TABS PRINCIPALES (más aire + estilo card) */}
          <div className="flex gap-2 mb-5">
            <button
              onClick={() => setBookTab('consultas')}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold transition-all ${
                bookTab === 'consultas'
                  ? 'bg-white border border-gray-200 text-[#0096c7] shadow-sm'
                  : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
              }`}
            >
              Consultas
            </button>

            <button
              onClick={() => setBookTab('examenes')}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold transition-all ${
                bookTab === 'examenes'
                  ? 'bg-[#023e8a] text-white shadow-sm'
                  : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
              }`}
            >
              Exámenes
            </button>
          </div>

          {/* CARD */}
          <div className="border border-gray-200 rounded-2xl p-6 md:p-8 bg-white shadow-sm space-y-6">

            {/* SUB TABS (más tipo selector moderno) */}
            <div className="flex gap-2">
              <button
                onClick={() => setTypeTab('especialidad')}
                className={`px-5 py-2 rounded-full text-sm font-semibold transition-all ${
                  typeTab === 'especialidad'
                    ? 'bg-[#0096c7] text-white shadow'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                Especialidad
              </button>

              <button
                onClick={() => setTypeTab('profesional')}
                className={`px-5 py-2 rounded-full text-sm font-semibold transition-all ${
                  typeTab === 'profesional'
                    ? 'bg-[#0096c7] text-white shadow'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                Profesional
              </button>
            </div>

            {/* SEARCH (más grande y “tipo app”) */}
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder={
                  typeTab === 'especialidad'
                    ? `Buscar ${bookTab === 'consultas' ? 'especialidad' : 'examen'}...`
                    : 'Buscar profesional...'
                }
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-xl text-sm
                focus:outline-none focus:ring-2 focus:ring-[#0096c7]/30 focus:border-[#0096c7]
                transition"
              />
            </div>

            {/* QUICK CHIPS (más aire entre chips) */}
            <div className="flex flex-wrap gap-3">
              {filtered.slice(0, 8).map((item) => (
                <button
                  key={item}
                  className="px-4 py-2 rounded-full border border-gray-200 text-xs text-gray-600
                  hover:border-[#0096c7] hover:text-[#0096c7] hover:bg-[#e0f7fa]
                  transition-all"
                >
                  {item}
                </button>
              ))}
            </div>

            {/* ACTIONS (más separadas y claras) */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">

              <button 
                onClick={onReserva}
                className="flex-1 px-6 py-3 rounded-full bg-[#0096c7] text-white text-sm font-bold
              hover:bg-[#0077b6] transition shadow-sm">
                Buscar disponibilidad
              </button>

              <button className="flex items-center justify-center gap-2 px-6 py-3 rounded-full
              border border-gray-200 text-sm text-gray-600 hover:border-green-500 hover:text-green-600
              transition">
                <MessageCircle className="h-4 w-4 text-green-500" />
                WhatsApp
              </button>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}