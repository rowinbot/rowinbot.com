import js from '@eslint/js'
import tseslint from 'typescript-eslint'
import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import jsxA11y from 'eslint-plugin-jsx-a11y'
import importPlugin from 'eslint-plugin-import'
import prettier from 'eslint-config-prettier'
import globals from 'globals'

export default tseslint.config(
  {
    ignores: [
      'build/**',
      'public/**',
      '.react-router/**',
      '.netlify/**',
      'content/build/**',
      'node_modules/**',
      'server.js',
      '*.config.js',
      '*.config.ts',
    ],
  },

  js.configs.recommended,
  ...tseslint.configs.recommended,

  // Shared TS/import hygiene for every source file.
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    plugins: { import: importPlugin },
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      parserOptions: { ecmaFeatures: { jsx: true } },
      globals: { ...globals.browser, ...globals.node },
    },
    settings: {
      'import/resolver': {
        typescript: { project: './tsconfig.json' },
      },
    },
    rules: {
      // Types are declared as named interfaces, never inline in the signature,
      // and always imported as types.
      '@typescript-eslint/consistent-type-imports': [
        'error',
        { prefer: 'type-imports', fixStyle: 'inline-type-imports' },
      ],
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],

      // Import hygiene: grouped, alphabetized, ~/ alias in its own block.
      'import/order': [
        'error',
        {
          groups: [
            'builtin',
            'external',
            'internal',
            ['parent', 'sibling', 'index'],
            'type',
          ],
          pathGroups: [
            { pattern: '~/**', group: 'internal', position: 'after' },
          ],
          'newlines-between': 'always',
          alphabetize: { order: 'asc', caseInsensitive: true },
        },
      ],
    },
  },

  // App components/routes: full React + a11y rigor.
  {
    files: ['app/**/*.{jsx,tsx}'],
    plugins: {
      react,
      'react-hooks': reactHooks,
      'jsx-a11y': jsxA11y,
    },
    settings: { react: { version: 'detect' } },
    rules: {
      ...react.configs.flat.recommended.rules,
      ...react.configs.flat['jsx-runtime'].rules,
      ...reactHooks.configs.recommended.rules,
      ...jsxA11y.flatConfigs.recommended.rules,
      'react/prop-types': 'off',
    },
  },

  // Content builder: node/build scripts + Satori JSX (its own `tw`/`lang`
  // attributes are not DOM props); relax the browser-React rules here.
  {
    files: ['content/**/*.{ts,tsx}'],
    rules: {
      'react/no-unknown-property': 'off',
      '@typescript-eslint/ban-ts-comment': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      'no-var': 'off',
      'no-useless-assignment': 'off',
    },
  },

  // React Three Fiber renders to a WebGL scene graph, not the DOM: its element
  // props (position, args, intensity…) are not HTML attributes.
  {
    files: ['app/components/**/three/**/*.tsx', 'app/**/*three*.tsx'],
    rules: { 'react/no-unknown-property': 'off' },
  },

  // Declaration files use empty interfaces for module augmentation by design.
  {
    files: ['**/*.d.ts'],
    rules: { '@typescript-eslint/no-empty-object-type': 'off' },
  },

  // Architecture boundaries — enforced with zone rules, no extra plugin.
  // ui/ is the leaf layer: generic primitives that must not reach up into
  // feature folders, routes, or server code.
  {
    files: ['app/components/ui/**/*.{ts,tsx}'],
    rules: {
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              group: [
                '~/routes/*',
                '~/components/!(ui)/**',
                '**/*.server',
                '**/*.server.*',
              ],
              message:
                'ui/ primitives are the leaf layer: they must not import feature components, routes, or server modules. Lift shared logic into the consuming feature instead.',
            },
          ],
        },
      ],
    },
  },

  // Server-only modules must never be pulled into client component code.
  {
    files: ['app/components/**/*.{ts,tsx}'],
    ignores: ['**/*.server.*'],
    rules: {
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              group: ['**/*.server', '**/*.server.*'],
              message:
                'Components are client-safe: import server-only modules from route loaders/actions, not from components.',
            },
          ],
        },
      ],
    },
  },

  prettier
)
