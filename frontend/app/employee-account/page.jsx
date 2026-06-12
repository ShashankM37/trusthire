"use client";

import Link from "next/link";

import Navbar from "../components/Navbar";

import {
  ArrowRight,
  BriefcaseBusiness,
  CheckCircle2,
  Inbox,
  ShieldCheck,
} from "lucide-react";

export default function EmployeeAccountPage() {
  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-black px-6 py-12 text-white">
        <section className="mx-auto max-w-6xl">
          <div className="mb-10 inline-flex items-center gap-2 rounded-full border border-cyan-500/20 bg-cyan-500/10 px-5 py-2 text-sm text-cyan-300">
            <BriefcaseBusiness size={16} />
            Viva Screen 2
          </div>

          <div className="grid gap-8 lg:grid-cols-[1fr_1fr] lg:items-center">
            <div>
              <h1 className="text-4xl font-black leading-tight md:text-6xl">
                Employee Account
              </h1>

              <p className="mt-5 max-w-2xl text-lg leading-relaxed text-zinc-400">
                This page demonstrates the employee side of TrustHire. Employees
                receive candidate referral requests, accept or reject them, and
                update the referral status.
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  href="/register"
                  className="inline-flex items-center gap-2 rounded-2xl bg-cyan-400 px-6 py-4 font-bold text-black"
                >
                  Create Employee
                  <ArrowRight size={18} />
                </Link>

                <Link
                  href="/accept-request"
                  className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-6 py-4 font-semibold"
                >
                  View Requests
                  <Inbox size={18} />
                </Link>
              </div>
            </div>

            <div className="rounded-[28px] border border-white/10 bg-white/5 p-7">
              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-cyan-500/10">
                <ShieldCheck className="text-cyan-300" size={30} />
              </div>

              <h2 className="text-2xl font-black">Employee Features</h2>

              <div className="mt-6 space-y-4">
                {[
                  "Register with Employee account type",
                  "Receive referral requests from candidates",
                  "Accept or reject pending requests",
                  "Update status to In Progress or Referred",
                  "Keep candidate informed through status tracking",
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-3 rounded-2xl border border-white/10 bg-black/30 p-4 text-zinc-300"
                  >
                    <CheckCircle2 className="text-green-300" size={20} />
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
