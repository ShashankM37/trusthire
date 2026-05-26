"use client";

import { useState } from "react";

import { useRouter } from "next/navigation";

import { motion } from "framer-motion";

import {
  Briefcase,
  Building2,
  MapPin,
  DollarSign,
  FileText,
  Sparkles,
  CheckCircle2,
  Loader2,
  ArrowRight,
  ShieldCheck,
  Globe,
  Users,
  BadgeCheck,
  Code2,
  Layers3,
} from "lucide-react";

export default function CreateJobPage() {

  const router = useRouter();

  const [loading, setLoading] =
    useState(false);

  const [success, setSuccess] =
    useState("");

  const [error, setError] =
    useState("");

  const [formData, setFormData] =
    useState({
      title: "",
      company: "",
      location: "",
      salary: "",
      experience: "",
      jobType: "Full-Time",
      description: "",
      requirements: "",
      skills: "",
    });

  // =========================
  // HANDLE INPUT
  // =========================
  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });

  };

  // =========================
  // CREATE JOB
  // =========================
  const handleCreateJob =
    async (e) => {

      e.preventDefault();

      setLoading(true);

      setError("");

      setSuccess("");

      try {

        const token =
          localStorage.getItem(
            "token"
          );

        const response =
          await fetch(
            "https://trusthire-backend-fbpj.onrender.com/api/jobs/create",
            {
              method: "POST",

              headers: {
                "Content-Type":
                  "application/json",

                Authorization:
                  `Bearer ${token}`,
              },

              body: JSON.stringify({
                ...formData,

                requirements:
                  formData.requirements
                    .split(",")
                    .map((req) =>
                      req.trim()
                    ),

                skills:
                  formData.skills
                    .split(",")
                    .map((skill) =>
                      skill.trim()
                    ),
              }),
            }
          );

        const data =
          await response.json();

        if (data.success) {

          setSuccess(
            "Job posted successfully 🚀"
          );

          setTimeout(() => {

            router.push(
              "/jobs"
            );

          }, 1800);

        } else {

          setError(
            data.message
          );

        }

      } catch (error) {

        console.log(error);

        setError(
          "Something went wrong"
        );

      } finally {

        setLoading(false);

      }
    };

  return (
    <main className="relative min-h-screen overflow-hidden bg-black text-white">

      {/* BACKGROUND */}
      <div className="absolute inset-0 -z-10">

        <div className="absolute left-[5%] top-[5%] h-[450px] w-[450px] rounded-full bg-cyan-500/20 blur-[120px]" />

        <div className="absolute bottom-[5%] right-[5%] h-[500px] w-[500px] rounded-full bg-purple-600/20 blur-[140px]" />

        <div className="absolute left-[40%] top-[40%] h-[300px] w-[300px] rounded-full bg-blue-500/10 blur-[120px]" />

      </div>

      {/* GRID */}
      <div className="absolute inset-0 -z-10 opacity-[0.05] bg-[linear-gradient(to_right,#ffffff22_1px,transparent_1px),linear-gradient(to_bottom,#ffffff22_1px,transparent_1px)] bg-[size:45px_45px]" />

      <div className="relative z-10 mx-auto max-w-7xl px-6 py-14">

        {/* TOP SECTION */}
        <div className="mb-14 grid gap-12 lg:grid-cols-2">

          {/* LEFT */}
          <motion.div
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
          >

            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-cyan-500/20 bg-cyan-500/10 px-5 py-2 text-sm text-cyan-400">

              <Sparkles size={16} />

              Elite Hiring Platform

            </div>

            <h1 className="text-5xl font-black leading-[1.05] md:text-6xl">

              Hire Top Talent
              <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
                {" "}
                Faster
              </span>

            </h1>

            <p className="mt-8 max-w-2xl text-lg leading-relaxed text-zinc-400">

              Create premium job listings,
              attract verified professionals,
              and scale hiring with TrustHire.

            </p>

            {/* FEATURES */}
            <div className="mt-10 space-y-5">

              {[
                {
                  icon:
                    ShieldCheck,
                  text:
                    "Verified professional network",
                },

                {
                  icon:
                    Users,
                  text:
                    "Referral based hiring pipeline",
                },

                {
                  icon:
                    Globe,
                  text:
                    "Global startup talent reach",
                },
              ].map(
                (
                  item,
                  index
                ) => (

                  <motion.div
                    key={index}
                    initial={{
                      opacity: 0,
                      x: -20,
                    }}
                    animate={{
                      opacity: 1,
                      x: 0,
                    }}
                    transition={{
                      delay:
                        index * 0.15,
                    }}
                    className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur-xl"
                  >

                    <div className="rounded-2xl bg-cyan-500/10 p-3">

                      <item.icon
                        className="text-cyan-400"
                        size={22}
                      />

                    </div>

                    <p className="text-zinc-300">
                      {item.text}
                    </p>

                  </motion.div>

                )
              )}

            </div>

            {/* STATS */}
            <div className="mt-12 grid grid-cols-3 gap-5">

              {[
                {
                  value:
                    "12K+",
                  label:
                    "Candidates",
                },

                {
                  value:
                    "4.8K",
                  label:
                    "Applications",
                },

                {
                  value:
                    "98%",
                  label:
                    "Verified",
                },
              ].map(
                (
                  item,
                  index
                ) => (

                  <div
                    key={index}
                    className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-2xl"
                  >

                    <h2 className="text-4xl font-black text-cyan-400">

                      {item.value}

                    </h2>

                    <p className="mt-2 text-sm text-zinc-500">

                      {item.label}

                    </p>

                  </div>

                )
              )}

            </div>

          </motion.div>

          {/* RIGHT */}
          <motion.div
            initial={{
              opacity: 0,
              scale: 0.95,
            }}
            animate={{
              opacity: 1,
              scale: 1,
            }}
            className="relative"
          >

            {/* GLOW */}
            <div className="absolute -inset-[1px] rounded-[40px] bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600 opacity-30 blur-xl" />

            {/* CARD */}
            <div className="relative overflow-hidden rounded-[40px] border border-white/10 bg-white/5 p-8 backdrop-blur-2xl">

              {/* HEADER */}
              <div className="mb-10 flex items-center gap-5">

                <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-r from-cyan-400 to-blue-600 shadow-2xl shadow-cyan-500/20">

                  <Briefcase
                    className="text-black"
                    size={36}
                  />

                </div>

                <div>

                  <h2 className="text-3xl font-black">

                    Create Job

                  </h2>

                  <p className="mt-2 text-zinc-400">

                    Publish a premium opportunity

                  </p>

                </div>

              </div>

              {/* SUCCESS */}
              {success && (

                <motion.div
                  initial={{
                    opacity: 0,
                    y: -10,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  className="mb-6 rounded-2xl border border-green-500/20 bg-green-500/10 px-5 py-4 text-green-400"
                >

                  {success}

                </motion.div>

              )}

              {/* ERROR */}
              {error && (

                <motion.div
                  initial={{
                    opacity: 0,
                    y: -10,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  className="mb-6 rounded-2xl border border-red-500/20 bg-red-500/10 px-5 py-4 text-red-400"
                >

                  {error}

                </motion.div>

              )}

              {/* FORM */}
              <form
                onSubmit={
                  handleCreateJob
                }
                className="grid gap-6 md:grid-cols-2"
              >

                {/* TITLE */}
                <div className="md:col-span-2">

                  <label className="mb-3 block text-sm font-medium text-zinc-300">

                    Job Title

                  </label>

                  <div className="flex items-center rounded-2xl border border-white/10 bg-black/30 px-5 focus-within:border-cyan-400 focus-within:ring-2 focus-within:ring-cyan-400/20">

                    <Briefcase
                      className="text-zinc-500"
                      size={20}
                    />

                    <input
                      type="text"
                      name="title"
                      placeholder="Frontend Developer"
                      value={
                        formData.title
                      }
                      onChange={
                        handleChange
                      }
                      required
                      className="w-full bg-transparent px-4 py-5 outline-none placeholder:text-zinc-500"
                    />

                  </div>

                </div>

                {/* COMPANY */}
                <div>

                  <label className="mb-3 block text-sm font-medium text-zinc-300">

                    Company

                  </label>

                  <div className="flex items-center rounded-2xl border border-white/10 bg-black/30 px-5 focus-within:border-cyan-400 focus-within:ring-2 focus-within:ring-cyan-400/20">

                    <Building2
                      className="text-zinc-500"
                      size={20}
                    />

                    <input
                      type="text"
                      name="company"
                      placeholder="Google"
                      value={
                        formData.company
                      }
                      onChange={
                        handleChange
                      }
                      required
                      className="w-full bg-transparent px-4 py-5 outline-none placeholder:text-zinc-500"
                    />

                  </div>

                </div>

                {/* LOCATION */}
                <div>

                  <label className="mb-3 block text-sm font-medium text-zinc-300">

                    Location

                  </label>

                  <div className="flex items-center rounded-2xl border border-white/10 bg-black/30 px-5 focus-within:border-cyan-400 focus-within:ring-2 focus-within:ring-cyan-400/20">

                    <MapPin
                      className="text-zinc-500"
                      size={20}
                    />

                    <input
                      type="text"
                      name="location"
                      placeholder="Bangalore, India"
                      value={
                        formData.location
                      }
                      onChange={
                        handleChange
                      }
                      required
                      className="w-full bg-transparent px-4 py-5 outline-none placeholder:text-zinc-500"
                    />

                  </div>

                </div>

                {/* SALARY */}
                <div>

                  <label className="mb-3 block text-sm font-medium text-zinc-300">

                    Salary

                  </label>

                  <div className="flex items-center rounded-2xl border border-white/10 bg-black/30 px-5 focus-within:border-cyan-400 focus-within:ring-2 focus-within:ring-cyan-400/20">

                    <DollarSign
                      className="text-zinc-500"
                      size={20}
                    />

                    <input
                      type="text"
                      name="salary"
                      placeholder="₹12 LPA"
                      value={
                        formData.salary
                      }
                      onChange={
                        handleChange
                      }
                      className="w-full bg-transparent px-4 py-5 outline-none placeholder:text-zinc-500"
                    />

                  </div>

                </div>

                {/* EXPERIENCE */}
                <div>

                  <label className="mb-3 block text-sm font-medium text-zinc-300">

                    Experience

                  </label>

                  <div className="flex items-center rounded-2xl border border-white/10 bg-black/30 px-5 focus-within:border-cyan-400 focus-within:ring-2 focus-within:ring-cyan-400/20">

                    <BadgeCheck
                      className="text-zinc-500"
                      size={20}
                    />

                    <input
                      type="text"
                      name="experience"
                      placeholder="2+ Years"
                      value={
                        formData.experience
                      }
                      onChange={
                        handleChange
                      }
                      className="w-full bg-transparent px-4 py-5 outline-none placeholder:text-zinc-500"
                    />

                  </div>

                </div>

                {/* JOB TYPE */}
                <div className="md:col-span-2">

                  <label className="mb-3 block text-sm font-medium text-zinc-300">

                    Job Type

                  </label>

                  <select
                    name="jobType"
                    value={
                      formData.jobType
                    }
                    onChange={
                      handleChange
                    }
                    className="w-full rounded-2xl border border-white/10 bg-black/30 px-5 py-5 outline-none focus:border-cyan-400"
                  >

                    <option value="Full-Time">
                      Full-Time
                    </option>

                    <option value="Part-Time">
                      Part-Time
                    </option>

                    <option value="Internship">
                      Internship
                    </option>

                    <option value="Remote">
                      Remote
                    </option>

                  </select>

                </div>

                {/* SKILLS */}
                <div className="md:col-span-2">

                  <label className="mb-3 block text-sm font-medium text-zinc-300">

                    Skills

                  </label>

                  <div className="flex items-center rounded-2xl border border-white/10 bg-black/30 px-5 focus-within:border-cyan-400 focus-within:ring-2 focus-within:ring-cyan-400/20">

                    <Code2
                      className="text-zinc-500"
                      size={20}
                    />

                    <input
                      type="text"
                      name="skills"
                      placeholder="React, Node.js, MongoDB"
                      value={
                        formData.skills
                      }
                      onChange={
                        handleChange
                      }
                      className="w-full bg-transparent px-4 py-5 outline-none placeholder:text-zinc-500"
                    />

                  </div>

                </div>

                {/* REQUIREMENTS */}
                <div className="md:col-span-2">

                  <label className="mb-3 block text-sm font-medium text-zinc-300">

                    Requirements

                  </label>

                  <div className="flex items-center rounded-2xl border border-white/10 bg-black/30 px-5 focus-within:border-cyan-400 focus-within:ring-2 focus-within:ring-cyan-400/20">

                    <Layers3
                      className="text-zinc-500"
                      size={20}
                    />

                    <input
                      type="text"
                      name="requirements"
                      placeholder="DSA, System Design, Communication"
                      value={
                        formData.requirements
                      }
                      onChange={
                        handleChange
                      }
                      className="w-full bg-transparent px-4 py-5 outline-none placeholder:text-zinc-500"
                    />

                  </div>

                </div>

                {/* DESCRIPTION */}
                <div className="md:col-span-2">

                  <label className="mb-3 block text-sm font-medium text-zinc-300">

                    Job Description

                  </label>

                  <div className="rounded-2xl border border-white/10 bg-black/30 p-5 focus-within:border-cyan-400 focus-within:ring-2 focus-within:ring-cyan-400/20">

                    <textarea
                      name="description"
                      rows={8}
                      placeholder="Describe the role, responsibilities, expectations, and company culture..."
                      value={
                        formData.description
                      }
                      onChange={
                        handleChange
                      }
                      required
                      className="w-full resize-none bg-transparent outline-none placeholder:text-zinc-500"
                    />

                  </div>

                </div>

                {/* BUTTON */}
                <button
                  type="submit"
                  disabled={loading}
                  className="group md:col-span-2 flex items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 py-5 text-lg font-black text-black transition hover:scale-[1.01] disabled:opacity-70"
                >

                  {loading ? (

                    <>

                      <Loader2
                        className="animate-spin"
                        size={22}
                      />

                      Posting Job...

                    </>

                  ) : (

                    <>

                      Publish Job

                      <ArrowRight
                        className="transition group-hover:translate-x-1"
                        size={20}
                      />

                    </>

                  )}

                </button>

              </form>

            </div>

          </motion.div>

        </div>

      </div>

    </main>
  );
}