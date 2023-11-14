const webhandle = require('webhandle')
const filog = require('filter-log')
const enableRestrictedAccess = require('./setups/enable-restricted-access')

let log


module.exports = async function(app) {
	let firstDb = Object.keys(webhandle.dbs)[0]
	let dbName = firstDb || "unknowndb"
	log = filog(dbName)

	// add a couple javascript based tripartite templates. More a placeholder
	// for project specific templates than it is a useful library.
	require('./add-templates.js')()

	if(firstDb) {
		if(process.env.initialAdminPassword) {
			// Add the user auth
			require('./setups/enable-users')(dbName, process.env.initialAdminPassword)
		}
	}		

	enableRestrictedAccess(/\/admin.*/, ['administrators'])

	if(firstDb) {
		// Custom menu
		require('./setups/enable-menu')()

		// Add the page editor
		await require('./setups/enable-page-editor')()

		// require('./setups/enable-slides')(dbName)
		// require('./setups/enable-calendar')(dbName)
		// require('./setups/enable-people-groups')(dbName)
		// require('./setups/enable-jobs')(dbName)
		// require('./setups/enable-news')(dbName)
		// require('./setups/enable-configuration')(dbName)
	}


	// require('@dankolz/page-prerun-data-loader')()
	// app.use(require('./routers/contact-forms'))
	// require('./setups/enable-page-search')()
	

	require('./setups/enable-default-page-title')(dbName)
	// require('./setups/enable-social')()
	

}

