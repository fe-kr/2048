// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");

/** @type {import('expo/metro-config').MetroConfig} */
// eslint-disable-next-line no-undef
const defaultConfig = getDefaultConfig(__dirname, { isCSSEnabled: true });
const nativeWindConfig = withNativeWind(defaultConfig, {
  input: "./src/app/global.css",
});

module.exports = nativeWindConfig;
