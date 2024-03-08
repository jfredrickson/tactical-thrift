module.exports = {
  'settings': {
    'import/resolver': {
      'node': {
        'extensions': ['.js', '.ts'],
      },
    },
  },
  'plugins': [
    '@typescript-eslint',
  ],
  'env': {
    'es2023': true,
  },
  'extends': 'airbnb-base',
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
    'no-plusplus': 'off',
  },
};
