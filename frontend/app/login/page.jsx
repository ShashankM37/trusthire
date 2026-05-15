"use client";

import { useState } from "react";

import Link from "next/link";

import { useRouter } from "next/navigation";

import {
  Eye,
  EyeOff,
  CheckCircle2,
} from "lucide-react";

export default function LoginPage() {

  const router = useRouter();

  const [showPassword, setShowPassword] =
    useState(false);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const [success, setSuccess] =
    useState("");

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    remember: false,
  });

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

  // LOGIN
  const handleLogin = async (e) => {

    e.preventDefault();

    setError("");

    setSuccess("");

    setLoading(true);

    try {

      const response = await fetch(
        "http://localhost:5000/api/auth/login",
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({
            email: formData.email,
            password:
              formData.password,
          }),
        }
      );

      const data = await response.json();

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
          JSON.stringify(data.user)
        );

        // REMEMBER EMAIL
        if (formData.remember) {

          localStorage.setItem(
            "rememberEmail",
            formData.email
          );

        } else {

          localStorage.removeItem(
            "rememberEmail"
          );

        }

        // REDIRECT
        setTimeout(() => {
          router.push("/dashboard");
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

            {/* LOGO */}
            <div className="flex items-center gap-3 mb-10">

              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-cyan-400 to-purple-600 shadow-2xl" />

              <h1 className="text-3xl font-bold tracking-tight">
                TrustHire
              </h1>

            </div>

            {/* HEADLINE */}
            <h2 className="text-6xl font-bold leading-tight max-w-xl">

              Welcome Back.
              <br />

              Continue Building
              <br />

              The Future.

            </h2>

            <p className="text-zinc-400 text-lg mt-8 max-w-lg leading-relaxed">

              Access your premium hiring
              dashboard and continue scaling your
              startup with elite talent.

            </p>

          </div>

          {/* SOCIAL PROOF */}
          <div className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-3xl p-8 max-w-lg">

            <div className="flex items-center gap-2 text-cyan-400 mb-4">

              <CheckCircle2 size={20} />

              <span className="text-sm">
                Trusted by founders worldwide
              </span>

            </div>

            <p className="text-lg leading-relaxed text-zinc-300">

              “TrustHire helped us hire faster
              than LinkedIn and traditional job
              boards combined.”

            </p>

            <div className="mt-6 flex items-center gap-4">

              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-cyan-400" />

              <div>

                <h4 className="font-semibold">
                  Daniel Carter
                </h4>

                <p className="text-sm text-zinc-400">
                  CEO, HyperScale AI
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
                  Login
                </h1>

                <p className="text-zinc-400 mt-2">
                  Access your premium dashboard.
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
                onSubmit={handleLogin}
                className="space-y-5"
              >

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

                {/* OPTIONS */}
                <div className="flex items-center justify-between text-sm">

                  <label className="flex items-center gap-3 text-zinc-400">

                    <input
                      type="checkbox"
                      name="remember"
                      onChange={handleChange}
                      className="accent-cyan-400"
                    />

                    Remember me

                  </label>

                  <Link
                    href="/forgot-password"
                    className="text-cyan-400 hover:text-cyan-300"
                  >
                    Forgot Password?
                  </Link>

                </div>

                {/* BUTTON */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 rounded-2xl bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 text-black font-bold text-lg hover:scale-[1.02] hover:shadow-[0_0_40px_rgba(34,211,238,0.35)] transition-all duration-300"
                >
                  {loading
                    ? "Signing In..."
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

              {/* REGISTER */}
              <p className="text-center text-zinc-400 mt-8">

                Don’t have an account?{" "}

                <Link
                  href="/register"
                  className="text-cyan-400 hover:text-cyan-300 font-medium"
                >
                  Register
                </Link>

              </p>

            </div>

          </div>

        </div>

      </div>

    </main>
  );
}