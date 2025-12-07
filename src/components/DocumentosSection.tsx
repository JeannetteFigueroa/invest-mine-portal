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
  file: string;         // ruta del archivo
  format: 'pdf';
}

const documents: Document[] = [
  {
    id: 'informe_ejecutivo',
    title: 'Informe Ejecutivo',
    description: 'Informe ejecutivo que resume la geología, estructuras mineralizadas y evaluación técnica del Proyecto Cumbres de Cortadera',
    type: 'technical',
    icon: FileText,
    file: '/documents/informe_ejecutivo.pdf',
    format: 'pdf',
  },
  {
    id: 'flota_camiones',
    title: 'Flota de Camiones y Equipos',
    description: 'Lista de flota de camiones y equipos',
    type: 'technical',
    icon: FileText,
    file: '/documents/flota_camiones.pdf',
    format: 'pdf',
  },
  {
    id: 'proyecto_explotacion',
    title: 'Proyecto de Explotación',
    description: 'Informe detallado del proyecto de explotación minera',
    type: 'technical',
    icon: FileText,
    file: '/documents/proyecto_explotacion.pdf',
    format: 'pdf',
  },
  {
    id: 'plan_cierre',
    title: 'Formulario del Plan de Cierre',
    description: 'Formulario para solicitar el plan de cierre del proyecto',
    type: 'technical',
    icon: FileText,
    file: '/documents/plan_cierre.pdf',
    format: 'pdf',
  },
];

const DocumentosSection = () => {
  const [previewDoc, setPreviewDoc] = useState<Document | null>(null);

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'technical':
        return 'bg-accent/20 text-accent';
      default:
        return 'bg-secondary text-secondary-foreground';
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'technical':
        return 'Técnico';
      default:
        return type;
    }
  };

  const handleDownload = (doc: Document) => {
    if (!doc.file) return;

    const link = document.createElement('a');
    link.href = doc.file;
    link.download = doc.file.split('/').pop()!; // mantiene la extensión correcta
    link.click();
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
          <DialogContent className="max-w-3xl bg-card border-border">
            <DialogHeader>
              <DialogTitle className="font-display text-xl">
                {previewDoc?.title}
              </DialogTitle>
            </DialogHeader>

            {/* Vista previa real SOLO PDF */}
            {previewDoc && (
              <div className="w-full h-[65vh] mt-4 border rounded-lg overflow-hidden">

                {/* PDF */}
                {previewDoc.format === "pdf" && (
                  <iframe
                    src={previewDoc.file}
                    className="w-full h-full"
                  />
                )}

                {/* Cualquier otro formato (mensaje de error) */}
                {previewDoc.format !== "pdf" && (
                  <div className="w-full h-full flex items-center justify-center">
                    <p className="text-muted-foreground">
                      Solo se admite vista previa de archivos PDF.
                    </p>
                  </div>
                )}

              </div>
            )}

            {/* Botón Descargar */}
            <div className="flex justify-end mt-4">
              <Button variant="gold" onClick={() => previewDoc && handleDownload(previewDoc)}>
                <Download className="w-4 h-4 mr-2" />
                Descargar
              </Button>
            </div>
          </DialogContent>
        </Dialog>

      </div>
    </section>
  );
};

export default DocumentosSection;
