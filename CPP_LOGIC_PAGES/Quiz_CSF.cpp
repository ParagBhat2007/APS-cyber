#include <iostream>
#include <vector>
#include <string>
using namespace std;

// Structure to hold quiz question
struct Question {
    string question;
    vector<string> options;
    int correct; // index of correct answer
};

int main() {
    // Cybersecurity Quiz Questions
    vector<Question> quiz = {
        {
            "Which of these is a sign of a phishing email?",
            {
                "Urgent action required with threats",
                "Generic greeting like 'Dear Customer'",
                "Suspicious links or attachments",
                "All of the above"
            },
            3
        },
        {
            "What makes a password strong?",
            {
                "At least 8 characters long",
                "Mix of letters, numbers, and symbols",
                "Unique for each account",
                "All of the above"
            },
            3
        },
        {
            "What should you do with suspicious attachments?",
            {
                "Open them to see what they contain",
                "Scan them with antivirus first",
                "Delete them immediately",
                "Forward them to colleagues for verification"
            },
            2
        }
    };

    int score = 0;
    int userAnswer;

    cout << "=== Cybersecurity Awareness Quiz ===\n\n";

    // Loop through questions
    for (int i = 0; i < quiz.size(); i++) {
        cout << "Q" << (i + 1) << ". " << quiz[i].question << "\n";

        // Show options
        for (int j = 0; j < quiz[i].options.size(); j++) {
            cout << "  " << (j + 1) << ". " << quiz[i].options[j] << "\n";
        }

        cout << "Your answer (1-" << quiz[i].options.size() << "): ";
        cin >> userAnswer;

        // Check correctness
        if (userAnswer - 1 == quiz[i].correct) {
            cout << "✅ Correct!\n\n";
            score++;
        } else {
            cout << "❌ Wrong! Correct answer: " 
                 << quiz[i].options[quiz[i].correct] << "\n\n";
        }
    }

    // Final score
    cout << "=== Quiz Completed! ===\n";
    cout << "Your Score: " << score << " / " << quiz.size() << "\n";

    if (score == quiz.size()) {
        cout << "Perfect! You have excellent cybersecurity awareness.\n";
    } else if (score >= 2) {
        cout << "Good job! Keep learning to improve your security knowledge.\n";
    } else {
        cout << "Consider reviewing cybersecurity topics to strengthen your defenses.\n";
    }

    return 0;
}
