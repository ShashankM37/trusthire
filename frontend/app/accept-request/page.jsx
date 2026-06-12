"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import Navbar from "../components/Navbar";
import { apiUrl } from "@/lib/api";

import { CheckCircle2, Inbox, Loader2, XCircle } from "lucide-react";

export default function AcceptRequestPage() {
  const router = useRouter();

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

    if (!token) {
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
          setError(err.message || "Unable to load requests");
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
  }, [router]);

  const respond = async (requestId, status) => {
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
      setMessage(`Request ${status.toLowerCase()}.`);
    } catch (err) {
      setError(err.message || "Unable to update request");
    } finally {
      setActionLoading("");
    }
  };

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-black px-6 py-12 text-white">
        <section className="mx-auto max-w-6xl">
          <div className="mb-8">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-cyan-500/20 bg-cyan-500/10 px-5 py-2 text-sm text-cyan-300">
              <Inbox size={16} />
              Viva Screen 4
            </div>

            <h1 className="text-4xl font-black md:text-6xl">
              Accept Referral Request
            </h1>

            <p className="mt-4 max-w-3xl text-zinc-400">
              Login as employee and accept or reject candidate referral
              requests from this page.
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
              Loading requests...
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
                      <span className="rounded-full border border-yellow-500/20 bg-yellow-500/10 px-3 py-1 text-sm text-yellow-300">
                        {request.status}
                      </span>
                      <h2 className="mt-4 text-2xl font-black">
                        {request.role} at {request.company}
                      </h2>
                      <p className="mt-2 text-zinc-400">
                        Candidate: {request.candidate?.name || "Unknown"}
                      </p>
                      {request.message && (
                        <p className="mt-3 text-zinc-300">{request.message}</p>
                      )}
                    </div>

                    <div className="flex flex-wrap gap-3">
                      <button
                        onClick={() => respond(request._id, "Accepted")}
                        disabled={actionLoading === `${request._id}-Accepted`}
                        className="inline-flex items-center gap-2 rounded-2xl bg-green-400 px-5 py-3 font-bold text-black disabled:opacity-60"
                      >
                        <CheckCircle2 size={18} />
                        Accept
                      </button>
                      <button
                        onClick={() => respond(request._id, "Rejected")}
                        disabled={actionLoading === `${request._id}-Rejected`}
                        className="inline-flex items-center gap-2 rounded-2xl bg-red-400 px-5 py-3 font-bold text-black disabled:opacity-60"
                      >
                        <XCircle size={18} />
                        Reject
                      </button>
                    </div>
                  </div>
                </div>
              ))}

              {requests.length === 0 && (
                <div className="rounded-[28px] border border-white/10 bg-white/5 p-8 text-zinc-400">
                  No incoming referral requests yet.
                </div>
              )}
            </div>
          )}
        </section>
      </main>
    </>
  );
}
