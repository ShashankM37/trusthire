"use client";

import { motion } from "framer-motion";
import { TrendingUp, ArrowUpRight } from "lucide-react";

interface Company {
  name: string;
  openPositions: number;
  referrals: number;
  logo: string;
  gradient: string;
}

const companies: Company[] = [
  {
    name: "Google",
    openPositions: 1240,
    referrals: 89,
    logo: "G",
    gradient: "from-blue-500 to-green-500",
  },
  {
    name: "Stripe",
    openPositions: 320,
    referrals: 45,
    logo: "S",
    gradient: "from-indigo-500 to-indigo-400",
  },
  {
    name: "Vercel",
    openPositions: 85,
    referrals: 32,
    logo: "V",
    gradient: "from-foreground to-foreground/70",
  },
  {
    name: "Linear",
    openPositions: 42,
    referrals: 28,
    logo: "L",
    gradient: "from-indigo-400 to-blue-500",
  },
  {
    name: "Figma",
    openPositions: 156,
    referrals: 21,
    logo: "F",
    gradient: "from-orange-500 to-pink-500",
  },
];

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.06 } },
};

const item = {
  hidden: { opacity: 0, x: 12 },
  show: { opacity: 1, x: 0, transition: { duration: 0.3 } },
};

export default function TrendingCompanies() {
  return (
    <div className="glass rounded-2xl p-5 glow-border">
      <div className="flex items-center gap-2 mb-4">
        <TrendingUp size={18} className="text-primary" />
        <h2 className="text-lg font-semibold text-foreground">
          Trending Companies
        </h2>
      </div>
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="flex flex-col gap-1"
      >
        {companies.map((company, index) => (
          <motion.div
            key={company.name}
            variants={item}
            className="flex items-center gap-3 p-3 rounded-xl hover:bg-secondary/50 transition-colors group cursor-pointer"
          >
            <span className="text-xs text-muted-foreground w-4 font-mono">
              {index + 1}
            </span>
            <div
              className={`w-9 h-9 rounded-lg bg-gradient-to-br ${company.gradient} flex items-center justify-center text-white font-bold text-xs shadow-md`}
            >
              {company.logo}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground">
                {company.name}
              </p>
              <p className="text-xs text-muted-foreground">
                {company.openPositions.toLocaleString()} open roles
              </p>
            </div>
            <div className="flex items-center gap-1 text-xs text-primary font-medium opacity-0 group-hover:opacity-100 transition-opacity">
              <span>{company.referrals}</span>
              <ArrowUpRight size={12} />
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
