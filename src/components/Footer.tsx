import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Shield, Github, Mail, Twitter, Linkedin } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    {
      title: "Platform",
      links: [
        { label: "Threat Detector", href: "/detector" },
        { label: "Cybersecurity", href: "/cybersecurity" },
        { label: "About Us", href: "/about" },
      ],
    },
    {
      title: "Resources",
      links: [
        { label: "Security Guide", href: "/cybersecurity" },
        { label: "Contact", href: "/contact" },
      ],
    },
  ];

  const socialLinks = [
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Linkedin, href: "#", label: "LinkedIn" },
    { icon: Github, href: "#", label: "GitHub" },
    { icon: Mail, href: "/contact", label: "Contact" },
  ];

  return (
    <footer className="relative mt-20 border-t border-border/50">
      <div className="container mx-auto px-6 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center space-x-2.5 mb-4">
              <div className="p-2 rounded-xl spsk-gradient shadow-md">
                <Shield className="h-5 w-5 text-white" />
              </div>
              <span className="text-lg font-bold text-gradient tracking-tight">
                SPSK-Threat Detector
              </span>
            </Link>
            <p className="text-muted-foreground mb-6 max-w-md leading-relaxed text-sm">
              Advanced phishing detection and cybersecurity awareness platform.
              Protecting users from online threats with intelligent URL scanning
              and security education tools.
            </p>
            <div className="flex space-x-2">
              {socialLinks.map((social) => (
                <Button
                  key={social.label}
                  variant="outline"
                  size="icon"
                  className="h-9 w-9 rounded-full border-border hover:border-primary hover:bg-primary/10 hover:text-primary transition-all duration-300"
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
              <h3 className="font-semibold text-foreground mb-4 text-sm">
                {section.title}
              </h3>
              <ul className="space-y-2.5">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.href}
                      className="text-muted-foreground hover:text-primary transition-colors duration-200 text-sm"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-border/50">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-muted-foreground text-sm">
              © {currentYear} SPSK-Threat Detector. Built by SPSK Team.
            </p>
            <div className="flex space-x-6 text-sm">
              <Link
                to="#"
                className="text-muted-foreground hover:text-primary transition-colors duration-200"
              >
                Privacy Policy
              </Link>
              <Link
                to="#"
                className="text-muted-foreground hover:text-primary transition-colors duration-200"
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;