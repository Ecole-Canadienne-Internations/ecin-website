import { Facebook, Instagram, Linkedin, Youtube } from "lucide-react";

const TopBar = () => {
  return (
    <div className="bg-primary text-primary-foreground h-9 flex items-center z-[60] relative">
      <div className="container flex items-center justify-between text-xs">
        <span className="font-medium opacity-90">BSID #882009 — Ontario, Canada</span>
        <div className="flex items-center gap-3">
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
      </div>
    </div>
  );
};

export default TopBar;
