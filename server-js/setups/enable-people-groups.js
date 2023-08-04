const peopleGroupsIntegrator = require('@dankolz/ei-people-groups-1/server-js/webhandle-people-groups-integrator')
function enablePeopleGroups(dbName) {
	peopleGroupsIntegrator(dbName)

}

module.exports = enablePeopleGroups