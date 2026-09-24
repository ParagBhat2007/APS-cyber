import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Shield, Brain, Users, Zap, Target, Lock } from "lucide-react";

const TEAM_IMAGE = "https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=800&q=80";

const About = () => {
  const values = [
    {
      icon: Shield,
      title: "Security First",
      description: "Every feature is built with security and privacy at its core. Your data never leaves your browser.",
    },
    {
      icon: Brain,
      title: "Intelligent Analysis",
      description: "Advanced heuristic engines that detect sophisticated phishing techniques including homoglyph attacks.",
    },
    {
      icon: Users,
      title: "Accessibility",
      description: "Making cybersecurity tools accessible to everyone — no technical background required.",
    },
    {
      icon: Zap,
      title: "Instant Results",
      description: "Client-side analysis means zero API latency. Get results in milliseconds, not seconds.",
    },
  ];

  const capabilities = [
    { metric: "17+", label: "Detection Rules" },
    { metric: "100%", label: "Client-Side Privacy" },
    { metric: "0ms", label: "API Latency" },
    { metric: "24/7", label: "Always Available" },
  ];

  const team = [
    {
      role: "Threat Research",
      description: "Continuously updating detection rules based on the latest phishing techniques and attack vectors.",
    },
    {
      role: "Security Engineering",
      description: "Building reliable, performant detection engines that run entirely in the browser.",
    },
    {
      role: "User Experience",
      description: "Making complex security analysis results clear and actionable for everyone.",
    },
  ];

  return (
    <div className="min-h-screen py-16 px-6">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-6">
            <Shield className="h-4 w-4" />
            About Us
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
            About <span className="text-gradient">SPSK-Threat Detector</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            A dedicated platform for phishing detection, cybersecurity education,
            and online threat awareness — built to protect everyday users.
          </p>
        </div>

        {/* Mission */}
        <section className="mb-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6 text-foreground">
                Our <span className="text-gradient">Mission</span>
              </h2>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                SPSK-Threat Detector was built with a simple belief: everyone deserves
                to browse the internet safely. Phishing attacks remain one of the most
                common cyber threats, and we're on a mission to make detection accessible
                to everyone — not just security professionals.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Our platform runs entirely in your browser. No data is sent to any server.
                No accounts required. No tracking. Just fast, reliable phishing detection
                that respects your privacy.
              </p>
            </div>
            <div className="relative">
              <img
                src={TEAM_IMAGE}
                alt="Team collaboration"
                className="rounded-2xl shadow-lg border border-border"
              />
              <div className="absolute -top-3 -right-3 p-3 glass-card rounded-xl shadow-lg">
                <Lock className="h-6 w-6 text-primary" />
              </div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold mb-10 text-center text-foreground">
            Our <span className="text-gradient">Values</span>
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <Card
                key={index}
                className="glass-card group text-center animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardHeader>
                  <div className="mx-auto p-4 rounded-2xl bg-primary/10 border border-primary/20 group-hover:bg-primary/15 transition-all duration-300 w-fit">
                    <value.icon className="h-7 w-7 text-primary" />
                  </div>
                  <CardTitle className="text-foreground text-base">{value.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-muted-foreground text-sm">
                    {value.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Capabilities */}
        <section className="mb-20">
          <Card className="glass-card border-primary/20">
            <CardContent className="p-10">
              <h2 className="text-3xl font-bold mb-8 text-center text-foreground">
                Platform <span className="text-gradient">Capabilities</span>
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                {capabilities.map((item, index) => (
                  <div key={index} className="text-center">
                    <div className="text-3xl font-bold text-gradient mb-1">{item.metric}</div>
                    <p className="text-sm text-muted-foreground">{item.label}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Team */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold mb-10 text-center text-foreground">
            Our <span className="text-gradient">Expertise</span>
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {team.map((dept, index) => (
              <Card key={index} className="glass-card animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <CardHeader>
                  <CardTitle className="text-lg text-foreground flex items-center">
                    <Target className="h-4 w-4 text-primary mr-2" />
                    {dept.role}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-muted-foreground text-sm">
                    {dept.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Technology */}
        <section>
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-6 text-foreground">
              Built With <span className="text-gradient">Modern Tech</span>
            </h2>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              Our detection engine leverages advanced heuristic analysis, pattern matching,
              and Unicode security research to identify phishing threats.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              {[
                "Heuristic Analysis",
                "Homoglyph Detection",
                "Brand Impersonation",
                "URL Pattern Matching",
                "Entropy Analysis",
                "SPF/DKIM/DMARC",
                "Client-Side Processing",
                "Zero Data Collection",
              ].map((tech) => (
                <Badge
                  key={tech}
                  variant="outline"
                  className="border-border text-muted-foreground hover:text-primary hover:border-primary/30 px-4 py-2 transition-all duration-200"
                >
                  {tech}
                </Badge>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default About;