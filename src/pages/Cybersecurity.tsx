import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Shield, Lock, AlertTriangle, Eye, Key, Globe, CheckCircle, XCircle } from "lucide-react";
import { useState } from "react";

const PHISHING_IMAGE = "https://images.unsplash.com/photo-1563986768609-322da13575f2?auto=format&fit=crop&w=800&q=80";

const Cybersecurity = () => {
  const [quizAnswers, setQuizAnswers] = useState<Record<number, number>>({});
  const [showResults, setShowResults] = useState(false);

  const riskTopics = [
    {
      icon: AlertTriangle,
      title: "Phishing Attacks",
      description: "Learn to identify fraudulent emails, messages, and websites designed to steal your credentials.",
      level: "Critical",
      tips: ["Verify sender identity", "Check URLs carefully", "Don't click suspicious links", "Enable 2FA"],
    },
    {
      icon: Lock,
      title: "Password Security",
      description: "Best practices for creating and managing strong, unique passwords across all accounts.",
      level: "High",
      tips: ["Use password managers", "Enable MFA", "Avoid common passwords", "Regular updates"],
    },
    {
      icon: Globe,
      title: "Safe Browsing",
      description: "Navigate the internet securely while avoiding malicious websites and downloads.",
      level: "Medium",
      tips: ["HTTPS websites only", "Avoid suspicious downloads", "Use reputable browsers", "Ad blockers"],
    },
    {
      icon: Key,
      title: "Data Protection",
      description: "Safeguard personal and sensitive information from unauthorized access and breaches.",
      level: "High",
      tips: ["Regular backups", "Encrypt sensitive data", "Secure Wi-Fi", "Privacy settings"],
    },
  ];

  const quizQuestions = [
    {
      question: "Which of these is a sign of a phishing email?",
      options: [
        "Urgent action required with threats",
        "Generic greeting like 'Dear Customer'",
        "Suspicious links or attachments",
        "All of the above",
      ],
      correct: 3,
    },
    {
      question: "What makes a password strong?",
      options: [
        "At least 8 characters long",
        "Mix of letters, numbers, and symbols",
        "Unique for each account",
        "All of the above",
      ],
      correct: 3,
    },
    {
      question: "What should you do with suspicious attachments?",
      options: [
        "Open them to see what they contain",
        "Scan them with antivirus first",
        "Delete them immediately",
        "Forward them to colleagues for verification",
      ],
      correct: 2,
    },
    {
      question: "A URL starts with 'http://' instead of 'https://'. What does this mean?",
      options: [
        "The site is completely safe",
        "The connection is not encrypted",
        "The site loads faster",
        "Nothing important",
      ],
      correct: 1,
    },
    {
      question: "You receive an email from 'support@paypa1.com' (note the '1'). What should you do?",
      options: [
        "Click the link to check your account",
        "Reply asking if it's legitimate",
        "Recognize it as a homoglyph attack and delete it",
        "Forward it to friends as a warning",
      ],
      correct: 2,
    },
  ];

  const getLevelStyles = (level: string) => {
    switch (level) {
      case "Critical":
        return "bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-300";
      case "High":
        return "bg-orange-100 text-orange-800 dark:bg-orange-900/40 dark:text-orange-300";
      default:
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300";
    }
  };

  const handleQuizAnswer = (questionIndex: number, answerIndex: number) => {
    setQuizAnswers({ ...quizAnswers, [questionIndex]: answerIndex });
  };

  const submitQuiz = () => setShowResults(true);

  const getScore = () => {
    let correct = 0;
    quizQuestions.forEach((q, index) => {
      if (quizAnswers[index] === q.correct) correct++;
    });
    return correct;
  };

  return (
    <div className="min-h-screen py-16 px-6">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-6">
            <Shield className="h-4 w-4" />
            Security Education
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
            Cybersecurity <span className="text-gradient">Awareness</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Stay protected in the digital world with comprehensive security education,
            threat awareness, and interactive learning tools.
          </p>
        </div>

        {/* Hero Image */}
        <div className="mb-20 rounded-2xl overflow-hidden border border-border shadow-lg">
          <img
            src={PHISHING_IMAGE}
            alt="Cybersecurity concept"
            className="w-full h-64 md:h-80 object-cover"
          />
        </div>

        {/* Risk Topics */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold mb-8 text-center text-foreground">
            Know the <span className="text-gradient">Risks</span>
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {riskTopics.map((topic, index) => (
              <Card key={index} className="glass-card group animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <CardHeader>
                  <div className="flex items-center justify-between mb-3">
                    <div className="p-3 rounded-xl bg-primary/10 border border-primary/20 group-hover:bg-primary/15 transition-all duration-300">
                      <topic.icon className="h-5 w-5 text-primary" />
                    </div>
                    <Badge className={getLevelStyles(topic.level)}>
                      {topic.level} Risk
                    </Badge>
                  </div>
                  <CardTitle className="text-lg text-foreground">{topic.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-muted-foreground mb-4">
                    {topic.description}
                  </CardDescription>
                  <div className="space-y-1.5">
                    <h4 className="font-semibold text-xs text-primary uppercase tracking-wider">Security Tips</h4>
                    <ul className="space-y-1">
                      {topic.tips.map((tip, tipIndex) => (
                        <li key={tipIndex} className="flex items-center text-sm text-muted-foreground">
                          <CheckCircle className="h-3 w-3 text-spsk-success mr-2 flex-shrink-0" />
                          {tip}
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Interactive Quiz */}
        <section>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-foreground">
              Security <span className="text-gradient">Quiz</span>
            </h2>
            <p className="text-muted-foreground">
              Test your cybersecurity knowledge with our interactive assessment
            </p>
          </div>

          <Card className="glass-card max-w-4xl mx-auto">
            <CardContent className="p-8">
              {!showResults ? (
                <div className="space-y-8">
                  {quizQuestions.map((question, qIndex) => (
                    <div key={qIndex} className="space-y-3 animate-fade-in" style={{ animationDelay: `${qIndex * 0.1}s` }}>
                      <h3 className="text-base font-semibold text-foreground">
                        {qIndex + 1}. {question.question}
                      </h3>
                      <div className="grid gap-2">
                        {question.options.map((option, oIndex) => (
                          <Button
                            key={oIndex}
                            variant={quizAnswers[qIndex] === oIndex ? "default" : "outline"}
                            className={`justify-start text-left h-auto p-3.5 text-sm ${
                              quizAnswers[qIndex] === oIndex
                                ? "spsk-gradient text-white border-transparent"
                                : "border-border hover:border-primary/30 hover:bg-primary/5"
                            }`}
                            onClick={() => handleQuizAnswer(qIndex, oIndex)}
                          >
                            <span className="mr-3 font-mono text-xs opacity-60">
                              {String.fromCharCode(65 + oIndex)}.
                            </span>
                            {option}
                          </Button>
                        ))}
                      </div>
                    </div>
                  ))}

                  <div className="text-center pt-4">
                    <Button
                      onClick={submitQuiz}
                      disabled={Object.keys(quizAnswers).length !== quizQuestions.length}
                      className="spsk-gradient text-white font-semibold px-10 py-3 shadow-md hover:shadow-lg"
                    >
                      Submit Quiz
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="text-center space-y-6 animate-fade-in">
                  <div className="p-8 rounded-2xl bg-primary/5 border border-primary/20">
                    <h3 className="text-2xl font-bold mb-2 text-foreground">Quiz Results</h3>
                    <p className="text-4xl font-bold text-gradient mb-4">
                      {getScore()} / {quizQuestions.length}
                    </p>
                    <p className="text-muted-foreground">
                      {getScore() === quizQuestions.length
                        ? "🎉 Perfect! You have excellent cybersecurity awareness."
                        : getScore() >= 3
                        ? "👍 Good job! Keep learning to sharpen your security instincts."
                        : "📚 Review the security topics above to strengthen your defenses."}
                    </p>
                  </div>

                  <div className="space-y-3 text-left">
                    {quizQuestions.map((question, qIndex) => (
                      <div
                        key={qIndex}
                        className={`p-4 rounded-xl border ${
                          quizAnswers[qIndex] === question.correct
                            ? "border-spsk-success/30 bg-spsk-success/5"
                            : "border-spsk-danger/30 bg-spsk-danger/5"
                        }`}
                      >
                        <div className="flex items-center mb-1.5">
                          {quizAnswers[qIndex] === question.correct ? (
                            <CheckCircle className="h-4 w-4 text-spsk-success mr-2" />
                          ) : (
                            <XCircle className="h-4 w-4 text-spsk-danger mr-2" />
                          )}
                          <span className="font-medium text-sm text-foreground">
                            Q{qIndex + 1}: {question.question}
                          </span>
                        </div>
                        <p className="text-xs text-muted-foreground ml-6">
                          Correct: {question.options[question.correct]}
                        </p>
                      </div>
                    ))}
                  </div>

                  <Button
                    onClick={() => {
                      setShowResults(false);
                      setQuizAnswers({});
                    }}
                    variant="outline"
                    className="border-border hover:border-primary hover:bg-primary/5"
                  >
                    Retake Quiz
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
};

export default Cybersecurity;