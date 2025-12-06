import { FileText, Download, Eye, Scale, FileCheck, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface Document {
  id: string;
  title: string;
  description: string;
  type: 'legal' | 'technical' | 'financial';
  icon: typeof FileText;
}

const documents: Document[] = [
  {
    id: 'inscripcion',
    title: 'Inscripción de Concesiones',
    description: 'Cumbre II 1-10 y Virgen de Andacollo Tres 1-10',
    type: 'legal',
    icon: FileCheck,
  },
  {
    id: 'certificado',
    title: 'Certificados de Dominio',
    description: 'Documentación registral vigente',
    type: 'legal',
    icon: Scale,
  },
  {
    id: 'informe-tecnico',
    title: 'Informe Técnico Geológico',
    description: 'Estudios de mineralización y mapeo',
    type: 'technical',
    icon: FileText,
  },
  {
    id: 'plan-explotacion',
    title: 'Plan de Explotación',
    description: 'Metodología y proyecciones operativas',
    type: 'technical',
    icon: FileText,
  },
  {
    id: 'plan-cierre',
    title: 'Declaración Plan de Cierre',
    description: 'Conforme a Ley N°20.551',
    type: 'legal',
    icon: Lock,
  },
  {
    id: 'resoluciones',
    title: 'Resoluciones SERNAGEOMIN',
    description: 'Autorizaciones aplicables',
    type: 'legal',
    icon: FileCheck,
  },
];

const DocumentosSection = () => {
  const [previewDoc, setPreviewDoc] = useState<Document | null>(null);

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'legal':
        return 'bg-primary/20 text-primary';
      case 'technical':
        return 'bg-accent/20 text-accent';
      case 'financial':
        return 'bg-gold-light/20 text-gold-light';
      default:
        return 'bg-secondary text-secondary-foreground';
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'legal':
        return 'Legal';
      case 'technical':
        return 'Técnico';
      case 'financial':
        return 'Financiero';
      default:
        return type;
    }
  };

  const handleDownload = (doc: Document) => {
    // Simulate download - in production this would trigger actual file download
    const link = document.createElement('a');
    link.href = '#';
    link.download = `${doc.id}.pdf`;
    // For demo purposes, show a toast or alert
    alert(`Descargando: ${doc.title}\n\nNota: En producción, este botón descargará el archivo PDF real.`);
  };

  const handlePreview = (doc: Document) => {
    setPreviewDoc(doc);
  };

  return (
    <section id="documentos" className="py-24 bg-card">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-primary font-medium text-sm tracking-widest uppercase">Recursos</span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold mt-4 mb-6">
            Documentos y Descargas
          </h2>
          <div className="w-20 h-1 bg-gradient-gold mx-auto rounded-full mb-6" />
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Acceda a toda la documentación legal y técnica del proyecto. Los documentos están disponibles para visualización y descarga.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Documents Grid */}
          <div className="grid md:grid-cols-2 gap-4">
            {documents.map((doc) => (
              <div
                key={doc.id}
                className="glass-card rounded-xl p-6 hover:border-primary/50 transition-all group"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-secondary flex items-center justify-center flex-shrink-0 group-hover:bg-gradient-gold transition-all">
                    <doc.icon className="w-6 h-6 text-primary group-hover:text-primary-foreground transition-colors" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className={`text-xs px-2 py-1 rounded-full font-medium ${getTypeColor(doc.type)}`}>
                        {getTypeLabel(doc.type)}
                      </span>
                    </div>
                    <h4 className="font-display font-semibold text-foreground mb-1">{doc.title}</h4>
                    <p className="text-sm text-muted-foreground mb-4">{doc.description}</p>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handlePreview(doc)}
                        className="flex-1"
                      >
                        <Eye className="w-4 h-4 mr-1" />
                        Ver
                      </Button>
                      <Button
                        variant="gold"
                        size="sm"
                        onClick={() => handleDownload(doc)}
                        className="flex-1"
                      >
                        <Download className="w-4 h-4 mr-1" />
                        Descargar
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* NDA Notice */}
          <div className="mt-10 p-6 rounded-xl border border-primary/30 bg-primary/5">
            <div className="flex items-start gap-4">
              <Lock className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
              <div>
                <h4 className="font-semibold text-foreground mb-2">Acuerdo de Confidencialidad (NDA)</h4>
                <p className="text-sm text-muted-foreground">
                  Se recomienda suscribir acuerdos de confidencialidad con potenciales inversores antes de entregar mapas detallados o coordenadas de mayor precisión. Contacte al representante técnico para solicitar acceso a documentación adicional.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Preview Dialog */}
        <Dialog open={!!previewDoc} onOpenChange={() => setPreviewDoc(null)}>
          <DialogContent className="max-w-2xl bg-card border-border">
            <DialogHeader>
              <DialogTitle className="font-display text-xl">{previewDoc?.title}</DialogTitle>
            </DialogHeader>
            <div className="p-6 bg-secondary/50 rounded-lg min-h-[300px] flex items-center justify-center">
              <div className="text-center">
                <FileText className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground mb-4">
                  Vista previa del documento: <span className="text-foreground font-medium">{previewDoc?.title}</span>
                </p>
                <p className="text-sm text-muted-foreground mb-6">
                  {previewDoc?.description}
                </p>
                <Button variant="gold" onClick={() => previewDoc && handleDownload(previewDoc)}>
                  <Download className="w-4 h-4 mr-2" />
                  Descargar PDF
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
};

export default DocumentosSection;
