import { useState, useRef, useCallback } from 'react';
import { Clock, Car, Sparkles, Filter } from 'lucide-react';
import type { Realization } from '../types';

const realizations: Realization[] = [
  {
    id: 1,
    vehicle: 'BMW M3',
    type: 'complet',
    service: 'Nova Premium Complet',
    duration: '4h30',
    beforeImage: 'https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg?auto=compress&cs=tinysrgb&w=800',
    afterImage: 'https://images.pexels.com/photos/3764984/pexels-photo-3764984.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    id: 2,
    vehicle: 'Mercedes AMG GT',
    type: 'exterieur',
    service: 'Nova Premium Extérieur',
    duration: '2h30',
    beforeImage: 'https://images.pexels.com/photos/112460/pexels-photo-112460.jpeg?auto=compress&cs=tinysrgb&w=800',
    afterImage: 'https://images.pexels.com/photos/6270876/pexels-photo-6270876.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    id: 3,
    vehicle: 'Audi RS6',
    type: 'interieur',
    service: 'Nova Premium Intérieur',
    duration: '3h00',
    beforeImage: 'https://images.pexels.com/photos/1545743/pexels-photo-1545743.jpeg?auto=compress&cs=tinysrgb&w=800',
    afterImage: 'https://images.pexels.com/photos/8105164/pexels-photo-8105164.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    id: 4,
    vehicle: 'Porsche 911',
    type: 'complet',
    service: 'Nova Showroom',
    duration: '8h00',
    beforeImage: 'https://images.pexels.com/photos/337909/pexels-photo-337909.jpeg?auto=compress&cs=tinysrgb&w=800',
    afterImage: 'https://images.pexels.com/photos/3806249/pexels-photo-3806249.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    id: 5,
    vehicle: 'Tesla Model S',
    type: 'exterieur',
    service: 'Nova Premium Extérieur',
    duration: '2h30',
    beforeImage: 'https://images.pexels.com/photos/120049/pexels-photo-120049.jpeg?auto=compress&cs=tinysrgb&w=800',
    afterImage: 'https://images.pexels.com/photos/120049/pexels-photo-120049.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    id: 6,
    vehicle: 'Range Rover Sport',
    type: 'interieur',
    service: 'Nova Premium Intérieur',
    duration: '3h30',
    beforeImage: 'https://images.pexels.com/photos/112460/pexels-photo-112460.jpeg?auto=compress&cs=tinysrgb&w=800',
    afterImage: 'https://images.pexels.com/photos/6270876/pexels-photo-6270876.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
];

type FilterType = 'all' | 'interieur' | 'exterieur' | 'complet';

function BeforeAfterSlider({ before, after }: { before: string; after: string }) {
  const [sliderPosition, setSliderPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const position = ((clientX - rect.left) / rect.width) * 100;
    setSliderPosition(Math.max(0, Math.min(100, position)));
  }, []);

  const handleMouseDown = () => {
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('touchmove', handleTouchMove);
    document.addEventListener('touchend', handleTouchEnd);
  };

  const handleMouseMove = (e: MouseEvent) => handleMove(e.clientX);
  const handleTouchMove = (e: TouchEvent) => handleMove(e.touches[0].clientX);

  const handleMouseUp = () => {
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
    document.removeEventListener('touchmove', handleTouchMove);
    document.removeEventListener('touchend', handleTouchEnd);
  };

  const handleTouchEnd = handleMouseUp;

  return (
    <div
      ref={containerRef}
      className="relative w-full h-64 md:h-80 overflow-hidden rounded-xl cursor-ew-resize select-none"
      onMouseDown={handleMouseDown}
      onTouchStart={handleMouseDown}
    >
      {/* After Image (Bottom Layer) */}
      <img
        src={after}
        alt="Après"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Before Image (Top Layer with clip) */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
      >
        <img
          src={before}
          alt="Avant"
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>

      {/* Slider Handle */}
      <div
        className="absolute top-0 bottom-0 w-1 bg-white shadow-lg z-10"
        style={{ left: `${sliderPosition}%` }}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-xl flex items-center justify-center">
          <div className="flex items-center gap-1 text-navy-900 font-bold text-xs">
            <span>AVANT</span>
            <span className="text-gray-400">|</span>
            <span>APRÈS</span>
          </div>
        </div>
      </div>

      {/* Labels */}
      <div className="absolute top-4 left-4 px-3 py-1 bg-red-500/90 text-white text-sm font-medium rounded-full">
        Avant
      </div>
      <div className="absolute top-4 right-4 px-3 py-1 bg-green-500/90 text-white text-sm font-medium rounded-full">
        Après
      </div>
    </div>
  );
}

export default function Gallery() {
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');

  const filters: { value: FilterType; label: string }[] = [
    { value: 'all', label: 'Tous' },
    { value: 'interieur', label: 'Intérieur' },
    { value: 'exterieur', label: 'Extérieur' },
    { value: 'complet', label: 'Complet' },
  ];

  const filteredRealizations =
    activeFilter === 'all'
      ? realizations
      : realizations.filter((r) => r.type === activeFilter);

  return (
    <div className="min-h-screen bg-gray-50 pt-24">
      {/* Header */}
      <section className="py-16 bg-navy-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 mb-6">
            <Sparkles className="w-4 h-4 text-sport-500" />
            <span className="text-sm text-white/90">Nos réalisations</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">
            AVANT / APRÈS
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Découvrez nos transformations et jugez par vous-même de la qualité de notre travail
          </p>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 bg-white border-b border-gray-100 sticky top-20 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center gap-2">
            <Filter className="w-5 h-5 text-gray-400 mr-2" />
            {filters.map((filter) => (
              <button
                key={filter.value}
                onClick={() => setActiveFilter(filter.value)}
                className={`px-5 py-2.5 rounded-lg font-medium transition-all duration-200 ${
                  activeFilter === filter.value
                    ? 'bg-navy-900 text-white'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredRealizations.map((realization) => (
              <div
                key={realization.id}
                className="card overflow-hidden group"
              >
                <BeforeAfterSlider
                  before={realization.beforeImage}
                  after={realization.afterImage}
                />
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <Car className="w-5 h-5 text-navy-900" />
                      <span className="font-semibold text-navy-900">{realization.vehicle}</span>
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        realization.type === 'interieur'
                          ? 'bg-blue-100 text-blue-700'
                          : realization.type === 'exterieur'
                          ? 'bg-green-100 text-green-700'
                          : 'bg-purple-100 text-purple-700'
                      }`}
                    >
                      {realization.type === 'interieur'
                        ? 'Intérieur'
                        : realization.type === 'exterieur'
                        ? 'Extérieur'
                        : 'Complet'}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <span>{realization.service}</span>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>{realization.duration}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredRealizations.length === 0 && (
            <div className="text-center py-16">
              <p className="text-gray-500">Aucune réalisation trouvée pour ce filtre.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
