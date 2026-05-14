import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Calendar, ArrowLeft, ArrowRight } from "lucide-react";
import PageLayout from "@/components/PageLayout";
import { supabase } from "@/integrations/supabase/client";
import { openInscription } from "@/lib/inscription";

const BlogArticle = () => {
  const { id } = useParams();

  const { data: article, isLoading } = useQuery({
    queryKey: ["blog-article", id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("blog_articles")
        .select("*")
        .eq("id", id!)
        .maybeSingle();
      if (error) throw error;
      return data;
    },
    enabled: !!id,
  });

  return (
    <PageLayout>
      <article className="py-10 md:py-16 bg-background">
        <div className="container max-w-3xl">
          <Link to="/blog" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-6">
            <ArrowLeft className="h-4 w-4" /> Retour au blog
          </Link>

          {isLoading ? (
            <div className="animate-pulse space-y-4">
              <div className="h-64 bg-background rounded-xl" />
              <div className="h-10 bg-background rounded w-3/4" />
              <div className="h-4 bg-background rounded w-1/4" />
            </div>
          ) : !article ? (
            <p className="text-muted-foreground">Article introuvable.</p>
          ) : (
            <>
              {article.image_url && (
                <div className="w-full bg-background rounded-xl overflow-hidden mb-8">
                  <img src={article.image_url} alt={article.title} className="w-full h-auto object-contain" />
                </div>
              )}

              <h1 className="text-3xl md:text-5xl font-extrabold text-foreground leading-tight mb-4">
                {article.title}
              </h1>

              <div className="flex items-center gap-3 text-sm text-muted-foreground mb-8">
                {article.tag && (
                  <span className="text-xs font-bold text-primary bg-accent px-2.5 py-1 rounded">{article.tag}</span>
                )}
                {(article.published_at || article.created_at) && (
                  <span className="flex items-center gap-1">
                    <Calendar className="h-3.5 w-3.5" />
                    {new Date(article.published_at || article.created_at!).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" })}
                  </span>
                )}
              </div>

              {article.excerpt && (
                <p className="text-lg text-muted-foreground italic mb-6 border-l-4 border-primary pl-4">
                  {article.excerpt}
                </p>
              )}

              {article.content ? (
                <div className="prose prose-lg max-w-none whitespace-pre-line text-foreground/90 leading-relaxed">
                  {article.content}
                </div>
              ) : (
                <p className="text-foreground/80 leading-relaxed">Contenu à venir.</p>
              )}

              <div className="mt-12 pt-8 border-t border-border">
                <a
  href="https://forms.gle/FZn4s1YvmnQVpLX5A" // Remplace par ton lien
  onClick={() => openInscription({ flow: "general", context: `Réservation: ${article.title}` })}
  className="inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-bold text-primary-foreground hover:opacity-90"
>
  Réserver <ArrowRight className="h-4 w-4" />
</a>
              </div>
            </>
          )}
        </div>
      </article>
    </PageLayout>
  );
};

export default BlogArticle;
