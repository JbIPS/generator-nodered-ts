module.exports = {
  env: {
    node: true,
    es2020: true,
  },
  extends: [
    'airbnb-typescript/base',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
		project: './tsconfig.json'
  },
  plugins: [
    '@typescript-eslint',
  ],
  rules: {
		"import/extensions": "off",
		"no-await-in-loop": "off",
		"no-param-reassign": ["error", { "props": false }],
		"import/prefer-default-export": "warn"
  },
};
