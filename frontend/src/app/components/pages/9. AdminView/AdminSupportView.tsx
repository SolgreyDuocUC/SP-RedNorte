import { LifeBuoy, Plus, Search, MessageSquare, AlertCircle, CheckCircle2, Clock } from 'lucide-react';
import { Card, CardContent } from '../../ui/card';

export function AdminSupportView() {
  const tickets = [
    { id: 'TKT-1024', user: 'Dra. Ana Silva', type: 'Reinicio Contraseña', status: 'pending', date: 'Hace 2 horas', priority: 'high' },
    { id: 'TKT-1023', user: 'Enf. Carlos Ruiz', type: 'Problema de Acceso', status: 'in-progress', date: 'Hace 5 horas', priority: 'medium' },
    { id: 'TKT-1022', user: 'Admin Centro Iquique', type: 'Solicitud de Nuevo Rol', status: 'resolved', date: 'Ayer', priority: 'low' },
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12 animate-in fade-in zoom-in-95 duration-300">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-[#023e8a] flex items-center gap-2">
            <LifeBuoy className="h-6 w-6 text-amber-500" />
            Mesa de Soporte
          </h2>
          <p className="text-sm text-slate-500 mt-1">Gestión de tickets, problemas del sistema y solicitudes de colaboradores.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        
        {/* SIDEBAR TICKETS STATUS */}
        <div className="lg:col-span-1 space-y-4">
          <Card className="border-0 shadow-sm ring-1 ring-slate-100 bg-white">
            <CardContent className="p-4 space-y-2">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Estado de Tickets</h3>
              
              <button className="w-full flex items-center justify-between p-2 rounded-lg bg-amber-50 text-amber-700 font-semibold text-sm">
                <div className="flex items-center gap-2"><Clock className="h-4 w-4" /> Pendientes</div>
                <span className="bg-amber-200/50 px-2 py-0.5 rounded-full text-xs">5</span>
              </button>
              
              <button className="w-full flex items-center justify-between p-2 rounded-lg hover:bg-blue-50 text-slate-600 hover:text-blue-700 font-semibold text-sm transition-colors">
                <div className="flex items-center gap-2"><AlertCircle className="h-4 w-4" /> En Proceso</div>
                <span className="bg-slate-100 px-2 py-0.5 rounded-full text-xs">2</span>
              </button>

              <button className="w-full flex items-center justify-between p-2 rounded-lg hover:bg-green-50 text-slate-600 hover:text-green-700 font-semibold text-sm transition-colors">
                <div className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4" /> Resueltos</div>
                <span className="bg-slate-100 px-2 py-0.5 rounded-full text-xs">124</span>
              </button>
            </CardContent>
          </Card>
        </div>

        {/* LISTADO DE TICKETS */}
        <div className="lg:col-span-3">
          <Card className="border-0 shadow-sm ring-1 ring-slate-100 overflow-hidden bg-white">
            <div className="h-2 w-full bg-gradient-to-r from-amber-400 to-orange-500" />
            <CardContent className="p-0">
              <div className="p-4 border-b border-slate-100 flex gap-2">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <input
                    placeholder="Buscar por ID de ticket o colaborador..."
                    className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 outline-none transition-all"
                  />
                </div>
              </div>

              <div className="divide-y divide-slate-100">
                {tickets.map(ticket => (
                  <div key={ticket.id} className="p-4 flex items-start gap-4 hover:bg-slate-50/50 transition-colors cursor-pointer group">
                    <div className={`mt-1 h-8 w-8 rounded-full flex items-center justify-center shrink-0
                      ${ticket.status === 'pending' ? 'bg-amber-100 text-amber-600' : 
                        ticket.status === 'in-progress' ? 'bg-blue-100 text-blue-600' : 'bg-green-100 text-green-600'}`}>
                      <MessageSquare className="h-4 w-4" />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <h4 className="text-sm font-bold text-slate-800 group-hover:text-[#023e8a] transition-colors truncate">
                          {ticket.type}
                        </h4>
                        <span className="text-xs text-slate-400 shrink-0">{ticket.date}</span>
                      </div>
                      
                      <div className="flex items-center gap-3 mt-1 text-xs text-slate-500">
                        <span className="font-mono bg-slate-100 px-1.5 py-0.5 rounded text-slate-600 font-semibold">{ticket.id}</span>
                        <span>Solicitado por: <strong>{ticket.user}</strong></span>
                        
                        <span className={`px-2 py-0.5 rounded-full font-semibold uppercase text-[9px] tracking-wider
                          ${ticket.priority === 'high' ? 'bg-red-50 text-red-600 border border-red-100' : 
                            ticket.priority === 'medium' ? 'bg-amber-50 text-amber-600 border border-amber-100' : 
                            'bg-slate-50 text-slate-500 border border-slate-200'}`}>
                          Prioridad: {ticket.priority}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

      </div>
    </div>
  );
}
