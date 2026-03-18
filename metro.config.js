const { getDefaultConfig } = require("expo/metro-config");
const { getSentryExpoConfig } = require("@sentry/react-native/metro");
const { withNativeWind } = require("nativewind/metro");

let config = getDefaultConfig(__dirname);
config = getSentryExpoConfig(__dirname, config);
config = withNativeWind(config, { input: "./app/global.css" });

module.exports = config;
