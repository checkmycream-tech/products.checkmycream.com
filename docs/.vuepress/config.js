module.exports = {
  title: "CheckMyCream",
  description: "Know more about your skin care products",
  themeConfig: {
    nav: [
      { text: "Home", link: "/" },
      { text: "Products", link: "/products/" },
    ]
  },
  dest: "public",
  plugins: [
    'social-share',
    {
      'sitemap': {
        hostname: 'https://products.checkmycream.com/'
      },
    }
  ],
};
