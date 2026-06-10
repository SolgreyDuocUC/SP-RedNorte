export function InfoSection() {
  const handleContactClick = () => {
    // Smooth scroll to the centers/contact section
    const centrosSection = document.getElementById('centros');
    if (centrosSection) {
      centrosSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="bg-[#f8f9fb] py-16 md:py-24 border-b border-gray-100">
      <div className="max-w-4xl mx-auto px-6 md:px-12 flex flex-col items-start text-left">
        
        {/* Section Heading */}
        <h2 className="text-3xl md:text-[38px] font-extrabold text-[#2d4b68] tracking-tight leading-tight mb-8">
          Conoce los Servicios a nivel nacional
        </h2>

        {/* Copy Text with styled paragraphs and bold text */}
        <div className="space-y-6 text-gray-600 text-base md:text-lg leading-relaxed font-sans max-w-3xl">
          <p>
            Sabemos que <strong className="font-semibold text-gray-800">esperar una atención médica puede generar incertidumbre, preocupación y muchas preguntas.</strong> Por eso, en RedNorte trabajamos para que el camino hacia tu atención sea más claro, cercano y humano. Conectamos hospitales, clínicas y centros de salud de la <strong className="font-semibold text-gray-800">zona centro y norte de Chile</strong> para acompañarte en el proceso de interconsultas y listas de espera, manteniéndote informado sobre el estado de tu solicitud y facilitando la comunicación con la red asistencial.
          </p>
          
          <p>
            Creemos que <strong className="font-semibold text-gray-800">cada paciente merece ser escuchado, orientado y atendido con dignidad y respeto.</strong> Porque la salud no debería ser una preocupación constante, sino la tranquilidad de saber que hay una red de personas trabajando por tu bienestar.
          </p>

          <p className="text-gray-500">
            Tu salud nos importa. Tu tiempo también. Y detrás de cada solicitud, vemos a una persona, no solo un trámite.
          </p>
        </div>

        {/* Action Button */}
        <button
          onClick={handleContactClick}
          className="mt-10 px-6 py-3 rounded-lg text-sm font-semibold bg-[#4a6b82] hover:bg-[#3d596d] text-white transition-all duration-300 shadow-sm hover:shadow-md hover:-translate-y-0.5 cursor-pointer text-center"
        >
          Contactanos
        </button>

      </div>
    </section>
  );
}
