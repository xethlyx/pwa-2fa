module.exports = {
	root: true,
	env: {
		node: true
	},
	extends: [
		'plugin:vue/vue3-essential',
		'@vue/airbnb',
		'@vue/typescript/recommended'
	],
	parserOptions: {
		ecmaVersion: 2020
	},
	rules: {
		'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
		'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
		indent: ['warn', 'tab'],
		'no-tabs': 'off',
		'comma-dangle': ['error', 'never'],
		'max-len': 'off',
		'lines-between-class-members': 'off',
		'class-methods-use-this': 'off',
		'no-plusplus': 'off',
		'no-bitwise': 'off',
		'no-restricted-syntax': 'off',
		'@typescript-eslint/no-non-null-assertion': 'off',
		'no-continue': 'off'
	},
	overrides: [
		{
			files: [
				'**/__tests__/*.{j,t}s?(x)',
				'**/tests/unit/**/*.spec.{j,t}s?(x)'
			],
			env: {
				jest: true
			}
		}
	]
};
