
const express = require('express')
const allowGroups = require('webhandle-users/utils/allow-group')

/**
 * Creates a router which will only allow users of the 'admnistrators' group
 * (or whatever groups are specified) to access the routes.
 */
function secureRouter(router, {groups = ['administrators']} = {}) {
	router = router || express.Router()
	let securedRouter = allowGroups(groups, router)
	secureRouter.innerRouter = router

	return securedRouter
}

module.exports = secureRouter