const pickr = require('@simonwep/pickr');

module.exports = pickr.create({
	el: '.color-picker',
	theme: 'nano', 
	padding: 8,
	// or 'monolith', or 'nano'
	swatches: [
		'#ED1000',
		'#FF0057',
		'#2BFF01',
		'#FF00E5',
		'#005CFF',
	],
	components: {
		hue: true,
		preview: true,
		interaction: {
			hex: true,
			input: true,
			clear: true,
			save: true,
		},
	},
});