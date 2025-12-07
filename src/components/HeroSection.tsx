import { ArrowDown, MapPin, Calendar, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import heroImage from '@/assets/hero-mining.jpg';

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0" style={{ background: 'var(--gradient-hero)' }} />
      
      {/* Decorative Elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-pulse-slow" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '2s' }} />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 pt-20">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card mb-8 animate-fade-in">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="text-sm font-medium text-foreground">Oportunidad de Inversión</span>
          </div>

          {/* Main Title */}
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            Proyecto Minero
            <span className="block text-gradient-gold mt-2">Cumbres de Cortadera</span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 animate-fade-in" style={{ animationDelay: '0.4s' }}>
            Explotación de óxidos y sulfuros de cobre con presencia de oro y plata en la Región de Atacama, Chile.
          </p>

          {/* Key Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl mx-auto mb-10 animate-fade-in" style={{ animationDelay: '0.6s' }}>
            <div className="glass-card p-4 rounded-lg">
              <MapPin className="w-5 h-5 text-primary mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">Ubicación</p>
              <p className="font-semibold text-foreground">Copiapó, Atacama</p>
            </div>
            <div className="glass-card p-4 rounded-lg">
              <TrendingUp className="w-5 h-5 text-primary mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">Producción</p>
              <p className="font-semibold text-foreground">1,000 t/mes</p>
              <p className="text-xs text-primary">Potencial: 5,000 t/mes</p>
            </div>
            <div className="glass-card p-4 rounded-lg">
              <Calendar className="w-5 h-5 text-primary mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">Vida Útil</p>
              <p className="font-semibold text-foreground">4-5 años</p>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in" style={{ animationDelay: '0.8s' }}>
            <Button variant="hero" asChild>
              <a href="#contacto">Solicitar Reunión</a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
