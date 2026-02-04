import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

export function SalesChart({ data }) {
  return (
    <div className="bg-neutral-900/50 backdrop-blur-md rounded-2xl border border-white/5 p-6">
      <h2 className="font-semibold text-white text-2xl mb-4">Sales Chart</h2>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid />
            <XAxis dataKey="month" stroke="#8884d8" />
            <YAxis stroke="#8884d8" />
            <Tooltip
              contentStyle={{ backgroundColor: "#171717", color: "#fff" }}
              itemStyle={{ color: "#fff" }}
              cursor={{
                stroke: "#8884d8",
                strokeWidth: 2,
                strokeDasharray: "3 3",
              }}
            />
            <Line
              type="monotone"
              dataKey="sales"
              stroke="#8884d8"
              strokeWidth={2}
              dot={{ r: 4, fill: "#8884d8" }}
              activeDot={{
                r: 6,
                fill: "#8884d8",
                stroke: "#fff",
                strokeWidth: 2,
              }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
