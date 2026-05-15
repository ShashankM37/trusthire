"use client";

import { useState } from "react";

import { useRouter } from "next/navigation";

export default function CreateJobPage() {

  const router = useRouter();

  const [loading, setLoading] =
    useState(false);

  const [success, setSuccess] =
    useState("");

  const [error, setError] =
    useState("");

  const [formData, setFormData] =
    useState({
      title: "",
      company: "",
      location: "",
      salary: "",
      jobType: "Full-Time",
      description: "",
      requirements: "",
      skills: "",
    });

  // HANDLE INPUT
  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });
  };

  // CREATE JOB
  const handleCreateJob = async (
    e
  ) => {

    e.preventDefault();

    setLoading(true);

    setError("");

    setSuccess("");

    try {

      const token =
        localStorage.getItem("token");

      const response = await fetch(
        "http://localhost:5000/api/jobs/create",
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",

            Authorization:
              `Bearer ${token}`,
          },

          body: JSON.stringify({
            ...formData,

            requirements:
              formData.requirements
                .split(",")
                .map((req) =>
                  req.trim()
                ),

            skills:
              formData.skills
                .split(",")
                .map((skill) =>
                  skill.trim()
                ),
          }),
        }
      );

      const data = await response.json();

      if (data.success) {

        setSuccess(
          "Job posted successfully 🚀"
        );

        setTimeout(() => {

          router.push("/jobs");

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
    <main className="min-h-screen bg-black text-white relative overflow-hidden px-6 py-12">

      {/* BACKGROUND */}
      <div className="absolute inset-0">

        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-purple-600/20 blur-[120px] rounded-full" />

        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-cyan-500/20 blur-[120px] rounded-full" />

      </div>

      <div className="relative z-10 max-w-4xl mx-auto">

        {/* HEADER */}
        <div className="mb-10">

          <h1 className="text-5xl font-bold">
            Post a Job 🚀
          </h1>

          <p className="text-zinc-400 mt-3">
            Hire elite talent faster with
            TrustHire.
          </p>

        </div>

        {/* SUCCESS */}
        {success && (
          <div className="mb-6 bg-green-500/10 border border-green-500/20 text-green-400 px-4 py-4 rounded-2xl">
            {success}
          </div>
        )}

        {/* ERROR */}
        {error && (
          <div className="mb-6 bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-4 rounded-2xl">
            {error}
          </div>
        )}

        {/* FORM */}
        <form
          onSubmit={handleCreateJob}
          className="grid md:grid-cols-2 gap-6"
        >

          {/* TITLE */}
          <input
            type="text"
            name="title"
            placeholder="Job Title"
            value={formData.title}
            onChange={handleChange}
            required
            className="bg-white/5 border border-white/10 rounded-2xl px-5 py-4 outline-none focus:border-cyan-400"
          />

          {/* COMPANY */}
          <input
            type="text"
            name="company"
            placeholder="Company Name"
            value={formData.company}
            onChange={handleChange}
            required
            className="bg-white/5 border border-white/10 rounded-2xl px-5 py-4 outline-none focus:border-cyan-400"
          />

          {/* LOCATION */}
          <input
            type="text"
            name="location"
            placeholder="Location"
            value={formData.location}
            onChange={handleChange}
            required
            className="bg-white/5 border border-white/10 rounded-2xl px-5 py-4 outline-none focus:border-cyan-400"
          />

          {/* SALARY */}
          <input
            type="text"
            name="salary"
            placeholder="Salary"
            value={formData.salary}
            onChange={handleChange}
            className="bg-white/5 border border-white/10 rounded-2xl px-5 py-4 outline-none focus:border-cyan-400"
          />

          {/* JOB TYPE */}
          <select
            name="jobType"
            value={formData.jobType}
            onChange={handleChange}
            className="md:col-span-2 bg-white/5 border border-white/10 rounded-2xl px-5 py-4 outline-none focus:border-cyan-400"
          >
            <option value="Full-Time">
              Full-Time
            </option>

            <option value="Part-Time">
              Part-Time
            </option>

            <option value="Internship">
              Internship
            </option>

            <option value="Remote">
              Remote
            </option>

          </select>

          {/* SKILLS */}
          <input
            type="text"
            name="skills"
            placeholder="Skills (comma separated)"
            value={formData.skills}
            onChange={handleChange}
            className="md:col-span-2 bg-white/5 border border-white/10 rounded-2xl px-5 py-4 outline-none focus:border-cyan-400"
          />

          {/* REQUIREMENTS */}
          <input
            type="text"
            name="requirements"
            placeholder="Requirements (comma separated)"
            value={
              formData.requirements
            }
            onChange={handleChange}
            className="md:col-span-2 bg-white/5 border border-white/10 rounded-2xl px-5 py-4 outline-none focus:border-cyan-400"
          />

          {/* DESCRIPTION */}
          <textarea
            name="description"
            rows={8}
            placeholder="Job Description"
            value={
              formData.description
            }
            onChange={handleChange}
            required
            className="md:col-span-2 bg-white/5 border border-white/10 rounded-2xl px-5 py-4 outline-none focus:border-cyan-400"
          />

          {/* BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className="md:col-span-2 py-4 rounded-2xl bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 text-black font-bold text-lg hover:scale-[1.01] transition-all duration-300"
          >
            {loading
              ? "Posting Job..."
              : "Post Job"}
          </button>

        </form>

      </div>

    </main>
  );
}