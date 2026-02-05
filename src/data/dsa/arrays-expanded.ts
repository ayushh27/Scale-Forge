import { Article } from "@/hooks/useArticles";

export const ARRAYS_EXPANDED: Article = {
    id: "dsa-arrays-master",
    slug: "arrays-complete-guide",
    title: "Array Data Structure",
    description: "An array is a fundamental and linear data structure that stores items at contiguous locations.",
    category: "DSA",
    difficulty: "Beginner",
    tags: ["Arrays", "Data Structures", "Fundamentals"],
    viewCount: 25000,
    updatedAt: "2026-02-05",
    author: "ScaleForge DSA Team",
    version: "2.0.0",
    prerequisites: [],
    relatedTopics: ["dsa-strings-exhaustive", "dsa-sliding-window-exhaustive", "dsa-two-pointers"],
    content: `
# Array Data Structure

**Last Updated:** 22 Jan, 2026

An array is a fundamental and linear data structure that stores items at contiguous locations. Note that in case of C/C++ and Java-Primitive-Arrays, actual elements are stored at contiguous locations. And in case of Python, JS, Java-Non-Primitive, references are stored at contiguous locations. It offers mainly the following advantages over other data structures:

## 📌 Introduction

### What Problem Does It Solve?

Arrays solve the fundamental problem of **organizing and accessing multiple related data items efficiently**. Without arrays, you would need separate variables for each piece of data, making it impossible to work with large datasets.

**Example Problem:**
\`\`\`
// Without arrays (impractical)
let student1 = "Alice";
let student2 = "Bob";
let student3 = "Charlie";
// ... imagine 1000 students!

// With arrays (scalable)
let students = ["Alice", "Bob", "Charlie", ...];
\`\`\`

### Why It Matters in Real Systems

Arrays are the **backbone of modern computing**:

1. **Memory Efficiency**: Contiguous storage means predictable memory layout
2. **Cache Performance**: CPU cache lines load adjacent memory, making array traversal extremely fast
3. **Foundation for Other Structures**: Stacks, Queues, Hash Tables, and even Strings are built on arrays

### Where Used in Industry

| Company | Use Case |
|---------|----------|
| **Google** | Search result ranking (array of scored documents) |
| **Netflix** | Video frame buffers, recommendation lists |
| **Amazon** | Product catalog indexing, shopping cart items |
| **Facebook** | News feed posts, friend lists |
| **Trading Firms** | High-frequency tick data (price arrays) |

---

## 🧠 Concept Deep Dive

### Theory: Simple → Advanced

#### Level 1: Basic Understanding

An array is a **collection of elements** identified by **index** or **key**.

\`\`\`
Index:    0    1    2    3    4
Array:  [10] [20] [30] [40] [50]
         ↑
    Base Address (e.g., 1000)
\`\`\`

**Key Properties:**
- **Fixed Size** (in static arrays)
- **Same Data Type** (homogeneous)
- **Zero-indexed** (in most languages)

#### Level 2: Memory Layout

When you declare \`int arr[5]\`, the compiler:
1. Allocates **contiguous memory** (e.g., 20 bytes for 5 integers)
2. Stores the **base address** (pointer to first element)
3. Calculates any element's address as: \`base_address + (index × element_size)\`

**Example:**
\`\`\`
arr[0] → 1000 (base)
arr[1] → 1004 (1000 + 1×4)
arr[2] → 1008 (1000 + 2×4)
\`\`\`

This is why **random access is O(1)** — it's just arithmetic!

#### Level 3: Advanced Concepts

**Static vs Dynamic Arrays:**

| Feature | Static Array | Dynamic Array (Vector/ArrayList) |
|---------|-------------|----------------------------------|
| Size | Fixed at compile time | Grows/shrinks at runtime |
| Memory | Stack (usually) | Heap |
| Reallocation | Never | When capacity exceeded |
| Example | \`int arr[100]\` | \`std::vector<int>\`, \`ArrayList<Integer>\` |

**Dynamic Array Growth Strategy:**
- When full, allocate **2× larger array**
- Copy all elements (O(n) operation)
- Amortized time: O(1) per insertion

### Edge Cases

1. **Empty Array**: \`arr.length == 0\` — always check before accessing
2. **Single Element**: \`arr.length == 1\` — watch for off-by-one errors
3. **Out of Bounds**: Accessing \`arr[arr.length]\` (should be \`arr[arr.length - 1]\`)
4. **Negative Indexing**: Some languages support it (Python: \`arr[-1]\`), others don't

---

## ⏱️ Time & Space Analysis

### Operations Complexity

| Operation | Best Case | Average Case | Worst Case | Space |
|-----------|-----------|--------------|------------|-------|
| **Access** | O(1) | O(1) | O(1) | O(1) |
| **Search** | O(1) | O(n) | O(n) | O(1) |
| **Search (Sorted)** | O(1) | O(log n) | O(log n) | O(1) |
| **Insert (End)** | O(1) | O(1) | O(n)* | O(1) |
| **Insert (Middle)** | O(n) | O(n) | O(n) | O(1) |
| **Delete (End)** | O(1) | O(1) | O(1) | O(1) |
| **Delete (Middle)** | O(n) | O(n) | O(n) | O(1) |

*O(n) when dynamic array needs to resize

### Trade-offs

**✅ When to Use Arrays:**
- Need fast random access by index
- Data size is known or predictable
- Memory locality is critical (performance)
- Implementing other data structures

**❌ When NOT to Use Arrays:**
- Frequent insertions/deletions in middle
- Size changes unpredictably
- Need fast search without sorting (use Hash Table)

---

## 💻 Implementation

### Pseudocode

\`\`\`
ALGORITHM: Insert at Index
INPUT: array, index, value
OUTPUT: modified array

1. IF index < 0 OR index > array.length THEN
2.     THROW IndexOutOfBoundsError
3. END IF
4. 
5. FOR i = array.length - 1 DOWN TO index DO
6.     array[i + 1] = array[i]  // Shift right
7. END FOR
8. 
9. array[index] = value
10. RETURN array
\`\`\`

### Language-wise Examples

#### C++
\`\`\`cpp
#include <iostream>
#include <vector>
using namespace std;

int main() {
    // Static array
    int staticArr[5] = {1, 2, 3, 4, 5};
    
    // Dynamic array (vector)
    vector<int> dynamicArr = {10, 20, 30};
    
    // Access
    cout << staticArr[0] << endl;  // 1
    cout << dynamicArr[1] << endl; // 20
    
    // Insert
    dynamicArr.push_back(40);  // O(1) amortized
    
    // Search
    auto it = find(dynamicArr.begin(), dynamicArr.end(), 30);
    if (it != dynamicArr.end()) {
        cout << "Found at index: " << distance(dynamicArr.begin(), it);
    }
    
    return 0;
}
\`\`\`

#### Java
\`\`\`java
import java.util.ArrayList;
import java.util.Arrays;

public class ArrayExample {
    public static void main(String[] args) {
        // Static array
        int[] staticArr = {1, 2, 3, 4, 5};
        
        // Dynamic array (ArrayList)
        ArrayList<Integer> dynamicArr = new ArrayList<>(Arrays.asList(10, 20, 30));
        
        // Access
        System.out.println(staticArr[0]);     // 1
        System.out.println(dynamicArr.get(1)); // 20
        
        // Insert
        dynamicArr.add(40);  // O(1) amortized
        
        // Search
        int index = dynamicArr.indexOf(30);
        if (index != -1) {
            System.out.println("Found at index: " + index);
        }
    }
}
\`\`\`

#### Python
\`\`\`python
# Python lists are dynamic arrays
arr = [1, 2, 3, 4, 5]

# Access
print(arr[0])      # 1
print(arr[-1])     # 5 (negative indexing)

# Insert
arr.append(6)      # O(1) amortized
arr.insert(2, 99)  # O(n) - insert at index 2

# Search
if 3 in arr:
    index = arr.index(3)
    print(f"Found at index: {index}")

# Slicing (creates new array)
sub_arr = arr[1:4]  # [2, 99, 3]
\`\`\`

#### JavaScript/TypeScript
\`\`\`typescript
// JavaScript arrays are dynamic
const arr: number[] = [1, 2, 3, 4, 5];

// Access
console.log(arr[0]);  // 1

// Insert
arr.push(6);          // O(1) amortized
arr.splice(2, 0, 99); // O(n) - insert at index 2

// Search
const index = arr.indexOf(3);
if (index !== -1) {
    console.log(\`Found at index: \${index}\`);
}

// Modern methods
const found = arr.find(x => x > 3);  // 4
const filtered = arr.filter(x => x % 2 === 0);  // [2, 4, 6]
\`\`\`

---

## 🏢 Real-World Usage

### System Examples

#### 1. **Image Processing**
\`\`\`python
# Image is a 2D array of pixels
image = [[255, 0, 0], [0, 255, 0], [0, 0, 255]]  # RGB values

# Grayscale conversion
for row in image:
    for pixel in row:
        gray = sum(pixel) // 3
        pixel[:] = [gray, gray, gray]
\`\`\`

#### 2. **Database Indexing**
\`\`\`sql
-- Internally, databases use arrays for:
-- - Row storage (heap files)
-- - Index pages (B-tree nodes)
-- - Query result sets
\`\`\`

#### 3. **Network Buffers**
\`\`\`cpp
// TCP receive buffer
char buffer[8192];  // 8KB buffer
int bytes_read = recv(socket, buffer, sizeof(buffer), 0);
\`\`\`

### Where Companies Use It

**High-Frequency Trading:**
\`\`\`cpp
// Price tick array (circular buffer)
struct Tick {
    double price;
    long timestamp;
};

Tick ticks[1000000];  // Pre-allocated for speed
int write_index = 0;

void add_tick(double price, long ts) {
    ticks[write_index++ % 1000000] = {price, ts};
}
\`\`\`

---

## 🎯 Interview Angle

### Common Traps

1. **Off-by-One Errors**
   \`\`\`cpp
   // ❌ Wrong
   for (int i = 0; i <= arr.size(); i++)  // Accesses arr[size]!
   
   // ✅ Correct
   for (int i = 0; i < arr.size(); i++)
   \`\`\`

2. **Modifying While Iterating**
   \`\`\`python
   # ❌ Wrong
   for i in range(len(arr)):
       arr.pop(0)  # Shifts all elements, breaks iteration
   
   # ✅ Correct
   while arr:
       arr.pop(0)
   \`\`\`

3. **Shallow vs Deep Copy**
   \`\`\`javascript
   let arr1 = [[1, 2], [3, 4]];
   let arr2 = arr1.slice();  // Shallow copy
   arr2[0][0] = 99;
   console.log(arr1[0][0]);  // 99 (modified!)
   
   // Deep copy needed
   let arr3 = JSON.parse(JSON.stringify(arr1));
   \`\`\`

### Question Variations

| Pattern | Example Problem | Key Technique |
|---------|----------------|---------------|
| **Two Pointers** | Two Sum (sorted array) | Start/end pointers moving inward |
| **Sliding Window** | Max sum subarray of size K | Maintain window, slide right |
| **Prefix Sum** | Range sum queries | Precompute cumulative sums |
| **Kadane's Algorithm** | Maximum subarray sum | DP on array |
| **Dutch National Flag** | Sort 0s, 1s, 2s | Three-way partitioning |

### Interview Pro Tips

1. **Always ask about:**
   - Array size (can it fit in memory?)
   - Is it sorted?
   - Can it have duplicates?
   - Can it be modified in-place?

2. **Mention trade-offs:**
   - "I could sort first (O(n log n)) for binary search, or use a hash set (O(n) time, O(n) space)"

3. **Start with brute force:**
   - "The naive approach is O(n²), but we can optimize using..."

---

## 📝 Practice Problems

### Easy
1. **Find Maximum Element** - Linear scan
2. **Reverse Array** - Two pointers
3. **Remove Duplicates from Sorted Array** - Two pointers
4. **Merge Sorted Arrays** - Two pointers
5. **Rotate Array by K** - Reversal algorithm

### Medium
1. **Two Sum** - Hash map
2. **3Sum** - Sorting + two pointers
3. **Container With Most Water** - Two pointers
4. **Product of Array Except Self** - Prefix/suffix products
5. **Find Peak Element** - Binary search variant
6. **Subarray Sum Equals K** - Prefix sum + hash map
7. **Spiral Matrix** - Boundary simulation

### Hard
1. **Median of Two Sorted Arrays** - Binary search
2. **Trapping Rain Water** - Stack or two pointers
3. **First Missing Positive** - In-place hashing
4. **Longest Consecutive Sequence** - Hash set
5. **Sliding Window Maximum** - Deque

---

## 🔗 Additional Resources

- [Visualize Array Operations](https://visualgo.net/en/array)
- [LeetCode Array Problems](https://leetcode.com/tag/array/)
- [GeeksforGeeks Array Tutorial](https://www.geeksforgeeks.org/array-data-structure/)

---

## 📚 Next Steps

After mastering arrays, proceed to:
1. **Strings** - Arrays of characters with special operations
2. **Two Pointers** - Advanced array traversal technique
3. **Sliding Window** - Subarray optimization pattern
4. **Hashing** - O(1) lookup alternative to arrays

---

*Remember: Arrays are not just a data structure — they're a way of thinking about memory and access patterns. Master them, and you master the foundation of all computing.*
    `
};
