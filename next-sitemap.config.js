/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: "https://arealchain.com",
  generateRobotsTxt: true,
  exclude: ["/dashboard", "/buy", "/api/*", "/onboard"],
  robotsTxtOptions: {
    policies: [
      { userAgent: "*", allow: "/" },
      { userAgent: "*", disallow: ["/dashboard", "/buy"] },
    ],
  },
  sitemapSize: 5000,
};
