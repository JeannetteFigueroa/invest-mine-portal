import { CheckCircle, DollarSign, Users, Building2 } from 'lucide-react';

const ResumenSection = () => {
  const investmentModels = [
    {
      icon: Building2,
      title: 'Fondos Públicos',
      description: 'Programas de ENAMI/GORE/Corfo para pequeña minería',
    },
    {
      icon: Users,
      title: 'Profit-Share',
      description: 'Acuerdos de participación en utilidades con aportantes privados',
    },
    {
      icon: DollarSign,
      title: 'Arriendo Operacional',
      description: 'Contratos por metro avanzado o tonelada para reducir CAPEX inicial',
    },
  ];

  return (
    <section id="resumen" className="py-24 bg-gradient-dark">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-primary font-medium text-sm tracking-widest uppercase">Visión General</span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold mt-4 mb-6">
            Resumen Ejecutivo
          </h2>
          <div className="w-20 h-1 bg-gradient-gold mx-auto rounded-full" />
        </div>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto">
          <div className="glass-card rounded-2xl p-8 md:p-12 mb-12">
            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
              El proyecto <span className="text-foreground font-semibold">Cumbres de Cortadera</span> comprende la explotación de pertenencias mineras ubicadas en el sector Cortadera, Provincia de Copiapó, Región de Atacama. Los documentos técnicos muestran la existencia de mineralización de <span className="text-primary">óxidos y sulfuros de cobre</span> y vetas con presencia de <span className="text-primary">oro y plata</span> en afloramientos y labores históricas.
            </p>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="flex items-start gap-4">
                <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-semibold text-foreground mb-1">Pertenencias Cumbre II</h4>
                  <p className="text-muted-foreground text-sm">10 pertenencias con coordenadas y hito de mensura registradas</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-semibold text-foreground mb-1">Virgen de Andacollo Tres</h4>
                  <p className="text-muted-foreground text-sm">10 pertenencias adicionales documentadas</p>
                </div>
              </div>
            </div>

            <p className="text-muted-foreground leading-relaxed">
              La propuesta técnica considera métodos compatibles con pequeña-mediana escala: <span className="text-foreground">cantera en ladera a cielo abierto</span> para cuerpos mantiformes y <span className="text-foreground">explotación subterránea por vetas controladas</span> (corte y relleno) en sectores de vetas angostas.
            </p>
          </div>

          {/* Investment Models */}
          <div className="text-center mb-10">
            <h3 className="font-display text-2xl font-semibold text-foreground mb-4">
              Oportunidad para Inversionistas
            </h3>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              La iniciativa requiere capital de trabajo para completar exploración (sondajes) y financiar etapas iniciales de prestripping y movilización.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {investmentModels.map((model, index) => (
              <div
                key={index}
                className="glass-card rounded-xl p-6 text-center hover:border-primary/50 transition-all duration-300 group"
              >
                <div className="w-14 h-14 rounded-xl bg-gradient-gold flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform shadow-gold">
                  <model.icon className="w-7 h-7 text-primary-foreground" />
                </div>
                <h4 className="font-display font-semibold text-foreground mb-2">{model.title}</h4>
                <p className="text-sm text-muted-foreground">{model.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ResumenSection;
