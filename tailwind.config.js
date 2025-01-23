/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./src/**/*.js",
		"./src/**/*.jsx",
		"./src/**/*.ts",
		"./src/**/*.tsx",
		"./public/index.html",
	],
	theme: {
		extend: {
			colors: {
				"main-green": "#587a3a",
				"secondary-green": "#7E9B5C",
				"main-light-grey": "#F7F7F7",
			},
			fontFamily: {
				nunito: "var(--font-nunito), sans-serif",
				libre: "var(--font-libre_baskerville), serif",
			},
		},
	},
	plugins: [],
};
