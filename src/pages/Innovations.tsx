import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Brain, Zap, Globe, Microscope, Car, Stethoscope } from "lucide-react";

const Innovations = () => {
  const innovations = [
    {
      icon: Brain,
      title: "Neural Language Models",
      description: "Advanced GPT-based systems revolutionizing human-computer interaction through natural language understanding.",
      category: "NLP",
      impact: "High"
    },
    {
      icon: Zap,
      title: "Quantum-Enhanced AI",
      description: "Leveraging quantum computing principles to solve complex optimization problems at unprecedented speeds.",
      category: "Quantum",
      impact: "Revolutionary"
    },
    {
      icon: Globe,
      title: "Autonomous Systems",
      description: "Self-governing AI networks capable of decision-making in complex, real-world environments.",
      category: "Automation",
      impact: "High"
    },
    {
      icon: Microscope,
      title: "AI-Powered Research",
      description: "Machine learning accelerating scientific discovery in materials science, drug development, and more.",
      category: "Science",
      impact: "Medium"
    },
    {
      icon: Car,
      title: "Smart Transportation",
      description: "Intelligent traffic management and autonomous vehicle coordination reducing congestion and emissions.",
      category: "Transport",
      impact: "High"
    },
    {
      icon: Stethoscope,
      title: "Medical AI Diagnostics",
      description: "Deep learning models detecting diseases earlier and more accurately than traditional methods.",
      category: "Healthcare",
      impact: "Revolutionary"
    }
  ];

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case "Revolutionary": return "bg-cyber-cyan text-cyber-dark";
      case "High": return "bg-cyber-blue text-white";
      default: return "bg-muted text-muted-foreground";
    }
  };

  return (
    <div className="min-h-screen py-20 px-6">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gradient">
            AI Innovations Shaping Tomorrow
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Explore cutting-edge artificial intelligence applications transforming industries, 
            solving complex problems, and creating new possibilities for human advancement.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {innovations.map((innovation, index) => (
            <Card key={index} className="glass-card neon-glow group cursor-pointer">
              <CardHeader>
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 rounded-xl bg-gradient-to-r from-cyber-blue/20 to-cyber-cyan/20 border border-cyber-border group-hover:from-cyber-blue/30 group-hover:to-cyber-cyan/30 transition-all duration-300">
                    <innovation.icon className="h-6 w-6 text-cyber-cyan" />
                  </div>
                  <div className="flex gap-2">
                    <Badge variant="outline" className="border-cyber-border text-xs">
                      {innovation.category}
                    </Badge>
                    <Badge className={getImpactColor(innovation.impact)}>
                      {innovation.impact}
                    </Badge>
                  </div>
                </div>
                <CardTitle className="text-xl text-foreground">
                  {innovation.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-muted-foreground leading-relaxed">
                  {innovation.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-20 text-center">
          <div className="glass-card p-12 max-w-4xl mx-auto neon-glow">
            <h2 className="text-3xl font-bold mb-6 text-gradient">
              The Future is Now
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              These innovations represent just the beginning. AI continues to evolve, 
              promising even more transformative breakthroughs that will reshape how we live, 
              work, and interact with technology.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              {["Machine Learning", "Deep Neural Networks", "Computer Vision", "Natural Language Processing", "Reinforcement Learning"].map((tech) => (
                <Badge key={tech} variant="outline" className="border-cyber-border text-cyber-cyan px-4 py-2">
                  {tech}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Innovations;