"use client";

import Link from "next/link";

import Navbar from "../components/Navbar";

import {
  ArrowRight,
  CheckCircle2,
  FileText,
  ShieldCheck,
  User,
} from "lucide-react";

export default function CandidateAccountPage() {
  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-black px-6 py-12 text-white">
        <section className="mx-auto max-w-6xl">
          <div className="mb-10 inline-flex items-center gap-2 rounded-full border border-cyan-500/20 bg-cyan-500/10 px-5 py-2 text-sm text-cyan-300">
            <User size={16} />
            Viva Screen 1
          </div>

          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div>
              <h1 className="text-4xl font-black leading-tight md:text-6xl">
                Candidate Account
              </h1>

              <p className="mt-5 max-w-2xl text-lg leading-relaxed text-zinc-400">
                This page is used to demonstrate that a candidate can create an
                account, login, maintain a profile, and request referrals from
                employees.
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  href="/register"
                  className="inline-flex items-center gap-2 rounded-2xl bg-cyan-400 px-6 py-4 font-bold text-black"
                >
                  Create Candidate
                  <ArrowRight size={18} />
                </Link>

                <Link
                  href="/send-referral-request"
                  className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-6 py-4 font-semibold"
                >
                  Send Referral Request
                </Link>
              </div>
            </div>

            <div className="rounded-[28px] border border-white/10 bg-white/5 p-7">
              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-cyan-500/10">
                <ShieldCheck className="text-cyan-300" size={30} />
              </div>

              <h2 className="text-2xl font-black">Candidate Features</h2>

              <div className="mt-6 space-y-4">
                {[
                  "Register with Candidate account type",
                  "Login securely using JWT authentication",
                  "View profile and dashboard",
                  "Send referral request to an employee",
                  "Track referral request status",
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

          <div className="mt-8 rounded-[28px] border border-white/10 bg-white/5 p-7">
            <div className="mb-4 flex items-center gap-3">
              <FileText className="text-cyan-300" size={22} />
              <h2 className="text-2xl font-black">Viva Explanation</h2>
            </div>

            <p className="text-zinc-400">
              In the viva, open this page first and explain that the candidate is
              the job seeker who sends referral requests to verified employees.
            </p>
          </div>
        </section>
      </main>
    </>
  );
}
