import { PortfolioHero } from "@/components/portfolio/Hero";
import { RecruiterSnapshot } from "@/components/portfolio/RecruiterSnapshot";
import { CurrentlyBuilding } from "@/components/portfolio/CurrentlyBuilding";
import { ScrollReveal } from "@/components/portfolio/ScrollReveal";
import { AboutSection } from "@/components/portfolio/AboutSection";
import { ExperienceSection } from "@/components/portfolio/ExperienceSection";
import { ProjectsSection } from "@/components/portfolio/ProjectsSection";
import { TechStack } from "@/components/portfolio/TechStack";
import { CurrentlyImproving } from "@/components/portfolio/CurrentlyImproving";
import { InteractiveTerminal } from "@/components/portfolio/InteractiveTerminal";
import { CredentialsSection } from "@/components/portfolio/CredentialsSection";
import { ResumeCTA } from "@/components/portfolio/ResumeCTA";
import { ContactSection } from "@/components/portfolio/ContactSection";
import { RecruiterChatbot } from "@/components/portfolio/RecruiterChatbot";

export default function Home() {
  return (
    <>
      {/* 01: Full Viewport Hero */}
      <PortfolioHero />

      {/* 02: Live focus and concise recruiter snapshot */}
      <CurrentlyBuilding />
      <ScrollReveal><RecruiterSnapshot /></ScrollReveal>

      {/* 03: Proof of work comes before the biography */}
      <ScrollReveal><ProjectsSection /></ScrollReveal>

      {/* 04: About and professional journey */}
      <ScrollReveal><AboutSection /></ScrollReveal>
      <ScrollReveal><ExperienceSection /></ScrollReveal>

      {/* 05: Technologies I use — evidence-based, no arbitrary percentages */}
      <ScrollReveal><TechStack /></ScrollReveal>

      {/* 07: Currently Improving (Progression Pipeline & Topics) */}
      <ScrollReveal><CurrentlyImproving /></ScrollReveal>

      {/* 08: Terminal Experience (Full Width Dark, Real Commands) */}
      <ScrollReveal><InteractiveTerminal /></ScrollReveal>

      {/* 09: Credentials (Achievements, Certifications, Education) */}
      <ScrollReveal><CredentialsSection /></ScrollReveal>

      {/* 10: Resume CTA (Magnetic Button) */}
      <ScrollReveal><ResumeCTA /></ScrollReveal>

      {/* 11: Contact (Direct Channels & Minimal Apple Form) */}
      <ScrollReveal><ContactSection /></ScrollReveal>

      {/* 12: Recruiter AI Chatbot (Gemini Powered) */}
      <RecruiterChatbot />
    </>
  );
}
