import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import react from "eslint-plugin-react";
import { defineConfig } from "eslint/config";

export default defineConfig([
  {
    ignores: ["**/node_modules/**", "**/dist/**", "parcel-flat-namer.js"],
  },
  {
    files: ["**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"],
    plugins: { js, react },
    extends: ["js/recommended"],
    rules: {
      "react/react-in-jsx-scope": "off",
    },
    languageOptions: { globals: globals.browser },
  },
  tseslint.configs.recommended,
]);
