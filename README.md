# 🚀 ScaleForge

> **Forge Your Sovereign Architecture**  
> The definitive knowledge base for building high-scale, fault-tolerant systems and mastering professional software design.

[![Next.js](https://img.shields.io/badge/Next.js-16.1.4-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.2.3-61DAFB?style=for-the-badge&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind-4.1.18-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)

---

## 📖 Overview

**ScaleForge** is a modern, interactive engineering documentation platform designed to help developers master the art of building scalable, production-ready systems. From fundamental data structures to planetary-scale distributed architectures, ScaleForge provides structured learning paths across critical engineering domains.

### ✨ Key Features

- 🎯 **Structured Learning Paths** - Progressive roadmaps from beginner to advanced levels
- 🏗️ **6 Core Engineering Domains** - DSA, System Design, Backend, Languages, DevOps, and Databases
- 📚 **Comprehensive Documentation** - In-depth articles with real-world examples
- 🎨 **Modern UI/UX** - Premium glassmorphic design with 3D animations
- 📱 **Fully Responsive** - Mobile-first design optimized for all devices
- 🔍 **Smart Search** - Quick access to any topic (Ctrl+K)
- 🌙 **Dark Mode** - Eye-friendly interface for extended learning sessions
- ⚡ **Performance Optimized** - Built with Next.js 16 for blazing-fast load times

---

## 🎓 Learning Domains

### 1. **DSA Mastery Hub** 🔢
Master the building blocks of software engineering with production-optimized patterns.

**Progression:**
- **Phase 1: Foundations** - Arrays, Strings, Linked Lists
- **Phase 2: Complex Structures** - Stacks, Queues, Hash Tables, Trees, Heaps
- **Phase 3: Algo Excellence** - Recursion, Dynamic Programming, Graph Algorithms

### 2. **Architect's Hub** 🏛️
Learn to design systems that serve millions with scalability and reliability.

**Progression:**
- **Phase 1: Foundations** - System Design Basics, Monolith vs Microservices
- **Phase 2: Scale & Safety** - Consistent Hashing, Rate Limiting, URL Shorteners
- **Phase 3: Global Blueprints** - Chat Systems, Job Queues, Search Engines

### 3. **Backend Engineering Hub** ⚙️
Master server-side logic, APIs, and microservices architecture.

**Progression:**
- **Phase 1: API Foundations** - RESTful APIs, Authentication, Databases
- **Phase 2: Performance** - NoSQL, Message Queues, Database Scaling
- **Phase 3: Resilience** - Service Communication, Fault Tolerance, Observability

### 4. **Language Mastery Hub** 💻
Deep dive into programming languages, concurrency, and performance tuning.

**Progression:**
- **Phase 1: Foundations** - Python, Go, TypeScript, SQL
- **Phase 2: Paradigms** - Advanced TypeScript, Java/JVM, C++, Go Concurrency
- **Phase 3: Systems Internal** - Async Programming, Metaprogramming, V8 Internals

### 5. **DevOps & SRE Hub** 🔧
Master infrastructure as code, CI/CD, and observability.

**Progression:**
- **Cloud Foundations** - Docker, Kubernetes, Container Orchestration
- **Infrastructure as Code** - Service Communication, Fault Tolerance
- **Reliability Engineering** - Logging Architecture, Auth Platforms

### 6. **Database Internals Hub** 💾
Understand storage engines, indexing theory, and distributed consensus.

**Progression:**
- **Storage Engine** - SQL Fundamentals, PostgreSQL, MySQL
- **Scalability** - NoSQL Architecture, SQL Optimization
- **Consistency** - Replication, Sharding, Consensus Algorithms

---

## 🛠️ Tech Stack

### **Frontend**
- **Framework:** Next.js 16.1.4 (App Router)
- **UI Library:** React 19.2.3
- **Language:** TypeScript 5.x
- **Styling:** TailwindCSS 4.1.18
- **Animations:** Framer Motion 12.27.5
- **3D Graphics:** Three.js + React Three Fiber
- **Icons:** Lucide React

### **UI Components**
- Radix UI (Progress, Scroll Area, Separator)
- Custom glassmorphic components
- Responsive navigation system

### **State Management**
- TanStack Query (React Query) 5.90.19
- React Context API

### **Content**
- Markdown rendering with React Markdown
- Syntax highlighting with Prism.js
- GitHub Flavored Markdown support

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** 20.x or higher
- **npm** or **yarn** or **pnpm** or **bun**

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd GGF
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Build for Production

```bash
npm run build
npm start
```

### Linting

```bash
npm run lint
```

---

## 📁 Project Structure

```
GGF/
├── public/              # Static assets
├── src/
│   ├── app/            # Next.js App Router pages
│   │   ├── hub/        # Domain hub pages
│   │   ├── learn/      # Learning content pages
│   │   ├── profile/    # User profile
│   │   ├── roadmaps/   # Learning roadmaps
│   │   └── ...
│   ├── components/     # React components
│   │   ├── ui/         # Reusable UI components
│   │   ├── Navbar.tsx
│   │   ├── Footer.tsx
│   │   ├── DomainHub.tsx
│   │   └── ThreeHero.tsx
│   ├── data/           # Content and data
│   │   ├── articles/   # Learning articles
│   │   ├── backend/    # Backend-related data
│   │   ├── dsa/        # DSA content
│   │   ├── system-design/
│   │   └── hubs.ts     # Hub configuration
│   ├── hooks/          # Custom React hooks
│   └── lib/            # Utility functions
├── tailwind.config.ts  # Tailwind configuration
├── next.config.ts      # Next.js configuration
└── package.json
```

---

## 🎨 Design Philosophy

ScaleForge follows a **premium, modern design aesthetic** with:

- **Glassmorphism** - Frosted glass effects for depth and elegance
- **3D Transformations** - Subtle perspective shifts on hover
- **Smooth Animations** - Framer Motion for fluid interactions
- **Dark Theme** - Eye-friendly color palette optimized for reading
- **Typography** - Bold, black font weights for strong visual hierarchy
- **Micro-interactions** - Engaging hover states and transitions

---

## 📱 Responsive Design

The platform is fully responsive with breakpoints optimized for:

- 📱 **Mobile** (< 640px) - Touch-optimized navigation and content
- 📱 **Tablet** (640px - 1024px) - Adaptive layouts
- 💻 **Desktop** (> 1024px) - Full-featured experience with 3D effects

---

## 🤝 Contributing

We welcome contributions! Whether it's:

- 📝 Adding new articles or tutorials
- 🐛 Fixing bugs
- ✨ Proposing new features
- 🎨 Improving UI/UX

Please visit the `/contribute` page for guidelines.

---

## 📄 License

This project is private and proprietary.

---

## 🔗 Links

- **Live Demo:** [http://localhost:3000](http://localhost:3000)
- **Documentation:** In-platform learning paths
- **Version:** 1.0.4 (Engineering Blueprint)

---

## 🙏 Acknowledgments

Built with modern web technologies:
- [Next.js](https://nextjs.org/) - The React Framework
- [TailwindCSS](https://tailwindcss.com/) - Utility-first CSS
- [Framer Motion](https://www.framer.com/motion/) - Animation library
- [Three.js](https://threejs.org/) - 3D graphics
- [Radix UI](https://www.radix-ui.com/) - Accessible components

---

<div align="center">

**Built with ❤️ for engineers who build the future**

*Forge Your Sovereign Architecture* 🚀

</div>
