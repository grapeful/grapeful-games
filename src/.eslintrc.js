module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  extends: [
    'airbnb-base',
  ],
  globals: {
    Atomics: 'readonly',
    Peer: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaVersion: 11,
    sourceType: 'module',
  },
  rules: {
    'brace-style': ['error', '1tbs'],
    'import/extensions': ['warn', 'ignorePackages'],
    'import/prefer-default-export': ['off'],
    'indent': ['error', 4],
    'no-use-before-define': ['warn', { 'functions': false, 'classes': false }],
  },
};
