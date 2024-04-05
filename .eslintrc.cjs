module.exports = {
  'plugins': [
    'import',
  ],
  'env': {
    'es2023': true,
    'browser': true,
  },
  'extends': 'eslint:recommended',
  'overrides': [
    {
      'env': {
        'node': true,
      },
      'files': [
        '.eslintrc.{js,cjs}',
      ],
      'parserOptions': {
        'sourceType': 'script',
      },
    },
  ],
  'parserOptions': {
    'ecmaVersion': 'latest',
    'sourceType': 'module',
  },
  'rules': {
  },
};
