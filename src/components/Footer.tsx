import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Cpu, Twitter, Linkedin, Github, Mail } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  const footerLinks = [
    {
      title: "Platform",
      links: [
        { label: "AI Innovations", href: "/innovations" },
        { label: "Threat Detector", href: "/detector" },
        { label: "Cybersecurity", href: "/cybersecurity" },
        { label: "About Us", href: "/about" }
      ]
    },
    {
      title: "Resources",
      links: [
        { label: "Documentation", href: "#" },
        { label: "API Reference", href: "#" },
        { label: "Security Guide", href: "#" },
        { label: "Best Practices", href: "#" }
      ]
    },
    {
      title: "Support",
      links: [
        { label: "Contact Us", href: "/contact" },
        { label: "Help Center", href: "#" },
        { label: "Status Page", href: "#" },
        { label: "Community", href: "#" }
      ]
    }
  ];

  const socialLinks = [
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Linkedin, href: "#", label: "LinkedIn" },
    { icon: Github, href: "#", label: "GitHub" },
    { icon: Mail, href: "/contact", label: "Contact" }
  ];

  return (
    <footer className="relative mt-20">
      {/* Gradient Separator */}
      <div className="h-px bg-gradient-to-r from-transparent via-cyber-border to-transparent mb-12" />
      
      <div className="container mx-auto px-6 pb-12">
        {/* Main Footer Content */}
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <div className="p-2 rounded-xl bg-gradient-to-r from-cyber-blue to-cyber-cyan neon-glow">
                <Cpu className="h-6 w-6 text-cyber-dark" />
              </div>
              <span className="text-xl font-bold text-gradient">Parag's CyberSec</span>
            </Link>
            <p className="text-muted-foreground mb-6 max-w-md leading-relaxed">
              Building secure and intelligent AI-driven platforms that protect, educate, 
              and empower users in an increasingly connected world.
            </p>
            <div className="flex space-x-3">
              {socialLinks.map((social) => (
                <Button
                  key={social.label}
                  variant="outline"
                  size="icon"
                  className="border-cyber-border hover:border-cyber-cyan hover:bg-cyber-cyan hover:text-cyber-dark transition-all duration-300"
                  asChild
                >
                  <Link to={social.href} aria-label={social.label}>
                    <social.icon className="h-4 w-4" />
                  </Link>
                </Button>
              ))}
            </div>
          </div>

          {/* Footer Links */}
          {footerLinks.map((section) => (
            <div key={section.title}>
              <h3 className="font-semibold text-foreground mb-4">{section.title}</h3>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.href}
                      className="text-muted-foreground hover:text-cyber-cyan transition-colors duration-200 text-sm"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Section */}
        <div className="pt-8 border-t border-cyber-border">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-muted-foreground text-sm">
              © {currentYear} APS AI. MADE BY PARAG BHAT 
            </p>
            <div className="flex space-x-6 text-sm">
              <Link 
                to="#" 
                className="text-muted-foreground hover:text-cyber-cyan transition-colors duration-200"
              >
                Privacy Policy
              </Link>
              <Link 
                to="#" 
                className="text-muted-foreground hover:text-cyber-cyan transition-colors duration-200"
              >
                Terms of Service
              </Link>
              <Link 
                to="#" 
                className="text-muted-foreground hover:text-cyber-cyan transition-colors duration-200"
              >
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Background Glow Effect */}
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-96 h-24 bg-gradient-to-t from-cyber-blue/20 to-transparent rounded-full blur-3xl -z-10" />
    </footer>
  );
};

export default Footer;