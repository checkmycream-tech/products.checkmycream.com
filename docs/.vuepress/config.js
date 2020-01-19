const hostname = 'https://products.checkmycream.com/';
module.exports = {
  title: "CheckMyCream",
  description: "Know more about your skin care products",
  themeConfig: {
    nav: [
      { text: "Home", link: "/" },
    ]
  },
  dest: "public",
  plugins: [
    'social-share', {
      'sitemap': {
        hostname
      },
    },
      {
        '@limdongjin/vuepress-plugin-simple-seo': {
          default_image: '/images/main-image-min.jpg',
          root_url: hostname,
          default_site_name: 'CheckMyCream'
        }
      }
  ],
};
