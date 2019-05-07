module.exports = {
  env: {
    browser: false,
    node: true,
    es6: true,
    jest: true
  },
  plugins: ["prettier"],
  extends: ["eslint:recommended", "prettier"],
  rules: {
    "prettier/prettier": "error",
    "max-len": ["warn", { code: 120 }],
    "prefer-const": "warn",
    "no-unused-vars": "warn",
    "no-var": "error"
  },
  parserOptions: {
    ecmaVersion: 9
  }
};
