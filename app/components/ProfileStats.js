import { Music2, Users, UserPlus, Layers } from "lucide-react";

export default function ProfileStats({ stats }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      <StatCard label="Total Sounds" value={stats.sounds} icon={Music2} />
      <StatCard label="Followers" value={stats.followers} icon={Users} />
      <StatCard label="Following" value={stats.following} icon={UserPlus} />
      <StatCard
        label="Total Sales"
        value={stats.sales}
        icon={Layers}
        highlight
      />
    </div>
  );
}

function StatCard({ label, value, icon: Icon, highlight }) {
  return (
    <div
      className={`p-4 rounded-2xl border ${
        highlight
          ? "bg-violet-600/10 border-violet-500/20"
          : "bg-neutral-900/50 border-white/5"
      }`}
    >
      <div className="flex items-center gap-2 mb-2 text-neutral-400 text-xs font-medium uppercase tracking-wider">
        <Icon className="w-3.5 h-3.5" />
        {label}
      </div>
      <div
        className={`text-2xl font-bold ${
          highlight ? "text-violet-400" : "text-white"
        }`}
      >
        {value}
      </div>
    </div>
  );
}
