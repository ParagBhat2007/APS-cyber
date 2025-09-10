import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Cpu, Shield, Search } from "lucide-react";
import FeatureCard from "@/components/FeatureCard";
import heroBackground from "@/assets/hero-background.jpg";

const Home = () => {
  const features = [
    {
      icon: Cpu,
      title: "Smart AI Solutions",
      description: "Explore next-generation AI applications transforming real-world industries and daily life."
    },
    {
      icon: Shield,
      title: "Cybersecurity Awareness",
      description: "Stay protected with comprehensive AI-powered security education and threat awareness."
    },
    {
      icon: Search,
      title: "Threat Detection",
      description: "Advanced scanning capabilities for phishing attempts, malware, and unsafe URLs."
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-30"
          style={{ backgroundImage: `url(${heroBackground})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-background/70 to-background" />
        
        <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
          <div className="animate-float">
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              <span className="text-gradient">Artificial Intelligence</span>
            </h1>
            <h2 className="text-2xl md:text-3xl text-muted-foreground mb-8 font-light">
              Innovations and Implications
            </h2>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-glow-pulse">
            <Button
              size="lg"
              className="cyber-gradient text-cyber-dark font-semibold px-8 py-4 text-lg neon-glow"
              asChild
            >
              <Link to="/innovations">Get Started</Link>
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-cyber-border text-cyber-cyan hover:bg-cyber-cyan hover:text-cyber-dark px-8 py-4 text-lg"
              asChild
            >
              <Link to="/about">Learn More</Link>
            </Button>
          </div>
        </div>
        
        {/* Animated Background Elements */}
        <div className="absolute top-20 left-10 w-2 h-2 bg-cyber-blue rounded-full animate-ping opacity-75" />
        <div className="absolute top-40 right-20 w-3 h-3 bg-cyber-cyan rounded-full animate-pulse opacity-60" />
        <div className="absolute bottom-32 left-1/4 w-1 h-1 bg-cyber-blue rounded-full animate-ping opacity-50" />
      </section>

      {/* Features Section */}
      <section className="py-20 px-6">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-gradient">
              Cutting-Edge AI Solutions
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Discover the future of artificial intelligence through our comprehensive platform
              designed for innovation, security, and intelligent threat detection.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {features.map((feature, index) => (
              <div key={index} className="animate-float" style={{ animationDelay: `${index * 0.2}s` }}>
                <FeatureCard {...feature} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6">
        <div className="container mx-auto text-center">
          <div className="glass-card p-12 max-w-4xl mx-auto neon-glow">
            <h2 className="text-3xl font-bold mb-6 text-gradient">
              Ready to Explore the Future?
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join thousands of professionals already leveraging AI innovations and cybersecurity 
              awareness to stay ahead in the digital age.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="cyber-gradient text-cyber-dark font-semibold px-8 py-4 neon-glow"
                asChild
              >
                <Link to="/detector">Try Threat Detector</Link>
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-cyber-border text-cyber-cyan hover:bg-cyber-cyan hover:text-cyber-dark px-8 py-4"
                asChild
              >
                <Link to="/cybersecurity">Learn Security</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;