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
  Inbox,
  ShieldCheck,
  TrendingUp,
  UserCheck,
  XCircle,
} from "lucide-react";

const statusClass = {
  Pending: "border-yellow-500/20 bg-yellow-500/10 text-yellow-300",
  Accepted: "border-green-500/20 bg-green-500/10 text-green-300",
  Rejected: "border-red-500/20 bg-red-500/10 text-red-300",
  "In Progress": "border-blue-500/20 bg-blue-500/10 text-blue-300",
  Referred: "border-cyan-500/20 bg-cyan-500/10 text-cyan-300",
};

export default function ReferrerDashboardPage() {
  const router = useRouter();

  const [user] = useState(() => {
    if (typeof window === "undefined") {
      return null;
    }

    const storedUser =
      localStorage.getItem("user");

    return storedUser ? JSON.parse(storedUser) : null;
  });
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState("");

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
      user.role !== "employee" &&
      user.role !== "recruiter"
    ) {
      router.push("/dashboard/candidate");
      return;
    }

    let active = true;

    const loadRequests = async () => {
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
          setRequests(data.referrals);
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    };

    loadRequests();

    return () => {
      active = false;
    };
  }, [router, user]);

  const updateStatus = async (requestId, status) => {
    const token =
      localStorage.getItem("token");

    setActionLoading(`${requestId}-${status}`);

    try {
      const response = await fetch(
        apiUrl(`/api/referrals/${requestId}/status`),
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization:
              `Bearer ${token}`,
          },
          body: JSON.stringify({ status }),
        }
      );
      const data = await response.json();

      if (data.success) {
        setRequests((current) =>
          current.map((request) =>
            request._id === requestId
              ? data.referral
              : request
          )
        );
      }
    } finally {
      setActionLoading("");
    }
  };

  const counts = useMemo(() => {
    return {
      total: requests.length,
      pending: requests.filter(
        (item) => item.status === "Pending"
      ).length,
      accepted: requests.filter(
        (item) =>
          item.status === "Accepted" ||
          item.status === "In Progress"
      ).length,
      referred: requests.filter(
        (item) => item.status === "Referred"
      ).length,
    };
  }, [requests]);

  const isVerified =
    user?.employeeVerificationStatus === "verified";

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-black px-6 py-10 text-white">
        <section className="mx-auto max-w-7xl">
          <div className="mb-10 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-cyan-500/20 bg-cyan-500/10 px-5 py-2 text-sm text-cyan-300">
                <ShieldCheck size={16} />
                Referrer Workspace
              </div>

              <h1 className="text-4xl font-black md:text-6xl">
                Welcome, {user?.name || "Referrer"}
              </h1>

              <p className="mt-4 max-w-3xl text-zinc-400">
                Review candidate requests, accept the right matches, and keep
                referral status transparent.
              </p>
            </div>

            <Link
              href="/accept-request"
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-cyan-400 px-6 py-4 font-bold text-black"
            >
              Review Requests
              <Inbox size={18} />
            </Link>
          </div>

          {!isVerified && (
            <div className="mb-8 rounded-[28px] border border-yellow-500/20 bg-yellow-500/10 p-6">
              <h2 className="text-2xl font-black text-yellow-200">
                Verification Required
              </h2>
              <p className="mt-3 text-yellow-100/80">
                Your referrer status is{" "}
                <span className="font-bold">
                  {user?.employeeVerificationStatus || "pending"}
                </span>
                . Add company and LinkedIn details, then wait for admin
                approval before candidates can discover you.
              </p>
              <Link
                href="/profile"
                className="mt-5 inline-flex items-center gap-2 font-semibold text-yellow-100"
              >
                Complete Verification
                <ArrowRight size={18} />
              </Link>
            </div>
          )}

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {[
              {
                label: "Incoming Requests",
                value: counts.total,
                icon: Inbox,
              },
              {
                label: "Pending",
                value: counts.pending,
                icon: Clock3,
              },
              {
                label: "Accepted / Active",
                value: counts.accepted,
                icon: UserCheck,
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

          <div className="mt-8 rounded-[32px] border border-white/10 bg-white/5 p-6">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-2xl font-black">
                Candidate Request Inbox
              </h2>
              <Link
                href="/status-update"
                className="text-sm font-semibold text-cyan-300"
              >
                Manage Status
              </Link>
            </div>

            {loading ? (
              <p className="text-zinc-400">
                Loading candidate requests...
              </p>
            ) : requests.length === 0 ? (
              <div className="rounded-2xl border border-white/10 bg-black/30 p-6 text-zinc-400">
                No candidate requests yet.
              </div>
            ) : (
              <div className="space-y-4">
                {requests.slice(0, 6).map((request) => (
                  <div
                    key={request._id}
                    className="rounded-2xl border border-white/10 bg-black/30 p-5"
                  >
                    <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
                      <div>
                        <span
                          className={`rounded-full border px-3 py-1 text-sm ${
                            statusClass[request.status] ||
                            "border-white/10 bg-white/5 text-zinc-300"
                          }`}
                        >
                          {request.status}
                        </span>
                        <h3 className="mt-3 text-xl font-bold">
                          {request.role} at {request.company}
                        </h3>
                        <p className="mt-1 text-zinc-400">
                          Candidate:{" "}
                          {request.candidate?.name || "Unknown"}
                        </p>
                      </div>

                      <div className="flex flex-wrap gap-3">
                        {["Accepted", "Rejected", "In Progress", "Referred"].map(
                          (status) => (
                            <button
                              key={status}
                              onClick={() =>
                                updateStatus(request._id, status)
                              }
                              disabled={
                                actionLoading ===
                                `${request._id}-${status}`
                              }
                              className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold transition hover:bg-white/10 disabled:opacity-60"
                            >
                              {status === "Rejected" ? (
                                <XCircle size={16} />
                              ) : (
                                <CheckCircle2 size={16} />
                              )}
                              {status}
                            </button>
                          )
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
    </>
  );
}
