import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const menuData = {
  Antipasti: [
    { name: "Bruschetta Classica", desc: "Grilled bread, fresh tomatoes, basil, extra virgin olive oil", price: "€9" },
    { name: "Carpaccio di Manzo", desc: "Thinly sliced beef, arugula, parmesan, truffle oil", price: "€14" },
    { name: "Burrata e Prosciutto", desc: "Creamy burrata, San Daniele prosciutto, roasted peppers", price: "€16" },
    { name: "Calamari Fritti", desc: "Crispy fried squid, lemon aioli, fresh herbs", price: "€12" },
  ],
  Pasta: [
    { name: "Tagliatelle al Tartufo", desc: "Fresh tagliatelle, black truffle cream sauce, parmigiano", price: "€22" },
    { name: "Spaghetti alla Carbonara", desc: "Guanciale, egg yolk, pecorino romano, black pepper", price: "€18" },
    { name: "Pappardelle al Ragù", desc: "Wide ribbons, slow-cooked Tuscan meat ragù", price: "€20" },
    { name: "Ravioli di Ricotta", desc: "Handmade ravioli, ricotta & spinach, sage butter", price: "€19" },
  ],
  Secondi: [
    { name: "Osso Buco alla Milanese", desc: "Braised veal shank, saffron risotto, gremolata", price: "€28" },
    { name: "Branzino al Forno", desc: "Baked sea bass, cherry tomatoes, olives, capers", price: "€26" },
    { name: "Pollo alla Parmigiana", desc: "Breaded chicken, tomato sauce, mozzarella, basil", price: "€22" },
    { name: "Bistecca Fiorentina", desc: "Grilled T-bone steak, rosemary potatoes, seasonal vegetables", price: "€38" },
  ],
  Desserts: [
    { name: "Tiramisù della Casa", desc: "Classic mascarpone, espresso-soaked ladyfingers, cocoa", price: "€10" },
    { name: "Panna Cotta", desc: "Vanilla bean cream, mixed berry compote", price: "€9" },
    { name: "Cannoli Siciliani", desc: "Crispy shells, sweet ricotta, pistachios, chocolate", price: "€8" },
    { name: "Affogato al Caffè", desc: "Vanilla gelato drowned in hot espresso", price: "€7" },
  ],
  Drinks: [
    { name: "Aperol Spritz", desc: "Aperol, prosecco, soda water, orange slice", price: "€11" },
    { name: "Negroni Classico", desc: "Gin, Campari, sweet vermouth", price: "€12" },
    { name: "Chianti Classico", desc: "Tuscan red, notes of cherry and herbs (glass)", price: "€10" },
    { name: "Limoncello Sour", desc: "House limoncello, lemon juice, egg white, sugar", price: "€11" },
  ],
};

export default function MenuSection() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="menu" className="py-24">
      <div ref={ref} className={`container mx-auto px-4 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
        <div className="text-center mb-12">
          <p className="text-accent font-sans text-sm tracking-[0.2em] uppercase mb-2">Discover</p>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground">Our Menu</h2>
        </div>

        <Tabs defaultValue="Antipasti" className="max-w-4xl mx-auto">
          <TabsList className="flex flex-wrap justify-center gap-1 bg-transparent h-auto mb-8">
            {Object.keys(menuData).map((cat) => (
              <TabsTrigger
                key={cat}
                value={cat}
                className="font-serif data-[state=active]:bg-primary data-[state=active]:text-primary-foreground px-5 py-2 rounded-full"
              >
                {cat}
              </TabsTrigger>
            ))}
          </TabsList>

          {Object.entries(menuData).map(([cat, items]) => (
            <TabsContent key={cat} value={cat} className="space-y-4">
              {items.map((item) => (
                <div
                  key={item.name}
                  className="flex justify-between items-start p-4 rounded-lg bg-card hover:shadow-md transition-shadow group"
                >
                  <div className="flex-1">
                    <h3 className="font-serif text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                      {item.name}
                    </h3>
                    <p className="text-muted-foreground text-sm mt-1">{item.desc}</p>
                  </div>
                  <span className="font-serif text-lg font-bold text-primary ml-4 whitespace-nowrap">
                    {item.price}
                  </span>
                </div>
              ))}
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
}
