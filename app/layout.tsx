import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import { Toaster } from "react-hot-toast";
import { PortfolioNavbar } from "@/components/portfolio/Navbar";
import { PortfolioFooter } from "@/components/portfolio/Footer";
import { CustomCursor } from "@/components/portfolio/CustomCursor";
import { ScrollProgress } from "@/components/portfolio/ScrollProgress";
import DevSWCleanup from "@/components/DevSWCleanup";
import "./globals.css";
import "@/styles/apple-developer.css";
import "@/styles/developer-portfolio.css";
import "@/styles/premium-experience.css";


export const metadata: Metadata = {
  title: "Pradeepkumar R — Full Stack Developer & AI Product Builder",
  description:
    "Pradeepkumar R is a Computer Science Engineering student and full-stack developer building practical web applications, AI-enabled products, APIs, and useful digital experiences.",
  keywords: [
    "PradeepKumar R",
    "Software Developer",
    "Full Stack Developer",
    "React",
    "Node.js",
    "Python",
    "JavaScript",
    "TypeScript",
    "SQL",
    "MongoDB",
    "Coimbatore Developer",
    "Portfolio"
  ],
  authors: [{ name: "PradeepKumar R" }],
  creator: "PradeepKumar R",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://pradeep-portfolio-75et.vercel.app",
    title: "Pradeepkumar R — Full Stack Developer & AI Product Builder",
    description:
      "Full-stack developer and product builder focused on practical software, AI-enabled workflows, and thoughtful digital experiences.",
    siteName: "PradeepKumar R Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Pradeepkumar R — Full Stack Developer & AI Product Builder",
    description:
      "Projects, engineering experience, full-stack development, and AI-enabled product work by Pradeepkumar R.",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": "https://pradeep-portfolio-75et.vercel.app/#person",
      name: "PradeepKumar R",
      jobTitle: "Full Stack Developer · AI Product Builder",
      url: "https://pradeep-portfolio-75et.vercel.app",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Coimbatore",
        addressRegion: "Tamil Nadu",
        addressCountry: "India",
      },
      sameAs: [
        "https://github.com/Pradeepk0606",
        "https://www.linkedin.com/in/pradeepkumar--r/"
      ],
      knowsAbout: [
        "Python",
        "JavaScript",
        "TypeScript",
        "React.js",
        "Node.js",
        "Express.js",
        "SQL",
        "MySQL",
        "MongoDB",
        "REST APIs",
        "Software Engineering",
        "AI-enabled Applications",
        "Product Development"
      ]
    },
    {
      "@type": "ProfilePage",
      "@id": "https://pradeep-portfolio-75et.vercel.app/#webpage",
      url: "https://pradeep-portfolio-75et.vercel.app",
      name: "Pradeepkumar R — Full Stack Developer & AI Product Builder",
      about: { "@id": "https://pradeep-portfolio-75et.vercel.app/#person" },
      description:
        "Portfolio of Pradeepkumar R, a Computer Science Engineering student building full-stack applications and AI-enabled products."
    }
  ]
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <div className="developer-bg" aria-hidden="true" />
        <ScrollProgress />
        <CustomCursor />
        <DevSWCleanup />
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          forcedTheme="dark"
          disableTransitionOnChange
        >
          <PortfolioNavbar />
          <main id="main-content">{children}</main>
          <PortfolioFooter />
          <Toaster
            position="bottom-right"
            toastOptions={{
              duration: 3000,
              style: {
                background: "#111827",
                color: "#FFFFFF",
                border: "1px solid rgba(255, 255, 255, 0.1)",
              },
            }}
          />
        </ThemeProvider>
      </body>
    </html>
  );
}
