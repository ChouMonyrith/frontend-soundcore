import {
  TrendingUp,
  TrendingDown,
  Music,
  DollarSign,
  Download,
  Users,
} from "lucide-react";

const iconMap = {
  DollarSign,
  Music,
  Download,
  Users,
};

export function StatsOverview({ stats = [] }) {
  // Configuration map based on label
  const config = {
    "Total Revenue": {
      icon: DollarSign,
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    "Total Sounds": {
      icon: Music,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
    },
    "Total Downloads": {
      icon: Download,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    "Active Customers": {
      icon: Users,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
    },
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
      {stats.map((stat) => {
        const conf = config[stat.label] || {
          icon: Music,
          color: "text-gray-600",
          bgColor: "bg-gray-50",
        };
        const Icon = conf.icon;

        return (
          <div
            key={stat.label}
            className="group relative bg-neutral-900/50 backdrop-blur-md rounded-2xl border border-white/5 p-6 hover:bg-neutral-900/80 hover:border-violet-500/20 transition-all duration-300"
          >
            <div className="flex items-center justify-between mb-4">
              <div
                className={`${conf.bgColor} ${conf.color} p-3 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110`}
              >
                <Icon className="w-6 h-6" />
              </div>
              {stat.change && (
                <div
                  className={`flex items-center gap-1 text-sm font-medium px-2 py-1 rounded-full ${
                    stat.isPositive
                      ? "text-emerald-400 bg-emerald-500/10"
                      : "text-red-400 bg-red-500/10"
                  }`}
                >
                  {/* <TrendIcon className="w-3 h-3" /> */}
                  <span>{stat.change}</span>
                </div>
              )}
            </div>
            <div className="text-neutral-400 text-sm font-medium mb-1">
              {stat.label}
            </div>
            <div className="text-2xl font-bold text-white tracking-tight">
              {stat.formatted}
            </div>
          </div>
        );
      })}
    </div>
  );
}
