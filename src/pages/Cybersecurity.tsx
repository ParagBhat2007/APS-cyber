import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Shield, Lock, AlertTriangle, Eye, Key, Globe, CheckCircle, XCircle } from "lucide-react";
import { useState } from "react";

const Cybersecurity = () => {
  const [currentQuiz, setCurrentQuiz] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState<Record<number, number>>({});
  const [showResults, setShowResults] = useState(false);

  const riskTopics = [
    {
      icon: AlertTriangle,
      title: "Phishing Attacks",
      description: "Learn to identify fraudulent emails, messages, and websites designed to steal your credentials.",
      level: "Critical",
      tips: ["Verify sender identity", "Check URLs carefully", "Don't click suspicious links", "Enable 2FA"]
    },
    {
      icon: Lock,
      title: "Password Security",
      description: "Best practices for creating and managing strong, unique passwords across all accounts.",
      level: "High",
      tips: ["Use password managers", "Enable MFA", "Avoid common passwords", "Regular updates"]
    },
    {
      icon: Globe,
      title: "Safe Browsing",
      description: "Navigate the internet securely while avoiding malicious websites and downloads.",
      level: "Medium",
      tips: ["HTTPS websites only", "Avoid suspicious downloads", "Use reputable browsers", "Ad blockers"]
    },
    {
      icon: Key,
      title: "Data Protection",
      description: "Safeguard personal and sensitive information from unauthorized access and breaches.",
      level: "High",
      tips: ["Regular backups", "Encrypt sensitive data", "Secure Wi-Fi", "Privacy settings"]
    }
  ];

  const quizQuestions = [
    {
      question: "Which of these is a sign of a phishing email?",
      options: [
        "Urgent action required with threats",
        "Generic greeting like 'Dear Customer'",
        "Suspicious links or attachments",
        "All of the above"
      ],
      correct: 3
    },
    {
      question: "What makes a password strong?",
      options: [
        "At least 8 characters long",
        "Mix of letters, numbers, and symbols",
        "Unique for each account",
        "All of the above"
      ],
      correct: 3
    },
    {
      question: "What should you do with suspicious attachments?",
      options: [
        "Open them to see what they contain",
        "Scan them with antivirus first",
        "Delete them immediately",
        "Forward them to colleagues for verification"
      ],
      correct: 2
    }
  ];

  const getLevelColor = (level: string) => {
    switch (level) {
      case "Critical": return "bg-destructive text-destructive-foreground";
      case "High": return "bg-cyber-blue text-white";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const handleQuizAnswer = (questionIndex: number, answerIndex: number) => {
    setQuizAnswers({ ...quizAnswers, [questionIndex]: answerIndex });
  };

  const submitQuiz = () => {
    setShowResults(true);
  };

  const getScore = () => {
    let correct = 0;
    quizQuestions.forEach((q, index) => {
      if (quizAnswers[index] === q.correct) correct++;
    });
    return correct;
  };

  return (
    <div className="min-h-screen py-20 px-6">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gradient">
            Cybersecurity Awareness
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Stay protected in the digital world with comprehensive security education, 
            threat awareness, and interactive learning tools.
          </p>
        </div>

        {/* Risk Topics Section */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold mb-8 text-center text-gradient">
            Learn the Risks
          </h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {riskTopics.map((topic, index) => (
              <Card key={index} className="glass-card neon-glow group">
                <CardHeader>
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 rounded-xl bg-gradient-to-r from-cyber-blue/20 to-cyber-cyan/20 border border-cyber-border group-hover:from-cyber-blue/30 group-hover:to-cyber-cyan/30 transition-all duration-300">
                      <topic.icon className="h-6 w-6 text-cyber-cyan" />
                    </div>
                    <Badge className={getLevelColor(topic.level)}>
                      {topic.level} Risk
                    </Badge>
                  </div>
                  <CardTitle className="text-xl text-foreground">
                    {topic.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-muted-foreground mb-4">
                    {topic.description}
                  </CardDescription>
                  <div className="space-y-2">
                    <h4 className="font-semibold text-sm text-cyber-cyan">Security Tips:</h4>
                    <ul className="space-y-1">
                      {topic.tips.map((tip, tipIndex) => (
                        <li key={tipIndex} className="flex items-center text-sm text-muted-foreground">
                          <CheckCircle className="h-3 w-3 text-cyber-cyan mr-2 flex-shrink-0" />
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

        {/* Interactive Quiz Section */}
        <section>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-gradient">
              Interactive Security Quiz
            </h2>
            <p className="text-lg text-muted-foreground">
              Test your cybersecurity knowledge with our gamified assessment
            </p>
          </div>

          <div className="glass-card p-8 max-w-4xl mx-auto neon-glow">
            {!showResults ? (
              <div className="space-y-8">
                {quizQuestions.map((question, qIndex) => (
                  <div key={qIndex} className="space-y-4">
                    <h3 className="text-lg font-semibold text-foreground">
                      {qIndex + 1}. {question.question}
                    </h3>
                    <div className="grid gap-3">
                      {question.options.map((option, oIndex) => (
                        <Button
                          key={oIndex}
                          variant={quizAnswers[qIndex] === oIndex ? "default" : "outline"}
                          className={`justify-start text-left h-auto p-4 ${
                            quizAnswers[qIndex] === oIndex 
                              ? "cyber-gradient text-cyber-dark" 
                              : "border-cyber-border hover:bg-cyber-blue/10"
                          }`}
                          onClick={() => handleQuizAnswer(qIndex, oIndex)}
                        >
                          <span className="mr-3 font-mono text-sm">
                            {String.fromCharCode(65 + oIndex)}.
                          </span>
                          {option}
                        </Button>
                      ))}
                    </div>
                  </div>
                ))}
                
                <div className="text-center pt-6">
                  <Button
                    onClick={submitQuiz}
                    disabled={Object.keys(quizAnswers).length !== quizQuestions.length}
                    className="cyber-gradient text-cyber-dark font-semibold px-8 py-3 neon-glow"
                  >
                    Submit Quiz
                  </Button>
                </div>
              </div>
            ) : (
              <div className="text-center space-y-6">
                <div className="p-6 rounded-2xl bg-gradient-to-r from-cyber-blue/20 to-cyber-cyan/20 border border-cyber-border">
                  <h3 className="text-2xl font-bold mb-2 text-foreground">
                    Quiz Results
                  </h3>
                  <p className="text-3xl font-bold text-gradient mb-4">
                    {getScore()} / {quizQuestions.length}
                  </p>
                  <p className="text-muted-foreground">
                    {getScore() === quizQuestions.length 
                      ? "Perfect! You have excellent cybersecurity awareness."
                      : getScore() >= 2
                      ? "Good job! Keep learning to improve your security knowledge."
                      : "Consider reviewing the security topics above to strengthen your defenses."
                    }
                  </p>
                </div>
                
                <div className="space-y-4">
                  {quizQuestions.map((question, qIndex) => (
                    <div key={qIndex} className="text-left p-4 rounded-xl border border-cyber-border">
                      <div className="flex items-center mb-2">
                        {quizAnswers[qIndex] === question.correct ? (
                          <CheckCircle className="h-5 w-5 text-cyber-cyan mr-2" />
                        ) : (
                          <XCircle className="h-5 w-5 text-destructive mr-2" />
                        )}
                        <span className="font-semibold">Question {qIndex + 1}</span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Correct answer: {question.options[question.correct]}
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
                  className="border-cyber-border text-cyber-cyan hover:bg-cyber-cyan hover:text-cyber-dark"
                >
                  Retake Quiz
                </Button>
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Cybersecurity;