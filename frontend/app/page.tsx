"use client";

import Link from "next/link";
import {
  ShieldCheck,
  Users,
  Briefcase,
  ArrowRight,
  Sparkles,
} from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white overflow-hidden relative">

      {/* Animated Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-cyan-500/20 blur-3xl rounded-full"></div>

        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-purple-500/20 blur-3xl rounded-full"></div>

        <div className="absolute top-1/2 left-1/2 w-[300px] h-[300px] bg-pink-500/10 blur-3xl rounded-full"></div>
      </div>

      {/* Navbar */}
      <nav className="flex justify-between items-center px-8 md:px-16 py-6 border-b border-white/10 backdrop-blur-xl bg-white/5 sticky top-0 z-50">

        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-r from-cyan-400 to-blue-600 flex items-center justify-center text-black font-bold text-lg shadow-lg shadow-cyan-500/30">
            T
          </div>

          <h1 className="text-3xl font-black tracking-wide">
            TrustHire
          </h1>
        </div>

        <div className="flex gap-4">
          <Link href="/login">
            <button className="px-5 py-2 rounded-xl border border-white/10 hover:bg-white/10 transition-all duration-300">
              Login
            </button>
          </Link>

          <Link href="/register">
            <button className="px-5 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:scale-105 transition-all duration-300 shadow-lg shadow-cyan-500/30">
              Register
            </button>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center px-6 py-28 md:py-36 relative z-10">

        <div className="flex items-center gap-2 bg-white/5 border border-white/10 px-6 py-2 rounded-full mb-8 backdrop-blur-lg">
          <Sparkles className="text-cyan-400" size={18} />

          <span className="text-sm text-gray-300">
            The Future of Trusted Hiring
          </span>
        </div>

        <h1 className="text-6xl md:text-8xl font-black leading-tight max-w-6xl">
          Hire Through

          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 animate-pulse">
            Trusted Referrals
          </span>
        </h1>

        <p className="mt-8 text-gray-400 text-lg md:text-2xl max-w-3xl leading-relaxed">
          Connect candidates with verified professionals,
          unlock authentic referrals,
          and build the next generation hiring ecosystem.
        </p>

        <div className="flex flex-col md:flex-row gap-6 mt-12">

          <Link href="/register">
            <button className="group px-10 py-5 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 text-lg font-bold hover:scale-105 transition-all duration-300 shadow-2xl shadow-cyan-500/40 flex items-center gap-3">
              Get Started

              <ArrowRight className="group-hover:translate-x-1 transition" />
            </button>
          </Link>

          <Link href="/login">
            <button className="px-10 py-5 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-lg text-lg hover:bg-white/10 transition-all duration-300">
              Explore Platform
            </button>
          </Link>

        </div>
      </section>

      {/* Fancy Cards */}
      <section className="grid md:grid-cols-3 gap-8 px-8 md:px-16 pb-28 relative z-10">

        <div className="group bg-white/5 border border-white/10 backdrop-blur-xl rounded-3xl p-8 hover:scale-105 hover:border-cyan-400/40 transition-all duration-500 shadow-xl shadow-black/30">

          <div className="w-16 h-16 rounded-2xl bg-cyan-500/20 flex items-center justify-center mb-6">
            <Users size={34} className="text-cyan-400" />
          </div>

          <h2 className="text-3xl font-bold mb-4">
            Verified Network
          </h2>

          <p className="text-gray-400 leading-relaxed">
            Connect only with real employees and trusted professionals.
          </p>
        </div>

        <div className="group bg-white/5 border border-white/10 backdrop-blur-xl rounded-3xl p-8 hover:scale-105 hover:border-blue-400/40 transition-all duration-500 shadow-xl shadow-black/30">

          <div className="w-16 h-16 rounded-2xl bg-blue-500/20 flex items-center justify-center mb-6">
            <Briefcase size={34} className="text-blue-400" />
          </div>

          <h2 className="text-3xl font-bold mb-4">
            Faster Hiring
          </h2>

          <p className="text-gray-400 leading-relaxed">
            Skip cold applications and reach recruiters through referrals.
          </p>
        </div>

        <div className="group bg-white/5 border border-white/10 backdrop-blur-xl rounded-3xl p-8 hover:scale-105 hover:border-purple-400/40 transition-all duration-500 shadow-xl shadow-black/30">

          <div className="w-16 h-16 rounded-2xl bg-purple-500/20 flex items-center justify-center mb-6">
            <ShieldCheck size={34} className="text-purple-400" />
          </div>

          <h2 className="text-3xl font-bold mb-4">
            Privacy First
          </h2>

          <p className="text-gray-400 leading-relaxed">
            Secure authentication and protected referral requests.
          </p>
        </div>

      </section>

    </main>
  );
}