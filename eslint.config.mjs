import globals from 'globals'
import pluginJs from '@eslint/js'
import tseslint from 'typescript-eslint'
import unusedImports from 'eslint-plugin-unused-imports';


/** @type {import('eslint').Linter.Config[]} */
export default [
     { files: ['**/*.{js,mjs,cjs,ts}'] },
     { languageOptions: { globals: globals.browser } },
     pluginJs.configs.recommended,
     ...tseslint.configs.recommended,
     {
          plugins: {
               'unused-imports': unusedImports,
           },
           rules: {
               'unused-imports/no-unused-imports': 'error', // Automatically removes unused imports
               'unused-imports/no-unused-vars': [
                   'warn',
                   {
                       vars: 'all',
                       varsIgnorePattern: '^_',
                       args: 'after-used',
                       argsIgnorePattern: '^_',
                   },
               ],
           },
     }
]
