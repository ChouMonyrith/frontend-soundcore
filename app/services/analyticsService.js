// Mock service - Replace with real API calls later
export async function getDashboardData(range = "30d") {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 800));

  return {
    overview: {
      total_revenue: 12450.0,
      revenue_growth: 12.5,
      total_sales: 843,
      sales_growth: 8.2,
      total_downloads: 3204,
      downloads_growth: 15.3,
      avg_order_value: 14.76,
      aov_growth: -2.1,
    },
    revenue_chart: [
      { date: "Nov 01", value: 450 },
      { date: "Nov 05", value: 620 },
      { date: "Nov 10", value: 580 },
      { date: "Nov 15", value: 890 },
      { date: "Nov 20", value: 750 },
      { date: "Nov 25", value: 920 },
      { date: "Nov 30", value: 1100 },
    ],
    top_products: [
      {
        id: 1,
        name: "Deep Bass Drop",
        category: "Bass",
        sales: 234,
        revenue: 2337.66,
      },
      {
        id: 2,
        name: "Cinematic Riser",
        category: "FX",
        sales: 189,
        revenue: 2455.11,
      },
      {
        id: 3,
        name: "Trap Hi-Hat Loop",
        category: "Drums",
        sales: 456,
        revenue: 3643.44,
      },
      {
        id: 4,
        name: "Ambient Pad",
        category: "Synth",
        sales: 123,
        revenue: 1843.77,
      },
    ],
    recent_sales: [
      {
        id: 101,
        user: "Alex M.",
        product: "Deep Bass Drop",
        time: "2 mins ago",
        amount: 9.99,
      },
      {
        id: 102,
        user: "Sarah K.",
        product: "Trap Drums Vol.1",
        time: "15 mins ago",
        amount: 19.99,
      },
      {
        id: 103,
        user: "Mike R.",
        product: "Cinematic FX",
        time: "1 hour ago",
        amount: 14.99,
      },
    ],
  };
}
