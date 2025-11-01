import { Button } from "@/components/ui/button";
import { Link } from "react-router";
import hero from "@/assets/images/hero.webp";

export default function HeroSection() {
  return (
    <section className="relative flex items-center bg-linear-to-br from-secondary via-background to-muted overflow-hidden">
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
          {/* Left Column - Content */}
          <div data-aos="fade-right" className="flex flex-col gap-6 text-center lg:text-left">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 self-center lg:self-start">
              <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
                <svg
                  className="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 14l9-5-9-5-9 5 9 5z M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"
                  />
                </svg>
                Modern University Portal
              </span>
            </div>

            {/* Main Heading */}
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-7xl text-balance">
              Manage Your Academic Life{" "}
              <span className="text-primary">Seamlessly</span>
            </h1>

            {/* Supporting Text */}
            <p className="text-lg text-muted-foreground md:text-xl leading-relaxed text-pretty max-w-2xl mx-auto lg:mx-0">
              UniHub gives students a secure way to access grades, schedules,
              subjects and announcements all in one place.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mt-4">
              <Button
                asChild
                size="lg"
                className="shadow-lg shadow-primary/20 hover:shadow-primary/30"
              >
                <Link to="/signin">Get Started</Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="hover:cursor-pointer"
              >
                <Link to="/features">Discover Features</Link>
              </Button>
            </div>

            {/* Trust Indicators - Updated colors to use CSS variables */}
            <div className="flex flex-wrap items-center gap-6 justify-center lg:justify-start mt-8 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-green-500" />
                <span>Secure & Encrypted</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-blue-500" />
                <span>24/7 Access</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-purple-500" />
                <span>Real-time Updates</span>
              </div>
            </div>
          </div>

          {/* Right Column - Illustration */}
          <div data-aos="fade-left" className="relative flex items-center justify-center lg:justify-end">
            <div className="relative w-full max-w-lg px-8 py-8">
              {/* Decorative Elements - Updated to use muted colors */}
              <div className="absolute top-0 left-0 h-72 w-72 rounded-full bg-primary/5 blur-3xl -z-10" />
              <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-chart-2/5 blur-3xl -z-10" />

              {/* Main Illustration Container */}
              <div className="relative rounded-2xl bg-card p-8 shadow-2xl shadow-primary/10 border border-border">
                <img
                  src={hero}
                  alt="hero section student image"
                  className="w-full h-auto rounded-lg"
                />
              </div>

              {/* Floating Cards - Updated grade card to use chart colors */}
              <div className="absolute top-0 right-0 rounded-xl bg-card p-4 shadow-lg shadow-primary/10 border border-border hidden md:block">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-chart-2/20 flex items-center justify-center">
                    <span className="text-chart-2 font-bold text-sm">A+</span>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">
                      Latest Grade
                    </p>
                    <p className="text-sm font-semibold text-card-foreground">
                      Software Engineering
                    </p>
                  </div>
                </div>
              </div>

              <div className="absolute bottom-0 left-0 rounded-xl bg-card p-4 shadow-lg shadow-primary/10 border border-border hidden md:block">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center">
                    <svg
                      className="h-5 w-5 text-primary"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 14l9-5-9-5-9 5 9 5z M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Next Class</p>
                    <p className="text-sm font-semibold text-card-foreground">
                      Operating Systems
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
