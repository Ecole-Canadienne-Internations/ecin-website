import { MessageCircle } from "lucide-react";

const WhatsAppButton = () => {
  return (
    <a
      href="https://wa.me/16476926009?text=Bonjour%2C%20je%20souhaite%20obtenir%20des%20renseignements."
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-[#25D366] text-white pl-4 pr-5 py-3 rounded-full shadow-lg hover:scale-105 transition-transform"
      aria-label="Pour tout renseignement contactez-nous sur WhatsApp"
    >
      <MessageCircle className="w-5 h-5" />
      <span className="text-sm font-semibold hidden sm:inline">
        Pour tout renseignement contactez-nous
      </span>
    </a>
  );
};

export default WhatsAppButton;
