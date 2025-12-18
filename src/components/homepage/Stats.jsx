import { Card, CardContent } from "@/components/ui/card";
import CountUp from "@/components/CountUp";

export default function Stats() {
  const stats = [
    { label: "Courses Available", value: 120, sign: "+" },
    { label: "Active Students", value: 2500, sign: "+" },
    { label: "Records Managed", value: 1.2, sign: "M" },
    { label: "Satisfaction Rate", value: 99, sign: "%" },
  ];

  return (
    <section id="statistics" className="pt-20 pb-12 bg-secondary text-foreground border-t border-border">
      <div className="container max-w-5xl mx-auto px-4">
        {/* Heading */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            UniHub at a <span className="text-primary">Glance</span>
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            See key statistics that highlight engagement and performance across
            the platform.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, id) => (
            <Card
              key={id}
              className="p-0 bg-card border border-border rounded-2xl shadow-md hover:shadow-lg hover:shadow-primary/10 transition-all duration-300"
            >
              <CardContent className="flex flex-col items-center justify-center text-center p-8">
                <p className="text-3xl md:text-4xl font-bold text-primary">
                  <CountUp
                    from={0}
                    to={stat.value}
                    separator=","
                    direction="up"
                    duration={1}
                    className="count-up-text"
                  />
                  {stat.sign}
                </p>
                <p className="mt-2 text-sm md:text-base text-muted-foreground">
                  {stat.label}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
