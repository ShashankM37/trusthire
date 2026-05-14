"use client";

import { motion } from "framer-motion";
import { Users, Send, CheckCircle2, Clock } from "lucide-react";

const stats = [
  {
    label: "Total Referrals",
    value: "128",
    change: "+12%",
    trend: "up" as const,
    icon: Users,
    color: "from-primary to-accent",
    glowColor: "shadow-primary/10",
  },
  {
    label: "Sent This Month",
    value: "34",
    change: "+8%",
    trend: "up" as const,
    icon: Send,
    color: "from-blue-500 to-blue-600",
    glowColor: "shadow-blue-500/10",
  },
  {
    label: "Accepted",
    value: "89",
    change: "+23%",
    trend: "up" as const,
    icon: CheckCircle2,
    color: "from-emerald-500 to-emerald-600",
    glowColor: "shadow-emerald-500/10",
  },
  {
    label: "Pending",
    value: "15",
    change: "-5%",
    trend: "down" as const,
    icon: Clock,
    color: "from-amber-500 to-amber-600",
    glowColor: "shadow-amber-500/10",
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.4, 0, 0.2, 1] } },
};

export default function StatsCards() {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
    >
      {stats.map((stat) => (
        <motion.div
          key={stat.label}
          variants={item}
          whileHover={{ y: -2, transition: { duration: 0.2 } }}
          className={`glass rounded-2xl p-5 glow-border glow-border-hover cursor-default shadow-lg ${stat.glowColor}`}
        >
          <div className="flex items-start justify-between mb-4">
            <div
              className={`w-10 h-10 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center shadow-lg`}
            >
              <stat.icon size={18} className="text-white" />
            </div>
            <span
              className={`text-xs font-semibold px-2 py-1 rounded-full ${
                stat.trend === "up"
                  ? "bg-emerald-500/10 text-emerald-400"
                  : "bg-red-500/10 text-red-400"
              }`}
            >
              {stat.change}
            </span>
          </div>
          <p className="text-2xl font-bold text-foreground">{stat.value}</p>
          <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
        </motion.div>
      ))}
    </motion.div>
  );
}
