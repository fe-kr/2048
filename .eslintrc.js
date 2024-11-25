// https://docs.expo.dev/guides/using-eslint/
module.exports = {
  extends: ["expo", "plugin:import/typescript", "prettier"],
  plugins: ["prettier"],
  rules: {
    "prettier/prettier": "error",
  },
  settings: {
    "import/resolver": {
      typescript: true,
      node: true,
    },
  },
};
