"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import Navbar from "../components/Navbar";
import { apiUrl } from "@/lib/api";

import { Activity, CheckCircle2, Loader2 } from "lucide-react";

const statusStyles = {
  Pending: "border-yellow-500/20 bg-yellow-500/10 text-yellow-300",
  Accepted: "border-green-500/20 bg-green-500/10 text-green-300",
  Rejected: "border-red-500/20 bg-red-500/10 text-red-300",
  "In Progress": "border-blue-500/20 bg-blue-500/10 text-blue-300",
  Referred: "border-cyan-500/20 bg-cyan-500/10 text-cyan-300",
};

export default function StatusUpdatePage() {
  const router = useRouter();

  const [user] = useState(() => {
    if (typeof window === "undefined") {
      return null;
    }

    const storedUser = localStorage.getItem("user");

    return storedUser ? JSON.parse(storedUser) : null;
  });
  const [requests, setRequests] = useState([]);
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

    if (!token || !user) {
      router.push("/login");
      return;
    }

    let active = true;

    const loadRequests = async () => {
      try {
        const response = await fetch(apiUrl("/api/referrals/mine"), {
          headers: authHeaders(),
        });
        const data = await response.json();

        if (!data.success) {
          throw new Error(data.message);
        }

        if (active) {
          setRequests(data.referrals);
        }
      } catch (err) {
        if (active) {
          setError(err.message || "Unable to load status");
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
    setActionLoading(`${requestId}-${status}`);
    setError("");
    setMessage("");

    try {
      const response = await fetch(
        apiUrl(`/api/referrals/${requestId}/status`),
        {
          method: "PATCH",
          headers: authHeaders(),
          body: JSON.stringify({ status }),
        }
      );
      const data = await response.json();

      if (!data.success) {
        throw new Error(data.message);
      }

      setRequests((current) =>
        current.map((item) => (item._id === requestId ? data.referral : item))
      );
      setMessage(`Status updated to ${status}.`);
    } catch (err) {
      setError(err.message || "Unable to update status");
    } finally {
      setActionLoading("");
    }
  };

  const canUpdate = user?.role === "employee" || user?.role === "recruiter";

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-black px-6 py-12 text-white">
        <section className="mx-auto max-w-6xl">
          <div className="mb-8">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-cyan-500/20 bg-cyan-500/10 px-5 py-2 text-sm text-cyan-300">
              <Activity size={16} />
              Live tracking
            </div>

            <h1 className="text-4xl font-black md:text-6xl">
              Referral Status Update
            </h1>

            <p className="mt-4 max-w-3xl text-zinc-400">
              Candidates and referrers share one source of truth for every
              referral request, from pending review to referred or rejected.
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

          {loading ? (
            <div className="flex items-center gap-3 text-zinc-400">
              <Loader2 className="animate-spin text-cyan-300" />
              Loading status...
            </div>
          ) : (
            <div className="grid gap-5">
              {requests.map((request) => (
                <div
                  key={request._id}
                  className="rounded-[28px] border border-white/10 bg-white/5 p-6"
                >
                  <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
                    <div>
                      <span
                        className={`rounded-full border px-3 py-1 text-sm ${
                          statusStyles[request.status] ||
                          "border-white/10 bg-white/5 text-zinc-300"
                        }`}
                      >
                        {request.status}
                      </span>
                      <h2 className="mt-4 text-2xl font-black">
                        {request.role} at {request.company}
                      </h2>
                      <p className="mt-2 text-zinc-400">
                        {canUpdate
                          ? `Candidate: ${request.candidate?.name || "Unknown"}`
                          : `Employee: ${request.employee?.name || "Unknown"}`}
                      </p>
                    </div>

                    {canUpdate && (
                      <div className="flex flex-wrap gap-3">
                        {["Accepted", "In Progress", "Referred", "Rejected"].map(
                          (status) => (
                            <button
                              key={status}
                              onClick={() => updateStatus(request._id, status)}
                              disabled={actionLoading === `${request._id}-${status}`}
                              className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-5 py-3 font-semibold disabled:opacity-60"
                            >
                              <CheckCircle2 size={18} />
                              {status}
                            </button>
                          )
                        )}
                      </div>
                    )}
                  </div>
                </div>
              ))}

              {requests.length === 0 && (
                <div className="rounded-[28px] border border-white/10 bg-white/5 p-8 text-zinc-400">
                  No referral status available yet.
                </div>
              )}
            </div>
          )}
        </section>
      </main>
    </>
  );
}
