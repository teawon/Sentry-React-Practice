const { sentryWebpackPlugin } = require("@sentry/webpack-plugin");

module.exports = function override(config, env) {
  if (env === "production") {
    config.devtool = "source-map";

    config.plugins.push(
      sentryWebpackPlugin({
        org: "teawon-9a7d8258c",
        project: "javascript-react",
        authToken: process.env.SENTRY_AUTH_TOKEN,
      })
    );
  }

  return config;
};
