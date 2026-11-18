"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Brain, Code2, Database, Wrench, Layers3 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { profileData } from "@/lib/data/profile";

export function Skills() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const categories = [
    { title: "Programming", icon: Code2, skills: profileData.skills.programming },
    { title: "Web Development", icon: Layers3, skills: profileData.skills.web },
    { title: "Databases", icon: Database, skills: profileData.skills.database },
    { title: "AI & Applied Tools", icon: Brain, skills: profileData.skills.ai },
    { title: "Developer Tools", icon: Wrench, skills: profileData.skills.tools },
  ];

  return (
    <section id="skills" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <p className="text-xs font-semibold tracking-[0.22em] text-primary uppercase mb-3">Engineering toolkit</p>
          <h2 className="text-3xl md:text-5xl font-bold mb-4">Technologies I <span className="text-gradient">work with.</span></h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">A practical toolkit shaped by project work and five technical internships. I focus on applying technologies to real workflows rather than assigning arbitrary proficiency percentages.</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {categories.map((category, index) => {
            const Icon = category.icon;
            return (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 22 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.07 }}
              >
                <Card className="h-full card-hover border-white/10 bg-card/70 backdrop-blur-xl">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <span className="rounded-xl bg-primary/10 p-3 text-primary"><Icon className="h-5 w-5" /></span>
                      <CardTitle className="text-lg">{category.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="flex flex-wrap gap-2">
                    {category.skills.map((skill) => <Badge key={skill.name} variant="secondary" className="px-3 py-1.5">{skill.name}</Badge>)}
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-8 rounded-2xl border border-white/10 bg-card/50 p-6"
        >
          <div className="flex items-center gap-2 mb-4"><Brain className="h-5 w-5 text-primary" /><h3 className="font-semibold">Ways I work</h3></div>
          <div className="flex flex-wrap gap-2">{profileData.skills.soft.map((skill) => <Badge key={skill} variant="outline" className="px-3 py-1.5">{skill}</Badge>)}</div>
        </motion.div>

        <div className="mt-14">
          <h3 className="text-2xl font-bold text-center mb-7">Certifications & learning</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
            {profileData.certifications.map((cert, index) => (
              <motion.div key={cert.title} initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.35, delay: 0.45 + index * 0.05 }}>
                <Card className="h-full bg-card/60 border-white/10">
                  <CardContent className="p-5">
                    <p className="text-xs text-primary font-semibold tracking-wide uppercase mb-2">{cert.issuer}</p>
                    <h4 className="font-semibold leading-snug">{cert.title}</h4>
                    {cert.date && <p className="text-xs text-muted-foreground mt-3">{cert.date}</p>}
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
