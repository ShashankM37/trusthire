"use client";

import Link from "next/link";

import Navbar from "../components/Navbar";

import {
  Activity,
  ArrowRight,
  BriefcaseBusiness,
  Inbox,
  Send,
  User,
} from "lucide-react";

const demoPages = [
  {
    title: "Candidate Page",
    description: "Show candidate account creation and candidate features.",
    href: "/candidate-account",
    icon: User,
  },
  {
    title: "Employee Page",
    description: "Show employee account creation and employee features.",
    href: "/employee-account",
    icon: BriefcaseBusiness,
  },
  {
    title: "Send Referral Request",
    description: "Candidate sends referral request to an employee.",
    href: "/send-referral-request",
    icon: Send,
  },
  {
    title: "Accept Request",
    description: "Employee accepts or rejects referral requests.",
    href: "/accept-request",
    icon: Inbox,
  },
  {
    title: "Status Tracking",
    description: "Track and update referral request status.",
    href: "/status-update",
    icon: Activity,
  },
];

export default function VivaDemoPage() {
  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-black px-6 py-12 text-white">
        <section className="mx-auto max-w-7xl">
          <div className="mb-10">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-cyan-500/20 bg-cyan-500/10 px-5 py-2 text-sm text-cyan-300">
              TrustHire Viva Flow
            </div>

            <h1 className="text-4xl font-black md:text-6xl">
              Viva Demo Pages
            </h1>

            <p className="mt-4 max-w-3xl text-zinc-400">
              Open these pages one by one to demonstrate candidate account,
              employee account, referral request, acceptance, and status
              tracking.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {demoPages.map((page) => (
              <Link
                key={page.href}
                href={page.href}
                className="group rounded-[28px] border border-white/10 bg-white/5 p-6 transition hover:border-cyan-400/40 hover:bg-white/10"
              >
                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-500/10">
                  <page.icon className="text-cyan-300" size={28} />
                </div>

                <h2 className="text-2xl font-black">{page.title}</h2>

                <p className="mt-3 min-h-12 text-zinc-400">
                  {page.description}
                </p>

                <div className="mt-6 inline-flex items-center gap-2 font-semibold text-cyan-300">
                  Open Page
                  <ArrowRight
                    className="transition group-hover:translate-x-1"
                    size={18}
                  />
                </div>
              </Link>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}
