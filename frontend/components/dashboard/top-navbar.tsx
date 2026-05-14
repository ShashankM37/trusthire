"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Bell,
  ChevronDown,
  LogOut,
  User,
  Settings,
  Plus,
} from "lucide-react";

interface TopNavbarProps {
  onAddReferral: () => void;
}

export default function TopNavbar({ onAddReferral }: TopNavbarProps) {
  const [profileOpen, setProfileOpen] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);

  return (
    <header className="sticky top-0 z-30 h-16 flex items-center justify-between px-6 glass border-b border-border">
      {/* Search Bar */}
      <div className="relative flex-1 max-w-md">
        <Search
          size={16}
          className={`absolute left-3 top-1/2 -translate-y-1/2 transition-colors duration-200 ${
            searchFocused ? "text-primary" : "text-muted-foreground"
          }`}
        />
        <input
          type="text"
          placeholder="Search referrals, companies..."
          onFocus={() => setSearchFocused(true)}
          onBlur={() => setSearchFocused(false)}
          className={`w-full pl-10 pr-4 py-2 rounded-xl bg-secondary/60 border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none transition-all duration-300 ${
            searchFocused
              ? "border-primary/40 shadow-[0_0_20px_rgba(34,211,238,0.08)]"
              : "border-border"
          }`}
        />
        <kbd className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground bg-background px-1.5 py-0.5 rounded border border-border font-mono hidden md:inline">
          /
        </kbd>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-3 ml-4">
        {/* Add Referral */}
        <button
          onClick={onAddReferral}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-primary to-accent text-primary-foreground text-sm font-semibold hover:shadow-lg hover:shadow-primary/20 transition-all duration-300 hover:scale-[1.02]"
        >
          <Plus size={16} />
          <span className="hidden md:inline">Add Referral</span>
        </button>

        {/* Notifications */}
        <button className="relative p-2.5 rounded-xl hover:bg-secondary text-muted-foreground hover:text-foreground transition-all duration-200">
          <Bell size={18} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-primary rounded-full animate-pulse-glow" />
        </button>

        {/* Profile */}
        <div className="relative">
          <button
            onClick={() => setProfileOpen(!profileOpen)}
            className="flex items-center gap-2 p-1.5 pr-3 rounded-xl hover:bg-secondary transition-all duration-200"
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary/30 to-accent/30 border border-primary/20 flex items-center justify-center">
              <User size={14} className="text-primary" />
            </div>
            <ChevronDown
              size={14}
              className={`text-muted-foreground transition-transform duration-200 ${
                profileOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          <AnimatePresence>
            {profileOpen && (
              <>
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setProfileOpen(false)}
                />
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.96 }}
                  transition={{ duration: 0.15 }}
                  className="absolute right-0 top-12 w-56 glass-strong rounded-xl border border-border shadow-2xl shadow-black/40 z-50 overflow-hidden"
                >
                  <div className="p-3 border-b border-border">
                    <p className="text-sm font-semibold text-foreground">
                      Shashank M
                    </p>
                    <p className="text-xs text-muted-foreground">
                      shashank@trusthire.com
                    </p>
                  </div>
                  <div className="p-1.5">
                    <button className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-secondary-foreground hover:bg-secondary hover:text-foreground transition-colors">
                      <User size={14} />
                      Profile
                    </button>
                    <button className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-secondary-foreground hover:bg-secondary hover:text-foreground transition-colors">
                      <Settings size={14} />
                      Settings
                    </button>
                    <button className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-destructive hover:bg-destructive/10 transition-colors">
                      <LogOut size={14} />
                      Sign Out
                    </button>
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
}
