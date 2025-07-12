/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: "https://arealchain.com", // Replace with your domain
  generateRobotsTxt: true,
  exclude: ["/dashboard"], // authenticated/private routes
  robotsTxtOptions: {
    policies: [
      { userAgent: "*", allow: "/" },
      { userAgent: "*", disallow: ["/dashboard"] },
    ],
  },
};
