module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: ['./tsconfig.json'],
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  globals: {
    Logger: true,
    performance: true,
  },
  ignorePatterns: ['scripts', 'assets', 'src/assets/icons/*.tsx', 'global.d.ts'],
  plugins: ['@typescript-eslint'],
  extends: ['plugin:@typescript-eslint/recommended', '@react-native-community'],
  rules: {
    // eslint
    semi: 'off',
    curly: 'off',
    'no-mixed-spaces-and-tabs': ['warn', 'smart-tabs'],
    'no-async-promise-executor': 'warn',
    'require-await': 'warn',
    'no-return-await': 'warn',
    'no-await-in-loop': 'warn',
    // 'no-console': 'error',
    'comma-dangle': 'off', // prettier already detects this
    'no-restricted-syntax': [
      'error',
      {
        selector: 'TSEnumDeclaration',
        message:
          "Enums have various disadvantages, use TypeScript's union types instead.",
      },
    ],
    eqeqeq: [
      'error',
      'always',
      {
        null: 'never',
      },
    ],
    'object-shorthand': ['warn', 'never'],

    // prettier
    'prettier/prettier': ['warn'],
    // typescript
    '@typescript-eslint/no-use-before-define': 'off',
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        vars: 'all',
        args: 'after-used',
        ignoreRestSiblings: false,
        varsIgnorePattern: '^_',
        argsIgnorePattern: '^_',
      },
    ],
    '@typescript-eslint/explicit-function-return-type': [
      'warn',
      {
        allowExpressions: true,
      },
    ],
    '@typescript-eslint/explicit-module-boundary-types': 'warn',
    '@typescript-eslint/no-namespace': 'off',
    '@typescript-eslint/ban-ts-comment': 'off',
    '@typescript-eslint/no-unsafe-assignment': 'error',
    '@typescript-eslint/no-unsafe-member-access': 'error',

    // react plugin
    'react/no-unescaped-entities': 'off',
    // react native plugin
    'react-native/no-unused-styles': 'warn',
    'react-native/split-platform-components': 'off',
    'react-native/no-inline-styles': 'off',
    'react-native/no-color-literals': 'off',
    'react-native/no-raw-text': 'off',
    'react-native/no-single-element-style-arrays': 'warn',
    '@typescript-eslint/strict-boolean-expressions': [
      'error',
      {
        allowString: false,
        allowNullableObject: false,
        allowNumber: false,
        allowNullableBoolean: true,
      },
    ],
    '@typescript-eslint/no-non-null-assertion': 'error',
    '@typescript-eslint/no-unnecessary-condition': 'warn',

    // react hooks
    'react-hooks/exhaustive-deps': [
      'error',
      {
        additionalHooks:
          '(useStyle|useDerivedValue|useAnimatedStyle|useAnimatedProps|useWorkletCallback|useFrameProcessor|useRecoilCallback|usePaint|useDrawCallback|usePath)',
      },
    ],

    // forbit some react components
    'react/forbid-elements': [
      'error',
      {
        forbid: [
          {
            element: 'Modal',
            message: 'use a separate modal page (react-navigation) instead.',
          },
          {
            element: 'Button',
            message: 'use a custom themed <AppButton> instead.',
          },
          {
            element: 'VirtualizedList',
            message: 'use <FlatList> or <FastList> instead.',
          },
          {
            element: 'Text',
            message: 'use a custom themed <AppText> instead.',
          },
          {
            element: 'Image',
            message: 'use a custom themed <AppImage> instead.',
          },
        ],
      },
    ],
  },
}
