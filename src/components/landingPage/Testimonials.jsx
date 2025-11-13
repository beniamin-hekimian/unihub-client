import { Card, CardContent } from "@/components/ui/card";
import { Quote } from "lucide-react";
import student1 from "@/assets/images/student1.webp";
import student2 from "@/assets/images/student2.webp";
import student3 from "@/assets/images/student3.webp";

export default function Testimonials() {
  const testimonials = [
    {
      name: "Sara Ahmed",
      role: "Computer Science Student",
      quote:
        "UniHub simplified my academic life. I can check my grades and schedules instantly without waiting for emails.",
      image: student1,
    },
    {
      name: "Ali Mansour",
      role: "Information Systems Major",
      quote:
        "Everything I need is in one place - courses, announcements, and results. It feels fast, private, and reliable.",
      image: student2,
    },
    {
      name: "Nour Khaled",
      role: "Software Engineering Student",
      quote:
        "The real-time notifications and clean interface keep me on track. UniHub makes studying feel effortless.",
      image: student3,
    },
  ];

  return (
    <section id="testimonials" className="py-24 bg-secondary text-foreground">
      <div className="container mx-auto px-4">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            What Students <span className="text-primary">Say</span>
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Hear how UniHub helps students stay connected, informed, and in
            control of their academic life.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <Card
              key={i}
              className="bg-card border border-border shadow-md shadow-primary/10 rounded-2xl hover:shadow-primary/20 transition-all duration-300 flex flex-col h-full"
              data-aos="fade-up"
            >
              <CardContent className="p-8 flex flex-col text-center h-full">
                {/* Image & Quote Icon */}
                <div className="relative mb-4">
                  <img
                    src={t.image}
                    alt={t.name}
                    className="w-20 h-20 rounded-full object-cover border-2 border-primary/30 mx-auto"
                  />
                  <Quote className="absolute -top-2 -right-2 w-5 h-5 text-primary/70" />
                </div>

                {/* Quote */}
                <p className="text-muted-foreground leading-relaxed text-sm md:text-base flex-1">
                  “{t.quote}”
                </p>

                {/* Name & Role at the bottom */}
                <div className="mt-4">
                  <h4 className="font-semibold text-foreground">{t.name}</h4>
                  <p className="text-xs text-muted-foreground">{t.role}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
