import js from '@eslint/js';
import { defineConfig, globalIgnores } from 'eslint/config';
import eslintConfigPrettier from 'eslint-config-prettier/flat';
import tseslint from 'typescript-eslint';

export default defineConfig(
  // Generated folders, never linted (node_modules is ignored by default).
  globalIgnores(['**/dist/', '**/coverage/']),
  js.configs.recommended,
  tseslint.configs.recommended,
  // Must stay last: turns off the formatting rules enabled above (Prettier handles formatting).
  eslintConfigPrettier,
);
