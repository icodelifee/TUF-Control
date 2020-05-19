const shell = require('shelljs');
const fs = require('fs');
const paths = require('./path');
const permsHandler = require('./utils/permshandler');
const pickr = require('./components/picker');
shell.config.execPath = shell.which('node').toString();

// TODO
// Read and update the current config on startup
// Handle two type of fan
$('#btn-speed').prop('disabled', true);

permsHandler();

pickr.on('save', (color, instance) => {
	//change color of the keyboard
	try {
		const splitHex = `${color.toHEXA()[0]} ${color.toHEXA()[1]} ${color.toHEXA()[2]} ${data.toString()}`;
		shell.exec('bash ' + __dirname + `/shell/color.sh ${splitHex}`);
	} catch (e) {
		console.log('Error:', e.stack);
	}
});

$('input:radio').on('click', function (e) {
	if (e.target.name === 'mode') {
		// If the button clicked is of keyboard mode

		// if button clicked is static or strobing then disable speed
		// because it doesnt support speed
		if (e.currentTarget.id === '1' || e.currentTarget.id === '2') $('#btn-speed').prop('disabled', false);
		else $('#btn-speed').prop('disabled', true);
		shell.exec('bash ' + __dirname + '/shell/mode.sh ' + e.currentTarget.id);
	} else if (e.target.name === 'speed' && $('btn-speed').attr('disabled') === false)
		// check if clicked button is of keyboard speed
		shell.exec('bash ' + __dirname + '/shell/speed.sh ' + e.currentTarget.id);
	else if (e.target.name === 'brightness')
		// check if the button is of keyboard brightness
		shell.exec(`echo "${e.currentTarget.id}" > ${paths.brightness}`);
});

$('#normal').click(() => {
	disableOther();
	changeFanMode('#normal', '#11998e', 'linear-gradient(to right, #11998e, #38ef7d)', '0');
});

$('#boost').click(() => {
	disableOther();
	changeFanMode('#boost', 'white', 'linear-gradient(45deg, #a73737, #7a2828)', '1');
});

$('#silent').click(() => {
	disableOther();
	changeFanMode('#silent', '#a4508b', 'linear-gradient(326deg, #a4508b 0%, #5f0a87 74%)', '2');
});

const disableOther = () => {
	$('#normal,#boost,#silent').css('background-color', 'white');
	$('#normal-title,#boost-title,#silent-title').css('color', 'black');
};

const changeFanMode = (selector, backgroundColor, gradient, mode) => {
	const bodyCSS = {
		'background-color': backgroundColor,
		background: gradient,
		'background-repeat': 'no-repeat',
		'background-attachment': 'fixed',
		transition: 'color 2s',
	};
	$('body').css(bodyCSS);
	$(selector).css('background-color', 'black');
	$(`${selector}-title`).css('color', 'white');
	shell.exec(`echo "${mode}" > ${paths.fanModeTTP}`);
};
