var shell = require('shelljs');
var Slider = require('bootstrap-slider');
var sudo = require('sudo-prompt');
shell.config.execPath = shell.which('node').toString();

var options = {
	name: 'Electron',
};
sudo.exec('chmod -R o+rwx /sys/devices/platform/faustus/fan_mode /sys/devices/platform/faustus/leds/asus::kbd_backlight/brightness /sys/devices/platform/faustus/kbbl/*', options, function(error, stdout, stderr) {
	if (error) throw error;
	console.log('stdout: ' + stdout);
});

var normalBtn = document.getElementById('normal');
var boostBtn = document.getElementById('boost');
var silentBtn = document.getElementById('silent');

var slider = new Slider('#ex1', {
	formatter: function(value) {
		// shell.exec(`echo "${value}" > /sys/devices/platform/faustus/leds/asus::kbd_backlight/brightness`);
		document.getElementById('ex6SliderVal').textContent = value;
	},
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
