import { useEffect, useState } from "react";
import { X } from "lucide-react";

const ExitIntentPopup = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (e.clientY < 5 && !sessionStorage.getItem("exitShown")) {
        setShow(true);
        sessionStorage.setItem("exitShown", "1");
      }
    };
    document.addEventListener("mouseleave", handler);
    return () => document.removeEventListener("mouseleave", handler);
  }, []);

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-[60] bg-foreground/50 flex items-center justify-center p-4" onClick={() => setShow(false)}>
      <div
        className="bg-background rounded-2xl max-w-md w-full p-8 relative text-center"
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={() => setShow(false)} className="absolute top-4 right-4 text-muted-foreground hover:text-foreground">
          <X className="w-5 h-5" />
        </button>
        <h3 className="text-2xl font-extrabold text-foreground mb-3">Ne partez pas !</h3>
        <p className="text-muted-foreground text-sm mb-6">
          Recevez par WhatsApp les dates des prochaines bourses d'études et concours.
        </p>
        <a
          href="https://wa.me/16476926009?text=Bonjour%2C%20je%20souhaite%20recevoir%20les%20infos%20sur%20les%20bourses."
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-primary text-primary-foreground px-6 py-3 rounded-lg font-semibold text-sm hover:opacity-90 transition-opacity"
        >
          Recevoir les infos par WhatsApp
        </a>
      </div>
    </div>
  );
};

export default ExitIntentPopup;
