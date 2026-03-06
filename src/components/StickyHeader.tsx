import { useState, useRef, useEffect } from "react";
import { Phone, Menu, X, ChevronDown } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import logo from "@/assets/logo-ecin.png";
import LanguageToggle from "@/components/LanguageToggle";

interface SubItem {
  label: string;
  href: string;
  desc: string;
}

interface NavItem {
  label: string;
  href?: string;
  children?: SubItem[];
}

const navItems: NavItem[] = [
  {
    label: "Nos Cycles",
    children: [
      { label: "Primaire", href: "/cycles/primaire", desc: "De la maternelle au CM2" },
      { label: "Élémentaire (6e–4e)", href: "/cycles/elementaire", desc: "Cycle intermédiaire bilingue" },
      { label: "Secondaire / DÉSO", href: "/cycles/secondaire", desc: "Diplôme canadien de l'Ontario" },
    ],
  },
  {
    label: "Nos Prépas",
    children: [
      { label: "Prépa Canada", href: "/prepas/canada", desc: "Post-BAC vers les universités canadiennes" },
      { label: "Prépa France & Angleterre", href: "/prepas/france-angleterre", desc: "Accès aux grandes universités" },
      { label: "Sport-Études", href: "/prepas/sport-etudes", desc: "Excellence sportive & académique" },
    ],
  },
  {
    label: "Programmes Pro",
    children: [
      { label: "ALC — Langues", href: "/programmes/alc", desc: "Anglais, Français, certifications" },
      { label: "ITA — Informatique", href: "/programmes/ita", desc: "Certifications IT internationales" },
    ],
  },
  { label: "Alumni", href: "/alumni" },
  { label: "Admissions", href: "/admissions" },
];

const StickyHeader = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>();
  const location = useLocation();

  useEffect(() => {
    setMobileOpen(false);
    setActiveMenu(null);
  }, [location]);

  const handleMouseEnter = (label: string) => {
    clearTimeout(timeoutRef.current);
    setActiveMenu(label);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => setActiveMenu(null), 150);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="container flex items-center justify-between h-16 md:h-20">
        <Link to="/" className="flex-shrink-0">
          <img src={logo} alt="École Canadienne Inter-Nations" className="h-12 md:h-14 w-auto" />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-1">
          {navItems.map((item) => (
            <div
              key={item.label}
              className="relative"
              onMouseEnter={() => item.children && handleMouseEnter(item.label)}
              onMouseLeave={handleMouseLeave}
            >
              {item.href ? (
                <Link
                  to={item.href}
                  className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-foreground/80 hover:text-primary transition-colors rounded-md"
                >
                  {item.label}
                </Link>
              ) : (
                <button className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-foreground/80 hover:text-primary transition-colors rounded-md">
                  {item.label}
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform ${activeMenu === item.label ? "rotate-180" : ""}`} />
                </button>
              )}

              {item.children && activeMenu === item.label && (
                <div
                  className="absolute top-full left-0 mt-1 w-72 bg-background border border-border rounded-xl shadow-xl p-2 animate-in fade-in slide-in-from-top-2 duration-200"
                  onMouseEnter={() => handleMouseEnter(item.label)}
                  onMouseLeave={handleMouseLeave}
                >
                  {item.children.map((child) => (
                    <Link
                      key={child.href}
                      to={child.href}
                      className="flex flex-col gap-0.5 px-4 py-3 rounded-lg hover:bg-secondary transition-colors"
                    >
                      <span className="text-sm font-semibold text-foreground">{child.label}</span>
                      <span className="text-xs text-muted-foreground">{child.desc}</span>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-3">
          <LanguageToggle />
          <a href="tel:+237681263743" className="flex items-center gap-2 text-sm font-medium text-foreground/80 hover:text-primary transition-colors">
            <Phone className="w-4 h-4" />
            +237 681 263 743
          </a>
          <a
            href="https://wa.me/237681263743?text=Bonjour%2C%20je%20souhaite%20démarrer%20mon%20inscription."
            target="_blank"
            rel="noopener noreferrer"
            className="bg-primary text-primary-foreground px-5 py-2.5 rounded-full text-sm font-semibold hover:opacity-90 transition-opacity"
          >
            S'inscrire
          </a>
        </div>

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="lg:hidden p-2 text-foreground"
          aria-label="Menu"
        >
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {mobileOpen && (
        <div className="lg:hidden bg-background border-t border-border pb-4 max-h-[80vh] overflow-y-auto">
          <nav className="container flex flex-col gap-1 pt-3">
            {navItems.map((item) => (
              <div key={item.label}>
                {item.href ? (
                  <Link
                    to={item.href}
                    onClick={() => setMobileOpen(false)}
                    className="block text-sm font-medium text-foreground/80 hover:text-primary py-3 px-2"
                  >
                    {item.label}
                  </Link>
                ) : (
                  <>
                    <button
                      onClick={() => setMobileExpanded(mobileExpanded === item.label ? null : item.label)}
                      className="flex items-center justify-between w-full text-sm font-medium text-foreground/80 hover:text-primary py-3 px-2"
                    >
                      {item.label}
                      <ChevronDown className={`w-4 h-4 transition-transform ${mobileExpanded === item.label ? "rotate-180" : ""}`} />
                    </button>
                    {mobileExpanded === item.label && item.children && (
                      <div className="pl-4 pb-2 flex flex-col gap-1">
                        {item.children.map((child) => (
                          <Link
                            key={child.href}
                            to={child.href}
                            onClick={() => setMobileOpen(false)}
                            className="block py-2 px-3 text-sm text-foreground/70 hover:text-primary rounded-md hover:bg-secondary"
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </>
                )}
              </div>
            ))}
            <div className="flex items-center gap-3 px-2 py-3">
              <LanguageToggle />
            </div>
            <a href="tel:+237681263743" className="flex items-center gap-2 text-sm font-medium text-foreground/80 py-3 px-2">
              <Phone className="w-4 h-4" />
              +237 681 263 743
            </a>
            <a
              href="https://wa.me/237681263743?text=Bonjour%2C%20je%20souhaite%20démarrer%20mon%20inscription."
              target="_blank"
              rel="noopener noreferrer"
              className="bg-primary text-primary-foreground px-5 py-2.5 rounded-full text-sm font-semibold text-center hover:opacity-90 mx-2"
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
