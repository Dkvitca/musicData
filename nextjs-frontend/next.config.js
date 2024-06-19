// @ts-check

/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: "/auth/spotify",
        destination: "http://localhost:3000/auth/spotify",
      },
      {
        source: "/auth/spotify/callback",
        destination: "http://localhost:3000/auth/spotify/callback",
      },
      {
        source: "/api/current_user",
        destination: "http://localhost:3000/api/current_user",
      },
      {
        source: "/api/playlists",
        destination: "http://localhost:3000/api/playlists",
      },
      {
        source: "/api/artists",
        destination: "http://localhost:3000/api/artists",
      },
    ];
  },
};

module.exports = nextConfig;
