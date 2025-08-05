module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    // Temporarily removing NativeWind plugin to isolate the issue
    plugins: [],
  };
};
