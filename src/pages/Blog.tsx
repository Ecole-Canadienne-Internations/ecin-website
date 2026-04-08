import PageLayout from "@/components/PageLayout";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

const Blog = () => {
  const { data: articles, isLoading } = useQuery({
    queryKey: ["blog-all"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("blog_articles")
        .select("*")
        .eq("is_published", true)
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data || [];
    },
  });

  return (
    <PageLayout>
      <section className="py-16 md:py-24 bg-background">
        <div className="container max-w-5xl">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-3xl md:text-5xl font-extrabold text-foreground mb-4">Actualités & Blog</h1>
            <p className="text-muted-foreground text-lg mb-12">Tous les articles, événements et nouvelles de l'ECIN.</p>
          </motion.div>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="bg-card border border-border rounded-xl p-6 animate-pulse h-48" />
              ))}
            </div>
          ) : articles && articles.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {articles.map((article) => (
                <motion.article
                  key={article.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="group bg-card rounded-xl border border-border overflow-hidden hover:shadow-lg transition-shadow"
                >
                  {article.image_url && (
                    <img src={article.image_url} alt={article.title} loading="lazy" className="w-full h-48 object-cover" />
                  )}
                  <div className="p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-xs font-bold text-primary bg-accent px-2.5 py-1 rounded">{article.tag || "Actualité"}</span>
                      <span className="text-xs text-muted-foreground">
                        {new Date(article.published_at || article.created_at || "").toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" })}
                      </span>
                    </div>
                    <h2 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">{article.title}</h2>
                    {article.excerpt && <p className="text-sm text-muted-foreground leading-relaxed">{article.excerpt}</p>}
                  </div>
                </motion.article>
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground text-center py-16">Aucun article publié pour le moment. Restez connectés !</p>
          )}
        </div>
      </section>
    </PageLayout>
  );
};

export default Blog;
