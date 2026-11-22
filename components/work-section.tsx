"use client";

import { motion, useInView, useScroll, useSpring, AnimatePresence } from "framer-motion";
import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import {
  workExperiences,
  type WorkExperience,
  type WorkIconType,
  type WorkType,
} from "@/lib/data";
import {
  Building2,
  GraduationCap,
  ArrowUpRight,
  Briefcase,
  Terminal,
  Server,
  Bike,
  Code,
  Mail,
  Smartphone,
  Sparkles,
  Flag,
  Compass,
} from "lucide-react";
import { SiChessdotcom, SiGithub } from "react-icons/si";

type FilterType = "all" | WorkType;

interface Point {
  x: number;
  y: number;
}

interface RoadGeometry {
  width: number;
  height: number;
  pathD: string;
}

// Organic asymmetric vertical wave offsets so milestones flow naturally instead of sitting in a rigid grid
const DESKTOP_WAVE_PATTERN = [
  [0, 56, 14],
  [26, 0, 58],
  [8, 48, 0],
];

const TABLET_WAVE_PATTERN = [
  [0, 44],
  [36, 0],
];

function getWaveOffset(rowIndex: number, visualColIndex: number, cols: number): number {
  if (cols === 3) {
    const row = DESKTOP_WAVE_PATTERN[rowIndex % DESKTOP_WAVE_PATTERN.length];
    return row[visualColIndex % 3] ?? 0;
  }
  const row = TABLET_WAVE_PATTERN[rowIndex % TABLET_WAVE_PATTERN.length];
  return row[visualColIndex % 2] ?? 0;
}

function getFallbackIconMeta(iconType: WorkIconType): {
  icon: React.ReactNode;
  bg: string;
  text: string;
} {
  switch (iconType) {
    case "school":
      return {
        icon: <GraduationCap className="w-7 h-7" />,
        bg: "from-violet-500 to-indigo-600",
        text: "text-white",
      };
    case "github":
      return {
        icon: <SiGithub className="w-7 h-7" />,
        bg: "from-neutral-800 to-neutral-950 dark:from-neutral-200 dark:to-white",
        text: "text-white dark:text-neutral-950",
      };
    case "console":
      return {
        icon: <Terminal className="w-6 h-6" />,
        bg: "from-sky-500 to-cyan-600",
        text: "text-white",
      };
    case "server":
      return {
        icon: <Server className="w-6 h-6" />,
        bg: "from-orange-500 to-red-500",
        text: "text-white",
      };
    case "chess":
      return {
        icon: <SiChessdotcom className="w-6 h-6" />,
        bg: "from-emerald-500 to-green-700",
        text: "text-white",
      };
    case "bike":
      return {
        icon: <Bike className="w-7 h-7" />,
        bg: "from-amber-500 to-orange-600",
        text: "text-white",
      };
    case "building":
      return {
        icon: <Building2 className="w-7 h-7" />,
        bg: "from-primary via-sky-500 to-teal-500",
        text: "text-white",
      };
    case "mail":
      return {
        icon: <Mail className="w-6 h-6" />,
        bg: "from-slate-700 to-slate-900",
        text: "text-white",
      };
    case "smartphone":
      return {
        icon: <Smartphone className="w-6 h-6" />,
        bg: "from-teal-500 to-emerald-600",
        text: "text-white",
      };
    case "code":
    default:
      return {
        icon: <Code className="w-6 h-6" />,
        bg: "from-primary to-accent",
        text: "text-primary-foreground",
      };
  }
}

function getTypeStyle(type: WorkType) {
  if (type === "school") {
    return {
      label: "Edukacja",
      dot: "bg-violet-500",
      text: "text-violet-600 dark:text-violet-400",
      line: "border-violet-500/40 group-hover:border-violet-500",
      stem: "from-violet-500/70 to-violet-500/10",
    };
  }
  if (type === "project") {
    return {
      label: "Projekt",
      dot: "bg-emerald-500",
      text: "text-emerald-600 dark:text-emerald-400",
      line: "border-emerald-500/40 group-hover:border-emerald-500",
      stem: "from-emerald-500/70 to-emerald-500/10",
    };
  }
  return {
    label: "Praca",
    dot: "bg-primary",
    text: "text-primary",
    line: "border-primary/40 group-hover:border-primary",
    stem: "from-primary/70 to-primary/10",
  };
}

function ProjectMedallion({
  experience,
  isHovered,
  size = "desktop",
}: {
  experience: WorkExperience;
  isHovered: boolean;
  size?: "desktop" | "mobile";
}) {
  const isSmall = size === "mobile";
  const boxSize = isSmall ? "w-12 h-12 rounded-2xl" : "w-16 h-16 rounded-[18px]";

  // Dual stacked app icons (e.g. Rift Daily & Iron Routine)
  if (experience.logo && experience.secondaryLogo) {
    return (
      <div
        className={`relative flex items-center justify-center ${
          isSmall ? "w-14 h-12" : "w-20 h-16"
        }`}
      >
        <motion.img
          src={experience.logo}
          alt={experience.company}
          animate={{
            x: isHovered ? (isSmall ? -5 : -8) : isSmall ? -3 : -5,
            rotate: isHovered ? -10 : -6,
            scale: isHovered ? 1.06 : 1,
          }}
          transition={{ type: "spring", stiffness: 320, damping: 20 }}
          className={`${
            isSmall ? "w-10 h-10 rounded-xl" : "w-14 h-14 rounded-2xl"
          } object-cover shadow-lg ring-2 ring-background bg-neutral-950 relative z-10`}
        />
        <motion.img
          src={experience.secondaryLogo}
          alt={`${experience.company} app`}
          animate={{
            x: isHovered ? (isSmall ? 5 : 8) : isSmall ? 3 : 5,
            rotate: isHovered ? 10 : 6,
            scale: isHovered ? 1.06 : 1,
          }}
          transition={{ type: "spring", stiffness: 320, damping: 20 }}
          className={`${
            isSmall ? "w-10 h-10 rounded-xl -ml-4" : "w-14 h-14 rounded-2xl -ml-5"
          } object-cover shadow-lg ring-2 ring-background bg-neutral-950 relative z-20`}
        />
      </div>
    );
  }

  // Real project/company logo icon
  if (experience.logo) {
    const isLightLogo = experience.id === "sg-system";
    return (
      <motion.div
        animate={{ scale: isHovered ? 1.1 : 1, rotate: isHovered ? -3 : 0 }}
        transition={{ type: "spring", stiffness: 320, damping: 20 }}
        className={`${boxSize} overflow-hidden shadow-lg ring-4 ring-background ${
          isLightLogo ? "bg-white p-1.5" : "bg-neutral-950"
        } ${isHovered ? "glow" : "glow-sm"}`}
      >
        <img
          src={experience.logo}
          alt={experience.company}
          className={`w-full h-full ${isLightLogo ? "object-contain" : "object-cover"}`}
        />
      </motion.div>
    );
  }

  // Rich colored brand-styled fallback icon
  const fallback = getFallbackIconMeta(experience.iconType);
  return (
    <motion.div
      animate={{ scale: isHovered ? 1.1 : 1, rotate: isHovered ? 3 : 0 }}
      transition={{ type: "spring", stiffness: 320, damping: 20 }}
      className={`${boxSize} bg-gradient-to-br ${fallback.bg} ${fallback.text} flex items-center justify-center shadow-lg ring-4 ring-background ${
        isHovered ? "glow" : "glow-sm"
      }`}
    >
      {fallback.icon}
    </motion.div>
  );
}

function WaypointContent({
  experience,
  stepNumber,
  onHoverChange,
}: {
  experience: WorkExperience;
  stepNumber: string;
  onHoverChange?: (hovered: boolean) => void;
}) {
  const style = getTypeStyle(experience.type);

  return (
    <div
      onMouseEnter={() => onHoverChange?.(true)}
      onMouseLeave={() => onHoverChange?.(false)}
      className="group relative pl-4 pr-2 py-2 rounded-2xl transition-colors duration-300 hover:bg-foreground/[0.025] dark:hover:bg-foreground/[0.03]"
    >
      {/* Subtle large background step number watermark */}
      <span
        aria-hidden="true"
        className="pointer-events-none select-none absolute -top-3 right-1 font-mono font-black text-5xl leading-none text-foreground/[0.045] dark:text-foreground/[0.055] group-hover:text-primary/[0.09] transition-colors duration-300"
      >
        {stepNumber}
      </span>

      {/* Open editorial block with left accent rail instead of a heavy boxed card */}
      <div className={`border-l-2 pl-4 transition-colors duration-300 ${style.line}`}>
        {/* Meta row: year + category + live dot */}
        <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-xs mb-1.5">
          <span className="font-mono font-semibold text-foreground/75">{experience.years}</span>
          <span className="text-border">/</span>
          <span className={`inline-flex items-center gap-1.5 font-medium ${style.text}`}>
            <span className={`w-1.5 h-1.5 rounded-full ${style.dot}`} />
            {style.label}
          </span>
          {experience.isCurrent && (
            <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Obecnie
            </span>
          )}
        </div>

        {/* Title + Role */}
        <h3 className="text-lg font-bold tracking-tight leading-snug group-hover:text-primary transition-colors">
          {experience.company}
        </h3>
        <p className="text-sm font-medium text-primary/90 mt-0.5">{experience.position}</p>

        {/* Description directly on page canvas */}
        <p className="text-sm text-muted-foreground leading-relaxed mt-2.5">
          {experience.description}
        </p>

        {/* Minimal inline tech tags */}
        {experience.skills.length > 0 && (
          <div className="flex flex-wrap items-center gap-1.5 mt-3">
            {experience.skills.map((skill) => (
              <span
                key={skill}
                className="px-2 py-0.5 text-[11px] font-mono rounded-md bg-foreground/[0.045] dark:bg-foreground/[0.06] text-foreground/75"
              >
                {skill}
              </span>
            ))}
          </div>
        )}

        {/* Link */}
        {experience.link && (
          <div className="mt-3">
            <a
              href={experience.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-xs font-semibold text-primary hover:underline underline-offset-4 group/link"
            >
              <span>{experience.linkLabel ?? "Zobacz projekt"}</span>
              <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
            </a>
          </div>
        )}
      </div>
    </div>
  );
}

function buildOrganicSerpentinePath(
  points: Point[],
  cols: number,
  width: number,
  height: number
): RoadGeometry {
  if (points.length === 0 || width <= 0 || height <= 0) {
    return { width, height, pathD: "" };
  }

  const rowCount = Math.ceil(points.length / cols);
  const sideMargin = width >= 1100 ? 28 : 18;
  const rightTurnX = width - sideMargin;
  const leftTurnX = sideMargin;

  // Organic entry lead-in curve from the left
  const first = points[0];
  const leadX = Math.max(leftTurnX + 12, first.x - Math.min(95, width * 0.08));
  let d = `M ${leadX.toFixed(1)} ${(first.y - 12).toFixed(1)} Q ${((leadX + first.x) / 2).toFixed(1)} ${first.y.toFixed(1)} ${first.x.toFixed(1)} ${first.y.toFixed(1)}`;

  for (let r = 0; r < rowCount; r++) {
    const startIdx = r * cols;
    const endIdx = Math.min(startIdx + cols - 1, points.length - 1);
    const isLtr = r % 2 === 0;

    // Smooth undulating cubic Bezier waves between milestones in the same row
    for (let i = startIdx; i < endIdx; i++) {
      const a = points[i];
      const b = points[i + 1];
      const midX = (a.x + b.x) / 2;
      d += ` C ${midX.toFixed(1)} ${a.y.toFixed(1)}, ${midX.toFixed(1)} ${b.y.toFixed(1)}, ${b.x.toFixed(1)} ${b.y.toFixed(1)}`;
    }

    // Wide sweeping organic Bezier U-turn down to the next row
    if (r < rowCount - 1) {
      const currEnd = points[endIdx];
      const nextStart = points[endIdx + 1];
      const dy = Math.max(80, nextStart.y - currEnd.y);
      const midY = (currEnd.y + nextStart.y) / 2;
      const turnX = isLtr ? rightTurnX : leftTurnX;
      const pull = Math.min(54, dy * 0.24);

      if (isLtr) {
        const ctrlOutX = turnX + 6;
        d += ` C ${ctrlOutX.toFixed(1)} ${currEnd.y.toFixed(1)}, ${turnX.toFixed(1)} ${(midY - pull).toFixed(1)}, ${turnX.toFixed(1)} ${midY.toFixed(1)}`;
        d += ` C ${turnX.toFixed(1)} ${(midY + pull).toFixed(1)}, ${ctrlOutX.toFixed(1)} ${nextStart.y.toFixed(1)}, ${nextStart.x.toFixed(1)} ${nextStart.y.toFixed(1)}`;
      } else {
        const ctrlOutX = turnX - 6;
        d += ` C ${ctrlOutX.toFixed(1)} ${currEnd.y.toFixed(1)}, ${turnX.toFixed(1)} ${(midY - pull).toFixed(1)}, ${turnX.toFixed(1)} ${midY.toFixed(1)}`;
        d += ` C ${turnX.toFixed(1)} ${(midY + pull).toFixed(1)}, ${ctrlOutX.toFixed(1)} ${nextStart.y.toFixed(1)}, ${nextStart.x.toFixed(1)} ${nextStart.y.toFixed(1)}`;
      }
    }
  }

  // Gentle trailing curve after the last milestone
  const lastRowIsLtr = (rowCount - 1) % 2 === 0;
  const last = points[points.length - 1];
  const tailOffset = Math.min(90, width * 0.08);
  const endTailX = lastRowIsLtr
    ? Math.min(rightTurnX - 12, last.x + tailOffset)
    : Math.max(leftTurnX + 12, last.x - tailOffset);
  d += ` Q ${((last.x + endTailX) / 2).toFixed(1)} ${last.y.toFixed(1)} ${endTailX.toFixed(1)} ${(last.y + 10).toFixed(1)}`;

  return { width, height, pathD: d };
}

function DesktopOrganicRoadmap({ items }: { items: WorkExperience[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const nodeRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [cols, setCols] = useState(3);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [geometry, setGeometry] = useState<RoadGeometry>({
    width: 0,
    height: 0,
    pathD: "",
  });

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const updateCols = () => setCols(mq.matches ? 3 : 2);
    updateCols();
    mq.addEventListener("change", updateCols);
    return () => mq.removeEventListener("change", updateCols);
  }, []);

  const rows = useMemo(() => {
    const grouped: {
      rowIndex: number;
      isLtr: boolean;
      entries: { item: WorkExperience; globalIndex: number }[];
    }[] = [];
    for (let i = 0; i < items.length; i += cols) {
      const rowIndex = Math.floor(i / cols);
      grouped.push({
        rowIndex,
        isLtr: rowIndex % 2 === 0,
        entries: items.slice(i, i + cols).map((item, localIdx) => ({
          item,
          globalIndex: i + localIdx,
        })),
      });
    }
    return grouped;
  }, [items, cols]);

  const measurePath = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;

    const containerRect = container.getBoundingClientRect();
    if (containerRect.width === 0 || containerRect.height === 0) return;

    const points: Point[] = [];
    for (let i = 0; i < items.length; i++) {
      const nodeEl = nodeRefs.current[i];
      if (!nodeEl) continue;
      const rect = nodeEl.getBoundingClientRect();
      points.push({
        x: rect.left - containerRect.left + rect.width / 2,
        y: rect.top - containerRect.top + rect.height / 2,
      });
    }

    if (points.length === items.length) {
      setGeometry(
        buildOrganicSerpentinePath(points, cols, containerRect.width, containerRect.height)
      );
    }
  }, [items, cols]);

  useLayoutEffect(() => {
    nodeRefs.current = nodeRefs.current.slice(0, items.length);
    const rafId = requestAnimationFrame(measurePath);
    const container = containerRef.current;
    if (!container) return () => cancelAnimationFrame(rafId);

    const observer = new ResizeObserver(() => {
      requestAnimationFrame(measurePath);
    });
    observer.observe(container);

    return () => {
      cancelAnimationFrame(rafId);
      observer.disconnect();
    };
  }, [measurePath, items.length]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 78%", "end 68%"],
  });
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 110,
    damping: 24,
    restDelta: 0.001,
  });

  return (
    <div className="hidden md:block relative">
      {/* Minimal route header strip */}
      <div className="flex items-center justify-between px-12 lg:px-16 mb-2">
        <motion.div
          initial={{ opacity: 0, x: -12 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 text-primary text-xs font-mono uppercase tracking-wider"
        >
          <Flag className="w-3.5 h-3.5" />
          Start ({items[0]?.years.split(" ")[0] ?? "2021"})
        </motion.div>

        <div className="inline-flex items-center gap-2 text-xs font-mono text-muted-foreground">
          <Compass className="w-3.5 h-3.5 text-primary" />
          <span>{items.length} przystanków na trasie</span>
        </div>
      </div>

      {/* Winding road container */}
      <div ref={containerRef} className="relative px-10 lg:px-16 py-6">
        {/* Continuous undulating SVG path */}
        {geometry.pathD && (
          <svg
            width={geometry.width}
            height={geometry.height}
            viewBox={`0 0 ${geometry.width} ${geometry.height}`}
            fill="none"
            className="absolute inset-0 pointer-events-none z-0 overflow-visible"
            aria-hidden="true"
          >
            <defs>
              <linearGradient id="organic-road-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#8b5cf6" />
                <stop offset="48%" stopColor="hsl(var(--primary))" />
                <stop offset="100%" stopColor="#10b981" />
              </linearGradient>
              <filter id="organic-road-glow" x="-15%" y="-15%" width="130%" height="130%">
                <feGaussianBlur stdDeviation="5" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Ambient wide soft ribbon */}
            <path
              d={geometry.pathD}
              stroke="hsl(var(--primary))"
              strokeOpacity="0.09"
              strokeWidth="16"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* Dotted map guide */}
            <path
              d={geometry.pathD}
              stroke="hsl(var(--primary))"
              strokeOpacity="0.28"
              strokeWidth="2"
              strokeDasharray="4 8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* Scroll-drawn luminous route */}
            <motion.path
              d={geometry.pathD}
              stroke="url(#organic-road-grad)"
              strokeWidth="3.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              filter="url(#organic-road-glow)"
              style={{ pathLength: smoothProgress }}
            />
          </svg>
        )}

        {/* Organic rows with staggered vertical wave offsets */}
        <div className="space-y-16 lg:space-y-20 relative z-10">
          {rows.map((row) => (
            <div
              key={`row-${row.rowIndex}`}
              className="grid gap-x-8 lg:gap-x-12 items-start"
              style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}
            >
              {row.entries.map(({ item, globalIndex }, localIdx) => {
                const style = getTypeStyle(item.type);
                const stepNumber = String(globalIndex + 1).padStart(2, "0");
                const isHovered = hoveredId === item.id;
                const gridCol = row.isLtr ? localIdx + 1 : cols - localIdx;
                const visualColIndex = gridCol - 1;
                const waveTop = getWaveOffset(row.rowIndex, visualColIndex, cols);

                return (
                  <div
                    key={item.id}
                    style={{
                      gridColumnStart: gridCol,
                      gridRowStart: 1,
                      paddingTop: `${waveTop}px`,
                    }}
                    className="flex flex-col items-start"
                  >
                    {/* Milestone medallion anchored right onto the curved SVG route */}
                    <div className="relative flex flex-col items-center ml-4">
                      <div
                        ref={(el) => {
                          nodeRefs.current[globalIndex] = el;
                        }}
                        onMouseEnter={() => setHoveredId(item.id)}
                        onMouseLeave={() => setHoveredId(null)}
                        className="relative z-20 cursor-pointer"
                      >
                        <ProjectMedallion
                          experience={item}
                          isHovered={isHovered}
                          size="desktop"
                        />

                        {item.isCurrent && (
                          <motion.div
                            className="absolute -inset-1.5 rounded-[22px] border border-emerald-500/50 pointer-events-none"
                            animate={{ scale: [1, 1.18, 1], opacity: [0.5, 0, 0.5] }}
                            transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
                          />
                        )}
                      </div>

                      {/* Delicate vertical connector to open waypoint block */}
                      <div
                        className={`w-px h-6 bg-gradient-to-b ${style.stem} transition-opacity duration-300 ${
                          isHovered ? "opacity-100" : "opacity-65"
                        }`}
                      />
                    </div>

                    {/* Open editorial content block (no heavy card border) */}
                    <motion.div
                      initial={{ opacity: 0, y: 16 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-40px" }}
                      transition={{ duration: 0.45, delay: localIdx * 0.08 }}
                      className="w-full"
                    >
                      <WaypointContent
                        experience={item}
                        stepNumber={stepNumber}
                        onHoverChange={(h) => setHoveredId(h ? item.id : null)}
                      />
                    </motion.div>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>

      {/* End marker */}
      <div
        className={`flex px-12 lg:px-16 mt-2 ${
          (rows.length - 1) % 2 === 0 ? "justify-end" : "justify-start"
        }`}
      >
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 text-emerald-600 dark:text-emerald-400 text-xs font-mono uppercase tracking-wider"
        >
          <Sparkles className="w-3.5 h-3.5" />
          Obecnie (2026) & Kolejne kroki
        </motion.div>
      </div>
    </div>
  );
}

function MobileOrganicRoadmap({ items }: { items: WorkExperience[] }) {
  const listRef = useRef<HTMLDivElement>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const { scrollYProgress } = useScroll({
    target: listRef,
    offset: ["start 80%", "end 70%"],
  });
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 25,
    restDelta: 0.001,
  });

  return (
    <div className="md:hidden relative">
      <div className="flex items-center justify-between mb-6 px-1">
        <span className="inline-flex items-center gap-1.5 text-primary text-xs font-mono uppercase tracking-wider">
          <Flag className="w-3.5 h-3.5" />
          Start ({items[0]?.years.split(" ")[0] ?? "2021"})
        </span>
        <span className="text-xs font-mono text-muted-foreground">
          {items.length} etapów
        </span>
      </div>

      <div ref={listRef} className="relative pl-16 space-y-8">
        {/* Soft vertical rail */}
        <div className="absolute left-6 top-3 bottom-3 w-[2px] bg-border/60 -translate-x-1/2 rounded-full" />

        {/* Scroll-linked gradient progress rail */}
        <motion.div
          style={{ scaleY }}
          className="absolute left-6 top-3 bottom-3 w-[2px] -translate-x-1/2 origin-top rounded-full bg-gradient-to-b from-violet-500 via-primary to-emerald-500"
        />

        {items.map((experience, index) => {
          const stepNumber = String(index + 1).padStart(2, "0");
          const isHovered = hoveredId === experience.id;

          return (
            <motion.div
              key={experience.id}
              initial={{ opacity: 0, x: 16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 0.4, delay: Math.min(index * 0.04, 0.2) }}
              className="relative"
            >
              {/* Project icon directly on the left timeline rail */}
              <div className="absolute -left-16 top-1 w-12 flex items-center justify-center z-10">
                <ProjectMedallion
                  experience={experience}
                  isHovered={isHovered}
                  size="mobile"
                />
              </div>

              <WaypointContent
                experience={experience}
                stepNumber={stepNumber}
                onHoverChange={(h) => setHoveredId(h ? experience.id : null)}
              />
            </motion.div>
          );
        })}
      </div>

      <div className="flex items-center gap-2 mt-6 px-1">
        <span className="inline-flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 text-xs font-mono uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5" />
          Obecnie (2026)
        </span>
      </div>
    </div>
  );
}

export default function WorkSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activeFilter, setActiveFilter] = useState<FilterType>("all");

  const filteredExperiences = useMemo(() => {
    if (activeFilter === "all") return workExperiences;
    return workExperiences.filter((item) => item.type === activeFilter);
  }, [activeFilter]);

  const counts = useMemo(
    () => ({
      all: workExperiences.length,
      job: workExperiences.filter((e) => e.type === "job").length,
      project: workExperiences.filter((e) => e.type === "project").length,
      school: workExperiences.filter((e) => e.type === "school").length,
    }),
    []
  );

  const filterButtons: { key: FilterType; label: string; dotColor: string }[] = [
    { key: "all", label: "Wszystkie", dotColor: "bg-foreground/70" },
    { key: "job", label: "Praca", dotColor: "bg-primary" },
    { key: "project", label: "Projekty", dotColor: "bg-emerald-500" },
    { key: "school", label: "Edukacja", dotColor: "bg-violet-500" },
  ];

  return (
    <section id="work" className="py-24 relative" ref={ref}>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent/5 to-transparent pointer-events-none" />

      <div className="w-full max-w-[1480px] mx-auto px-4 sm:px-6 lg:px-10 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="inline-flex items-center gap-2 text-primary font-mono text-sm uppercase tracking-widest">
            <Briefcase className="w-4 h-4" />
            Experience & Roadmap
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mt-3">
            Work History
          </h2>
          <p className="text-muted-foreground mt-3 max-w-2xl mx-auto text-sm sm:text-base">
            Moja ścieżka od technikum i pierwszych projektów open source po komercyjną pracę w
            GranTeam i własne produkty webowe, mobilne oraz desktopowe
          </p>

          {/* Interactive filter pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-2.5 mt-6">
            {filterButtons.map(({ key, label, dotColor }) => {
              const active = activeFilter === key;
              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => setActiveFilter(key)}
                  className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-medium border transition-all duration-200 ${
                    active
                      ? "bg-primary text-primary-foreground border-primary shadow-sm glow-sm"
                      : "glass text-muted-foreground hover:text-foreground hover:border-primary/40"
                  }`}
                >
                  <span
                    className={`w-2 h-2 rounded-full ${
                      active ? "bg-primary-foreground" : dotColor
                    }`}
                  />
                  <span>{label}</span>
                  <span
                    className={`font-mono text-[10px] px-1.5 py-0.2 rounded-full ${
                      active ? "bg-primary-foreground/20" : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {counts[key]}
                  </span>
                </button>
              );
            })}
          </div>
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeFilter}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <DesktopOrganicRoadmap items={filteredExperiences} />
            <MobileOrganicRoadmap items={filteredExperiences} />
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
