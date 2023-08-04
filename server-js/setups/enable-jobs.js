const jobsIntegrator = require('@dankolz/webhandle-jobs/server-js/webhandle-jobs-integrator')
function enableJobs(dbName) {
	jobsIntegrator(dbName)

}

module.exports = enableJobs