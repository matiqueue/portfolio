"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { skillCategories } from "@/lib/data";
import { Layout, Server, Wrench } from "lucide-react";

const CATEGORY_META: Record<
  string,
  { icon: React.ElementType; gradient: string; badgeBg: string; iconColor: string }
> = {
  frontend: {
    icon: Layout,
    gradient: "from-sky-500/20 via-primary/10 to-transparent",
    badgeBg: "bg-sky-500/10 border-sky-500/20",
    iconColor: "text-sky-500",
  },
  backend: {
    icon: Server,
    gradient: "from-emerald-500/20 via-teal-500/10 to-transparent",
    badgeBg: "bg-emerald-500/10 border-emerald-500/20",
    iconColor: "text-emerald-500",
  },
  tools: {
    icon: Wrench,
    gradient: "from-violet-500/20 via-indigo-500/10 to-transparent",
    badgeBg: "bg-violet-500/10 border-violet-500/20",
    iconColor: "text-violet-500",
  },
};

export default function SkillsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="skills" className="py-20 relative" ref={ref}>
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="text-primary font-mono text-sm uppercase tracking-widest">
            Core Arsenal & Tech Stack
          </span>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mt-4">
            Technologies I Work With
          </h2>
          <p className="text-muted-foreground mt-3 max-w-xl mx-auto">
            Narzędzia i technologie, z których korzystam w codziennej pracy komercyjnej oraz przy
            własnych projektach
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {skillCategories.map((category, categoryIndex) => {
            const meta = CATEGORY_META[category.id] ?? CATEGORY_META.frontend;
            const CategoryIcon = meta.icon;

            return (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.55, delay: categoryIndex * 0.1 }}
                className="glass rounded-2xl p-6 relative overflow-hidden group hover:border-primary/40 transition-colors"
              >
                <div
                  className={`absolute inset-x-0 top-0 h-24 bg-gradient-to-b ${meta.gradient} pointer-events-none opacity-70`}
                />

                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-2">
                    <div
                      className={`w-10 h-10 rounded-xl border flex items-center justify-center ${meta.badgeBg}`}
                    >
                      <CategoryIcon className={`w-5 h-5 ${meta.iconColor}`} />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold tracking-tight">{category.title}</h3>
                      <p className="text-xs text-muted-foreground">{category.subtitle}</p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2.5 mt-5">
                    {category.items.map((skill, index) => {
                      const Icon = skill.icon;
                      return (
                        <motion.div
                          key={skill.text}
                          initial={{ opacity: 0, scale: 0.85 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          transition={{
                            type: "spring",
                            stiffness: 150,
                            damping: 16,
                            delay: categoryIndex * 0.08 + index * 0.03,
                          }}
                          whileHover={{
                            scale: 1.06,
                            y: -3,
                            transition: { type: "spring", stiffness: 400 },
                          }}
                          className="group/chip"
                        >
                          <div className="rounded-xl pl-2 pr-3.5 py-1.5 flex items-center gap-2.5 bg-background/60 dark:bg-secondary/50 hover:bg-background/95 dark:hover:bg-secondary/90 border border-border/60 hover:border-primary/40 cursor-default transition-all duration-200 shadow-sm">
                            <span
                              className={`w-7 h-7 rounded-lg flex items-center justify-center ${skill.tintClass} transition-transform duration-200 group-hover/chip:scale-110`}
                            >
                              <Icon className={`w-4 h-4 ${skill.colorClass}`} />
                            </span>
                            <span className="font-medium text-xs sm:text-sm">{skill.text}</span>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* 3D floating skill orbs decoration */}
        <div className="absolute top-10 left-10 perspective-1000 hidden lg:block pointer-events-none">
          <motion.div
            animate={{
              y: [0, -20, 0],
              rotateZ: [0, 5, 0, -5, 0],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="w-12 h-12 rounded-full bg-gradient-to-br from-primary/30 to-accent/30 blur-sm"
          />
        </div>
        <div className="absolute bottom-10 right-10 perspective-1000 hidden lg:block pointer-events-none">
          <motion.div
            animate={{
              y: [0, 20, 0],
              rotateZ: [0, -5, 0, 5, 0],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="w-16 h-16 rounded-full bg-gradient-to-br from-accent/30 to-primary/30 blur-sm"
          />
        </div>
      </div>
    </section>
  );
}
