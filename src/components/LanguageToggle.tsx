import { useState } from "react";
import { Globe } from "lucide-react";

const LanguageToggle = () => {
  const [lang, setLang] = useState<"fr" | "en">("fr");

  const handleToggle = () => {
    const newLang = lang === "fr" ? "en" : "fr";
    setLang(newLang);
    // Google Translate integration via URL or future i18n
    const url = newLang === "en"
      ? `https://translate.google.com/translate?sl=fr&tl=en&u=${encodeURIComponent(window.location.href)}`
      : window.location.href.replace(/translate\.google\.com.*u=/, "");
    
    if (newLang === "en") {
      window.open(url, "_blank");
    }
  };

  return (
    <button
      onClick={handleToggle}
      className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-border text-xs font-semibold text-foreground/70 hover:text-primary hover:border-primary transition-colors"
      title={lang === "fr" ? "Translate to English" : "Traduire en français"}
    >
      <Globe className="w-3.5 h-3.5" />
      {lang === "fr" ? "EN" : "FR"}
    </button>
  );
};

export default LanguageToggle;
