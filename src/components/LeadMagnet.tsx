import { useState } from "react";
import { Download } from "lucide-react";
import { motion } from "framer-motion";

const LeadMagnet = () => {
  const [form, setForm] = useState({ name: "", whatsapp: "", email: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const msg = encodeURIComponent(
      `Bonjour, je souhaite recevoir le guide gratuit.\nNom: ${form.name}\nEmail: ${form.email}`
    );
    window.open(`https://wa.me/237681263743?text=${msg}`, "_blank");
  };

  return;
















































};

export default LeadMagnet;