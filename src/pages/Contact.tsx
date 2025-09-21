import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, MessageSquare, Phone, MapPin, Send, Clock, Shield } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    toast({
      title: "Message Sent Successfully!",
      description: "We'll get back to you within 24 hours.",
    });
    
    setFormData({ name: "", email: "", subject: "", message: "" });
    setIsSubmitting(false);
  };

  const contactInfo = [
    {
      icon: Mail,
      title: "Email Support",
      description: "Get in touch with our team",
      contact: "support@ai.com",
      available: "24/7"
    },
    {
      icon: MessageSquare,
      title: "Live Chat",
      description: "Real-time assistance",
      contact: "Available on our platform",
      available: "Mon-Fri, 9AM-6PM EST"
    },
    {
      icon: Phone,
      title: "Phone Support",
      description: "Speak with our experts",
      contact: "+1 (555) 123-4567",
      available: "Business hours only"
    }
  ];

  const officeLocations = [
    {
      city: "San Francisco",
      address: "123 Innovation Drive, CA 94105",
      type: "Headquarters"
    },
    {
      city: "New York",
      address: "456 Tech Avenue, NY 10001",
      type: "East Coast Office"
    },
    {
      city: "London",
      address: "789 AI Street, EC2A 2BB",
      type: "European Hub"
    }
  ];

  return (
    <div className="min-h-screen py-20 px-6">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gradient">
            Get in Touch
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Have questions about our AI solutions or need technical support? 
            Our team of experts is here to help you navigate the future of artificial intelligence.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card className="glass-card neon-glow">
              <CardHeader>
                <CardTitle className="text-2xl text-gradient flex items-center">
                  <Send className="h-6 w-6 text-cyber-cyan mr-3" />
                  Send us a Message
                </CardTitle>
                <CardDescription>
                  Fill out the form below and we'll respond within 24 hours
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        name="name"
                        type="text"
                        placeholder="John Doe"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="bg-cyber-slate/50 border-cyber-border focus:border-cyber-cyan"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="john@example.com"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="bg-cyber-slate/50 border-cyber-border focus:border-cyber-cyan"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject</Label>
                    <Input
                      id="subject"
                      name="subject"
                      type="text"
                      placeholder="How can we help you?"
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                      className="bg-cyber-slate/50 border-cyber-border focus:border-cyber-cyan"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      name="message"
                      placeholder="Tell us about your project, questions, or how we can help..."
                      rows={6}
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      className="bg-cyber-slate/50 border-cyber-border focus:border-cyber-cyan resize-none"
                    />
                  </div>
                  
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full cyber-gradient text-cyber-dark font-semibold py-3 neon-glow"
                  >
                    {isSubmitting ? (
                      <>
                        <Send className="mr-2 h-4 w-4 animate-spin" />
                        Sending Message...
                      </>
                    ) : (
                      <>
                        <Send className="mr-2 h-4 w-4" />
                        Send Message
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Contact Information */}
          <div className="space-y-8">
            {/* Contact Methods */}
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-gradient">Contact Information</h2>
              {contactInfo.map((info, index) => (
                <Card key={index} className="glass-card">
                  <CardContent className="p-4">
                    <div className="flex items-start space-x-3">
                      <div className="p-2 rounded-lg bg-gradient-to-r from-cyber-blue/20 to-cyber-cyan/20 border border-cyber-border">
                        <info.icon className="h-5 w-5 text-cyber-cyan" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-foreground">{info.title}</h3>
                        <p className="text-sm text-muted-foreground mb-1">{info.description}</p>
                        <p className="text-cyber-cyan font-medium text-sm">{info.contact}</p>
                        <div className="flex items-center mt-1">
                          <Clock className="h-3 w-3 text-muted-foreground mr-1" />
                          <span className="text-xs text-muted-foreground">{info.available}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Office Locations */}
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-gradient">Office Locations</h2>
              {officeLocations.map((office, index) => (
                <Card key={index} className="glass-card">
                  <CardContent className="p-4">
                    <div className="flex items-start space-x-3">
                      <div className="p-2 rounded-lg bg-gradient-to-r from-cyber-blue/20 to-cyber-cyan/20 border border-cyber-border">
                        <MapPin className="h-5 w-5 text-cyber-cyan" />
                      </div>
                      <div>
                        <div className="flex items-center space-x-2 mb-1">
                          <h3 className="font-semibold text-foreground">{office.city}</h3>
                          <span className="text-xs px-2 py-1 rounded bg-cyber-blue/20 text-cyber-cyan">
                            {office.type}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground">{office.address}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Security Notice */}
            <Card className="glass-card border-cyber-cyan/30">
              <CardContent className="p-4">
                <div className="flex items-start space-x-3">
                  <Shield className="h-5 w-5 text-cyber-cyan mt-1" />
                  <div>
                    <h3 className="font-semibold text-cyber-cyan mb-1">Secure Communication</h3>
                    <p className="text-sm text-muted-foreground">
                      All communications are encrypted and protected. We never share your 
                      personal information with third parties.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* FAQ Section */}
        <section className="mt-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-gradient">
              Frequently Asked Questions
            </h2>
            <p className="text-muted-foreground">
              Quick answers to common questions about our AI platform
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6 max-w-6xl mx-auto">
            <Card className="glass-card">
              <CardContent className="p-6">
                <h3 className="font-semibold mb-2 text-foreground">How accurate is your threat detection?</h3>
                <p className="text-sm text-muted-foreground">
                  Our AI-powered threat detection system maintains 99.9% accuracy through continuous 
                  learning and real-time threat intelligence updates.
                </p>
              </CardContent>
            </Card>
            <Card className="glass-card">
              <CardContent className="p-6">
                <h3 className="font-semibold mb-2 text-foreground">Is my data secure?</h3>
                <p className="text-sm text-muted-foreground">
                  Yes, all data is encrypted end-to-end and processed in secure, compliant 
                  environments. We follow strict privacy standards.
                </p>
              </CardContent>
            </Card>
            <Card className="glass-card">
              <CardContent className="p-6">
                <h3 className="font-semibold mb-2 text-foreground">What file types can I scan?</h3>
                <p className="text-sm text-muted-foreground">
                  We support most common file types including PDFs, documents, images, 
                  executables, and compressed files up to 100MB.
                </p>
              </CardContent>
            </Card>
            <Card className="glass-card">
              <CardContent className="p-6">
                <h3 className="font-semibold mb-2 text-foreground">Do you offer enterprise solutions?</h3>
                <p className="text-sm text-muted-foreground">
                  Yes, we provide enterprise-grade solutions with custom integrations, 
                  dedicated support, and enhanced security features.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Contact;