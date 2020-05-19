const sudo = require('sudo-prompt');
const paths = require('../path');

const options = {
	name: 'Electron',
};
const sudoPrompt = () => {
	sudo.exec(`chmod -R o+rwx ${paths.kModule}`, options, (error, stdout, stderr) => {
		if (error) throw error;
		console.log('stdout: ' + stdout);
	});
};
module.exports = sudoPrompt;
