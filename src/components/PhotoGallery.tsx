import { motion } from "framer-motion";
import gallery1 from "@/assets/gallery-1.jpeg";
import gallery2 from "@/assets/gallery-2.jpeg";
import gallery3 from "@/assets/gallery-3.jpeg";
import slideClass1 from "@/assets/slideshow-classroom-1.png";
import slideClass2 from "@/assets/slideshow-classroom-2.png";

const photos = [
{ src: gallery1, alt: "Étudiants devant le campus ECIN", span: "col-span-2 row-span-2" },
{ src: gallery2, alt: "Étudiants en uniforme ECIN", span: "col-span-1 row-span-1" },
{ src: slideClass1, alt: "Salle de classe", span: "col-span-1 row-span-1" },
{ src: gallery3, alt: "Étudiants en discussion", span: "col-span-1 row-span-1" },
{ src: slideClass2, alt: "Activités pédagogiques", span: "col-span-1 row-span-1" }];


const PhotoGallery = () => {
  return (
    <section id="album" className="py-16 md:py-24 bg-secondary">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12">
          
          <span className="inline-block bg-accent text-accent-foreground text-xs font-bold px-3 py-1 rounded-full mb-3 uppercase tracking-wide">
            Album Photo
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-foreground mb-3">
            La vie au campus ECIN
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 auto-rows-[180px] md:auto-rows-[220px]">
          {photos.map((photo, i) =>
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            className={`${photo.span} rounded-xl overflow-hidden group`}>
            
              




            
            </motion.div>
          )}
        </div>
      </div>
    </section>);

};

export default PhotoGallery;