import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { format } from "date-fns";
import { CalendarIcon, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const schema = z.object({
  name: z.string().trim().min(2, "Name is required").max(100),
  email: z.string().trim().email("Invalid email").max(255),
  phone: z.string().trim().min(7, "Phone is required").max(20),
  date: z.date({ required_error: "Select a date" }),
  time: z.string().min(1, "Select a time"),
  guests: z.string().min(1, "Select party size"),
  requests: z.string().max(500).optional(),
});

type FormData = z.infer<typeof schema>;

const times = ["12:00", "12:30", "13:00", "13:30", "18:00", "18:30", "19:00", "19:30", "20:00", "20:30", "21:00"];

export default function ReservationSection() {
  const [submitted, setSubmitted] = useState(false);
  const { toast } = useToast();
  const { ref, isVisible } = useScrollAnimation();

  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { name: "", email: "", phone: "", requests: "" },
  });

  const onSubmit = (data: FormData) => {
    // Store locally
    const reservations = JSON.parse(localStorage.getItem("pastarella-reservations") || "[]");
    reservations.push({ ...data, date: data.date.toISOString(), createdAt: new Date().toISOString() });
    localStorage.setItem("pastarella-reservations", JSON.stringify(reservations));

    setSubmitted(true);
    toast({ title: "Reservation Confirmed! 🎉", description: `See you on ${format(data.date, "PPP")} at ${data.time}.` });
  };

  if (submitted) {
    return (
      <section id="reservation" className="py-24">
        <div className="container mx-auto px-4 text-center max-w-lg">
          <div className="bg-card rounded-2xl p-12 shadow-lg">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <Check className="h-8 w-8 text-primary" />
            </div>
            <h2 className="font-serif text-3xl font-bold text-foreground mb-4">Thank You!</h2>
            <p className="text-muted-foreground mb-6">Your reservation has been confirmed. We look forward to welcoming you.</p>
            <Button onClick={() => { setSubmitted(false); form.reset(); }}>Make Another Reservation</Button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="reservation" className="py-24">
      <div ref={ref} className={`container mx-auto px-4 max-w-2xl transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
        <div className="text-center mb-12">
          <p className="text-accent font-sans text-sm tracking-[0.2em] uppercase mb-2">Book Now</p>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground">Reserve a Table</h2>
        </div>

        <div className="bg-card rounded-2xl p-8 shadow-lg">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-4">
                <FormField control={form.control} name="name" render={({ field }) => (
                  <FormItem><FormLabel>Name</FormLabel><FormControl><Input placeholder="Your name" {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField control={form.control} name="email" render={({ field }) => (
                  <FormItem><FormLabel>Email</FormLabel><FormControl><Input type="email" placeholder="email@example.com" {...field} /></FormControl><FormMessage /></FormItem>
                )} />
              </div>

              <FormField control={form.control} name="phone" render={({ field }) => (
                <FormItem><FormLabel>Phone</FormLabel><FormControl><Input type="tel" placeholder="info" {...field} /></FormControl><FormMessage /></FormItem>
              )} />

              <div className="grid sm:grid-cols-3 gap-4">
                <FormField control={form.control} name="date" render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Date</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button variant="outline" className={cn("justify-start text-left font-normal", !field.value && "text-muted-foreground")}>
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {field.value ? format(field.value, "PP") : "Pick a date"}
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar mode="single" selected={field.value} onSelect={field.onChange} disabled={(d) => d < new Date()} initialFocus className="p-3 pointer-events-auto" />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )} />

                <FormField control={form.control} name="time" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Time</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl><SelectTrigger><SelectValue placeholder="Time" /></SelectTrigger></FormControl>
                      <SelectContent>
                        {times.map((t) => <SelectItem key={t} value={t}>{t}</SelectItem>)}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )} />

                <FormField control={form.control} name="guests" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Guests</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl><SelectTrigger><SelectValue placeholder="Guests" /></SelectTrigger></FormControl>
                      <SelectContent>
                        {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => <SelectItem key={n} value={String(n)}>{n} {n === 1 ? "guest" : "guests"}</SelectItem>)}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )} />
              </div>

              <FormField control={form.control} name="requests" render={({ field }) => (
                <FormItem><FormLabel>Special Requests (optional)</FormLabel><FormControl><Textarea placeholder="Allergies, celebrations, seating preferences..." {...field} /></FormControl><FormMessage /></FormItem>
              )} />

              <Button type="submit" size="lg" className="w-full">Confirm Reservation</Button>
            </form>
          </Form>
        </div>
      </div>
    </section>
  );
}
