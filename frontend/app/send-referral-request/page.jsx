"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import Navbar from "../components/Navbar";
import { apiUrl } from "@/lib/api";

import { Loader2, MapPin, Search, Send, UserRoundCheck } from "lucide-react";

export default function SendReferralRequestPage() {
  const router = useRouter();

  const [employees, setEmployees] = useState([]);
  const [forms, setForms] = useState({});
  const [search, setSearch] = useState("");
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

    const loadEmployees = async () => {
      try {
        const response = await fetch(apiUrl("/api/referrals/employees"), {
          headers: authHeaders(),
        });
        const data = await response.json();

        if (!data.success) {
          throw new Error(data.message);
        }

        if (active) {
          setEmployees(data.employees);
        }
      } catch (err) {
        if (active) {
          setError(err.message || "Unable to load employees");
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    };

    loadEmployees();

    return () => {
      active = false;
    };
  }, [router]);

  const filteredEmployees = useMemo(() => {
    const value = search.toLowerCase();

    return employees.filter((employee) => {
      return (
        employee.name?.toLowerCase().includes(value) ||
        employee.email?.toLowerCase().includes(value) ||
        employee.location?.toLowerCase().includes(value)
      );
    });
  }, [employees, search]);

  const updateForm = (employeeId, field, value) => {
    setForms((current) => ({
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
    const form = forms[employeeId] || {};

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

      setMessage("Referral request sent successfully.");
      setForms((current) => ({
        ...current,
        [employeeId]: {
          company: "",
          role: "",
          message: "",
        },
      }));
    } catch (err) {
      setError(err.message || "Unable to send referral request");
    } finally {
      setActionLoading("");
    }
  };

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-black px-6 py-12 text-white">
        <section className="mx-auto max-w-7xl">
          <div className="mb-8 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-cyan-500/20 bg-cyan-500/10 px-5 py-2 text-sm text-cyan-300">
                <Send size={16} />
                Viva Screen 3
              </div>

              <h1 className="text-4xl font-black md:text-6xl">
                Send Referral Request
              </h1>

              <p className="mt-4 max-w-3xl text-zinc-400">
                Login as candidate, select an employee, enter company and role,
                then submit the referral request.
              </p>
            </div>

            <div className="flex items-center rounded-2xl border border-white/10 bg-white/5 px-5 lg:min-w-[360px]">
              <Search className="text-zinc-500" size={20} />
              <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search employees"
                className="w-full bg-transparent px-4 py-4 outline-none placeholder:text-zinc-500"
              />
            </div>
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
              Loading employees...
            </div>
          ) : (
            <div className="grid gap-6 lg:grid-cols-2">
              {filteredEmployees.map((employee) => {
                const form = forms[employee._id] || {};

                return (
                  <div
                    key={employee._id}
                    className="rounded-[28px] border border-white/10 bg-white/5 p-6"
                  >
                    <div className="mb-5 flex items-start gap-4">
                      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-400 text-xl font-black text-black">
                        {employee.name?.charAt(0)}
                      </div>
                      <div>
                        <h2 className="text-2xl font-black">{employee.name}</h2>
                        <p className="text-cyan-300">{employee.email}</p>
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
                        placeholder="Job role"
                        className="rounded-2xl border border-white/10 bg-black/30 px-4 py-3 outline-none focus:border-cyan-400"
                      />
                    </div>

                    <textarea
                      value={form.message || ""}
                      onChange={(event) =>
                        updateForm(employee._id, "message", event.target.value)
                      }
                      placeholder="Message to employee"
                      rows={3}
                      className="mt-3 w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 outline-none focus:border-cyan-400"
                    />

                    <button
                      onClick={() => sendRequest(employee._id)}
                      disabled={actionLoading === employee._id}
                      className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-cyan-400 px-5 py-4 font-bold text-black disabled:opacity-60"
                    >
                      {actionLoading === employee._id ? (
                        <Loader2 className="animate-spin" size={18} />
                      ) : (
                        <UserRoundCheck size={18} />
                      )}
                      Send Request
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </section>
      </main>
    </>
  );
}
