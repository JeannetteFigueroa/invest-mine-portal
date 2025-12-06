import { useEffect, useRef, useState } from 'react';
import { MapPin, Navigation, Clock, Mountain } from 'lucide-react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default marker icons in Leaflet with Vite
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
});

const MapSection = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const [isMapLoaded, setIsMapLoaded] = useState(false);

  // Coordinates
  const copiapoCoords: [number, number] = [-27.3667, -70.3314]; // Copiapó (inicio)
  const projectCoords: [number, number] = [-27.3666, -70.3333]; // Proyecto (destino aproximado)
  
  // Route waypoints along the international route from Copiapó
  const routeCoords: [number, number][] = [
    [-27.3667, -70.3314], // Copiapó
    [-27.3500, -70.2800], // Punto intermedio 1
    [-27.3400, -70.2500], // Punto intermedio 2
    [-27.3666, -70.3333], // Destino - Cortadera
  ];

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;

    // Center map between both points
    const centerLat = (copiapoCoords[0] + projectCoords[0]) / 2;
    const centerLng = (copiapoCoords[1] + projectCoords[1]) / 2;

    const map = L.map(mapRef.current, {
      center: [centerLat, centerLng],
      zoom: 11,
      scrollWheelZoom: false,
    });

    // Add OpenStreetMap tiles with dark theme (no custom markers, clean look)
    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
      maxZoom: 19,
    }).addTo(map);

    // Custom start marker (green)
    const startIcon = L.divIcon({
      html: `
        <div style="
          width: 32px;
          height: 32px;
          background: #22c55e;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 2px 10px rgba(34, 197, 94, 0.5);
          border: 3px solid #fff;
        ">
          <span style="color: white; font-weight: bold; font-size: 14px;">A</span>
        </div>
      `,
      className: '',
      iconSize: [32, 32],
      iconAnchor: [16, 16],
      popupAnchor: [0, -16],
    });

    // Custom end marker (red)
    const endIcon = L.divIcon({
      html: `
        <div style="
          width: 32px;
          height: 32px;
          background: #ef4444;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 2px 10px rgba(239, 68, 68, 0.5);
          border: 3px solid #fff;
        ">
          <span style="color: white; font-weight: bold; font-size: 14px;">B</span>
        </div>
      `,
      className: '',
      iconSize: [32, 32],
      iconAnchor: [16, 16],
      popupAnchor: [0, -16],
    });

    // Add start marker (Copiapó)
    const startMarker = L.marker(copiapoCoords, { icon: startIcon }).addTo(map);
    startMarker.bindPopup(`
      <div style="font-family: 'Inter', sans-serif; padding: 8px; min-width: 180px;">
        <h3 style="font-weight: 600; margin-bottom: 4px; color: #22c55e;">🚀 INICIO - Copiapó</h3>
        <p style="font-size: 12px; margin: 0; color: #6b7280;">Ciudad de partida</p>
        <p style="font-size: 11px; margin-top: 4px; color: #9ca3af;">Ruta internacional hacia Cortadera</p>
      </div>
    `);

    // Add end marker (Project)
    const endMarker = L.marker(projectCoords, { icon: endIcon }).addTo(map);
    endMarker.bindPopup(`
      <div style="font-family: 'Inter', sans-serif; padding: 8px; min-width: 200px;">
        <h3 style="font-weight: 600; margin-bottom: 4px; color: #ef4444;">📍 DESTINO - Cumbres de Cortadera</h3>
        <p style="font-size: 12px; margin: 0; color: #6b7280;">Sector Cortadera, Copiapó</p>
        <p style="font-size: 11px; margin-top: 4px; color: #9ca3af;">Altitud: ~2.800 - 2.900 m.s.n.m.</p>
        <p style="font-size: 11px; margin-top: 2px; color: #9ca3af;">Coordenadas: UTM WGS84 / PSAD56</p>
      </div>
    `);

    // Draw route line
    const routeLine = L.polyline(routeCoords, {
      color: '#3b82f6',
      weight: 4,
      opacity: 0.8,
      dashArray: '10, 10',
    }).addTo(map);

    // Fit map to show both markers
    const bounds = L.latLngBounds([copiapoCoords, projectCoords]);
    map.fitBounds(bounds, { padding: [50, 50] });

    mapInstanceRef.current = map;
    setIsMapLoaded(true);

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  const accessInfo = [
    {
      icon: Navigation,
      title: 'Ruta de Acceso',
      description: 'Ruta internacional desde Copiapó hacia Cortadera',
    },
    {
      icon: Clock,
      title: 'Tiempo Estimado',
      description: 'Aproximadamente 1h 30min',
    },
    {
      icon: Mountain,
      title: 'Altitud',
      description: '2.800 - 2.900 m.s.n.m.',
    },
    {
      icon: MapPin,
      title: 'Coordenadas',
      description: 'UTM WGS84 / PSAD56 documentadas',
    },
  ];

  return (
    <section id="localizacion" className="py-24 bg-gradient-dark">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-primary font-medium text-sm tracking-widest uppercase">Ubicación</span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold mt-4 mb-6">
            Localización y Acceso
          </h2>
          <div className="w-20 h-1 bg-gradient-gold mx-auto rounded-full" />
        </div>

        <div className="max-w-6xl mx-auto">
          {/* Route Info Box */}
          <div className="mb-6 p-4 rounded-xl border border-primary/30 bg-primary/5">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-center sm:text-left">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center">
                  <span className="text-white text-xs font-bold">A</span>
                </div>
                <span className="text-foreground font-medium">Copiapó (Inicio)</span>
              </div>
              <div className="hidden sm:block text-muted-foreground">→</div>
              <div className="text-muted-foreground text-sm">Ruta Internacional (~1h 30min)</div>
              <div className="hidden sm:block text-muted-foreground">→</div>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-red-500 flex items-center justify-center">
                  <span className="text-white text-xs font-bold">B</span>
                </div>
                <span className="text-foreground font-medium">Cumbres de Cortadera (Destino)</span>
              </div>
            </div>
          </div>

          {/* Map Container */}
          <div className="glass-card rounded-2xl overflow-hidden mb-8">
            <div
              ref={mapRef}
              className="h-[400px] md:h-[500px] w-full"
              style={{ minHeight: '400px' }}
            />
          </div>

          {/* Access Information Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {accessInfo.map((info, index) => (
              <div
                key={index}
                className="glass-card rounded-xl p-5 flex items-start gap-4 hover:border-primary/50 transition-colors"
              >
                <div className="w-10 h-10 rounded-lg bg-gradient-gold flex items-center justify-center flex-shrink-0 shadow-gold">
                  <info.icon className="w-5 h-5 text-primary-foreground" />
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-1">{info.title}</h4>
                  <p className="text-sm text-muted-foreground">{info.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Additional Note */}
          <div className="mt-8 p-6 rounded-xl border border-primary/30 bg-primary/5 text-center">
            <p className="text-sm text-muted-foreground">
              <span className="text-primary font-medium">Campamento:</span> Coordenadas del punto de interés y campamento incluidas en la documentación técnica adjunta (UTM WGS84 / PSAD56).
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MapSection;
