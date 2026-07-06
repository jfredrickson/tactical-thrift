import js from "@eslint/js";
import globals from "globals";

export default [
	js.configs.recommended,
	{
		languageOptions: {
			ecmaVersion: "latest",
			sourceType: "module",
			globals: {
				...globals.node,
			},
		},
	},
	{
		files: ["assets/javascripts/**/*.js"],
		languageOptions: {
			globals: {
				...globals.browser,
				Chart: "readonly",
			},
		},
	},
];
