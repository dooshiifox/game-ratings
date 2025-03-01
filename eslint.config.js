import { includeIgnoreFile } from "@eslint/compat";
import js from "@eslint/js";
import stylistic from "@stylistic/eslint-plugin";
import prettier from "eslint-config-prettier";
import { createTypeScriptImportResolver } from "eslint-import-resolver-typescript";
import importX from "eslint-plugin-import-x";
import svelte from "eslint-plugin-svelte";
import { fileURLToPath } from "node:url";
import ts from "typescript-eslint";

const gitignorePath = fileURLToPath(new URL("./.gitignore", import.meta.url));
export default ts.config(
	includeIgnoreFile(gitignorePath),
	{
		files: [
			"src/**/*.{js,ts,svelte}",
			".prettierrc.cjs",
			"eslint.config.js",
			"svelte.config.js",
			"vite.config.ts"
		]
	},
	js.configs.recommended,
	stylistic.configs.recommended,
	importX.flatConfigs.recommended,
	importX.flatConfigs.errors,
	importX.flatConfigs.typescript,
	ts.configs.recommendedTypeChecked,
	ts.configs.stylisticTypeChecked,
	prettier,
	...svelte.configs["flat/prettier"],
	{
		languageOptions: {
			ecmaVersion: "latest",
			parserOptions: {
				tsconfigRootDir: import.meta.dirname,
				projectService: true
			}
		},
		settings: {
			"import-x/resolver-next": [
				createTypeScriptImportResolver({
					alwaysTryTypes: true,
					project: "tsconfig.json"
				})
			]
		},
		rules: {
			quotes: [
				"error",
				"double",
				{
					avoidEscape: true
				}
			],
			indent: ["off"],
			"comma-dangle": ["error", "never"],
			"linebreak-style": ["error", "unix"],
			semi: ["error", "always"],
			"no-unused-vars": "off",
			"no-extra-boolean-cast": "off",
			"@typescript-eslint/strict-boolean-expressions": [
				"error",
				{
					allowString: false,
					allowNumber: false,
					allowNullableObject: false,
					allowNullableBoolean: false,
					allowNullableString: false,
					allowNullableNumber: false,
					allowNullableEnum: false,
					allowAny: false
				}
			],
			"@typescript-eslint/member-delimiter-style": "warn",
			"@typescript-eslint/no-inferrable-types": "off",
			"@typescript-eslint/array-type": [
				"warn",
				{
					default: "generic"
				}
			],
			"@typescript-eslint/ban-ts-comment": "warn",
			// Handled by TS
			"no-undef": "off",
			"no-shadow": "off",
			"@typescript-eslint/no-shadow": "error",
			"no-use-before-define": "off",
			"@typescript-eslint/no-use-before-define": [
				"error",
				{
					functions: false,
					classes: true,
					variables: true,
					allowNamedExports: false,
					enums: false,
					typedefs: false,
					ignoreTypeReferences: true
				}
			],
			"@typescript-eslint/consistent-type-definitions": ["error", "type"],
			// The ability to do `{ [name: T]: U }` is useful for self-documenting.
			"@typescript-eslint/consistent-indexed-object-style": ["off"],
			"@typescript-eslint/dot-notation": ["off"],
			"import/no-default-export": "error",
			// Doesnt recognise namespaces
			"import/default": "off",
			// Doesn't work with SvelteKit stuff like "$app/environment"
			"import/no-unresolved": "off",

			"@typescript-eslint/no-unused-vars": [
				"error",
				{
					args: "all",
					argsIgnorePattern: "^_",
					caughtErrors: "all",
					caughtErrorsIgnorePattern: "^_",
					destructuredArrayIgnorePattern: "^_",
					varsIgnorePattern: "^_",
					ignoreRestSiblings: true
				}
			],
			"@stylistic/member-delimiter-style": [
				"warn",
				{
					multiline: {
						delimiter: "semi",
						requireLast: true
					},
					singleline: {
						delimiter: "semi",
						requireLast: false
					}
				}
			],
			"@typescript-eslint/no-unused-expressions": [
				"error",
				{
					allowTaggedTemplates: true
				}
			],

			"import-x/no-default-export": "off",
			"import-x/default": "off",
			"@typescript-eslint/prefer-promise-reject-errors": "off"
		}
	}
);
