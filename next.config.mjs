/** @type {import('next').NextConfig} */
const nextConfig = {
  // 允许从 Laravel (127.0.0.1:8000) 读取图片
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "127.0.0.1",
        port: "8000",
        pathname: "/api/storage/**",
      },
    ],
  },

  // 允许开发环境跨域访问 _next/* 资源 (必须)
  experimental: {
    allowedDevOrigins: ["http://127.0.0.1:3000", "http://localhost:3000"],
    serverActions: {
      bodySizeLimit: "50mb",
    },
  },

  // 可选：给 API 或静态资源增加 CORS 头
  async headers() {
    return [
      {
        // 给所有 Next.js 静态资源设置 CORS 头
        source: "/:path*",
        headers: [
          { key: "Access-Control-Allow-Origin", value: "*" },
          { key: "Access-Control-Allow-Methods", value: "GET, POST, OPTIONS" },
          { key: "Access-Control-Allow-Headers", value: "Content-Type" },
        ],
      },
    ];
  },
};

export default nextConfig;
