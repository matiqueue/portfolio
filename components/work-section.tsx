"use client";

import { motion, useInView, useScroll, useSpring, AnimatePresence } from "framer-motion";
import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import {
  workExperiences,
  type WorkExperience,
  type WorkIconType,
  type WorkType,
} from "@/lib/data";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
  Calendar,
  Building2,
  GitBranch,
  ChevronRight,
  GraduationCap,
  FolderGit2,
  ExternalLink,
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
  ArrowRight,
  ArrowLeft,
  ArrowDown,
} from "lucide-react";
import { SiChessdotcom, SiGithub } from "react-icons/si";

type FilterType = "all" | WorkType;

interface Point {
  x: number;
  y: number;
}

interface TurnMarker {
  x: number;
  y: number;
  side: "left" | "right";
}

interface SegmentArrow {
  x: number;
  y: number;
  dir: "right" | "left";
}

interface RoadGeometry {
  width: number;
  height: number;
  pathD: string;
  turns: TurnMarker[];
  arrows: SegmentArrow[];
}

function getAvatarIcon(iconType: WorkIconType) {
  switch (iconType) {
    case "school":
      return <GraduationCap className="w-5 h-5" />;
    case "github":
      return <SiGithub className="w-5 h-5" />;
    case "console":
      return <Terminal className="w-5 h-5" />;
    case "server":
      return <Server className="w-5 h-5" />;
    case "chess":
      return <SiChessdotcom className="w-5 h-5" />;
    case "bike":
      return <Bike className="w-5 h-5" />;
    case "building":
      return <Building2 className="w-5 h-5" />;
    case "mail":
      return <Mail className="w-5 h-5" />;
    case "smartphone":
      return <Smartphone className="w-5 h-5" />;
    case "code":
    default:
      return <Code className="w-5 h-5" />;
  }
}

function getNodeIcon(type: WorkType) {
  if (type === "school") return <GraduationCap className="w-5 h-5 text-white" />;
  if (type === "project") return <FolderGit2 className="w-5 h-5 text-white" />;
  return <GitBranch className="w-5 h-5 text-primary-foreground" />;
}

function getTypeStyle(type: WorkType) {
  if (type === "school") {
    return {
      label: "Edukacja",
      nodeGradient: "from-violet-500 to-indigo-600",
      topBar: "from-violet-500 via-purple-500 to-indigo-500",
      badge: "bg-violet-500/12 text-violet-600 dark:text-violet-400 border-violet-500/25",
      dot: "bg-violet-500",
      ring: "ring-violet-500/30",
      avatarBg: "bg-violet-500/10 text-violet-600 dark:text-violet-400",
    };
  }
  if (type === "project") {
    return {
      label: "Projekt",
      nodeGradient: "from-emerald-500 to-teal-600",
      topBar: "from-emerald-500 via-teal-400 to-cyan-500",
      badge: "bg-emerald-500/12 text-emerald-700 dark:text-emerald-400 border-emerald-500/25",
      dot: "bg-emerald-500",
      ring: "ring-emerald-500/30",
      avatarBg: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
    };
  }
  return {
    label: "Praca",
    nodeGradient: "from-primary to-accent",
    topBar: "from-primary via-sky-400 to-accent",
    badge: "bg-primary/12 text-primary border-primary/25",
    dot: "bg-primary",
    ring: "ring-primary/30",
    avatarBg: "bg-primary/10 text-primary",
  };
}

function WorkCardContent({
  experience,
  stepNumber,
  isHighlighted,
  onHoverChange,
}: {
  experience: WorkExperience;
  stepNumber: string;
  isHighlighted?: boolean;
  onHoverChange?: (hovered: boolean) => void;
}) {
  const style = getTypeStyle(experience.type);

  return (
    <motion.article
      onMouseEnter={() => onHoverChange?.(true)}
      onMouseLeave={() => onHoverChange?.(false)}
      whileHover={{ y: -5 }}
      transition={{ type: "spring", stiffness: 320, damping: 24 }}
      className={`glass rounded-2xl relative overflow-hidden group flex flex-col h-full transition-all duration-300 ${
        isHighlighted
          ? "border-primary/60 shadow-[0_12px_40px_-14px_hsl(var(--glow)/0.38)]"
          : "hover:border-primary/45"
      }`}
    >
      {/* Top gradient bar */}
      <div className={`h-1 w-full bg-gradient-to-r ${style.topBar}`} />

      {/* Subtle hover aura */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.06] via-transparent to-accent/[0.06] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

      <div className="p-5 flex flex-col flex-1 relative z-10">
        {/* Top meta row: type badge + date + live pulse */}
        <div className="flex flex-wrap items-center justify-between gap-2 mb-3.5">
          <div className="flex items-center gap-1.5">
            <span
              className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold border ${style.badge}`}
            >
              <span className={`w-1.5 h-1.5 rounded-full ${style.dot}`} />
              {style.label}
            </span>
            {experience.isCurrent && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wider bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Aktywne
              </span>
            )}
          </div>

          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-muted/80 text-muted-foreground text-[11px] font-mono border border-border/50">
            <Calendar className="w-3 h-3 flex-shrink-0" />
            {experience.years}
          </span>
        </div>

        {/* Header: icon + title + position */}
        <div className="flex items-start gap-3 mb-3">
          <Avatar className={`w-11 h-11 flex-shrink-0 ring-2 ${style.ring} ring-offset-2 ring-offset-background`}>
            {experience.logo && <AvatarImage src={experience.logo} alt={experience.company} />}
            <AvatarFallback className={style.avatarBg}>
              {getAvatarIcon(experience.iconType)}
            </AvatarFallback>
          </Avatar>

          <div className="flex-1 min-w-0">
            <div className="flex items-baseline justify-between gap-2">
              <h3 className="text-base font-bold tracking-tight group-hover:text-primary transition-colors leading-snug">
                {experience.company}
              </h3>
              <span className="text-[11px] font-mono text-muted-foreground/60 flex-shrink-0">
                #{stepNumber}
              </span>
            </div>
            <p className="text-xs sm:text-sm text-primary font-medium flex items-center gap-1 mt-0.5">
              <ChevronRight className="w-3.5 h-3.5 flex-shrink-0" />
              <span className="truncate">{experience.position}</span>
            </p>
          </div>
        </div>

        {/* Description */}
        <p className="text-muted-foreground leading-relaxed text-sm flex-1">
          {experience.description}
        </p>

        {/* Skills */}
        {experience.skills.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-4">
            {experience.skills.map((skill) => (
              <span
                key={skill}
                className="px-2 py-0.5 text-[11px] rounded-md bg-secondary/80 text-secondary-foreground border border-border/50 font-medium"
              >
                {skill}
              </span>
            ))}
          </div>
        )}

        {/* Footer link */}
        {experience.link && (
          <div className="mt-4 pt-3 border-t border-border/40 flex items-center justify-between">
            <a
              href={experience.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs text-primary font-semibold hover:underline"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              {experience.linkLabel ?? "Zobacz więcej"}
            </a>
            <span className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground/60">
              {experience.years.split(" ")[0]}
            </span>
          </div>
        )}
      </div>
    </motion.article>
  );
}

function buildSerpentineGeometry(
  points: Point[],
  cols: number,
  width: number,
  height: number
): RoadGeometry {
  if (points.length === 0 || width <= 0 || height <= 0) {
    return { width, height, pathD: "", turns: [], arrows: [] };
  }

  // Group indices by row
  const rowCount = Math.ceil(points.length / cols);
  const turns: TurnMarker[] = [];
  const arrows: SegmentArrow[] = [];

  const sideMargin = width >= 1100 ? 22 : 16;
  const rightTurnX = width - sideMargin;
  const leftTurnX = sideMargin;

  // Start slightly to the left of the first milestone
  const first = points[0];
  const startLeadX = Math.max(leftTurnX + 16, first.x - Math.min(84, width * 0.08));
  let d = `M ${startLeadX.toFixed(1)} ${first.y.toFixed(1)} L ${first.x.toFixed(1)} ${first.y.toFixed(1)}`;

  for (let r = 0; r < rowCount; r++) {
    const startIdx = r * cols;
    const endIdx = Math.min(startIdx + cols - 1, points.length - 1);
    const isLtr = r % 2 === 0;

    // Horizontal segments between milestones within this row
    for (let i = startIdx; i < endIdx; i++) {
      const a = points[i];
      const b = points[i + 1];
      d += ` L ${b.x.toFixed(1)} ${b.y.toFixed(1)}`;
      arrows.push({
        x: (a.x + b.x) / 2,
        y: (a.y + b.y) / 2,
        dir: isLtr ? "right" : "left",
      });
    }

    // Smooth rounded U-turn to the next row
    if (r < rowCount - 1) {
      const currEnd = points[endIdx];
      const nextStart = points[endIdx + 1];
      const dy = Math.max(40, nextStart.y - currEnd.y);
      const turnX = isLtr ? rightTurnX : leftTurnX;
      const horizontalSpace = isLtr
        ? Math.max(16, turnX - currEnd.x)
        : Math.max(16, currEnd.x - turnX);
      const radius = Math.min(44, dy * 0.28, horizontalSpace * 0.72);

      if (isLtr) {
        d += ` L ${(turnX - radius).toFixed(1)} ${currEnd.y.toFixed(1)}`;
        d += ` Q ${turnX.toFixed(1)} ${currEnd.y.toFixed(1)} ${turnX.toFixed(1)} ${(currEnd.y + radius).toFixed(1)}`;
        d += ` L ${turnX.toFixed(1)} ${(nextStart.y - radius).toFixed(1)}`;
        d += ` Q ${turnX.toFixed(1)} ${nextStart.y.toFixed(1)} ${(turnX - radius).toFixed(1)} ${nextStart.y.toFixed(1)}`;
        d += ` L ${nextStart.x.toFixed(1)} ${nextStart.y.toFixed(1)}`;
      } else {
        d += ` L ${(turnX + radius).toFixed(1)} ${currEnd.y.toFixed(1)}`;
        d += ` Q ${turnX.toFixed(1)} ${currEnd.y.toFixed(1)} ${turnX.toFixed(1)} ${(currEnd.y + radius).toFixed(1)}`;
        d += ` L ${turnX.toFixed(1)} ${(nextStart.y - radius).toFixed(1)}`;
        d += ` Q ${turnX.toFixed(1)} ${nextStart.y.toFixed(1)} ${(turnX + radius).toFixed(1)} ${nextStart.y.toFixed(1)}`;
        d += ` L ${nextStart.x.toFixed(1)} ${nextStart.y.toFixed(1)}`;
      }

      turns.push({
        x: turnX,
        y: (currEnd.y + nextStart.y) / 2,
        side: isLtr ? "right" : "left",
      });
    }
  }

  // Short tail after the last milestone in its row direction
  const lastRowIsLtr = (rowCount - 1) % 2 === 0;
  const last = points[points.length - 1];
  const tailOffset = Math.min(84, width * 0.08);
  const endTailX = lastRowIsLtr
    ? Math.min(rightTurnX - 16, last.x + tailOffset)
    : Math.max(leftTurnX + 16, last.x - tailOffset);
  d += ` L ${endTailX.toFixed(1)} ${last.y.toFixed(1)}`;

  return { width, height, pathD: d, turns, arrows };
}

function DesktopSerpentineRoadmap({ items }: { items: WorkExperience[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const nodeRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [cols, setCols] = useState(3);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [geometry, setGeometry] = useState<RoadGeometry>({
    width: 0,
    height: 0,
    pathD: "",
    turns: [],
    arrows: [],
  });

  // Responsive column count: 3 on lg+ (>=1024px), 2 on md (768px-1023px)
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const updateCols = () => setCols(mq.matches ? 3 : 2);
    updateCols();
    mq.addEventListener("change", updateCols);
    return () => mq.removeEventListener("change", updateCols);
  }, []);

  const rows = useMemo(() => {
    const grouped: { rowIndex: number; isLtr: boolean; entries: { item: WorkExperience; globalIndex: number }[] }[] = [];
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
        buildSerpentineGeometry(points, cols, containerRect.width, containerRect.height)
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

  // Scroll-linked road progress
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
      {/* Start Pill */}
      <div className="flex items-center justify-between px-12 lg:px-16 mb-3">
        <motion.div
          initial={{ opacity: 0, x: -16 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border-primary/30 text-primary text-xs font-mono uppercase tracking-wider"
        >
          <Flag className="w-3.5 h-3.5" />
          Start ścieżki ({items[0]?.years.split(" ")[0] ?? "2021"})
        </motion.div>

        <div className="inline-flex items-center gap-2 text-xs font-mono text-muted-foreground">
          <Compass className="w-3.5 h-3.5 text-primary" />
          <span>{items.length} kamieni milowych</span>
        </div>
      </div>

      {/* Main serpentine container */}
      <div ref={containerRef} className="relative px-10 lg:px-14 py-4">
        {/* Dynamic continuous serpentine SVG track */}
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
              <linearGradient id="serpentine-road-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#8b5cf6" />
                <stop offset="45%" stopColor="hsl(var(--primary))" />
                <stop offset="100%" stopColor="#10b981" />
              </linearGradient>
              <filter id="serpentine-glow" x="-15%" y="-15%" width="130%" height="130%">
                <feGaussianBlur stdDeviation="5" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Outer soft track halo */}
            <path
              d={geometry.pathD}
              stroke="hsl(var(--primary))"
              strokeOpacity="0.1"
              strokeWidth="12"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* Dashed guide track */}
            <path
              d={geometry.pathD}
              stroke="hsl(var(--primary))"
              strokeOpacity="0.3"
              strokeWidth="2.5"
              strokeDasharray="6 8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* Scroll-drawn luminous progress line */}
            <motion.path
              d={geometry.pathD}
              stroke="url(#serpentine-road-grad)"
              strokeWidth="3.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              filter="url(#serpentine-glow)"
              style={{ pathLength: smoothProgress }}
            />
          </svg>
        )}

        {/* Direction arrows along horizontal tracks */}
        {geometry.arrows.map((arrow, idx) => (
          <div
            key={`arrow-${idx}`}
            style={{ left: arrow.x, top: arrow.y }}
            className="absolute -translate-x-1/2 -translate-y-1/2 z-[1] pointer-events-none w-6 h-6 rounded-full bg-background/95 border border-primary/35 flex items-center justify-center text-primary shadow-sm"
            aria-hidden="true"
          >
            {arrow.dir === "right" ? (
              <ArrowRight className="w-3.5 h-3.5" />
            ) : (
              <ArrowLeft className="w-3.5 h-3.5" />
            )}
          </div>
        ))}

        {/* Turn direction badges on outer U-turns */}
        {geometry.turns.map((turn, idx) => (
          <div
            key={`turn-${idx}`}
            style={{ left: turn.x, top: turn.y }}
            className="absolute -translate-x-1/2 -translate-y-1/2 z-[1] pointer-events-none w-7 h-7 rounded-full bg-background border border-primary/40 flex items-center justify-center text-primary glow-sm"
            aria-hidden="true"
          >
            <ArrowDown className="w-3.5 h-3.5" />
          </div>
        ))}

        {/* Rows of milestones and cards */}
        <div className="space-y-14 relative z-10">
          {rows.map((row) => (
            <div
              key={`row-${row.rowIndex}`}
              className="grid gap-6 lg:gap-7"
              style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}
            >
              {row.entries.map(({ item, globalIndex }, localIdx) => {
                const style = getTypeStyle(item.type);
                const stepNumber = String(globalIndex + 1).padStart(2, "0");
                const isHovered = hoveredId === item.id;
                const gridCol = row.isLtr ? localIdx + 1 : cols - localIdx;

                return (
                  <div
                    key={item.id}
                    style={{ gridColumnStart: gridCol, gridRowStart: 1 }}
                    className="flex flex-col items-center h-full"
                  >
                    {/* Milestone node positioned right on the serpentine track */}
                    <div className="relative flex flex-col items-center">
                      <div
                        ref={(el) => {
                          nodeRefs.current[globalIndex] = el;
                        }}
                        className="relative z-20"
                      >
                        <motion.div
                          initial={{ opacity: 0, scale: 0.7 }}
                          whileInView={{ opacity: 1, scale: isHovered ? 1.15 : 1 }}
                          viewport={{ once: true, margin: "-40px" }}
                          animate={{ scale: isHovered ? 1.15 : 1 }}
                          transition={{ type: "spring", stiffness: 320, damping: 22 }}
                          className="relative"
                        >
                          <div
                            className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${style.nodeGradient} flex items-center justify-center shadow-lg ring-4 ring-background transition-shadow duration-300 ${
                              isHovered ? "glow" : "glow-sm"
                            }`}
                          >
                            {getNodeIcon(item.type)}
                          </div>

                          {/* Step counter pill */}
                          <span className="absolute -top-2 -right-2.5 px-1.5 py-0.5 rounded-md bg-background border border-border text-[10px] font-mono font-bold text-foreground shadow-sm">
                            {stepNumber}
                          </span>

                          {/* Live pulse ring for current milestones */}
                          {item.isCurrent && (
                            <motion.div
                              className="absolute inset-0 rounded-2xl border-2 border-primary/50 pointer-events-none"
                              animate={{ scale: [1, 1.38, 1], opacity: [0.55, 0, 0.55] }}
                              transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
                            />
                          )}
                        </motion.div>
                      </div>

                      {/* Vertical stem from node to card */}
                      <div className="flex flex-col items-center">
                        <div
                          className={`w-0.5 h-6 transition-colors duration-300 ${
                            isHovered
                              ? "bg-gradient-to-b from-primary to-accent"
                              : "bg-gradient-to-b from-primary/50 to-border"
                          }`}
                        />
                        <div
                          className={`w-2 h-2 rounded-full -mb-1 z-10 transition-colors duration-300 ${
                            isHovered ? "bg-primary scale-125" : "bg-primary/50"
                          }`}
                        />
                      </div>
                    </div>

                    {/* Card */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-40px" }}
                      transition={{ duration: 0.45, delay: localIdx * 0.08 }}
                      className="w-full flex-1"
                    >
                      <WorkCardContent
                        experience={item}
                        stepNumber={stepNumber}
                        isHighlighted={isHovered}
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

      {/* End Pill */}
      <div
        className={`flex px-12 lg:px-16 mt-4 ${
          (rows.length - 1) % 2 === 0 ? "justify-end" : "justify-start"
        }`}
      >
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-xs font-mono uppercase tracking-wider"
        >
          <Sparkles className="w-3.5 h-3.5" />
          Obecnie (2026) & Kolejne kroki
        </motion.div>
      </div>
    </div>
  );
}

function MobileTimelineRoadmap({ items }: { items: WorkExperience[] }) {
  const listRef = useRef<HTMLDivElement>(null);
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
      {/* Mobile Start Badge */}
      <div className="flex items-center gap-2 mb-5 pl-1">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full glass border-primary/30 text-primary text-xs font-mono">
          <Flag className="w-3 h-3" />
          Start ({items[0]?.years.split(" ")[0] ?? "2021"})
        </span>
        <span className="text-xs font-mono text-muted-foreground">
          {items.length} etapów
        </span>
      </div>

      <div ref={listRef} className="relative pl-12 space-y-5">
        {/* Static background rail */}
        <div className="absolute left-5 top-2 bottom-2 w-0.5 bg-border/70 -translate-x-1/2 rounded-full" />

        {/* Animated scroll progress rail */}
        <motion.div
          style={{ scaleY }}
          className="absolute left-5 top-2 bottom-2 w-0.5 -translate-x-1/2 origin-top rounded-full bg-gradient-to-b from-violet-500 via-primary to-emerald-500"
        />

        {items.map((experience, index) => {
          const style = getTypeStyle(experience.type);
          const stepNumber = String(index + 1).padStart(2, "0");

          return (
            <motion.div
              key={experience.id}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 0.4, delay: Math.min(index * 0.05, 0.25) }}
              className="relative"
            >
              {/* Node icon on left rail */}
              <div className="absolute -left-12 top-5 w-10 flex items-center justify-center">
                <div
                  className={`w-10 h-10 rounded-xl bg-gradient-to-br ${style.nodeGradient} flex items-center justify-center ring-4 ring-background shadow-md relative z-10`}
                >
                  {getNodeIcon(experience.type)}
                </div>
                {experience.isCurrent && (
                  <motion.div
                    className="absolute w-10 h-10 rounded-xl border-2 border-primary/50 pointer-events-none"
                    animate={{ scale: [1, 1.35, 1], opacity: [0.5, 0, 0.5] }}
                    transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                  />
                )}
              </div>

              {/* Short horizontal connector */}
              <div className="absolute -left-2.5 top-10 w-3 h-0.5 bg-gradient-to-r from-primary/60 to-primary/20" />

              <WorkCardContent experience={experience} stepNumber={stepNumber} />
            </motion.div>
          );
        })}
      </div>

      {/* Mobile End Badge */}
      <div className="flex items-center gap-2 mt-5 pl-1">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-xs font-mono">
          <Sparkles className="w-3 h-3" />
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

      {/* Full-width responsive container for the serpentine roadmap */}
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
            <DesktopSerpentineRoadmap items={filteredExperiences} />
            <MobileTimelineRoadmap items={filteredExperiences} />
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
