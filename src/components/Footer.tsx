import { Mountain } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-card border-t border-border py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-gold flex items-center justify-center shadow-gold">
              <Mountain className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <h3 className="font-display font-semibold text-foreground">Cumbres de Cortadera</h3>
              <p className="text-xs text-muted-foreground">Proyecto Minero</p>
            </div>
          </div>

          {/* Copyright */}
          <div className="text-center">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} Sociedad Minera Cumbres de Andacollo SpA
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Todos los derechos reservados
            </p>
          </div>

          {/* Legal */}
          <div className="text-right">
            <p className="text-sm text-muted-foreground">
              MINERÍA DEL SUR CHILE SPA
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Huérfanos 1160, Of.1006, Santiago
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
