import { Article } from "@/hooks/useArticles";

export const STRINGS_EXPANDED: Article = {
    id: "dsa-strings-master",
    slug: "strings-complete-guide",
    title: "String Data Structure",
    description: "A string is a sequence of characters. It is a fundamental data structure used to represent text.",
    category: "DSA",
    difficulty: "Beginner",
    tags: ["Strings", "Data Structures", "Text Processing"],
    viewCount: 28000,
    updatedAt: "2026-02-05",
    author: "ScaleForge DSA Team",
    version: "2.0.0",
    prerequisites: ["arrays-complete-guide"],
    relatedTopics: ["dsa-arrays-master", "dsa-hashing", "pattern-matching"],
    content: `
# String Data Structure

**Last Updated:** 05 Feb, 2026

A string is a sequence of characters. It is a fundamental data structure used to represent text in programming. Strings are essentially arrays of characters with special operations and properties.

## 📌 Introduction

### What Problem Does It Solve?

Strings solve the problem of **representing and manipulating textual data**. From user input to file processing, strings are everywhere in software development.

**Real-World Examples:**
- **User Authentication**: Username and password validation
- **Search Engines**: Query processing and text matching
- **DNA Sequencing**: Genetic pattern matching
- **Text Editors**: Document manipulation and formatting

### Why It Matters in Real Systems

1. **Text Processing**: Core to every application that handles user input
2. **Data Serialization**: JSON, XML, CSV all use string representations
3. **Communication**: Network protocols, APIs, and messages
4. **Pattern Matching**: Search, validation, and data extraction

### Where Used in Industry

| Company | Use Case |
|---------|----------|
| **Google** | Search query processing, autocomplete |
| **Facebook** | Message processing, content moderation |
| **Stripe** | Payment validation, API keys |
| **Spotify** | Song title search, lyrics processing |
| **Grammarly** | Text analysis and correction |

---

## 🧠 Concept Deep Dive

### Theory: Simple → Advanced

#### Level 1: Basic Understanding

A string is a **sequence of characters** stored in memory.

\`\`\`
String: "HELLO"
Index:   0 1 2 3 4
Chars:  [H][E][L][L][O]
\`\`\`

**Key Properties:**
- **Immutable** (in most languages like Java, Python, JavaScript)
- **Zero-indexed** access
- **Length** property/method
- **Character encoding** (ASCII, UTF-8, UTF-16)

#### Level 2: Immutability Concept

**Immutable Strings:**
When you modify a string, you're actually creating a new string.

\`\`\`javascript
let str = "Hello";
str = str + " World";  // Creates NEW string, doesn't modify original
\`\`\`

**Memory Impact:**
\`\`\`
Original: "Hello"     [Memory Address: 1000]
New:      "Hello World" [Memory Address: 2000]
// Old string at 1000 is garbage collected
\`\`\`

**Why Immutable?**
- **Thread Safety**: Multiple threads can read without locks
- **Caching**: String literals can be reused (String Pool)
- **Security**: Prevents modification of sensitive data

#### Level 3: String Encoding

**ASCII vs UTF-8 vs UTF-16:**

| Encoding | Bytes/Char | Range | Example |
|----------|-----------|-------|---------|
| ASCII | 1 | 0-127 | 'A' = 65 |
| UTF-8 | 1-4 | All Unicode | 'A' = 65, '😀' = 4 bytes |
| UTF-16 | 2-4 | All Unicode | JavaScript default |

**Important for Interviews:**
\`\`\`javascript
"Hello".length;     // 5
"Hello😀".length;   // 7 in JavaScript (counts UTF-16 code units)
\`\`\`

### Edge Cases

1. **Empty String**: \`""\` - length is 0, not null
2. **Single Character**: \`"A"\` - still a string, not a char (in some languages)
3. **Whitespace**: \`" "\` - valid string with length 1
4. **Special Characters**: Escape sequences like \`"\\n"\`, \`"\\t"\`
5. **Unicode**: Emojis and special symbols may take multiple bytes

---

## ⏱️ Time & Space Analysis

### Operations Complexity

| Operation | Best Case | Average Case | Worst Case | Space |
|-----------|-----------|--------------|------------|-------|
| **Access** | O(1) | O(1) | O(1) | O(1) |
| **Search** | O(1) | O(n) | O(n) | O(1) |
| **Concatenation** | O(n) | O(n) | O(n) | O(n) |
| **Substring** | O(k) | O(k) | O(k) | O(k) |
| **Replace** | O(n) | O(n) | O(n) | O(n) |
| **Split** | O(n) | O(n) | O(n) | O(n) |

*n = string length, k = substring length*

### Trade-offs

**✅ When to Use Strings:**
- Representing text data
- User input/output
- Configuration and settings
- API responses (JSON)

**❌ When NOT to Use Strings:**
- Frequent modifications (use StringBuilder/StringBuffer)
- Binary data (use byte arrays)
- Large text processing (use streams)

---

## 💻 Implementation

### Pseudocode: String Reversal

\`\`\`
ALGORITHM: Reverse String
INPUT: string s
OUTPUT: reversed string

1. IF s is empty THEN
2.     RETURN s
3. END IF
4. 
5. left = 0
6. right = s.length - 1
7. result = array of characters from s
8. 
9. WHILE left < right DO
10.     SWAP result[left] with result[right]
11.     left = left + 1
12.     right = right - 1
13. END WHILE
14. 
15. RETURN result as string
\`\`\`

### Language-wise Examples

#### C++
\`\`\`cpp
#include <iostream>
#include <string>
#include <algorithm>
using namespace std;

int main() {
    // String declaration
    string str = "Hello World";
    
    // Access
    cout << str[0] << endl;  // 'H'
    
    // Length
    cout << str.length() << endl;  // 11
    
    // Concatenation
    string str2 = str + "!";
    
    // Substring
    string sub = str.substr(0, 5);  // "Hello"
    
    // Find
    size_t pos = str.find("World");  // 6
    
    // Reverse (in-place)
    reverse(str.begin(), str.end());
    
    // Character array conversion
    const char* cstr = str.c_str();
    
    return 0;
}
\`\`\`

#### Java
\`\`\`java
public class StringExample {
    public static void main(String[] args) {
        // String declaration (immutable)
        String str = "Hello World";
        
        // Access
        char ch = str.charAt(0);  // 'H'
        
        // Length
        int len = str.length();  // 11
        
        // Concatenation (creates new string)
        String str2 = str + "!";
        
        // Substring
        String sub = str.substring(0, 5);  // "Hello"
        
        // Find
        int pos = str.indexOf("World");  // 6
        
        // Replace
        String replaced = str.replace("World", "Java");
        
        // Split
        String[] words = str.split(" ");
        
        // StringBuilder for efficient concatenation
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < 1000; i++) {
            sb.append("a");  // O(1) amortized
        }
        String result = sb.toString();
    }
}
\`\`\`

#### Python
\`\`\`python
# String declaration (immutable)
s = "Hello World"

# Access
print(s[0])      # 'H'
print(s[-1])     # 'd' (negative indexing)

# Length
print(len(s))    # 11

# Concatenation
s2 = s + "!"

# Substring (slicing)
sub = s[0:5]     # "Hello"
sub2 = s[:5]     # "Hello" (same)
sub3 = s[6:]     # "World"

# Find
pos = s.find("World")  # 6
pos2 = s.index("World")  # 6 (raises error if not found)

# Replace
replaced = s.replace("World", "Python")

# Split
words = s.split(" ")  # ['Hello', 'World']

# Join
joined = "-".join(words)  # "Hello-World"

# Reverse
reversed_s = s[::-1]

# String methods
print(s.upper())      # "HELLO WORLD"
print(s.lower())      # "hello world"
print(s.startswith("Hello"))  # True
print(s.endswith("World"))    # True
\`\`\`

#### JavaScript/TypeScript
\`\`\`typescript
// String declaration (immutable)
const str: string = "Hello World";

// Access
console.log(str[0]);      // 'H'
console.log(str.charAt(0)); // 'H'

// Length
console.log(str.length);  // 11

// Concatenation
const str2 = str + "!";
const str3 = \`\${str}!\`;  // Template literal

// Substring
const sub = str.substring(0, 5);  // "Hello"
const sub2 = str.slice(0, 5);     // "Hello"

// Find
const pos = str.indexOf("World");  // 6
const includes = str.includes("World");  // true

// Replace
const replaced = str.replace("World", "JS");
const replacedAll = str.replaceAll("l", "L");

// Split
const words = str.split(" ");  // ['Hello', 'World']

// Join
const joined = words.join("-");  // "Hello-World"

// Modern methods
const upper = str.toUpperCase();
const lower = str.toLowerCase();
const trimmed = "  hello  ".trim();
const padded = "5".padStart(3, "0");  // "005"
\`\`\`

---

## 🏢 Real-World Usage

### System Examples

#### 1. **Email Validation**
\`\`\`python
import re

def is_valid_email(email: str) -> bool:
    pattern = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$'
    return re.match(pattern, email) is not None

print(is_valid_email("user@example.com"))  # True
print(is_valid_email("invalid.email"))     # False
\`\`\`

#### 2. **URL Parsing**
\`\`\`javascript
const url = "https://example.com/path?query=value#hash";

const parts = {
    protocol: url.split("://")[0],        // "https"
    domain: url.split("/")[2],            // "example.com"
    path: url.split("?")[0].split("/").slice(3).join("/"),
    query: url.split("?")[1]?.split("#")[0],
    hash: url.split("#")[1]
};
\`\`\`

#### 3. **Log Parsing**
\`\`\`java
String log = "2026-02-05 14:30:00 ERROR Database connection failed";
String[] parts = log.split(" ", 4);

String date = parts[0];
String time = parts[1];
String level = parts[2];
String message = parts[3];
\`\`\`

### Where Companies Use It

**Password Hashing (Security):**
\`\`\`python
import hashlib

def hash_password(password: str) -> str:
    # Add salt for security
    salt = "random_salt_value"
    salted = password + salt
    return hashlib.sha256(salted.encode()).hexdigest()
\`\`\`

---

## 🎯 Interview Angle

### Common Traps

1. **String Concatenation in Loop**
   \`\`\`java
   // ❌ Wrong - O(n²) time
   String result = "";
   for (int i = 0; i < n; i++) {
       result += "a";  // Creates new string each time
   }
   
   // ✅ Correct - O(n) time
   StringBuilder sb = new StringBuilder();
   for (int i = 0; i < n; i++) {
       sb.append("a");
   }
   String result = sb.toString();
   \`\`\`

2. **String Comparison**
   \`\`\`java
   // ❌ Wrong - compares references
   String s1 = new String("hello");
   String s2 = new String("hello");
   if (s1 == s2) { }  // false
   
   // ✅ Correct - compares content
   if (s1.equals(s2)) { }  // true
   \`\`\`

3. **Null vs Empty**
   \`\`\`javascript
   // ❌ Wrong - will throw error if null
   if (str.length === 0) { }
   
   // ✅ Correct - check null first
   if (str && str.length === 0) { }
   \`\`\`

### Question Variations

| Pattern | Example Problem | Key Technique |
|---------|----------------|---------------|
| **Two Pointers** | Valid Palindrome | Start/end pointers |
| **Sliding Window** | Longest Substring Without Repeating | Hash set + window |
| **HashMap** | Anagram Detection | Character frequency count |
| **Stack** | Valid Parentheses | Push/pop matching pairs |
| **KMP Algorithm** | Pattern Matching | Prefix function |

### Interview Pro Tips

1. **Always clarify:**
   - Is the string ASCII or Unicode?
   - Can it be empty or null?
   - Is it case-sensitive?
   - Can I modify in-place?

2. **Common optimizations:**
   - Use character array for in-place modifications
   - Use StringBuilder for concatenations
   - Use HashSet for O(1) lookups

3. **Edge cases to test:**
   - Empty string: \`""\`
   - Single character: \`"a"\`
   - All same characters: \`"aaaa"\`
   - Special characters: \`"!@#$%"\`

---

## 📝 Practice Problems

### Easy
1. **Reverse String** - Two pointers
2. **Valid Palindrome** - Two pointers + character filtering
3. **First Unique Character** - Hash map
4. **Valid Anagram** - Sorting or frequency count
5. **Implement strStr()** - Pattern matching

### Medium
1. **Longest Substring Without Repeating Characters** - Sliding window
2. **Longest Palindromic Substring** - Expand around center
3. **Group Anagrams** - Hash map with sorted key
4. **String to Integer (atoi)** - State machine
5. **Zigzag Conversion** - Pattern simulation
6. **Decode String** - Stack
7. **Minimum Window Substring** - Sliding window + hash map

### Hard
1. **Longest Valid Parentheses** - Stack or DP
2. **Edit Distance** - Dynamic programming
3. **Regular Expression Matching** - DP or recursion
4. **Wildcard Matching** - DP
5. **Distinct Subsequences** - DP

---

## 🔗 Additional Resources

- [Visualize String Operations](https://visualgo.net/en/string)
- [LeetCode String Problems](https://leetcode.com/tag/string/)
- [String Algorithms](https://cp-algorithms.com/string/)

---

## 📚 Next Steps

After mastering strings, proceed to:
1. **Hashing** - Efficient string lookups and comparisons
2. **Trie** - Prefix tree for string storage
3. **Pattern Matching** - KMP, Rabin-Karp algorithms
4. **Regular Expressions** - Advanced pattern matching

---

*Remember: Strings are not just text — they're the bridge between human language and machine processing. Master them, and you master communication in code.*
    `
};
