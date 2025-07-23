'use client';

function FooterComponent() {
  return (
    <footer className="bg-amber-900 text-amber-50 py-8 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <span className="text-2xl">🥖</span>
            <h3 className="text-xl font-bold">Panadería Delicias</h3>
          </div>
          
          <div className="border-t border-amber-700 pt-6">
            <p className="text-sm text-amber-200 leading-relaxed">
              Este proyecto fue desarrollado para el{' '}
              <span className="font-semibold text-amber-100">
                Seminario de Actualización Tecnológica
              </span>{' '}
              del Diplomado de Ingeniería de Software
            </p>
            <p className="text-sm text-amber-200 mt-2">
              Por:{' '}
              <span className="font-semibold text-amber-100">
                José Antonio Pedraza Parada
              </span>{' '}
              y{' '}
              <span className="font-semibold text-amber-100">
                Francisca Beatriz Medina Concha
              </span>
            </p>
            <p className="text-xs text-amber-300 mt-4">
              © 2025 - Proyecto Académico
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default FooterComponent;
