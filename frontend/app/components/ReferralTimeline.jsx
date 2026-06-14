import { CheckCircle2 } from "lucide-react";

const statusOrder = {
  Pending: 0,
  Accepted: 1,
  Referred: 2,
  "Interview Received": 3,
  "Interview Completed": 4,
  "Offer Received": 5,
  Hired: 6,
};

const stages = [
  { status: "Pending", label: "Request Sent" },
  { status: "Accepted", label: "Accepted" },
  { status: "Referred", label: "Referred" },
  { status: "Interview Received", label: "Interview Received" },
  { status: "Interview Completed", label: "Interview Completed" },
  { status: "Offer Received", label: "Offer Received" },
  { status: "Hired", label: "Hired" },
];

export default function ReferralTimeline({ status, createdAt, updatedAt }) {
  const currentIndex = statusOrder[status] ?? 0;

  return (
    <div className="rounded-3xl border border-white/10 bg-black/30 p-4">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3 text-sm text-zinc-400">
        <span className="font-semibold text-white">Referral Timeline</span>
        <span>{status || "Pending"}</span>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {stages.map((stage, index) => {
          const completed = index <= currentIndex;
          return (
            <div
              key={stage.status}
              className={`flex items-center gap-3 rounded-2xl border px-4 py-3 transition ${
                completed
                  ? "border-cyan-500/20 bg-cyan-500/10 text-cyan-200"
                  : "border-white/10 bg-white/5 text-zinc-400"
              }`}
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-black/50">
                {completed ? (
                  <CheckCircle2 size={16} />
                ) : (
                  <span className="text-sm font-semibold">{index + 1}</span>
                )}
              </div>
              <div>
                <p className="text-sm font-semibold">{stage.label}</p>
                {completed && index === 0 ? (
                  <p className="text-[11px] text-zinc-400">
                    Sent {createdAt ? new Date(createdAt).toLocaleDateString() : "—"}
                  </p>
                ) : completed && index === currentIndex ? (
                  <p className="text-[11px] text-zinc-400">
                    Updated {updatedAt ? new Date(updatedAt).toLocaleDateString() : "—"}
                  </p>
                ) : null}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
