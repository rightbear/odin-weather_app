import globals from "globals";
import { defineConfig } from "eslint/config";
import js from "@eslint/js";
import eslintConfigPrettier from "eslint-config-prettier/flat";

export default defineConfig([
  {
    files: ["**/*.js"],
    plugins: {
      js,
    },
    extends: ["js/recommended"],
    ignores: ["**/*.config.js", "node_modules/**", "dist/**"],
    rules: {
      "no-unused-vars": "warn",
      "no-undef": "warn",
    },
    languageOptions: {
      globals: {
        // add console, amongst other browser globals
        ...globals.browser,

        // add node globals
        ...globals.node,
      },
    },
    linterOptions: {
      // report unused disable and enable directives
      reportUnusedDisableDirectives: "error",

      // report unused eslint inline config comments
      reportUnusedInlineConfigs: "error",
    },
  },
  eslintConfigPrettier,
]);
