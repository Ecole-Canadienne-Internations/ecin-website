import { Calendar } from "lucide-react";
import { motion } from "framer-motion";

const events = [
  { date: "15 Mars 2026", title: "Journée Portes Ouvertes", location: "Campus Bonamoussadi, Douala" },
  { date: "22 Avril 2026", title: "Webinaire : Étudier au Canada", location: "En ligne" },
  { date: "10 Mai 2026", title: "Concours de Bourses ECIN", location: "Campus Yaoundé, Bastos" },
];

const EventsSection = () => {
  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12 gap-4">
          <div>
            <span className="inline-block bg-accent text-accent-foreground text-xs font-bold px-3 py-1 rounded-full mb-3 uppercase tracking-wide">
              Événements
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-foreground">Prochains Événements</h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {events.map((ev, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-card rounded-xl border border-border p-6 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center gap-2 text-primary text-sm font-semibold mb-3">
                <Calendar className="w-4 h-4" />
                {ev.date}
              </div>
              <h3 className="text-lg font-bold text-foreground mb-3">{ev.title}</h3>
              <p className="text-sm text-muted-foreground mb-5">{ev.location}</p>
              <a
                href="https://wa.me/237681263743?text=Bonjour%2C%20je%20souhaite%20réserver%20ma%20place."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block w-full text-center bg-primary text-primary-foreground py-2.5 rounded-lg text-sm font-semibold hover:opacity-90 transition-opacity"
              >
                Réserver ma place
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EventsSection;
