import { Pickaxe, Layers, Gem, Hammer } from 'lucide-react';

const GeologiaSection = () => {
  const exploitationMethods = [
    {
      title: 'Cantera en Ladera',
      description: 'Para cuerpos mantiformes con banqueo descendente (bancos de 10m)',
      type: 'Cielo Abierto',
    },
    {
      title: 'Corte y Relleno',
      description: 'Para sectores con vetas angostas controladas',
      type: 'Subterráneo',
    },
  ];

  const operations = [
    { icon: Hammer, title: 'Perforación', description: 'Tronadura controlada' },
    { icon: Pickaxe, title: 'Carguío', description: 'Palas y cargadores' },
    { icon: Layers, title: 'Transporte', description: 'Camiones tolva' },
    { icon: Gem, title: 'Fortificación', description: 'Labores de seguridad' },
  ];

  return (
    <section id="geologia" className="py-24 bg-card">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-primary font-medium text-sm tracking-widest uppercase">Aspectos Técnicos</span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold mt-4 mb-6">
            Geología y Explotación
          </h2>
          <div className="w-20 h-1 bg-gradient-gold mx-auto rounded-full" />
        </div>

        <div className="max-w-6xl mx-auto">
          {/* Geology Section */}
          <div className="grid lg:grid-cols-2 gap-8 mb-16">
            <div className="glass-card rounded-2xl p-8">
              <div className="w-14 h-14 rounded-xl bg-gradient-gold flex items-center justify-center mb-6 shadow-gold">
                <Gem className="w-7 h-7 text-primary-foreground" />
              </div>
              <h3 className="font-display text-2xl font-semibold text-foreground mb-4">
                Mineralización
              </h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                La mineralización se interpreta como <span className="text-foreground">vetiforme y mantiforme</span> asociada a una secuencia volcano-sedimentaria del Paleógeno y eventuales intrusivos monzodioríticos/graníticos.
              </p>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-primary" />
                  <span className="text-sm text-foreground">Óxidos de cobre (crisocola, atacamita)</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-accent" />
                  <span className="text-sm text-foreground">Vetas de cuarzo con oro y sulfuros</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-gold-light" />
                  <span className="text-sm text-foreground">Sistemas de fallas identificados</span>
                </div>
              </div>
            </div>

            <div className="glass-card rounded-2xl p-8">
              <div className="w-14 h-14 rounded-xl bg-gradient-gold flex items-center justify-center mb-6 shadow-gold">
                <Layers className="w-7 h-7 text-primary-foreground" />
              </div>
              <h3 className="font-display text-2xl font-semibold text-foreground mb-4">
                Parámetros Operacionales
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center py-3 border-b border-border">
                  <span className="text-muted-foreground">REM Inicial</span>
                  <span className="font-semibold text-primary">2.5</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-border">
                  <span className="text-muted-foreground">Tamaño de Banco</span>
                  <span className="font-semibold text-foreground">10 metros</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-border">
                  <span className="text-muted-foreground">Escala de Equipos</span>
                  <span className="font-semibold text-foreground">Mediana</span>
                </div>
                <div className="flex justify-between items-center py-3">
                  <span className="text-muted-foreground">Prestripping</span>
                  <span className="font-semibold text-foreground">Previsto</span>
                </div>
              </div>
            </div>
          </div>

          {/* Exploitation Methods */}
          <div className="mb-16">
            <h3 className="font-display text-2xl font-semibold text-foreground text-center mb-8">
              Métodos de Explotación
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              {exploitationMethods.map((method, index) => (
                <div
                  key={index}
                  className="glass-card rounded-xl p-6 border-l-4 border-primary hover:border-l-primary transition-all"
                >
                  <span className="inline-block px-3 py-1 text-xs font-medium bg-primary/20 text-primary rounded-full mb-3">
                    {method.type}
                  </span>
                  <h4 className="font-display text-lg font-semibold text-foreground mb-2">
                    {method.title}
                  </h4>
                  <p className="text-muted-foreground text-sm">{method.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Operations */}
          <div>
            <h3 className="font-display text-2xl font-semibold text-foreground text-center mb-8">
              Operaciones Unitarias
            </h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {operations.map((op, index) => (
                <div
                  key={index}
                  className="glass-card rounded-xl p-5 text-center hover:border-primary/50 transition-all group"
                >
                  <div className="w-12 h-12 rounded-lg bg-secondary flex items-center justify-center mx-auto mb-4 group-hover:bg-gradient-gold transition-all">
                    <op.icon className="w-6 h-6 text-primary group-hover:text-primary-foreground transition-colors" />
                  </div>
                  <h4 className="font-medium text-foreground mb-1">{op.title}</h4>
                  <p className="text-xs text-muted-foreground">{op.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GeologiaSection;
