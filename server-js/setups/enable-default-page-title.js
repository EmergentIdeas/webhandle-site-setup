const webhandle = require('webhandle')

function enableDefaultPageTitle() {
	webhandle.pageServer.preRun.push((req, res, next) => {
		if(!res.locals.page) {
			res.locals.page = {}
		}
		if(!res.locals.page.title) {
			res.locals.page.title = dbName
		}
		next()
	})

}

module.exports = enableDefaultPageTitle