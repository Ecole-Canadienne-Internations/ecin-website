import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import gallery1 from "@/assets/gallery-1.jpeg";
import gallery2 from "@/assets/gallery-2.jpeg";
import gallery3 from "@/assets/gallery-3.jpeg";
import heroStudents from "@/assets/hero-students.png";
import heroStudents2 from "@/assets/hero-students-2.png";
import campusInterior from "@/assets/campus-interior.png";

const db = supabase as any;

// Fallback static photos
const staticPhotos = [
  { src: heroStudents, alt: "Étudiants devant le campus ECIN", span: "col-span-2 row-span-2" },
  { src: gallery1, alt: "Étudiants en uniforme ECIN", span: "col-span-1 row-span-1" },
  { src: campusInterior, alt: "Intérieur du campus", span: "col-span-1 row-span-1" },
  { src: gallery2, alt: "Étudiants en discussion", span: "col-span-1 row-span-1" },
  { src: heroStudents2, alt: "Activités pédagogiques", span: "col-span-1 row-span-1" },
  { src: gallery3, alt: "Vie au campus", span: "col-span-2 row-span-1" },
];

const PhotoGallery = () => {
  const [dynamicPhotos, setDynamicPhotos] = useState<any[]>([]);

  useEffect(() => {
    const load = async () => {
      const { data } = await db.from("photos").select("*").eq("is_published", true).order("created_at", { ascending: false });
      if (data && data.length > 0) setDynamicPhotos(data);
    };
    load();
  }, []);

  const photos = dynamicPhotos.length > 0
    ? dynamicPhotos.map((p: any) => ({ src: p.image_url, alt: p.alt_text || "Photo ECIN", span: p.span || "col-span-1 row-span-1" }))
    : staticPhotos;

  return (
    <section id="album" className="py-16 md:py-24 bg-secondary">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="inline-block bg-accent text-accent-foreground text-xs font-bold px-3 py-1 rounded-full mb-3 uppercase tracking-wide">
            Album Photo
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-foreground mb-3">
            La vie au campus ECIN
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 auto-rows-[180px] md:auto-rows-[220px]">
          {photos.map((photo, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className={`${photo.span} rounded-xl overflow-hidden group`}
            >
              <img
                src={photo.src}
                alt={photo.alt}
                loading="lazy"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PhotoGallery;
