import { servicios } from "../../data/servicios";

export function ServiciosSection() {
  return (
    <section className="bg-white py-12 md:py-16 border-b">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-[#023e8a]">
            Servicios y Unidades
          </h2>
          <p className="text-gray-500 mt-2 text-sm">
            Atención integral en salud para toda la comunidad
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {servicios.map((s) => {
            const Icon = s.icon;

            return (
              <button
                key={s.titulo}
                className="group flex flex-col items-center text-center p-4 rounded-2xl border border-gray-100 hover:border-[#0096c7] hover:shadow-md transition-all"
              >
                <Icon className="w-8 h-8 mb-2 text-[#0096c7] group-hover:text-[#0077b6]" />

                <h3 className="font-semibold text-[#023e8a] text-xs mb-1 group-hover:text-[#0096c7] transition-colors">
                  {s.titulo}
                </h3>

                <p className="text-[11px] text-gray-400 leading-snug hidden md:block">
                  {s.desc}
                </p>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}