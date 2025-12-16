import { Button } from "@/components/ui/button";
import featureCourse from "@/assets/images/featureCourse.webp";
import featureNotify from "@/assets/images/featureNotify.webp";
import featureSecurity from "@/assets/images/featureSecurity.webp";

export default function Features() {
  const features = [
    {
      title: "Smart Course Access",
      desc: "Access all your courses from one streamlined dashboard designed for focus and clarity. No clutter, just learning that keeps you organized and on track throughout the semester.",
      image: featureCourse,
      cta: "Explore Courses",
    },
    {
      title: "Instant Notifications",
      desc: "Never miss an update, get real-time notifications for new grades, class changes, and university announcements. Stay informed the moment something important happens.",
      image: featureNotify,
      cta: "Enable Alerts",
    },
    {
      title: "Privacy & Security",
      desc: "Your academic data is encrypted and protected with enterprise-level security protocols for full peace of mind. We prioritize confidentiality and secure access at every level.",
      image: featureSecurity,
      cta: "Learn More",
    },
  ];

  return (
    <section
      id="features"
      className="pt-20 pb-12 bg-background text-foreground"
    >
      <div className="container max-w-5xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold">
            Powerful <span className="text-primary">Features</span> for Students
          </h2>
          <p className="text-muted-foreground mt-3 max-w-2xl mx-auto">
            Built to simplify student life and enhance your academic experience.
          </p>
        </div>

        <div className="flex flex-col gap-12">
          {features.map((feature, i) => (
            <div
              key={i}
              className={`flex flex-col md:flex-row items-center gap-12 ${
                i % 2 === 1 ? "md:flex-row-reverse" : ""
              }`}
            >
              {/* Image */}
              <div className="w-full md:w-1/2" data-aos="zoom-in">
                <div className="rounded-2xl overflow-hidden shadow-lg border border-border">
                  <img
                    src={feature.image}
                    alt={feature.title}
                    className="w-full h-75 object-cover"
                  />
                </div>
              </div>

              {/* Content */}
              <div className="w-full md:w-1/2 text-center md:text-left">
                <h3 className="text-2xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  {feature.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
