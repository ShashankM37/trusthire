"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import Navbar from "../../components/Navbar";
import { apiUrl } from "@/lib/api";

import {
  ArrowRight,
  CheckCircle2,
  Clock3,
  FileText,
  Search,
  Send,
  ShieldCheck,
  TrendingUp,
  Users,
} from "lucide-react";

const statusClass = {
  Pending: "border-yellow-500/20 bg-yellow-500/10 text-yellow-300",
  Accepted: "border-green-500/20 bg-green-500/10 text-green-300",
  Rejected: "border-red-500/20 bg-red-500/10 text-red-300",
  "In Progress": "border-blue-500/20 bg-blue-500/10 text-blue-300",
  Referred: "border-cyan-500/20 bg-cyan-500/10 text-cyan-300",
};

export default function CandidateDashboardPage() {
  const router = useRouter();

  const [user] = useState(() => {
    if (typeof window === "undefined") {
      return null;
    }

    const storedUser =
      localStorage.getItem("user");

    return storedUser ? JSON.parse(storedUser) : null;
  });
  const [referrals, setReferrals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token =
      localStorage.getItem("token");

    if (!token || !user) {
      router.push("/login");
      return;
    }

    if (user.role === "admin") {
      router.push("/admin");
      return;
    }

    if (
      user.role === "employee" ||
      user.role === "recruiter"
    ) {
      router.push("/dashboard/referrer");
      return;
    }

    let active = true;

    const loadReferrals = async () => {
      try {
        const response = await fetch(
          apiUrl("/api/referrals/mine"),
          {
            headers: {
              Authorization:
                `Bearer ${token}`,
            },
          }
        );
        const data = await response.json();

        if (active && data.success) {
          setReferrals(data.referrals);
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    };

    loadReferrals();

    return () => {
      active = false;
    };
  }, [router, user]);

  const counts = useMemo(() => {
    return {
      total: referrals.length,
      pending: referrals.filter(
        (item) => item.status === "Pending"
      ).length,
      accepted: referrals.filter(
        (item) =>
          item.status === "Accepted" ||
          item.status === "In Progress"
      ).length,
      referred: referrals.filter(
        (item) => item.status === "Referred"
      ).length,
    };
  }, [referrals]);

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-black px-6 py-10 text-white">
        <section className="mx-auto max-w-7xl">
          <div className="mb-10 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-cyan-500/20 bg-cyan-500/10 px-5 py-2 text-sm text-cyan-300">
                <ShieldCheck size={16} />
                Candidate Workspace
              </div>

              <h1 className="text-4xl font-black md:text-6xl">
                Welcome, {user?.name || "Candidate"}
              </h1>

              <p className="mt-4 max-w-3xl text-zinc-400">
                Build your profile, request referrals from verified
                referrers, and track every opportunity in one place.
              </p>
            </div>

            <Link
              href="/send-referral-request"
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-cyan-400 px-6 py-4 font-bold text-black"
            >
              Request Referral
              <Send size={18} />
            </Link>
          </div>

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {[
              {
                label: "Total Requests",
                value: counts.total,
                icon: FileText,
              },
              {
                label: "Pending",
                value: counts.pending,
                icon: Clock3,
              },
              {
                label: "Accepted / Active",
                value: counts.accepted,
                icon: CheckCircle2,
              },
              {
                label: "Referred",
                value: counts.referred,
                icon: TrendingUp,
              },
            ].map((item) => (
              <div
                key={item.label}
                className="rounded-[28px] border border-white/10 bg-white/5 p-6"
              >
                <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-500/10">
                  <item.icon className="text-cyan-300" />
                </div>
                <h2 className="text-4xl font-black">
                  {item.value}
                </h2>
                <p className="mt-2 text-zinc-400">
                  {item.label}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-8 grid gap-8 xl:grid-cols-[1.4fr_0.8fr]">
            <div className="rounded-[32px] border border-white/10 bg-white/5 p-6">
              <div className="mb-6 flex items-center justify-between">
                <h2 className="text-2xl font-black">
                  Referral Pipeline
                </h2>
                <Link
                  href="/status-update"
                  className="text-sm font-semibold text-cyan-300"
                >
                  View Tracking
                </Link>
              </div>

              {loading ? (
                <p className="text-zinc-400">
                  Loading referral activity...
                </p>
              ) : referrals.length === 0 ? (
                <div className="rounded-2xl border border-white/10 bg-black/30 p-6 text-zinc-400">
                  No referral requests yet. Start by finding a verified
                  referrer.
                </div>
              ) : (
                <div className="space-y-4">
                  {referrals.slice(0, 5).map((referral) => (
                    <div
                      key={referral._id}
                      className="rounded-2xl border border-white/10 bg-black/30 p-5"
                    >
                      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                        <div>
                          <h3 className="text-xl font-bold">
                            {referral.role} at {referral.company}
                          </h3>
                          <p className="mt-1 text-zinc-400">
                            Referrer:{" "}
                            {referral.employee?.name || "Assigned referrer"}
                          </p>
                        </div>
                        <span
                          className={`rounded-full border px-3 py-1 text-sm ${
                            statusClass[referral.status] ||
                            "border-white/10 bg-white/5 text-zinc-300"
                          }`}
                        >
                          {referral.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="space-y-6">
              <div className="rounded-[32px] border border-white/10 bg-white/5 p-6">
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-500/10">
                  <Search className="text-cyan-300" />
                </div>
                <h2 className="text-2xl font-black">
                  Find Verified Referrers
                </h2>
                <p className="mt-3 text-zinc-400">
                  Discover employees approved by TrustHire operations before
                  sending a request.
                </p>
                <Link
                  href="/referrals"
                  className="mt-6 inline-flex items-center gap-2 font-semibold text-cyan-300"
                >
                  Browse Referrers
                  <ArrowRight size={18} />
                </Link>
              </div>

              <div className="rounded-[32px] border border-white/10 bg-white/5 p-6">
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-500/10">
                  <Users className="text-cyan-300" />
                </div>
                <h2 className="text-2xl font-black">
                  Complete Your Profile
                </h2>
                <p className="mt-3 text-zinc-400">
                  A stronger profile improves the chance that referrers accept
                  your request.
                </p>
                <Link
                  href="/profile"
                  className="mt-6 inline-flex items-center gap-2 font-semibold text-cyan-300"
                >
                  Update Profile
                  <ArrowRight size={18} />
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
