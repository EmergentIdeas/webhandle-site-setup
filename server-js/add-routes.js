// const webhandle = require('webhandle')
// const commingle = require('commingle')

module.exports = function(app) {
	app.use('/', require('./routes/index'));
	
}

