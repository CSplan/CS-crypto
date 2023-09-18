module.exports = {
	parser: '@typescript-eslint/parser',
	env: {
		browser: true,
		node: true,
		es2022: true
	},
	extends: 'plugin:@typescript-eslint/recommended',
	parserOptions: {
		sourceType: 'module',
		tsconfigRootDir: __dirname,
		project: ['./tsconfig.json']
	},
	plugins: [
		'@typescript-eslint',
		'unicorn',
		'import'
	],
	rules: {
		// General
		indent: ['error', 'tab'],
		quotes: ['error', 'single'],
		semi: ['error', 'never'],
		'brace-style': ['error', '1tbs'],
		// Object/array formatting
		'quote-props': ['error', 'as-needed'],
		'comma-dangle': ['error', 'never'],
		'object-curly-spacing': ['error', 'always'], // Single line objects should be spaced
		'array-bracket-spacing': ['error', 'never'], // But not arrays
		// Function formatting
		'space-before-function-paren': ['warn', {
			named: 'never',
			anonymous: 'never',
			asyncArrow: 'always'
		}],
		// Misc
		'no-return-await': 'error',
		'unused-export-let': 'off',
		// Typescript specific rules
		'@typescript-eslint/no-unused-vars': 'error',
		'@typescript-eslint/no-non-null-assertion': 'off',
		'@typescript-eslint/no-empty-function': 'off',
		'@typescript-eslint/ban-ts-comment': 'warn',
		'@typescript-eslint/explicit-function-return-type': ['error', {
			allowExpressions: true
		}],
		'@typescript-eslint/consistent-type-definitions': ['warn', 'type'],
		'@typescript-eslint/member-delimiter-style': ['error', {
			multiline: {
				delimiter: 'none'
			}
		}],
		'@typescript-eslint/strict-boolean-expressions': ['warn', {
			allowNullableObject: false,
			allowNullableBoolean: true
		}],
		'@typescript-eslint/explicit-member-accessibility': ['error', {
			accessibility: 'no-public'
		}],
		// Unicorn rules
		'unicorn/filename-case': ['error', {
			case: 'kebabCase'
		}],
		// File imports must include extensions for "type": "module" compatibility
		'import/extensions': ['error', 'ignorePackages'],
		// Blacklisted syntax
		'no-restricted-syntax': ['error', {
			selector: 'ExpressionStatement > CallExpression[callee.name="spyOn"]',
			message: 'spyOn must be chained to .and.callThrough()'
		}]
	}
}
