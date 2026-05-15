"use client";

import Link from "next/link";

import { motion } from "framer-motion";

import {
  ArrowRight,
  Briefcase,
  ShieldCheck,
  Users,
} from "lucide-react";

export default function HomePage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-black text-white">
      {/* BACKGROUND */}

      <div className="absolute inset-0 -z-10">
        <div className="absolute top-[-10%] left-[10%] h-[500px] w-[500px] rounded-full bg-cyan-500/20 blur-[120px]" />

        <div className="absolute bottom-[-10%] right-[10%] h-[500px] w-[500px] rounded-full bg-blue-600/20 blur-[140px]" />
      </div>

      {/* GRID */}

      <div className="absolute inset-0 opacity-[0.04] bg-[linear-gradient(to_right,#ffffff22_1px,transparent_1px),linear-gradient(to_bottom,#ffffff22_1px,transparent_1px)] bg-[size:40px_40px]" />

      {/* NAVBAR */}

      <nav className="flex items-center justify-between px-6 md:px-12 py-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-r from-cyan-400 to-blue-600 flex items-center justify-center">
            <Briefcase className="text-black" />
          </div>

          <h1 className="text-2xl font-black">
            TrustHire
          </h1>
        </div>

        <div className="flex items-center gap-4">
          <Link
            href="/login"
            className="text-zinc-300 hover:text-white transition"
          >
            Login
          </Link>

          <Link
            href="/register"
            className="px-5 py-3 rounded-2xl bg-gradient-to-r from-cyan-400 to-blue-600 text-black font-semibold"
          >
            Get Started
          </Link>
        </div>
      </nav>

      {/* HERO */}

      <section className="flex flex-col items-center justify-center text-center px-6 pt-24">
        <motion.h1
          initial={{
            opacity: 0,
            y: 30,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          className="text-5xl md:text-7xl font-black leading-tight max-w-5xl"
        >
          Trusted Referrals
          <span className="bg-gradient-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent">
            {" "}
            For Real Careers
          </span>
        </motion.h1>

        <p className="mt-6 text-zinc-400 text-lg max-w-2xl">
          TrustHire helps professionals connect through
          verified referrals without fake metrics or spam.
        </p>

        <div className="flex items-center gap-4 mt-10">
          <Link
            href="/register"
            className="px-7 py-4 rounded-2xl bg-gradient-to-r from-cyan-400 to-blue-600 text-black font-semibold flex items-center gap-2"
          >
            Start Now

            <ArrowRight size={18} />
          </Link>

          <Link
            href="/login"
            className="px-7 py-4 rounded-2xl border border-white/10 bg-white/5"
          >
            Login
          </Link>
        </div>

        {/* FEATURES */}

        <div className="grid md:grid-cols-3 gap-6 mt-24 max-w-6xl w-full">
          {[
            {
              icon: ShieldCheck,
              title: "Verified Network",
              desc: "Only authentic professionals and trusted referrals.",
            },
            {
              icon: Users,
              title: "Real Connections",
              desc: "Build meaningful career opportunities with trust.",
            },
            {
              icon: Briefcase,
              title: "Career Growth",
              desc: "Discover jobs through genuine professional referrals.",
            },
          ].map((item, index) => (
            <motion.div
              whileHover={{
                y: -5,
              }}
              key={index}
              className="p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-2xl"
            >
              <item.icon className="text-cyan-400 w-10 h-10 mb-5" />

              <h2 className="text-2xl font-bold">
                {item.title}
              </h2>

              <p className="text-zinc-400 mt-3">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </section>
    </main>
  );
}