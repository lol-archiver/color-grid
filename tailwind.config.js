module.exports = {
	purge: ['./app/index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
	darkMode: false, // or 'media' or 'class'
	theme: {
		extend: {
			lineHeight: {
				'14': '3.5rem',
			}
		},
	},
	variants: {
		extend: {
			contrast: ['hover'],
		},
	},
	plugins: [],
}
