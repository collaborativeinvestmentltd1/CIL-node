/** @type {import('next').NextConfig} */
const isDev = process.env.NODE_ENV !== 'production';

const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
    ],
  },
  headers: async () => {
    const scriptSrc = isDev
      ? "script-src 'self' 'unsafe-eval' 'unsafe-inline';"
      : "script-src 'self';";

    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-XSS-Protection",
            value: "1; mode=block",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
          {
            key: "Content-Security-Policy",
            value: [
              "default-src 'self';",
              scriptSrc,
              "style-src 'self' 'unsafe-inline';",
              "img-src 'self' data: https://res.cloudinary.com;",
              "font-src 'self' data:;",
              "connect-src 'self' https://res.cloudinary.com https://api.paystack.co;",
              "frame-ancestors 'none';",
              "form-action 'self';",
              "base-uri 'self';",
            ].join(' '),
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
