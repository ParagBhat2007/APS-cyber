import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Cpu } from "lucide-react";

const Navigation = () => {
  const location = useLocation();
  
  const navItems = [
    { label: "Home", link: "/" },
    { label: "AI Innovations", link: "/innovations" },
    { label: "Cybersecurity", link: "/cybersecurity" },
    { label: "Threat Detector", link: "/detector" },
    { label: "About", link: "/about" },
    { label: "Contact", link: "/contact" },
  ];

  return (
    <nav className="glass-card mx-4 mt-4 sticky top-4 z-50">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="p-2 rounded-xl bg-gradient-to-r from-cyber-blue to-cyber-cyan neon-glow">
              <Cpu className="h-6 w-6 text-cyber-dark" />
            </div>
            <span className="text-xl font-bold text-gradient">APS CyberSec</span>
          </Link>
          
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <Button
                key={item.link}
                variant={location.pathname === item.link ? "default" : "ghost"}
                asChild
                className="relative overflow-hidden group"
              >
                <Link to={item.link} className="relative z-10">
                  {item.label}
                  {location.pathname === item.link && (
                    <div className="absolute inset-0 bg-gradient-to-r from-cyber-blue to-cyber-cyan opacity-20 rounded-lg" />
                  )}
                </Link>
              </Button>
            ))}
          </div>
          
          <Button variant="outline" className="neon-glow border-cyber-border text-cyber-cyan hover:bg-cyber-cyan hover:text-cyber-dark">
            Get Started
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;