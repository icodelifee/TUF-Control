var shell = require('shelljs');
var sudo = require('sudo-prompt');
var fs = require('fs');
var Pickr = require('@simonwep/pickr');
shell.config.execPath = shell.which('node').toString();

var options = {
	name: 'Electron',
};
// sudo.exec(
// 	'chmod -R o+rwx /sys/devices/platform/faustus/fan_mode /sys/devices/platform/faustus/leds/asus::kbd_backlight/brightness /sys/devices/platform/faustus/kbbl/*',
// 	options,
// 	function(error, stdout, stderr) {
// 		if (error) throw error;
// 		console.log('stdout: ' + stdout);
// 	}
// );

var normalBtn = document.getElementById('normal');
var boostBtn = document.getElementById('boost');
var silentBtn = document.getElementById('silent');

const pickr = Pickr.create({
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
pickr.on('save', (color, instance) => {
	try {
		var data = fs.readFileSync('/sys/devices/platform/faustus/kbbl/kbbl_mode', 'utf8');
		shell.exec(
			'bash ' +
				__dirname +
				`/shell/color.sh ${color.toHEXA()[0]} ${color.toHEXA()[1]} ${color.toHEXA()[2]} ${data.toString()}`
		);
	} catch (e) {
		console.log('Error:', e.stack);
	}
});

document.getElementById('btn-speed').disabled = true;
$('input:radio').on('click', function(e) {
	if (e.target.name === 'mode') {
		if (e.currentTarget.id === '1' || e.currentTarget.id === '2') {
			document.getElementById('btn-speed').disabled = false;
		} else {
			document.getElementById('btn-speed').disabled = true;
		}
		shell.exec('bash ' + __dirname + '/shell/mode.sh ' + e.currentTarget.id);
	} else if (e.target.name === 'speed' && document.getElementById('btn-speed').disabled === false) {
		shell.exec('bash ' + __dirname + '/shell/speed.sh ' + e.currentTarget.id);
	} else if (e.target.name === 'brightness') {
		shell.exec(`echo "${e.currentTarget.id}" > /sys/devices/platform/faustus/leds/asus::kbd_backlight/brightness`);
	}
});

normalBtn.addEventListener('click', () => {
	shell.exec(`echo "0" > /sys/devices/platform/faustus/fan_mode`);
	disableOther();
	document.body.style.backgroundColor = '#11998e';
	document.querySelector('body').style.background = 'linear-gradient(to right, #11998e, #38ef7d)';
	document.body.style.backgroundRepeat = 'no-repeat';
	document.body.style.backgroundAttachment = 'fixed';
	normalBtn.style.backgroundColor = 'black';
	document.getElementById('normal-title').style.color = 'white';
});
boostBtn.addEventListener('click', () => {
	shell.exec(`echo "1" > /sys/devices/platform/faustus/fan_mode`);
	disableOther();
	document.body.style.backgroundColor = 'white';
	document.body.style.background = 'linear-gradient(45deg, #a73737, #7a2828)';
	document.body.style.backgroundRepeat = 'no-repeat';
	document.body.style.backgroundAttachment = 'fixed';
	boostBtn.style.backgroundColor = 'black';
	document.body.style.transition = 'color 2s';
	document.getElementById('boost-title').style.color = 'white';
});
silentBtn.addEventListener('click', () => {
	shell.exec(`echo "2" > /sys/devices/platform/faustus/fan_mode`);
	disableOther();
	document.body.style.backgroundColor = '#a4508b';
	document.body.style.background = 'linear-gradient(326deg, #a4508b 0%, #5f0a87 74%)';
	document.body.style.backgroundRepeat = 'no-repeat';
	document.body.style.backgroundAttachment = 'fixed';
	silentBtn.style.backgroundColor = 'black';
	document.getElementById('silent-title').style.color = 'white';
});

function disableOther() {
	normalBtn.style.backgroundColor = 'white';
	boostBtn.style.backgroundColor = 'white';
	silentBtn.style.backgroundColor = 'white';
	document.getElementById('normal-title').style.color = 'black';
	document.getElementById('boost-title').style.color = 'black';
	document.getElementById('silent-title').style.color = 'black';
}
