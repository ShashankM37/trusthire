"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const router = useRouter();

  useEffect(() => {
    const token =
      localStorage.getItem("token");
    const storedUser =
      localStorage.getItem("user");

    if (!token || !storedUser) {
      router.push("/login");
      return;
    }

    const user = JSON.parse(storedUser);

    if (user.role === "admin") {
      router.push("/admin");
      return;
    }

    if (
      user.role === "employee" ||
      user.role === "recruiter"
    ) {
      router.push("/dashboard/referrer");
      return;
    }

    router.push("/dashboard/candidate");
  }, [router]);

  return (
    <main className="flex min-h-screen items-center justify-center bg-black text-white">
      Routing to your TrustHire workspace...
    </main>
  );
}
