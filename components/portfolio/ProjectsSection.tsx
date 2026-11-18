"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { ArrowUpRight, Github, CheckCircle2, ShieldCheck, Activity, MapPin, Calendar, Clock, UserCheck } from "lucide-react";
import { portfolioData, FeaturedProject, ProjectItem } from "@/lib/data/portfolio-data";

export function ProjectsSection() {
  const featured = portfolioData.featuredProjects;
  const more = portfolioData.moreProjects;

  // Track 3D tilt per project card
  const [tiltMap, setTiltMap] = useState<Record<string, { x: number; y: number }>>({});

  // Interactive state for project mockups
  const [bookingStatus, setBookingStatus] = useState<"pending" | "approved" | "rejected">("pending");
  const [supplyChainStep, setSupplyChainStep] = useState(0); // illustrative workflow stage
  const [careerPathTab, setCareerPathTab] = useState<"skills" | "roadmap" | "swot">("roadmap");
  const [hospitalTriageFilter, setHospitalTriageFilter] = useState<"all" | "icu" | "emergency">("all");

  const handleTiltMove = (id: string, e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const mouseX = e.clientX - centerX;
    const mouseY = e.clientY - centerY;

    const rotY = (mouseX / (rect.width / 2)) * 6;
    const rotX = -(mouseY / (rect.height / 2)) * 6;

    setTiltMap((prev) => ({ ...prev, [id]: { x: rotX, y: rotY } }));
  };

  const handleTiltLeave = (id: string) => {
    setTiltMap((prev) => ({ ...prev, [id]: { x: 0, y: 0 } }));
  };

  const supplySteps = [
    { title: "Wild Harvest", loc: "Origin record" },
    { title: "Geo-Collection", loc: "GPS-tagged record" },
    { title: "Lab Verification", loc: "Certificate record" },
    { title: "QR Verification", loc: "Provenance record" },
    { title: "Consumer", loc: "QR scan view" }
  ];

  return (
    <section id="projects" className="apple-projects section-dark">
      <div className="apple-container">
        
        {/* Section Header */}
        <div>
          <div className="apple-eyebrow">PORTFOLIO WORK</div>
          <h2 className="apple-section-headline">Selected work.</h2>
          <p className="apple-section-subheadline">
            Applications built to solve practical problems. Featuring end-to-end architectures, authenticated flows, and responsive UI engineering.
          </p>
        </div>

        {/* Featured project case studies */}
        <div className="featured-project-container">
          {featured.map((proj, index) => {
            const isReverse = index % 2 !== 0;
            const currentTilt = tiltMap[proj.id] || { x: 0, y: 0 };

            return (
              <div
                key={proj.id}
                className={`featured-project-card ${isReverse ? "reverse" : ""}`}
              >
                {/* Visual Preview / 3D Tilt Mockup */}
                <div
                  className="project-3d-wrapper"
                  onMouseMove={(e) => handleTiltMove(proj.id, e)}
                  onMouseLeave={() => handleTiltLeave(proj.id)}
                >
                  <div
                    className="project-device-mockup"
                    style={{
                      transform: `rotateX(${currentTilt.x}deg) rotateY(${currentTilt.y}deg)`
                    }}
                  >
                    <div className="project-device-header">
                      <span className="window-dot red" />
                      <span className="window-dot yellow" />
                      <span className="window-dot green" />
                      <span style={{ marginLeft: "0.5rem", fontSize: "11px", color: "#86868B", fontFamily: "var(--font-mono)" }}>
                        PROJECT / {proj.id}
                      </span>
                    </div>

                    <div className="project-device-preview">
                      {/* Aegis Recruit: illustrative hiring workflow preview */}
                      {proj.visualType === "recruitment" && (
                        <div className="recruitment-preview">
                          <div className="recruitment-preview-heading">
                            <div>
                              <div className="recruitment-kicker">AEGIS / RECRUITMENT INTELLIGENCE</div>
                              <div className="recruitment-title">Hiring workspace</div>
                            </div>
                            <span className="recruitment-live-tag"><span /> MVP / IN DEVELOPMENT</span>
                          </div>
                          <div className="recruitment-steps">
                            {[
                              { n: "01", title: "Aptitude", detail: "AI-assisted assessment", state: "active" },
                              { n: "02", title: "Coding", detail: "Problem + test workflow", state: "" },
                              { n: "03", title: "Technical", detail: "AI-supported interview", state: "" },
                              { n: "04", title: "HR panel", detail: "Human final decision", state: "" },
                            ].map((step) => (
                              <div className={`recruitment-step ${step.state}`} key={step.n}>
                                <span className="recruitment-step-number">{step.n}</span>
                                <strong>{step.title}</strong>
                                <small>{step.detail}</small>
                              </div>
                            ))}
                          </div>
                          <div className="recruitment-insight-row">
                            <div className="recruitment-insight-icon"><ShieldCheck size={17} /></div>
                            <div><strong>Human-governed evaluation</strong><span>AI assists the workflow. People make the hiring decision.</span></div>
                            <span className="recruitment-insight-status">DESIGNED</span>
                          </div>
                          <div className="recruitment-footer-tags"><span>Resume intelligence</span><span>Assessment flow</span><span>Evaluation summaries</span></div>
                        </div>
                      )}

                      {/* Interactive Mockup 02: BookIt Now */}
                      {proj.visualType === "booking" && (
                        <div style={{ padding: "1.75rem", width: "100%" }}>
                          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.25rem" }}>
                            <div>
                              <div style={{ fontSize: "11px", color: "var(--color-accent-blue)", fontWeight: 700 }}>BOOKIT NOW CONSOLE</div>
                              <div style={{ fontSize: "16px", fontWeight: 700, color: "#FFFFFF" }}>Appointment Dashboard</div>
                            </div>
                            <span style={{ fontSize: "11px", padding: "3px 8px", borderRadius: "999px", background: "rgba(52, 199, 89, 0.15)", color: "#34C759", fontWeight: 600 }}>
                              UI PREVIEW
                            </span>
                          </div>

                          <div style={{ background: "#111116", borderRadius: "12px", padding: "1.25rem", border: "1px solid rgba(255, 255, 255, 0.08)" }}>
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.75rem" }}>
                              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                                <Calendar size={14} color="#0071E3" />
                                <span style={{ fontSize: "13px", fontWeight: 600, color: "#FFFFFF" }}>Appointment preview</span>
                              </div>
                              <div style={{ display: "flex", gap: "0.25rem" }}>
                                <button
                                  type="button"
                                  onClick={() => setBookingStatus("approved")}
                                  style={{
                                    fontSize: "11px",
                                    padding: "2px 8px",
                                    borderRadius: "4px",
                                    border: "none",
                                    background: bookingStatus === "approved" ? "#34C759" : "rgba(255, 255, 255, 0.08)",
                                    color: bookingStatus === "approved" ? "#000000" : "#A1A1A6",
                                    cursor: "pointer",
                                    fontWeight: 600
                                  }}
                                >
                                  Approve
                                </button>
                                <button
                                  type="button"
                                  onClick={() => setBookingStatus("rejected")}
                                  style={{
                                    fontSize: "11px",
                                    padding: "2px 8px",
                                    borderRadius: "4px",
                                    border: "none",
                                    background: bookingStatus === "rejected" ? "#FF453A" : "rgba(255, 255, 255, 0.08)",
                                    color: bookingStatus === "rejected" ? "#FFFFFF" : "#A1A1A6",
                                    cursor: "pointer",
                                    fontWeight: 600
                                  }}
                                >
                                  Reject
                                </button>
                              </div>
                            </div>

                            <div style={{ fontSize: "12px", color: "#86868B", lineHeight: 1.6 }}>
                              Illustrative patient and appointment details<br />
                              Interactive UI preview · Not a live booking
                            </div>

                            <div style={{ marginTop: "0.75rem", paddingTop: "0.75rem", borderTop: "1px solid rgba(255, 255, 255, 0.06)", display: "flex", justifyContent: "space-between", fontSize: "11px", color: "#A1A1A6" }}>
                              <span>Status: <strong style={{ color: bookingStatus === "approved" ? "#34C759" : bookingStatus === "rejected" ? "#FF453A" : "#FFBD2E" }}>{bookingStatus.toUpperCase()}</strong></span>
                              <span>Firebase Auth & Store</span>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Interactive Mockup 02: AyurChainTrace */}
                      {proj.visualType === "traceability" && (
                        <div style={{ padding: "1.75rem", width: "100%" }}>
                          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.25rem" }}>
                            <div>
                              <div style={{ fontSize: "11px", color: "#5E5CE6", fontWeight: 700 }}>AYURCHAIN TRACEABILITY</div>
                              <div style={{ fontSize: "16px", fontWeight: 700, color: "#FFFFFF" }}>Traceability workflow</div>
                            </div>
                            <span style={{ fontSize: "11px", padding: "3px 8px", borderRadius: "999px", background: "rgba(94, 92, 230, 0.15)", color: "#A594FD", fontWeight: 600 }}>
                              SAMPLE UI
                            </span>
                          </div>

                          <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
                            {supplySteps.map((step, sIdx) => {
                              const isActive = sIdx <= supplyChainStep;
                              return (
                                <div
                                  key={step.title}
                                  onClick={() => setSupplyChainStep(sIdx)}
                                  style={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "space-between",
                                    padding: "0.55rem 0.85rem",
                                    borderRadius: "8px",
                                    background: isActive ? "rgba(255, 255, 255, 0.06)" : "rgba(255, 255, 255, 0.02)",
                                    border: isActive ? "1px solid rgba(94, 92, 230, 0.3)" : "1px solid transparent",
                                    cursor: "pointer",
                                    transition: "all 0.2s ease"
                                  }}
                                >
                                  <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                                    <span style={{ width: "16px", height: "16px", borderRadius: "50%", background: isActive ? "#5E5CE6" : "rgba(255, 255, 255, 0.1)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "10px", color: "#FFF" }}>
                                      {sIdx + 1}
                                    </span>
                                    <span style={{ fontSize: "12px", fontWeight: 600, color: isActive ? "#FFFFFF" : "#86868B" }}>
                                      {step.title}
                                    </span>
                                  </div>
                                  <span style={{ fontSize: "11px", color: "#86868B" }}>{step.loc}</span>
                                </div>
                              );
                            })}
                          </div>
                          <div className="project-preview-disclaimer">Illustrative stages · Not live supply-chain records</div>
                        </div>
                      )}

                      {/* Interactive Mockup 03: PathWise */}
                      {proj.visualType === "career" && (
                        <div style={{ padding: "1.75rem", width: "100%" }}>
                          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
                            <div>
                              <div style={{ fontSize: "11px", color: "#0071E3", fontWeight: 700 }}>PATHWISE AI ENGINE</div>
                              <div style={{ fontSize: "16px", fontWeight: 700, color: "#FFFFFF" }}>Career Trajectory Analysis</div>
                            </div>
                            <div style={{ display: "flex", gap: "0.25rem" }}>
                              {(["roadmap", "skills", "swot"] as const).map((tab) => (
                                <button
                                  key={tab}
                                  type="button"
                                  onClick={() => setCareerPathTab(tab)}
                                  style={{
                                    fontSize: "10px",
                                    padding: "2px 6px",
                                    borderRadius: "4px",
                                    border: "none",
                                    background: careerPathTab === tab ? "rgba(0, 113, 227, 0.2)" : "transparent",
                                    color: careerPathTab === tab ? "#70B4FF" : "#86868B",
                                    cursor: "pointer",
                                    textTransform: "uppercase"
                                  }}
                                >
                                  {tab}
                                </button>
                              ))}
                            </div>
                          </div>

                          <div style={{ background: "#111116", borderRadius: "12px", padding: "1.25rem", border: "1px solid rgba(255, 255, 255, 0.08)" }}>
                            {careerPathTab === "roadmap" && (
                              <div>
                                <div style={{ fontSize: "12px", fontWeight: 600, color: "#FFFFFF", marginBottom: "0.5rem" }}>
                                  Recommended: Full Stack Software Engineer
                                </div>
                                <div style={{ fontSize: "11px", color: "#86868B", lineHeight: 1.6 }}>
                                  Illustrative roadmap · Target: Scalable Systems & APIs<br />
                                  Action: Explore distributed databases and system design
                                </div>
                              </div>
                            )}
                            {careerPathTab === "skills" && (
                              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.35rem" }}>
                                {["Python", "React", "REST APIs", "SQL", "Data Structures"].map((s) => (
                                  <span key={s} style={{ fontSize: "10px", background: "rgba(255, 255, 255, 0.06)", padding: "3px 7px", borderRadius: "4px", color: "#E5E5EA" }}>
                                    {s}
                                  </span>
                                ))}
                              </div>
                            )}
                            {careerPathTab === "swot" && (
                              <div style={{ fontSize: "11px", color: "#A1A1A6", lineHeight: 1.6 }}>
                                <strong style={{ color: "#34C759" }}>Strengths:</strong> Skills and interests mapping.<br />
                                <strong style={{ color: "#0071E3" }}>Development:</strong> Guided roadmap planning.
                              </div>
                            )}
                          </div>
                        </div>
                      )}

                      {/* Interactive Mockup 04: MAC Portal */}
                      {proj.visualType === "hospital" && (
                        <div style={{ padding: "1.75rem", width: "100%" }}>
                          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
                            <div>
                              <div style={{ fontSize: "11px", color: "#FF453A", fontWeight: 700 }}>MAC PORTAL · CONCEPT PREVIEW</div>
                              <div style={{ fontSize: "16px", fontWeight: 700, color: "#FFFFFF" }}>Emergency Operations</div>
                            </div>
                            <span style={{ fontSize: "11px", padding: "3px 8px", borderRadius: "999px", background: "rgba(255, 69, 58, 0.15)", color: "#FF6961", fontWeight: 600 }}>
                              CONCEPT UI
                            </span>
                          </div>

                          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "0.6rem", marginBottom: "0.75rem" }}>
                            <div style={{ background: "#111116", padding: "0.75rem", borderRadius: "8px", textAlign: "center" }}>
                              <div style={{ fontSize: "10px", color: "#86868B" }}>Bed allocation</div>
                              <div style={{ fontSize: "16px", fontWeight: 700, color: "#34C759" }}>Illustrative</div>
                            </div>
                            <div style={{ background: "#111116", padding: "0.75rem", borderRadius: "8px", textAlign: "center" }}>
                              <div style={{ fontSize: "10px", color: "#86868B" }}>Triage workflow</div>
                              <div style={{ fontSize: "16px", fontWeight: 700, color: "#FFBD2E" }}>Workflow</div>
                            </div>
                            <div style={{ background: "#111116", padding: "0.75rem", borderRadius: "8px", textAlign: "center" }}>
                              <div style={{ fontSize: "10px", color: "#86868B" }}>Ambulance flow</div>
                              <div style={{ fontSize: "16px", fontWeight: 700, color: "#0071E3" }}>Planning</div>
                            </div>
                          </div>

                          <div style={{ fontSize: "11px", color: "#86868B", textAlign: "center" }}>
                            Illustrative workflow · SNS Hackfest first-place project
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Text & Specification Details */}
                <div>
                  <div className="project-meta-eyebrow">
                    <span className="project-index-num">{proj.number}</span>
                    <span className="project-category-tag">{proj.category}</span>
                    {proj.status && <span className="project-status-pill">{proj.status}</span>}
                  </div>

                  <h3 className="project-headline">{proj.title}</h3>
                  <p className="project-desc">{proj.description}</p>

                  <div className="project-features-list">
                    {proj.features.map((feat) => (
                      <div key={feat} className="project-feature-item">
                        <CheckCircle2 size={14} color="#0071E3" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>

                  <div className="exp-stack-pills" style={{ marginBottom: "1.75rem" }}>
                    {proj.technologies.map((t) => (
                      <span key={t} className="exp-stack-pill">{t}</span>
                    ))}
                  </div>

                  <div className="project-actions-row">
                    <a
                      href={proj.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-apple-secondary"
                      data-cursor-text="Code"
                    >
                      <Github size={15} />
                      <span>GitHub Profile</span>
                    </a>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

        {/* ALL PROJECTS COMPACT GRID (SECTION 21) */}
        <div className="apple-more-projects" style={{ marginTop: "5rem" }}>
          <div>
            <div className="apple-eyebrow">COMPREHENSIVE CATALOG</div>
            <h3 className="apple-section-headline" style={{ fontSize: "2.5rem" }}>
              More things I&apos;ve built.
            </h3>
            <p className="apple-section-subheadline">
              A collection of web applications, algorithmic tools, machine learning pipelines, and civic utilities.
            </p>
          </div>

          <div className="more-projects-grid">
            {more.map((item) => (
              <div key={item.title} className="more-project-tile">
                <div>
                  <div className="tile-category">{item.category}</div>
                  <h4 className="tile-title">{item.title}</h4>
                  <p className="tile-desc">{item.description}</p>
                </div>

                <div>
                  <div className="tile-tech">
                    {item.technologies.map((tech) => (
                      <span key={tech} className="tile-tech-pill">{tech}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
