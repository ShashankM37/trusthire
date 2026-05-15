"use client";

import { useState } from "react";

import Link from "next/link";

import { useRouter } from "next/navigation";

import {
  Eye,
  EyeOff,
  CheckCircle2,
} from "lucide-react";

export default function RegisterPage() {

  const router = useRouter();

  const [showPassword, setShowPassword] =
    useState(false);

  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const [success, setSuccess] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    remember: false,
    terms: false,
  });

  // PASSWORD STRENGTH
  const getPasswordStrength = () => {

    if (formData.password.length < 6)
      return "Weak";

    if (formData.password.length < 10)
      return "Medium";

    return "Strong";
  };

  const passwordStrength =
    getPasswordStrength();

  // HANDLE INPUT
  const handleChange = (e) => {

    const { name, value, type, checked } =
      e.target;

    setFormData({
      ...formData,
      [name]:
        type === "checkbox"
          ? checked
          : value,
    });
  };

  // REGISTER
  const handleRegister = async (e) => {

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

    if (!formData.terms) {

      return setError(
        "Please accept Terms & Conditions"
      );

    }

    setLoading(true);

    try {

      const response = await fetch(
        "http://localhost:5000/api/auth/register",
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            password: formData.password,
          }),
        }
      );

      const data = await response.json();

      if (data.success) {

        setSuccess(
          "OTP sent to your email 🚀"
        );

        localStorage.setItem(
          "verifyEmail",
          formData.email
        );

        setTimeout(() => {
          router.push("/verify-otp");
        }, 1500);

      } else {

        setError(data.message);

      }

    } catch (error) {

      console.log(error);

      setError("Server Error");

    } finally {

      setLoading(false);

    }
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-black text-white">

      {/* BACKGROUND */}
      <div className="absolute inset-0">

        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-purple-600/30 blur-[120px] rounded-full" />

        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-cyan-500/20 blur-[120px] rounded-full" />

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.08)_1px,transparent_1px)] bg-[size:32px_32px]" />

      </div>

      <div className="relative z-10 grid lg:grid-cols-2 min-h-screen">

        {/* LEFT SIDE */}
        <div className="hidden lg:flex flex-col justify-between p-16">

          <div>

            <div className="flex items-center gap-3 mb-10">

              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-cyan-400 to-purple-600 shadow-2xl" />

              <h1 className="text-3xl font-bold tracking-tight">
                TrustHire
              </h1>

            </div>

            <h2 className="text-6xl font-bold leading-tight max-w-xl">

              Hire Smarter.
              <br />

              Build Faster.
              <br />

              Scale Globally.

            </h2>

            <p className="text-zinc-400 text-lg mt-8 max-w-lg leading-relaxed">

              The premium hiring platform helping
              startups discover elite developers,
              designers, and creators faster than
              ever before.

            </p>

          </div>

          {/* TESTIMONIAL */}
          <div className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-3xl p-8 max-w-lg">

            <div className="flex items-center gap-2 text-cyan-400 mb-4">

              <CheckCircle2 size={20} />

              <span className="text-sm">
                Trusted by 12,000+ startups
              </span>

            </div>

            <p className="text-lg leading-relaxed text-zinc-300">

              “TrustHire completely transformed
              our recruitment workflow. We hired
              our first 10 engineers in less than
              2 weeks.”

            </p>

            <div className="mt-6 flex items-center gap-4">

              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-cyan-400" />

              <div>

                <h4 className="font-semibold">
                  Sarah Mitchell
                </h4>

                <p className="text-sm text-zinc-400">
                  Founder, Nova Labs
                </p>

              </div>

            </div>

          </div>

        </div>

        {/* RIGHT SIDE */}
        <div className="flex items-center justify-center px-6 py-12">

          <div className="relative w-full max-w-xl">

            {/* GLOW */}
            <div className="absolute -inset-[1px] rounded-[32px] bg-gradient-to-r from-cyan-500 via-purple-500 to-blue-500 blur opacity-30" />

            {/* CARD */}
            <div className="relative bg-white/5 border border-white/10 backdrop-blur-2xl rounded-[32px] p-8 md:p-10 shadow-2xl">

              <div className="mb-8">

                <h1 className="text-4xl font-bold">
                  Create Account
                </h1>

                <p className="text-zinc-400 mt-2">
                  Start your premium onboarding
                  experience.
                </p>

              </div>

              {/* ERROR */}
              {error && (
                <div className="mb-5 bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-3 rounded-2xl">
                  {error}
                </div>
              )}

              {/* SUCCESS */}
              {success && (
                <div className="mb-5 bg-green-500/10 border border-green-500/20 text-green-400 px-4 py-3 rounded-2xl">
                  {success}
                </div>
              )}

              <form
                onSubmit={handleRegister}
                className="space-y-5"
              >

                {/* NAME */}
                <input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  onChange={handleChange}
                  required
                  className="w-full bg-black/40 border border-white/10 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all rounded-2xl px-5 py-4 outline-none"
                />

                {/* EMAIL */}
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  onChange={handleChange}
                  required
                  className="w-full bg-black/40 border border-white/10 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all rounded-2xl px-5 py-4 outline-none"
                />

                {/* PASSWORD */}
                <div className="relative">

                  <input
                    type={
                      showPassword
                        ? "text"
                        : "password"
                    }
                    name="password"
                    placeholder="Password"
                    onChange={handleChange}
                    required
                    className="w-full bg-black/40 border border-white/10 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all rounded-2xl px-5 py-4 outline-none"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowPassword(
                        !showPassword
                      )
                    }
                    className="absolute right-5 top-1/2 -translate-y-1/2 text-zinc-400"
                  >
                    {showPassword ? (
                      <EyeOff size={20} />
                    ) : (
                      <Eye size={20} />
                    )}
                  </button>

                </div>

                {/* PASSWORD STRENGTH */}
                <div className="text-sm">

                  <span className="text-zinc-400">
                    Password Strength:
                  </span>

                  <span
                    className={`ml-2 font-semibold ${
                      passwordStrength ===
                      "Weak"
                        ? "text-red-400"
                        : passwordStrength ===
                          "Medium"
                        ? "text-yellow-400"
                        : "text-green-400"
                    }`}
                  >
                    {passwordStrength}
                  </span>

                </div>

                {/* CONFIRM PASSWORD */}
                <div className="relative">

                  <input
                    type={
                      showConfirmPassword
                        ? "text"
                        : "password"
                    }
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    onChange={handleChange}
                    required
                    className="w-full bg-black/40 border border-white/10 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all rounded-2xl px-5 py-4 outline-none"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowConfirmPassword(
                        !showConfirmPassword
                      )
                    }
                    className="absolute right-5 top-1/2 -translate-y-1/2 text-zinc-400"
                  >
                    {showConfirmPassword ? (
                      <EyeOff size={20} />
                    ) : (
                      <Eye size={20} />
                    )}
                  </button>

                </div>

                {/* CHECKBOXES */}
                <div className="flex flex-col gap-4 text-sm text-zinc-400">

                  <label className="flex items-center gap-3">

                    <input
                      type="checkbox"
                      name="remember"
                      onChange={handleChange}
                      className="accent-cyan-400"
                    />

                    Remember me

                  </label>

                  <label className="flex items-center gap-3">

                    <input
                      type="checkbox"
                      name="terms"
                      onChange={handleChange}
                      className="accent-cyan-400"
                    />

                    I agree to Terms &
                    Conditions

                  </label>

                </div>

                {/* BUTTON */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 rounded-2xl bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 text-black font-bold text-lg hover:scale-[1.02] hover:shadow-[0_0_40px_rgba(34,211,238,0.35)] transition-all duration-300"
                >
                  {loading
                    ? "Creating Account..."
                    : "Continue"}
                </button>

              </form>

              {/* DIVIDER */}
              <div className="flex items-center gap-4 my-8">

                <div className="flex-1 h-px bg-white/10" />

                <span className="text-zinc-500 text-sm">
                  or continue with
                </span>

                <div className="flex-1 h-px bg-white/10" />

              </div>

              {/* SOCIAL BUTTONS */}
              <div className="grid grid-cols-3 gap-4">

                <button className="bg-white/5 border border-white/10 rounded-2xl py-4 flex items-center justify-center hover:bg-white/10 transition-all font-semibold">
                  Google
                </button>

                <button className="bg-white/5 border border-white/10 rounded-2xl py-4 flex items-center justify-center hover:bg-white/10 transition-all font-semibold">
                  GitHub
                </button>

                <button className="bg-white/5 border border-white/10 rounded-2xl py-4 flex items-center justify-center hover:bg-white/10 transition-all font-semibold">
                  Apple
                </button>

              </div>

              {/* LOGIN */}
              <p className="text-center text-zinc-400 mt-8">

                Already have an account?{" "}

                <Link
                  href="/login"
                  className="text-cyan-400 hover:text-cyan-300 font-medium"
                >
                  Login
                </Link>

              </p>

            </div>

          </div>

        </div>

      </div>

    </main>
  );
}