import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { Search, Shield, AlertTriangle, CheckCircle, Globe, Mail, Info, ShieldAlert, ShieldCheck } from "lucide-react";

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// ENHANCED PHISHING DETECTION ENGINE
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

interface ThreatDetail {
  rule: string;
  severity: "low" | "medium" | "high" | "critical";
  description: string;
  weight: number;
}

interface ScanResult {
  url?: string;
  emailSubject?: string;
  status: "safe" | "suspicious" | "malicious";
  riskScore: number;
  threats: ThreatDetail[];
  details: Record<string, string>;
  recommendations: string[];
}

// Homoglyph map: characters that look like latin letters
const HOMOGLYPHS: Record<string, string[]> = {
  a: ["а", "ạ", "ą", "à", "á", "â", "ã", "ä", "å", "α"],
  e: ["е", "ẹ", "ę", "è", "é", "ê", "ë", "ε"],
  i: ["і", "ị", "ì", "í", "î", "ï", "ı"],
  o: ["о", "ọ", "ø", "ò", "ó", "ô", "õ", "ö", "ο"],
  c: ["с", "ç", "ć"],
  p: ["р"],
  s: ["ѕ", "ś", "ş"],
  d: ["ԁ", "đ"],
  x: ["х"],
  y: ["у", "ý", "ÿ"],
  n: ["ñ", "ń", "η"],
  l: ["ⅼ", "ℓ"],
  g: ["ɡ"],
  k: ["κ"],
  w: ["ω"],
};

const BRAND_DOMAINS: Record<string, string[]> = {
  google: ["google.com", "gmail.com", "youtube.com"],
  apple: ["apple.com", "icloud.com"],
  microsoft: ["microsoft.com", "outlook.com", "live.com", "office.com"],
  amazon: ["amazon.com", "aws.amazon.com"],
  paypal: ["paypal.com"],
  facebook: ["facebook.com", "fb.com"],
  netflix: ["netflix.com"],
  instagram: ["instagram.com"],
  twitter: ["twitter.com", "x.com"],
  linkedin: ["linkedin.com"],
  bank: ["chase.com", "wellsfargo.com", "bankofamerica.com", "citibank.com"],
  dropbox: ["dropbox.com"],
  adobe: ["adobe.com"],
};

const URL_SHORTENERS = [
  "bit.ly", "tinyurl.com", "t.co", "goo.gl", "ow.ly", "is.gd",
  "buff.ly", "tiny.cc", "lnkd.in", "db.tt", "qr.ae", "adf.ly",
  "bitly.com", "rebrand.ly", "bl.ink", "short.io", "cutt.ly",
];

const SUSPICIOUS_TLDS = [
  ".xyz", ".top", ".tk", ".zip", ".mov", ".ru", ".cn", ".click",
  ".link", ".work", ".gq", ".ml", ".cf", ".ga", ".buzz", ".icu",
  ".monster", ".rest", ".cam",
];

const SUSPICIOUS_KEYWORDS = [
  "login", "verify", "update", "bank", "secure", "account", "free",
  "winner", "prize", "confirm", "suspend", "urgent", "alert", "click",
  "expire", "password", "credential", "signin", "validate", "wallet",
  "payment", "invoice", "refund", "tax",
];

function extractDomain(url: string): string {
  try {
    const u = new URL(url.startsWith("http") ? url : `https://${url}`);
    return u.hostname.toLowerCase();
  } catch {
    return url.toLowerCase();
  }
}

function containsHomoglyphs(text: string): boolean {
  for (const [, lookalikes] of Object.entries(HOMOGLYPHS)) {
    for (const char of lookalikes) {
      if (text.includes(char)) return true;
    }
  }
  return false;
}

function detectBrandImpersonation(domain: string): string | null {
  const domainLower = domain.toLowerCase();
  for (const [brand, officialDomains] of Object.entries(BRAND_DOMAINS)) {
    // Skip if it's actually the real domain
    if (officialDomains.some((d) => domainLower === d || domainLower.endsWith(`.${d}`))) {
      continue;
    }
    // Check if the domain contains the brand name
    if (domainLower.includes(brand)) {
      return brand;
    }
    // Check for typosquatting (1-char difference in brand name)
    const domainParts = domainLower.split(".");
    for (const part of domainParts) {
      if (part.length >= brand.length - 1 && part.length <= brand.length + 1) {
        let diff = 0;
        const shorter = part.length <= brand.length ? part : brand;
        const longer = part.length > brand.length ? part : brand;
        for (let i = 0; i < shorter.length; i++) {
          if (shorter[i] !== longer[i]) diff++;
        }
        diff += longer.length - shorter.length;
        if (diff === 1 && part !== brand) return brand;
      }
    }
  }
  return null;
}

function calculateEntropy(str: string): number {
  const freq: Record<string, number> = {};
  for (const ch of str) {
    freq[ch] = (freq[ch] || 0) + 1;
  }
  let entropy = 0;
  for (const count of Object.values(freq)) {
    const p = count / str.length;
    entropy -= p * Math.log2(p);
  }
  return entropy;
}

function analyzeUrl(url: string): ScanResult {
  const u = url.toLowerCase().trim();
  const threats: ThreatDetail[] = [];
  let totalWeight = 0;

  const domain = extractDomain(u);

  // Rule 1: Unusually long URL
  if (u.length > 75) {
    const w = u.length > 150 ? 15 : 10;
    threats.push({
      rule: "Excessive URL Length",
      severity: u.length > 150 ? "high" : "medium",
      description: `URL is ${u.length} characters long. Phishing URLs often use excessive length to hide the actual destination.`,
      weight: w,
    });
    totalWeight += w;
  }

  // Rule 2: Contains '@' symbol
  if (u.includes("@")) {
    threats.push({
      rule: "@ Symbol in URL",
      severity: "high",
      description: "The '@' symbol can trick browsers into ignoring everything before it, redirecting to a different domain.",
      weight: 20,
    });
    totalWeight += 20;
  }

  // Rule 3: Excessive dashes in domain
  const dashCount = (domain.match(/-/g) || []).length;
  if (dashCount > 3) {
    threats.push({
      rule: "Excessive Dashes in Domain",
      severity: "medium",
      description: `Domain contains ${dashCount} dashes. Legitimate domains rarely use more than 1-2 dashes.`,
      weight: 10,
    });
    totalWeight += 10;
  }

  // Rule 4: IP address instead of domain
  const ipPattern = /^https?:\/\/(\d{1,3}\.){3}\d{1,3}/;
  if (ipPattern.test(u)) {
    threats.push({
      rule: "IP Address as Domain",
      severity: "critical",
      description: "Uses a raw IP address instead of a domain name. Legitimate websites almost always use domain names.",
      weight: 25,
    });
    totalWeight += 25;
  }

  // Rule 5: No HTTPS
  if (u.startsWith("http://")) {
    threats.push({
      rule: "No HTTPS Encryption",
      severity: "high",
      description: "Connection is not encrypted with TLS/SSL. Sensitive data could be intercepted.",
      weight: 15,
    });
    totalWeight += 15;
  }

  // Rule 6: Suspicious keywords
  const foundKeywords: string[] = [];
  SUSPICIOUS_KEYWORDS.forEach((word) => {
    if (u.includes(word)) foundKeywords.push(word);
  });
  if (foundKeywords.length > 0) {
    const w = Math.min(foundKeywords.length * 5, 20);
    threats.push({
      rule: "Suspicious Keywords Detected",
      severity: foundKeywords.length > 2 ? "high" : "medium",
      description: `Found phishing-associated keywords: ${foundKeywords.map((k) => `"${k}"`).join(", ")}`,
      weight: w,
    });
    totalWeight += w;
  }

  // Rule 7: Excessive subdomains
  const subdomainCount = (domain.match(/\./g) || []).length;
  if (subdomainCount > 3) {
    threats.push({
      rule: "Excessive Subdomains",
      severity: "medium",
      description: `Domain has ${subdomainCount} levels of subdomains. This is often used to disguise the real domain.`,
      weight: 12,
    });
    totalWeight += 12;
  }

  // Rule 8: Suspicious TLDs
  const matchedTLD = SUSPICIOUS_TLDS.find((tld) => domain.endsWith(tld));
  if (matchedTLD) {
    threats.push({
      rule: "Suspicious Domain Extension",
      severity: "high",
      description: `Uses "${matchedTLD}" top-level domain, which is frequently used for phishing and spam campaigns.`,
      weight: 18,
    });
    totalWeight += 18;
  }

  // Rule 9: Homoglyph / Punycode detection
  if (containsHomoglyphs(u)) {
    threats.push({
      rule: "Homoglyph Characters Detected",
      severity: "critical",
      description: "URL contains lookalike Unicode characters designed to impersonate a legitimate domain (IDN homograph attack).",
      weight: 30,
    });
    totalWeight += 30;
  }

  // Rule 10: Punycode domain (xn--)
  if (domain.includes("xn--")) {
    threats.push({
      rule: "Punycode Domain",
      severity: "high",
      description: "Domain uses Punycode encoding (xn--), which can disguise internationalized domain names to look like legitimate ones.",
      weight: 20,
    });
    totalWeight += 20;
  }

  // Rule 11: Brand impersonation
  const impersonatedBrand = detectBrandImpersonation(domain);
  if (impersonatedBrand) {
    threats.push({
      rule: "Brand Impersonation",
      severity: "critical",
      description: `Domain appears to impersonate "${impersonatedBrand}". This is a common phishing technique.`,
      weight: 25,
    });
    totalWeight += 25;
  }

  // Rule 12: URL shortener
  const isShortener = URL_SHORTENERS.some((s) => domain === s || domain.endsWith(`.${s}`));
  if (isShortener) {
    threats.push({
      rule: "URL Shortener Detected",
      severity: "medium",
      description: "Short URLs hide the true destination. Attackers frequently use shorteners to bypass security filters.",
      weight: 12,
    });
    totalWeight += 12;
  }

  // Rule 13: Double extension (e.g., .pdf.exe)
  const doubleExtPattern = /\.\w{2,4}\.\w{2,4}$/;
  const pathPart = u.split("?")[0];
  if (doubleExtPattern.test(pathPart) && (pathPart.endsWith(".exe") || pathPart.endsWith(".scr") || pathPart.endsWith(".bat") || pathPart.endsWith(".cmd"))) {
    threats.push({
      rule: "Double File Extension",
      severity: "critical",
      description: "URL contains a double file extension (e.g., .pdf.exe), commonly used to disguise malicious downloads.",
      weight: 25,
    });
    totalWeight += 25;
  }

  // Rule 14: Data URI / JavaScript URI
  if (u.startsWith("data:") || u.startsWith("javascript:")) {
    threats.push({
      rule: "Dangerous URI Scheme",
      severity: "critical",
      description: `Uses "${u.split(":")[0]}:" URI scheme, which can execute code or embed malicious content directly.`,
      weight: 30,
    });
    totalWeight += 30;
  }

  // Rule 15: Hexadecimal/encoded characters in domain
  if (/%[0-9a-f]{2}/i.test(domain)) {
    threats.push({
      rule: "Encoded Characters in Domain",
      severity: "high",
      description: "Domain contains percent-encoded characters, which can be used to obfuscate the actual URL destination.",
      weight: 15,
    });
    totalWeight += 15;
  }

  // Rule 16: Non-standard port
  try {
    const parsed = new URL(u.startsWith("http") ? u : `https://${u}`);
    if (parsed.port && parsed.port !== "80" && parsed.port !== "443") {
      threats.push({
        rule: "Non-Standard Port",
        severity: "medium",
        description: `Uses port ${parsed.port}. Legitimate websites typically use standard ports (80/443).`,
        weight: 10,
      });
      totalWeight += 10;
    }
  } catch {
    // Ignore parsing errors
  }

  // Rule 17: High entropy in domain (random-looking)
  const domainEntropy = calculateEntropy(domain.replace(/\./g, ""));
  if (domainEntropy > 4.0 && domain.length > 12) {
    threats.push({
      rule: "High Domain Entropy",
      severity: "medium",
      description: "Domain appears randomly generated, which is characteristic of phishing and malware domains.",
      weight: 10,
    });
    totalWeight += 10;
  }

  // Normalize score to 0-100
  const riskScore = Math.min(Math.round(totalWeight), 100);

  // Determine status
  let status: "safe" | "suspicious" | "malicious";
  if (riskScore >= 50) status = "malicious";
  else if (riskScore >= 20) status = "suspicious";
  else status = "safe";

  // Build recommendations
  const recommendations: string[] = [];
  if (status === "safe") {
    recommendations.push("This URL appears safe, but always exercise caution with unfamiliar links.");
  } else {
    if (threats.some((t) => t.rule.includes("HTTPS"))) {
      recommendations.push("Avoid entering sensitive information on non-HTTPS pages.");
    }
    if (threats.some((t) => t.rule.includes("Brand"))) {
      recommendations.push("Navigate directly to the official website instead of clicking this link.");
    }
    if (threats.some((t) => t.rule.includes("Shortener"))) {
      recommendations.push("Use a URL expander service to reveal the true destination.");
    }
    recommendations.push("Do not enter passwords or personal information on this page.");
    recommendations.push("Report this URL to your IT security team if received via email.");
  }

  return {
    url: url,
    status,
    riskScore,
    threats,
    details: {
      "URL Length": `${u.length} characters`,
      "Domain": domain,
      "SSL/TLS": u.startsWith("https://") ? "Encrypted (HTTPS)" : u.startsWith("http://") ? "Not Encrypted (HTTP)" : "Unknown",
      "Subdomain Depth": subdomainCount.toString(),
      "Domain Entropy": domainEntropy.toFixed(2),
    },
    recommendations,
  };
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// EMAIL HEADER ANALYSIS
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

interface EmailAnalysis {
  spoofingIndicators: string[];
  riskLevel: "low" | "medium" | "high";
  details: Record<string, string>;
}

function analyzeEmailHeaders(headers: string): EmailAnalysis {
  const indicators: string[] = [];
  const details: Record<string, string> = {};
  const lines = headers.split("\n");

  // Extract key headers
  let from = "", returnPath = "", receivedSpf = "", dkim = "", dmarc = "";

  for (const line of lines) {
    const lower = line.toLowerCase().trim();
    if (lower.startsWith("from:")) from = line.substring(5).trim();
    if (lower.startsWith("return-path:")) returnPath = line.substring(12).trim();
    if (lower.startsWith("received-spf:")) receivedSpf = line.substring(13).trim();
    if (lower.startsWith("dkim-signature:")) dkim = "present";
    if (lower.startsWith("authentication-results:")) {
      if (lower.includes("dmarc=pass")) dmarc = "pass";
      else if (lower.includes("dmarc=fail")) dmarc = "fail";
      if (lower.includes("dkim=pass")) dkim = "pass";
      else if (lower.includes("dkim=fail")) dkim = "fail";
      if (lower.includes("spf=pass")) receivedSpf = "pass";
      else if (lower.includes("spf=fail")) receivedSpf = "fail";
    }
  }

  details["From"] = from || "Not found";
  details["Return-Path"] = returnPath || "Not found";
  details["SPF"] = receivedSpf || "Not found";
  details["DKIM"] = dkim || "Not found";
  details["DMARC"] = dmarc || "Not found";

  // Check for spoofing indicators
  if (from && returnPath) {
    const fromDomain = from.match(/@([^\s>]+)/)?.[1]?.toLowerCase();
    const rpDomain = returnPath.match(/@([^\s>]+)/)?.[1]?.toLowerCase();
    if (fromDomain && rpDomain && fromDomain !== rpDomain) {
      indicators.push(`From domain (${fromDomain}) doesn't match Return-Path domain (${rpDomain}) — possible spoofing.`);
    }
  }

  if (receivedSpf.toLowerCase().includes("fail")) {
    indicators.push("SPF check failed — the sending server is not authorized to send on behalf of this domain.");
  }

  if (dkim === "fail") {
    indicators.push("DKIM signature verification failed — the email may have been tampered with.");
  }

  if (dmarc === "fail") {
    indicators.push("DMARC policy check failed — strong indicator of email spoofing.");
  }

  if (!dkim || dkim === "Not found") {
    indicators.push("No DKIM signature found — cannot verify email authenticity.");
  }

  let riskLevel: "low" | "medium" | "high" = "low";
  if (indicators.length >= 3) riskLevel = "high";
  else if (indicators.length >= 1) riskLevel = "medium";

  return { spoofingIndicators: indicators, riskLevel, details };
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// UI COMPONENT
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

const ThreatDetector = () => {
  const [url, setUrl] = useState("");
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState<ScanResult | null>(null);
  const [activeTab, setActiveTab] = useState<"url" | "email">("url");
  const [emailHeaders, setEmailHeaders] = useState("");
  const [emailResult, setEmailResult] = useState<EmailAnalysis | null>(null);

  const handleUrlScan = async () => {
    if (!url) return;
    setIsScanning(true);
    setScanResult(null);
    await new Promise((resolve) => setTimeout(resolve, 1200));
    const result = analyzeUrl(url);
    setScanResult(result);
    setIsScanning(false);
  };

  const handleEmailScan = async () => {
    if (!emailHeaders.trim()) return;
    setIsScanning(true);
    setEmailResult(null);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const result = analyzeEmailHeaders(emailHeaders);
    setEmailResult(result);
    setIsScanning(false);
  };

  const getStatusConfig = (status: string) => {
    switch (status) {
      case "safe":
        return { color: "text-spsk-success", bg: "bg-spsk-success/10", border: "border-spsk-success/30", icon: ShieldCheck, label: "SAFE" };
      case "suspicious":
        return { color: "text-spsk-warning", bg: "bg-spsk-warning/10", border: "border-spsk-warning/30", icon: ShieldAlert, label: "SUSPICIOUS" };
      case "malicious":
        return { color: "text-spsk-danger", bg: "bg-spsk-danger/10", border: "border-spsk-danger/30", icon: AlertTriangle, label: "MALICIOUS" };
      default:
        return { color: "text-muted-foreground", bg: "bg-muted", border: "border-border", icon: Shield, label: "UNKNOWN" };
    }
  };

  const getSeverityBadge = (severity: string) => {
    const styles: Record<string, string> = {
      low: "bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300",
      medium: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/40 dark:text-yellow-300",
      high: "bg-orange-100 text-orange-800 dark:bg-orange-900/40 dark:text-orange-300",
      critical: "bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-300",
    };
    return styles[severity] || styles.low;
  };

  const getRiskBarClass = (score: number) => {
    if (score < 20) return "risk-low";
    if (score < 50) return "risk-medium";
    return "risk-high";
  };

  return (
    <div className="min-h-screen py-16 px-6">
      <div className="container mx-auto max-w-5xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-6">
            <Shield className="h-4 w-4" />
            Advanced Analysis Engine
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-gradient">Threat Detector</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Analyze URLs for phishing indicators or scan email headers for spoofing
            attempts. All analysis runs locally in your browser.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex rounded-xl bg-muted/50 border border-border p-1">
            <button
              onClick={() => setActiveTab("url")}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                activeTab === "url"
                  ? "bg-background shadow-sm text-foreground border border-border/50"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Globe className="h-4 w-4" />
              URL Scanner
            </button>
            <button
              onClick={() => setActiveTab("email")}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                activeTab === "email"
                  ? "bg-background shadow-sm text-foreground border border-border/50"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Mail className="h-4 w-4" />
              Email Header Analyzer
            </button>
          </div>
        </div>

        {/* URL Scanner Tab */}
        {activeTab === "url" && (
          <div className="space-y-8 animate-fade-in">
            <Card className="glass-card">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className="p-2.5 rounded-xl bg-primary/10 border border-primary/20">
                    <Globe className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-foreground">URL Phishing Scanner</CardTitle>
                    <CardDescription>
                      Paste a URL to check for phishing indicators, malicious patterns, and brand impersonation
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="url-input">Enter URL to analyze</Label>
                  <div className="flex gap-3">
                    <Input
                      id="url-input"
                      type="text"
                      placeholder="https://example.com or suspicious-link.xyz/login"
                      value={url}
                      onChange={(e) => setUrl(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && handleUrlScan()}
                      className="flex-1 bg-background border-border focus:border-primary"
                    />
                    <Button
                      onClick={handleUrlScan}
                      disabled={!url.trim() || isScanning}
                      className="spsk-gradient text-white font-medium shadow-md hover:shadow-lg min-w-[120px]"
                    >
                      {isScanning ? (
                        <>
                          <Search className="mr-2 h-4 w-4 animate-spin" />
                          Scanning…
                        </>
                      ) : (
                        <>
                          <Search className="mr-2 h-4 w-4" />
                          Scan
                        </>
                      )}
                    </Button>
                  </div>
                </div>

                {/* Quick test links */}
                <div className="flex flex-wrap gap-2">
                  <span className="text-xs text-muted-foreground">Try:</span>
                  {[
                    "http://192.168.1.1/login/verify-account",
                    "https://g00gle-login.xyz/auth",
                    "https://bit.ly/3xFake",
                    "https://www.google.com",
                  ].map((testUrl) => (
                    <button
                      key={testUrl}
                      onClick={() => setUrl(testUrl)}
                      className="text-xs px-2.5 py-1 rounded-md bg-muted/50 border border-border hover:border-primary/30 hover:bg-primary/5 text-muted-foreground hover:text-foreground transition-all duration-200"
                    >
                      {testUrl.length > 35 ? testUrl.substring(0, 35) + "…" : testUrl}
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* URL Scan Results */}
            {scanResult && (
              <div className="space-y-6 animate-fade-in">
                {/* Status Banner */}
                {(() => {
                  const config = getStatusConfig(scanResult.status);
                  const StatusIcon = config.icon;
                  return (
                    <Card className={`${config.bg} ${config.border} border`}>
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between flex-wrap gap-4">
                          <div className="flex items-center gap-3">
                            <StatusIcon className={`h-8 w-8 ${config.color}`} />
                            <div>
                              <p className={`text-xl font-bold ${config.color}`}>{config.label}</p>
                              <p className="text-sm text-muted-foreground truncate max-w-md">
                                {scanResult.url}
                              </p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-sm text-muted-foreground mb-1">Risk Score</p>
                            <span className={`text-3xl font-bold ${config.color}`}>
                              {scanResult.riskScore}
                            </span>
                            <span className="text-muted-foreground text-sm">/100</span>
                          </div>
                        </div>

                        {/* Risk Progress Bar */}
                        <div className="mt-4">
                          <div className="risk-bar">
                            <div
                              className={`risk-bar-fill ${getRiskBarClass(scanResult.riskScore)}`}
                              style={{ width: `${scanResult.riskScore}%` }}
                            />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })()}

                {/* Threat Details */}
                {scanResult.threats.length > 0 && (
                  <Card className="glass-card">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-foreground">
                        <AlertTriangle className="h-5 w-5 text-spsk-danger" />
                        Detected Threats ({scanResult.threats.length})
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      {scanResult.threats.map((threat, index) => (
                        <div
                          key={index}
                          className="p-4 rounded-xl border border-border bg-muted/30 hover:bg-muted/50 transition-colors duration-200"
                        >
                          <div className="flex items-start justify-between gap-3 mb-1.5">
                            <h4 className="font-semibold text-foreground text-sm">
                              {threat.rule}
                            </h4>
                            <Badge className={`text-xs uppercase tracking-wide ${getSeverityBadge(threat.severity)}`}>
                              {threat.severity}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground leading-relaxed">
                            {threat.description}
                          </p>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                )}

                {/* Technical Details & Recommendations */}
                <div className="grid md:grid-cols-2 gap-6">
                  <Card className="glass-card">
                    <CardHeader>
                      <CardTitle className="text-sm font-semibold text-foreground flex items-center gap-2">
                        <Info className="h-4 w-4 text-primary" />
                        Technical Details
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      {Object.entries(scanResult.details).map(([key, value]) => (
                        <div key={key} className="flex justify-between py-2 border-b border-border/50 last:border-0">
                          <span className="text-sm text-muted-foreground">{key}</span>
                          <span className="text-sm font-medium text-foreground text-right max-w-[60%] truncate">
                            {value}
                          </span>
                        </div>
                      ))}
                    </CardContent>
                  </Card>

                  <Card className="glass-card">
                    <CardHeader>
                      <CardTitle className="text-sm font-semibold text-foreground flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-spsk-success" />
                        Recommendations
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2.5">
                      {scanResult.recommendations.map((rec, index) => (
                        <div key={index} className="flex items-start gap-2.5">
                          <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                          <p className="text-sm text-muted-foreground leading-relaxed">{rec}</p>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Email Header Analyzer Tab */}
        {activeTab === "email" && (
          <div className="space-y-8 animate-fade-in">
            <Card className="glass-card">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className="p-2.5 rounded-xl bg-primary/10 border border-primary/20">
                    <Mail className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-foreground">Email Header Analyzer</CardTitle>
                    <CardDescription>
                      Paste email headers to detect spoofing, SPF/DKIM/DMARC failures, and sender mismatches
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email-headers">Paste email headers</Label>
                  <Textarea
                    id="email-headers"
                    placeholder={"From: sender@example.com\nReturn-Path: <different@attacker.com>\nReceived-SPF: fail\nAuthentication-Results: dkim=fail; spf=fail; dmarc=fail"}
                    rows={8}
                    value={emailHeaders}
                    onChange={(e) => setEmailHeaders(e.target.value)}
                    className="bg-background border-border focus:border-primary font-mono text-xs resize-none"
                  />
                </div>
                <Button
                  onClick={handleEmailScan}
                  disabled={!emailHeaders.trim() || isScanning}
                  className="w-full spsk-gradient text-white font-medium shadow-md hover:shadow-lg"
                >
                  {isScanning ? (
                    <>
                      <Search className="mr-2 h-4 w-4 animate-spin" />
                      Analyzing…
                    </>
                  ) : (
                    <>
                      <Search className="mr-2 h-4 w-4" />
                      Analyze Headers
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>

            {/* Email Analysis Results */}
            {emailResult && (
              <div className="space-y-6 animate-fade-in">
                <Card className={`border ${
                  emailResult.riskLevel === "high" ? "bg-spsk-danger/10 border-spsk-danger/30" :
                  emailResult.riskLevel === "medium" ? "bg-spsk-warning/10 border-spsk-warning/30" :
                  "bg-spsk-success/10 border-spsk-success/30"
                }`}>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3">
                      {emailResult.riskLevel === "high" ? (
                        <AlertTriangle className="h-6 w-6 text-spsk-danger" />
                      ) : emailResult.riskLevel === "medium" ? (
                        <ShieldAlert className="h-6 w-6 text-spsk-warning" />
                      ) : (
                        <ShieldCheck className="h-6 w-6 text-spsk-success" />
                      )}
                      <div>
                        <p className={`text-lg font-bold ${
                          emailResult.riskLevel === "high" ? "text-spsk-danger" :
                          emailResult.riskLevel === "medium" ? "text-spsk-warning" :
                          "text-spsk-success"
                        }`}>
                          {emailResult.riskLevel === "high" ? "HIGH RISK — Likely Spoofed" :
                           emailResult.riskLevel === "medium" ? "MEDIUM RISK — Potential Issues" :
                           "LOW RISK — Appears Legitimate"}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {emailResult.spoofingIndicators.length} issue(s) detected
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <div className="grid md:grid-cols-2 gap-6">
                  {/* Indicators */}
                  <Card className="glass-card">
                    <CardHeader>
                      <CardTitle className="text-sm font-semibold text-foreground">
                        Spoofing Indicators
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      {emailResult.spoofingIndicators.length === 0 ? (
                        <p className="text-sm text-muted-foreground">No spoofing indicators detected.</p>
                      ) : (
                        emailResult.spoofingIndicators.map((indicator, index) => (
                          <div key={index} className="flex items-start gap-2.5 p-3 rounded-lg bg-spsk-danger/5 border border-spsk-danger/20">
                            <AlertTriangle className="h-4 w-4 text-spsk-danger mt-0.5 flex-shrink-0" />
                            <p className="text-sm text-foreground">{indicator}</p>
                          </div>
                        ))
                      )}
                    </CardContent>
                  </Card>

                  {/* Parsed Headers */}
                  <Card className="glass-card">
                    <CardHeader>
                      <CardTitle className="text-sm font-semibold text-foreground">
                        Parsed Headers
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      {Object.entries(emailResult.details).map(([key, value]) => (
                        <div key={key} className="flex justify-between py-2 border-b border-border/50 last:border-0">
                          <span className="text-sm text-muted-foreground font-medium">{key}</span>
                          <span className={`text-sm text-right max-w-[60%] truncate ${
                            value.toLowerCase().includes("fail") ? "text-spsk-danger font-medium" :
                            value.toLowerCase().includes("pass") ? "text-spsk-success font-medium" :
                            "text-foreground"
                          }`}>
                            {value}
                          </span>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ThreatDetector;
