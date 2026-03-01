import { useState } from "react";
import { Download } from "lucide-react";
import { motion } from "framer-motion";

const LeadMagnet = () => {
  const [form, setForm] = useState({ name: "", whatsapp: "", email: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const msg = encodeURIComponent(
      `Bonjour, je souhaite recevoir le guide gratuit.\nNom: ${form.name}\nEmail: ${form.email}`
    );
    window.open(`https://wa.me/237681263743?text=${msg}`, "_blank");
  };

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
          <form onSubmit={handleSubmit} className="space-y-4 text-left">
            <input
              type="text"
              placeholder="Votre nom complet"
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
            />
            <input
              type="tel"
              placeholder="Numéro WhatsApp"
              required
              value={form.whatsapp}
              onChange={(e) => setForm({ ...form, whatsapp: e.target.value })}
              className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
            />
            <input
              type="email"
              placeholder="Adresse email"
              required
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
            />
            <button
              type="submit"
              className="w-full py-3 rounded-lg bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-colors"
            >
              Recevoir le guide gratuitement
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  );
};

export default LeadMagnet;