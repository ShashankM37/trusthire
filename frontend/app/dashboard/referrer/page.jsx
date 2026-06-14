"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import Navbar from "../../components/Navbar";
import ReferralTimeline from "../../components/ReferralTimeline";
import { apiFetch } from "@/lib/api";

import {
  ArrowRight,
  CheckCircle2,
  Clock3,
  Inbox,
  ShieldCheck,
  TrendingUp,
  UserCheck,
  XCircle,
  BriefcaseBusiness,
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
  const [opportunities, setOpportunities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState("");
  const [editingOpportunity, setEditingOpportunity] = useState(null);
  const [editFormData, setEditFormData] = useState({});
  const [opportunityMessage, setOpportunityMessage] = useState("");
  const [opportunityError, setOpportunityError] = useState("");

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
        const data = await apiFetch("/api/referrals/mine", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (active && data?.success) {
          setRequests(data.referrals);
        }

        try {
          const oppData = await apiFetch("/api/opportunities/mine", {
            headers: { Authorization: `Bearer ${token}` },
          });

          if (active && oppData?.success) {
            setOpportunities(oppData.opportunities);
          }
        } catch (err) {
          console.log("opportunities load error", err);
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

  const loadOpportunities = async (token) => {
    try {
      const oppData = await apiFetch("/api/opportunities/mine", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (oppData?.success) {
        setOpportunities(oppData.opportunities);
      }
    } catch (err) {
      console.log("opportunities load error", err);
    }
  };

  const submitOpportunity = async (event) => {
    event.preventDefault();
    const token = localStorage.getItem("token");
    setOpportunityMessage("");
    setOpportunityError("");

    const payload = {
      company: editFormData.company || "",
      title: editFormData.title || "",
      location: editFormData.location || "",
      description: editFormData.description || "",
      referralSlots: Number(editFormData.referralSlots) || 1,
      status: editFormData.status || "Open",
    };

    const method = editingOpportunity ? "PUT" : "POST";
    const endpoint = editingOpportunity
      ? `/api/opportunities/${editingOpportunity._id}`
      : "/api/opportunities";

    try {
      const data = await apiFetch(endpoint, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (!data?.success) {
        throw new Error(data?.message || "Unable to save opportunity");
      }

      setOpportunityMessage(
        editingOpportunity
          ? "Opportunity updated successfully."
          : "Opportunity created successfully."
      );
      setEditingOpportunity(null);
      setEditFormData({});
      await loadOpportunities(token);
    } catch (err) {
      setOpportunityError(err.message || "Failed to save opportunity.");
    }
  };

  const setOpportunityField = (field, value) => {
    setEditFormData((current) => ({ ...current, [field]: value }));
  };

  const startEditOpportunity = (opportunity) => {
    setEditingOpportunity(opportunity);
    setEditFormData({
      company: opportunity.company || "",
      title: opportunity.title || "",
      location: opportunity.location || "",
      description: opportunity.description || "",
      referralSlots: opportunity.referralSlots || 1,
      status: opportunity.status || "Open",
    });
  };

  const cancelEditOpportunity = () => {
    setEditingOpportunity(null);
    setEditFormData({});
    setOpportunityMessage("");
    setOpportunityError("");
  };

  const closeOpportunity = async (id) => {
    const token = localStorage.getItem("token");
    setActionLoading(`close-${id}`);

    try {
      await apiFetch(`/api/opportunities/${id}/close`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      await loadOpportunities(token);
    } finally {
      setActionLoading("");
    }
  };

  const updateStatus = async (requestId, status) => {
    const token =
      localStorage.getItem("token");

    setActionLoading(`${requestId}-${status}`);

    try {
      const data = await apiFetch(`/api/referrals/${requestId}/status`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status }),
      });

      if (data?.success) {
        setRequests((current) =>
          current.map((request) =>
            request._id === requestId ? data.referral : request
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
      activeOpportunities: opportunities.filter(o => o.status === "Open").length,
      interviews: requests.filter(r => ["Interview Received","Interview Completed"].includes(r.status)).length,
      hires: requests.filter(r => r.status === "Hired").length,
    };
  }, [requests, opportunities]);

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

          <div className="grid gap-5 md:grid-cols-3 xl:grid-cols-4">
            {[
              { label: "Active Opportunities", value: counts.activeOpportunities, icon: BriefcaseBusiness },
              { label: "Incoming Requests", value: counts.total, icon: Inbox },
              { label: "Pending", value: counts.pending, icon: Clock3 },
              { label: "Accepted / Active", value: counts.accepted, icon: UserCheck },
              { label: "Referred", value: counts.referred, icon: TrendingUp },
              { label: "Interviews", value: counts.interviews, icon: TrendingUp },
              { label: "Hires", value: counts.hires, icon: CheckCircle2 },
            ].map((item) => (
              <div key={item.label} className="rounded-[28px] border border-white/10 bg-white/5 p-6">
                <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-500/10">
                  <item.icon className="text-cyan-300" />
                </div>
                <h2 className="text-4xl font-black">{item.value}</h2>
                <p className="mt-2 text-zinc-400">{item.label}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 grid gap-6 xl:grid-cols-[1.25fr_1fr]">
            <div className="rounded-[32px] border border-white/10 bg-white/5 p-6">
              <div className="mb-6 flex items-center justify-between">
                <h2 className="text-2xl font-black">Manage Opportunities</h2>
                <button
                  onClick={() => {
                    cancelEditOpportunity();
                    setEditFormData({ referralSlots: 1, status: "Open" });
                  }}
                  className="text-sm font-semibold text-cyan-300"
                >
                  New Opportunity
                </button>
              </div>

              <form onSubmit={submitOpportunity} className="space-y-4">
                {opportunityMessage && (
                  <div className="rounded-2xl border border-green-500/20 bg-green-500/10 p-4 text-green-200">
                    {opportunityMessage}
                  </div>
                )}
                {opportunityError && (
                  <div className="rounded-2xl border border-red-500/20 bg-red-500/10 p-4 text-red-200">
                    {opportunityError}
                  </div>
                )}

                <div className="grid gap-4 md:grid-cols-2">
                  <label className="block">
                    <span className="text-sm font-semibold text-zinc-300">Company</span>
                    <input
                      value={editFormData.company || ""}
                      onChange={(event) => setOpportunityField("company", event.target.value)}
                      className="mt-2 w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-white outline-none"
                      placeholder="Company name"
                      required
                    />
                  </label>
                  <label className="block">
                    <span className="text-sm font-semibold text-zinc-300">Title</span>
                    <input
                      value={editFormData.title || ""}
                      onChange={(event) => setOpportunityField("title", event.target.value)}
                      className="mt-2 w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-white outline-none"
                      placeholder="Job title"
                      required
                    />
                  </label>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <label className="block">
                    <span className="text-sm font-semibold text-zinc-300">Location</span>
                    <input
                      value={editFormData.location || ""}
                      onChange={(event) => setOpportunityField("location", event.target.value)}
                      className="mt-2 w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-white outline-none"
                      placeholder="Location"
                      required
                    />
                  </label>
                  <label className="block">
                    <span className="text-sm font-semibold text-zinc-300">Referral Slots</span>
                    <input
                      type="number"
                      min="1"
                      value={editFormData.referralSlots || 1}
                      onChange={(event) => setOpportunityField("referralSlots", event.target.value)}
                      className="mt-2 w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-white outline-none"
                      required
                    />
                  </label>
                </div>

                <label className="block">
                  <span className="text-sm font-semibold text-zinc-300">Description</span>
                  <textarea
                    value={editFormData.description || ""}
                    onChange={(event) => setOpportunityField("description", event.target.value)}
                    className="mt-2 h-28 w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-white outline-none"
                    placeholder="Add a short description"
                    required
                  />
                </label>

                <label className="block">
                  <span className="text-sm font-semibold text-zinc-300">Status</span>
                  <select
                    value={editFormData.status || "Open"}
                    onChange={(event) => setOpportunityField("status", event.target.value)}
                    className="mt-2 w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-white outline-none"
                  >
                    <option value="Open">Open</option>
                    <option value="Closed">Closed</option>
                  </select>
                </label>

                <div className="flex flex-wrap gap-3">
                  <button
                    type="submit"
                    className="inline-flex items-center justify-center rounded-2xl bg-cyan-400 px-6 py-3 font-semibold text-black"
                  >
                    {editingOpportunity ? "Update Opportunity" : "Create Opportunity"}
                  </button>
                  {editingOpportunity && (
                    <button
                      type="button"
                      onClick={cancelEditOpportunity}
                      className="inline-flex items-center justify-center rounded-2xl border border-white/10 px-6 py-3 text-sm text-white"
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </form>
            </div>

            <div className="rounded-[32px] border border-white/10 bg-white/5 p-6">
              <div className="mb-6 flex items-center justify-between">
                <h2 className="text-2xl font-black">Your Opportunities</h2>
                <span className="text-sm text-zinc-400">{opportunities.length} total</span>
              </div>

              {opportunities.length === 0 ? (
                <div className="rounded-2xl border border-white/10 bg-black/30 p-6 text-zinc-400">
                  No opportunities created yet. Use the form to publish your first role.
                </div>
              ) : (
                <div className="space-y-4">
                  {opportunities.map((opportunity) => (
                    <div key={opportunity._id} className="rounded-3xl border border-white/10 bg-black/30 p-5">
                      <div className="flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
                        <div>
                          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/20 bg-cyan-500/10 px-3 py-1 text-sm text-cyan-300">
                            {opportunity.status}
                          </div>
                          <h3 className="mt-3 text-xl font-bold">{opportunity.title}</h3>
                          <p className="mt-1 text-zinc-400">{opportunity.company} · {opportunity.location}</p>
                          <p className="mt-3 text-zinc-300">{opportunity.description}</p>
                          <p className="mt-4 text-sm text-zinc-400">
                            Referral slots: {opportunity.referralSlots}
                          </p>
                          <p className="mt-1 text-sm text-zinc-400">
                            Created at: {new Date(opportunity.createdAt).toLocaleDateString()}
                          </p>
                        </div>

                        <div className="flex flex-wrap gap-3">
                          <button
                            onClick={() => startEditOpportunity(opportunity)}
                            className="inline-flex items-center justify-center rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold transition hover:bg-white/10"
                          >
                            Edit
                          </button>
                          {opportunity.status === "Open" && (
                            <button
                              onClick={() => closeOpportunity(opportunity._id)}
                              disabled={actionLoading === `close-${opportunity._id}`}
                              className="inline-flex items-center justify-center rounded-2xl border border-white/10 bg-red-500/10 px-4 py-3 text-sm font-semibold text-red-200 transition hover:bg-red-500/20 disabled:opacity-60"
                            >
                              Close
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
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
                    <div className="flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
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
                        <div className="mt-5">
                          <ReferralTimeline
                            status={request.status}
                            createdAt={request.createdAt}
                            updatedAt={request.updatedAt}
                          />
                        </div>
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
