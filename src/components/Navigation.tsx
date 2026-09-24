import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Shield, Sun, Moon, Menu, X } from "lucide-react";
import { useTheme } from "@/components/ThemeProvider";
import { useState } from "react";

const Navigation = () => {
  const location = useLocation();
  const { resolvedTheme, toggleTheme } = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);

  const navItems = [
    { label: "Home", link: "/" },
    { label: "Cybersecurity", link: "/cybersecurity" },
    { label: "Threat Detector", link: "/detector" },
    { label: "About", link: "/about" },
    { label: "Contact", link: "/contact" },
  ];

  return (
    <nav className="sticky top-4 z-50 mx-4 md:mx-auto max-w-6xl rounded-2xl border border-border/50 bg-background/60 backdrop-blur-2xl shadow-lg shadow-black/5">
      <div className="container mx-auto px-6 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2.5 group">
            <div className="p-2 rounded-xl spsk-gradient shadow-md group-hover:shadow-lg transition-shadow duration-300">
              <Shield className="h-5 w-5 text-white" />
            </div>
            <span className="text-lg font-bold text-gradient tracking-tight">
              SPSK-Threat Detector
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <Button
                key={item.link}
                variant="ghost"
                size="sm"
                asChild
                className={`relative text-sm font-medium transition-all duration-200 ${
                  location.pathname === item.link
                    ? "text-primary bg-primary/10"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                }`}
              >
                <Link to={item.link}>
                  {item.label}
                  {location.pathname === item.link && (
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-6 h-0.5 rounded-full spsk-gradient" />
                  )}
                </Link>
              </Button>
            ))}
          </div>

          {/* Right Side: Theme Toggle + CTA */}
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="rounded-full h-9 w-9 text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-all duration-200"
              aria-label="Toggle theme"
            >
              {resolvedTheme === "dark" ? (
                <Sun className="h-[1.1rem] w-[1.1rem] transition-transform duration-300 rotate-0" />
              ) : (
                <Moon className="h-[1.1rem] w-[1.1rem] transition-transform duration-300 rotate-0" />
              )}
            </Button>

            <Button
              size="sm"
              className="hidden sm:inline-flex spsk-gradient text-white font-medium shadow-md hover:shadow-lg transition-all duration-200"
              asChild
            >
              <Link to="/detector">Scan Now</Link>
            </Button>

            {/* Mobile Menu Toggle */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden rounded-full h-9 w-9"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Nav */}
        {mobileOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-border/50 pt-4 animate-fade-in">
            <div className="flex flex-col space-y-1">
              {navItems.map((item) => (
                <Button
                  key={item.link}
                  variant="ghost"
                  asChild
                  className={`justify-start text-sm font-medium ${
                    location.pathname === item.link
                      ? "text-primary bg-primary/10"
                      : "text-muted-foreground"
                  }`}
                  onClick={() => setMobileOpen(false)}
                >
                  <Link to={item.link}>{item.label}</Link>
                </Button>
              ))}
              <Button
                size="sm"
                className="mt-2 spsk-gradient text-white font-medium"
                asChild
                onClick={() => setMobileOpen(false)}
              >
                <Link to="/detector">Scan Now</Link>
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;