"use client";

import Link from "next/link";
import { motion } from "framer-motion";

import {
  ArrowRight,
  ShieldCheck,
  Briefcase,
  Users,
  Sparkles,
  Star,
  CheckCircle2,
  ChevronRight,
  Globe,
  TrendingUp,
  Lock,
} from "lucide-react";

export default function HomePage() {
  const features = [
    {
      icon: ShieldCheck,
      title: "Verified Professionals",
      desc: "Every profile is trust-first. No fake flexing. No spam networking.",
    },
    {
      icon: Users,
      title: "Referral Driven Hiring",
      desc: "Get opportunities through real people instead of broken job boards.",
    },
    {
      icon: TrendingUp,
      title: "Career Acceleration",
      desc: "Build meaningful connections that actually move your career forward.",
    },
  ];

  const stats = [
    {
      value: "12K+",
      label: "Trusted Users",
    },
    {
      value: "3.2K+",
      label: "Successful Referrals",
    },
    {
      value: "150+",
      label: "Hiring Companies",
    },
    {
      value: "98%",
      label: "Verified Profiles",
    },
  ];

  const testimonials = [
    {
      name: "Aarav Sharma",
      role: "Software Engineer",
      text: "TrustHire helped me land interviews through real referrals instead of blindly applying everywhere.",
    },
    {
      name: "Priya Mehta",
      role: "Recruiter",
      text: "Finally a hiring platform that values trust and quality over vanity metrics.",
    },
    {
      name: "Rahul Verma",
      role: "Frontend Developer",
      text: "The UI is insane and the networking feels genuine compared to LinkedIn spam.",
    },
  ];

  return (
    <main className="relative overflow-hidden bg-black text-white">
      {/* BACKGROUND */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-[10%] top-[5%] h-[500px] w-[500px] rounded-full bg-cyan-500/20 blur-[120px]" />

        <div className="absolute bottom-[0%] right-[5%] h-[500px] w-[500px] rounded-full bg-blue-600/20 blur-[140px]" />

        <div className="absolute left-[35%] top-[45%] h-[350px] w-[350px] rounded-full bg-purple-500/10 blur-[120px]" />
      </div>

      {/* GRID */}
      <div className="absolute inset-0 -z-10 opacity-[0.05] bg-[linear-gradient(to_right,#ffffff22_1px,transparent_1px),linear-gradient(to_bottom,#ffffff22_1px,transparent_1px)] bg-[size:50px_50px]" />

      {/* NAVBAR */}
      <nav className="sticky top-0 z-50 border-b border-white/10 bg-black/40 backdrop-blur-2xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          {/* LOGO */}
          <Link href="/" className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-r from-cyan-400 to-blue-600 shadow-lg shadow-cyan-500/30">
              <Briefcase className="text-black" />
            </div>

            <div>
              <h1 className="text-2xl font-black tracking-tight">
                TrustHire
              </h1>

              <p className="text-xs text-zinc-500">
                Trust Based Hiring
              </p>
            </div>
          </Link>

          {/* LINKS */}
          <div className="hidden items-center gap-10 text-sm text-zinc-300 md:flex">
            <Link
              href="/features"
              className="transition hover:text-cyan-400"
            >
              Features
            </Link>

            <Link
              href="/about"
              className="transition hover:text-cyan-400"
            >
              About
            </Link>

            <Link
              href="/referrals"
              className="transition hover:text-cyan-400"
            >
              Referrals
            </Link>

            <Link
              href="/pricing"
              className="transition hover:text-cyan-400"
            >
              Pricing
            </Link>
          </div>

          {/* BUTTONS */}
          <div className="flex items-center gap-4">
            <Link
              href="/login"
              className="rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-zinc-300 backdrop-blur-xl transition hover:bg-white/10 hover:text-white"
            >
              Login
            </Link>

            <Link
              href="/register"
              className="rounded-2xl bg-gradient-to-r from-cyan-400 to-blue-600 px-6 py-3 font-semibold text-black shadow-lg shadow-cyan-500/20 transition hover:scale-105"
            >
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section className="relative px-6 pb-24 pt-24">
        <div className="mx-auto grid max-w-7xl items-center gap-20 lg:grid-cols-2">
          {/* LEFT */}
          <motion.div
            initial={{
              opacity: 0,
              y: 40,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.8,
            }}
          >
            {/* BADGE */}
            <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-5 py-2 text-sm text-cyan-300">
              <Sparkles size={16} />

              Next Generation Hiring Platform
            </div>

            {/* TITLE */}
            <h1 className="text-5xl font-black leading-[1.1] md:text-7xl">
              Hiring Built
              <br />

              <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
                On Trust
              </span>

              <br />
              Not Noise.
            </h1>

            {/* DESC */}
            <p className="mt-8 max-w-2xl text-lg leading-relaxed text-zinc-400 md:text-xl">
              TrustHire connects professionals through verified referrals,
              trusted communities, and meaningful career relationships.
            </p>

            {/* CTA */}
            <div className="mt-10 flex flex-col gap-5 sm:flex-row">
              <Link
                href="/register"
                className="flex items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-cyan-400 to-blue-600 px-8 py-4 font-semibold text-black shadow-2xl shadow-cyan-500/20 transition hover:scale-105"
              >
                Start Building Network

                <ArrowRight size={18} />
              </Link>

              <Link
                href="/about"
                className="rounded-2xl border border-white/10 bg-white/5 px-8 py-4 text-center backdrop-blur-xl transition hover:bg-white/10"
              >
                Learn More
              </Link>
            </div>

            {/* TRUST */}
            <div className="mt-12 flex flex-wrap items-center gap-6 text-sm text-zinc-400">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="text-cyan-400" size={18} />

                Verified Profiles
              </div>

              <div className="flex items-center gap-2">
                <Lock className="text-cyan-400" size={18} />

                Secure Authentication
              </div>

              <div className="flex items-center gap-2">
                <Globe className="text-cyan-400" size={18} />

                Global Opportunities
              </div>
            </div>
          </motion.div>

          {/* RIGHT CARD */}
          <motion.div
            initial={{
              opacity: 0,
              scale: 0.9,
            }}
            animate={{
              opacity: 1,
              scale: 1,
            }}
            transition={{
              duration: 0.8,
            }}
            className="relative"
          >
            <div className="absolute -inset-1 rounded-[40px] bg-gradient-to-r from-cyan-400 to-blue-600 opacity-30 blur-2xl" />

            <div className="relative rounded-[40px] border border-white/10 bg-white/5 p-8 backdrop-blur-2xl">
              <div className="flex items-center justify-between border-b border-white/10 pb-6">
                <div>
                  <p className="text-sm text-zinc-400">
                    Trust Score
                  </p>

                  <h2 className="mt-2 text-5xl font-black text-cyan-400">
                    98%
                  </h2>
                </div>

                <div className="rounded-2xl bg-cyan-400/10 p-4">
                  <ShieldCheck
                    className="text-cyan-400"
                    size={42}
                  />
                </div>
              </div>

              <div className="mt-8 space-y-5">
                {[
                  "Verified Recruiters",
                  "Referral Matching",
                  "Real Professional Network",
                  "AI Smart Recommendations",
                ].map((item, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between rounded-2xl border border-white/10 bg-black/30 p-5"
                  >
                    <div className="flex items-center gap-3">
                      <CheckCircle2
                        className="text-cyan-400"
                        size={20}
                      />

                      <span>{item}</span>
                    </div>

                    <ChevronRight
                      className="text-zinc-500"
                      size={18}
                    />
                  </div>
                ))}
              </div>

              <div className="mt-8 rounded-3xl bg-gradient-to-r from-cyan-400 to-blue-600 p-[1px]">
                <div className="rounded-3xl bg-black p-6">
                  <p className="text-sm text-zinc-400">
                    Weekly Referral Growth
                  </p>

                  <h3 className="mt-2 text-4xl font-black">
                    +247%
                  </h3>

                  <p className="mt-2 text-sm text-zinc-500">
                    Fastest growing trust-based hiring platform
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* STATS */}
      <section className="px-6 py-20">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 md:grid-cols-4">
          {stats.map((item, index) => (
            <motion.div
              key={index}
              whileHover={{
                y: -8,
              }}
              className="rounded-3xl border border-white/10 bg-white/5 p-8 text-center backdrop-blur-xl"
            >
              <h2 className="text-5xl font-black text-cyan-400">
                {item.value}
              </h2>

              <p className="mt-3 text-zinc-400">
                {item.label}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* FEATURES */}
      <section className="px-6 py-24">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <p className="font-semibold uppercase tracking-[0.3em] text-cyan-400">
              FEATURES
            </p>

            <h2 className="mt-5 text-5xl font-black">
              Built For Modern Professionals
            </h2>

            <p className="mx-auto mt-6 max-w-3xl text-lg text-zinc-400">
              Stop wasting time on low quality networking.
              Build trusted career connections that matter.
            </p>
          </div>

          <div className="mt-20 grid gap-8 md:grid-cols-3">
            {features.map((item, index) => (
              <motion.div
                key={index}
                whileHover={{
                  y: -10,
                  scale: 1.02,
                }}
                className="group rounded-[32px] border border-white/10 bg-white/5 p-8 backdrop-blur-2xl transition hover:border-cyan-400/30"
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-cyan-400/10 transition group-hover:scale-110">
                  <item.icon
                    className="text-cyan-400"
                    size={32}
                  />
                </div>

                <h3 className="mt-8 text-2xl font-bold">
                  {item.title}
                </h3>

                <p className="mt-5 leading-relaxed text-zinc-400">
                  {item.desc}
                </p>

                <Link
                  href="/features"
                  className="mt-8 inline-flex items-center gap-2 text-cyan-400 transition hover:gap-4"
                >
                  Explore Feature

                  <ArrowRight size={18} />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="px-6 py-24">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <h2 className="text-5xl font-black">
              Loved By Professionals
            </h2>

            <p className="mt-6 text-zinc-400">
              Real feedback from real users.
            </p>
          </div>

          <div className="mt-20 grid gap-8 md:grid-cols-3">
            {testimonials.map((item, index) => (
              <motion.div
                key={index}
                whileHover={{
                  y: -6,
                }}
                className="rounded-[32px] border border-white/10 bg-white/5 p-8 backdrop-blur-2xl"
              >
                <div className="mb-6 flex gap-1 text-cyan-400">
                  <Star fill="currentColor" size={18} />
                  <Star fill="currentColor" size={18} />
                  <Star fill="currentColor" size={18} />
                  <Star fill="currentColor" size={18} />
                  <Star fill="currentColor" size={18} />
                </div>

                <p className="leading-relaxed text-zinc-300">
                  "{item.text}"
                </p>

                <div className="mt-8">
                  <h4 className="font-bold">
                    {item.name}
                  </h4>

                  <p className="text-sm text-zinc-500">
                    {item.role}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="px-6 pb-28 pt-10">
        <div className="mx-auto max-w-6xl rounded-[40px] border border-white/10 bg-gradient-to-r from-cyan-500/10 to-blue-600/10 p-12 text-center backdrop-blur-2xl md:p-20">
          <h2 className="text-5xl font-black leading-tight md:text-6xl">
            Ready To Build
            <br />
            Your Trust Network?
          </h2>

          <p className="mx-auto mt-8 max-w-2xl text-lg text-zinc-400">
            Join the next generation hiring platform where trust,
            referrals, and real opportunities matter.
          </p>

          <div className="mt-12 flex flex-col items-center justify-center gap-5 sm:flex-row">
            <Link
              href="/register"
              className="rounded-2xl bg-gradient-to-r from-cyan-400 to-blue-600 px-8 py-4 font-semibold text-black transition hover:scale-105"
            >
              Create Free Account
            </Link>

            <Link
              href="/about"
              className="rounded-2xl border border-white/10 bg-white/5 px-8 py-4 transition hover:bg-white/10"
            >
              Learn More
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}