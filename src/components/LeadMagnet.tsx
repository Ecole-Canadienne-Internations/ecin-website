import { Download } from "lucide-react";
import { motion } from "framer-motion";

const LeadMagnet = () => {
  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-secondary rounded-2xl p-8 md:p-12 text-center"
        >
          <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
            <Download className="w-7 h-7 text-primary" />
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
            Téléchargez le Guide Gratuit
          </h2>
          <p className="text-muted-foreground mb-8">
            5 étapes pour envoyer votre enfant étudier au Canada depuis le Cameroun.
          </p>
          <a
            href="https://wa.me/237681263743?text=Bonjour%2C%20je%20souhaite%20recevoir%20le%20guide%20gratuit."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-primary text-primary-foreground px-7 py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity"
          >
            Recevoir le guide gratuitement
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default LeadMagnet;
