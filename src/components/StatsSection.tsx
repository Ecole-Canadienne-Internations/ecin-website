import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

const stats = [
  { value: 50, suffix: "+", label: "Étudiants accompagnés" },
  { value: 100, suffix: "%", label: "Réussite au DESO" },
  { value: 8, suffix: "+", label: "Universités partenaires" },
];

function useCountUp(target: number, inView: boolean) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 1500;
    const step = Math.ceil(target / (duration / 16));
    const id = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(id);
      } else {
        setCount(start);
      }
    }, 16);
    return () => clearInterval(id);
  }, [target, inView]);
  return count;
}

const StatCard = ({ value, suffix, label, inView }: { value: number; suffix: string; label: string; inView: boolean }) => {
  const count = useCountUp(value, inView);
  return (
    <div className="flex flex-col items-center gap-2">
      <span className="text-4xl font-extrabold text-primary">{count}{suffix}</span>
      <span className="text-sm text-muted-foreground font-medium">{label}</span>
    </div>
  );
};

const StatsSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="apropos" className="py-16 md:py-24 bg-background">
      <div className="container" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-center justify-center gap-2 mb-12"
        >
          <p className="text-base font-medium text-foreground">
            École agréée par le Ministère de l'Éducation de l'Ontario —{" "}
            <span className="text-primary font-bold">BDICE 882009</span>
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-10">
          {stats.map((s) => (
            <StatCard key={s.label} {...s} inView={inView} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
