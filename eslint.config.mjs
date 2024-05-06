// @ts-check

import eslint from "@eslint/js";
import prettierConfig from "eslint-config-prettier";
import tseslint from "typescript-eslint";

export default tseslint.config({
  files: ["src/index.ts"],
  extends: [
    eslint.configs.recommended,
    ...tseslint.configs.recommended,
    prettierConfig
  ]
});
