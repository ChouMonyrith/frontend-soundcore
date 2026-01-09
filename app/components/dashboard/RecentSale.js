import { ArrowRight, TrendingUp } from "lucide-react";
import Link from "next/link";

export function RecentSale({ sales = [] }) {
  return (
    <div className="bg-neutral-900/50 backdrop-blur-md rounded-2xl border border-white/5 p-6 md:p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-xl font-bold text-white mb-1">Recent Sales</h2>
          <p className="text-sm text-neutral-400">
            Latest transactions from your store
          </p>
        </div>
        <Link
          href="/dashboard/sales"
          className="text-sm text-violet-400 hover:text-violet-300 flex items-center gap-1 transition-colors"
        >
          View All <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      <div className="space-y-2">
        {sales.length === 0 ? (
          <div className="text-neutral-500 text-center py-4">
            No recent sales found.
          </div>
        ) : (
          sales.map((sale) => (
            <div
              key={sale.id}
              className="flex items-center justify-between p-4 rounded-xl hover:bg-white/5 border border-transparent hover:border-white/5 transition-all group cursor-pointer"
            >
              <div className="flex items-center gap-4">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-bold shadow-lg bg-linear-to-br bg-blue-500`}
                >
                  {sale.customer_avatar}
                </div>
                <div>
                  <div className="text-white font-medium group-hover:text-violet-200 transition-colors">
                    {sale.customer_name}
                  </div>
                  <div className="text-xs text-neutral-500">
                    {sale.product_name}
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-white font-bold">
                  {sale.formatted_amount}
                </div>
                <div className="text-xs text-neutral-500">{sale.date}</div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
