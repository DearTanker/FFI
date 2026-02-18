const isProd = process.env.NODE_ENV === "production";

const nextConfig = {
  output: isProd ? "export" : undefined,
  distDir: ".next-out",
  trailingSlash: true,
  images: {
    unoptimized: true
  },
  ...(isProd
    ? {}
    : {
        async rewrites() {
          return [
            {
              source: "/@vite/:path*",
              destination: "/__vite_stub.js"
            }
          ];
        }
      })
};

export default nextConfig;
