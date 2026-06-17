"use client";

import { useState, useEffect } from "react";

import {
  UploadCloud,
  FileText,
  CheckCircle2,
  Mail,
  Briefcase,
  MapPin,
  Globe,
  Sparkles,
  Shield,
  Pencil,
  Camera,
  Star,
  TrendingUp,
  Building2,
  Github,
  Code2,
  Link2,
} from "lucide-react";

import { motion } from "framer-motion";
import { apiUrl } from "@/lib/api";

export default function ProfilePage() {

const [user, setUser] = useState(null);

useEffect(() => {
  const storedUser = localStorage.getItem("user");

  if (storedUser) {
    setUser(JSON.parse(storedUser));
  }
}, []);

  const [resume, setResume] =
    useState(null);

  const [uploading, setUploading] =
    useState(false);

  const [savingProfile, setSavingProfile] =
    useState(false);

  const [message, setMessage] =
    useState("");

 const [profileForm, setProfileForm] =
  useState(() => ({
    company: user?.company || "",
    linkedIn: user?.linkedIn || "",
    github: user?.github || "",
    leetcode: user?.leetcode || "",
    codeforces: user?.codeforces || "",
    hackerrank: user?.hackerrank || "",
    portfolio: user?.portfolio || "",
    location: user?.location || "",
  }));

  // =========================
  // HANDLE FILE CHANGE
  // =========================
  const handleFileChange = (e) => {

    setResume(
      e.target.files[0]
    );

  };

  // =========================
  // UPLOAD RESUME
  // =========================
  const uploadResume = async () => {

    if (!resume) {

      return alert(
        "Please select PDF resume"
      );

    }

    const token =
      localStorage.getItem("token");

    const formData =
      new FormData();

    formData.append(
      "resume",
      resume
    );

    try {

      setUploading(true);

      const response =
        await fetch(
          apiUrl("/api/upload/resume"),
          {
            method: "POST",

            headers: {
              Authorization:
                `Bearer ${token}`,
            },

            body: formData,
          }
        );

      const data =
        await response.json();

      if (data.success) {

        setMessage(
          "Resume uploaded successfully 🚀"
        );

        const updatedUser = {
          ...user,
          resume: data.resume,
        };

        localStorage.setItem(
          "user",
          JSON.stringify(updatedUser)
        );

        setUser(updatedUser);

      } else {

        setMessage(
          data.message
        );

      }

    } catch (error) {

      console.log(error);

      setMessage(
        "Upload failed"
      );

    } finally {

      setUploading(false);

    }

  };

  const saveProfessionalProfile = async () => {

    const token =
      localStorage.getItem("token");

    try {

      setSavingProfile(true);

      const response =
        await fetch(
          apiUrl("/api/auth/update-profile"),
          {
            method: "PUT",

            headers: {
              "Content-Type": "application/json",
              Authorization:
                `Bearer ${token}`,
            },

            body: JSON.stringify({
              company:
                profileForm.company,
              linkedIn:
                profileForm.linkedIn,
              github:
                profileForm.github,
              leetcode:
                profileForm.leetcode,
              codeforces:
                profileForm.codeforces,
              hackerrank:
                profileForm.hackerrank,
              portfolio:
                profileForm.portfolio,
              location:
                profileForm.location,
            }),
          }
        );

      const data =
        await response.json();

      if (data.success) {

        const updatedUser = {
          ...user,
          ...data.user,
        };

        localStorage.setItem(
          "user",
          JSON.stringify(updatedUser)
        );

        setUser(updatedUser);

        setMessage(
          "Professional profile updated. Your recruitment links are now saved."
        );

      } else {

        setMessage(data.message);

      }

    } catch (error) {

      console.log(error);

      setMessage(
        "Profile update failed"
      );

    } finally {

      setSavingProfile(false);

    }

  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-black text-white">

      {/* BACKGROUND */}
      <div className="absolute inset-0 -z-10 overflow-hidden">

        <div className="absolute left-[10%] top-[5%] h-[450px] w-[450px] rounded-full bg-cyan-500/20 blur-[120px]" />

        <div className="absolute right-[10%] bottom-[5%] h-[500px] w-[500px] rounded-full bg-purple-600/20 blur-[140px]" />

        <div className="absolute left-[40%] top-[50%] h-[300px] w-[300px] rounded-full bg-blue-500/10 blur-[120px]" />

      </div>

      {/* GRID */}
      <div className="absolute inset-0 -z-10 opacity-[0.05] bg-[linear-gradient(to_right,#ffffff22_1px,transparent_1px),linear-gradient(to_bottom,#ffffff22_1px,transparent_1px)] bg-[size:45px_45px]" />

      <div className="relative z-10 mx-auto max-w-7xl px-6 py-14">

        {/* TOP HEADER */}
        <motion.div
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          className="mb-14 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between"
        >

          <div>

            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-cyan-500/20 bg-cyan-500/10 px-5 py-2 text-sm text-cyan-400">

              <Sparkles size={16} />

              TrustHire Professional Profile

            </div>

            <h1 className="text-5xl font-black leading-tight md:text-6xl">

              Welcome Back,
              <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
                {" "}
                {user?.name || "Professional"}
              </span>

            </h1>

            <p className="mt-5 max-w-3xl text-lg text-zinc-400">
              Build your trusted professional identity,
              upload resumes, and stand out to recruiters.
            </p>

          </div>

          {/* ACTIONS */}
          <div className="flex flex-wrap gap-4">

            <button className="flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-6 py-4 transition hover:bg-white/10">

              <Pencil size={18} />

              Edit Profile

            </button>

            <button className="flex items-center gap-2 rounded-2xl bg-gradient-to-r from-cyan-400 to-blue-600 px-6 py-4 font-semibold text-black transition hover:scale-105">

              <TrendingUp size={18} />

              Boost Visibility

            </button>

          </div>

        </motion.div>

        {/* MAIN GRID */}
        <div className="grid gap-8 lg:grid-cols-12">

          {/* LEFT SIDEBAR */}
          <motion.div
            initial={{
              opacity: 0,
              x: -30,
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            className="lg:col-span-4"
          >

            <div className="sticky top-10 overflow-hidden rounded-[36px] border border-white/10 bg-white/5 backdrop-blur-2xl">

              {/* TOP BANNER */}
              <div className="relative h-36 bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600">

                <button className="absolute right-5 top-5 rounded-full bg-black/30 p-3 backdrop-blur-xl">

                  <Camera size={18} />

                </button>

              </div>

              {/* PROFILE */}
              <div className="relative px-8 pb-8">

                {/* AVATAR */}
                <div className="-mt-16 flex items-center justify-between">

                  <div className="flex h-32 w-32 items-center justify-center rounded-full border-4 border-black bg-gradient-to-br from-cyan-400 to-purple-600 text-5xl font-black shadow-2xl shadow-cyan-500/20">

                    {user?.name?.charAt(0)}

                  </div>

                  <div className="rounded-2xl border border-cyan-500/20 bg-cyan-500/10 px-4 py-2 text-sm text-cyan-400">

                    Verified

                  </div>

                </div>

                {/* INFO */}
                <div className="mt-6">

                  <h2 className="text-3xl font-black">
                    {user?.name}
                  </h2>

                  <p className="mt-2 text-zinc-400">
                    Full Stack Developer
                  </p>

                </div>

                {/* STATS */}
                <div className="mt-8 grid grid-cols-3 gap-4">

                  <div className="rounded-2xl border border-white/10 bg-black/30 p-4 text-center">

                    <h3 className="text-2xl font-black text-cyan-400">
                      24
                    </h3>

                    <p className="mt-1 text-xs text-zinc-500">
                      Referrals
                    </p>

                  </div>

                  <div className="rounded-2xl border border-white/10 bg-black/30 p-4 text-center">

                    <h3 className="text-2xl font-black text-cyan-400">
                      12
                    </h3>

                    <p className="mt-1 text-xs text-zinc-500">
                      Applications
                    </p>

                  </div>

                  <div className="rounded-2xl border border-white/10 bg-black/30 p-4 text-center">

                    <h3 className="text-2xl font-black text-cyan-400">
                      89%
                    </h3>

                    <p className="mt-1 text-xs text-zinc-500">
                      Profile Score
                    </p>

                  </div>

                </div>

                {/* DETAILS */}
                <div className="mt-8 space-y-5">

                  <div className="flex items-center gap-4 rounded-2xl border border-white/10 bg-black/20 p-4">

                    <div className="rounded-xl bg-white/5 p-3">

                      <Mail size={18} />

                    </div>

                    <div>

                      <p className="text-xs text-zinc-500">
                        Email
                      </p>

                      <h3 className="font-medium">
                        {user?.email}
                      </h3>

                    </div>

                  </div>

                  <div className="flex items-center gap-4 rounded-2xl border border-white/10 bg-black/20 p-4">

                    <div className="rounded-xl bg-white/5 p-3">

                      <Briefcase size={18} />

                    </div>

                    <div>

                      <p className="text-xs text-zinc-500">
                        Role
                      </p>

                      <h3 className="font-medium capitalize">
                        {user?.role || "candidate"}
                      </h3>

                    </div>

                  </div>

                  <div className="flex items-center gap-4 rounded-2xl border border-white/10 bg-black/20 p-4">

                    <div className="rounded-xl bg-white/5 p-3">

                      <MapPin size={18} />

                    </div>

                    <div>

                      <p className="text-xs text-zinc-500">
                        Location
                      </p>

                      <h3 className="font-medium">
                        {user?.location || "Add location"}
                      </h3>

                    </div>

                  </div>

                </div>

                {/* SOCIALS */}
                <div className="mt-8 flex gap-4">

                  <a
                    href={user?.linkedIn || "#"}
                    target="_blank"
                    className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/5 transition hover:border-cyan-400/40 hover:bg-cyan-500/10"
                  >

                    <Link2 size={22} />

                  </a>

                  <button className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/5 transition hover:border-cyan-400/40 hover:bg-cyan-500/10">

                    <Briefcase size={22} />

                  </button>

                  <button className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/5 transition hover:border-cyan-400/40 hover:bg-cyan-500/10">

                    <Globe size={22} />

                  </button>

                </div>

              </div>

            </div>

          </motion.div>

          {/* RIGHT CONTENT */}
          <motion.div
            initial={{
              opacity: 0,
              x: 30,
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            className="space-y-8 lg:col-span-8"
          >

            {/* PROFILE STRENGTH */}
            <div className="rounded-[36px] border border-white/10 bg-white/5 p-8 backdrop-blur-2xl">

              <div className="flex items-center justify-between">

                <div>

                  <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-green-500/10 px-4 py-2 text-sm text-green-400">

                    <Shield size={16} />

                    Profile Strength

                  </div>

                  <h2 className="text-3xl font-black">
                    Your Profile Is Looking Strong 🚀
                  </h2>

                  <p className="mt-3 text-zinc-400">
                    Complete your portfolio and resume
                    to increase recruiter visibility.
                  </p>

                </div>

                <div className="hidden h-32 w-32 items-center justify-center rounded-full border-[10px] border-cyan-400 text-4xl font-black text-cyan-400 md:flex">

                  89%

                </div>

              </div>

            </div>

            {/* RESUME UPLOAD */}
            <div className="rounded-[36px] border border-white/10 bg-white/5 p-8 backdrop-blur-2xl">

              <div className="mb-8 flex items-center justify-between">

                <div>

                  <h2 className="text-3xl font-black">
                    Resume Vault
                  </h2>

                  <p className="mt-3 text-zinc-400">
                    Upload recruiter-ready resume
                    securely to TrustHire cloud.
                  </p>

                </div>

                <div className="hidden rounded-3xl bg-cyan-500/10 p-5 md:block">

                  <UploadCloud
                    className="text-cyan-400"
                    size={42}
                  />

                </div>

              </div>

              {/* UPLOAD AREA */}
              <label className="group flex cursor-pointer flex-col items-center justify-center rounded-[32px] border-2 border-dashed border-white/10 bg-black/20 p-14 text-center transition hover:border-cyan-400/50 hover:bg-cyan-500/[0.03]">

                <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-cyan-400 to-purple-600 transition group-hover:scale-110">

                  <UploadCloud size={42} />

                </div>

                <h3 className="text-3xl font-bold">
                  Drag & Drop Resume
                </h3>

                <p className="mt-4 max-w-xl text-zinc-400">
                  Upload professional PDF resume for
                  verified recruiters and smart referrals.
                </p>

                <input
                  type="file"
                  accept=".pdf"
                  className="hidden"
                  onChange={
                    handleFileChange
                  }
                />

                <div className="mt-8 rounded-2xl border border-white/10 bg-white/10 px-8 py-4 font-semibold transition hover:bg-white/20">

                  Choose Resume

                </div>

              </label>

              {/* FILE */}
              {resume && (

                <div className="mt-6 flex items-center gap-4 rounded-3xl border border-cyan-500/20 bg-cyan-500/10 p-6">

                  <div className="rounded-2xl bg-cyan-500/20 p-4">

                    <FileText
                      className="text-cyan-400"
                    />

                  </div>

                  <div>

                    <h3 className="font-semibold">
                      {resume.name}
                    </h3>

                    <p className="text-sm text-zinc-400">
                      Ready for upload
                    </p>

                  </div>

                </div>

              )}

              {/* BUTTON */}
              <button
                onClick={uploadResume}
                disabled={uploading}
                className="mt-8 w-full rounded-3xl bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 py-5 text-lg font-black text-black transition hover:scale-[1.01] disabled:opacity-50"
              >

                {uploading
                  ? "Uploading Resume..."
                  : "Upload Resume 🚀"}

              </button>

              {/* MESSAGE */}
              {message && (

                <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-5 text-center">

                  {message}

                </div>

              )}

              {/* CURRENT RESUME */}
              {user?.resume && (

                <a
                  href={user.resume}
                  target="_blank"
                  className="mt-8 flex items-center justify-center gap-3 rounded-3xl border border-green-500/20 bg-green-500/10 p-5 text-green-400 transition hover:bg-green-500/20"
                >

                  <FileText />

                  View Uploaded Resume

                </a>

              )}

            </div>

            {/* REFERRER VERIFICATION */}
            <div className="rounded-[36px] border border-white/10 bg-white/5 p-8 backdrop-blur-2xl">

              <div className="mb-8 flex items-center justify-between">

                <div>

                  <h2 className="text-3xl font-black">
                    Referrer Verification
                  </h2>

                  <p className="mt-3 text-zinc-400">
                    Add your company and LinkedIn profile so TrustHire can
                    verify that you are a real employee before showing you as a
                    trusted referrer.
                  </p>

                </div>

                <div className="hidden rounded-3xl bg-cyan-500/10 p-5 md:block">

                  <Shield
                    className="text-cyan-400"
                    size={42}
                  />

                </div>

              </div>

              <div className="grid gap-5 md:grid-cols-2">

                <div>

                  <label className="mb-3 block text-sm font-medium text-zinc-300">
                    Company
                  </label>

                  <div className="flex items-center rounded-2xl border border-white/10 bg-black/30 px-5 focus-within:border-cyan-400">

                    <Building2
                      className="text-zinc-500"
                      size={20}
                    />

                    <input
                      value={profileForm.company}
                      onChange={(event) =>
                        setProfileForm({
                          ...profileForm,
                          company:
                            event.target.value,
                        })
                      }
                      placeholder="Google, Amazon, Microsoft..."
                      className="w-full bg-transparent px-4 py-4 outline-none placeholder:text-zinc-500"
                    />

                  </div>

                </div>

                <div>

                  <label className="mb-3 block text-sm font-medium text-zinc-300">
                    Location
                  </label>

                  <div className="flex items-center rounded-2xl border border-white/10 bg-black/30 px-5 focus-within:border-cyan-400">

                    <MapPin
                      className="text-zinc-500"
                      size={20}
                    />

                    <input
                      value={profileForm.location}
                      onChange={(event) =>
                        setProfileForm({
                          ...profileForm,
                          location:
                            event.target.value,
                        })
                      }
                      placeholder="Bengaluru, India"
                      className="w-full bg-transparent px-4 py-4 outline-none placeholder:text-zinc-500"
                    />

                  </div>

                </div>

              </div>

              <div className="mt-5">

                <label className="mb-3 block text-sm font-medium text-zinc-300">
                  LinkedIn Profile URL
                </label>

                <div className="flex items-center rounded-2xl border border-white/10 bg-black/30 px-5 focus-within:border-cyan-400">

                  <Link2
                    className="text-zinc-500"
                    size={20}
                  />

                  <input
                    value={profileForm.linkedIn}
                    onChange={(event) =>
                      setProfileForm({
                        ...profileForm,
                        linkedIn:
                          event.target.value,
                      })
                    }
                    placeholder="https://www.linkedIn.com/in/your-profile"
                    className="w-full bg-transparent px-4 py-4 outline-none placeholder:text-zinc-500"
                  />

                </div>

              </div>

              <div className="mt-6 rounded-2xl border border-cyan-500/20 bg-cyan-500/10 p-5 text-sm text-cyan-100">
                Verification status:
                {" "}
                <span className="font-bold capitalize text-cyan-300">
                  {user?.employeeVerificationStatus || "not_required"}
                </span>
              </div>

              <button
                onClick={saveProfessionalProfile}
                disabled={savingProfile}
                className="mt-6 w-full rounded-3xl bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 py-5 text-lg font-black text-black transition hover:scale-[1.01] disabled:opacity-50"
              >

                {savingProfile
                  ? "Saving Profile..."
                  : "Save LinkedIn Verification Details"}

              </button>

            </div>

            {/* ACTIVITY */}
            <div className="grid gap-8 md:grid-cols-2">

              <div className="rounded-[32px] border border-white/10 bg-white/5 p-8 backdrop-blur-2xl">

                <div className="mb-6 flex items-center justify-between">

                  <h2 className="text-2xl font-black">
                    Referral Activity
                  </h2>

                  <Star
                    className="text-cyan-400"
                    size={24}
                  />

                </div>

                <div className="space-y-5">

                  {[
                    "Frontend Developer at Google",
                    "Backend Engineer at Amazon",
                    "SDE Intern at Microsoft",
                  ].map((item, index) => (

                    <div
                      key={index}
                      className="rounded-2xl border border-white/10 bg-black/20 p-5"
                    >

                      <h3 className="font-semibold">
                        {item}
                      </h3>

                      <p className="mt-2 text-sm text-zinc-500">
                        Referral requested
                      </p>

                    </div>

                  ))}

                </div>

              </div>

              <div className="rounded-[32px] border border-white/10 bg-white/5 p-8 backdrop-blur-2xl">

                <div className="mb-6 flex items-center justify-between">

                  <h2 className="text-2xl font-black">
                    Profile Insights
                  </h2>

                  <TrendingUp
                    className="text-cyan-400"
                    size={24}
                  />

                </div>

                <div className="space-y-5">

                  {[
                    "Recruiter views increased by 32%",
                    "Resume score above average",
                    "Profile verification completed",
                  ].map((item, index) => (

                    <div
                      key={index}
                      className="flex items-center gap-4 rounded-2xl border border-white/10 bg-black/20 p-5"
                    >

                      <CheckCircle2
                        className="text-green-400"
                        size={20}
                      />

                      <p>{item}</p>

                    </div>

                  ))}

                </div>

              </div>

            </div>

          </motion.div>

        </div>

      </div>

    </main>
  );
}
