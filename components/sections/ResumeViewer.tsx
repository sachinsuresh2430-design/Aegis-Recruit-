"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Download, Eye, FileText } from "lucide-react";
import { Card, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

export function ResumeViewer() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section className="py-20 bg-secondary/30">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            My <span className="text-gradient">Resume</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
            View or download my complete resume
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="/resume" >
              <Button size="lg" className="group">
                <Download className="mr-2 h-4 w-4 group-hover:translate-y-1 transition-transform" />
                Download / Print PDF
              </Button>
            </a>
            <a href="/resume" target="_blank" rel="noopener noreferrer">
              <Button size="lg" variant="outline" className="group">
                <Eye className="mr-2 h-4 w-4" />
                View Online
              </Button>
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card>
            <CardContent className="flex min-h-[260px] flex-col items-center justify-center gap-4 p-8 text-center">
              <FileText className="h-14 w-14 text-primary" />
              <h3 className="text-xl font-bold">Live résumé, generated from your profile</h3>
              <p className="max-w-xl text-muted-foreground">The résumé page contains the latest education, internships, selected projects, skills, awards, and credential records.</p>
              <a href="/resume" target="_blank" rel="noopener noreferrer">
                <Button>Open résumé and download PDF</Button>
              </a>
            </CardContent>
          </Card>
        </motion.div>

        {/* Quick Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8"
        >
          {[
            { label: "Technical Internships", value: "5" },
            { label: "Featured Projects", value: "5" },
            { label: "Academic CGPA", value: "8.57" },
            { label: "Graduating", value: "2027" },
          ].map((stat, index) => (
            <Card key={stat.label} className="text-center card-hover">
              <CardContent className="p-4">
                <div className="text-2xl font-bold text-primary mb-1">{stat.value}</div>
                <div className="text-xs text-muted-foreground">{stat.label}</div>
              </CardContent>
            </Card>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
