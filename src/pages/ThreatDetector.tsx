import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { Search, Upload, Shield, AlertTriangle, CheckCircle, FileText, Globe } from "lucide-react";

const ThreatDetector = () => {
  const [url, setUrl] = useState("");
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState<any>(null);
  const [file, setFile] = useState<File | null>(null);

  const handleUrlScan = async () => {
    if (!url) return;
    
    setIsScanning(true);
    // Simulate scan delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Mock scan result
    const mockResult = {
      url,
      status: Math.random() > 0.3 ? "safe" : "malicious",
      riskScore: Math.floor(Math.random() * 100),
      threats: Math.random() > 0.5 ? ["Phishing attempt", "Suspicious redirects"] : [],
      details: {
        domainAge: Math.floor(Math.random() * 1000) + " days",
        sslCertificate: Math.random() > 0.2 ? "Valid" : "Invalid",
        reputation: Math.random() > 0.3 ? "Good" : "Poor"
      }
    };
    
    setScanResult(mockResult);
    setIsScanning(false);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleFileScan = async () => {
    if (!file) return;
    
    setIsScanning(true);
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    const mockResult = {
      filename: file.name,
      status: Math.random() > 0.2 ? "safe" : "malicious",
      riskScore: Math.floor(Math.random() * 100),
      threats: Math.random() > 0.7 ? ["Trojan detected", "Suspicious behavior"] : [],
      details: {
        fileSize: `${(file.size / 1024 / 1024).toFixed(2)} MB`,
        fileType: file.type || "Unknown",
        scanTime: "2.3 seconds"
      }
    };
    
    setScanResult(mockResult);
    setIsScanning(false);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "safe": return "text-cyber-cyan";
      case "malicious": return "text-destructive";
      default: return "text-muted-foreground";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "safe": return <CheckCircle className="h-5 w-5 text-cyber-cyan" />;
      case "malicious": return <AlertTriangle className="h-5 w-5 text-destructive" />;
      default: return <Shield className="h-5 w-5 text-muted-foreground" />;
    }
  };

  const getRiskColor = (score: number) => {
    if (score < 30) return "bg-cyber-cyan text-cyber-dark";
    if (score < 70) return "bg-yellow-500 text-black";
    return "bg-destructive text-destructive-foreground";
  };

  return (
    <div className="min-h-screen py-20 px-6">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gradient">
            Advanced Threat Detector
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Protect yourself with our AI-powered threat detection system. 
            Scan URLs and files for phishing, malware, and other security risks.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {/* URL Scanner */}
          <Card className="glass-card neon-glow">
            <CardHeader>
              <div className="flex items-center space-x-3">
                <div className="p-2 rounded-lg bg-gradient-to-r from-cyber-blue/20 to-cyber-cyan/20 border border-cyber-border">
                  <Globe className="h-5 w-5 text-cyber-cyan" />
                </div>
                <div>
                  <CardTitle className="text-foreground">URL Scanner</CardTitle>
                  <CardDescription>Check websites for phishing and malicious content</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="url">Enter URL to scan</Label>
                <Input
                  id="url"
                  type="url"
                  placeholder="https://example.com"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  className="bg-cyber-slate/50 border-cyber-border focus:border-cyber-cyan"
                />
              </div>
              <Button
                onClick={handleUrlScan}
                disabled={!url || isScanning}
                className="w-full cyber-gradient text-cyber-dark font-semibold neon-glow"
              >
                {isScanning ? (
                  <>
                    <Search className="mr-2 h-4 w-4 animate-spin" />
                    Scanning...
                  </>
                ) : (
                  <>
                    <Search className="mr-2 h-4 w-4" />
                    Scan URL
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          {/* File Scanner */}
          <Card className="glass-card neon-glow">
            <CardHeader>
              <div className="flex items-center space-x-3">
                <div className="p-2 rounded-lg bg-gradient-to-r from-cyber-blue/20 to-cyber-cyan/20 border border-cyber-border">
                  <FileText className="h-5 w-5 text-cyber-cyan" />
                </div>
                <div>
                  <CardTitle className="text-foreground">File Scanner</CardTitle>
                  <CardDescription>Upload files to check for malware and viruses</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="file">Upload file to scan</Label>
                <Input
                  id="file"
                  type="file"
                  onChange={handleFileUpload}
                  className="bg-cyber-slate/50 border-cyber-border focus:border-cyber-cyan cursor-pointer"
                  accept=".pdf,.doc,.docx,.xls,.xlsx,.zip,.exe"
                />
                {file && (
                  <p className="text-sm text-muted-foreground">
                    Selected: {file.name} ({(file.size / 1024 / 1024).toFixed(2)} MB)
                  </p>
                )}
              </div>
              <Button
                onClick={handleFileScan}
                disabled={!file || isScanning}
                className="w-full cyber-gradient text-cyber-dark font-semibold neon-glow"
              >
                {isScanning ? (
                  <>
                    <Upload className="mr-2 h-4 w-4 animate-spin" />
                    Scanning...
                  </>
                ) : (
                  <>
                    <Upload className="mr-2 h-4 w-4" />
                    Scan File
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Scan Results */}
        {scanResult && (
          <Card className="glass-card neon-glow animate-fade-in">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                {getStatusIcon(scanResult.status)}
                <span>Scan Results</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Status Overview */}
              <div className="flex items-center justify-between p-4 rounded-xl bg-gradient-to-r from-cyber-blue/10 to-cyber-cyan/10 border border-cyber-border">
                <div>
                  <h3 className="font-semibold text-foreground">
                    {scanResult.url ? scanResult.url : scanResult.filename}
                  </h3>
                  <p className={`text-lg font-bold ${getStatusColor(scanResult.status)}`}>
                    {scanResult.status.toUpperCase()}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-muted-foreground">Risk Score</p>
                  <Badge className={getRiskColor(scanResult.riskScore)}>
                    {scanResult.riskScore}/100
                  </Badge>
                </div>
              </div>

              {/* Threat Details */}
              {scanResult.threats && scanResult.threats.length > 0 && (
                <div className="space-y-3">
                  <h4 className="font-semibold text-destructive flex items-center">
                    <AlertTriangle className="h-4 w-4 mr-2" />
                    Detected Threats
                  </h4>
                  {scanResult.threats.map((threat: string, index: number) => (
                    <div key={index} className="p-3 rounded-lg bg-destructive/10 border border-destructive/20">
                      <p className="text-destructive font-medium">{threat}</p>
                    </div>
                  ))}
                </div>
              )}

              {/* Technical Details */}
              <div className="space-y-3">
                <h4 className="font-semibold text-foreground">Technical Details</h4>
                <div className="grid md:grid-cols-2 gap-4">
                  {Object.entries(scanResult.details).map(([key, value]) => (
                    <div key={key} className="flex justify-between p-3 rounded-lg bg-muted/10">
                      <span className="text-muted-foreground capitalize">
                        {key.replace(/([A-Z])/g, ' $1').trim()}:
                      </span>
                      <span className="text-foreground font-medium">{value as string}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recommendations */}
              <div className="p-4 rounded-xl bg-gradient-to-r from-cyber-blue/10 to-cyber-cyan/10 border border-cyber-border">
                <h4 className="font-semibold text-foreground mb-2">Security Recommendations</h4>
                {scanResult.status === "safe" ? (
                  <p className="text-muted-foreground">
                    This {scanResult.url ? "website" : "file"} appears to be safe. However, always remain vigilant and avoid sharing sensitive information.
                  </p>
                ) : (
                  <div className="space-y-2 text-destructive">
                    <p>⚠️ This {scanResult.url ? "website" : "file"} has been flagged as potentially malicious.</p>
                    <p>🚫 Do not enter personal information or download files from this source.</p>
                    <p>🛡️ Consider using updated antivirus software and report this threat.</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Security Tips */}
        <div className="mt-16 grid md:grid-cols-3 gap-6">
          <Card className="glass-card">
            <CardContent className="p-6 text-center">
              <Shield className="h-8 w-8 text-cyber-cyan mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Stay Updated</h3>
              <p className="text-sm text-muted-foreground">
                Keep your antivirus and browser updated for the latest protection
              </p>
            </CardContent>
          </Card>
          <Card className="glass-card">
            <CardContent className="p-6 text-center">
              <AlertTriangle className="h-8 w-8 text-cyber-cyan mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Verify Sources</h3>
              <p className="text-sm text-muted-foreground">
                Always verify the authenticity of websites and file sources
              </p>
            </CardContent>
          </Card>
          <Card className="glass-card">
            <CardContent className="p-6 text-center">
              <CheckCircle className="h-8 w-8 text-cyber-cyan mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Regular Scans</h3>
              <p className="text-sm text-muted-foreground">
                Scan suspicious links and files before accessing or opening them
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ThreatDetector;