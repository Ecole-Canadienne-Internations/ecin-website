import PageLayout from "@/components/PageLayout";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Blog = () => {
  return (
    <PageLayout>
      <section className="py-16 md:py-24 bg-background">
        <div className="container max-w-4xl">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-3xl md:text-5xl font-extrabold text-foreground mb-4">Actualités & Blog</h1>
            <p className="text-muted-foreground text-lg mb-12">Tous les articles, événements et nouvelles de l'ECIN.</p>
          </motion.div>
          <p className="text-muted-foreground text-center py-16">Les articles seront bientôt disponibles. Restez connectés !</p>
        </div>
      </section>
    </PageLayout>
  );
};

export default Blog;
