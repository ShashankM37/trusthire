"use client";

import { useEffect, useMemo, useState } from "react";

import { useRouter } from "next/navigation";

import Navbar from "../components/Navbar";
import { apiUrl } from "@/lib/api";

import {
  CheckCircle2,
  Clock3,
  Loader2,
  MapPin,
  MessageSquare,
  Search,
  Send,
  ShieldCheck,
  Users,
  XCircle,
} from "lucide-react";

const statusStyles = {
  Pending: "bg-yellow-500/10 text-yellow-300 border-yellow-500/20",
  Accepted: "bg-green-500/10 text-green-300 border-green-500/20",
  Rejected: "bg-red-500/10 text-red-300 border-red-500/20",
  "In Progress": "bg-blue-500/10 text-blue-300 border-blue-500/20",
  Referred: "bg-cyan-500/10 text-cyan-300 border-cyan-500/20",
};

export default function ReferralsPage() {
  const router = useRouter();

  const [user] = useState(() => {
    if (typeof window === "undefined") {
      return null;
    }

    const storedUser = localStorage.getItem("user");

    return storedUser ? JSON.parse(storedUser) : null;
  });
  const [employees, setEmployees] = useState([]);
  const [referrals, setReferrals] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [requestForms, setRequestForms] = useState({});

  const isEmployee =
    user?.role === "employee" || user?.role === "recruiter";

  const authHeaders = () => {
    const token = localStorage.getItem("token");

    return {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
  };

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token || !user) {
      router.push("/login");
      return;
    }

    let isMounted = true;

    const fetchReferralData = async () => {
      try {
        const mineResponse = await fetch(apiUrl("/api/referrals/mine"), {
          headers: authHeaders(),
        });
        const mineData = await mineResponse.json();

        if (!mineData.success) {
          throw new Error(mineData.message);
        }

        if (!isMounted) {
          return;
        }

        setReferrals(mineData.referrals);

        if (user.role === "candidate") {
          const employeeResponse = await fetch(
            apiUrl("/api/referrals/employees"),
            {
              headers: authHeaders(),
            }
          );
          const employeeData = await employeeResponse.json();

          if (!employeeData.success) {
            throw new Error(employeeData.message);
          }

          if (!isMounted) {
            return;
          }

          setEmployees(employeeData.employees);
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message || "Unable to load referrals");
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchReferralData();

    return () => {
      isMounted = false;
    };
  }, [router, user]);

  const filteredEmployees = useMemo(() => {
    return employees.filter((employee) => {
      const value = search.toLowerCase();

      return (
        employee.name?.toLowerCase().includes(value) ||
        employee.email?.toLowerCase().includes(value) ||
        employee.location?.toLowerCase().includes(value)
      );
    });
  }, [employees, search]);

  const updateForm = (employeeId, field, value) => {
    setRequestForms((current) => ({
      ...current,
      [employeeId]: {
        company: "",
        role: "",
        message: "",
        ...current[employeeId],
        [field]: value,
      },
    }));
  };

  const sendRequest = async (employeeId) => {
    const form = requestForms[employeeId] || {};

    setActionLoading(employeeId);
    setError("");
    setMessage("");

    try {
      const response = await fetch(apiUrl("/api/referrals"), {
        method: "POST",
        headers: authHeaders(),
        body: JSON.stringify({
          employeeId,
          company: form.company,
          role: form.role,
          message: form.message,
        }),
      });

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.message);
      }

      setReferrals((current) => [data.referral, ...current]);
      setRequestForms((current) => ({
        ...current,
        [employeeId]: {
          company: "",
          role: "",
          message: "",
        },
      }));
      setMessage("Referral request sent successfully.");
    } catch (err) {
      setError(err.message || "Unable to send referral request");
    } finally {
      setActionLoading("");
    }
  };

  const updateStatus = async (referralId, status) => {
    setActionLoading(`${referralId}-${status}`);
    setError("");
    setMessage("");

    try {
      const response = await fetch(
        apiUrl(`/api/referrals/${referralId}/status`),
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

      setReferrals((current) =>
        current.map((referral) =>
          referral._id === referralId ? data.referral : referral
        )
      );
      setMessage(`Referral marked as ${status}.`);
    } catch (err) {
      setError(err.message || "Unable to update referral status");
    } finally {
      setActionLoading("");
    }
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <main className="flex min-h-screen items-center justify-center bg-black text-white">
          <div className="flex flex-col items-center gap-5">
            <Loader2 className="animate-spin text-cyan-400" size={50} />
            <p className="text-xl text-zinc-400">Loading referrals...</p>
          </div>
        </main>
      </>
    );
  }

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-black px-6 py-12 text-white">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-cyan-500/20 bg-cyan-500/10 px-5 py-2 text-sm text-cyan-300">
                <ShieldCheck size={16} />
                {isEmployee ? "Employee Referral Desk" : "Candidate Referral Network"}
              </div>

              <h1 className="text-4xl font-black md:text-6xl">
                {isEmployee ? "Manage Requests" : "Request Referrals"}
              </h1>

              <p className="mt-4 max-w-3xl text-zinc-400">
                {isEmployee
                  ? "Accept referral requests and keep candidates updated with live status changes."
                  : "Find verified employees, send referral requests, and track every response."}
              </p>
            </div>

            {!isEmployee && (
              <div className="flex min-w-full items-center rounded-2xl border border-white/10 bg-white/5 px-5 lg:min-w-[360px]">
                <Search className="text-zinc-500" size={20} />
                <input
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Search employees"
                  className="w-full bg-transparent px-4 py-4 outline-none placeholder:text-zinc-500"
                />
              </div>
            )}
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

          <section className="mb-10 rounded-[28px] border border-white/10 bg-white/5 p-6">
            <div className="mb-6 flex items-center gap-3">
              <Clock3 className="text-cyan-300" size={22} />
              <h2 className="text-2xl font-black">
                {isEmployee ? "Incoming Requests" : "My Referral Requests"}
              </h2>
            </div>

            {referrals.length === 0 ? (
              <p className="rounded-2xl border border-white/10 bg-black/30 p-6 text-zinc-400">
                No referral requests yet.
              </p>
            ) : (
              <div className="grid gap-5">
                {referrals.map((referral) => (
                  <div
                    key={referral._id}
                    className="rounded-2xl border border-white/10 bg-black/30 p-5"
                  >
                    <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                      <div>
                        <div className="mb-3 flex flex-wrap items-center gap-3">
                          <span
                            className={`rounded-full border px-3 py-1 text-sm ${
                              statusStyles[referral.status] ||
                              "border-white/10 bg-white/5 text-zinc-300"
                            }`}
                          >
                            {referral.status}
                          </span>
                          <span className="text-sm text-zinc-500">
                            {new Date(referral.createdAt).toLocaleDateString()}
                          </span>
                        </div>

                        <h3 className="text-xl font-bold">
                          {referral.role} at {referral.company}
                        </h3>

                        <p className="mt-2 text-zinc-400">
                          {isEmployee
                            ? `Candidate: ${referral.candidate?.name || "Unknown"}`
                            : `Employee: ${referral.employee?.name || "Unknown"}`}
                        </p>

                        {referral.message && (
                          <p className="mt-3 flex gap-2 text-sm text-zinc-300">
                            <MessageSquare
                              className="mt-0.5 shrink-0 text-cyan-300"
                              size={16}
                            />
                            {referral.message}
                          </p>
                        )}
                      </div>

                      {isEmployee && (
                        <div className="flex flex-wrap gap-3">
                          {["Accepted", "Rejected", "In Progress", "Referred"].map(
                            (status) => (
                              <button
                                key={status}
                                onClick={() => updateStatus(referral._id, status)}
                                disabled={actionLoading === `${referral._id}-${status}`}
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
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>

          {!isEmployee && (
            <section className="grid gap-6 lg:grid-cols-2">
              {filteredEmployees.map((employee) => {
                const form = requestForms[employee._id] || {};

                return (
                  <div
                    key={employee._id}
                    className="rounded-[28px] border border-white/10 bg-white/5 p-6"
                  >
                    <div className="mb-5 flex items-start gap-4">
                      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-r from-cyan-400 to-blue-600 text-xl font-black text-black">
                        {employee.name?.charAt(0)}
                      </div>

                      <div>
                        <h3 className="text-2xl font-black">{employee.name}</h3>
                        <p className="mt-1 text-cyan-300">{employee.email}</p>
                        <p className="mt-2 flex items-center gap-2 text-sm text-zinc-400">
                          <MapPin size={15} />
                          {employee.location || "Location not added"}
                        </p>
                      </div>
                    </div>

                    <div className="grid gap-3 md:grid-cols-2">
                      <input
                        value={form.company || ""}
                        onChange={(event) =>
                          updateForm(employee._id, "company", event.target.value)
                        }
                        placeholder="Company"
                        className="rounded-2xl border border-white/10 bg-black/30 px-4 py-3 outline-none focus:border-cyan-400"
                      />
                      <input
                        value={form.role || ""}
                        onChange={(event) =>
                          updateForm(employee._id, "role", event.target.value)
                        }
                        placeholder="Role"
                        className="rounded-2xl border border-white/10 bg-black/30 px-4 py-3 outline-none focus:border-cyan-400"
                      />
                    </div>

                    <textarea
                      value={form.message || ""}
                      onChange={(event) =>
                        updateForm(employee._id, "message", event.target.value)
                      }
                      placeholder="Short message for the employee"
                      rows={3}
                      className="mt-3 w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 outline-none focus:border-cyan-400"
                    />

                    <button
                      onClick={() => sendRequest(employee._id)}
                      disabled={actionLoading === employee._id}
                      className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-cyan-400 to-blue-600 px-5 py-4 font-bold text-black transition hover:scale-[1.01] disabled:opacity-60"
                    >
                      {actionLoading === employee._id ? (
                        <Loader2 className="animate-spin" size={18} />
                      ) : (
                        <Send size={18} />
                      )}
                      Send Referral Request
                    </button>
                  </div>
                );
              })}

              {filteredEmployees.length === 0 && (
                <div className="rounded-[28px] border border-white/10 bg-white/5 p-8 text-center text-zinc-400 lg:col-span-2">
                  <Users className="mx-auto mb-4 text-cyan-300" size={36} />
                  No verified employees found. Create and verify an employee
                  account first for the viva demo.
                </div>
              )}
            </section>
          )}
        </div>
      </main>
    </>
  );
}
