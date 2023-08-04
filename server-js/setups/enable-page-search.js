const webhandle = require('webhandle')
const idex = require('webhandle-indexer')
const searchRoutes = require('../routers/search')
function enablePageSearch() {
	idex.init(idex.getDefaultOptions({
		projectRoot: webhandle.projectRoot
	}))

	webhandle.routers.primary.use(searchRoutes)
}

module.exports = enablePageSearch