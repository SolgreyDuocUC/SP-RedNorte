export function FloatingElements() {
  return (
    <>
      <a href="https://wa.me/56900000000" className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25d366] shadow-lg">
        {/* Icono WhatsApp */}
      </a>
      <div className="fixed right-0 top-1/2 -translate-y-1/2 z-50">
        <button className="bg-[#0096c7] text-white text-xs font-semibold py-3 px-3" style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}>
          Felicitaciones y Sugerencias
        </button>
      </div>
    </>
  );
}