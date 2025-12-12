module.exports = {
  devServer: (config) => {
    config.allowedHosts = "all";  // allowedHosts 강제
    return config;
  },
};
