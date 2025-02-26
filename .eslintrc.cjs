module.exports = {
  root: true,
  env: {
    browser: true,
    commonjs: true,
    node: true,
    es2021: true,
  },
  parser: 'vue-eslint-parser',
  extends: [
    'plugin:import/errors',
    'plugin:import/warnings',
    'eslint:recommended',
    'plugin:nuxt/recommended',
    'plugin:vue/base',
    'plugin:vue/vue3-recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  parserOptions: {
    parser: '@typescript-eslint/parser',
    ecmaVersion: 'latest',
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  plugins: [
    '@typescript-eslint',
    'import',
    'vue',
    'html',
    'jsx-a11y',
  ],
  rules: {
    // 일반 규칙
    'no-console': 'off',
    'no-unused-vars': 'off',
    'no-unexpected-multiline': 'off',
    'no-use-before-define': 'off',
    'spaced-comment': 'off',
    'no-param-reassign': 'off',
    'eol-last': [ 'warn', 'always', ],
    'no-plusplus': 'off',
    'no-restricted-syntax': 'off',
    'array-callback-return': 'off',
    'consistent-return': 'off',
    'no-nested-ternary': 'off',
    quotes: [ 'warn', 'single', { allowTemplateLiterals: true, }, ],
    semi: [ 'error', 'always', ],
    'array-bracket-spacing': [
      'warn',
      'always',
      {
        arraysInArrays: true,
        singleValue: true,
        objectsInArrays: true,
      },
    ],
    'object-curly-spacing': [ 'warn', 'always', ],
    'no-shadow': 'off',
    'comma-dangle': [ 'warn', {
      arrays: 'always',
      functions: 'never',
      objects: 'always',
      imports: 'never',
      exports: 'never',
    }, ],
    'jsx-quotes': [ 'error', 'prefer-single', ],
    'linebreak-style': 'off',
    'prefer-const': 'off',
    'max-len': 'off',
    'no-else-return': 'off',
    'no-lonely-if': 'off',
    'global-require': 'off',
    'class-methods-use-this': 'off',
    'no-useless-constructor': 'off',
    'no-useless-return': 'off',
    'lines-between-class-members': 'off',
    'arrow-body-style': 'off',
    'no-empty-function': 'off',
    camelcase: 'off',

    // 임포트 규칙
    'import/extensions': 'off',
    'import/no-extraneous-dependencies': 'off',
    'import/no-unresolved': 'off',
    'import/no-dynamic-require': 'off',
    'import/prefer-default-export': 'off',

    // 타입스크립트 규칙
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-var-requires': 'off',
    '@typescript-eslint/ban-ts-comment': 'off',
    '@typescript-eslint/no-unused-vars': 'warn',

    // vue 규칙
    'vue/multi-word-component-names': 'off',
    'vue/html-self-closing': 'off',
  },
  overrides: [
    {
      files: [ '*.vue', ],
      rules: {
        'no-undef': 'off',
      },
    },
  ],
};
