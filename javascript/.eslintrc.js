module.exports = {
  env: {
    es2020: true,
    node: true,
    jest: true,
    browser: true,
  },
  extends: ["airbnb-base", "prettier"],
  parserOptions: {
    sourceType: "module",
    ecmaVersion: 2020,
  },
  plugins: ["prettier"],
  rules: {
    "prettier/prettier": [
      1,
      {
        endOfLine: "auto",
        trailingComma: "es5",
      },
    ],
    "no-continue": 0,
    "no-await-in-loop": 0,
    "no-use-before-define": 0,
    "import/extensions": 0,
    "no-console": 0,
    "no-param-reassign": 0,
    "import/prefer-default-export": 0,
    "no-labels": 0,
    "default-case": 0,
    "no-plusplus": 0,
    "class-methods-use-this": 0,
    "no-underscore-dangle": 0,
    "prefer-destructuring": 0,
    "no-unused-vars": [0],
  },
};
