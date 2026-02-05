import { Article } from "@/hooks/useArticles";

export const STACK_QUEUE_EXPANDED: Article = {
    id: "dsa-stack-queue-master",
    slug: "stack-queue-complete-guide",
    title: "Stack & Queue Data Structures",
    description: "Stack (LIFO) and Queue (FIFO) are fundamental linear data structures that control the order of element access.",
    category: "DSA",
    difficulty: "Beginner",
    tags: ["Stack", "Queue", "LIFO", "FIFO"],
    viewCount: 35000,
    updatedAt: "2026-02-05",
    author: "ScaleForge DSA Team",
    version: "2.0.0",
    prerequisites: ["arrays-complete-guide", "linked-list-complete-guide"],
    relatedTopics: ["recursion", "trees", "graphs"],
    content: `
# Stack & Queue Data Structures

**Last Updated:** 05 Feb, 2026

Stack (LIFO - Last In First Out) and Queue (FIFO - First In First Out) are fundamental linear data structures that control the order of element access. They are the building blocks of many algorithms and system designs.

## 📌 Introduction

### What Problem Do They Solve?

**Stack** solves the problem of **managing nested operations** where the most recent item needs to be processed first.

**Queue** solves the problem of **fair ordering** where items should be processed in the order they arrive.

**Real-World Analogies:**
- **Stack**: Stack of plates (take from top, add to top)
- **Queue**: Line at a ticket counter (first come, first served)

### Why They Matter in Real Systems

1. **Function Call Management**: Every program uses a call stack
2. **Task Scheduling**: Operating systems use queues for processes
3. **Undo/Redo**: Text editors use stacks
4. **Breadth-First Search**: Graphs use queues
5. **Expression Evaluation**: Compilers use stacks

### Where Used in Industry

| Company | Use Case |
|---------|----------|
| **Operating Systems** | Process scheduling (queue), function calls (stack) |
| **Browsers** | Back/Forward navigation (stack) |
| **Printers** | Print job queue |
| **Web Servers** | Request handling queue |
| **Compilers** | Expression parsing (stack) |

---

## 🧠 Concept Deep Dive

### Stack: LIFO Principle

#### Level 1: Basic Understanding

A stack is a collection where elements are added and removed from the **same end** (top).

\`\`\`
Operations:
- push(x): Add element to top
- pop(): Remove and return top element
- peek()/top(): View top element without removing
- isEmpty(): Check if stack is empty

Visual:
    push(3)      push(5)      pop()
    -------      -------      -----
       |            |5|          |3|
       |            |3|          |2|
    |2|         |2|         |2|
    |1|         |1|         |1|
    ----         ----         ----
\`\`\`

#### Level 2: Implementation Approaches

**Using Array:**
\`\`\`
Stack: [1, 2, 3, 5]
        ^        ^
      bottom    top (index = size-1)

push(x): arr[++top] = x
pop(): return arr[top--]
\`\`\`

**Using Linked List:**
\`\`\`
top → [5|•] → [3|•] → [2|•] → [1|NULL]

push(x): Create node, point to current top, update top
pop(): Save top.data, move top to top.next, return data
\`\`\`

### Queue: FIFO Principle

#### Level 1: Basic Understanding

A queue is a collection where elements are added at the **rear** and removed from the **front**.

\`\`\`
Operations:
- enqueue(x): Add element to rear
- dequeue(): Remove and return front element
- front()/peek(): View front element
- isEmpty(): Check if queue is empty

Visual:
    enqueue(3)   enqueue(5)   dequeue()
    ----------   ----------   ---------
Front → |1|2|      |1|2|3|      |2|3|5| ← Rear
\`\`\`

#### Level 2: Types of Queues

**1. Simple Queue**
- Standard FIFO behavior

**2. Circular Queue**
\`\`\`
     ┌─────────────┐
     ↓             │
[0][1][2][3][4]
 F           R
\`\`\`
- Rear wraps around to front when reaching end
- Efficient space utilization

**3. Priority Queue**
- Elements have priority
- Higher priority dequeued first
- Implemented using heap

**4. Deque (Double-Ended Queue)**
- Insert/delete from both ends
- Combines stack and queue

### Edge Cases

1. **Stack Overflow**: Push to full stack (array implementation)
2. **Stack Underflow**: Pop from empty stack
3. **Queue Full**: Enqueue to full queue (circular queue)
4. **Queue Empty**: Dequeue from empty queue

---

## ⏱️ Time & Space Analysis

### Operations Complexity

| Operation | Stack (Array) | Stack (LL) | Queue (Array) | Queue (LL) | Circular Queue |
|-----------|---------------|------------|---------------|------------|----------------|
| **Push/Enqueue** | O(1)* | O(1) | O(1) | O(1) | O(1) |
| **Pop/Dequeue** | O(1) | O(1) | O(n)** | O(1) | O(1) |
| **Peek/Front** | O(1) | O(1) | O(1) | O(1) | O(1) |
| **isEmpty** | O(1) | O(1) | O(1) | O(1) | O(1) |
| **Space** | O(n) | O(n) | O(n) | O(n) | O(n) |

*Amortized O(1) for dynamic array
**O(n) for simple array queue (requires shifting)

### Trade-offs

**Stack:**
- ✅ Simple implementation
- ✅ Fast operations
- ❌ No random access
- ❌ Limited to LIFO order

**Queue:**
- ✅ Fair ordering (FIFO)
- ✅ Natural for BFS, scheduling
- ❌ Array implementation inefficient (shifting)
- ✅ Linked list or circular array solves this

---

## 💻 Implementation

### Stack Implementation

#### C++
\`\`\`cpp
#include <iostream>
#include <vector>
using namespace std;

// Stack using vector
class Stack {
private:
    vector<int> data;
    
public:
    void push(int x) {
        data.push_back(x);
    }
    
    void pop() {
        if (!isEmpty()) {
            data.pop_back();
        }
    }
    
    int top() {
        if (!isEmpty()) {
            return data.back();
        }
        throw runtime_error("Stack is empty");
    }
    
    bool isEmpty() {
        return data.empty();
    }
    
    int size() {
        return data.size();
    }
};

// Stack using linked list
class StackLL {
private:
    struct Node {
        int data;
        Node* next;
        Node(int val) : data(val), next(nullptr) {}
    };
    Node* topNode;
    
public:
    StackLL() : topNode(nullptr) {}
    
    void push(int x) {
        Node* newNode = new Node(x);
        newNode->next = topNode;
        topNode = newNode;
    }
    
    void pop() {
        if (!isEmpty()) {
            Node* temp = topNode;
            topNode = topNode->next;
            delete temp;
        }
    }
    
    int top() {
        if (!isEmpty()) {
            return topNode->data;
        }
        throw runtime_error("Stack is empty");
    }
    
    bool isEmpty() {
        return topNode == nullptr;
    }
};
\`\`\`

#### Java
\`\`\`java
import java.util.*;

// Stack using ArrayList
class Stack {
    private ArrayList<Integer> data = new ArrayList<>();
    
    public void push(int x) {
        data.add(x);
    }
    
    public void pop() {
        if (!isEmpty()) {
            data.remove(data.size() - 1);
        }
    }
    
    public int top() {
        if (!isEmpty()) {
            return data.get(data.size() - 1);
        }
        throw new EmptyStackException();
    }
    
    public boolean isEmpty() {
        return data.isEmpty();
    }
}

// Using built-in Stack
Stack<Integer> stack = new Stack<>();
stack.push(10);
stack.push(20);
int top = stack.pop();  // 20
\`\`\`

#### Python
\`\`\`python
# Stack using list
class Stack:
    def __init__(self):
        self.data = []
    
    def push(self, x):
        self.data.append(x)
    
    def pop(self):
        if not self.is_empty():
            return self.data.pop()
        raise IndexError("Stack is empty")
    
    def top(self):
        if not self.is_empty():
            return self.data[-1]
        raise IndexError("Stack is empty")
    
    def is_empty(self):
        return len(self.data) == 0

# Simple usage
stack = []
stack.append(10)  # push
stack.append(20)
top = stack.pop()  # 20
\`\`\`

### Queue Implementation

#### C++ (Circular Queue)
\`\`\`cpp
class CircularQueue {
private:
    vector<int> data;
    int front, rear, size, capacity;
    
public:
    CircularQueue(int k) : capacity(k), size(0), front(0), rear(-1) {
        data.resize(k);
    }
    
    bool enqueue(int value) {
        if (isFull()) return false;
        rear = (rear + 1) % capacity;
        data[rear] = value;
        size++;
        return true;
    }
    
    bool dequeue() {
        if (isEmpty()) return false;
        front = (front + 1) % capacity;
        size--;
        return true;
    }
    
    int Front() {
        if (isEmpty()) return -1;
        return data[front];
    }
    
    int Rear() {
        if (isEmpty()) return -1;
        return data[rear];
    }
    
    bool isEmpty() {
        return size == 0;
    }
    
    bool isFull() {
        return size == capacity;
    }
};
\`\`\`

#### JavaScript/TypeScript
\`\`\`typescript
// Queue using array (simple but inefficient dequeue)
class Queue<T> {
    private data: T[] = [];
    
    enqueue(item: T): void {
        this.data.push(item);
    }
    
    dequeue(): T | undefined {
        return this.data.shift();  // O(n) - shifts all elements
    }
    
    front(): T | undefined {
        return this.data[0];
    }
    
    isEmpty(): boolean {
        return this.data.length === 0;
    }
}

// Efficient queue using two pointers
class EfficientQueue<T> {
    private data: T[] = [];
    private frontIndex = 0;
    
    enqueue(item: T): void {
        this.data.push(item);
    }
    
    dequeue(): T | undefined {
        if (this.isEmpty()) return undefined;
        const item = this.data[this.frontIndex];
        this.frontIndex++;
        
        // Reset when half empty to save memory
        if (this.frontIndex > this.data.length / 2) {
            this.data = this.data.slice(this.frontIndex);
            this.frontIndex = 0;
        }
        
        return item;
    }
    
    front(): T | undefined {
        return this.data[this.frontIndex];
    }
    
    isEmpty(): boolean {
        return this.frontIndex >= this.data.length;
    }
}
\`\`\`

---

## 🏢 Real-World Usage

### System Examples

#### 1. **Expression Evaluation**
\`\`\`python
def evaluate_postfix(expression):
    """
    Evaluate postfix expression using stack
    Example: "23+" → 2+3 = 5
    """
    stack = []
    
    for char in expression:
        if char.isdigit():
            stack.append(int(char))
        else:
            b = stack.pop()
            a = stack.pop()
            
            if char == '+':
                stack.append(a + b)
            elif char == '-':
                stack.append(a - b)
            elif char == '*':
                stack.append(a * b)
            elif char == '/':
                stack.append(a // b)
    
    return stack[0]

print(evaluate_postfix("23*5+"))  # (2*3)+5 = 11
\`\`\`

#### 2. **Valid Parentheses**
\`\`\`javascript
function isValid(s) {
    const stack = [];
    const pairs = { '(': ')', '{': '}', '[': ']' };
    
    for (const char of s) {
        if (char in pairs) {
            stack.push(char);
        } else {
            const top = stack.pop();
            if (pairs[top] !== char) {
                return false;
            }
        }
    }
    
    return stack.length === 0;
}

console.log(isValid("()[]{}"));  // true
console.log(isValid("([)]"));    // false
\`\`\`

#### 3. **Task Scheduler (Queue)**
\`\`\`java
class TaskScheduler {
    private Queue<Task> queue = new LinkedList<>();
    
    public void addTask(Task task) {
        queue.offer(task);
    }
    
    public void processTasks() {
        while (!queue.isEmpty()) {
            Task task = queue.poll();
            task.execute();
        }
    }
}
\`\`\`

#### 4. **Browser History (Two Stacks)**
\`\`\`python
class BrowserHistory:
    def __init__(self, homepage):
        self.back_stack = []
        self.forward_stack = []
        self.current = homepage
    
    def visit(self, url):
        self.back_stack.append(self.current)
        self.current = url
        self.forward_stack = []  # Clear forward history
    
    def back(self, steps):
        while steps > 0 and self.back_stack:
            self.forward_stack.append(self.current)
            self.current = self.back_stack.pop()
            steps -= 1
        return self.current
    
    def forward(self, steps):
        while steps > 0 and self.forward_stack:
            self.back_stack.append(self.current)
            self.current = self.forward_stack.pop()
            steps -= 1
        return self.current
\`\`\`

---

## 🎯 Interview Angle

### Common Traps

1. **Empty Stack/Queue Check**
   \`\`\`cpp
   // ❌ Wrong - crashes on empty
   int val = stack.top();
   
   // ✅ Correct - check first
   if (!stack.empty()) {
       int val = stack.top();
   }
   \`\`\`

2. **Queue Using Array (Inefficient)**
   \`\`\`python
   # ❌ Wrong - O(n) dequeue
   def dequeue(queue):
       return queue.pop(0)  # Shifts all elements
   
   # ✅ Correct - use collections.deque
   from collections import deque
   q = deque()
   q.append(1)
   q.popleft()  # O(1)
   \`\`\`

3. **Stack Overflow in Recursion**
   \`\`\`java
   // ❌ Wrong - infinite recursion
   void recurse() {
       recurse();  // Stack overflow!
   }
   
   // ✅ Correct - base case
   void recurse(int n) {
       if (n == 0) return;
       recurse(n - 1);
   }
   \`\`\`

### Question Variations

| Pattern | Example Problem | Key Technique |
|---------|----------------|---------------|
| **Monotonic Stack** | Next Greater Element | Maintain decreasing stack |
| **Two Stacks** | Min Stack | Auxiliary stack for minimums |
| **Stack + HashMap** | Valid Parentheses | Map opening to closing |
| **Queue + BFS** | Level Order Traversal | Queue for level-by-level |
| **Deque** | Sliding Window Maximum | Maintain decreasing deque |

### Interview Pro Tips

1. **Always clarify:**
   - Can I use built-in stack/queue?
   - What to return on empty?
   - Is there a size limit?

2. **Common patterns:**
   - **Monotonic Stack**: For "next greater/smaller" problems
   - **Two Stacks**: For min/max tracking
   - **Queue in BFS**: Level-order traversal
   - **Stack in DFS**: Depth-first traversal

3. **Edge cases:**
   - Empty stack/queue
   - Single element
   - Full capacity (fixed size)
   - Alternating push/pop

---

## 📝 Practice Problems

### Easy
1. **Valid Parentheses** - Stack with hashmap
2. **Implement Queue using Stacks** - Two stacks
3. **Implement Stack using Queues** - Two queues
4. **Min Stack** - Auxiliary stack
5. **Baseball Game** - Stack simulation

### Medium
1. **Daily Temperatures** - Monotonic stack
2. **Evaluate Reverse Polish Notation** - Stack
3. **Decode String** - Stack for nested brackets
4. **Asteroid Collision** - Stack simulation
5. **Next Greater Element I** - Monotonic stack
6. **Design Circular Queue** - Array with pointers
7. **Simplify Path** - Stack for directory navigation

### Hard
1. **Largest Rectangle in Histogram** - Monotonic stack
2. **Trapping Rain Water** - Stack or two pointers
3. **Sliding Window Maximum** - Deque
4. **Basic Calculator** - Stack with operators
5. **Longest Valid Parentheses** - Stack with indices

---

## 🔗 Additional Resources

- [Visualize Stack/Queue](https://visualgo.net/en/list)
- [LeetCode Stack Problems](https://leetcode.com/tag/stack/)
- [LeetCode Queue Problems](https://leetcode.com/tag/queue/)

---

## 📚 Next Steps

After mastering stacks and queues:
1. **Recursion** - Understand call stack
2. **Trees** - Use queue for BFS, stack for DFS
3. **Graphs** - BFS/DFS traversal
4. **Priority Queue** - Heap-based queue

---

*Remember: Stacks and queues are not just data structures — they're fundamental patterns of control flow. Master them, and you master the rhythm of algorithms.*
    `
};
