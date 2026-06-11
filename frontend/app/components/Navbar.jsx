"use client";

import Link from "next/link";

import { useRouter } from "next/navigation";

import {
  Briefcase,
  User,
  Bell,
} from "lucide-react";

export default function Navbar() {

  const router = useRouter();

  // LOGOUT
  const handleLogout = () => {

    localStorage.removeItem("token");

    localStorage.removeItem("user");

    router.push("/login");
  };

  return (
    <nav className="sticky top-0 z-50 border-b border-white/10 bg-black/60 backdrop-blur-2xl">

      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* LEFT */}
        <Link
          href="/dashboard"
          className="flex items-center gap-3"
        >

          <div className="w-11 h-11 rounded-2xl bg-gradient-to-r from-cyan-400 to-purple-600 flex items-center justify-center">

            <Briefcase className="text-black" />

          </div>

          <div>

            <h1 className="text-xl font-black text-white">
              TrustHire
            </h1>

            <p className="text-xs text-zinc-400">
              Student Referral Network
            </p>

          </div>

        </Link>

        {/* CENTER */}
        <div className="hidden md:flex items-center gap-8 text-sm text-zinc-300">

          <Link
            href="/dashboard"
            className="hover:text-cyan-400 transition"
          >
            Dashboard
          </Link>

          <Link
            href="/jobs"
            className="hover:text-cyan-400 transition"
          >
            Jobs
          </Link>

          <Link
            href="/referrals"
            className="hover:text-cyan-400 transition"
          >
            Referrals
          </Link>

          <Link
            href="/my-applications"
            className="hover:text-cyan-400 transition"
          >
            Applications
          </Link>

        </div>

        {/* RIGHT */}
        <div className="flex items-center gap-4">

          <button className="w-11 h-11 rounded-2xl border border-white/10 bg-white/5 flex items-center justify-center hover:bg-white/10 transition">

            <Bell size={20} />

          </button>

          <Link
            href="/profile"
            className="w-11 h-11 rounded-2xl border border-white/10 bg-white/5 flex items-center justify-center hover:bg-white/10 transition"
          >

            <User size={20} />

          </Link>

          <button
            onClick={handleLogout}
            className="px-5 py-3 rounded-2xl bg-gradient-to-r from-red-500 to-pink-500 font-semibold hover:scale-105 transition"
          >
            Logout
          </button>

        </div>

      </div>

    </nav>
  );
}
