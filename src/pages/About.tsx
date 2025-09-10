import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Brain, Shield, Users, Zap, Target, Award } from "lucide-react";
import aiBrainImage from "@/assets/ai-brain.jpg";

const About = () => {
  const values = [
    {
      icon: Brain,
      title: "Innovation",
      description: "Pushing the boundaries of AI technology to solve real-world problems and create meaningful impact."
    },
    {
      icon: Shield,
      title: "Security",
      description: "Prioritizing cybersecurity and privacy in all our AI solutions to protect users and their data."
    },
    {
      icon: Users,
      title: "Accessibility",
      description: "Making advanced AI technology accessible to everyone, regardless of technical background."
    },
    {
      icon: Zap,
      title: "Performance",
      description: "Delivering fast, reliable, and efficient AI-powered solutions that scale with your needs."
    }
  ];

  const achievements = [
    { metric: "10M+", label: "Security Scans Performed" },
    { metric: "99.9%", label: "Threat Detection Accuracy" },
    { metric: "50K+", label: "Users Protected Daily" },
    { metric: "24/7", label: "AI-Powered Monitoring" }
  ];

  const team = [
    {
      role: "AI Research",
      description: "Leading experts in machine learning, neural networks, and cognitive computing."
    },
    {
      role: "Cybersecurity",
      description: "Veteran security professionals with decades of threat analysis experience."
    },
    {
      role: "Product Design",
      description: "User experience specialists focused on making AI accessible and intuitive."
    }
  ];

  return (
    <div className="min-h-screen py-20 px-6">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gradient">
            About Lovable AI
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Building secure and intelligent AI-driven platforms that protect, educate, 
            and empower users in an increasingly connected world.
          </p>
        </div>

        {/* Mission Section */}
        <section className="mb-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6 text-gradient">Our Mission</h2>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                At Lovable AI, we believe that artificial intelligence should enhance human capabilities 
                while maintaining the highest standards of security and privacy. Our mission is to develop 
                cutting-edge AI solutions that not only solve complex problems but also educate and protect 
                users from emerging digital threats.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                We're committed to making AI technology accessible, transparent, and beneficial for everyone, 
                fostering a future where humans and AI collaborate seamlessly to create a safer digital world.
              </p>
            </div>
            <div className="relative">
              <img 
                src={aiBrainImage} 
                alt="AI Brain Visualization" 
                className="rounded-2xl shadow-2xl neon-glow animate-float"
              />
              <div className="absolute -top-4 -right-4 p-4 glass-card rounded-xl">
                <Award className="h-8 w-8 text-cyber-cyan" />
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold mb-12 text-center text-gradient">Our Values</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <Card key={index} className="glass-card neon-glow group text-center">
                <CardHeader>
                  <div className="mx-auto p-4 rounded-2xl bg-gradient-to-r from-cyber-blue/20 to-cyber-cyan/20 border border-cyber-border group-hover:from-cyber-blue/30 group-hover:to-cyber-cyan/30 transition-all duration-300 w-fit">
                    <value.icon className="h-8 w-8 text-cyber-cyan" />
                  </div>
                  <CardTitle className="text-foreground">{value.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-muted-foreground">
                    {value.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Achievements Section */}
        <section className="mb-20">
          <div className="glass-card p-12 neon-glow">
            <h2 className="text-3xl font-bold mb-8 text-center text-gradient">
              Impact & Achievements
            </h2>
            <div className="grid md:grid-cols-4 gap-8">
              {achievements.map((achievement, index) => (
                <div key={index} className="text-center">
                  <div className="text-4xl font-bold text-gradient mb-2">
                    {achievement.metric}
                  </div>
                  <p className="text-muted-foreground">{achievement.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold mb-12 text-center text-gradient">Our Expertise</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {team.map((department, index) => (
              <Card key={index} className="glass-card neon-glow">
                <CardHeader>
                  <CardTitle className="text-xl text-foreground flex items-center">
                    <Target className="h-5 w-5 text-cyber-cyan mr-2" />
                    {department.role}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-muted-foreground">
                    {department.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Technology Section */}
        <section>
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-8 text-gradient">
              Powered by Advanced Technology
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-3xl mx-auto">
              Our platform leverages state-of-the-art artificial intelligence, machine learning algorithms, 
              and cybersecurity protocols to deliver unparalleled protection and insights.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              {[
                "Machine Learning", 
                "Neural Networks", 
                "Threat Intelligence", 
                "Behavioral Analysis", 
                "Real-time Processing",
                "Cloud Security",
                "Encrypted Communications",
                "Automated Response"
              ].map((tech) => (
                <Badge key={tech} variant="outline" className="border-cyber-border text-cyber-cyan px-4 py-2">
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