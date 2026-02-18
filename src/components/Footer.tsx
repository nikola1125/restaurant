import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

export default function Footer() {
  const [email, setEmail] = useState("");
  const { toast } = useToast();

  const handleNewsletter = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    toast({ title: "Subscribed!", description: "You'll receive our latest news and offers." });
    setEmail("");
  };

  return (
    <footer className="bg-foreground text-background py-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          <div>
            <h3 className="font-serif text-2xl font-bold mb-4">PIAZZA</h3>
            <p className="text-background/70 text-sm leading-relaxed">
              Authentic Italian cuisine crafted with love, tradition, and the finest ingredients since 1987.
            </p>
          </div>

          <div>
            <h4 className="font-serif text-lg font-semibold mb-4">Quick Links</h4>
            <div className="flex flex-col gap-2">
              {["Home", "About", "Menu", "Gallery", "Reservation", "Contact"].map((l) => (
                <a key={l} href={`#${l.toLowerCase()}`} className="text-sm text-background/70 hover:text-accent transition-colors">
                  {l}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-serif text-lg font-semibold mb-4">Newsletter</h4>
            <p className="text-background/70 text-sm mb-4">Get our latest menus and special offers.</p>
            <form onSubmit={handleNewsletter} className="flex gap-2">
              <Input
                type="email"
                placeholder="Your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-background/10 border-background/20 text-background placeholder:text-background/50"
              />
              <Button type="submit" size="sm" className="shrink-0">Subscribe</Button>
            </form>
          </div>
        </div>

        <div className="border-t border-background/20 pt-8 text-center">
          <p className="text-background/50 text-sm">© 2025 PIAZZA. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
