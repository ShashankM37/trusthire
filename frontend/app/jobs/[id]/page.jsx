"use client";

import { useEffect, useState } from "react";

import { useParams } from "next/navigation";
import { apiUrl } from "@/lib/api";

export default function SingleJobPage() {

  const params = useParams();

  const [job, setJob] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  const [applying, setApplying] =
    useState(false);

  const [message, setMessage] =
    useState("");

  // =========================
  // FETCH SINGLE OPPORTUNITY
  // =========================
  useEffect(() => {

    const fetchJob = async () => {

      try {

        const response = await fetch(apiUrl(`/api/opportunities/${params.id}`));

        const data = await response.json();

        if (data.success) {

          setJob(data.opportunity);

        }

      } catch (error) {

        console.log(error);

      } finally {

        setLoading(false);

      }
    };

    if (params.id) {

      fetchJob();

    }

  }, [params.id]);


  // =========================
  // SEND REFERRAL REQUEST
  // =========================
  const handleRequestReferral = async () => {

    try {

      setApplying(true);

      setMessage("");

      const token = localStorage.getItem("token");

      if (!token) {

        setMessage("Please login first");

        return;
      }

      // Ensure candidate has uploaded a resume
      const storedUser = localStorage.getItem("user");
      const parsedUser = storedUser ? JSON.parse(storedUser) : null;

      const hasResume = parsedUser && ((parsedUser.resume && (parsedUser.resume.url || typeof parsedUser.resume === "string")) || parsedUser.resume);

      if (!hasResume) {
        setMessage("Please upload your resume in your profile before requesting a referral.");
        setApplying(false);
        return;
      }

      const response = await fetch(apiUrl("/api/referral-requests"), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          receiverId: job.createdBy?._id,
          opportunityId: job._id,
          message: `Requesting referral for opportunity ${job._id} - ${job.title}`,
        }),
      });

      const data = await response.json();

      setMessage(data.message || (data.success ? "Request sent" : "Request failed"));

    } catch (error) {

      console.log(error);

      setMessage("Server Error");

    } finally {

      setApplying(false);

    }
  };


  // =========================
  // LOADING
  // =========================
  if (loading) {

    return (
      <main className="min-h-screen bg-black flex items-center justify-center text-white text-2xl">
        Loading job...
      </main>
    );
  }


  // =========================
  // JOB NOT FOUND
  // =========================
  if (!job) {

    return (
      <main className="min-h-screen bg-black flex items-center justify-center text-white text-2xl">
        Job not found.
      </main>
    );
  }


  return (
    <main className="min-h-screen bg-black text-white relative overflow-hidden px-6 py-12">

      {/* BACKGROUND */}
      <div className="absolute inset-0">

        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-purple-600/20 blur-[120px] rounded-full" />

        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-cyan-500/20 blur-[120px] rounded-full" />

      </div>

      <div className="relative z-10 max-w-5xl mx-auto">

        {/* HEADER */}
        <div className="mb-10">

          <h1 className="text-5xl md:text-6xl font-bold leading-tight">{job.title}</h1>

          <p className="text-2xl text-cyan-400 mt-4">{job.company}</p>

          <div className="flex flex-wrap gap-6 mt-6 text-zinc-400">

            <span>📍 {job.location}</span>

            <span>🪪 Experience: {job.experienceRequirement || "Not specified"}</span>

            <span>🎯 Slots: {job.referralSlots ?? 1}</span>

          </div>

        </div>


        {/* DESCRIPTION */}
        <div className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-xl mb-8">

          <h2 className="text-3xl font-bold mb-6">
            Job Description
          </h2>

          <p className="text-zinc-300 leading-relaxed whitespace-pre-line">{job.description}</p>

        </div>


        {/* REQUIREMENTS */}
        <div className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-xl mb-8">

          <h2 className="text-3xl font-bold mb-6">
            Requirements
          </h2>

          <div className="flex flex-wrap gap-4">{job.requiredSkills?.map((s, index) => (<div key={index} className="px-5 py-3 rounded-2xl bg-white/5 border border-white/10">{s}</div>))}</div>

        </div>


        {/* SKILLS */}
        <div className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-xl mb-8">

          <h2 className="text-3xl font-bold mb-6">
            Required Skills
          </h2>

          <div className="flex flex-wrap gap-4">

            {job.skills?.map(
              (skill, index) => (

                <div
                  key={index}
                  className="px-5 py-3 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400"
                >
                  {skill}
                </div>

              )
            )}

          </div>

        </div>


        {/* RECRUITER */}
        <div className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-xl mb-8">

          <h2 className="text-3xl font-bold mb-6">
            Recruiter
          </h2>

            <div className="flex items-center gap-5">

            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-cyan-400 to-purple-600" />

            <div>

              <h3 className="text-2xl font-semibold">{job.createdBy?.name}</h3>

              <p className="text-zinc-400">{job.createdBy?.email}</p>

            </div>

          </div>

        </div>


        {/* MESSAGE */}
        {message && (

          <div className="mb-6 bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 px-5 py-4 rounded-2xl">
            {message}
          </div>

        )}


        {/* APPLY BUTTON */}
        <button onClick={handleRequestReferral} disabled={applying} className="w-full py-5 rounded-3xl bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 text-black text-xl font-bold hover:scale-[1.01] transition-all duration-300 disabled:opacity-50">
          {applying ? "Sending..." : "Request Referral 🚀"}
        </button>

      </div>

    </main>
  );
}
