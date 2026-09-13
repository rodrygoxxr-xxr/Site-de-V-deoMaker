module.exports = {
  plugins: [
    {
      postcssPlugin: "disable-mobile-menu-backdrop-blur",
      Once(root) {
        root.append({
          selector: 'button[aria-label="Fechar menu"]',
          nodes: [
            { prop: "backdrop-filter", value: "none !important" },
            { prop: "-webkit-backdrop-filter", value: "none !important" },
          ],
        });
      },
    },
  ],
};

module.exports.plugins[0].postcss = true;
