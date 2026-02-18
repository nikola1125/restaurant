import { useState } from "react";
import { X } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import gallery1 from "@/assets/gallery-1.jpg";
import gallery2 from "@/assets/gallery-2.jpg";
import gallery3 from "@/assets/gallery-3.jpg";
import gallery4 from "@/assets/gallery-4.jpg";
import gallery5 from "@/assets/gallery-5.jpg";
import gallery6 from "@/assets/gallery-6.jpg";

const images = [
  { src: gallery1, alt: "Bruschetta appetizer" },
  { src: gallery2, alt: "Fresh pasta dish" },
  { src: gallery3, alt: "Tiramisu dessert" },
  { src: gallery4, alt: "Wine service" },
  { src: gallery5, alt: "Seafood platter" },
  { src: gallery6, alt: "Restaurant terrace" },
];

export default function GallerySection() {
  const [lightbox, setLightbox] = useState<number | null>(null);
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="gallery" className="py-24 bg-secondary/30">
      <div ref={ref} className={`container mx-auto px-4 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
        <div className="text-center mb-12">
          <p className="text-accent font-sans text-sm tracking-[0.2em] uppercase mb-2">Visual Feast</p>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground">Gallery</h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => setLightbox(i)}
              className="overflow-hidden rounded-lg aspect-square group cursor-pointer"
            >
              <img
                src={img.src}
                alt={img.alt}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                loading="lazy"
              />
            </button>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightbox !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setLightbox(null)}
        >
          <button
            className="absolute top-6 right-6 text-white/80 hover:text-white"
            onClick={() => setLightbox(null)}
          >
            <X className="h-8 w-8" />
          </button>
          <img
            src={images[lightbox].src}
            alt={images[lightbox].alt}
            className="max-w-full max-h-[85vh] rounded-lg object-contain"
          />
        </div>
      )}
    </section>
  );
}
