"use client";

import { useEffect, useState } from "react";

import { useRouter } from "next/navigation";

import Link from "next/link";

import { motion } from "framer-motion";

import {
  Eye,
  EyeOff,
  ShieldCheck,
  LockKeyhole,
  Sparkles,
  CheckCircle2,
  Loader2,
  ArrowRight,
  Mail,
  KeyRound,
  ChevronLeft,
  BadgeCheck,
} from "lucide-react";

export default function ResetPasswordPage() {

  const router = useRouter();

  const [email, setEmail] =
    useState("");

  const [otp, setOtp] =
    useState("");

  const [newPassword, setNewPassword] =
    useState("");

  const [showPassword, setShowPassword] =
    useState(false);

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  const [success, setSuccess] =
    useState("");

  // =========================
  // LOAD EMAIL
  // =========================
  useEffect(() => {

    const storedEmail =
      localStorage.getItem(
        "resetEmail"
      );

    if (storedEmail) {

      setEmail(
        storedEmail
      );

    }

  }, []);

  // =========================
  // RESET PASSWORD
  // =========================
  const handleResetPassword =
    async (e) => {

      e.preventDefault();

      setError("");

      setSuccess("");

      setLoading(true);

      try {

        const response =
          await fetch(
            "http://localhost:5000/api/auth/reset-password",
            {
              method: "POST",

              headers: {
                "Content-Type":
                  "application/json",
              },

              body: JSON.stringify({
                email,
                otp,
                newPassword,
              }),
            }
          );

        const data =
          await response.json();

        if (data.success) {

          setSuccess(
            "Password reset successful 🚀"
          );

          localStorage.removeItem(
            "resetEmail"
          );

          setTimeout(() => {

            router.push(
              "/login"
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
    <main className="relative flex min-h-screen overflow-hidden bg-black text-white">

      {/* BACKGROUND */}
      <div className="absolute inset-0 -z-10">

        <div className="absolute left-[5%] top-[10%] h-[450px] w-[450px] rounded-full bg-cyan-500/20 blur-[120px]" />

        <div className="absolute bottom-[5%] right-[5%] h-[500px] w-[500px] rounded-full bg-purple-600/20 blur-[140px]" />

        <div className="absolute left-[40%] top-[40%] h-[300px] w-[300px] rounded-full bg-blue-500/10 blur-[120px]" />

      </div>

      {/* GRID */}
      <div className="absolute inset-0 -z-10 opacity-[0.05] bg-[linear-gradient(to_right,#ffffff22_1px,transparent_1px),linear-gradient(to_bottom,#ffffff22_1px,transparent_1px)] bg-[size:45px_45px]" />

      {/* LEFT SIDE */}
      <section className="hidden w-1/2 flex-col justify-between border-r border-white/10 bg-white/[0.03] p-14 backdrop-blur-2xl lg:flex">

        {/* TOP */}
        <div>

          {/* LOGO */}
          <Link
            href="/"
            className="mb-16 flex items-center gap-4"
          >

            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-r from-cyan-400 to-blue-600 shadow-lg shadow-cyan-500/20">

              <ShieldCheck className="text-black" />

            </div>

            <div>

              <h1 className="text-3xl font-black">
                TrustHire
              </h1>

              <p className="text-sm text-zinc-500">
                Trust Based Hiring
              </p>

            </div>

          </Link>

          {/* HERO */}
          <motion.div
            initial={{
              opacity: 0,
              y: 30,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.7,
            }}
          >

            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-cyan-500/20 bg-cyan-500/10 px-5 py-2 text-sm text-cyan-400">

              <Sparkles size={16} />

              Enterprise Grade Security

            </div>

            <h2 className="max-w-xl text-6xl font-black leading-[1.05]">

              Create A New
              <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
                {" "}
                Secure Password
              </span>

            </h2>

            <p className="mt-8 max-w-xl text-lg leading-relaxed text-zinc-400">

              Protect your professional identity
              with advanced password encryption
              and secure OTP verification.

            </p>

          </motion.div>

        </div>

        {/* FEATURES */}
        <div className="space-y-5">

          {[
            "Encrypted account recovery system",
            "OTP protected password reset flow",
            "Trusted authentication infrastructure",
          ].map((item, index) => (

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
              className="flex items-center gap-4 rounded-2xl border border-white/10 bg-black/20 p-5"
            >

              <div className="rounded-xl bg-cyan-500/10 p-3">

                <CheckCircle2
                  className="text-cyan-400"
                  size={20}
                />

              </div>

              <p className="text-zinc-300">
                {item}
              </p>

            </motion.div>

          ))}

        </div>

      </section>

      {/* RIGHT SIDE */}
      <section className="flex flex-1 items-center justify-center px-6 py-14">

        <motion.div
          initial={{
            opacity: 0,
            y: 30,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.6,
          }}
          className="relative w-full max-w-xl"
        >

          {/* GLOW */}
          <div className="absolute -inset-[1px] rounded-[36px] bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600 opacity-30 blur-xl" />

          {/* CARD */}
          <div className="relative overflow-hidden rounded-[36px] border border-white/10 bg-white/5 p-10 backdrop-blur-2xl">

            {/* TOP */}
            <div className="mb-10">

              <Link
                href="/forgot-password"
                className="mb-8 inline-flex items-center gap-2 text-zinc-400 transition hover:text-cyan-400"
              >

                <ChevronLeft size={18} />

                Back

              </Link>

              <div className="mb-5 flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-r from-cyan-400 to-purple-600 shadow-2xl shadow-cyan-500/20">

                <LockKeyhole
                  className="text-black"
                  size={36}
                />

              </div>

              <h1 className="text-5xl font-black leading-tight">

                Reset
                <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
                  {" "}
                  Password
                </span>

              </h1>

              <p className="mt-5 text-lg text-zinc-400">

                Enter the OTP sent to your email
                and create a secure new password.

              </p>

            </div>

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

            {/* FORM */}
            <form
              onSubmit={
                handleResetPassword
              }
              className="space-y-6"
            >

              {/* EMAIL */}
              <div>

                <label className="mb-3 block text-sm font-medium text-zinc-300">

                  Email Address

                </label>

                <div className="flex items-center rounded-2xl border border-white/10 bg-black/30 px-5">

                  <Mail
                    className="text-zinc-500"
                    size={20}
                  />

                  <input
                    type="email"
                    value={email}
                    disabled
                    className="w-full bg-transparent px-4 py-5 text-zinc-500 outline-none"
                  />

                </div>

              </div>

              {/* OTP */}
              <div>

                <label className="mb-3 block text-sm font-medium text-zinc-300">

                  Verification OTP

                </label>

                <div className="flex items-center rounded-2xl border border-white/10 bg-black/30 px-5 focus-within:border-cyan-400 focus-within:ring-2 focus-within:ring-cyan-400/20">

                  <BadgeCheck
                    className="text-zinc-500"
                    size={20}
                  />

                  <input
                    type="text"
                    placeholder="Enter OTP"
                    value={otp}
                    onChange={(e) =>
                      setOtp(
                        e.target.value
                      )
                    }
                    required
                    className="w-full bg-transparent px-4 py-5 outline-none placeholder:text-zinc-500"
                  />

                </div>

              </div>

              {/* PASSWORD */}
              <div>

                <label className="mb-3 block text-sm font-medium text-zinc-300">

                  New Password

                </label>

                <div className="group flex items-center rounded-2xl border border-white/10 bg-black/30 px-5 transition focus-within:border-cyan-400 focus-within:ring-2 focus-within:ring-cyan-400/20">

                  <KeyRound
                    className="text-zinc-500 group-focus-within:text-cyan-400"
                    size={20}
                  />

                  <input
                    type={
                      showPassword
                        ? "text"
                        : "password"
                    }
                    placeholder="Create strong password"
                    value={newPassword}
                    onChange={(e) =>
                      setNewPassword(
                        e.target.value
                      )
                    }
                    required
                    className="w-full bg-transparent px-4 py-5 outline-none placeholder:text-zinc-500"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowPassword(
                        !showPassword
                      )
                    }
                    className="text-zinc-500 transition hover:text-cyan-400"
                  >

                    {showPassword ? (

                      <EyeOff size={20} />

                    ) : (

                      <Eye size={20} />

                    )}

                  </button>

                </div>

                {/* PASSWORD HINT */}
                <p className="mt-3 text-sm text-zinc-500">

                  Use at least 8 characters with
                  numbers and symbols for stronger security.

                </p>

              </div>

              {/* BUTTON */}
              <button
                type="submit"
                disabled={loading}
                className="group flex w-full items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 py-5 text-lg font-black text-black transition hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-70"
              >

                {loading ? (

                  <>

                    <Loader2
                      className="animate-spin"
                      size={22}
                    />

                    Resetting Password...

                  </>

                ) : (

                  <>

                    Reset Password

                    <ArrowRight
                      className="transition group-hover:translate-x-1"
                      size={20}
                    />

                  </>

                )}

              </button>

            </form>

            {/* FOOTER */}
            <div className="mt-10 border-t border-white/10 pt-8 text-center">

              <p className="text-zinc-500">

                Back to
                {" "}

                <Link
                  href="/login"
                  className="font-semibold text-cyan-400 transition hover:text-cyan-300"
                >

                  Login

                </Link>

              </p>

            </div>

          </div>

        </motion.div>

      </section>

    </main>
  );
}