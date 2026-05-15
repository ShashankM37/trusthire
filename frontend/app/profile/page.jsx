"use client";

import { useEffect, useState } from "react";

import {
  UploadCloud,
  FileText,
  CheckCircle2,
  User,
  Mail,
} from "lucide-react";

export default function ProfilePage() {

  const [user, setUser] =
    useState(null);

  const [resume, setResume] =
    useState(null);

  const [uploading, setUploading] =
    useState(false);

  const [message, setMessage] =
    useState("");

  // =========================
  // GET USER
  // =========================
  useEffect(() => {

    const storedUser =
      localStorage.getItem("user");

    if (storedUser) {

      setUser(
        JSON.parse(storedUser)
      );

    }

  }, []);

  // =========================
  // HANDLE FILE CHANGE
  // =========================
  const handleFileChange = (e) => {

    setResume(
      e.target.files[0]
    );

  };

  // =========================
  // UPLOAD RESUME
  // =========================
  const uploadResume = async () => {

    if (!resume) {

      return alert(
        "Please select a PDF file"
      );

    }

    const token =
      localStorage.getItem("token");

    const formData =
      new FormData();

    formData.append(
      "resume",
      resume
    );

    try {

      setUploading(true);

      const response =
        await fetch(
          "http://localhost:5000/api/upload/resume",
          {
            method: "POST",

            headers: {
              Authorization: `Bearer ${token}`,
            },

            body: formData,
          }
        );

      const data =
        await response.json();

      if (data.success) {

        setMessage(
          "Resume uploaded successfully 🚀"
        );

        // UPDATE USER
        const updatedUser = {
          ...user,
          resume: data.resume,
        };

        localStorage.setItem(
          "user",
          JSON.stringify(updatedUser)
        );

        setUser(updatedUser);

      } else {

        setMessage(
          data.message
        );

      }

    } catch (error) {

      console.log(error);

      setMessage(
        "Upload failed"
      );

    } finally {

      setUploading(false);

    }

  };

  return (
    <main className="min-h-screen bg-black text-white relative overflow-hidden">

      {/* BACKGROUND */}
      <div className="absolute inset-0 overflow-hidden">

        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-cyan-500/20 blur-[140px] rounded-full" />

        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-purple-600/20 blur-[140px] rounded-full" />

      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-16">

        {/* HEADER */}
        <div className="mb-12">

          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-cyan-500/20 bg-cyan-500/10 text-cyan-400 text-sm mb-6">
            <CheckCircle2 size={16} />
            TrustHire Profile
          </div>

          <h1 className="text-5xl md:text-6xl font-bold leading-tight">
            Your Professional
            <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
              {" "}Profile
            </span>
          </h1>

          <p className="text-zinc-400 mt-4 text-lg max-w-2xl">
            Manage your resume, applications,
            and professional presence in one place.
          </p>

        </div>

        {/* PROFILE CARD */}
        <div className="grid lg:grid-cols-3 gap-8">

          {/* LEFT */}
          <div className="lg:col-span-1">

            <div className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-2xl">

              {/* AVATAR */}
              <div className="w-28 h-28 rounded-full bg-gradient-to-br from-cyan-400 to-purple-600 flex items-center justify-center text-4xl font-bold mb-6">
                {user?.name?.charAt(0)}
              </div>

              {/* USER INFO */}
              <div className="space-y-5">

                <div className="flex items-center gap-4">

                  <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
                    <User size={20} />
                  </div>

                  <div>
                    <p className="text-zinc-400 text-sm">
                      Full Name
                    </p>

                    <h3 className="font-semibold text-lg">
                      {user?.name}
                    </h3>
                  </div>

                </div>

                <div className="flex items-center gap-4">

                  <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
                    <Mail size={20} />
                  </div>

                  <div>
                    <p className="text-zinc-400 text-sm">
                      Email
                    </p>

                    <h3 className="font-semibold text-lg">
                      {user?.email}
                    </h3>
                  </div>

                </div>

              </div>

            </div>

          </div>

          {/* RIGHT */}
          <div className="lg:col-span-2">

            <div className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-2xl">

              <h2 className="text-3xl font-bold mb-3">
                Upload Resume
              </h2>

              <p className="text-zinc-400 mb-8">
                Upload your latest PDF resume
                for recruiters and job applications.
              </p>

              {/* UPLOAD BOX */}
              <label className="group border-2 border-dashed border-white/10 hover:border-cyan-400/50 transition-all duration-300 rounded-3xl p-12 flex flex-col items-center justify-center text-center cursor-pointer bg-white/5 hover:bg-white/[0.07]">

                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-cyan-400 to-purple-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <UploadCloud size={36} />
                </div>

                <h3 className="text-2xl font-semibold mb-3">
                  Drag & Drop Resume
                </h3>

                <p className="text-zinc-400 mb-5">
                  PDF only • Max 5MB
                </p>

                <input
                  type="file"
                  accept=".pdf"
                  className="hidden"
                  onChange={
                    handleFileChange
                  }
                />

                <div className="px-6 py-3 rounded-2xl bg-white/10 border border-white/10 hover:bg-white/20 transition">
                  Choose File
                </div>

              </label>

              {/* FILE INFO */}
              {resume && (

                <div className="mt-6 flex items-center gap-4 p-5 rounded-2xl bg-cyan-500/10 border border-cyan-500/20">

                  <FileText
                    className="text-cyan-400"
                  />

                  <div>
                    <p className="font-medium">
                      {resume.name}
                    </p>

                    <p className="text-sm text-zinc-400">
                      Ready to upload
                    </p>
                  </div>

                </div>

              )}

              {/* BUTTON */}
              <button
                onClick={uploadResume}
                disabled={uploading}
                className="mt-8 w-full py-5 rounded-3xl bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 text-black text-lg font-bold hover:scale-[1.01] transition-all duration-300 disabled:opacity-50"
              >
                {uploading
                  ? "Uploading Resume..."
                  : "Upload Resume 🚀"}
              </button>

              {/* MESSAGE */}
              {message && (

                <div className="mt-6 p-5 rounded-2xl bg-white/5 border border-white/10 text-center">
                  {message}
                </div>

              )}

              {/* CURRENT RESUME */}
              {user?.resume && (

                <a
                  href={user.resume}
                  target="_blank"
                  className="mt-8 flex items-center justify-center gap-3 p-5 rounded-2xl bg-green-500/10 border border-green-500/20 text-green-400 hover:bg-green-500/20 transition"
                >
                  <FileText />
                  View Uploaded Resume
                </a>

              )}

            </div>

          </div>

        </div>

      </div>

    </main>
  );
}