"use client";

import Link from "next/link";
import { motion } from "framer-motion";

import {
  ArrowRight,
  Briefcase,
  ShieldCheck,
  Users,
  Star,
  ChevronRight,
} from "lucide-react";

export default function HomePage() {
  const features = [
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
  ];

  const stats = [
    {
      value: "500+",
      label: "Verified Professionals",
    },
    {
      value: "120+",
      label: "Successful Referrals",
    },
    {
      value: "50+",
      label: "Partner Companies",
    },
  ];

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
      <nav className="sticky top-0 z-50 border-b border-white/10 bg-black/40 backdrop-blur-xl">
        <div className="flex items-center justify-between px-6 md:px-12 py-5">
          {/* LOGO */}
          <Link href="/" className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-r from-cyan-400 to-blue-600">
              <Briefcase className="text-black" />
            </div>

            <h1 className="text-2xl font-black">TrustHire</h1>
          </Link>

          {/* NAV LINKS */}
          <div className="hidden md:flex items-center gap-8 text-sm text-zinc-300">
            <Link
              href="/features"
              className="hover:text-cyan-400 transition-all duration-300"
            >
              Features
            </Link>

            <Link
              href="/referrals"
              className="hover:text-cyan-400 transition-all duration-300"
            >
              Referrals
            </Link>

            <Link
              href="/about"
              className="hover:text-cyan-400 transition-all duration-300"
            >
              About
            </Link>
          </div>

          {/* AUTH BUTTONS */}
          <div className="flex items-center gap-4">
            <Link
              href="/login"
              className="rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-zinc-300 transition-all duration-300 hover:bg-white/10 hover:text-white"
            >
              Login
            </Link>

            <Link
              href="/register"
              className="rounded-2xl bg-gradient-to-r from-cyan-400 to-blue-600 px-5 py-3 font-semibold text-black transition-all duration-300 hover:scale-105"
            >
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section className="relative flex flex-col items-center justify-center px-6 pt-24 text-center">
        <motion.div
          initial={{
            opacity: 0,
            y: 30,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.7,
          }}
          className="max-w-6xl"
        >
          {/* BADGE */}
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-5 py-2 text-sm text-cyan-300">
            <Star size={16} />

            Trusted by professionals worldwide
          </div>
          {/* TITLE */}
          <h1 className="text-4xl font-black leading-tight md:text-6xl">
            Trusted Referrals
            <span className="bg-gradient-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent">
              {" "}
              For Real Careers
            </span>
          </h1>

          {/* DESCRIPTION */}
          <p className="mx-auto mt-8 max-w-3xl text-lg leading-relaxed text-zinc-400 md:text-xl">
            TrustHire helps professionals connect through verified referrals
            without fake metrics, spam, or low-quality networking.
          </p>

          {/* CTA */}
          <div className="mt-12 flex flex-col items-center justify-center gap-5 sm:flex-row">
            <Link
              href="/register"
              className="flex items-center gap-3 rounded-2xl bg-gradient-to-r from-cyan-400 to-blue-600 px-8 py-4 font-semibold text-black transition-all duration-300 hover:scale-105"
            >
              Start Now

              <ArrowRight size={18} />
            </Link>

            <Link
              href="/login"
              className="rounded-2xl border border-white/10 bg-white/5 px-8 py-4 transition-all duration-300 hover:bg-white/10"
            >
              Login
            </Link>
          </div>
        </motion.div>

        {/* STATS */}
        <div className="mt-24 grid w-full max-w-5xl grid-cols-1 gap-6 md:grid-cols-3">
          {stats.map((item, index) => (
            <motion.div
              key={index}
              initial={{
                opacity: 0,
                y: 20,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: index * 0.2,
              }}
              className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl"
            >
              <h2 className="text-4xl font-black text-cyan-400">
                {item.value}
              </h2>

              <p className="mt-3 text-zinc-400">{item.label}</p>
            </motion.div>
          ))}
        </div>

        {/* FEATURES */}
        <div className="mt-24 grid w-full max-w-6xl gap-8 md:grid-cols-3">
          {features.map((item, index) => (
            <motion.div
              key={index}
              whileHover={{
                y: -8,
                scale: 1.02,
              }}
              transition={{
                duration: 0.2,
              }}
              className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-2xl transition-all duration-300 hover:border-cyan-400/40"
            >
              <item.icon className="mb-5 h-12 w-12 text-cyan-400" />

              <h2 className="text-2xl font-bold">{item.title}</h2>

              <p className="mt-4 leading-relaxed text-zinc-400">
                {item.desc}
              </p>

              <Link
                href="/features"
                className="mt-6 inline-flex items-center gap-2 text-cyan-400 transition-all duration-300 hover:gap-3"
              >
                Learn More

                <ChevronRight size={18} />
              </Link>
            </motion.div>
          ))}
        </div>

        {/* FINAL CTA */}
        <motion.div
          initial={{
            opacity: 0,
            y: 20,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
          }}
          className="mt-32 mb-24 w-full max-w-5xl rounded-[40px] border border-white/10 bg-gradient-to-r from-cyan-500/10 to-blue-600/10 p-12 backdrop-blur-2xl"
        >
          <h2 className="text-4xl font-black md:text-5xl">
            Ready To Build Your Career Network?
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-lg text-zinc-400">
            Join professionals connecting through trusted referrals instead of
            random networking noise.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-5 sm:flex-row">
            <Link
              href="/register"
              className="rounded-2xl bg-gradient-to-r from-cyan-400 to-blue-600 px-8 py-4 font-semibold text-black transition-all duration-300 hover:scale-105"
            >
              Create Account
            </Link>

            <Link
              href="/referrals"
              className="rounded-2xl border border-white/10 bg-white/5 px-8 py-4 transition-all duration-300 hover:bg-white/10"
            >
              Explore Referrals
            </Link>
          </div>
        </motion.div>
      </section>
    </main>
  );
}