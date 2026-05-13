"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.push("/login");
    }
  }, []);

  const logout = () => {
    localStorage.removeItem("token");

    router.push("/login");
  };

  return (
    <div className="h-screen bg-black text-white flex flex-col items-center justify-center">
      <h1 className="text-5xl font-bold mb-4">
        Welcome to TrustHire 🚀
      </h1>

      <p className="text-xl mb-8">
        Your trusted referral platform
      </p>

      <button
        onClick={logout}
        className="bg-red-500 px-6 py-3 rounded-lg"
      >
        Logout
      </button>
    </div>
  );
}