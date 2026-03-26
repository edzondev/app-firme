module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      [
        "babel-preset-expo",
        {
          "react-compiler": {
            sources: (filename) => {
              // Include specific directories
              if (filename.includes("app/")) return true;
              if (filename.includes("core/components")) return true;
              if (filename.includes("modules/")) return true;

              // Exclude certain patterns
              if (filename.includes("node_modules")) return false;
              if (filename.includes(".test.")) return false;

              return false;
            },
          },
          jsxImportSource: "nativewind",
        },
      ],
      "nativewind/babel",
    ],
    plugins: ["react-native-worklets/plugin"],
  };
};
