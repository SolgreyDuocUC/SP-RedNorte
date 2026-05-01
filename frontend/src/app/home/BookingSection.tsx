import { useState } from 'react';
import { Search, MessageCircle } from 'lucide-react';
import { especialidades, examenes } from '../../types/HomeSlides';

export function BookingSection() {
  const [bookTab, setBookTab] = useState<'consultas' | 'examenes'>('consultas');
  const [typeTab, setTypeTab] = useState<'especialidad' | 'profesional'>('especialidad');
  const [search, setSearch] = useState('');

  const items = bookTab === 'consultas' ? especialidades : examenes;
  const filtered = items.filter(i => i.toLowerCase().includes(search.toLowerCase()));

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