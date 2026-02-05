import { Article } from "@/hooks/useArticles";

export const LINKED_LIST_EXPANDED: Article = {
    id: "dsa-linked-list-master",
    slug: "linked-list-complete-guide",
    title: "Linked List Data Structure",
    description: "A linked list is a linear data structure where elements are stored in nodes, and each node points to the next node in the sequence.",
    category: "DSA",
    difficulty: "Intermediate",
    tags: ["Linked List", "Data Structures", "Pointers"],
    viewCount: 32000,
    updatedAt: "2026-02-05",
    author: "ScaleForge DSA Team",
    version: "2.0.0",
    prerequisites: ["arrays-complete-guide"],
    relatedTopics: ["dsa-arrays-master", "stack-queue", "trees"],
    content: `
# Linked List Data Structure

**Last Updated:** 05 Feb, 2026

A linked list is a linear data structure where elements are stored in nodes, and each node points to the next node in the sequence. Unlike arrays, linked list elements are not stored at contiguous memory locations.

## 📌 Introduction

### What Problem Does It Solve?

Linked lists solve the problem of **dynamic memory allocation** and **efficient insertions/deletions** without the need for contiguous memory blocks.

**Problems with Arrays:**
- Fixed size (static arrays)
- Expensive insertions/deletions (requires shifting)
- Memory waste (pre-allocation)

**Linked List Solution:**
- Dynamic size (grows/shrinks as needed)
- O(1) insertions/deletions (at known positions)
- No memory waste (allocate only what's needed)

### Why It Matters in Real Systems

1. **Dynamic Memory Management**: Allocate memory on-demand
2. **Efficient Modifications**: Insert/delete without shifting
3. **Foundation for Complex Structures**: Stacks, queues, graphs
4. **Memory Optimization**: No pre-allocation needed

### Where Used in Industry

| Company | Use Case |
|---------|----------|
| **Operating Systems** | Process scheduling, memory management |
| **Browsers** | Browser history (doubly linked list) |
| **Music Players** | Playlist management (circular linked list) |
| **Databases** | Index structures, transaction logs |
| **Blockchain** | Chain of blocks (linked list of transactions) |

---

## 🧠 Concept Deep Dive

### Theory: Simple → Advanced

#### Level 1: Basic Understanding

A linked list consists of **nodes** where each node contains:
1. **Data**: The actual value
2. **Next**: Pointer/reference to the next node

\`\`\`
Node Structure:
┌─────────┬──────┐
│  Data   │ Next │
└─────────┴──────┘

Linked List:
Head → [10|•] → [20|•] → [30|•] → [40|NULL]
\`\`\`

**Key Properties:**
- **Head**: First node in the list
- **Tail**: Last node (points to NULL)
- **Sequential Access**: Must traverse from head
- **Dynamic Size**: Can grow/shrink at runtime

#### Level 2: Types of Linked Lists

**1. Singly Linked List**
\`\`\`
[Data|Next] → [Data|Next] → [Data|Next] → NULL
\`\`\`
- Each node points to next node only
- Can traverse only forward

**2. Doubly Linked List**
\`\`\`
NULL ← [Prev|Data|Next] ⇄ [Prev|Data|Next] ⇄ [Prev|Data|Next] → NULL
\`\`\`
- Each node has prev and next pointers
- Can traverse both directions
- Extra memory for prev pointer

**3. Circular Linked List**
\`\`\`
     ┌─────────────────────┐
     ↓                     │
[Data|•] → [Data|•] → [Data|•]
\`\`\`
- Last node points back to first node
- No NULL termination
- Useful for round-robin scheduling

#### Level 3: Memory Layout

**Array vs Linked List Memory:**

\`\`\`
Array (Contiguous):
Memory: [10][20][30][40][50]
Address: 1000 1004 1008 1012 1016

Linked List (Scattered):
Node1: Address 1000 → Data: 10, Next: 2500
Node2: Address 2500 → Data: 20, Next: 1800
Node3: Address 1800 → Data: 30, Next: 3200
Node4: Address 3200 → Data: 40, Next: NULL
\`\`\`

**Implications:**
- **Cache Misses**: Nodes scattered = poor cache performance
- **Memory Overhead**: Extra space for pointers
- **No Random Access**: Must traverse from head

### Edge Cases

1. **Empty List**: Head = NULL
2. **Single Node**: Head.next = NULL
3. **Two Nodes**: Special case for many algorithms
4. **Circular Detection**: List points back to itself
5. **Null Pointer**: Accessing node.next when node is NULL

---

## ⏱️ Time & Space Analysis

### Operations Complexity

| Operation | Singly LL | Doubly LL | Array | Notes |
|-----------|-----------|-----------|-------|-------|
| **Access** | O(n) | O(n) | O(1) | Must traverse from head |
| **Search** | O(n) | O(n) | O(n) | Linear scan |
| **Insert (Head)** | O(1) | O(1) | O(n) | LL wins! |
| **Insert (Tail)** | O(n)* | O(1)** | O(1)*** | *Without tail pointer, **With tail pointer, ***Amortized |
| **Insert (Middle)** | O(n) | O(n) | O(n) | Must find position first |
| **Delete (Head)** | O(1) | O(1) | O(n) | LL wins! |
| **Delete (Tail)** | O(n) | O(1) | O(1) | Doubly LL wins |
| **Delete (Middle)** | O(n) | O(n) | O(n) | Must find position first |

**Space Complexity:**
- **Singly LL**: O(n) for n nodes + O(n) for pointers
- **Doubly LL**: O(n) for n nodes + O(2n) for pointers
- **Array**: O(n) for n elements

### Trade-offs

**✅ When to Use Linked Lists:**
- Frequent insertions/deletions at beginning
- Unknown or dynamic size
- Don't need random access
- Implementing stacks, queues

**❌ When NOT to Use Linked Lists:**
- Need random access by index
- Memory is limited (pointer overhead)
- Cache performance is critical
- Need to search frequently

---

## 💻 Implementation

### Pseudocode: Insert at Head

\`\`\`
ALGORITHM: Insert at Head
INPUT: head (pointer to first node), value
OUTPUT: new head

1. CREATE new_node
2. new_node.data = value
3. new_node.next = head
4. head = new_node
5. RETURN head
\`\`\`

### Language-wise Examples

#### C++
\`\`\`cpp
#include <iostream>
using namespace std;

// Node structure
struct Node {
    int data;
    Node* next;
    
    Node(int val) : data(val), next(nullptr) {}
};

class LinkedList {
private:
    Node* head;
    
public:
    LinkedList() : head(nullptr) {}
    
    // Insert at head - O(1)
    void insertAtHead(int val) {
        Node* newNode = new Node(val);
        newNode->next = head;
        head = newNode;
    }
    
    // Insert at tail - O(n)
    void insertAtTail(int val) {
        Node* newNode = new Node(val);
        
        if (!head) {
            head = newNode;
            return;
        }
        
        Node* temp = head;
        while (temp->next) {
            temp = temp->next;
        }
        temp->next = newNode;
    }
    
    // Delete node with value - O(n)
    void deleteNode(int val) {
        if (!head) return;
        
        // Delete head
        if (head->data == val) {
            Node* temp = head;
            head = head->next;
            delete temp;
            return;
        }
        
        // Delete other nodes
        Node* curr = head;
        while (curr->next && curr->next->data != val) {
            curr = curr->next;
        }
        
        if (curr->next) {
            Node* temp = curr->next;
            curr->next = curr->next->next;
            delete temp;
        }
    }
    
    // Search - O(n)
    bool search(int val) {
        Node* temp = head;
        while (temp) {
            if (temp->data == val) return true;
            temp = temp->next;
        }
        return false;
    }
    
    // Print list
    void print() {
        Node* temp = head;
        while (temp) {
            cout << temp->data << " -> ";
            temp = temp->next;
        }
        cout << "NULL" << endl;
    }
    
    // Reverse list - O(n)
    void reverse() {
        Node* prev = nullptr;
        Node* curr = head;
        Node* next = nullptr;
        
        while (curr) {
            next = curr->next;
            curr->next = prev;
            prev = curr;
            curr = next;
        }
        head = prev;
    }
    
    // Destructor
    ~LinkedList() {
        while (head) {
            Node* temp = head;
            head = head->next;
            delete temp;
        }
    }
};
\`\`\`

#### Java
\`\`\`java
class Node {
    int data;
    Node next;
    
    Node(int data) {
        this.data = data;
        this.next = null;
    }
}

class LinkedList {
    private Node head;
    
    // Insert at head - O(1)
    public void insertAtHead(int data) {
        Node newNode = new Node(data);
        newNode.next = head;
        head = newNode;
    }
    
    // Insert at tail - O(n)
    public void insertAtTail(int data) {
        Node newNode = new Node(data);
        
        if (head == null) {
            head = newNode;
            return;
        }
        
        Node temp = head;
        while (temp.next != null) {
            temp = temp.next;
        }
        temp.next = newNode;
    }
    
    // Delete node - O(n)
    public void delete(int data) {
        if (head == null) return;
        
        if (head.data == data) {
            head = head.next;
            return;
        }
        
        Node curr = head;
        while (curr.next != null && curr.next.data != data) {
            curr = curr.next;
        }
        
        if (curr.next != null) {
            curr.next = curr.next.next;
        }
    }
    
    // Reverse - O(n)
    public void reverse() {
        Node prev = null;
        Node curr = head;
        
        while (curr != null) {
            Node next = curr.next;
            curr.next = prev;
            prev = curr;
            curr = next;
        }
        head = prev;
    }
    
    // Print
    public void print() {
        Node temp = head;
        while (temp != null) {
            System.out.print(temp.data + " -> ");
            temp = temp.next;
        }
        System.out.println("NULL");
    }
}
\`\`\`

#### Python
\`\`\`python
class Node:
    def __init__(self, data):
        self.data = data
        self.next = None

class LinkedList:
    def __init__(self):
        self.head = None
    
    # Insert at head - O(1)
    def insert_at_head(self, data):
        new_node = Node(data)
        new_node.next = self.head
        self.head = new_node
    
    # Insert at tail - O(n)
    def insert_at_tail(self, data):
        new_node = Node(data)
        
        if not self.head:
            self.head = new_node
            return
        
        temp = self.head
        while temp.next:
            temp = temp.next
        temp.next = new_node
    
    # Delete node - O(n)
    def delete(self, data):
        if not self.head:
            return
        
        if self.head.data == data:
            self.head = self.head.next
            return
        
        curr = self.head
        while curr.next and curr.next.data != data:
            curr = curr.next
        
        if curr.next:
            curr.next = curr.next.next
    
    # Reverse - O(n)
    def reverse(self):
        prev = None
        curr = self.head
        
        while curr:
            next_node = curr.next
            curr.next = prev
            prev = curr
            curr = next_node
        
        self.head = prev
    
    # Print
    def print_list(self):
        temp = self.head
        while temp:
            print(temp.data, end=" -> ")
            temp = temp.next
        print("NULL")
\`\`\`

#### JavaScript/TypeScript
\`\`\`typescript
class ListNode {
    data: number;
    next: ListNode | null;
    
    constructor(data: number) {
        this.data = data;
        this.next = null;
    }
}

class LinkedList {
    private head: ListNode | null = null;
    
    // Insert at head - O(1)
    insertAtHead(data: number): void {
        const newNode = new ListNode(data);
        newNode.next = this.head;
        this.head = newNode;
    }
    
    // Insert at tail - O(n)
    insertAtTail(data: number): void {
        const newNode = new ListNode(data);
        
        if (!this.head) {
            this.head = newNode;
            return;
        }
        
        let temp = this.head;
        while (temp.next) {
            temp = temp.next;
        }
        temp.next = newNode;
    }
    
    // Delete node - O(n)
    delete(data: number): void {
        if (!this.head) return;
        
        if (this.head.data === data) {
            this.head = this.head.next;
            return;
        }
        
        let curr = this.head;
        while (curr.next && curr.next.data !== data) {
            curr = curr.next;
        }
        
        if (curr.next) {
            curr.next = curr.next.next;
        }
    }
    
    // Reverse - O(n)
    reverse(): void {
        let prev: ListNode | null = null;
        let curr = this.head;
        
        while (curr) {
            const next = curr.next;
            curr.next = prev;
            prev = curr;
            curr = next;
        }
        this.head = prev;
    }
    
    // Print
    print(): void {
        let temp = this.head;
        const values: number[] = [];
        while (temp) {
            values.push(temp.data);
            temp = temp.next;
        }
        console.log(values.join(" -> ") + " -> NULL");
    }
}
\`\`\`

---

## 🏢 Real-World Usage

### System Examples

#### 1. **LRU Cache Implementation**
\`\`\`python
class LRUCache:
    class Node:
        def __init__(self, key, val):
            self.key = key
            self.val = val
            self.prev = None
            self.next = None
    
    def __init__(self, capacity):
        self.capacity = capacity
        self.cache = {}  # key -> node
        self.head = self.Node(0, 0)  # dummy head
        self.tail = self.Node(0, 0)  # dummy tail
        self.head.next = self.tail
        self.tail.prev = self.head
    
    def get(self, key):
        if key in self.cache:
            node = self.cache[key]
            self._remove(node)
            self._add_to_head(node)
            return node.val
        return -1
    
    def put(self, key, value):
        if key in self.cache:
            self._remove(self.cache[key])
        
        node = self.Node(key, value)
        self._add_to_head(node)
        self.cache[key] = node
        
        if len(self.cache) > self.capacity:
            lru = self.tail.prev
            self._remove(lru)
            del self.cache[lru.key]
    
    def _remove(self, node):
        node.prev.next = node.next
        node.next.prev = node.prev
    
    def _add_to_head(self, node):
        node.next = self.head.next
        node.prev = self.head
        self.head.next.prev = node
        self.head.next = node
\`\`\`

#### 2. **Browser History**
\`\`\`javascript
class BrowserHistory {
    constructor(homepage) {
        this.current = { url: homepage, prev: null, next: null };
    }
    
    visit(url) {
        const newPage = { url, prev: this.current, next: null };
        this.current.next = newPage;
        this.current = newPage;
    }
    
    back(steps) {
        while (steps > 0 && this.current.prev) {
            this.current = this.current.prev;
            steps--;
        }
        return this.current.url;
    }
    
    forward(steps) {
        while (steps > 0 && this.current.next) {
            this.current = this.current.next;
            steps--;
        }
        return this.current.url;
    }
}
\`\`\`

#### 3. **Music Playlist (Circular)**
\`\`\`java
class Playlist {
    class Song {
        String title;
        Song next;
        
        Song(String title) {
            this.title = title;
        }
    }
    
    private Song current;
    
    public void addSong(String title) {
        Song newSong = new Song(title);
        if (current == null) {
            current = newSong;
            current.next = current;  // Point to itself
        } else {
            Song temp = current;
            while (temp.next != current) {
                temp = temp.next;
            }
            temp.next = newSong;
            newSong.next = current;
        }
    }
    
    public String nextSong() {
        if (current != null) {
            current = current.next;
            return current.title;
        }
        return null;
    }
}
\`\`\`

---

## 🎯 Interview Angle

### Common Traps

1. **Null Pointer Errors**
   \`\`\`cpp
   // ❌ Wrong - crashes if node is NULL
   node.next.data;
   
   // ✅ Correct - check NULL first
   if (node && node.next) {
       int val = node.next.data;
   }
   \`\`\`

2. **Losing Head Reference**
   \`\`\`python
   # ❌ Wrong - loses original head
   def traverse(head):
       while head:
           print(head.data)
           head = head.next  # Modifies original reference
   
   # ✅ Correct - use temp variable
   def traverse(head):
       temp = head
       while temp:
           print(temp.data)
           temp = temp.next
   \`\`\`

3. **Memory Leaks (C/C++)**
   \`\`\`cpp
   // ❌ Wrong - memory leak
   void deleteList(Node* head) {
       head = nullptr;  // Doesn't free memory
   }
   
   // ✅ Correct - free each node
   void deleteList(Node* head) {
       while (head) {
           Node* temp = head;
           head = head->next;
           delete temp;
       }
   }
   \`\`\`

### Question Variations

| Pattern | Example Problem | Key Technique |
|---------|----------------|---------------|
| **Two Pointers** | Find middle of list | Slow/fast pointers |
| **Cycle Detection** | Detect loop in list | Floyd's algorithm |
| **Reversal** | Reverse linked list | Three pointers (prev, curr, next) |
| **Merge** | Merge two sorted lists | Dummy node + comparison |
| **Dummy Node** | Remove Nth node from end | Dummy head simplifies edge cases |

### Interview Pro Tips

1. **Always ask:**
   - Is it singly or doubly linked?
   - Can there be cycles?
   - Do I have access to tail pointer?
   - Should I modify in-place or create new list?

2. **Common techniques:**
   - **Dummy Node**: Simplifies head insertion/deletion
   - **Two Pointers**: Fast/slow for middle, cycle detection
   - **Recursion**: Natural for linked list problems
   - **Stack**: For reversal, palindrome checking

3. **Edge cases to test:**
   - Empty list (head = NULL)
   - Single node
   - Two nodes
   - List with cycle
   - Very long list (stack overflow in recursion)

---

## 📝 Practice Problems

### Easy
1. **Reverse Linked List** - Iterative and recursive
2. **Merge Two Sorted Lists** - Dummy node technique
3. **Remove Duplicates from Sorted List** - Two pointers
4. **Middle of Linked List** - Fast/slow pointers
5. **Delete Node in Linked List** - Copy next node's data

### Medium
1. **Add Two Numbers** - Digit-by-digit addition
2. **Remove Nth Node From End** - Two pointers with gap
3. **Reorder List** - Find middle + reverse + merge
4. **Linked List Cycle II** - Floyd's algorithm variant
5. **Intersection of Two Linked Lists** - Two pointers
6. **Palindrome Linked List** - Reverse second half
7. **Swap Nodes in Pairs** - Pointer manipulation

### Hard
1. **Reverse Nodes in k-Group** - Group reversal
2. **Merge k Sorted Lists** - Min heap or divide & conquer
3. **Copy List with Random Pointer** - Hash map or interweaving
4. **LRU Cache** - Doubly linked list + hash map
5. **Flatten Multilevel Doubly Linked List** - DFS/recursion

---

## 🔗 Additional Resources

- [Visualize Linked List](https://visualgo.net/en/list)
- [LeetCode Linked List Problems](https://leetcode.com/tag/linked-list/)
- [Linked List Patterns](https://leetcode.com/discuss/study-guide/1800120/become-master-in-linked-list)

---

## 📚 Next Steps

After mastering linked lists, proceed to:
1. **Stack & Queue** - Built using linked lists
2. **Trees** - Extension of linked list concept
3. **Graphs** - Adjacency list uses linked lists
4. **Advanced Pointers** - Skip lists, XOR linked lists

---

*Remember: Linked lists teach you pointer manipulation — the foundation of all advanced data structures. Master the basics, and complex structures become simple.*
    `
};
