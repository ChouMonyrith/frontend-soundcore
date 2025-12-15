import {
  TrendingUp,
  TrendingDown,
  Music,
  DollarSign,
  Download,
  Users,
} from "lucide-react";

const stats = [
  {
    label: "Total Revenue",
    value: "$12,458",
    change: "+12.5%",
    isPositive: true,
    icon: DollarSign,
    color: "text-green-600",
    bgColor: "bg-green-50",
  },
  {
    label: "Total Sounds",
    value: "1,247",
    change: "+8.2%",
    isPositive: true,
    icon: Music,
    color: "text-purple-600",
    bgColor: "bg-purple-50",
  },
  {
    label: "Downloads",
    value: "8,942",
    change: "+23.1%",
    isPositive: true,
    icon: Download,
    color: "text-blue-600",
    bgColor: "bg-blue-50",
  },
  {
    label: "Active Users",
    value: "2,341",
    change: "-3.2%",
    isPositive: false,
    icon: Users,
    color: "text-orange-600",
    bgColor: "bg-orange-50",
  },
];

export function StatsOverview() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
      {stats.map((stat) => {
        const Icon = stat.icon;
        const TrendIcon = stat.isPositive ? TrendingUp : TrendingDown;

        return (
          <div
            key={stat.label}
            className="group relative bg-neutral-900/50 backdrop-blur-md rounded-2xl border border-white/5 p-6 hover:bg-neutral-900/80 hover:border-violet-500/20 transition-all duration-300"
          >
            <div className="flex items-center justify-between mb-4">
              <div
                className={`${stat.bgColor} ${stat.color} p-3 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110`}
              >
                <Icon className="w-6 h-6" />
              </div>
              <div
                className={`flex items-center gap-1 text-sm font-medium px-2 py-1 rounded-full ${
                  stat.isPositive
                    ? "text-emerald-400 bg-emerald-500/10"
                    : "text-red-400 bg-red-500/10"
                }`}
              >
                <TrendIcon className="w-3 h-3" />
                <span>{stat.change}</span>
              </div>
            </div>
            <div className="text-neutral-400 text-sm font-medium mb-1">
              {stat.label}
            </div>
            <div className="text-2xl font-bold text-white tracking-tight">
              {stat.value}
            </div>
          </div>
        );
      })}
    </div>
  );
}
