import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        container: {
            center: true,
            padding: "2rem",
            screens: {
                "2xl": "1400px",
            },
        },
        extend: {
            colors: {
                background: "var(--background)",
                foreground: "var(--foreground)",
                primary: {
                    DEFAULT: "hsl(var(--primary-h), var(--primary-s), var(--primary-l))",
                    foreground: "hsl(var(--primary-foreground-h), var(--primary-foreground-s), var(--primary-foreground-l))",
                },
                muted: {
                    DEFAULT: "hsl(var(--muted-h), var(--muted-s), var(--muted-l))",
                    foreground: "hsl(var(--muted-foreground-h), var(--muted-foreground-s), var(--muted-foreground-l))",
                },
                accent: {
                    DEFAULT: "hsl(var(--accent-h), var(--accent-s), var(--accent-l))",
                    foreground: "hsl(var(--accent-foreground-h), var(--accent-foreground-s), var(--accent-foreground-l))",
                },
                border: "hsl(var(--border-h), var(--border-s), var(--border-l))",
            },
            fontFamily: {
                sans: ["var(--font-outfit)", "ui-sans-serif", "system-ui"],
                mono: ["var(--font-mono)", "ui-monospace", "SFMono-Regular"],
            },
            backgroundImage: {
                'glass-gradient': 'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)',
            },
            boxShadow: {
                'premium': '0 20px 40px -15px rgba(0, 0, 0, 0.1), 0 10px 20px -10px rgba(0, 0, 0, 0.04)',
                'glass': 'inset 0 1px 1px rgba(255, 255, 255, 0.1)',
            },
            animation: {
                'float': 'float 6s ease-in-out infinite',
                'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
            },
            keyframes: {
                float: {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-20px)' },
                }
            }
        },
    },
    plugins: [],
};
export default config;
