module.exports = {
  parser: 'babel-eslint',
  extends: ['react-app', 'plugin:jsx-a11y/recommended'],
  env: {
    jasmine: true,
  },
  rules: {
    'max-len': ['error', { 'code': 120 }],
    semi: ['error', 'never'],
    'comma-dangle': ['error', 'always-multiline'],
    quotes: ['error', 'single'],
    indent: ['error', 2, { 'SwitchCase': 1 }],
    'no-nested-ternary': 'error',
    'object-curly-spacing': ['error', 'always'],
    'arrow-spacing': ['error', { before: true, after: true }],
    // May be enable in future
    'jsx-a11y/click-events-have-key-events': 0,
    'jsx-a11y/no-static-element-interactions': 0,
    'jsx-a11y/no-noninteractive-tabindex': 0,
    'react/jsx-pascal-case': 0,
  },
}
