import { useState } from 'react';
import { Phone, Mail, MapPin, Calendar, DollarSign, Send, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';

type FormType = 'meeting' | 'offer';

interface FormData {
  nombre: string;
  email: string;
  telefono: string;
  empresa: string;
  mensaje: string;
  // Meeting specific
  fechaPreferida?: string;
  horaPreferida?: string;
  // Offer specific
  montoInversion?: string;
  tipoParticipacion?: string;
}

const ContactoSection = () => {
  const { toast } = useToast();
  const [activeForm, setActiveForm] = useState<FormType | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    nombre: '',
    email: '',
    telefono: '',
    empresa: '',
    mensaje: '',
    fechaPreferida: '',
    horaPreferida: '',
    montoInversion: '',
    tipoParticipacion: '',
  });

  const contactInfo = [
    {
      icon: Phone,
      title: 'Teléfono',
      value: '(+56 9) 61811642',
      href: 'tel:+56961811642',
    },
    {
      icon: MapPin,
      title: 'Oficina',
      value: 'Huérfanos 1160, Of.1006, Santiago',
      href: 'https://maps.google.com/?q=Huerfanos+1160+Santiago+Chile',
    },
    {
      icon: Mail,
      title: 'Representante',
      value: 'MINERÍA DEL SUR CHILE SPA',
      href: '#',
    },
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));

    setIsSubmitting(false);
    setIsSuccess(true);

    toast({
      title: activeForm === 'meeting' ? '¡Reunión Solicitada!' : '¡Oferta Enviada!',
      description: 'Nos pondremos en contacto con usted pronto.',
    });

    // Reset after showing success
    setTimeout(() => {
      setIsSuccess(false);
      setActiveForm(null);
      setFormData({
        nombre: '',
        email: '',
        telefono: '',
        empresa: '',
        mensaje: '',
        fechaPreferida: '',
        horaPreferida: '',
        montoInversion: '',
        tipoParticipacion: '',
      });
    }, 3000);
  };

  const closeDialog = () => {
    setActiveForm(null);
    setIsSuccess(false);
  };

  return (
    <section id="contacto" className="py-24 bg-gradient-dark">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-primary font-medium text-sm tracking-widest uppercase">Inversión</span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold mt-4 mb-6">
            Contacto
          </h2>
          <div className="w-20 h-1 bg-gradient-gold mx-auto rounded-full mb-6" />
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Para coordinar reuniones, recibir propuestas de inversión o solicitar versiones completas de los informes técnicos.
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          {/* Contact Info Cards */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {contactInfo.map((info, index) => (
              <a
                key={index}
                href={info.href}
                target={info.href.startsWith('http') ? '_blank' : undefined}
                rel={info.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="glass-card rounded-xl p-6 text-center hover:border-primary/50 transition-all group"
              >
                <div className="w-14 h-14 rounded-xl bg-gradient-gold flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform shadow-gold">
                  <info.icon className="w-7 h-7 text-primary-foreground" />
                </div>
                <h4 className="font-medium text-muted-foreground text-sm mb-1">{info.title}</h4>
                <p className="font-semibold text-foreground">{info.value}</p>
              </a>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
            <button
              onClick={() => setActiveForm('meeting')}
              className="glass-card rounded-2xl p-8 text-center hover:border-primary transition-all group cursor-pointer"
            >
              <div className="w-16 h-16 rounded-xl bg-gradient-gold flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform shadow-gold">
                <Calendar className="w-8 h-8 text-primary-foreground" />
              </div>
              <h3 className="font-display text-xl font-semibold text-foreground mb-2">
                Solicitar Reunión
              </h3>
              <p className="text-sm text-muted-foreground">
                Agende una reunión con nuestro equipo técnico
              </p>
            </button>

            <button
              onClick={() => setActiveForm('offer')}
              className="glass-card rounded-2xl p-8 text-center hover:border-primary transition-all group cursor-pointer"
            >
              <div className="w-16 h-16 rounded-xl bg-gradient-gold flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform shadow-gold">
                <DollarSign className="w-8 h-8 text-primary-foreground" />
              </div>
              <h3 className="font-display text-xl font-semibold text-foreground mb-2">
                Presentar Oferta
              </h3>
              <p className="text-sm text-muted-foreground">
                Envíe su propuesta de inversión
              </p>
            </button>
          </div>

          {/* Legal Recommendations */}
          <div className="mt-12 glass-card rounded-2xl p-8">
            <h3 className="font-display text-xl font-semibold text-foreground mb-4 text-center">
              Recomendaciones Jurídicas
            </h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-8 h-8 rounded-full bg-primary/20 text-primary flex items-center justify-center mx-auto mb-3 font-bold">1</div>
                <p className="text-sm text-muted-foreground">
                  Formalizar contratos de participación (profit-sharing) con cláusulas claras sobre reparto de utilidades y auditoría financiera.
                </p>
              </div>
              <div className="text-center">
                <div className="w-8 h-8 rounded-full bg-primary/20 text-primary flex items-center justify-center mx-auto mb-3 font-bold">2</div>
                <p className="text-sm text-muted-foreground">
                  Suscribir acuerdos de confidencialidad (NDA) antes de entregar mapas detallados o coordenadas de mayor precisión.
                </p>
              </div>
              <div className="text-center">
                <div className="w-8 h-8 rounded-full bg-primary/20 text-primary flex items-center justify-center mx-auto mb-3 font-bold">3</div>
                <p className="text-sm text-muted-foreground">
                  Incluir cláusulas de garantía ambiental y planes de cumplimiento de la Ley de Cierre.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Meeting Request Dialog */}
        <Dialog open={activeForm === 'meeting'} onOpenChange={closeDialog}>
          <DialogContent className="max-w-lg bg-card border-border">
            <DialogHeader>
              <DialogTitle className="font-display text-2xl flex items-center gap-3">
                <Calendar className="w-6 h-6 text-primary" />
                Solicitar Reunión
              </DialogTitle>
              <DialogDescription className="text-muted-foreground">
                Complete el formulario para agendar una reunión con nuestro equipo.
              </DialogDescription>
            </DialogHeader>

            {isSuccess ? (
              <div className="py-12 text-center">
                <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-6 animate-scale-in">
                  <CheckCircle className="w-10 h-10 text-primary" />
                </div>
                <h3 className="font-display text-xl font-semibold text-foreground mb-2">
                  ¡Solicitud Enviada!
                </h3>
                <p className="text-muted-foreground">
                  Nos pondremos en contacto con usted pronto para confirmar la reunión.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">Nombre *</label>
                    <Input
                      name="nombre"
                      value={formData.nombre}
                      onChange={handleInputChange}
                      required
                      placeholder="Su nombre completo"
                      className="bg-secondary border-border"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">Teléfono *</label>
                    <Input
                      name="telefono"
                      value={formData.telefono}
                      onChange={handleInputChange}
                      required
                      placeholder="+56 9 XXXX XXXX"
                      className="bg-secondary border-border"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">Email *</label>
                  <Input
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    placeholder="correo@empresa.com"
                    className="bg-secondary border-border"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">Empresa</label>
                  <Input
                    name="empresa"
                    value={formData.empresa}
                    onChange={handleInputChange}
                    placeholder="Nombre de su empresa"
                    className="bg-secondary border-border"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">Fecha Preferida</label>
                    <Input
                      name="fechaPreferida"
                      type="date"
                      value={formData.fechaPreferida}
                      onChange={handleInputChange}
                      className="bg-secondary border-border"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">Hora Preferida</label>
                    <Input
                      name="horaPreferida"
                      type="time"
                      value={formData.horaPreferida}
                      onChange={handleInputChange}
                      className="bg-secondary border-border"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">Mensaje</label>
                  <Textarea
                    name="mensaje"
                    value={formData.mensaje}
                    onChange={handleInputChange}
                    placeholder="Indique los temas que desea tratar..."
                    rows={3}
                    className="bg-secondary border-border resize-none"
                  />
                </div>

                <Button
                  type="submit"
                  variant="gold"
                  className="w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Enviando...
                    </span>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      Solicitar Reunión
                    </>
                  )}
                </Button>
              </form>
            )}
          </DialogContent>
        </Dialog>

        {/* Investment Offer Dialog */}
        <Dialog open={activeForm === 'offer'} onOpenChange={closeDialog}>
          <DialogContent className="max-w-lg bg-card border-border">
            <DialogHeader>
              <DialogTitle className="font-display text-2xl flex items-center gap-3">
                <DollarSign className="w-6 h-6 text-primary" />
                Presentar Oferta de Inversión
              </DialogTitle>
              <DialogDescription className="text-muted-foreground">
                Complete el formulario para enviar su propuesta de inversión.
              </DialogDescription>
            </DialogHeader>

            {isSuccess ? (
              <div className="py-12 text-center">
                <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-6 animate-scale-in">
                  <CheckCircle className="w-10 h-10 text-primary" />
                </div>
                <h3 className="font-display text-xl font-semibold text-foreground mb-2">
                  ¡Oferta Recibida!
                </h3>
                <p className="text-muted-foreground">
                  Analizaremos su propuesta y nos comunicaremos con usted a la brevedad.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">Nombre *</label>
                    <Input
                      name="nombre"
                      value={formData.nombre}
                      onChange={handleInputChange}
                      required
                      placeholder="Su nombre completo"
                      className="bg-secondary border-border"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">Teléfono *</label>
                    <Input
                      name="telefono"
                      value={formData.telefono}
                      onChange={handleInputChange}
                      required
                      placeholder="+56 9 XXXX XXXX"
                      className="bg-secondary border-border"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">Email *</label>
                  <Input
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    placeholder="correo@empresa.com"
                    className="bg-secondary border-border"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">Empresa *</label>
                  <Input
                    name="empresa"
                    value={formData.empresa}
                    onChange={handleInputChange}
                    required
                    placeholder="Nombre de su empresa"
                    className="bg-secondary border-border"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">Monto de Inversión (USD)</label>
                    <Input
                      name="montoInversion"
                      value={formData.montoInversion}
                      onChange={handleInputChange}
                      placeholder="Ej: 500,000"
                      className="bg-secondary border-border"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">Tipo de Participación</label>
                    <select
                      name="tipoParticipacion"
                      value={formData.tipoParticipacion}
                      onChange={handleInputChange}
                      className="w-full h-10 px-3 rounded-md bg-secondary border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                    >
                      <option value="">Seleccionar...</option>
                      <option value="profit-share">Profit-Share</option>
                      <option value="equity">Participación Accionaria</option>
                      <option value="arriendo">Arriendo Operacional</option>
                      <option value="mixto">Modelo Mixto</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">Detalles de la Propuesta *</label>
                  <Textarea
                    name="mensaje"
                    value={formData.mensaje}
                    onChange={handleInputChange}
                    required
                    placeholder="Describa su propuesta de inversión, condiciones y expectativas..."
                    rows={4}
                    className="bg-secondary border-border resize-none"
                  />
                </div>

                <Button
                  type="submit"
                  variant="gold"
                  className="w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Enviando...
                    </span>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      Enviar Propuesta
                    </>
                  )}
                </Button>
              </form>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
};

export default ContactoSection;
