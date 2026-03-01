import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "Quelle est la différence entre le Bac Camerounais et le BAC Canadien (DÉSO) ?",
    answer:
      "Le Bac Camerounais nécessite souvent des procédures d'équivalence et des mises à niveau. Le BAC Canadien (DÉSO) est le diplôme officiel de l'Ontario : il est reconnu nativement par toutes les universités canadiennes. Aucune équivalence n'est requise, l'élève entre directement en 1ère année.",
  },
  {
    question: "Mon enfant doit-il voyager pour obtenir ce diplôme ?",
    answer:
      "Non. Grâce à notre plateforme virtuelle inspectée par le ministère de l'Éducation de l'Ontario, l'élève suit son cursus depuis Yaoundé et obtient le même diplôme qu'un élève à Toronto.",
  },
  {
    question: "Est-ce que ce diplôme facilite l'obtention du visa ?",
    answer:
      "Oui. Avoir un diplôme canadien et une lettre d'acceptation d'une université partenaire prouve votre sérieux académique aux services d'immigration (IRCC) et renforce votre dossier.",
  },
  {
    question: "J'ai d'autres questions spécifiques sur les frais ou l'inscription, comment faire ?",
    answer:
      "Chaque projet d'études est unique. Pour obtenir des réponses personnalisées et un accompagnement sur mesure, nous vous invitons à prendre rendez-vous avec l'un de nos conseillers pédagogiques. Cliquez sur le bouton ci-dessous pour choisir votre créneau.",
  },
];

const FAQSection = () => {
  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-extrabold text-foreground mb-3">
            FAQ (Foire Aux Questions)
          </h2>
          <p className="text-muted-foreground">
            Les réponses aux questions les plus fréquentes des parents.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, i) => (
              <AccordionItem key={i} value={`item-${i}`} className="border-border">
                <AccordionTrigger className="text-left text-foreground hover:no-underline py-5 text-base">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-sm leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>

        {/* CTA Block */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 text-center bg-secondary rounded-2xl p-8 md:p-10"
        >
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
            <MessageCircle className="w-6 h-6 text-primary" />
          </div>
          <h3 className="text-xl font-bold text-foreground mb-2">
            Vous avez d'autres questions ?
          </h3>
          <p className="text-muted-foreground text-sm mb-6 max-w-md mx-auto">
            Prenez rendez-vous avec un conseiller pédagogique pour un accompagnement personnalisé.
          </p>
          <a
            href="https://wa.me/237681263743?text=Bonjour%2C%20je%20souhaite%20prendre%20rendez-vous%20avec%20un%20conseiller."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-7 py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity"
          >
            Prendre rendez-vous
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQSection;
