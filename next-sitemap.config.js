/** @type {import('next-sitemap').IConfig} */
const siteUrl =
  process.env.NEXTAUTH_URL ??
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : undefined);

if (!siteUrl) {
  throw new Error(
    "NEXTAUTH_URL (or VERCEL_URL) must be set for sitemap generation.",
  );
}

module.exports = {
  siteUrl,
  generateRobotsTxt: true,
  changefreq: "daily",
  priority: 0.7,
};
