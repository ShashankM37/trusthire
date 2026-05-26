"use client";

import { useState } from "react";

import Link from "next/link";

import { useRouter } from "next/navigation";

import { motion } from "framer-motion";

import {
  Eye,
  EyeOff,
  ShieldCheck,
  Sparkles,
  CheckCircle2,
  ArrowRight,
  Loader2,
  Lock,
  Mail,
  User,
  Star,
  Briefcase,
  Globe,
  Users,
  ChevronRight,
} from "lucide-react";

export default function RegisterPage() {

  const router = useRouter();

  const [showPassword, setShowPassword] =
    useState(false);

  const [
    showConfirmPassword,
    setShowConfirmPassword,
  ] = useState(false);

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  const [success, setSuccess] =
    useState("");

  const [formData, setFormData] =
    useState({
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      remember: false,
      terms: false,
    });

  // =========================
  // PASSWORD STRENGTH
  // =========================
  const getPasswordStrength =
    () => {

      const password =
        formData.password;

      if (
        password.length < 6
      ) {

        return {
          text: "Weak",
          color:
            "text-red-400",
          width: "w-1/3",
        };

      }

      if (
        password.length < 10
      ) {

        return {
          text: "Medium",
          color:
            "text-yellow-400",
          width: "w-2/3",
        };

      }

      return {
        text: "Strong",
        color:
          "text-green-400",
        width: "w-full",
      };
    };

  const passwordStrength =
    getPasswordStrength();

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
  // REGISTER
  // =========================
  const handleRegister =
    async (e) => {

      e.preventDefault();

      setError("");

      setSuccess("");

      // VALIDATION
      if (
        formData.password !==
        formData.confirmPassword
      ) {

        return setError(
          "Passwords do not match"
        );

      }

      if (
        !formData.terms
      ) {

        return setError(
          "Please accept Terms & Conditions"
        );

      }

      setLoading(true);

      try {

        const response =
          await fetch(
            "https://trusthire-backend-fbpj.onrender.com/api/auth/register",
            {
              method: "POST",

              headers: {
                "Content-Type":
                  "application/json",
              },

              body: JSON.stringify({
                name:
                  formData.name,
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
            "OTP sent to your email 🚀"
          );

          localStorage.setItem(
            "verifyEmail",
            formData.email
          );

          setTimeout(() => {

            router.push(
              "/verify-otp"
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

                Build Your
                <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
                  {" "}
                  Future Career
                </span>

              </h2>

              <p className="mt-8 max-w-xl text-lg leading-relaxed text-zinc-400">

                Connect with elite companies,
                verified referrals, and global
                startup opportunities through
                TrustHire.

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
              incredible engineers through
              verified referrals instead of
              random applications.”

            </p>

            <div className="mt-8 flex items-center gap-4">

              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-r from-cyan-400 to-purple-600 text-xl font-black">

                S

              </div>

              <div>

                <h4 className="font-semibold">
                  Sarah Mitchell
                </h4>

                <p className="text-sm text-zinc-500">

                  Founder, Nova Labs

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

                  Create
                  <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
                    {" "}
                    Account
                  </span>

                </h1>

                <p className="mt-5 text-lg text-zinc-400">

                  Start your premium onboarding
                  experience with TrustHire.

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
                  handleRegister
                }
                className="space-y-6"
              >

                {/* NAME */}
                <div>

                  <label className="mb-3 block text-sm font-medium text-zinc-300">

                    Full Name

                  </label>

                  <div className="flex items-center rounded-2xl border border-white/10 bg-black/30 px-5 focus-within:border-cyan-400 focus-within:ring-2 focus-within:ring-cyan-400/20">

                    <User
                      className="text-zinc-500"
                      size={20}
                    />

                    <input
                      type="text"
                      name="name"
                      placeholder="John Doe"
                      onChange={
                        handleChange
                      }
                      required
                      className="w-full bg-transparent px-4 py-5 outline-none placeholder:text-zinc-500"
                    />

                  </div>

                </div>

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
                      placeholder="Create secure password"
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

                  {/* STRENGTH */}
                  <div className="mt-4">

                    <div className="mb-2 flex items-center justify-between text-sm">

                      <span className="text-zinc-500">

                        Password Strength

                      </span>

                      <span
                        className={`font-semibold ${passwordStrength.color}`}
                      >

                        {
                          passwordStrength.text
                        }

                      </span>

                    </div>

                    <div className="h-2 overflow-hidden rounded-full bg-white/10">

                      <div
                        className={`h-full rounded-full bg-gradient-to-r from-cyan-400 to-purple-500 transition-all duration-500 ${passwordStrength.width}`}
                      />

                    </div>

                  </div>

                </div>

                {/* CONFIRM PASSWORD */}
                <div>

                  <label className="mb-3 block text-sm font-medium text-zinc-300">

                    Confirm Password

                  </label>

                  <div className="group flex items-center rounded-2xl border border-white/10 bg-black/30 px-5 transition focus-within:border-cyan-400 focus-within:ring-2 focus-within:ring-cyan-400/20">

                    <Lock
                      className="text-zinc-500 group-focus-within:text-cyan-400"
                      size={20}
                    />

                    <input
                      type={
                        showConfirmPassword
                          ? "text"
                          : "password"
                      }
                      name="confirmPassword"
                      placeholder="Confirm password"
                      onChange={
                        handleChange
                      }
                      required
                      className="w-full bg-transparent px-4 py-5 outline-none placeholder:text-zinc-500"
                    />

                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword(
                          !showConfirmPassword
                        )
                      }
                      className="text-zinc-500 transition hover:text-cyan-400"
                    >

                      {showConfirmPassword ? (

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

                {/* CHECKBOXES */}
                <div className="space-y-4 text-sm text-zinc-400">

                  <label className="flex items-center gap-3">

                    <input
                      type="checkbox"
                      name="remember"
                      onChange={
                        handleChange
                      }
                      className="h-4 w-4 accent-cyan-400"
                    />

                    Remember this device

                  </label>

                  <label className="flex items-center gap-3">

                    <input
                      type="checkbox"
                      name="terms"
                      onChange={
                        handleChange
                      }
                      className="h-4 w-4 accent-cyan-400"
                    />

                    I agree to the
                    {" "}

                    <span className="cursor-pointer font-medium text-cyan-400">

                      Terms &
                      Conditions

                    </span>

                  </label>

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

                      Creating Account...

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

              {/* LOGIN */}
              <p className="mt-10 text-center text-zinc-500">

                Already have an account?
                {" "}

                <Link
                  href="/login"
                  className="inline-flex items-center gap-1 font-semibold text-cyan-400 transition hover:text-cyan-300"
                >

                  Login

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