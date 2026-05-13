"use client";

import { useEffect, useState } from "react";

export default function DashboardPage() {
  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");
  const [location, setLocation] = useState("");

  const [referrals, setReferrals] = useState([]);

  // FETCH REFERRALS
  useEffect(() => {
    fetchReferrals();
  }, []);

  const fetchReferrals = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/referrals");

      const data = await res.json();

      setReferrals(data.referrals);
    } catch (error) {
      console.log(error);
    }
  };

  // ADD REFERRAL
  const addReferral = async () => {
    if (!company || !role || !location) {
      alert("Fill all fields");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/referrals", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          company,
          role,
          location,
        }),
      });

      const data = await res.json();

      if (data.success) {
        alert("Referral Added 🚀");

        setCompany("");
        setRole("");
        setLocation("");

        fetchReferrals();
      }
    } catch (error) {
      console.log(error);
    }
  };

  // DELETE REFERRAL
  const deleteReferral = async (id) => {
    try {
      const res = await fetch(
        `http://localhost:5000/api/referrals/${id}`,
        {
          method: "DELETE",
        }
      );

      const data = await res.json();

      if (data.success) {
        alert("Referral Deleted");

        fetchReferrals();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white p-8">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-5xl font-bold">
            TrustHire Dashboard 🚀
          </h1>

          <p className="text-gray-400 mt-2">
            Your trusted referral platform
          </p>
        </div>

        <button
          className="bg-red-500 hover:bg-red-400 px-5 py-3 rounded-xl font-bold"
          onClick={() => {
            localStorage.removeItem("token");
            window.location.href = "/login";
          }}
        >
          Logout
        </button>
      </div>

      {/* STATS */}
      <div className="grid md:grid-cols-3 gap-6 mb-10">

        <div className="bg-[#111827] p-6 rounded-2xl border border-cyan-500/20 shadow-lg">
          <h2 className="text-gray-400">
            Total Referrals
          </h2>

          <p className="text-4xl font-bold text-cyan-400 mt-3">
            {referrals.length}
          </p>
        </div>

        <div className="bg-[#111827] p-6 rounded-2xl border border-green-500/20 shadow-lg">
          <h2 className="text-gray-400">
            Applications
          </h2>

          <p className="text-4xl font-bold text-green-400 mt-3">
            34
          </p>
        </div>

        <div className="bg-[#111827] p-6 rounded-2xl border border-purple-500/20 shadow-lg">
          <h2 className="text-gray-400">
            Successful Hires
          </h2>

          <p className="text-4xl font-bold text-purple-400 mt-3">
            5
          </p>
        </div>

      </div>

      {/* ADD REFERRAL */}
      <div className="bg-[#111827] border border-cyan-500/20 p-8 rounded-3xl shadow-2xl">

        <h2 className="text-3xl font-bold mb-6">
          Add Referral
        </h2>

        <div className="space-y-5">

          <input
            type="text"
            placeholder="Company"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            className="w-full p-4 rounded-xl bg-black border border-gray-700 focus:outline-none focus:border-cyan-400"
          />

          <input
            type="text"
            placeholder="Role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full p-4 rounded-xl bg-black border border-gray-700 focus:outline-none focus:border-cyan-400"
          />

          <input
            type="text"
            placeholder="Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full p-4 rounded-xl bg-black border border-gray-700 focus:outline-none focus:border-cyan-400"
          />

          <button
            onClick={addReferral}
            className="w-full py-4 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-500 text-black font-bold text-lg hover:scale-105 transition duration-300"
          >
            Add Referral
          </button>

        </div>
      </div>

      {/* REFERRAL LIST */}
      <div className="mt-14">

        <h2 className="text-4xl font-bold mb-8">
          Latest Referrals
        </h2>

        <div className="grid md:grid-cols-2 gap-6">

          {referrals.map((item) => (

            <div
              key={item._id}
              className="bg-[#111827] border border-cyan-500/20 p-6 rounded-2xl shadow-xl hover:scale-105 transition duration-300"
            >

              <h2 className="text-2xl font-bold text-cyan-400">
                {item.role}
              </h2>

              <p className="text-gray-300 mt-2 text-lg">
                {item.company}
              </p>

              <p className="text-gray-500 mt-1">
                {item.location}
              </p>

              <div className="flex gap-4 mt-5">

                <button className="px-5 py-2 bg-cyan-500 hover:bg-cyan-400 rounded-xl text-black font-semibold transition">
                  Apply Referral
                </button>

                <button
                  onClick={() => deleteReferral(item._id)}
                  className="px-5 py-2 bg-red-500 hover:bg-red-400 rounded-xl text-white font-semibold transition"
                >
                  Delete
                </button>

              </div>

            </div>

          ))}

        </div>

      </div>

    </div>
  );
}