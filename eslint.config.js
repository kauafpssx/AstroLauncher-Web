import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import { defineConfig, globalIgnores } from 'eslint/config'
import eslintConfigPrettier from 'eslint-config-prettier/flat'

export default defineConfig([
  // dist is generated — never lint it.
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      globals: globals.browser,
    },
    rules: {
      'no-empty': ['error', { allowEmptyCatch: true }],
      // Force '@/*' path aliases instead of parent-traversal relative imports.
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              group: ['../*'],
              message:
                "Use the '@/*' path alias instead of relative parent imports (e.g. '@/components/ui/button').",
            },
          ],
        },
      ],
    },
  },
  // Prettier owns formatting: disable ESLint rules that would conflict with it.
  {
    files: ['**/*.{ts,tsx}'],
    ...eslintConfigPrettier,
  },
])
