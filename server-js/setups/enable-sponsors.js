let initialized = false
const sponsorsIntegrator = require('@dankolz/sponsors/server-js/sponsors-integrator')
function enableSponsors(dbName) {
	if(!initialized) {
		initialized = true
		sponsorsIntegrator(dbName)
	}
}

module.exports = enableSponsors