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
      title: "Verified Referrers",
      desc: "Candidates connect with employees who can actually review, respond, and refer.",
    },
    {
      icon: Users,
      title: "Structured Requests",
      desc: "Every ask includes the role, company, context, and candidate intent.",
    },
    {
      icon: TrendingUp,
      title: "Status Visibility",
      desc: "Both sides can track whether a request is pending, accepted, in progress, or referred.",
    },
  ];

  const stats = [
    {
      value: "12K+",
      label: "Candidate Profiles",
    },
    {
      value: "3.2K+",
      label: "Successful Referrals",
    },
    {
      value: "150+",
      label: "Company Networks",
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
      text: "TrustHire made referrals feel structured. I knew who I asked, what stage it was in, and what happened next.",
    },
    {
      name: "Priya Mehta",
      role: "Employee Referrer",
      text: "The request format helps me quickly understand whether I can confidently refer someone.",
    },
    {
      name: "Rahul Verma",
      role: "Frontend Developer",
      text: "It feels built for real referrals, not random messages and ignored applications.",
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
                Referral Hiring OS
              </p>
            </div>
          </Link>

          {/* LINKS */}
          <div className="hidden items-center gap-10 text-sm text-zinc-300 md:flex">
            <Link
              href="/candidate-account"
              className="transition hover:text-cyan-400"
            >
              Candidates
            </Link>

            <Link
              href="/employee-account"
              className="transition hover:text-cyan-400"
            >
              Referrers
            </Link>

            <Link
              href="/status-update"
              className="transition hover:text-cyan-400"
            >
              Tracking
            </Link>

            <Link
              href="/send-referral-request"
              className="transition hover:text-cyan-400"
            >
              Request
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

              Referral infrastructure for early talent
            </div>

            {/* TITLE */}
            <h1 className="text-5xl font-black leading-[1.1] md:text-7xl">
              Referrals Built
              <br />

              <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
              With Proof
              </span>

              <br />
              Not Spam.
            </h1>

            {/* DESC */}
            <p className="mt-8 max-w-2xl text-lg leading-relaxed text-zinc-400 md:text-xl">
              TrustHire is a referral operating system where candidates request
              referrals from verified employees, referrers manage requests, and
              every status stays visible from first ask to final outcome.
            </p>

            {/* CTA */}
            <div className="mt-10 flex flex-col gap-5 sm:flex-row">
              <Link
                href="/register"
                className="flex items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-cyan-400 to-blue-600 px-8 py-4 font-semibold text-black shadow-2xl shadow-cyan-500/20 transition hover:scale-105"
              >
                Start Referral Flow

                <ArrowRight size={18} />
              </Link>

              <Link
                href="/candidate-account"
                className="rounded-2xl border border-white/10 bg-white/5 px-8 py-4 text-center backdrop-blur-xl transition hover:bg-white/10"
              >
                Explore Product
              </Link>
            </div>

            {/* TRUST */}
            <div className="mt-12 flex flex-wrap items-center gap-6 text-sm text-zinc-400">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="text-cyan-400" size={18} />

                Verified Referrers
              </div>

              <div className="flex items-center gap-2">
                <Lock className="text-cyan-400" size={18} />

                Structured Requests
              </div>

              <div className="flex items-center gap-2">
                <Globe className="text-cyan-400" size={18} />

                Live Status Tracking
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
                    "Candidate Profiles",
                    "Employee Request Inbox",
                    "Referral Status Pipeline",
                    "Trust-Based Hiring Signals",
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
                    Referral Pipeline Growth
                  </p>

                  <h3 className="mt-2 text-4xl font-black">
                    +247%
                  </h3>

                  <p className="mt-2 text-sm text-zinc-500">
                    Built for campuses, candidates, and employee-led hiring
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
              Built For The Referral Loop
            </h2>

            <p className="mx-auto mt-6 max-w-3xl text-lg text-zinc-400">
              Turn cold applications into structured referral conversations
              with accountability on both sides.
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
                  href="/candidate-account"
                  className="mt-8 inline-flex items-center gap-2 text-cyan-400 transition hover:gap-4"
                >
                  Explore Workflow

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
              Built Around Trust
            </h2>

            <p className="mt-6 text-zinc-400">
              A cleaner referral journey for candidates and referrers.
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
                  &ldquo;{item.text}&rdquo;
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
            Ready To Run
            <br />
            Referral-First Hiring?
          </h2>

          <p className="mx-auto mt-8 max-w-2xl text-lg text-zinc-400">
            Start with candidates, referrers, referral requests, and status
            tracking. Add recruiters and college teams as the network grows.
          </p>

          <div className="mt-12 flex flex-col items-center justify-center gap-5 sm:flex-row">
            <Link
              href="/register"
              className="rounded-2xl bg-gradient-to-r from-cyan-400 to-blue-600 px-8 py-4 font-semibold text-black transition hover:scale-105"
            >
              Create Account
            </Link>

            <Link
              href="/employee-account"
              className="rounded-2xl border border-white/10 bg-white/5 px-8 py-4 transition hover:bg-white/10"
            >
              For Referrers
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
