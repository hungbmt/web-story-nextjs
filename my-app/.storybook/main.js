module.exports = {
  stories: ["../src/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/nextjs", // Thêm addon cho Next.js,
    "@storybook/addon-essentials",
    "@storybook/addon-designs",
    "@storybook/addon-controls",
    "storybook-css-modules",
  ],
  framework: {
    name: "@storybook/nextjs",
    options: {},
  },
};
