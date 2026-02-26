import { MapPin, Phone, Mail } from "lucide-react";
import logo from "@/assets/logo-ecin.png";

const Footer = () => {
  return (
    <footer id="contact" className="bg-foreground text-background pt-16 pb-8">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-12">
          <div>
            <img src={logo} alt="ECIN Logo" className="h-14 mb-4 brightness-0 invert" />
            <p className="text-sm opacity-70 leading-relaxed">
              Démarrez vos études canadiennes au Cameroun. École privée agréée par l'Ontario (BDICE 882009). Octroi de crédits pour le DESO.
            </p>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-4">Liens Rapides</h4>
            <nav className="flex flex-col gap-2">
              {["Accueil", "À propos", "Événements", "Blog"].map((l) => (
                <a key={l} href={`#${l.toLowerCase().replace(/\s|à\s/g, "")}`} className="text-sm opacity-70 hover:opacity-100 transition-opacity">
                  {l}
                </a>
              ))}
            </nav>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-4">Contact</h4>
            <div className="flex flex-col gap-3 text-sm opacity-70">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-0.5 text-primary flex-shrink-0" />
                <span>Yaoundé, Carrefour Bastos à 300m rue face Moulin de France</span>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-0.5 text-primary flex-shrink-0" />
                <span>Toronto, 959 Coyston Dr, Ontario, Oshawa L1K 3C6</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-primary flex-shrink-0" />
                <span>+237 681 263 743 / +1 (647) 692-6009</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-primary flex-shrink-0" />
                <span>info@ecolecanadienne.ca</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-background/10 pt-6 text-center text-sm opacity-50">
          © 2026 École Canadienne Inter-Nations. Tous droits réservés.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
