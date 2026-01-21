import { Article } from "@/hooks/useArticles";

export const PYTHON_ARTICLES: Article[] = [
    {
        id: "py-foundations-exhaustive",
        slug: "python-fundamentals-and-syntax",
        title: "Python: Syntax, Types & The Zen",
        description: "Comprehensive guide to Python fundamentals. From indentation to the underlying data model.",
        category: "Languages",
        difficulty: "Beginner",
        tags: ["Python", "Foundations", "Basics"],
        viewCount: 22000,
        updatedAt: "2024-04-14",
        author: "Scaleforge Python Team",
        content: `
# Python Foundations: Readability as Code

Python is governed by PEP 20 (The Zen of Python), which states: "Beautiful is better than ugly."

## 1. The Core Data Types
Python is **Strongly Typed** but **Dynamically Typed**.
- **Mutable:** Lists, Dictionaries, Sets.
- **Immutable:** Integers, Strings, Tuples, Floats.

**Why it matters?**
Passing an immutable object to a function ensures it cannot be modified by side effects.

---

## 2. Advanced Control Flow
Beyond \`if/else\`, Pythonic code uses **Comprehensions** and **Generators**.
- **Generators:** Use \`yield\` to process data without loading it all into memory. Essential for "Big Data" processing.

\`\`\`python
def log_reader(file_path):
    with open(file_path) as f:
        for line in f:
            if "ERROR" in line:
                yield line # Memory efficient streaming
\`\`\`

---

## 3. High-Performance Implementations
- **Slots:** Use \`__slots__\` to reduce memory footprint of classes by 50%+.
- **Built-in functions:** \`map()\`, \`filter()\`, and \`zip()\` are implemented in C and are faster than manual loops.

---

## 4. Production Tips
- Use **Type Hinting** (\`typing\`) to catch bugs before runtime.
- Always use **Virtual Environments** (\`venv\`) to isolate project dependencies.
        `
    },
    {
        id: "py-oop-advanced",
        slug: "python-oop-inheritance-mixins-and-mro",
        title: "Advanced OOP: Mixins, MRO & Metaclasses",
        description: "Mastering Python's object model. Understanding Method Resolution Order and class decorators.",
        category: "Languages",
        difficulty: "Advanced",
        tags: ["Python", "OOP", "Architecture"],
        viewCount: 15400,
        updatedAt: "2024-04-14",
        author: "Scaleforge Python Team",
        content: `
# Python OOP: Architecture of Logic

In Python, everything is an object—including classes themselves.

## 1. The MRO (Method Resolution Order)
Python uses the **C3 Linearization** algorithm to decide which method to call in Multiple Inheritance.
- Use \`ClassName.mro()\` to see the lookup list.
- Use \`super()\` to follow the MRO path correctly.

---

## 2. Mixins: Composition Over Inheritance
Mixins are classes that provide specific functionality but aren't meant to stand alone.
\`\`\`python
class SerializationMixin:
    def to_json(self):
        return json.dumps(self.__dict__)

class User(BaseModel, SerializationMixin):
    pass
\`\`\`

---

## 3. Metaclasses (The "Wizard" Level)
A Metaclass is a class that creates other classes.
- **Use case:** Enforcing strict naming conventions or automatically registering classes into a factory.

## 4. Best Practices
- Favor **Composition** over Inheritance.
- Use **Abstract Base Classes (abc)** to define strict interfaces for your team.
        `
    },
    {
        id: "py-async-concurrency",
        slug: "python-asyncio-concurrency-patterns",
        title: "AsyncIO: High-Concurrency Python",
        description: "Breaking the GIL. Master asynchronous event loops, coroutines, and task management.",
        category: "Languages",
        difficulty: "Advanced",
        tags: ["Python", "Concurrency", "AsyncIO", "Performance"],
        viewCount: 18900,
        updatedAt: "2024-04-14",
        author: "Scaleforge Core",
        content: `
# AsyncIO: Concurrency Without Threads

Python's **Global Interpreter Lock (GIL)** makes multi-threading slow for CPU tasks. **AsyncIO** solves this for IO tasks by using a single-threaded event loop.

## 1. Coroutines: \`async\` and \`await\`
- \`async def\`: Creates a coroutine (doesn't run immediately).
- \`await\`: Suspends the current coroutine until the result is ready, allowing other tasks to run.

---

## 2. The Task Pipeline
\`\`\`python
import asyncio

async def fetch_data(id):
    await asyncio.sleep(1) # Simulate network IO
    return f"Data {id}"

async def main():
    # Run 1000 requests concurrently
    tasks = [fetch_data(i) for i in range(1000)]
    results = await asyncio.gather(*tasks)
\`\`\`

---

## 3. Real-World Motivation
Use AsyncIO for:
- **API Gateways:** Proxying thousands of requests.
- **Chat Servers:** Managing many persistent WebSocket connections.
- **Web Scrapers:** Fetching pages without waiting for each one sequentially.

---

## 4. Common Pitfalls
- **Blocking the Loop:** Never put a \`time.sleep()\` or a heavy calculation inside an async function. It locks the entire system. Use \`run_in_executor\` for CPU-heavy tasks.
        `
    }
];
