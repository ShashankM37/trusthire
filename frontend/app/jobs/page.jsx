"use client";

import { useEffect, useState } from "react";

import Link from "next/link";

export default function JobsPage() {

  const [jobs, setJobs] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  // FETCH JOBS
  useEffect(() => {

    const fetchJobs = async () => {

      try {

        const response = await fetch(
          "https://trusthire-backend-fbpj.onrender.com/api/jobs"
        );

        const data =
          await response.json();

        if (data.success) {

          setJobs(data.jobs);

        }

      } catch (error) {

        console.log(error);

      } finally {

        setLoading(false);

      }
    };

    fetchJobs();

  }, []);

  if (loading) {

    return (
      <main className="min-h-screen bg-black flex items-center justify-center text-white">
        Loading jobs...
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

      <div className="relative z-10 max-w-7xl mx-auto">

        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-12 gap-6">

          <div>

            <h1 className="text-5xl font-bold">
              Explore Jobs 🚀
            </h1>

            <p className="text-zinc-400 mt-3">
              Discover startup opportunities
              and elite tech roles.
            </p>

          </div>

          <Link
            href="/create-job"
            className="px-6 py-4 rounded-2xl bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 text-black font-bold hover:scale-[1.02] transition-all duration-300 text-center"
          >
            Post a Job
          </Link>

        </div>

        {/* JOBS GRID */}
        <div className="grid lg:grid-cols-2 gap-8">

          {jobs.length > 0 ? (

            jobs.map((job) => (

              <div
                key={job._id}
                className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-xl hover:border-cyan-400/40 transition-all duration-300"
              >

                {/* TITLE */}
                <h2 className="text-3xl font-bold mb-3">
                  {job.title}
                </h2>

                {/* COMPANY */}
                <p className="text-cyan-400 text-lg mb-2">
                  {job.company}
                </p>

                {/* LOCATION */}
                <p className="text-zinc-400 mb-4">
                  📍 {job.location}
                </p>

                {/* JOB TYPE */}
                <div className="inline-block px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-sm mb-5">
                  {job.jobType}
                </div>

                {/* DESCRIPTION */}
                <p className="text-zinc-300 leading-relaxed mb-6 line-clamp-4">
                  {job.description}
                </p>

                {/* SKILLS */}
                <div className="flex flex-wrap gap-3 mb-8">

                  {job.skills?.map(
                    (skill, index) => (

                      <span
                        key={index}
                        className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm"
                      >
                        {skill}
                      </span>

                    )
                  )}

                </div>

                {/* FOOTER */}
                <div className="flex items-center justify-between">

                  <div>

                    <p className="text-zinc-500 text-sm">
                      Posted by
                    </p>

                    <p className="font-semibold">
                      {
                        job.postedBy
                          ?.name
                      }
                    </p>

                  </div>

                  <Link
                    href={`/jobs/${job._id}`}
                    className="px-5 py-3 rounded-2xl bg-gradient-to-r from-cyan-400 to-purple-600 text-black font-semibold hover:scale-105 transition-all"
                  >
                    View Job
                  </Link>

                </div>

              </div>

            ))

          ) : (

            <div className="text-zinc-400">
              No jobs found.
            </div>

          )}

        </div>

      </div>

    </main>
  );
}