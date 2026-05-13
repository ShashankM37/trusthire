"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function DashboardPage() {

  const router = useRouter();

  const API_URL = "http://localhost:5000/api/referrals";

  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");
  const [location, setLocation] = useState("");

  const [referrals, setReferrals] = useState([]);

  const [editingId, setEditingId] = useState(null);

  const [search, setSearch] = useState("");


  // FETCH REFERRALS
  const fetchReferrals = async () => {

    try {

      const res = await fetch(API_URL);

      const data = await res.json();

      if (data.success) {
        setReferrals(data.referrals);
      }

    } catch (error) {
      console.log(error);
    }

  };


  useEffect(() => {

    const token = localStorage.getItem("token");

    if (!token) {
      router.push("/login");
    }

    fetchReferrals();

  }, []);


  // ADD REFERRAL
  const addReferral = async () => {

    try {

      const res = await fetch(API_URL, {

        method: "POST",

        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token"),
        },

        body: JSON.stringify({
          company,
          role,
          location,
        }),

      });

      const data = await res.json();

      if (data.success) {

        setCompany("");
        setRole("");
        setLocation("");

        fetchReferrals();

      } else {
        alert(data.message);
      }

    } catch (error) {
      console.log(error);
    }

  };


  // DELETE REFERRAL
  const deleteReferral = async (id) => {

    try {

      await fetch(`${API_URL}/${id}`, {

        method: "DELETE",

        headers: {
          Authorization: localStorage.getItem("token"),
        },

      });

      fetchReferrals();

    } catch (error) {
      console.log(error);
    }

  };


  // EDIT REFERRAL
  const editReferral = (referral) => {

    setEditingId(referral._id);

    setCompany(referral.company);
    setRole(referral.role);
    setLocation(referral.location);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

  };


  // UPDATE REFERRAL
  const updateReferral = async () => {

    try {

      const res = await fetch(`${API_URL}/${editingId}`, {

        method: "PUT",

        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token"),
        },

        body: JSON.stringify({
          company,
          role,
          location,
        }),

      });

      const data = await res.json();

      if (data.success) {

        setEditingId(null);

        setCompany("");
        setRole("");
        setLocation("");

        fetchReferrals();

      }

    } catch (error) {
      console.log(error);
    }

  };


  // LOGOUT
  const logoutUser = () => {

    localStorage.removeItem("token");

    router.push("/login");

  };


  // FILTERED REFERRALS
  const filteredReferrals = referrals.filter((item) => {

    return (
      item.company.toLowerCase().includes(search.toLowerCase()) ||
      item.role.toLowerCase().includes(search.toLowerCase()) ||
      item.location.toLowerCase().includes(search.toLowerCase())
    );

  });


  return (

    <div className="min-h-screen bg-black text-white p-8">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-10">

        <div>
          <h1 className="text-5xl font-bold">
            TrustHire 🚀
          </h1>

          <p className="text-gray-400 mt-2">
            Trusted Referral Platform
          </p>
        </div>

        <button
          onClick={logoutUser}
          className="bg-red-500 hover:bg-red-600 px-5 py-2 rounded-xl font-semibold"
        >
          Logout
        </button>

      </div>


      {/* FORM */}
      <div className="bg-[#111827] border border-cyan-500/20 rounded-3xl p-8 mb-10 shadow-2xl">

        <h2 className="text-4xl font-bold mb-8">
          {editingId ? "Edit Referral ✏️" : "Add Referral 🔥"}
        </h2>


        <div className="space-y-5">

          <input
            type="text"
            placeholder="Company"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            className="w-full p-4 rounded-2xl bg-black border border-gray-700 outline-none"
          />


          <input
            type="text"
            placeholder="Role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full p-4 rounded-2xl bg-black border border-gray-700 outline-none"
          />


          <input
            type="text"
            placeholder="Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full p-4 rounded-2xl bg-black border border-gray-700 outline-none"
          />


          {
            editingId ? (

              <button
                onClick={updateReferral}
                className="w-full bg-yellow-500 hover:bg-yellow-600 py-4 rounded-2xl font-bold text-lg"
              >
                Update Referral
              </button>

            ) : (

              <button
                onClick={addReferral}
                className="w-full bg-cyan-500 hover:bg-cyan-600 py-4 rounded-2xl font-bold text-lg"
              >
                Add Referral
              </button>

            )
          }

        </div>

      </div>


      {/* SEARCH */}
      <input
        type="text"
        placeholder="Search referrals..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full p-4 rounded-2xl bg-[#111827] border border-cyan-500/20 text-white outline-none mb-10"
      />


      {/* REFERRALS */}
      <div>

        <h2 className="text-4xl font-bold mb-8">
          Latest Referrals
        </h2>


        <div className="grid md:grid-cols-2 gap-6">

          {
            filteredReferrals.map((item) => (

              <div
                key={item._id}
                className="bg-[#111827] border border-white/10 rounded-3xl p-6 shadow-xl"
              >

                <h3 className="text-3xl font-bold text-cyan-400 mb-2">
                  {item.role}
                </h3>

                <p className="text-xl mb-1">
                  {item.company}
                </p>

                <p className="text-gray-400 mb-6">
                  {item.location}
                </p>


                <div className="flex gap-4">

                  <button
                    onClick={() => editReferral(item)}
                    className="bg-yellow-500 hover:bg-yellow-600 px-5 py-2 rounded-xl font-semibold"
                  >
                    Edit
                  </button>


                  <button
                    onClick={() => deleteReferral(item._id)}
                    className="bg-red-500 hover:bg-red-600 px-5 py-2 rounded-xl font-semibold"
                  >
                    Delete
                  </button>

                </div>

              </div>

            ))
          }

        </div>

      </div>

    </div>

  );

}