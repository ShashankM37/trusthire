"use client";

import { useState, useEffect } from "react";

import { useRouter } from "next/navigation";

export default function VerifyOTPPage() {

  const router = useRouter();

  const [otp, setOtp] = useState("");

  const [email, setEmail] = useState("");

  const [loading, setLoading] =
    useState(false);

  const [error, setError] = useState("");

  const [success, setSuccess] =
    useState("");

  useEffect(() => {

    const storedEmail =
      localStorage.getItem("verifyEmail");

    if (storedEmail) {
      setEmail(storedEmail);
    }

  }, []);

  // VERIFY OTP
  const handleVerifyOTP = async (e) => {

    e.preventDefault();

    setLoading(true);

    setError("");

    setSuccess("");

    try {

      const response = await fetch(
        "http://localhost:5000/api/auth/verify-otp",
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({
            email,
            otp,
          }),
        }
      );

      const data = await response.json();

      if (data.success) {

        setSuccess(
          "Email verified successfully 🚀"
        );

        setTimeout(() => {
          router.push("/login");
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
    <main className="min-h-screen bg-black flex items-center justify-center px-6 text-white relative overflow-hidden">

      {/* BACKGROUND */}
      <div className="absolute inset-0">

        <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-purple-600/20 blur-[120px] rounded-full" />

        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-cyan-500/20 blur-[120px] rounded-full" />

      </div>

      {/* CARD */}
      <div className="relative z-10 w-full max-w-md">

        <div className="absolute -inset-[1px] rounded-[32px] bg-gradient-to-r from-cyan-500 via-purple-500 to-blue-500 blur opacity-30" />

        <div className="relative bg-white/5 border border-white/10 backdrop-blur-2xl rounded-[32px] p-8 shadow-2xl">

          <h1 className="text-4xl font-bold mb-3">
            Verify OTP
          </h1>

          <p className="text-zinc-400 mb-8">
            Enter the verification code sent to
            your email.
          </p>

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
            onSubmit={handleVerifyOTP}
            className="space-y-5"
          >

            {/* EMAIL */}
            <input
              type="email"
              value={email}
              disabled
              className="w-full bg-black/40 border border-white/10 rounded-2xl px-5 py-4 outline-none text-zinc-500"
            />

            {/* OTP */}
            <input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) =>
                setOtp(e.target.value)
              }
              required
              className="w-full bg-black/40 border border-white/10 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all rounded-2xl px-5 py-4 outline-none"
            />

            {/* BUTTON */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 text-black font-bold text-lg hover:scale-[1.02] transition-all duration-300"
            >
              {loading
                ? "Verifying..."
                : "Verify OTP"}
            </button>

          </form>

        </div>

      </div>

    </main>
  );
}