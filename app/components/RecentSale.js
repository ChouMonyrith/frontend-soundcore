import { ArrowRight, TrendingUp } from "lucide-react";
import Link from "next/link";

const recentSales = [
  {
    id: 1,
    customer: "Sarah Johnson",
    sound: "Ocean Waves",
    amount: "$4.99",
    time: "2 minutes ago",
    avatar: "SJ",
    color: "bg-blue-500",
  },
  {
    id: 2,
    customer: "Michael Chen",
    sound: "Forest Birds",
    amount: "$5.99",
    time: "15 minutes ago",
    avatar: "MC",
    color: "bg-green-500",
  },
  {
    id: 3,
    customer: "Emma Williams",
    sound: "Thunder Storm",
    amount: "$4.99",
    time: "1 hour ago",
    avatar: "EW",
    color: "bg-purple-500",
  },
  {
    id: 4,
    customer: "James Brown",
    sound: "Rain on Window",
    amount: "$3.99",
    time: "2 hours ago",
    avatar: "JB",
    color: "bg-orange-500",
  },
  {
    id: 5,
    customer: "Lisa Anderson",
    sound: "Campfire Crackle",
    amount: "$3.99",
    time: "3 hours ago",
    avatar: "LA",
    color: "bg-pink-500",
  },
];

export function RecentSale() {
  return (
    <div className="bg-neutral-900/50 backdrop-blur-md rounded-2xl border border-white/5 p-6 md:p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-xl font-bold text-white mb-1">Recent Sales</h2>
          <p className="text-sm text-neutral-400">
            You made{" "}
            <span className="text-violet-400 font-semibold">247 sales</span>{" "}
            this month
          </p>
        </div>
        <Link
          href="/sales"
          className="text-sm text-violet-400 hover:text-violet-300 flex items-center gap-1 transition-colors"
        >
          View All <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      <div className="space-y-2">
        {recentSales.map((sale) => (
          <div
            key={sale.id}
            className="flex items-center justify-between p-4 rounded-xl hover:bg-white/5 border border-transparent hover:border-white/5 transition-all group cursor-pointer"
          >
            <div className="flex items-center gap-4">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-bold shadow-lg bg-linear-to-br ${sale.color}`}
              >
                {sale.avatar}
              </div>
              <div>
                <div className="text-white font-medium group-hover:text-violet-200 transition-colors">
                  {sale.customer}
                </div>
                <div className="text-xs text-neutral-500">{sale.sound}</div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-white font-bold">{sale.amount}</div>
              <div className="text-xs text-neutral-500">{sale.time}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
