"use client";

import { useEffect, useState } from "react";

import { useRouter } from "next/navigation";

export default function DashboardPage() {

  const router = useRouter();

  const [user, setUser] = useState(null);

  useEffect(() => {

    const token =
      localStorage.getItem("token");

    const storedUser =
      localStorage.getItem("user");

    // NOT LOGGED IN
    if (!token) {

      router.push("/login");

    } else {

      setUser(JSON.parse(storedUser));

    }

  }, [router]);

  // LOGOUT
  const handleLogout = () => {

    localStorage.removeItem("token");

    localStorage.removeItem("user");

    router.push("/login");
  };

  if (!user) {

    return (
      <main className="min-h-screen bg-black flex items-center justify-center text-white">
        Loading...
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black text-white relative overflow-hidden">

      {/* BACKGROUND */}
      <div className="absolute inset-0">

        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-purple-600/20 blur-[120px] rounded-full" />

        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-cyan-500/20 blur-[120px] rounded-full" />

      </div>

      {/* CONTENT */}
      <div className="relative z-10 p-10">

        {/* NAVBAR */}
        <div className="flex items-center justify-between mb-12">

          <div>

            <h1 className="text-4xl font-bold">
              TrustHire Dashboard 🚀
            </h1>

            <p className="text-zinc-400 mt-2">
              Welcome back,
              {" "}
              {user?.name}
            </p>

          </div>

          <button
            onClick={handleLogout}
            className="px-6 py-3 rounded-2xl bg-gradient-to-r from-red-500 to-pink-500 font-semibold hover:scale-105 transition-all"
          >
            Logout
          </button>

        </div>

        {/* STATS */}
        <div className="grid md:grid-cols-3 gap-6">

          <div className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-3xl p-8">

            <h2 className="text-zinc-400">
              Total Applications
            </h2>

            <p className="text-5xl font-bold mt-4">
              128
            </p>

          </div>

          <div className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-3xl p-8">

            <h2 className="text-zinc-400">
              Interviews Scheduled
            </h2>

            <p className="text-5xl font-bold mt-4">
              24
            </p>

          </div>

          <div className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-3xl p-8">

            <h2 className="text-zinc-400">
              Active Hires
            </h2>

            <p className="text-5xl font-bold mt-4">
              8
            </p>

          </div>

        </div>

      </div>

    </main>
  );
}