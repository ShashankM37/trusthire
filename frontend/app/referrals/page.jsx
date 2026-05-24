"use client";

import { useEffect, useState } from "react";

import Link from "next/link";

import { motion } from "framer-motion";

import Navbar from "../components/Navbar";

import {
  Users,
  Search,
  Sparkles,
  ShieldCheck,
  Building2,
  Star,
  Globe,
  MapPin,
  Send,
  MessageSquare,
  TrendingUp,
  Loader2,
  ChevronRight,
} from "lucide-react";

export default function ReferralsPage() {

  const [loading, setLoading] =
    useState(true);

  const [referrals, setReferrals] =
    useState([]);

  const [search, setSearch] =
    useState("");

  const [selectedCompany, setSelectedCompany] =
    useState("All");

  // =========================
  // MOCK DATA
  // =========================
  useEffect(() => {

    setTimeout(() => {

      setReferrals([
        {
          _id: 1,
          name: "Aarav Sharma",
          role: "Senior Frontend Engineer",
          company: "Google",
          location: "Bangalore, India",
          skills: [
            "React",
            "Next.js",
            "TypeScript",
          ],
          referrals: 24,
          verified: true,
        },

        {
          _id: 2,
          name: "Priya Mehta",
          role: "SDE 2",
          company: "Amazon",
          location: "Hyderabad, India",
          skills: [
            "Node.js",
            "MongoDB",
            "AWS",
          ],
          referrals: 18,
          verified: true,
        },

        {
          _id: 3,
          name: "Rahul Verma",
          role: "Software Engineer",
          company: "Microsoft",
          location: "Remote",
          skills: [
            "Java",
            "Spring Boot",
            "Azure",
          ],
          referrals: 31,
          verified: true,
        },

        {
          _id: 4,
          name: "Sneha Kapoor",
          role: "Product Designer",
          company: "Adobe",
          location: "Mumbai, India",
          skills: [
            "Figma",
            "UI/UX",
            "Design Systems",
          ],
          referrals: 12,
          verified: true,
        },
      ]);

      setLoading(false);

    }, 1200);

  }, []);

  // =========================
  // FILTERS
  // =========================
  const filteredReferrals =
    referrals.filter((item) => {

      const matchesSearch =
        item.name
          .toLowerCase()
          .includes(
            search.toLowerCase()
          ) ||
        item.company
          .toLowerCase()
          .includes(
            search.toLowerCase()
          ) ||
        item.role
          .toLowerCase()
          .includes(
            search.toLowerCase()
          );

      const matchesCompany =
        selectedCompany === "All"
          ? true
          : item.company ===
            selectedCompany;

      return (
        matchesSearch &&
        matchesCompany
      );

    });

  // =========================
  // LOADING
  // =========================
  if (loading) {

    return (
      <>
        <Navbar />

        <main className="flex min-h-screen items-center justify-center bg-black text-white">

          <div className="flex flex-col items-center gap-5">

            <Loader2
              className="animate-spin text-cyan-400"
              size={50}
            />

            <p className="text-xl text-zinc-400">
              Loading referrals...
            </p>

          </div>

        </main>
      </>
    );
  }

  return (

    <>
      <Navbar />

      <main className="relative min-h-screen overflow-hidden bg-black text-white">

        {/* BACKGROUND */}
        <div className="absolute inset-0 -z-10">

          <div className="absolute left-[5%] top-[5%] h-[450px] w-[450px] rounded-full bg-cyan-500/20 blur-[120px]" />

          <div className="absolute bottom-[5%] right-[5%] h-[500px] w-[500px] rounded-full bg-purple-600/20 blur-[140px]" />

          <div className="absolute left-[40%] top-[40%] h-[300px] w-[300px] rounded-full bg-blue-500/10 blur-[120px]" />

        </div>

        {/* GRID */}
        <div className="absolute inset-0 -z-10 opacity-[0.05] bg-[linear-gradient(to_right,#ffffff22_1px,transparent_1px),linear-gradient(to_bottom,#ffffff22_1px,transparent_1px)] bg-[size:45px_45px]" />

        <div className="relative z-10 mx-auto max-w-7xl px-6 py-14">

          {/* HERO */}
          <motion.div
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            className="mb-14"
          >

            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-cyan-500/20 bg-cyan-500/10 px-5 py-2 text-sm text-cyan-400">

              <Sparkles size={16} />

              Trusted Referral Network

            </div>

            <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">

              <div>

                <h1 className="text-5xl font-black leading-tight md:text-6xl">

                  Discover Trusted
                  <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
                    {" "}
                    Referrals
                  </span>

                </h1>

                <p className="mt-6 max-w-3xl text-lg leading-relaxed text-zinc-400">

                  Connect with verified professionals
                  from top companies and unlock
                  career opportunities through trust.

                </p>

              </div>

              {/* CTA */}
              <button className="flex items-center gap-3 rounded-2xl bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 px-8 py-5 font-bold text-black transition hover:scale-105">

                <Send size={20} />

                Request Referral

              </button>

            </div>

          </motion.div>

          {/* STATS */}
          <div className="mb-12 grid gap-6 md:grid-cols-4">

            {[
              {
                title:
                  "Verified Referrers",
                value:
                  "1.2K+",
                icon:
                  ShieldCheck,
              },

              {
                title:
                  "Companies",
                value:
                  "120+",
                icon:
                  Building2,
              },

              {
                title:
                  "Successful Referrals",
                value:
                  "8.5K+",
                icon:
                  TrendingUp,
              },

              {
                title:
                  "Global Reach",
                value:
                  "42 Countries",
                icon:
                  Globe,
              },
            ].map(
              (
                item,
                index
              ) => (

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
                    delay:
                      index * 0.1,
                  }}
                  className="rounded-[32px] border border-white/10 bg-white/5 p-8 backdrop-blur-2xl"
                >

                  <div className="flex items-center justify-between">

                    <div className="rounded-2xl bg-cyan-500/10 p-4">

                      <item.icon
                        className="text-cyan-400"
                        size={26}
                      />

                    </div>

                    <div className="rounded-full bg-green-500/10 px-3 py-1 text-sm text-green-400">

                      +12%

                    </div>

                  </div>

                  <h2 className="mt-8 text-5xl font-black">
                    {item.value}
                  </h2>

                  <p className="mt-3 text-zinc-400">
                    {item.title}
                  </p>

                </motion.div>

              )
            )}

          </div>

          {/* SEARCH */}
          <div className="mb-12 rounded-[36px] border border-white/10 bg-white/5 p-6 backdrop-blur-2xl">

            <div className="flex flex-col gap-5 lg:flex-row">

              {/* SEARCH */}
              <div className="flex flex-1 items-center rounded-2xl border border-white/10 bg-black/30 px-5 focus-within:border-cyan-400">

                <Search
                  className="text-zinc-500"
                  size={20}
                />

                <input
                  type="text"
                  placeholder="Search by company, role, or professional..."
                  value={search}
                  onChange={(e) =>
                    setSearch(
                      e.target.value
                    )
                  }
                  className="w-full bg-transparent px-4 py-5 outline-none placeholder:text-zinc-500"
                />

              </div>

              {/* FILTER */}
              <select
                value={selectedCompany}
                onChange={(e) =>
                  setSelectedCompany(
                    e.target.value
                  )
                }
                className="rounded-2xl border border-white/10 bg-black/30 px-5 py-5 outline-none focus:border-cyan-400"
              >

                <option value="All">
                  All Companies
                </option>

                <option value="Google">
                  Google
                </option>

                <option value="Amazon">
                  Amazon
                </option>

                <option value="Microsoft">
                  Microsoft
                </option>

                <option value="Adobe">
                  Adobe
                </option>

              </select>

            </div>

          </div>

          {/* REFERRAL GRID */}
          <div className="grid gap-8 lg:grid-cols-2">

            {filteredReferrals.map(
              (
                referral,
                index
              ) => (

                <motion.div
                  key={referral._id}
                  initial={{
                    opacity: 0,
                    y: 20,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    delay:
                      index * 0.08,
                  }}
                  whileHover={{
                    y: -5,
                  }}
                  className="group overflow-hidden rounded-[36px] border border-white/10 bg-white/5 p-8 backdrop-blur-2xl transition hover:border-cyan-400/30"
                >

                  <div className="flex items-start justify-between gap-5">

                    <div className="flex items-center gap-5">

                      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-r from-cyan-400 to-purple-600 text-3xl font-black shadow-2xl shadow-cyan-500/20">

                        {referral.name.charAt(
                          0
                        )}

                      </div>

                      <div>

                        <div className="flex items-center gap-3">

                          <h2 className="text-2xl font-black">

                            {referral.name}

                          </h2>

                          {referral.verified && (

                            <ShieldCheck
                              className="text-cyan-400"
                              size={20}
                            />

                          )}

                        </div>

                        <p className="mt-2 text-lg text-cyan-400">

                          {referral.role}

                        </p>

                        <div className="mt-3 flex items-center gap-2 text-zinc-400">

                          <Building2
                            size={16}
                          />

                          {referral.company}

                        </div>

                      </div>

                    </div>

                    <div className="flex items-center gap-2 rounded-full bg-yellow-500/10 px-4 py-2 text-yellow-400">

                      <Star
                        fill="currentColor"
                        size={16}
                      />

                      4.9

                    </div>

                  </div>

                  <div className="mt-8 flex items-center gap-3 text-zinc-400">

                    <MapPin size={18} />

                    <span>
                      {referral.location}
                    </span>

                  </div>

                  <div className="mt-8 flex flex-wrap gap-3">

                    {referral.skills.map(
                      (
                        skill,
                        skillIndex
                      ) => (

                        <span
                          key={skillIndex}
                          className="rounded-full border border-white/10 bg-black/20 px-4 py-2 text-sm text-zinc-300"
                        >

                          {skill}

                        </span>

                      )
                    )}

                  </div>

                  <div className="mt-8 rounded-3xl border border-cyan-500/10 bg-cyan-500/[0.04] p-5">

                    <div className="flex items-center justify-between">

                      <div className="flex items-center gap-3">

                        <Users
                          className="text-cyan-400"
                          size={20}
                        />

                        <p className="text-sm text-zinc-300">

                          {referral.referrals}
                          {" "}
                          successful referrals

                        </p>

                      </div>

                      <div className="rounded-full bg-green-500/10 px-3 py-1 text-sm text-green-400">

                        Active

                      </div>

                    </div>

                  </div>

                  <div className="mt-8 flex flex-wrap gap-4">

                    <button className="flex items-center gap-2 rounded-2xl bg-gradient-to-r from-cyan-400 to-purple-600 px-6 py-4 font-semibold text-black transition hover:scale-105">

                      <Send size={18} />

                      Request Referral

                    </button>

                    <Link
                      href={`/profile/${referral._id}`}
                      className="flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-6 py-4 transition hover:bg-white/10"
                    >

                      <MessageSquare
                        size={18}
                      />

                      View Profile

                      <ChevronRight
                        size={18}
                      />

                    </Link>

                  </div>

                </motion.div>

              )
            )}

          </div>

          {/* EMPTY */}
          {filteredReferrals.length ===
            0 && (

            <div className="rounded-[40px] border border-white/10 bg-white/5 p-16 text-center backdrop-blur-2xl">

              <div className="mx-auto flex h-28 w-28 items-center justify-center rounded-full bg-gradient-to-r from-cyan-400 to-purple-600 shadow-2xl shadow-cyan-500/20">

                <Users
                  className="text-black"
                  size={48}
                />

              </div>

              <h2 className="mt-10 text-5xl font-black">

                No Referrals Found

              </h2>

              <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-zinc-400">

                Try adjusting filters or search
                terms to discover more trusted
                professionals.

              </p>

            </div>

          )}

        </div>

      </main>
    </>
  );
}