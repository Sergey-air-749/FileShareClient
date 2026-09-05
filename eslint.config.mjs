import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
// import eslintConfigPrettier from "eslint-config-prettier/flat";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,

  {
    rules: {
      "@next/next/no-img-element": "off", // error: http://localhost:3000/_next/image?url=http://localhost:7000/api/images/avatars/default&w=256&q=75, 400 Bad Request, "url" parameter is not allowed
      "react-hooks/exhaustive-deps": 'off',
      "@next/next/no-html-link-for-pages": "warn", // <--- THIS IS THE NEW RULE
      "no-console": "warn" 
    },
  },

  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),

  // eslintConfigPrettier
]);

export default eslintConfig;
