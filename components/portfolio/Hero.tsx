"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { ArrowDownRight, ArrowUpRight, Github, Linkedin, Sparkles } from "lucide-react";
import { portfolioData } from "@/lib/data/portfolio-data";

const HeroScene = dynamic(
  () => import("./HeroScene").then((module) => module.HeroScene),
  {
    ssr: false,
    loading: () => <div className="hero-scene-loading" aria-hidden="true"><span className="hero-loading-core" /></div>,
  }
);

export function PortfolioHero() {
  const p = portfolioData.personal;

  return (
    <section id="home" className="apple-hero nova-hero section-dark">
      <div className="nova-hero-backdrop" aria-hidden="true">
        <div className="nova-grid-lines" />
        <div className="nova-glow nova-glow-one" />
        <div className="nova-glow nova-glow-two" />
      </div>

      <div className="apple-container nova-hero-container">
        <div className="nova-hero-copy">
          <div className="hero-status-pill nova-status-pill">
            <span className="status-dot" />
            <span>{p.status}</span>
          </div>

          <p className="nova-overline"><span>PRD / 2026</span> — DIGITAL PORTFOLIO</p>
          <h1 className="nova-hero-title">
            <span className="nova-name-line">Pradeepkumar</span>
            <span className="nova-name-line nova-name-accent">R<span className="nova-title-period">.</span></span>
          </h1>

          <div className="nova-positioning">
            <span className="nova-positioning-mark" />
            {p.eyebrow}
          </div>

          <h2 className="nova-hero-statement">
            {p.headlineStart}
            <span>{p.headlineHighlight}</span>
          </h2>
          <p className="nova-hero-description">{p.supportingText}</p>

          <div className="nova-hero-actions">
            <a href="#projects" className="nova-button nova-button-primary" data-cursor-text="Explore work">
              Explore selected work <ArrowUpRight size={17} />
            </a>
            <a href="/resume" target="_blank" rel="noopener noreferrer" className="nova-button nova-button-ghost" data-cursor-text="Resume">
              View résumé <ArrowUpRight size={16} />
            </a>
          </div>

          <div className="nova-social-row">
            <a href={p.github} target="_blank" rel="noopener noreferrer" className="nova-social-link"><Github size={16} /> GitHub</a>
            <a href={p.linkedin} target="_blank" rel="noopener noreferrer" className="nova-social-link"><Linkedin size={16} /> LinkedIn</a>
            <span className="nova-social-divider" />
            <span className="nova-location-label">{p.location}</span>
          </div>

          <div className="nova-hero-proof">
            <div className="nova-proof-item"><strong>05</strong><span>Technical internships</span></div>
            <div className="nova-proof-separator" />
            <div className="nova-proof-item"><strong>8.57</strong><span>Latest stated CGPA</span></div>
            <div className="nova-proof-separator" />
            <div className="nova-proof-item"><strong>2027</strong><span>Graduation target</span></div>
          </div>
        </div>

        <div className="nova-hero-visual">
          <div className="nova-visual-index"><span>01</span> / CREATIVE ENGINEERING</div>
          <div className="nova-scene-frame">
            <div className="nova-scene-aura" />
            <HeroScene />
            <div className="nova-scene-caption"><Sparkles size={13} /><span>YOUR NEXT DIGITAL CO-PILOT</span></div>
          </div>

          <div className="nova-floating-card nova-card-profile">
            <div className="nova-avatar-wrap">
              <Image src={p.profileImage} alt={`${p.name} profile`} width={54} height={54} priority />
              <span className="nova-avatar-ring" />
            </div>
            <div><strong>{p.name}</strong><span>Full Stack Developer</span></div>
            <span className="nova-card-arrow"><ArrowUpRight size={15} /></span>
          </div>

          <div className="nova-floating-card nova-card-code">
            <div className="nova-code-top"><span className="nova-code-dot" /><span className="nova-code-dot" /><span className="nova-code-dot" /><span>builder.ts</span></div>
            <code><i>const</i> mindset = &#123;<br />&nbsp;&nbsp;build: <b>true</b>,<br />&nbsp;&nbsp;curiosity: <b>true</b><br />&#125;;</code>
          </div>

          <div className="nova-orbit-label nova-orbit-label-one">AI / ML</div>
          <div className="nova-orbit-label nova-orbit-label-two">FULL STACK</div>
          <div className="nova-orbit-label nova-orbit-label-three">PRODUCT THINKING</div>
        </div>
      </div>

      <a className="nova-scroll-cue" href="#about" aria-label="Scroll to about section">
        <span>SCROLL TO EXPLORE</span><ArrowDownRight size={15} />
      </a>
    </section>
  );
}
