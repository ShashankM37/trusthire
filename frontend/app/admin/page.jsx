"use client";

import { useEffect, useState } from "react";
import { apiUrl } from "@/lib/api";

export default function AdminPage() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    fetch(apiUrl("/api/admin/dashboard"))
      .then((res) => res.json())
      .then((data) => setStats(data));
  }, []);

  if (!stats)
    return <h1>Loading...</h1>;

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">
        Admin Dashboard
      </h1>

      <div className="grid grid-cols-3 gap-4">

        <div className="border p-6 rounded-lg">
          <h2>Total Users</h2>
          <p className="text-2xl font-bold">
            {stats.totalUsers}
          </p>
        </div>

        <div className="border p-6 rounded-lg">
          <h2>Total Jobs</h2>
          <p className="text-2xl font-bold">
            {stats.totalJobs}
          </p>
        </div>

        <div className="border p-6 rounded-lg">
          <h2>Total Applications</h2>
          <p className="text-2xl font-bold">
            {stats.totalApplications}
          </p>
        </div>

      </div>
    </div>
  );
}
