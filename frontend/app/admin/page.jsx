"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { apiUrl } from "@/lib/api";

import {
  CheckCircle2,
  ExternalLink,
  Loader2,
  ShieldCheck,
  Users,
  XCircle,
} from "lucide-react";

export default function AdminPage() {
  const router = useRouter();

  const [stats, setStats] = useState(null);
  const [referrers, setReferrers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const authHeaders = () => ({
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");
    const user = storedUser ? JSON.parse(storedUser) : null;

    if (!token || user?.role !== "admin") {
      router.push("/login");
      return;
    }

    let active = true;

    const loadAdminData = async () => {
      try {
        const [statsResponse, referrersResponse] =
          await Promise.all([
            fetch(apiUrl("/api/admin/dashboard"), {
              headers: authHeaders(),
            }),
            fetch(
              apiUrl("/api/admin/referrers/pending"),
              {
                headers: authHeaders(),
              }
            ),
          ]);

        const statsData =
          await statsResponse.json();
        const referrersData =
          await referrersResponse.json();

        if (!statsData.success) {
          throw new Error(statsData.message);
        }

        if (!referrersData.success) {
          throw new Error(referrersData.message);
        }

        if (active) {
          setStats(statsData);
          setReferrers(
            referrersData.referrers
          );
        }
      } catch (err) {
        if (active) {
          setError(
            err.message ||
              "Unable to load admin data"
          );
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    };

    loadAdminData();

    return () => {
      active = false;
    };
  }, [router]);

  const updateVerification = async (
    referrerId,
    status
  ) => {
    setActionLoading(
      `${referrerId}-${status}`
    );
    setError("");
    setMessage("");

    try {
      const response = await fetch(
        apiUrl(
          `/api/admin/referrers/${referrerId}/verification`
        ),
        {
          method: "PUT",
          headers: authHeaders(),
          body: JSON.stringify({
            status,
          }),
        }
      );

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.message);
      }

      setReferrers((current) =>
        current.filter(
          (referrer) =>
            referrer._id !== referrerId
        )
      );

      setMessage(data.message);
    } catch (err) {
      setError(
        err.message ||
          "Unable to update verification"
      );
    } finally {
      setActionLoading("");
    }
  };

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-black text-white">
        <div className="flex items-center gap-3 text-zinc-400">
          <Loader2 className="animate-spin text-cyan-300" />
          Loading admin workspace...
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black px-6 py-12 text-white">
      <section className="mx-auto max-w-7xl">
        <div className="mb-10">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-cyan-500/20 bg-cyan-500/10 px-5 py-2 text-sm text-cyan-300">
            <ShieldCheck size={16} />
            Trust Operations
          </div>

          <h1 className="text-4xl font-black md:text-6xl">
            Admin Verification
          </h1>

          <p className="mt-4 max-w-3xl text-zinc-400">
            Review referrer profiles before they become visible to candidates.
            Approve only real employees with credible company and LinkedIn
            details.
          </p>
        </div>

        {error && (
          <div className="mb-6 rounded-2xl border border-red-500/20 bg-red-500/10 px-5 py-4 text-red-300">
            {error}
          </div>
        )}

        {message && (
          <div className="mb-6 rounded-2xl border border-green-500/20 bg-green-500/10 px-5 py-4 text-green-300">
            {message}
          </div>
        )}

        {stats && (
          <div className="mb-8 grid gap-5 md:grid-cols-3">
            {[
              {
                label: "Total Users",
                value: stats.totalUsers,
              },
              {
                label: "Total Jobs",
                value: stats.totalJobs,
              },
              {
                label: "Applications",
                value: stats.totalApplications,
              },
            ].map((item) => (
              <div
                key={item.label}
                className="rounded-[28px] border border-white/10 bg-white/5 p-6"
              >
                <p className="text-zinc-400">
                  {item.label}
                </p>
                <h2 className="mt-3 text-4xl font-black text-cyan-300">
                  {item.value}
                </h2>
              </div>
            ))}
          </div>
        )}

        <div className="rounded-[32px] border border-white/10 bg-white/5 p-6">
          <div className="mb-6 flex items-center gap-3">
            <Users className="text-cyan-300" />
            <h2 className="text-2xl font-black">
              Pending Referrer Approvals
            </h2>
          </div>

          {referrers.length === 0 ? (
            <div className="rounded-2xl border border-white/10 bg-black/30 p-6 text-zinc-400">
              No pending referrers right now.
            </div>
          ) : (
            <div className="grid gap-5">
              {referrers.map((referrer) => (
                <div
                  key={referrer._id}
                  className="rounded-2xl border border-white/10 bg-black/30 p-5"
                >
                  <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
                    <div>
                      <span className="rounded-full border border-yellow-500/20 bg-yellow-500/10 px-3 py-1 text-sm text-yellow-300">
                        {referrer.employeeVerificationStatus}
                      </span>

                      <h3 className="mt-4 text-2xl font-black">
                        {referrer.name}
                      </h3>

                      <div className="mt-3 space-y-2 text-zinc-400">
                        <p>Email: {referrer.email}</p>
                        <p>
                          Company:{" "}
                          {referrer.company ||
                            "Not provided"}
                        </p>
                        <p>
                          Location:{" "}
                          {referrer.location ||
                            "Not provided"}
                        </p>
                      </div>

                      {referrer.linkedin ? (
                        <a
                          href={referrer.linkedin}
                          target="_blank"
                          className="mt-4 inline-flex items-center gap-2 text-cyan-300 transition hover:text-cyan-200"
                        >
                          Open LinkedIn
                          <ExternalLink size={16} />
                        </a>
                      ) : (
                        <p className="mt-4 text-sm text-red-300">
                          LinkedIn not provided
                        </p>
                      )}
                    </div>

                    <div className="flex flex-wrap gap-3">
                      <button
                        onClick={() =>
                          updateVerification(
                            referrer._id,
                            "verified"
                          )
                        }
                        disabled={
                          actionLoading ===
                          `${referrer._id}-verified`
                        }
                        className="inline-flex items-center gap-2 rounded-2xl bg-green-400 px-5 py-3 font-bold text-black disabled:opacity-60"
                      >
                        <CheckCircle2 size={18} />
                        Approve
                      </button>

                      <button
                        onClick={() =>
                          updateVerification(
                            referrer._id,
                            "rejected"
                          )
                        }
                        disabled={
                          actionLoading ===
                          `${referrer._id}-rejected`
                        }
                        className="inline-flex items-center gap-2 rounded-2xl bg-red-400 px-5 py-3 font-bold text-black disabled:opacity-60"
                      >
                        <XCircle size={18} />
                        Reject
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
