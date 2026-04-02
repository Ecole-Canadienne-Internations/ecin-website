import { MapPin, Phone, Mail } from "lucide-react";
import { Link } from "react-router-dom";
import logo from "@/assets/logo-ecin.png";

const Footer = () => {
  return (
    <footer className="bg-foreground text-background pt-16 pb-8">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          <div className="md:col-span-2">
            <img src={logo} alt="ECIN Logo" className="h-14 mb-4 brightness-0 invert" />
            <p className="text-sm opacity-70 leading-relaxed">
              L'École Canadienne Inter-Nations est un établissement du système éducatif de la province de l'Ontario. Nous sommes une école privée disposant d'une autorisation (Numéro d'identification: BDICE 882009) du ministère de l'éducation de la province de l'Ontario. L'école a l'autorité d'octroyer des crédits pour la délivrance du diplôme d'études secondaires de l'Ontario (DESO).
            </p>
            {/* Social links */}
            <div className="flex items-center gap-4 mt-4">
              <a
                href="https://web.facebook.com/ecolecanadienneinternations/?_rdc=1&_rdr#"
                target="_blank"
                rel="noopener noreferrer"
                className="opacity-70 hover:opacity-100 transition-opacity"
                aria-label="Facebook"
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-4">Programmes</h4>
            <nav className="flex flex-col gap-2">
              <Link to="/cycles/primaire" className="text-sm opacity-70 hover:opacity-100 transition-opacity">Primaire</Link>
              <Link to="/cycles/secondaire" className="text-sm opacity-70 hover:opacity-100 transition-opacity">Secondaire / DÉSO</Link>
              <Link to="/prepas/canada" className="text-sm opacity-70 hover:opacity-100 transition-opacity">Prépa Canada</Link>
              <Link to="/programmes/alc" className="text-sm opacity-70 hover:opacity-100 transition-opacity">ALC Langues</Link>
              <Link to="/alumni" className="text-sm opacity-70 hover:opacity-100 transition-opacity">Alumni</Link>
            </nav>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-4">Contact</h4>
            <div className="flex flex-col gap-3 text-sm opacity-70">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-0.5 text-primary flex-shrink-0" />
                <span>Campus Bonamoussadi, Face Hôtel St James</span>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-0.5 text-primary flex-shrink-0" />
                <span>Yaoundé, Carrefour Bastos</span>
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

        <div className="border-t border-background/10 pt-6 text-center text-sm opacity-50 space-y-1">
          <p>© 2026 École Canadienne Inter-Nations — BSID #882009 Ontario, Canada. Tous droits réservés.</p>
          <p>Built by <a href="https://delmarwebstudios.qzz.io" target="_blank" rel="noopener noreferrer" className="underline hover:opacity-100 transition-opacity">Delmar Web Studios</a></p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
