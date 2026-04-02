import { Facebook, Instagram, Linkedin, Youtube, Mail, Phone } from "lucide-react";

const TopBar = () => {
  return (
    <div className="bg-primary text-primary-foreground h-auto md:h-9 flex items-center z-[60] relative py-1.5 md:py-0">
      <div className="container flex flex-col md:flex-row items-center justify-between text-xs gap-1.5 md:gap-0">
        <div className="flex items-center gap-3 flex-wrap justify-center">
          <a href="https://web.facebook.com/ecolecanadienneinternations/" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="opacity-80 hover:opacity-100 transition-opacity">
            <Facebook className="w-3.5 h-3.5" />
          </a>
          <a href="#" aria-label="Instagram" className="opacity-80 hover:opacity-100 transition-opacity">
            <Instagram className="w-3.5 h-3.5" />
          </a>
          <a href="#" aria-label="LinkedIn" className="opacity-80 hover:opacity-100 transition-opacity">
            <Linkedin className="w-3.5 h-3.5" />
          </a>
          <a href="#" aria-label="YouTube" className="opacity-80 hover:opacity-100 transition-opacity">
            <Youtube className="w-3.5 h-3.5" />
          </a>
        </div>
        <div className="flex items-center gap-3 flex-wrap justify-center text-[10px] md:text-xs opacity-90">
          <a href="mailto:info@ecolecanadienne.ca" className="flex items-center gap-1 hover:opacity-100 transition-opacity">
            <Mail className="w-3 h-3" />
            info@ecolecanadienne.ca
          </a>
          <span className="hidden md:inline">|</span>
          <a href="tel:+2376812637​43" className="flex items-center gap-1 hover:opacity-100 transition-opacity">
            <Phone className="w-3 h-3" />
            +237 681 263 743
          </a>
          <span>/</span>
          <a href="tel:+16476926009" className="hover:opacity-100 transition-opacity">+1(647)692-6009</a>
          <span className="hidden md:inline">|</span>
          <span className="hidden md:inline font-medium">École inspectée — Par le Ministère de l'éducation de l'Ontario</span>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
