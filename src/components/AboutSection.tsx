import aboutImg from "@/assets/about-img.jpg";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

export default function AboutSection() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="about" className="py-24 bg-secondary/30">
      <div
        ref={ref}
        className={`container mx-auto px-4 grid md:grid-cols-2 gap-12 items-center transition-all duration-700 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <div className="overflow-hidden rounded-lg shadow-xl">
          <img
            src={aboutImg}
            alt="Chef making fresh pasta at Pastarella"
            className="w-full h-[400px] object-cover hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
        </div>
        <div>
          <p className="text-accent font-sans text-sm tracking-[0.2em] uppercase mb-2">
            Our Story
          </p>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-6">
            A Family Tradition Since 1987
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Pastarella was born from Nonna Rosa's kitchen in the heart of Tuscany. 
            For over three decades, we've been crafting fresh pasta daily using only 
            the finest local ingredients and time-honored recipes passed down through 
            generations.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Every dish tells a story — of sun-ripened tomatoes, hand-rolled dough, 
            and the warmth of an Italian family gathering. Step into Pastarella and 
            let us take you on a culinary journey through Italy.
          </p>
        </div>
      </div>
    </section>
  );
}
