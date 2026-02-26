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
    <section id="inscription" className="py-16 md:py-24 bg-primary text-primary-foreground">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="container max-w-3xl text-center"
      >
        <Download className="w-10 h-10 mx-auto mb-4 opacity-80" />
        <h2 className="text-3xl md:text-4xl font-extrabold mb-3">Guide Gratuit</h2>
        <p className="text-base opacity-90 mb-8">
          Téléchargez : <strong>« 5 étapes pour envoyer votre enfant étudier au Canada depuis le Cameroun »</strong>
        </p>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-4 gap-3 max-w-2xl mx-auto">
          <input
            type="text"
            placeholder="Nom complet"
            required
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="rounded-lg px-4 py-3 bg-primary-foreground/15 border border-primary-foreground/25 placeholder:text-primary-foreground/60 text-primary-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary-foreground/40"
          />
          <input
            type="tel"
            placeholder="N° WhatsApp"
            required
            value={form.whatsapp}
            onChange={(e) => setForm({ ...form, whatsapp: e.target.value })}
            className="rounded-lg px-4 py-3 bg-primary-foreground/15 border border-primary-foreground/25 placeholder:text-primary-foreground/60 text-primary-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary-foreground/40"
          />
          <input
            type="email"
            placeholder="Email"
            required
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="rounded-lg px-4 py-3 bg-primary-foreground/15 border border-primary-foreground/25 placeholder:text-primary-foreground/60 text-primary-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary-foreground/40"
          />
          <button
            type="submit"
            className="rounded-lg px-6 py-3 bg-background text-foreground font-semibold text-sm hover:bg-background/90 transition-colors"
          >
            Recevoir
          </button>
        </form>
      </motion.div>
    </section>
  );
};

export default LeadMagnet;
