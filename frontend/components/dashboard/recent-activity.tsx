"use client";

import { motion } from "framer-motion";
import { CheckCircle2, Clock, XCircle, Send, UserPlus } from "lucide-react";

interface Activity {
  id: string;
  type: "accepted" | "pending" | "rejected" | "sent" | "new_contact";
  message: string;
  timestamp: string;
}

const activities: Activity[] = [
  {
    id: "1",
    type: "accepted",
    message: "Google accepted your referral for Senior Frontend Engineer",
    timestamp: "2 hours ago",
  },
  {
    id: "2",
    type: "sent",
    message: "You sent a referral to Meta for Staff Software Engineer",
    timestamp: "5 hours ago",
  },
  {
    id: "3",
    type: "new_contact",
    message: "Priya Sharma connected with you on TrustHire",
    timestamp: "1 day ago",
  },
  {
    id: "4",
    type: "pending",
    message: "Amazon is reviewing your SDE II referral",
    timestamp: "2 days ago",
  },
  {
    id: "5",
    type: "rejected",
    message: "Stripe declined the Backend Engineer referral",
    timestamp: "3 days ago",
  },
];

const typeConfig = {
  accepted: { icon: CheckCircle2, color: "text-emerald-400", bg: "bg-emerald-500/10" },
  pending: { icon: Clock, color: "text-amber-400", bg: "bg-amber-500/10" },
  rejected: { icon: XCircle, color: "text-red-400", bg: "bg-red-500/10" },
  sent: { icon: Send, color: "text-blue-400", bg: "bg-blue-500/10" },
  new_contact: { icon: UserPlus, color: "text-primary", bg: "bg-primary/10" },
};

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.06 } },
};

const item = {
  hidden: { opacity: 0, x: -12 },
  show: { opacity: 1, x: 0, transition: { duration: 0.3 } },
};

export default function RecentActivity() {
  return (
    <div className="glass rounded-2xl p-5 glow-border">
      <h2 className="text-lg font-semibold text-foreground mb-4">
        Recent Activity
      </h2>
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="flex flex-col gap-1"
      >
        {activities.map((activity) => {
          const config = typeConfig[activity.type];
          return (
            <motion.div
              key={activity.id}
              variants={item}
              className="flex items-start gap-3 p-3 rounded-xl hover:bg-secondary/50 transition-colors group cursor-default"
            >
              <div
                className={`w-8 h-8 rounded-lg ${config.bg} flex items-center justify-center shrink-0 mt-0.5`}
              >
                <config.icon size={14} className={config.color} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-secondary-foreground group-hover:text-foreground transition-colors leading-relaxed">
                  {activity.message}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  {activity.timestamp}
                </p>
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
}
