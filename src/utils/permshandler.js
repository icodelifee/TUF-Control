const fs = require('fs');
const paths = require('../path');
const sudoPrompt = require('./sudoprompt');

// check for read or write perms in module directory and 
// request for sudo perms if it doesnt have perms

const permsHandler = () => {
	fs.access(paths.kModule, fs.constants.R_OK | fs.constants.W_OK, (err) => {
		if (err) {
            console.error(err);
            sudoPrompt();
		}
	});
};

module.exports = permsHandler;
