import { Shield, AlertTriangle, Leaf, Eye } from 'lucide-react';

const PlanCierreSection = () => {
  const closureMeasures = [
    {
      icon: AlertTriangle,
      title: 'Señalización y Cierre',
      description: 'Cierre de accesos y señalización de áreas intervenidas',
    },
    {
      icon: Shield,
      title: 'Estabilización',
      description: 'Estabilización de taludes y gestión de residuos',
    },
    {
      icon: Leaf,
      title: 'Retiro de Infraestructura',
      description: 'Remoción de infraestructura no reutilizable',
    },
    {
      icon: Eye,
      title: 'Monitoreo Post-Cierre',
      description: 'Seguimiento continuo según normativa vigente',
    },
  ];

  return (
    <section className="py-24 bg-gradient-dark">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-primary font-medium text-sm tracking-widest uppercase">Responsabilidad Ambiental</span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold mt-4 mb-6">
            Plan de Cierre
          </h2>
          <div className="w-20 h-1 bg-gradient-gold mx-auto rounded-full" />
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="glass-card rounded-2xl p-8 md:p-12 mb-10">
            <p className="text-lg text-muted-foreground leading-relaxed text-center">
              La Declaración de Plan de Cierre contempla medidas de mitigación y cierre progresivo, ajustándose a la <span className="text-primary font-medium">Ley N°20.551</span> y su reglamento.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-6">
            {closureMeasures.map((measure, index) => (
              <div
                key={index}
                className="glass-card rounded-xl p-6 flex items-start gap-4 hover:border-primary/50 transition-colors"
              >
                <div className="w-12 h-12 rounded-lg bg-gradient-gold flex items-center justify-center flex-shrink-0 shadow-gold">
                  <measure.icon className="w-6 h-6 text-primary-foreground" />
                </div>
                <div>
                  <h4 className="font-display font-semibold text-foreground mb-2">{measure.title}</h4>
                  <p className="text-sm text-muted-foreground">{measure.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PlanCierreSection;
