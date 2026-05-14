import { AnimatePresence, motion } from "framer-motion";
import { X, Calendar, ArrowRight } from "lucide-react";
import { openInscription } from "@/lib/inscription";

export interface Article {
  id?: string;
  title: string;
  date?: string;
  tag?: string;
  excerpt?: string;
  content?: string;
  image?: string;
}

interface Props {
  article: Article | null;
  onClose: () => void;
}

const ArticleModal = ({ article, onClose }: Props) => {
  return (
    <AnimatePresence>
      {article && (
        <motion.div
          className="fixed inset-0 z-[70] flex items-center justify-center bg-foreground/50 px-4 py-6 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.article
            initial={{ opacity: 0, y: 30, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.97 }}
            transition={{ type: "spring", stiffness: 240, damping: 24 }}
            className="relative flex max-h-[90vh] w-full max-w-3xl flex-col overflow-hidden rounded-3xl bg-background shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={onClose}
              className="absolute right-4 top-4 z-10 rounded-full bg-background/80 p-2 text-foreground shadow hover:bg-background"
              aria-label="Fermer"
            >
              <X className="h-4 w-4" />
            </button>

            {article.image && (
              <div className="aspect-video w-full bg-background">
                <img src={article.image} alt={article.title} className="h-full w-full object-contain" />
              </div>
            )}

            <div className="overflow-y-auto p-6 md:p-8">
              <div className="flex items-center gap-3 mb-3">
                {article.tag && (
                  <span className="text-xs font-bold text-primary bg-accent px-2.5 py-1 rounded">{article.tag}</span>
                )}
                {article.date && (
                  <span className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Calendar className="h-3 w-3" />
                    {article.date}
                  </span>
                )}
              </div>

              <h2 className="text-2xl md:text-3xl font-extrabold text-foreground mb-4 leading-tight">
                {article.title}
              </h2>

              {article.excerpt && (
                <p className="text-base text-muted-foreground italic mb-4">{article.excerpt}</p>
              )}

              {article.content ? (
                <div className="prose prose-sm max-w-none whitespace-pre-line text-foreground/90 leading-relaxed">
                  {article.content}
                </div>
              ) : (
                <p className="text-foreground/80 leading-relaxed">
                  Le contenu complet de cet article sera bientôt disponible. En attendant, contactez-nous pour réserver votre place.
                </p>
              )}

              <div className="mt-8 flex flex-col sm:flex-row gap-3">
                <button
                  type="button"
                  onClick={() => openInscription({ flow: "general", context: `Réservation: ${article.title}` })}
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-bold text-primary-foreground hover:opacity-90"
                >
                  Réserver <ArrowRight className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="rounded-full border border-border px-6 py-3 text-sm font-bold text-foreground"
                >
                  Fermer
                </button>
              </div>
            </div>
          </motion.article>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ArticleModal;
