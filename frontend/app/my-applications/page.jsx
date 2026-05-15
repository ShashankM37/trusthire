"use client";

import { useEffect, useState } from "react";

import Link from "next/link";

export default function MyApplicationsPage() {

  const [applications, setApplications] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");


  // =========================
  // FETCH APPLICATIONS
  // =========================
  useEffect(() => {

    const fetchApplications =
      async () => {

        try {

          const token =
            localStorage.getItem(
              "token"
            );

          const response =
            await fetch(
              "http://localhost:5000/api/applications/my-applications",
              {
                headers: {
                  Authorization:
                    `Bearer ${token}`,
                },
              }
            );

          const data =
            await response.json();

          if (data.success) {

            setApplications(
              data.applications
            );

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

    fetchApplications();

  }, []);


  // =========================
  // LOADING
  // =========================
  if (loading) {

    return (
      <main className="min-h-screen bg-black flex items-center justify-center text-white text-2xl">
        Loading applications...
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

      <div className="relative z-10 max-w-6xl mx-auto">

        {/* HEADER */}
        <div className="mb-12">

          <h1 className="text-5xl font-bold">
            My Applications 🚀
          </h1>

          <p className="text-zinc-400 mt-3">
            Track all the jobs you've applied to.
          </p>

        </div>


        {/* ERROR */}
        {error && (

          <div className="mb-6 bg-red-500/10 border border-red-500/20 text-red-400 px-5 py-4 rounded-2xl">
            {error}
          </div>

        )}


        {/* EMPTY STATE */}
        {applications.length === 0 ? (

          <div className="bg-white/5 border border-white/10 rounded-3xl p-12 text-center">

            <h2 className="text-3xl font-bold mb-4">
              No Applications Yet
            </h2>

            <p className="text-zinc-400 mb-8">
              Start applying to jobs and build your career 🚀
            </p>

            <Link
              href="/jobs"
              className="inline-block px-6 py-4 rounded-2xl bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 text-black font-bold"
            >
              Explore Jobs
            </Link>

          </div>

        ) : (

          <div className="grid lg:grid-cols-2 gap-8">

            {applications.map(
              (application) => {

                const job =
                  application.job;

                return (

                  <div
                    key={application._id}
                    className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-xl hover:border-cyan-400/30 transition-all duration-300"
                  >

                    {/* TITLE */}
                    <h2 className="text-3xl font-bold mb-3">
                      {job?.title}
                    </h2>

                    {/* COMPANY */}
                    <p className="text-cyan-400 text-lg mb-2">
                      {job?.company}
                    </p>

                    {/* LOCATION */}
                    <p className="text-zinc-400 mb-5">
                      📍 {job?.location}
                    </p>

                    {/* STATUS */}
                    <div className="inline-block px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-sm mb-6">
                      {application.status}
                    </div>

                    {/* SKILLS */}
                    <div className="flex flex-wrap gap-3 mb-8">

                      {job?.skills?.map(
                        (
                          skill,
                          index
                        ) => (

                          <span
                            key={index}
                            className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm"
                          >
                            {skill}
                          </span>

                        )
                      )}

                    </div>

                    {/* BUTTON */}
                    <Link
                      href={`/jobs/${job?._id}`}
                      className="inline-block px-5 py-3 rounded-2xl bg-gradient-to-r from-cyan-400 to-purple-600 text-black font-semibold hover:scale-105 transition-all"
                    >
                      View Job
                    </Link>

                  </div>

                );
              }
            )}

          </div>

        )}

      </div>

    </main>
  );
}