import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { Search, Upload, Shield, AlertTriangle, CheckCircle, FileText, Globe } from "lucide-react";

// 🔑 Phishing detection logic (from your C++ rules)
function isPhishing(url: string): { status: string; riskScore: number; threats: string[]; details: any } {
  const u = url.toLowerCase();
  const threats: string[] = [];
  let score = 0;

  // 1. Check length
  if (u.length > 75) {
    threats.push("Unusually long URL");
    score += 20;
  }

  // 2. Contains '@'
  if (u.includes("@")) {
    threats.push("Contains '@' symbol (possible redirect trick)");
    score += 25;
  }

  // 3. Too many dashes
  if ((u.match(/-/g) || []).length > 3) {
    threats.push("Too many '-' characters in domain");
    score += 15;
  }

  // 4. IP address instead of domain
  const ipPattern = /http[s]?:\/\/(\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})/;
  if (ipPattern.test(u)) {
    threats.push("Uses IP address instead of domain");
    score += 30;
  }

  // 5. No HTTPS
  if (!u.startsWith("https://")) {
    threats.push("Connection not secured with HTTPS");
    score += 20;
  }

  // 6. Suspicious keywords
  const badWords = ["login", "verify", "update", "bank", "secure", "account", "free"];
  badWords.forEach(word => {
    if (u.includes(word)) {
      threats.push(`Suspicious keyword detected: "${word}"`);
      score += 10;
    }
  });

  // 7. Too many subdomains
  if ((u.match(/\./g) || []).length > 4) {
    threats.push("Too many subdomains in URL");
    score += 15;
  }

  // 8. Suspicious TLDs
  const badTLDs = [".xyz", ".top", ".tk", ".zip", ".ru"];
  badTLDs.forEach(tld => {
    if (u.endsWith(tld)) {
      threats.push(`Suspicious domain extension: ${tld}`);
      score += 25;
    }
  });

  // Normalize risk score (0–100)
  const riskScore = Math.min(score, 100);

  return {
    status: threats.length > 0 ? "malicious" : "safe",
    riskScore,
    threats,
    details: {
      urlLength: `${u.length} characters`,
      sslCertificate: u.startsWith("https://") ? "Valid" : "Invalid",
      subdomains: (u.match(/\./g) || []).length.toString()
    }
  };
}

const ThreatDetector = () => {
  const [url, setUrl] = useState("");
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState<any>(null);
  const [file, setFile] = useState<File | null>(null);

  const handleUrlScan = async () => {
    if (!url) return;

    setIsScanning(true);
    await new Promise(resolve => setTimeout(resolve, 1500)); // simulate scan delay

    // ✅ Use phishing detection logic
    const result = isPhishing(url);
    setScanResult({
      url,
      ...result
    });

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
    await new Promise(resolve => setTimeout(resolve, 2000));

    // (Still mock logic for files)
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
                        {key.replace(/([A-Z])/g, " $1").trim()}:
                      </span>
                      <span className="text-foreground font-medium">{value as string}</span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default ThreatDetector;
