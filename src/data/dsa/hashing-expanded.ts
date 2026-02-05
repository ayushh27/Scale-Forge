import { Article } from "@/hooks/useArticles";

export const HASHING_EXPANDED: Article = {
    id: "dsa-hashing-master",
    slug: "hashing-complete-guide",
    title: "Hashing & Hash Tables",
    description: "Hashing is a technique that maps data to a fixed-size value (hash) for ultra-fast O(1) lookups, insertions, and deletions.",
    category: "DSA",
    difficulty: "Intermediate",
    tags: ["Hashing", "Hash Table", "Hash Map", "Hash Set"],
    viewCount: 38000,
    updatedAt: "2026-02-05",
    author: "ScaleForge DSA Team",
    version: "2.0.0",
    prerequisites: ["arrays-complete-guide"],
    relatedTopics: ["strings-complete-guide", "trees"],
    content: `
# Hashing & Hash Tables

**Last Updated:** 05 Feb, 2026

Hashing is a technique that maps data of arbitrary size to fixed-size values (hash codes) for ultra-fast O(1) average-case lookups, insertions, and deletions. It's the secret behind dictionaries, sets, and database indexing.

## 📌 Introduction

### What Problem Does It Solve?

Hashing solves the problem of **fast data retrieval** without requiring sorted data or linear scans.

**Without Hashing:**
- Array search: O(n)
- Binary search (sorted): O(log n)

**With Hashing:**
- Hash table lookup: O(1) average case!

### Why It Matters in Real Systems

1. **Database Indexing**: Find records in milliseconds
2. **Caching**: Redis, Memcached use hash tables
3. **Unique Identification**: Git commits, blockchain
4. **Password Storage**: Secure hashing (bcrypt, SHA-256)
5. **Load Balancing**: Consistent hashing for server distribution

### Where Used in Industry

| Company | Use Case |
|---------|----------|
| **Google** | Search indexing, BigTable |
| **Facebook** | User ID lookups, friend graphs |
| **Amazon** | Product catalog, DynamoDB |
| **Redis** | In-memory key-value store |
| **Git** | Commit SHA hashing |

---

## 🧠 Concept Deep Dive

### Theory: Simple → Advanced

#### Level 1: Basic Understanding

**Hash Function**: Converts a key into an array index.

\`\`\`
Key → Hash Function → Index → Value

Example:
"John" → hash("John") → 42 → {name: "John", age: 30}

Hash Table:
Index | Value
------|-------
  0   | null
  1   | null
 ...  | ...
 42   | {name: "John", age: 30}
 ...  | ...
\`\`\`

**Core Operations:**
- \`put(key, value)\`: Insert/update
- \`get(key)\`: Retrieve value
- \`remove(key)\`: Delete entry
- \`contains(key)\`: Check existence

#### Level 2: Hash Function Design

**Good Hash Function Properties:**
1. **Deterministic**: Same input → same output
2. **Uniform Distribution**: Spreads keys evenly
3. **Fast Computation**: O(1) time
4. **Minimize Collisions**: Different keys → different hashes (ideally)

**Simple Hash Function (Integers):**
\`\`\`
hash(key) = key % table_size
\`\`\`

**String Hash Function (Polynomial Rolling):**
\`\`\`
hash(s) = (s[0] * p^0 + s[1] * p^1 + ... + s[n-1] * p^(n-1)) % m

Where:
- p = prime number (e.g., 31)
- m = table size
\`\`\`

#### Level 3: Collision Resolution

**Collision**: When two keys hash to the same index.

**Method 1: Chaining (Separate Chaining)**
\`\`\`
Index | Linked List
------|-------------
  0   | null
  1   | [key1, val1] → [key2, val2]
  2   | [key3, val3]
  3   | null
\`\`\`
- Each index stores a linked list
- Multiple keys can share same index
- Time: O(1 + α) where α = load factor

**Method 2: Open Addressing**

**Linear Probing:**
\`\`\`
If index i is occupied, try i+1, i+2, i+3, ...
\`\`\`

**Quadratic Probing:**
\`\`\`
If index i is occupied, try i+1², i+2², i+3², ...
\`\`\`

**Double Hashing:**
\`\`\`
hash2(key) = prime - (key % prime)
If index i is occupied, try i + j*hash2(key) for j=1,2,3,...
\`\`\`

### Load Factor & Rehashing

**Load Factor (α):**
\`\`\`
α = n / m
Where:
- n = number of elements
- m = table size
\`\`\`

**Rehashing:**
When α > threshold (typically 0.75):
1. Create new table (2× size)
2. Rehash all existing keys
3. Insert into new table

---

## ⏱️ Time & Space Analysis

### Operations Complexity

| Operation | Average Case | Worst Case | Notes |
|-----------|--------------|------------|-------|
| **Insert** | O(1) | O(n) | Worst: all keys collide |
| **Search** | O(1) | O(n) | Worst: all keys collide |
| **Delete** | O(1) | O(n) | Worst: all keys collide |
| **Space** | O(n) | O(n) | n = number of elements |

**Chaining vs Open Addressing:**

| Feature | Chaining | Open Addressing |
|---------|----------|-----------------|
| **Memory** | Extra for pointers | No extra pointers |
| **Cache** | Poor (scattered) | Better (contiguous) |
| **Load Factor** | Can exceed 1 | Must stay < 1 |
| **Deletion** | Easy | Complex (tombstones) |

### Trade-offs

**✅ When to Use Hash Tables:**
- Need O(1) lookups
- Keys are hashable
- Order doesn't matter
- Frequent insertions/deletions

**❌ When NOT to Use:**
- Need sorted order (use BST)
- Range queries (use BST)
- Memory is very limited
- Keys are not hashable

---

## 💻 Implementation

### C++ (Using STL)
\`\`\`cpp
#include <iostream>
#include <unordered_map>
#include <unordered_set>
using namespace std;

int main() {
    // Hash Map (unordered_map)
    unordered_map<string, int> map;
    
    // Insert
    map["apple"] = 5;
    map["banana"] = 3;
    map.insert({"orange", 7});
    
    // Access
    cout << map["apple"] << endl;  // 5
    
    // Check existence
    if (map.find("apple") != map.end()) {
        cout << "Found!" << endl;
    }
    
    // Delete
    map.erase("banana");
    
    // Iterate
    for (auto& [key, value] : map) {
        cout << key << ": " << value << endl;
    }
    
    // Hash Set (unordered_set)
    unordered_set<int> set;
    set.insert(10);
    set.insert(20);
    
    if (set.count(10)) {
        cout << "10 exists" << endl;
    }
    
    return 0;
}
\`\`\`

### Java
\`\`\`java
import java.util.*;

public class HashingExample {
    public static void main(String[] args) {
        // HashMap
        HashMap<String, Integer> map = new HashMap<>();
        
        // Insert
        map.put("apple", 5);
        map.put("banana", 3);
        
        // Access
        int count = map.get("apple");  // 5
        
        // Check existence
        if (map.containsKey("apple")) {
            System.out.println("Found!");
        }
        
        // Delete
        map.remove("banana");
        
        // Iterate
        for (Map.Entry<String, Integer> entry : map.entrySet()) {
            System.out.println(entry.getKey() + ": " + entry.getValue());
        }
        
        // HashSet
        HashSet<Integer> set = new HashSet<>();
        set.add(10);
        set.add(20);
        
        if (set.contains(10)) {
            System.out.println("10 exists");
        }
    }
}
\`\`\`

### Python
\`\`\`python
# Dictionary (built-in hash map)
map = {}

# Insert
map["apple"] = 5
map["banana"] = 3

# Access
count = map["apple"]  # 5
count = map.get("orange", 0)  # 0 (default)

# Check existence
if "apple" in map:
    print("Found!")

# Delete
del map["banana"]
# or
map.pop("banana", None)

# Iterate
for key, value in map.items():
    print(f"{key}: {value}")

# Set (built-in hash set)
s = set()
s.add(10)
s.add(20)

if 10 in s:
    print("10 exists")

# Counter (frequency map)
from collections import Counter
counter = Counter([1, 2, 2, 3, 3, 3])
print(counter)  # Counter({3: 3, 2: 2, 1: 1})
\`\`\`

### JavaScript/TypeScript
\`\`\`typescript
// Map (ES6)
const map = new Map<string, number>();

// Insert
map.set("apple", 5);
map.set("banana", 3);

// Access
const count = map.get("apple");  // 5

// Check existence
if (map.has("apple")) {
    console.log("Found!");
}

// Delete
map.delete("banana");

// Iterate
for (const [key, value] of map) {
    console.log(\`\${key}: \${value}\`);
}

// Set (ES6)
const set = new Set<number>();
set.add(10);
set.add(20);

if (set.has(10)) {
    console.log("10 exists");
}

// Object as hash map (traditional)
const obj: Record<string, number> = {};
obj["apple"] = 5;
obj["banana"] = 3;
\`\`\`

### Custom Hash Table (Chaining)
\`\`\`python
class HashTable:
    def __init__(self, size=10):
        self.size = size
        self.table = [[] for _ in range(size)]
    
    def _hash(self, key):
        """Simple hash function"""
        return hash(key) % self.size
    
    def put(self, key, value):
        """Insert or update key-value pair"""
        index = self._hash(key)
        
        # Update if key exists
        for i, (k, v) in enumerate(self.table[index]):
            if k == key:
                self.table[index][i] = (key, value)
                return
        
        # Insert new key
        self.table[index].append((key, value))
    
    def get(self, key):
        """Retrieve value by key"""
        index = self._hash(key)
        
        for k, v in self.table[index]:
            if k == key:
                return v
        
        raise KeyError(f"Key {key} not found")
    
    def remove(self, key):
        """Delete key-value pair"""
        index = self._hash(key)
        
        for i, (k, v) in enumerate(self.table[index]):
            if k == key:
                del self.table[index][i]
                return
        
        raise KeyError(f"Key {key} not found")
    
    def __str__(self):
        result = []
        for i, bucket in enumerate(self.table):
            if bucket:
                result.append(f"Index {i}: {bucket}")
        return "\\n".join(result)

# Usage
ht = HashTable()
ht.put("apple", 5)
ht.put("banana", 3)
print(ht.get("apple"))  # 5
\`\`\`

---

## 🏢 Real-World Usage

### System Examples

#### 1. **Two Sum Problem**
\`\`\`python
def two_sum(nums, target):
    """
    Find two numbers that add up to target
    Time: O(n), Space: O(n)
    """
    seen = {}  # value -> index
    
    for i, num in enumerate(nums):
        complement = target - num
        if complement in seen:
            return [seen[complement], i]
        seen[num] = i
    
    return []

print(two_sum([2, 7, 11, 15], 9))  # [0, 1]
\`\`\`

#### 2. **LRU Cache**
\`\`\`python
from collections import OrderedDict

class LRUCache:
    def __init__(self, capacity):
        self.cache = OrderedDict()
        self.capacity = capacity
    
    def get(self, key):
        if key not in self.cache:
            return -1
        
        # Move to end (most recently used)
        self.cache.move_to_end(key)
        return self.cache[key]
    
    def put(self, key, value):
        if key in self.cache:
            self.cache.move_to_end(key)
        
        self.cache[key] = value
        
        if len(self.cache) > self.capacity:
            # Remove least recently used (first item)
            self.cache.popitem(last=False)
\`\`\`

#### 3. **Anagram Grouping**
\`\`\`javascript
function groupAnagrams(strs) {
    const map = new Map();
    
    for (const str of strs) {
        // Sort string as key
        const key = str.split('').sort().join('');
        
        if (!map.has(key)) {
            map.set(key, []);
        }
        map.get(key).push(str);
    }
    
    return Array.from(map.values());
}

console.log(groupAnagrams(["eat", "tea", "tan", "ate", "nat", "bat"]));
// [["eat","tea","ate"], ["tan","nat"], ["bat"]]
\`\`\`

#### 4. **Consistent Hashing (Load Balancing)**
\`\`\`python
import hashlib

class ConsistentHash:
    def __init__(self, nodes, virtual_nodes=150):
        self.virtual_nodes = virtual_nodes
        self.ring = {}
        self.sorted_keys = []
        
        for node in nodes:
            self.add_node(node)
    
    def _hash(self, key):
        return int(hashlib.md5(key.encode()).hexdigest(), 16)
    
    def add_node(self, node):
        for i in range(self.virtual_nodes):
            virtual_key = f"{node}:{i}"
            hash_val = self._hash(virtual_key)
            self.ring[hash_val] = node
            self.sorted_keys.append(hash_val)
        
        self.sorted_keys.sort()
    
    def get_node(self, key):
        if not self.ring:
            return None
        
        hash_val = self._hash(key)
        
        # Find first node >= hash_val
        for ring_key in self.sorted_keys:
            if ring_key >= hash_val:
                return self.ring[ring_key]
        
        # Wrap around
        return self.ring[self.sorted_keys[0]]

# Usage
ch = ConsistentHash(["server1", "server2", "server3"])
print(ch.get_node("user123"))  # Routes to a server
\`\`\`

---

## 🎯 Interview Angle

### Common Traps

1. **Hash Collision Handling**
   \`\`\`python
   # ❌ Wrong - assumes no collisions
   def put(key, value):
       index = hash(key) % size
       table[index] = value  # Overwrites!
   
   # ✅ Correct - handle collisions
   def put(key, value):
       index = hash(key) % size
       if table[index] is None:
           table[index] = []
       table[index].append((key, value))
   \`\`\`

2. **Mutable Keys**
   \`\`\`python
   # ❌ Wrong - list is mutable
   d = {}
   key = [1, 2, 3]
   d[key] = "value"  # TypeError: unhashable type: 'list'
   
   # ✅ Correct - use immutable types
   d = {}
   key = (1, 2, 3)  # tuple
   d[key] = "value"
   \`\`\`

3. **Default Values**
   \`\`\`python
   # ❌ Wrong - KeyError if missing
   count = map[key]
   
   # ✅ Correct - use get with default
   count = map.get(key, 0)
   \`\`\`

### Question Variations

| Pattern | Example Problem | Key Technique |
|---------|----------------|---------------|
| **Frequency Count** | Top K Frequent Elements | HashMap + heap |
| **Anagrams** | Group Anagrams | Sorted string as key |
| **Two Pointers + Hash** | Two Sum | Store complements |
| **Sliding Window + Hash** | Longest Substring | Character frequency |
| **Design** | LRU Cache | HashMap + doubly linked list |

### Interview Pro Tips

1. **Always clarify:**
   - Can keys be null?
   - Are keys case-sensitive?
   - What's the expected size?
   - Can I use built-in hash map?

2. **Common optimizations:**
   - Use Counter for frequency
   - Use defaultdict to avoid key checks
   - Use set for existence checks only

3. **Edge cases:**
   - Empty input
   - Single element
   - All same elements
   - Null/None keys

---

## 📝 Practice Problems

### Easy
1. **Two Sum** - Hash map for complements
2. **Contains Duplicate** - Hash set
3. **Valid Anagram** - Frequency count
4. **Intersection of Two Arrays** - Hash set
5. **First Unique Character** - Frequency map

### Medium
1. **Group Anagrams** - Sorted string as key
2. **Top K Frequent Elements** - HashMap + heap
3. **Longest Substring Without Repeating** - Sliding window + set
4. **Subarray Sum Equals K** - Prefix sum + hash map
5. **4Sum II** - Split into two pairs
6. **Design HashMap** - Implement from scratch
7. **LRU Cache** - HashMap + doubly linked list

### Hard
1. **Longest Consecutive Sequence** - Hash set + greedy
2. **Substring with Concatenation of All Words** - Sliding window + hash
3. **Minimum Window Substring** - Sliding window + frequency map
4. **Max Points on a Line** - Slope as hash key
5. **Alien Dictionary** - Topological sort + hash

---

## 🔗 Additional Resources

- [Visualize Hashing](https://visualgo.net/en/hashtable)
- [LeetCode Hash Table Problems](https://leetcode.com/tag/hash-table/)
- [Hash Function Design](https://en.wikipedia.org/wiki/Hash_function)

---

## 📚 Next Steps

After mastering hashing:
1. **Trees** - BST for ordered data
2. **Tries** - Prefix-based hashing
3. **Bloom Filters** - Probabilistic hashing
4. **Consistent Hashing** - Distributed systems

---

*Remember: Hashing is the art of trading space for speed. Master it, and you unlock O(1) superpowers.*
    `
};
