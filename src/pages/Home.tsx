import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Shield, Search, AlertTriangle, Lock, ArrowRight, CheckCircle, ShieldCheck, Zap, Globe } from "lucide-react";
import FeatureCard from "@/components/FeatureCard";

const HERO_IMAGE = "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1920&q=80";

const Home = () => {
  const features = [
    {
      icon: Search,
      title: "URL Phishing Scanner",
      description:
        "Instantly analyze any URL for phishing indicators, suspicious domains, and malicious patterns with our advanced heuristic engine.",
    },
    {
      icon: Shield,
      title: "Threat Intelligence",
      description:
        "Detect brand impersonation, homoglyph attacks, URL shortener redirects, and other sophisticated social engineering tactics.",
    },
    {
      icon: AlertTriangle,
      title: "Risk Assessment",
      description:
        "Get a detailed risk score breakdown with specific threat indicators, helping you make informed decisions about link safety.",
    },
  ];

  const stats = [
    { icon: ShieldCheck, value: "17+", label: "Detection Rules" },
    { icon: Lock, value: "100%", label: "Client-Side Privacy" },
    { icon: Zap, value: "0ms", label: "API Latency" },
    { icon: Globe, value: "24/7", label: "Always Available" },
  ];

  return (
    <div className="min-h-screen bg-background selection:bg-primary/20 selection:text-primary">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        {/* Background Image with Heavy Overlay for Contrast */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-105"
          style={{ backgroundImage: `url(${HERO_IMAGE})` }}
        />
        <div className="absolute inset-0 bg-background/90 dark:bg-background/95 backdrop-blur-[2px]" />
        
        {/* Ambient Glows */}
        <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px] mix-blend-screen opacity-50" />
        <div className="absolute bottom-0 left-1/4 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[150px] mix-blend-screen opacity-40" />

        <div className="relative z-10 text-center max-w-5xl mx-auto px-6 mt-12">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-background/60 backdrop-blur-xl border border-primary/20 text-primary text-sm font-medium mb-8 shadow-[0_0_20px_rgba(var(--primary),0.15)] transform transition-transform hover:scale-105 duration-300">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            Advanced Phishing Detection Platform
          </div>

          {/* Heading */}
          <h1 className="text-5xl sm:text-6xl md:text-8xl font-extrabold mb-8 tracking-tight drop-shadow-2xl leading-[1.1]">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-blue-500 to-indigo-600">
              SPSK-Threat
            </span>
            <br />
            <span className="text-foreground">Detector</span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed drop-shadow-sm">
            Protect yourself from phishing attacks, malicious URLs, and online threats.
            Instant, private, client-side analysis — no data ever leaves your browser.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-5 justify-center items-center">
            <Button
              size="lg"
              className="spsk-gradient text-white font-semibold px-10 py-7 text-lg shadow-[0_0_30px_rgba(59,130,246,0.3)] hover:shadow-[0_0_40px_rgba(59,130,246,0.5)] rounded-2xl transition-all duration-300 transform hover:-translate-y-1 w-full sm:w-auto"
              asChild
            >
              <Link to="/detector">
                Start Scanning
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-primary/20 bg-background/50 backdrop-blur-xl hover:border-primary/50 hover:bg-primary/5 px-10 py-7 text-lg font-medium rounded-2xl transition-all duration-300 w-full sm:w-auto"
              asChild
            >
              <Link to="/about">Learn More</Link>
            </Button>
          </div>
        </div>

        {/* Decorative Grid Overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />
      </section>

      {/* Stats Section */}
      <section className="relative py-16 -mt-16 z-20 px-6">
        <div className="container mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto">
            {stats.map((stat, index) => (
              <div 
                key={index} 
                className="bg-background/60 backdrop-blur-2xl border border-border/50 p-6 rounded-2xl shadow-xl shadow-black/5 flex flex-col items-center text-center transform transition-all hover:-translate-y-1 hover:border-primary/30"
              >
                <div className="p-3 bg-primary/10 rounded-xl mb-4 text-primary">
                  <stat.icon className="h-6 w-6" />
                </div>
                <div className="text-3xl font-bold text-foreground mb-1">{stat.value}</div>
                <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-6 relative">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[100px] -z-10 pointer-events-none" />
        
        <div className="container mx-auto">
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-bold mb-6 text-foreground tracking-tight">
              Comprehensive <span className="text-gradient">Threat Detection</span>
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Our multi-layered analysis engine checks URLs against 17+ heuristic rules
              to identify phishing attempts and malicious content.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {features.map((feature, index) => (
              <div key={index} className="transform transition-all duration-300 hover:-translate-y-2">
                <FeatureCard {...feature} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-24 px-6 relative overflow-hidden bg-muted/20">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />
        
        <div className="container mx-auto max-w-5xl relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4 text-foreground tracking-tight">
              How It <span className="text-gradient">Works</span>
            </h2>
            <p className="text-muted-foreground text-lg">Analyze any URL in three simple steps.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 relative">
            {/* Connecting Line */}
            <div className="hidden md:block absolute top-12 left-1/6 right-1/6 h-0.5 bg-gradient-to-r from-transparent via-primary/30 to-transparent -z-10" />

            {[
              { step: "01", title: "Paste a URL", desc: "Enter any suspicious URL you want to analyze for phishing threats." },
              { step: "02", title: "Instant Analysis", desc: "Our engine runs 17+ heuristic checks including homoglyphs and impersonation." },
              { step: "03", title: "Get Results", desc: "Receive a detailed risk score with specific threat indicators and safety advice." },
            ].map((item, index) => (
              <div
                key={index}
                className="bg-background/80 backdrop-blur-xl border border-border/50 rounded-3xl p-8 shadow-xl shadow-black/5 hover:border-primary/30 hover:shadow-2xl transition-all duration-300 text-center group"
              >
                <div className="w-16 h-16 mx-auto rounded-2xl spsk-gradient flex items-center justify-center text-white font-bold text-xl mb-6 shadow-lg transform group-hover:scale-110 transition-transform duration-300">
                  {item.step}
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">{item.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Modern CTA Section */}
      <section className="py-32 px-6 relative overflow-hidden flex items-center justify-center">
        {/* Abstract Background for CTA */}
        <div className="absolute inset-0 bg-primary/5" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-primary/20 blur-[120px] rounded-full pointer-events-none" />

        <div className="container mx-auto text-center relative z-10 w-full max-w-4xl">
          <div className="bg-background/40 backdrop-blur-3xl border border-primary/20 rounded-[3rem] p-12 md:p-20 shadow-[0_8px_32px_rgba(0,0,0,0.1)] relative overflow-hidden">
            {/* Glass Highlights */}
            <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
            <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />

            <div className="w-24 h-24 mx-auto bg-gradient-to-br from-primary/20 to-blue-600/20 rounded-3xl flex items-center justify-center mb-8 shadow-inner border border-white/10">
              <Lock className="h-10 w-10 text-primary" />
            </div>
            
            <h2 className="text-4xl md:text-5xl font-extrabold mb-6 text-foreground tracking-tight">
              Ready to Stay <span className="text-gradient">Protected</span>?
            </h2>
            <p className="text-lg text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
              Start scanning URLs now — completely free, private, and instant.
              No sign-up required. Your data never leaves your browser.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-5 justify-center items-center">
              <Button
                size="lg"
                className="spsk-gradient text-white font-semibold px-10 py-7 text-lg shadow-[0_0_30px_rgba(59,130,246,0.3)] hover:shadow-[0_0_40px_rgba(59,130,246,0.5)] rounded-2xl transition-all duration-300"
                asChild
              >
                <Link to="/detector">
                  Try Threat Detector
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-primary/20 bg-background/30 backdrop-blur-md hover:border-primary/50 hover:bg-primary/5 px-10 py-7 text-lg font-medium rounded-2xl transition-all duration-300"
                asChild
              >
                <Link to="/cybersecurity">Learn Security</Link>
              </Button>
            </div>

            <div className="mt-12 flex flex-wrap justify-center gap-6 text-sm font-medium text-muted-foreground">
              {["No sign-up required", "100% client-side", "Open-source logic"].map((item) => (
                <span key={item} className="flex items-center gap-2 px-4 py-2 rounded-full bg-background/30 border border-border/50">
                  <CheckCircle className="h-4 w-4 text-spsk-success" />
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;