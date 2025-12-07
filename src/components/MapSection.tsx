// MapSection.tsx (reemplaza tu componente)
import { useEffect, useRef } from "react";
import { MapPin, Navigation, Clock, Mountain } from "lucide-react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import proj4 from "proj4";

// Fix default icons (Vite)
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
});

const MapSection = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);

  const accessInfo = [
    { icon: Navigation, title: "Ruta de Acceso", description: "Ruta internacional desde Copiapó hacia Cortadera" },
    { icon: Clock, title: "Tiempo Estimado", description: "Aproximadamente 1h 30min" },
    { icon: Mountain, title: "Altitud", description: "2.800 - 2.900 m.s.n.m." },
    { icon: MapPin, title: "Coordenadas", description: "UTM WGS84 / PSAD56 documentadas" },
  ];

  // Punto inicio (Copiapó) — lat/lon
  const copiapoCoords: [number, number] = [-27.3667, -70.3314];

  // UTM entregadas por ti (asegurate de que X sea 436181 y Y 7021397)
  const utmEasting = 436181; // Este (X)
  const utmNorthing = 7021397; // Norte (Y)
  const utmZoneNumber = 19;
  const utmHemisphere = "south"; // Chile -> hemisphere south

  // Proj4 defs:
  // WGS84 UTM zone 19S
  const projUTM_WGS84 = `+proj=utm +zone=${utmZoneNumber} +south +datum=WGS84 +units=m +no_defs`;
  // PSAD56 UTM zone 19S (commonly used in Chile older maps)
  const projUTM_PSAD56 = `+proj=utm +zone=${utmZoneNumber} +south +datum=PSAD56 +units=m +no_defs`;

  // EPSG:4326 target
  const projLatLon = "EPSG:4326";

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;

    // Convertir UTM -> lon/lat para ambos datums
    let lonlatWGS84: [number, number] = [0, 0];
    let lonlatPSAD56: [number, number] = [0, 0];

    try {
      // proj4 toma input [x,y] => [lon, lat] si convertimos a EPSG:4326
      const w = proj4(projUTM_WGS84, projLatLon, [utmEasting, utmNorthing]);
      lonlatWGS84 = [Number(w[1].toFixed(6)), Number(w[0].toFixed(6))]; // [lat, lon]
    } catch (e) {
      console.error("Error conv UTM->WGS84:", e);
    }

    try {
      const p = proj4(projUTM_PSAD56, projLatLon, [utmEasting, utmNorthing]);
      lonlatPSAD56 = [Number(p[1].toFixed(6)), Number(p[0].toFixed(6))]; // [lat, lon]
    } catch (e) {
      console.error("Error conv UTM->PSAD56:", e);
    }

    // Si las conversiones fallan por alguna razón, usamos un fallback
    const projectCoordsWGS84: [number, number] =
      lonlatWGS84[0] === 0 && lonlatWGS84[1] === 0
        ? [-27.3869, -70.2552]
        : lonlatWGS84;

    const projectCoordsPSAD56: [number, number] =
      lonlatPSAD56[0] === 0 && lonlatPSAD56[1] === 0
        ? [-27.3869, -70.2552]
        : lonlatPSAD56;

    // Crear mapa (ESRI satélite)
    const map = L.map(mapRef.current, {
      center: copiapoCoords,
      zoom: 10,
      scrollWheelZoom: false,
    });

    L.tileLayer(
      "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
      {
        attribution: "Tiles © Esri — Source: Esri, USGS, NOAA, Earthstar Geographics",
        maxZoom: 19,
      }
    ).addTo(map);

    // iconos A/B
    const startIcon = L.divIcon({
      html: `<div style="width:32px;height:32px;border-radius:50%;background:#22c55e;display:flex;align-items:center;justify-content:center;border:3px solid #fff;box-shadow:0 2px 10px rgba(34,197,94,0.5)"><span style="color:white;font-weight:bold">A</span></div>`,
      iconSize: [32, 32],
      iconAnchor: [16, 16],
    });
    const endIconW = L.divIcon({
      html: `<div style="width:32px;height:32px;border-radius:50%;background:#ef4444;display:flex;align-items:center;justify-content:center;border:3px solid #fff;box-shadow:0 2px 10px rgba(239,68,68,0.5)"><span style="color:white;font-weight:bold">B</span></div>`,
      iconSize: [32, 32],
      iconAnchor: [16, 16],
    });
    const endIconP = L.divIcon({
      html: `<div style="width:28px;height:28px;border-radius:50%;background:#f59e0b;display:flex;align-items:center;justify-content:center;border:2px solid #fff;box-shadow:0 1px 6px rgba(245,158,11,0.4)"><span style="color:white;font-weight:bold">B'</span></div>`,
      iconSize: [28, 28],
      iconAnchor: [14, 14],
    });

    // marcadores
    const startMarker = L.marker(copiapoCoords, { icon: startIcon }).addTo(map);
    startMarker.bindPopup("🚀 INICIO — Copiapó (Acceso Ruta Internacional CH-31)");

    const destW = L.marker(projectCoordsWGS84, { icon: endIconW })
      .addTo(map)
      .bindPopup(
        `<strong>Destino (WGS84)</strong><br/>Lat: ${projectCoordsWGS84[0]}, Lon: ${projectCoordsWGS84[1]}`
      );

    const destP = L.marker(projectCoordsPSAD56, { icon: endIconP })
      .addTo(map)
      .bindPopup(
        `<strong>Destino (PSAD56)</strong><br/>Lat: ${projectCoordsPSAD56[0]}, Lon: ${projectCoordsPSAD56[1]}`
      );

    // Función para dibujar ruta OSRM dado dos pares lat/lon
    const drawRoute = async (from: [number, number], to: [number, number], style: any) => {
      try {
        const url = `https://router.project-osrm.org/route/v1/driving/${from[1]},${from[0]};${to[1]},${to[0]}?overview=full&geometries=geojson`;
        const res = await fetch(url);
        const json = await res.json();
        if (!json.routes?.length) return null;
        const coords = json.routes[0].geometry.coordinates.map((c: number[]) => [c[1], c[0]]);
        return L.polyline(coords, style).addTo(map);
      } catch (err) {
        console.error("OSRM error:", err);
        return null;
      }
    };

    // dibujar rutas para ambas conversiones (si diferentes)
    const styleW = { color: "#3b82f6", weight: 4, opacity: 0.9 };
    const styleP = { color: "#f59e0b", weight: 3, opacity: 0.9, dashArray: "6,6" };

    // Dibuja la ruta WGS84
    drawRoute(copiapoCoords, projectCoordsWGS84, styleW).then((poly) => {
      // ajustar bounds si viene ruta
      if (poly) map.fitBounds(poly.getBounds().pad(0.3));
    });

    // Dibuja la ruta PSAD56 (si lat/lon difieren visiblemente)
    const diffLat = Math.abs(projectCoordsWGS84[0] - projectCoordsPSAD56[0]);
    const diffLon = Math.abs(projectCoordsWGS84[1] - projectCoordsPSAD56[1]);
    if (diffLat > 0.00001 || diffLon > 0.00001) {
      drawRoute(copiapoCoords, projectCoordsPSAD56, styleP);
    }

    mapInstanceRef.current = map;

    // cleanup
    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  // === UI (tu UI existente queda igual; aquí solo muestro el contenedor) ===
  return (
    <section id="localizacion" className="py-24 bg-gradient-dark">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="text-primary font-medium text-sm tracking-widest uppercase">Ubicación</span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold mt-4 mb-6">
            Localización y Acceso
          </h2>
          <div className="w-20 h-1 bg-gradient-gold mx-auto rounded-full" />
        </div>
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

        <div className="max-w-6xl mx-auto">
          <div className="glass-card rounded-2xl overflow-hidden mb-8">
            <div ref={mapRef} className="h-[500px] w-full" />
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
