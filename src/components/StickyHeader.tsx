import { useState } from "react";
import { Phone, Menu, X } from "lucide-react";
import logo from "@/assets/logo-ecin.png";

const navLinks = [
  { label: "Accueil", href: "#accueil" },
  { label: "À propos", href: "#apropos" },
  { label: "Événements", href: "#evenements" },
  { label: "Blog", href: "#blog" },
  { label: "Contact", href: "#contact" },
];

const StickyHeader = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="container flex items-center justify-between h-16 md:h-20">
        <a href="#accueil" className="flex-shrink-0">
          <img src={logo} alt="École Canadienne Inter-Nations" className="h-12 md:h-14 w-auto" />
        </a>

        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-4">
          <a href="tel:+237681263743" className="flex items-center gap-2 text-sm font-medium text-foreground/80 hover:text-primary transition-colors">
            <Phone className="w-4 h-4" />
            +237 681 263 743
          </a>
          <a
            href="#inscription"
            className="bg-primary text-primary-foreground px-5 py-2.5 rounded-full text-sm font-semibold hover:opacity-90 transition-opacity"
          >
            S'inscrire
          </a>
        </div>

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden p-2 text-foreground"
          aria-label="Menu"
        >
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {mobileOpen && (
        <div className="md:hidden bg-background border-t border-border pb-4">
          <nav className="container flex flex-col gap-3 pt-3">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="text-sm font-medium text-foreground/80 hover:text-primary py-2"
              >
                {link.label}
              </a>
            ))}
            <a href="tel:+237681263743" className="flex items-center gap-2 text-sm font-medium text-foreground/80 py-2">
              <Phone className="w-4 h-4" />
              +237 681 263 743
            </a>
            <a
              href="#inscription"
              className="bg-primary text-primary-foreground px-5 py-2.5 rounded-full text-sm font-semibold text-center hover:opacity-90"
            >
              S'inscrire
            </a>
          </nav>
        </div>
      )}
    </header>
  );
};

export default StickyHeader;
