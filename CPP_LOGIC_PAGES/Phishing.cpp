#include <bits/stdc++.h>
using namespace std;

bool isPhishing(const string &url) {
    string u = url;
    transform(u.begin(), u.end(), u.begin(), ::tolower);

    // 1. Check length
    if (u.length() > 75) return true;

    // 2. Check for '@'
    if (u.find('@') != string::npos) return true;

    // 3. Too many '-'
    if (count(u.begin(), u.end(), '-') > 3) return true;

    // 4. Check for IP address
    regex ip_pattern("http[s]?://(\\d+\\.\\d+\\.\\d+\\.\\d+)");
    if (regex_search(u, ip_pattern)) return true;

    // 5. No HTTPS
    if (u.rfind("https://", 0) != 0) return true;

    // 6. Suspicious keywords
    vector<string> badWords = {"login", "verify", "update", "bank", "secure", "account", "free"};
    for (auto &word : badWords) {
        if (u.find(word) != string::npos) return true;
    }

    // 7. Too many dots (subdomains)
    if (count(u.begin(), u.end(), '.') > 4) return true;

    // 8. Suspicious TLDs
    vector<string> badTLDs = {".xyz", ".top", ".tk", ".zip", ".ru"};
    for (auto &tld : badTLDs) {
        if (u.size() >= tld.size() && u.rfind(tld) == u.size() - tld.size())
            return true;
    }

    return false; // Looks safe
}

int main() {
    vector<string> testUrls = {
        "https://paypal.com",
        "http://192.168.0.1/login",
        "http://secure-login-paypal.tk/account/verify",
        "https://google.com",
        "http://example.com@phishing.com"
    };

    for (auto &url : testUrls) {
        cout << url << " -> " 
             << (isPhishing(url) ? "🚨 Phishing" : "✅ Safe") << endl;
    }

    return 0;
}
