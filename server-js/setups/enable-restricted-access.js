const webhandle = require('webhandle')
const AccessRequired = require('webhandle-users/errors/access-required')
const AuthorizationRequired = require('webhandle-users/errors/authorization-required')
const _ = require('underscore')

/**
 * Restricts the access to a url pattern to signed in users who belong to one
 * of the listed groups.
 * 
 * ex: enableRestrictedAccess(/\/internal.*?/, ['administrators', 'employees'])
 * 
 * @param {string : regex} url 
 * @param {Array(string)} groups 
 */
function enableRestrictedAccess(url, groups) {

	webhandle.routers.preStatic.use(url, (req, res, next) => {
		if (!req.user) {
			return next(new AuthorizationRequired())
		}
		if (!req.user.groups) {
			return next(new AccessRequired())
		}
		if (_.intersection(req.user.groups, groups).length == 0) {
			return next(new AccessRequired())
		}
		next()
	})

}

module.exports = enableRestrictedAccess