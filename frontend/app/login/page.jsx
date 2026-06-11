"use client";

import { useState } from "react";

import Link from "next/link";

import { useRouter } from "next/navigation";

import { motion } from "framer-motion";
import { apiUrl } from "@/lib/api";

import {
  Eye,
  EyeOff,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  Loader2,
  Mail,
  Lock,
  Star,
  Briefcase,
  ChevronRight,
} from "lucide-react";

export default function LoginPage() {

  const router = useRouter();

  const [showPassword, setShowPassword] =
    useState(false);

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  const [success, setSuccess] =
    useState("");

  const [formData, setFormData] =
    useState(() => {
      const rememberedEmail =
        typeof window !== "undefined"
          ? localStorage.getItem(
              "rememberEmail"
            )
          : "";

      return {
        email:
          rememberedEmail || "",
        password: "",
        remember:
          Boolean(rememberedEmail),
      };
    });

  // =========================
  // HANDLE INPUT
  // =========================
  const handleChange = (e) => {

    const {
      name,
      value,
      type,
      checked,
    } = e.target;

    setFormData({
      ...formData,
      [name]:
        type === "checkbox"
          ? checked
          : value,
    });

  };

  // =========================
  // LOGIN
  // =========================
  const handleLogin =
    async (e) => {

      e.preventDefault();

      setError("");

      setSuccess("");

      setLoading(true);

      try {

        const response =
          await fetch(
            apiUrl("/api/auth/login"),
            {
              method: "POST",

              headers: {
                "Content-Type":
                  "application/json",
              },

              body: JSON.stringify({
                email:
                  formData.email,
                password:
                  formData.password,
              }),
            }
          );

        const data =
          await response.json();

        if (data.success) {

          setSuccess(
            "Login successful 🚀"
          );

          // SAVE TOKEN
          localStorage.setItem(
            "token",
            data.token
          );

          // SAVE USER
          localStorage.setItem(
            "user",
            JSON.stringify(
              data.user
            )
          );

          // REMEMBER EMAIL
          if (
            formData.remember
          ) {

            localStorage.setItem(
              "rememberEmail",
              formData.email
            );

          } else {

            localStorage.removeItem(
              "rememberEmail"
            );

          }

          setTimeout(() => {

            router.push(
              "/dashboard"
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

      <div className="relative z-10 grid min-h-screen lg:grid-cols-2">

        {/* LEFT SIDE */}
        <section className="hidden flex-col justify-between border-r border-white/10 bg-white/[0.03] p-16 backdrop-blur-2xl lg:flex">

          {/* TOP */}
          <div>

            {/* LOGO */}
            <Link
              href="/"
              className="mb-16 flex items-center gap-4"
            >

              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-r from-cyan-400 to-blue-600 shadow-lg shadow-cyan-500/20">

                <Briefcase
                  className="text-black"
                />

              </div>

              <div>

                <h1 className="text-3xl font-black">
                  TrustHire
                </h1>

                <p className="text-sm text-zinc-500">
                  Trusted Career Network
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

                Trusted by startups worldwide

              </div>

              <h2 className="max-w-xl text-6xl font-black leading-[1.05]">

                Welcome Back.
                <br />

                Continue Building
                <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
                  {" "}
                  The Future
                </span>

              </h2>

              <p className="mt-8 max-w-xl text-lg leading-relaxed text-zinc-400">

                Access your premium hiring
                dashboard and continue growing
                with elite talent and trusted
                referrals.

              </p>

            </motion.div>

            {/* STATS */}
            <div className="mt-14 grid grid-cols-3 gap-5">

              {[
                {
                  value:
                    "12K+",
                  label:
                    "Professionals",
                },

                {
                  value:
                    "320+",
                  label:
                    "Companies",
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
                    className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl"
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

          </div>

          {/* TESTIMONIAL */}
          <motion.div
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            className="rounded-[32px] border border-white/10 bg-white/5 p-8 backdrop-blur-2xl"
          >

            {/* STARS */}
            <div className="mb-5 flex items-center gap-2 text-yellow-400">

              {[...Array(5)].map(
                (
                  _,
                  index
                ) => (

                  <Star
                    key={index}
                    size={18}
                    fill="currentColor"
                  />

                )
              )}

            </div>

            <p className="text-lg leading-relaxed text-zinc-300">

              “TrustHire helped us hire
              faster than LinkedIn and
              traditional job boards combined.”

            </p>

            <div className="mt-8 flex items-center gap-4">

              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-r from-cyan-400 to-purple-600 text-xl font-black">

                D

              </div>

              <div>

                <h4 className="font-semibold">
                  Daniel Carter
                </h4>

                <p className="text-sm text-zinc-500">

                  CEO, HyperScale AI

                </p>

              </div>

            </div>

          </motion.div>

        </section>

        {/* RIGHT SIDE */}
        <section className="flex items-center justify-center px-6 py-14">

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
            <div className="relative overflow-hidden rounded-[36px] border border-white/10 bg-white/5 p-8 backdrop-blur-2xl md:p-10">

              {/* TOP */}
              <div className="mb-10">

                <div className="mb-5 flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-r from-cyan-400 to-purple-600 shadow-2xl shadow-cyan-500/20">

                  <ShieldCheck
                    className="text-black"
                    size={36}
                  />

                </div>

                <h1 className="text-5xl font-black leading-tight">

                  Login To
                  <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
                    {" "}
                    TrustHire
                  </span>

                </h1>

                <p className="mt-5 text-lg text-zinc-400">

                  Access your premium dashboard
                  and continue building your
                  professional network.

                </p>

              </div>

              {/* ERROR */}
              {error && (

                <div className="mb-6 rounded-2xl border border-red-500/20 bg-red-500/10 px-5 py-4 text-red-400">

                  {error}

                </div>

              )}

              {/* SUCCESS */}
              {success && (

                <div className="mb-6 rounded-2xl border border-green-500/20 bg-green-500/10 px-5 py-4 text-green-400">

                  {success}

                </div>

              )}

              {/* FORM */}
              <form
                onSubmit={
                  handleLogin
                }
                className="space-y-6"
              >

                {/* EMAIL */}
                <div>

                  <label className="mb-3 block text-sm font-medium text-zinc-300">

                    Email Address

                  </label>

                  <div className="flex items-center rounded-2xl border border-white/10 bg-black/30 px-5 focus-within:border-cyan-400 focus-within:ring-2 focus-within:ring-cyan-400/20">

                    <Mail
                      className="text-zinc-500"
                      size={20}
                    />

                    <input
                      type="email"
                      name="email"
                      value={
                        formData.email
                      }
                      placeholder="you@example.com"
                      onChange={
                        handleChange
                      }
                      required
                      className="w-full bg-transparent px-4 py-5 outline-none placeholder:text-zinc-500"
                    />

                  </div>

                </div>

                {/* PASSWORD */}
                <div>

                  <label className="mb-3 block text-sm font-medium text-zinc-300">

                    Password

                  </label>

                  <div className="group flex items-center rounded-2xl border border-white/10 bg-black/30 px-5 transition focus-within:border-cyan-400 focus-within:ring-2 focus-within:ring-cyan-400/20">

                    <Lock
                      className="text-zinc-500 group-focus-within:text-cyan-400"
                      size={20}
                    />

                    <input
                      type={
                        showPassword
                          ? "text"
                          : "password"
                      }
                      name="password"
                      placeholder="Enter password"
                      onChange={
                        handleChange
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

                        <EyeOff
                          size={20}
                        />

                      ) : (

                        <Eye
                          size={20}
                        />

                      )}

                    </button>

                  </div>

                </div>

                {/* OPTIONS */}
                <div className="flex items-center justify-between text-sm">

                  <label className="flex items-center gap-3 text-zinc-400">

                    <input
                      type="checkbox"
                      name="remember"
                      checked={
                        formData.remember
                      }
                      onChange={
                        handleChange
                      }
                      className="h-4 w-4 accent-cyan-400"
                    />

                    Remember me

                  </label>

                  <Link
                    href="/forgot-password"
                    className="font-medium text-cyan-400 transition hover:text-cyan-300"
                  >

                    Forgot Password?

                  </Link>

                </div>

                {/* BUTTON */}
                <button
                  type="submit"
                  disabled={loading}
                  className="group flex w-full items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 py-5 text-lg font-black text-black transition hover:scale-[1.01] hover:shadow-[0_0_40px_rgba(34,211,238,0.35)] disabled:opacity-70"
                >

                  {loading ? (

                    <>

                      <Loader2
                        className="animate-spin"
                        size={22}
                      />

                      Signing In...

                    </>

                  ) : (

                    <>

                      Continue

                      <ArrowRight
                        className="transition group-hover:translate-x-1"
                        size={20}
                      />

                    </>

                  )}

                </button>

              </form>

              {/* DIVIDER */}
              <div className="my-8 flex items-center gap-4">

                <div className="h-px flex-1 bg-white/10" />

                <span className="text-sm text-zinc-500">

                  or continue with

                </span>

                <div className="h-px flex-1 bg-white/10" />

              </div>

              {/* SOCIAL */}
              <div className="grid grid-cols-3 gap-4">

                {[
                  "Google",
                  "GitHub",
                  "Apple",
                ].map(
                  (
                    item,
                    index
                  ) => (

                    <button
                      key={index}
                      className="rounded-2xl border border-white/10 bg-white/5 py-4 font-semibold transition hover:bg-white/10"
                    >

                      {item}

                    </button>

                  )
                )}

              </div>

              {/* REGISTER */}
              <p className="mt-10 text-center text-zinc-500">

                Don’t have an account?
                {" "}

                <Link
                  href="/register"
                  className="inline-flex items-center gap-1 font-semibold text-cyan-400 transition hover:text-cyan-300"
                >

                  Register

                  <ChevronRight
                    size={16}
                  />

                </Link>

              </p>

            </div>

          </motion.div>

        </section>

      </div>

    </main>
  );
}
