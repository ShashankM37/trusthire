"use client";

import { useEffect, useState } from "react";

import { useRouter } from "next/navigation";

import Link from "next/link";

import { motion } from "framer-motion";

import Navbar from "../components/Navbar";

import {
  LayoutDashboard,
  User,
  FileText,
  Briefcase,
  Bell,
  LogOut,
  ChevronRight,
  TrendingUp,
  Users,
  ShieldCheck,
  Sparkles,
  Search,
  CheckCircle2,
  Clock3,
  Star,
  Plus,
  ArrowUpRight,
  Settings,
  Building2,
} from "lucide-react";

export default function DashboardPage() {

  const router = useRouter();

  const [user, setUser] =
    useState(null);

  useEffect(() => {

    const token =
      localStorage.getItem("token");

    const storedUser =
      localStorage.getItem("user");

    if (!token) {

      router.push("/login");

    } else {

      setUser(
        JSON.parse(storedUser)
      );

    }

  }, [router]);

  // =========================
  // LOGOUT
  // =========================
  const handleLogout = () => {

    localStorage.removeItem("token");

    localStorage.removeItem("user");

    router.push("/login");

  };

  if (!user) {

    return (
      <main className="flex min-h-screen items-center justify-center bg-black text-white">
        Loading...
      </main>
    );

  }

  // =========================
  // DASHBOARD CARDS
  // =========================
  const stats = [
    {
      title: "Applications",
      value: "128",
      icon: FileText,
      growth: "+12%",
    },

    {
      title: "Referrals",
      value: "24",
      icon: Users,
      growth: "+18%",
    },

    {
      title: "Interviews",
      value: "16",
      icon: Briefcase,
      growth: "+9%",
    },

    {
      title: "Profile Score",
      value: "89%",
      icon: ShieldCheck,
      growth: "+5%",
    },
  ];

  // =========================
  // QUICK ACTIONS
  // =========================
  const quickActions = [
    {
      title: "My Profile",
      href: "/profile",
      icon: User,
    },

    {
      title: "Browse Jobs",
      href: "/jobs",
      icon: Search,
    },

    {
      title: "My Applications",
      href: "/my-applications",
      icon: FileText,
    },

    {
      title: "Referrals",
      href: "/referrals",
      icon: Users,
    },

    {
      title: "Notifications",
      href: "/notifications",
      icon: Bell,
    },

    {
      title: "Settings",
      href: "/settings",
      icon: Settings,
    },
  ];

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

      <div className="flex min-h-screen">

        {/* SIDEBAR */}
        <aside className="hidden w-[300px] border-r border-white/10 bg-white/[0.03] backdrop-blur-2xl xl:block">

          <div className="flex h-full flex-col p-8">

            {/* LOGO */}
            <div className="mb-12 flex items-center gap-4">

              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-r from-cyan-400 to-blue-600 shadow-lg shadow-cyan-500/20">

                <Briefcase className="text-black" />

              </div>

              <div>

                <h1 className="text-2xl font-black">
                  TrustHire
                </h1>

                <p className="text-sm text-zinc-500">
                  Startup Dashboard
                </p>

              </div>

            </div>

            {/* USER */}
            <div className="rounded-[32px] border border-white/10 bg-white/5 p-6">

              <div className="flex items-center gap-4">

                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-cyan-400 to-purple-600 text-2xl font-black">

                  {user?.name?.charAt(0)}

                </div>

                <div>

                  <h2 className="font-bold">
                    {user?.name}
                  </h2>

                  <p className="text-sm text-zinc-400">
                    {user?.role || "candidate"}
                  </p>

                </div>

              </div>

              <div className="mt-6 rounded-2xl bg-cyan-500/10 p-4">

                <div className="flex items-center justify-between">

                  <p className="text-sm text-zinc-300">
                    Profile Strength
                  </p>

                  <p className="font-bold text-cyan-400">
                    89%
                  </p>

                </div>

                <div className="mt-3 h-3 overflow-hidden rounded-full bg-black/30">

                  <div className="h-full w-[89%] rounded-full bg-gradient-to-r from-cyan-400 to-blue-600" />

                </div>

              </div>

            </div>

            {/* NAVIGATION */}
            <div className="mt-10 space-y-3">

              {quickActions.map((item, index) => (

                <Link
                  key={index}
                  href={item.href}
                  className="group flex items-center justify-between rounded-2xl border border-white/5 bg-white/[0.03] px-5 py-4 transition hover:border-cyan-400/30 hover:bg-cyan-500/[0.06]"
                >

                  <div className="flex items-center gap-4">

                    <div className="rounded-xl bg-white/5 p-3 transition group-hover:bg-cyan-500/10">

                      <item.icon
                        className="text-cyan-400"
                        size={20}
                      />

                    </div>

                    <span className="font-medium">
                      {item.title}
                    </span>

                  </div>

                  <ChevronRight
                    className="text-zinc-500"
                    size={18}
                  />

                </Link>

              ))}

            </div>

            {/* LOGOUT */}
            <button
              onClick={handleLogout}
              className="mt-auto flex items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-red-500 to-pink-500 px-6 py-4 font-semibold transition hover:scale-[1.02]"
            >

              <LogOut size={18} />

              Logout

            </button>

          </div>

        </aside>

        {/* MAIN CONTENT */}
        <section className="flex-1 p-6 md:p-10">

          {/* TOPBAR */}
          <motion.div
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            className="mb-10 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between"
          >

            <div>

              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-cyan-500/20 bg-cyan-500/10 px-5 py-2 text-sm text-cyan-400">

                <Sparkles size={16} />

                Welcome Back

              </div>

              <h1 className="text-5xl font-black leading-tight">

                Dashboard
                <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
                  {" "}
                  Overview
                </span>

              </h1>

              <p className="mt-4 max-w-2xl text-lg text-zinc-400">

                Track referrals, applications,
                recruiter activity, and career growth.

              </p>

            </div>

            {/* ACTION BUTTONS */}
            <div className="flex flex-wrap gap-4">

              <Link
                href="/jobs"
                className="flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-6 py-4 transition hover:bg-white/10"
              >

                <Search size={18} />

                Explore Jobs

              </Link>

              <Link
                href="/referrals"
                className="flex items-center gap-2 rounded-2xl bg-gradient-to-r from-cyan-400 to-blue-600 px-6 py-4 font-semibold text-black transition hover:scale-105"
              >

                <Plus size={18} />

                Request Referral

              </Link>

            </div>

          </motion.div>

          {/* STATS */}
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

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
                  delay: index * 0.1,
                }}
                className="rounded-[32px] border border-white/10 bg-white/5 p-8 backdrop-blur-2xl"
              >

                <div className="flex items-center justify-between">

                  <div className="rounded-2xl bg-cyan-500/10 p-4">

                    <item.icon
                      className="text-cyan-400"
                      size={28}
                    />

                  </div>

                  <div className="flex items-center gap-2 rounded-full bg-green-500/10 px-3 py-1 text-sm text-green-400">

                    <ArrowUpRight size={16} />

                    {item.growth}

                  </div>

                </div>

                <h2 className="mt-8 text-5xl font-black">
                  {item.value}
                </h2>

                <p className="mt-3 text-zinc-400">
                  {item.title}
                </p>

              </motion.div>

            ))}

          </div>

          {/* SECOND GRID */}
          <div className="mt-8 grid gap-8 xl:grid-cols-3">

            {/* LEFT LARGE */}
            <div className="space-y-8 xl:col-span-2">

              {/* RECENT ACTIVITY */}
              <div className="rounded-[36px] border border-white/10 bg-white/5 p-8 backdrop-blur-2xl">

                <div className="mb-8 flex items-center justify-between">

                  <div>

                    <h2 className="text-3xl font-black">
                      Recent Activity
                    </h2>

                    <p className="mt-2 text-zinc-400">
                      Latest actions on your account
                    </p>

                  </div>

                  <button className="rounded-2xl border border-white/10 bg-white/5 px-5 py-3 transition hover:bg-white/10">

                    View All

                  </button>

                </div>

                <div className="space-y-5">

                  {[
                    {
                      title:
                        "Referral request sent to Google recruiter",
                      time:
                        "2 hours ago",
                    },

                    {
                      title:
                        "Resume viewed by Amazon recruiter",
                      time:
                        "5 hours ago",
                    },

                    {
                      title:
                        "Interview scheduled with Microsoft",
                      time:
                        "Yesterday",
                    },
                  ].map((item, index) => (

                    <div
                      key={index}
                      className="flex items-center justify-between rounded-3xl border border-white/10 bg-black/20 p-6"
                    >

                      <div className="flex items-center gap-5">

                        <div className="rounded-2xl bg-cyan-500/10 p-4">

                          <CheckCircle2
                            className="text-cyan-400"
                            size={22}
                          />

                        </div>

                        <div>

                          <h3 className="font-semibold">
                            {item.title}
                          </h3>

                          <p className="mt-2 text-sm text-zinc-500">
                            {item.time}
                          </p>

                        </div>

                      </div>

                    </div>

                  ))}

                </div>

              </div>

              {/* RECOMMENDED JOBS */}
              <div className="rounded-[36px] border border-white/10 bg-white/5 p-8 backdrop-blur-2xl">

                <div className="mb-8 flex items-center justify-between">

                  <div>

                    <h2 className="text-3xl font-black">
                      Recommended Jobs
                    </h2>

                    <p className="mt-2 text-zinc-400">
                      AI powered opportunities
                    </p>

                  </div>

                  <Link
                    href="/jobs"
                    className="rounded-2xl border border-white/10 bg-white/5 px-5 py-3 transition hover:bg-white/10"
                  >

                    Browse Jobs

                  </Link>

                </div>

                <div className="space-y-5">

                  {[
                    {
                      role:
                        "Frontend Developer",
                      company:
                        "Google",
                    },

                    {
                      role:
                        "Backend Engineer",
                      company:
                        "Amazon",
                    },

                    {
                      role:
                        "SDE Intern",
                      company:
                        "Microsoft",
                    },
                  ].map((job, index) => (

                    <div
                      key={index}
                      className="flex items-center justify-between rounded-3xl border border-white/10 bg-black/20 p-6 transition hover:border-cyan-400/30"
                    >

                      <div className="flex items-center gap-5">

                        <div className="rounded-2xl bg-gradient-to-r from-cyan-400 to-blue-600 p-4">

                          <Building2
                            className="text-black"
                            size={24}
                          />

                        </div>

                        <div>

                          <h3 className="text-xl font-bold">
                            {job.role}
                          </h3>

                          <p className="mt-1 text-zinc-500">
                            {job.company}
                          </p>

                        </div>

                      </div>

                      <button className="rounded-2xl bg-cyan-500/10 px-5 py-3 text-cyan-400 transition hover:bg-cyan-500/20">

                        Apply

                      </button>

                    </div>

                  ))}

                </div>

              </div>

            </div>

            {/* RIGHT SIDEBAR */}
            <div className="space-y-8">

              {/* PROFILE CARD */}
              <div className="rounded-[36px] border border-white/10 bg-white/5 p-8 backdrop-blur-2xl">

                <div className="flex items-center justify-between">

                  <h2 className="text-2xl font-black">
                    Recruiter Insights
                  </h2>

                  <Star
                    className="text-cyan-400"
                    size={24}
                  />

                </div>

                <div className="mt-8 space-y-5">

                  {[
                    "Your profile is trending",
                    "Resume score above average",
                    "5 recruiters viewed profile",
                  ].map((item, index) => (

                    <div
                      key={index}
                      className="flex items-center gap-4 rounded-2xl border border-white/10 bg-black/20 p-5"
                    >

                      <TrendingUp
                        className="text-cyan-400"
                        size={20}
                      />

                      <p>{item}</p>

                    </div>

                  ))}

                </div>

              </div>

              {/* UPCOMING */}
              <div className="rounded-[36px] border border-white/10 bg-white/5 p-8 backdrop-blur-2xl">

                <div className="mb-6 flex items-center justify-between">

                  <h2 className="text-2xl font-black">
                    Upcoming
                  </h2>

                  <Clock3
                    className="text-cyan-400"
                    size={24}
                  />

                </div>

                <div className="space-y-5">

                  {[
                    {
                      event:
                        "Google Interview",
                      time:
                        "Tomorrow • 10 AM",
                    },

                    {
                      event:
                        "Referral Call",
                      time:
                        "Friday • 7 PM",
                    },
                  ].map((item, index) => (

                    <div
                      key={index}
                      className="rounded-2xl border border-white/10 bg-black/20 p-5"
                    >

                      <h3 className="font-semibold">
                        {item.event}
                      </h3>

                      <p className="mt-2 text-sm text-zinc-500">
                        {item.time}
                      </p>

                    </div>

                  ))}

                </div>

              </div>

            </div>

          </div>

        </section>

      </div>

    </main>
    </>
  );
}