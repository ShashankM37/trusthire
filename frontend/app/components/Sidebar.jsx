"use client";

import Link from "next/link";

import {
  LayoutDashboard,
  Briefcase,
  Users,
  User,
} from "lucide-react";

export default function Sidebar() {

  const links = [
    {
      name: "Dashboard",
      href: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      name: "Jobs",
      href: "/jobs",
      icon: Briefcase,
    },
    {
      name: "Referrals",
      href: "/referrals",
      icon: Users,
    },
    {
      name: "Profile",
      href: "/profile",
      icon: User,
    },
  ];

  return (
    <aside className="hidden lg:flex flex-col w-72 border-r border-white/10 bg-white/[0.03] backdrop-blur-2xl p-6">

      <div className="mb-10">

        <h1 className="text-3xl font-black text-white">
          TrustHire
        </h1>

        <p className="text-zinc-500 text-sm mt-2">
          Student Career Platform
        </p>

      </div>

      <div className="space-y-3">

        {links.map((link, index) => {

          const Icon = link.icon;

          return (
            <Link
              key={index}
              href={link.href}
              className="flex items-center gap-4 rounded-2xl border border-white/5 bg-white/[0.03] px-5 py-4 text-zinc-300 transition-all duration-300 hover:border-cyan-400/30 hover:bg-cyan-400/10 hover:text-cyan-400"
            >

              <Icon size={20} />

              {link.name}

            </Link>
          );
        })}

      </div>

    </aside>
  );
}