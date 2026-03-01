import { Calendar } from "lucide-react";
import { motion } from "framer-motion";

const events = [
  { date: "15 Mars 2026", title: "Journée Portes Ouvertes", location: "Campus Yaoundé, Bastos" },
  { date: "22 Avril 2026", title: "Webinaire : Étudier au Canada", location: "En ligne" },
  { date: "10 Mai 2026", title: "Concours de Bourses ECIN", location: "Campus Yaoundé, Bastos" },
];

const EventsSection = () => {
  return (
    <section id="evenements" className="py-16 md:py-24 bg-secondary">
      <div className="container">
        <div className="text-center mb-12">
          <span className="inline-block bg-accent text-accent-foreground text-sm font-semibold px-4 py-1.5 rounded-full mb-4">
            Événements
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-foreground">Prochains Événements</h2>
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
                href="#inscription"
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
