"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

import {
  ArrowUpRight,
  Briefcase,
  Building2,
  CalendarDays,
  CheckCircle2,
  ChevronRight,
  Clock3,
  FileText,
  Loader2,
  MapPin,
  Search,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  XCircle,
  BrainCircuit,
  Eye,
  Target,
} from "lucide-react";

export default function MyApplicationsPage() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // =========================================
  // FETCH APPLICATIONS
  // =========================================
  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await fetch(
          "http://localhost:5000/api/applications/my-applications",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();

        if (data.success) {
          setApplications(data.applications || []);
        } else {
          setError(data.message || "Failed to load applications");
        }
      } catch (err) {
        console.log(err);
        setError("Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, []);

  // =========================================
  // ANALYTICS
  // =========================================
  const stats = useMemo(() => {
    const interviews = applications.filter(
      (a) => a.status?.toLowerCase() === "interview"
    ).length;

    const accepted = applications.filter(
      (a) => a.status?.toLowerCase() === "accepted"
    ).length;

    const rejected = applications.filter(
      (a) => a.status?.toLowerCase() === "rejected"
    ).length;

    return {
      total: applications.length,
      interviews,
      accepted,
      rejected,
    };
  }, [applications]);

  // =========================================
  // STATUS STYLES
  // =========================================
  const getStatusStyles = (status) => {
    switch (status?.toLowerCase()) {
      case "accepted":
        return "bg-green-500/10 text-green-400 border-green-500/20";

      case "rejected":
        return "bg-red-500/10 text-red-400 border-red-500/20";

      case "interview":
        return "bg-purple-500/10 text-purple-400 border-purple-500/20";

      default:
        return "bg-cyan-500/10 text-cyan-400 border-cyan-500/20";
    }
  };

  // =========================================
  // LOADING
  // =========================================
  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-black text-white">
        <div className="flex flex-col items-center gap-5">
          <Loader2
            size={50}
            className="animate-spin text-cyan-400"
          />

          <p className="text-zinc-400 text-lg">
            Loading your career dashboard...
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-black px-6 py-10 text-white">

      {/* BACKGROUND */}
      <div className="absolute inset-0 -z-10">

        <div className="absolute left-[5%] top-[5%] h-[400px] w-[400px] rounded-full bg-cyan-500/20 blur-[120px]" />

        <div className="absolute bottom-[10%] right-[5%] h-[500px] w-[500px] rounded-full bg-purple-600/20 blur-[140px]" />

        <div className="absolute inset-0 opacity-[0.05] bg-[linear-gradient(to_right,#ffffff22_1px,transparent_1px),linear-gradient(to_bottom,#ffffff22_1px,transparent_1px)] bg-[size:45px_45px]" />

      </div>

      <div className="mx-auto max-w-7xl">

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
          className="mb-10 overflow-hidden rounded-[40px] border border-white/10 bg-white/5 p-10 backdrop-blur-2xl"
        >

          <div className="flex flex-col gap-10 lg:flex-row lg:items-center lg:justify-between">

            <div>

              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-cyan-500/20 bg-cyan-500/10 px-4 py-2 text-sm text-cyan-400">

                <Sparkles size={16} />

                TrustHire Career Dashboard

              </div>

              <h1 className="text-5xl font-black leading-tight md:text-6xl">

                Welcome Back,
                <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
                  {" "}
                  Future Engineer
                </span>

              </h1>

              <p className="mt-5 max-w-2xl text-lg leading-relaxed text-zinc-400">

                Track applications, recruiter activity,
                interviews, referrals, and career growth
                in one intelligent dashboard.

              </p>

            </div>

            <div className="grid grid-cols-2 gap-4">

              {[
                {
                  title: "Applications",
                  value: stats.total,
                  icon: FileText,
                },

                {
                  title: "Interviews",
                  value: stats.interviews,
                  icon: CalendarDays,
                },

                {
                  title: "Offers",
                  value: stats.accepted,
                  icon: CheckCircle2,
                },

                {
                  title: "Profile Score",
                  value: "89%",
                  icon: TrendingUp,
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className="rounded-3xl border border-white/10 bg-black/30 p-6"
                >

                  <div className="flex items-center justify-between">

                    <item.icon
                      className="text-cyan-400"
                      size={24}
                    />

                    <span className="rounded-full bg-green-500/10 px-3 py-1 text-xs text-green-400">
                      +12%
                    </span>

                  </div>

                  <h2 className="mt-6 text-4xl font-black">
                    {item.value}
                  </h2>

                  <p className="mt-2 text-zinc-400">
                    {item.title}
                  </p>

                </div>
              ))}

            </div>

          </div>

        </motion.div>

        {/* AI INSIGHTS */}
        <div className="mb-10 grid gap-6 lg:grid-cols-3">

          {[
            {
              title: "Resume Strength",
              value: "82%",
              icon: BrainCircuit,
              description:
                "Your resume performs better than 78% of candidates.",
            },

            {
              title: "Recruiter Activity",
              value: "14 Views",
              icon: Eye,
              description:
                "Recruiters actively reviewed your profile this week.",
            },

            {
              title: "ATS Match",
              value: "91%",
              icon: Target,
              description:
                "Your skills match high-demand developer roles.",
            },
          ].map((card, index) => (
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
                delay: index * 0.1,
              }}
              className="rounded-[32px] border border-white/10 bg-white/5 p-8 backdrop-blur-2xl"
            >

              <div className="flex items-center justify-between">

                <div className="rounded-2xl bg-cyan-500/10 p-4">

                  <card.icon
                    className="text-cyan-400"
                    size={26}
                  />

                </div>

                <span className="text-sm text-green-400">
                  Active
                </span>

              </div>

              <h2 className="mt-8 text-4xl font-black">
                {card.value}
              </h2>

              <p className="mt-2 text-lg font-semibold">
                {card.title}
              </p>

              <p className="mt-3 text-sm leading-relaxed text-zinc-400">
                {card.description}
              </p>

            </motion.div>
          ))}

        </div>

        {/* ERROR */}
        {error && (
          <div className="mb-8 rounded-3xl border border-red-500/20 bg-red-500/10 px-6 py-5 text-red-400">
            {error}
          </div>
        )}

        {/* EMPTY */}
        {applications.length === 0 ? (
          <motion.div
            initial={{
              opacity: 0,
              scale: 0.95,
            }}
            animate={{
              opacity: 1,
              scale: 1,
            }}
            className="rounded-[40px] border border-white/10 bg-white/5 p-16 text-center backdrop-blur-2xl"
          >

            <div className="mx-auto flex h-28 w-28 items-center justify-center rounded-full bg-gradient-to-r from-cyan-400 to-purple-600">

              <Briefcase
                size={50}
                className="text-black"
              />

            </div>

            <h2 className="mt-10 text-5xl font-black">
              No Applications Yet
            </h2>

            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-zinc-400">

              Start applying for jobs, internships,
              and referrals to build your career journey.

            </p>

            <Link
              href="/jobs"
              className="mt-10 inline-flex items-center gap-3 rounded-2xl bg-gradient-to-r from-cyan-400 to-purple-600 px-8 py-5 font-bold text-black transition hover:scale-105"
            >

              <Search size={20} />

              Explore Opportunities

            </Link>

          </motion.div>
        ) : (
          <>
            {/* SECTION HEADER */}
            <div className="mb-8 flex items-center justify-between">

              <div>

                <h2 className="text-4xl font-black">
                  Application Pipeline
                </h2>

                <p className="mt-2 text-zinc-400">
                  Monitor your complete hiring journey.
                </p>

              </div>

              <Link
                href="/jobs"
                className="flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-5 py-3 transition hover:bg-white/10"
              >

                Browse Jobs

                <ArrowUpRight size={18} />

              </Link>

            </div>

            {/* APPLICATIONS */}
            <div className="grid gap-8 lg:grid-cols-2">

              {applications.map((application, index) => {
                const job = application.job;

                return (
                  <motion.div
                    key={application._id}
                    initial={{
                      opacity: 0,
                      y: 20,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                    transition={{
                      delay: index * 0.08,
                    }}
                    whileHover={{
                      y: -5,
                    }}
                    className="group overflow-hidden rounded-[36px] border border-white/10 bg-white/5 p-8 backdrop-blur-2xl transition hover:border-cyan-400/30"
                  >

                    {/* TOP */}
                    <div className="flex items-start justify-between gap-5">

                      <div>

                        <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-r from-cyan-400 to-blue-600 shadow-lg shadow-cyan-500/20">

                          <Building2
                            className="text-black"
                            size={28}
                          />

                        </div>

                        <h2 className="text-3xl font-black leading-tight">

                          {job?.title}

                        </h2>

                        <p className="mt-2 text-lg text-cyan-400">

                          {job?.company}

                        </p>

                      </div>

                      <div
                        className={`rounded-full border px-4 py-2 text-sm font-medium ${getStatusStyles(
                          application.status
                        )}`}
                      >

                        {application.status}

                      </div>

                    </div>

                    {/* DETAILS */}
                    <div className="mt-8 space-y-4">

                      <div className="flex items-center gap-3 text-zinc-400">

                        <MapPin size={18} />

                        <span>
                          {job?.location || "Remote"}
                        </span>

                      </div>

                      <div className="flex items-center gap-3 text-zinc-400">

                        <Clock3 size={18} />

                        <span>
                          Applied Recently
                        </span>

                      </div>

                    </div>

                    {/* SKILLS */}
                    <div className="mt-8 flex flex-wrap gap-3">

                      {job?.skills?.map((skill, i) => (
                        <span
                          key={i}
                          className="rounded-full border border-white/10 bg-black/20 px-4 py-2 text-sm text-zinc-300"
                        >

                          {skill}

                        </span>
                      ))}

                    </div>

                    {/* INSIGHTS */}
                    <div className="mt-8 rounded-3xl border border-cyan-500/10 bg-cyan-500/[0.04] p-5">

                      <div className="flex items-center gap-3">

                        <ShieldCheck
                          className="text-cyan-400"
                          size={20}
                        />

                        <p className="text-sm text-zinc-300">

                          Recruiters are actively reviewing
                          your profile for this role.

                        </p>

                      </div>

                    </div>

                    {/* ACTIONS */}
                    <div className="mt-8 flex flex-wrap gap-4">

                      <Link
                        href={`/jobs/${job?._id}`}
                        className="flex items-center gap-2 rounded-2xl bg-gradient-to-r from-cyan-400 to-purple-600 px-6 py-4 font-semibold text-black transition hover:scale-105"
                      >

                        View Job

                        <ChevronRight size={18} />

                      </Link>

                      <button className="rounded-2xl border border-white/10 bg-white/5 px-6 py-4 transition hover:bg-white/10">

                        Track Status

                      </button>

                    </div>

                  </motion.div>
                );
              })}

            </div>
          </>
        )}

      </div>

    </main>
  );
}