import { Article } from "@/hooks/useArticles";

export const TREES_EXPANDED: Article = {
    id: "dsa-trees-master",
    slug: "trees-complete-guide",
    title: "Tree Data Structures",
    description: "Trees are hierarchical data structures with a root node and child nodes forming a parent-child relationship. Essential for databases, file systems, and efficient searching.",
    category: "DSA",
    difficulty: "Intermediate",
    tags: ["Trees", "Binary Tree", "BST", "AVL", "Hierarchical"],
    viewCount: 42000,
    updatedAt: "2026-02-05",
    author: "ScaleForge DSA Team",
    version: "2.0.0",
    prerequisites: ["linked-list-complete-guide", "recursion"],
    relatedTopics: ["graphs", "hashing-complete-guide", "heap"],
    content: `
# Tree Data Structures

**Last Updated:** 05 Feb, 2026

Trees are hierarchical data structures consisting of nodes connected by edges, with a root node at the top and child nodes forming parent-child relationships. Unlike linear structures, trees allow for efficient hierarchical organization and searching.

## 📌 Introduction

### What Problem Does It Solve?

Trees solve the problem of **hierarchical data organization** and **efficient searching/insertion** in sorted data.

**Problems with Linear Structures:**
- Array search: O(n) unsorted, O(log n) sorted but O(n) insertion
- Linked list: O(n) search, O(1) insertion but no random access
- Hash table: O(1) average but no ordering, no range queries

**Tree Solution:**
- **Binary Search Tree**: O(log n) search, insert, delete (balanced)
- **Hierarchical organization**: Natural for file systems, org charts
- **Range queries**: Find all elements in a range efficiently

### Why It Matters in Real Systems

1. **Database Indexing**: B-trees and B+ trees power SQL databases
2. **File Systems**: Directory structure is a tree
3. **Compilers**: Abstract Syntax Trees (AST) for parsing
4. **AI/ML**: Decision trees for classification
5. **Network Routing**: Spanning trees prevent loops

### Where Used in Industry

| Company | Use Case |
|---------|----------|
| **MySQL/PostgreSQL** | B+ tree indexes for fast queries |
| **MongoDB** | B-tree indexes |
| **File Systems** | Directory hierarchy (ext4, NTFS) |
| **Git** | Commit tree, directory tree |
| **React** | Virtual DOM tree |

---

## 🧠 Concept Deep Dive

### Theory: Simple → Advanced

#### Level 1: Basic Understanding

**Tree Terminology:**

\\\`\\\`\\\`
        1 (Root)
       / \\
      2   3
     / \\   \\
    4   5   6 (Leaf)

- Root: Top node (1)
- Parent: Node with children (1, 2, 3)
- Child: Node with parent (2, 3, 4, 5, 6)
- Leaf: Node with no children (4, 5, 6)
- Edge: Connection between nodes
- Height: Longest path from root to leaf (2)
- Depth: Distance from root to node
- Level: All nodes at same depth
\\\`\\\`\\\`

**Key Properties:**
- **N nodes** → **N-1 edges**
- **Height** = max depth of any node
- **Balanced** if height = O(log n)

#### Level 2: Binary Tree

A tree where each node has **at most 2 children** (left and right).

**Types of Binary Trees:**

**1. Full Binary Tree**
\\\`\\\`\\\`
Every node has 0 or 2 children

      1
     / \\
    2   3
   / \\
  4   5
\\\`\\\`\\\`

**2. Complete Binary Tree**
\\\`\\\`\\\`
All levels filled except possibly last (filled left to right)

      1
     / \\
    2   3
   / \\  /
  4  5 6
\\\`\\\`\\\`

**3. Perfect Binary Tree**
\\\`\\\`\\\`
All internal nodes have 2 children, all leaves at same level

      1
     / \\
    2   3
   / \\ / \\
  4  5 6  7
\\\`\\\`\\\`

**4. Balanced Binary Tree**
- Height difference between left and right subtrees ≤ 1
- Examples: AVL tree, Red-Black tree

#### Level 3: Binary Search Tree (BST)

**BST Property:**
- Left subtree values < Node value
- Right subtree values > Node value
- Both subtrees are also BSTs

\\\`\\\`\\\`
        8
       / \\
      3   10
     / \\    \\
    1   6    14
       / \\   /
      4   7 13

Search 6:
8 → 3 (6 > 3, go right) → 6 (found!)
\\\`\\\`\\\`

**AVL Tree (Self-Balancing BST):**
- Maintains balance factor: |height(left) - height(right)| ≤ 1
- Rotations: Left, Right, Left-Right, Right-Left
- Guarantees O(log n) operations

### Edge Cases

1. **Empty Tree**: Root = NULL
2. **Single Node**: Root with no children
3. **Skewed Tree**: All nodes in one direction (worst case O(n))
4. **Duplicate Values**: Handle based on requirements

---

## ⏱️ Time & Space Analysis

### Operations Complexity

| Operation | BST (Balanced) | BST (Skewed) | AVL Tree | Array | Hash Table |
|-----------|----------------|--------------|----------|-------|------------|
| **Search** | O(log n) | O(n) | O(log n) | O(n) | O(1) |
| **Insert** | O(log n) | O(n) | O(log n) | O(n) | O(1) |
| **Delete** | O(log n) | O(n) | O(log n) | O(n) | O(1) |
| **Min/Max** | O(log n) | O(n) | O(log n) | O(n) | O(n) |
| **Range Query** | O(log n + k) | O(n) | O(log n + k) | O(n) | O(n) |
| **Space** | O(n) | O(n) | O(n) | O(n) | O(n) |

*k = number of elements in range*

### Trade-offs

**✅ When to Use Trees:**
- Need sorted order
- Range queries
- Hierarchical data
- Efficient search + insert + delete

**❌ When NOT to Use:**
- Need O(1) lookup (use hash table)
- Simple list operations (use array)
- Memory is very limited

---

## 💻 Implementation

### Binary Tree Node

#### C++
\\\`\\\`\\\`cpp
#include <iostream>
#include <queue>
using namespace std;

struct TreeNode {
    int val;
    TreeNode* left;
    TreeNode* right;
    
    TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
};

class BinaryTree {
public:
    TreeNode* root;
    
    BinaryTree() : root(nullptr) {}
    
    // Inorder Traversal (Left, Root, Right)
    void inorder(TreeNode* node) {
        if (!node) return;
        inorder(node->left);
        cout << node->val << " ";
        inorder(node->right);
    }
    
    // Preorder Traversal (Root, Left, Right)
    void preorder(TreeNode* node) {
        if (!node) return;
        cout << node->val << " ";
        preorder(node->left);
        preorder(node->right);
    }
    
    // Postorder Traversal (Left, Right, Root)
    void postorder(TreeNode* node) {
        if (!node) return;
        postorder(node->left);
        postorder(node->right);
        cout << node->val << " ";
    }
    
    // Level Order Traversal (BFS)
    void levelOrder(TreeNode* root) {
        if (!root) return;
        
        queue<TreeNode*> q;
        q.push(root);
        
        while (!q.empty()) {
            TreeNode* node = q.front();
            q.pop();
            
            cout << node->val << " ";
            
            if (node->left) q.push(node->left);
            if (node->right) q.push(node->right);
        }
    }
    
    // Height of tree
    int height(TreeNode* node) {
        if (!node) return 0;
        return 1 + max(height(node->left), height(node->right));
    }
};
\\\`\\\`\\\`

### Binary Search Tree

#### Java
\\\`\\\`\\\`java
class TreeNode {
    int val;
    TreeNode left, right;
    
    TreeNode(int val) {
        this.val = val;
        left = right = null;
    }
}

class BST {
    TreeNode root;
    
    // Insert
    TreeNode insert(TreeNode root, int val) {
        if (root == null) {
            return new TreeNode(val);
        }
        
        if (val < root.val) {
            root.left = insert(root.left, val);
        } else if (val > root.val) {
            root.right = insert(root.right, val);
        }
        
        return root;
    }
    
    // Search
    boolean search(TreeNode root, int val) {
        if (root == null) return false;
        
        if (val == root.val) return true;
        
        if (val < root.val) {
            return search(root.left, val);
        } else {
            return search(root.right, val);
        }
    }
    
    // Delete
    TreeNode delete(TreeNode root, int val) {
        if (root == null) return null;
        
        if (val < root.val) {
            root.left = delete(root.left, val);
        } else if (val > root.val) {
            root.right = delete(root.right, val);
        } else {
            // Node to delete found
            
            // Case 1: No children (leaf)
            if (root.left == null && root.right == null) {
                return null;
            }
            
            // Case 2: One child
            if (root.left == null) return root.right;
            if (root.right == null) return root.left;
            
            // Case 3: Two children
            // Find inorder successor (smallest in right subtree)
            TreeNode successor = findMin(root.right);
            root.val = successor.val;
            root.right = delete(root.right, successor.val);
        }
        
        return root;
    }
    
    TreeNode findMin(TreeNode root) {
        while (root.left != null) {
            root = root.left;
        }
        return root;
    }
}
\\\`\\\`\\\`

#### Python
\\\`\\\`\\\`python
class TreeNode:
    def __init__(self, val):
        self.val = val
        self.left = None
        self.right = None

class BST:
    def __init__(self):
        self.root = None
    
    def insert(self, val):
        self.root = self._insert_recursive(self.root, val)
    
    def _insert_recursive(self, node, val):
        if not node:
            return TreeNode(val)
        
        if val < node.val:
            node.left = self._insert_recursive(node.left, val)
        elif val > node.val:
            node.right = self._insert_recursive(node.right, val)
        
        return node
    
    def search(self, val):
        return self._search_recursive(self.root, val)
    
    def _search_recursive(self, node, val):
        if not node or node.val == val:
            return node
        
        if val < node.val:
            return self._search_recursive(node.left, val)
        else:
            return self._search_recursive(node.right, val)
    
    def inorder(self):
        result = []
        self._inorder_recursive(self.root, result)
        return result
    
    def _inorder_recursive(self, node, result):
        if node:
            self._inorder_recursive(node.left, result)
            result.append(node.val)
            self._inorder_recursive(node.right, result)

# Usage
bst = BST()
for val in [8, 3, 10, 1, 6, 14]:
    bst.insert(val)

print(bst.inorder())  # [1, 3, 6, 8, 10, 14]
print(bst.search(6))  # TreeNode object
\\\`\\\`\\\`

#### JavaScript/TypeScript
\\\`\\\`\\\`typescript
class TreeNode {
    val: number;
    left: TreeNode | null;
    right: TreeNode | null;
    
    constructor(val: number) {
        this.val = val;
        this.left = null;
        this.right = null;
    }
}

class BST {
    root: TreeNode | null = null;
    
    insert(val: number): void {
        this.root = this.insertRecursive(this.root, val);
    }
    
    private insertRecursive(node: TreeNode | null, val: number): TreeNode {
        if (!node) return new TreeNode(val);
        
        if (val < node.val) {
            node.left = this.insertRecursive(node.left, val);
        } else if (val > node.val) {
            node.right = this.insertRecursive(node.right, val);
        }
        
        return node;
    }
    
    search(val: number): TreeNode | null {
        return this.searchRecursive(this.root, val);
    }
    
    private searchRecursive(node: TreeNode | null, val: number): TreeNode | null {
        if (!node || node.val === val) return node;
        
        if (val < node.val) {
            return this.searchRecursive(node.left, val);
        } else {
            return this.searchRecursive(node.right, val);
        }
    }
    
    // Iterative inorder (using stack)
    inorderIterative(): number[] {
        const result: number[] = [];
        const stack: TreeNode[] = [];
        let current = this.root;
        
        while (current || stack.length > 0) {
            while (current) {
                stack.push(current);
                current = current.left;
            }
            
            current = stack.pop()!;
            result.push(current.val);
            current = current.right;
        }
        
        return result;
    }
}
\\\`\\\`\\\`

---

## 🏢 Real-World Usage

### System Examples

#### 1. **File System**
\\\`\\\`\\\`python
class FileNode:
    def __init__(self, name, is_file=False):
        self.name = name
        self.is_file = is_file
        self.children = []  # Directories can have children
        self.content = ""   # Files have content
    
    def add_child(self, child):
        if not self.is_file:
            self.children.append(child)
    
    def find(self, name):
        if self.name == name:
            return self
        
        for child in self.children:
            result = child.find(name)
            if result:
                return result
        
        return None

# Usage
root = FileNode("/", is_file=False)
home = FileNode("home", is_file=False)
user = FileNode("user", is_file=False)
doc = FileNode("document.txt", is_file=True)

root.add_child(home)
home.add_child(user)
user.add_child(doc)
\\\`\\\`\\\`

#### 2. **Expression Tree**
\\\`\\\`\\\`javascript
// Evaluate mathematical expression: (3 + 5) * 2
class ExpressionNode {
    constructor(value, left = null, right = null) {
        this.value = value;
        this.left = left;
        this.right = right;
    }
    
    evaluate() {
        // Leaf node (number)
        if (!this.left && !this.right) {
            return parseFloat(this.value);
        }
        
        // Operator node
        const leftVal = this.left.evaluate();
        const rightVal = this.right.evaluate();
        
        switch (this.value) {
            case '+': return leftVal + rightVal;
            case '-': return leftVal - rightVal;
            case '*': return leftVal * rightVal;
            case '/': return leftVal / rightVal;
        }
    }
}

// Build tree for (3 + 5) * 2
const tree = new ExpressionNode('*',
    new ExpressionNode('+',
        new ExpressionNode('3'),
        new ExpressionNode('5')
    ),
    new ExpressionNode('2')
);

console.log(tree.evaluate());  // 16
\\\`\\\`\\\`

#### 3. **Autocomplete (Trie)**
\\\`\\\`\\\`cpp
class TrieNode {
public:
    unordered_map<char, TrieNode*> children;
    bool isEndOfWord;
    
    TrieNode() : isEndOfWord(false) {}
};

class Trie {
private:
    TrieNode* root;
    
public:
    Trie() {
        root = new TrieNode();
    }
    
    void insert(string word) {
        TrieNode* node = root;
        for (char c : word) {
            if (node->children.find(c) == node->children.end()) {
                node->children[c] = new TrieNode();
            }
            node = node->children[c];
        }
        node->isEndOfWord = true;
    }
    
    bool search(string word) {
        TrieNode* node = root;
        for (char c : word) {
            if (node->children.find(c) == node->children.end()) {
                return false;
            }
            node = node->children[c];
        }
        return node->isEndOfWord;
    }
    
    bool startsWith(string prefix) {
        TrieNode* node = root;
        for (char c : prefix) {
            if (node->children.find(c) == node->children.end()) {
                return false;
            }
            node = node->children[c];
        }
        return true;
    }
};
\\\`\\\`\\\`

---

## 🎯 Interview Angle

### Common Traps

1. **Null Pointer Errors**
   \\\`\\\`\\\`python
   # ❌ Wrong - crashes if node is None
   def height(node):
       return 1 + max(height(node.left), height(node.right))
   
   # ✅ Correct - check None first
   def height(node):
       if not node:
           return 0
       return 1 + max(height(node.left), height(node.right))
   \\\`\\\`\\\`

2. **Recursion Stack Overflow**
   \\\`\\\`\\\`java
   // For very deep trees, use iterative approach
   // Recursive depth can exceed stack limit
   
   // ✅ Iterative inorder using stack
   List<Integer> inorderIterative(TreeNode root) {
       List<Integer> result = new ArrayList<>();
       Stack<TreeNode> stack = new Stack<>();
       TreeNode curr = root;
       
       while (curr != null || !stack.isEmpty()) {
           while (curr != null) {
               stack.push(curr);
               curr = curr.left;
           }
           curr = stack.pop();
           result.add(curr.val);
           curr = curr.right;
       }
       
       return result;
   }
   \\\`\\\`\\\`

3. **BST Delete - Two Children Case**
   \\\`\\\`\\\`cpp
   // ❌ Wrong - forgetting to delete successor
   TreeNode* deleteNode(TreeNode* root, int key) {
       // ... find node ...
       
       // Two children
       TreeNode* successor = findMin(root->right);
       root->val = successor->val;
       // Missing: delete successor from right subtree!
   }
   
   // ✅ Correct
   TreeNode* deleteNode(TreeNode* root, int key) {
       // ... find node ...
       
       TreeNode* successor = findMin(root->right);
       root->val = successor->val;
       root->right = deleteNode(root->right, successor->val);
   }
   \\\`\\\`\\\`

### Question Variations

| Pattern | Example Problem | Key Technique |
|---------|----------------|---------------|
| **Traversal** | Inorder/Preorder/Postorder | Recursion or stack |
| **Level Order** | Zigzag Level Order | Queue + direction flag |
| **Path** | Path Sum, Root to Leaf | DFS with backtracking |
| **Validation** | Validate BST | Inorder or range checking |
| **Construction** | Build from Inorder+Preorder | Recursion with indices |
| **LCA** | Lowest Common Ancestor | Recursion or parent pointers |

### Interview Pro Tips

1. **Always clarify:**
   - Is it a BST or general binary tree?
   - Can there be duplicates?
   - Is the tree balanced?
   - Can I modify the tree?

2. **Common techniques:**
   - **DFS**: Recursion for paths, validation
   - **BFS**: Level order, shortest path
   - **Morris Traversal**: O(1) space inorder
   - **Parent Pointers**: For LCA, path queries

3. **Edge cases:**
   - Empty tree (root = null)
   - Single node
   - Skewed tree (all left or all right)
   - Perfect binary tree

---

## 📝 Practice Problems

### Easy
1. **Maximum Depth of Binary Tree** - Recursion
2. **Invert Binary Tree** - Swap left/right
3. **Symmetric Tree** - Mirror check
4. **Same Tree** - Recursive comparison
5. **Path Sum** - DFS with target

### Medium
1. **Validate Binary Search Tree** - Inorder or range
2. **Lowest Common Ancestor of BST** - BST property
3. **Binary Tree Level Order Traversal** - BFS
4. **Construct Binary Tree from Preorder and Inorder** - Recursion
5. **Kth Smallest Element in BST** - Inorder traversal
6. **Binary Tree Right Side View** - Level order
7. **Diameter of Binary Tree** - Height calculation

### Hard
1. **Serialize and Deserialize Binary Tree** - BFS/DFS encoding
2. **Binary Tree Maximum Path Sum** - Recursion with global max
3. **Recover Binary Search Tree** - Inorder + swap
4. **Count Complete Tree Nodes** - Binary search on levels
5. **Binary Tree Cameras** - Greedy + DFS

---

## 🔗 Additional Resources

- [Visualize Trees](https://visualgo.net/en/bst)
- [LeetCode Tree Problems](https://leetcode.com/tag/tree/)
- [Tree Traversal Animations](https://www.cs.usfca.edu/~galles/visualization/BST.html)

---

## 📚 Next Steps

After mastering trees:
1. **Graphs** - Extension of trees with cycles
2. **Heap** - Complete binary tree for priority queue
3. **Segment Tree** - Range query optimization
4. **Fenwick Tree** - Efficient prefix sums

---

*Remember: Trees are the bridge between linear and graph structures. Master them, and you unlock the power of hierarchical thinking.*
    `
};
