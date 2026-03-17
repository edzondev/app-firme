const { getDefaultConfig } = require("expo/metro-config");
const { getSentryExpoConfig } = require("@sentry/react-native/metro");
const { withNativeWind } = require("nativewind/metro");

// 1. Base config de Expo
let config = getDefaultConfig(__dirname);

// 2. Aplicar Sentry (instrumentación)
config = getSentryExpoConfig(__dirname, config);

// 3. Aplicar NativeWind (transformaciones de estilos)
config = withNativeWind(config, { input: "./app/global.css" });

module.exports = config;
