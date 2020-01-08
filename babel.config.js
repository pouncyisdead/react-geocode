module.exports = function(api) {
  api.cache(true);

  const config = {
    "comments": false
  }

  const presets = [
    ["minify", {
      "mangle": false,
      "keepFnName": true
    }],
    ["@babel/preset-env", {
      "targets": {
        "esmodules": true
      },
        "modules": "cjs"
    }],
    "@babel/preset-typescript"
  ];

  const plugins = [
    ["@babel/plugin-proposal-class-properties", { "loose": false }]
  ];

  return {
    ...config,
    presets,
    plugins
  };
};