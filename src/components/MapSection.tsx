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

  // Approximate coordinates for the Cortadera sector, Copiapó region
  const projectCoords: [number, number] = [-27.3666, -70.3333];
  const copiapoCoords: [number, number] = [-27.3667, -70.3314];

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;

    // Create custom gold marker icon
    const goldIcon = L.divIcon({
      html: `
        <div style="
          width: 40px;
          height: 40px;
          background: linear-gradient(135deg, hsl(38 70% 50%), hsl(25 65% 45%));
          border-radius: 50% 50% 50% 0;
          transform: rotate(-45deg);
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 20px rgba(196, 147, 64, 0.4);
        ">
          <svg style="transform: rotate(45deg); width: 20px; height: 20px; color: hsl(220 20% 8%);" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2L8 6H3V8L5 10V20H19V10L21 8V6H16L12 2ZM12 4.83L14.17 7H9.83L12 4.83ZM18 18H6V10.83L4 8.83V8H20V8.83L18 10.83V18Z"/>
          </svg>
        </div>
      `,
      className: '',
      iconSize: [40, 40],
      iconAnchor: [20, 40],
      popupAnchor: [0, -40],
    });

    const map = L.map(mapRef.current, {
      center: projectCoords,
      zoom: 10,
      scrollWheelZoom: false,
    });

    // Add OpenStreetMap tiles with dark theme
    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
      maxZoom: 19,
    }).addTo(map);

    // Add project marker
    const projectMarker = L.marker(projectCoords, { icon: goldIcon }).addTo(map);
    projectMarker.bindPopup(`
      <div style="font-family: 'Inter', sans-serif; padding: 8px;">
        <h3 style="font-weight: 600; margin-bottom: 4px; color: hsl(38 70% 50%);">Cumbres de Cortadera</h3>
        <p style="font-size: 12px; margin: 0; color: hsl(45 20% 85%);">Sector Cortadera, Copiapó</p>
        <p style="font-size: 12px; margin-top: 4px; color: hsl(220 10% 55%);">Altitud: ~2.800 - 2.900 m.s.n.m.</p>
      </div>
    `);

    // Add Copiapó marker for reference
    const copiapoMarker = L.marker(copiapoCoords).addTo(map);
    copiapoMarker.bindPopup(`
      <div style="font-family: 'Inter', sans-serif; padding: 8px;">
        <h3 style="font-weight: 600; margin-bottom: 4px; color: hsl(45 20% 95%);">Copiapó</h3>
        <p style="font-size: 12px; margin: 0; color: hsl(220 10% 55%);">Ciudad de referencia</p>
      </div>
    `);

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
      description: 'Ruta internacional desde Copiapó',
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
              <span className="text-primary font-medium">Campamento:</span> Coordenadas del punto de interés y campamento incluidas en la documentación técnica adjunta.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MapSection;
