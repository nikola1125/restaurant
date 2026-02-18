import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const info = [
  { icon: MapPin, label: "Address", value: "info" },
  { icon: Phone, label: "Phone", value: "info" },
  { icon: Mail, label: "Email", value: "info" },
  { icon: Clock, label: "Hours", value: "info" },
];

export default function ContactSection() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="contact" className="py-24 bg-secondary/30">
      <div ref={ref} className={`container mx-auto px-4 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
        <div className="text-center mb-12">
          <p className="text-accent font-sans text-sm tracking-[0.2em] uppercase mb-2">Visit Us</p>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground">Contact & Location</h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <div className="space-y-6">
            {info.map(({ icon: Icon, label, value }) => (
              <div key={label} className="flex items-start gap-4">
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <Icon className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-sans text-sm text-muted-foreground">{label}</p>
                  <p className="text-foreground font-medium">{value}</p>
                </div>
              </div>
            ))}

            <div className="flex gap-4 pt-4">
              {["Instagram", "Facebook", "TripAdvisor"].map((s) => (
                <a key={s} href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors font-medium">
                  {s}
                </a>
              ))}
            </div>
          </div>

          {/* Map placeholder */}
          <div className="rounded-lg overflow-hidden bg-muted h-72 md:h-auto flex items-center justify-center">
            <div className="text-center text-muted-foreground">
              <MapPin className="h-12 w-12 mx-auto mb-2 opacity-30" />
              <p className="text-sm">Interactive map</p>
              <p className="text-xs">info</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
