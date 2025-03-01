/** @type { import("prettier").Config } */
module.exports = {
	useTabs: true,
	singleQuote: false,
	trailingComma: "none",
	printWidth: 80,
	plugins: [
		"prettier-plugin-svelte",
		"prettier-plugin-organize-imports",
		"prettier-plugin-tailwindcss"
	]
};
