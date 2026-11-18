"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Trophy, Award, Medal, Shield, FileText, Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { profileData } from "@/lib/data/profile";

const iconMap = {
  trophy: Trophy,
  file: FileText,
  medal: Medal,
  shield: Shield,
  star: Star
};

const getIconComponent = (iconName: string) => {
  return iconMap[iconName as keyof typeof iconMap] || Award;
};

export function Achievements() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section id="achievements" className="py-20 bg-secondary/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="text-gradient">Achievements</span> & Recognition
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Verified competition and bootcamp recognition.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {profileData.achievements.filter((achievement) => achievement.category !== "certification").map((achievement, index) => {
            const IconComponent = getIconComponent(achievement.icon);
            
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <Card className="h-full card-hover group">
                  <CardContent className="p-6 text-center">
                    <div className="relative inline-block mb-4">
                      <div className="p-4 bg-gradient-to-br from-primary to-purple-600 rounded-full group-hover:scale-110 transition-transform">
                        <IconComponent className="h-8 w-8 text-white" />
                      </div>
                      <div className="absolute inset-0 bg-primary/20 blur-xl group-hover:bg-primary/40 transition-all" />
                    </div>
                    
                    <h4 className="font-bold mb-2 group-hover:text-primary transition-colors">
                      {achievement.title}
                    </h4>
                    
                    <p className="text-sm text-primary font-medium mb-2">
                      {achievement.organization}
                    </p>
                    
                    <p className="text-xs text-muted-foreground mb-3">
                      {achievement.description}
                    </p>
                    
                    <Badge variant="outline" className="text-xs">
                      {achievement.date}
                    </Badge>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>


      </div>
    </section>
  );
}
