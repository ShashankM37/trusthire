"use client";

import { motion } from "framer-motion";
import {
  Building2,
  MapPin,
  Calendar,
  MoreHorizontal,
  ExternalLink,
} from "lucide-react";

interface Referral {
  id: string;
  company: string;
  role: string;
  location: string;
  status: "pending" | "accepted" | "rejected";
  date: string;
  logo: string;
}

const sampleReferrals: Referral[] = [
  {
    id: "1",
    company: "Google",
    role: "Senior Frontend Engineer",
    location: "Mountain View, CA",
    status: "accepted",
    date: "2 days ago",
    logo: "G",
  },
  {
    id: "2",
    company: "Meta",
    role: "Staff Software Engineer",
    location: "Menlo Park, CA",
    status: "pending",
    date: "5 days ago",
    logo: "M",
  },
  {
    id: "3",
    company: "Apple",
    role: "iOS Developer",
    location: "Cupertino, CA",
    status: "accepted",
    date: "1 week ago",
    logo: "A",
  },
  {
    id: "4",
    company: "Amazon",
    role: "SDE II",
    location: "Seattle, WA",
    status: "rejected",
    date: "1 week ago",
    logo: "A",
  },
  {
    id: "5",
    company: "Microsoft",
    role: "Program Manager",
    location: "Redmond, WA",
    status: "pending",
    date: "3 days ago",
    logo: "M",
  },
  {
    id: "6",
    company: "Netflix",
    role: "Full Stack Engineer",
    location: "Los Gatos, CA",
    status: "accepted",
    date: "4 days ago",
    logo: "N",
  },
];

const statusConfig = {
  pending: {
    label: "Pending",
    className: "bg-amber-500/10 text-amber-400 border-amber-500/20",
  },
  accepted: {
    label: "Accepted",
    className: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  },
  rejected: {
    label: "Rejected",
    className: "bg-red-500/10 text-red-400 border-red-500/20",
  },
};

const companyColors: Record<string, string> = {
  Google: "from-blue-500 to-green-500",
  Meta: "from-blue-600 to-blue-400",
  Apple: "from-gray-400 to-gray-600",
  Amazon: "from-orange-500 to-yellow-500",
  Microsoft: "from-blue-500 to-cyan-500",
  Netflix: "from-red-600 to-red-500",
};

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.06, delayChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: [0.4, 0, 0.2, 1] } },
};

export default function ReferralCards() {
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-foreground">
          Your Referrals
        </h2>
        <button className="text-sm text-muted-foreground hover:text-primary transition-colors">
          View all
        </button>
      </div>
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4"
      >
        {sampleReferrals.map((referral) => (
          <motion.div
            key={referral.id}
            variants={item}
            whileHover={{ y: -3, transition: { duration: 0.2 } }}
            className="glass rounded-2xl p-5 glow-border glow-border-hover group cursor-pointer"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div
                  className={`w-10 h-10 rounded-xl bg-gradient-to-br ${
                    companyColors[referral.company] || "from-primary to-accent"
                  } flex items-center justify-center text-white font-bold text-sm shadow-lg`}
                >
                  {referral.logo}
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">
                    {referral.role}
                  </h3>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <Building2 size={12} className="text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">
                      {referral.company}
                    </span>
                  </div>
                </div>
              </div>
              <button className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary opacity-0 group-hover:opacity-100 transition-all">
                <MoreHorizontal size={14} />
              </button>
            </div>

            <div className="flex items-center gap-4 text-xs text-muted-foreground mb-4">
              <div className="flex items-center gap-1">
                <MapPin size={12} />
                <span>{referral.location}</span>
              </div>
              <div className="flex items-center gap-1">
                <Calendar size={12} />
                <span>{referral.date}</span>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <span
                className={`text-xs font-medium px-2.5 py-1 rounded-full border ${
                  statusConfig[referral.status].className
                }`}
              >
                {statusConfig[referral.status].label}
              </span>
              <button className="p-1.5 rounded-lg text-muted-foreground hover:text-primary hover:bg-primary/10 opacity-0 group-hover:opacity-100 transition-all">
                <ExternalLink size={14} />
              </button>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
