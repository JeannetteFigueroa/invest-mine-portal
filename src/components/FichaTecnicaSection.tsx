import { Building, MapPin, Mountain, Factory, Calendar, FileText } from 'lucide-react';

const FichaTecnicaSection = () => {
  const specs = [
    {
      icon: FileText,
      label: 'Nombre',
      value: 'Proyecto Minero Cumbres de Cortadera',
    },
    {
      icon: Building,
      label: 'Titular',
      value: 'Sociedad Minera Cumbres de Andacollo SpA',
    },
    {
      icon: FileText,
      label: 'Concesiones',
      value: 'Cumbre II 1-10; Virgen de Andacollo Tres 1-10',
    },
    {
      icon: MapPin,
      label: 'Ubicación',
      value: 'Sector Cortadera, Provincia de Copiapó, Región de Atacama',
    },
    {
      icon: Mountain,
      label: 'Altitud',
      value: '~2.800 - 2.900 m.s.n.m.',
    },
    {
      icon: Factory,
      label: 'Producción',
      value: '5.000 t/mes (cielo abierto) | 800-1.200 t/mes (vetas)',
    },
    {
      icon: Calendar,
      label: 'Vida Útil',
      value: '~4-5 años',
    },
  ];

  return (
    <section id="ficha" className="py-24 bg-card">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-primary font-medium text-sm tracking-widest uppercase">Especificaciones</span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold mt-4 mb-6">
            Ficha Técnica del Proyecto
          </h2>
          <div className="w-20 h-1 bg-gradient-gold mx-auto rounded-full" />
        </div>

        {/* Specs Grid */}
        <div className="max-w-4xl mx-auto">
          <div className="glass-card rounded-2xl overflow-hidden">
            {specs.map((spec, index) => (
              <div
                key={index}
                className={`flex flex-col sm:flex-row sm:items-center gap-4 p-6 ${
                  index !== specs.length - 1 ? 'border-b border-border' : ''
                }`}
              >
                <div className="flex items-center gap-4 sm:w-1/3">
                  <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center flex-shrink-0">
                    <spec.icon className="w-5 h-5 text-primary" />
                  </div>
                  <span className="font-medium text-muted-foreground">{spec.label}</span>
                </div>
                <div className="sm:w-2/3 pl-14 sm:pl-0">
                  <span className="text-foreground font-medium">{spec.value}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Additional Info */}
          <div className="mt-8 p-6 rounded-xl border border-primary/30 bg-primary/5">
            <p className="text-sm text-muted-foreground text-center">
              <span className="text-primary font-medium">Nota:</span> Las coordenadas UTM WGS84 y PSAD56 están registradas en los informes técnicos oficiales. Documentación completa disponible en la sección de descargas.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FichaTecnicaSection;
