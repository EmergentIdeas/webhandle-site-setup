const webhandle = require('webhandle')
const AccessRequired = require('webhandle-users/errors/access-required')
const AuthorizationRequired = require('webhandle-users/errors/authorization-required')
const _ = require('underscore')

function restrictAccessDirectory() {
	webhandle.routers.preStatic.use(/\/admin.*/, (req, res, next) => {
		let groups = ['administrators']
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

module.exports = restrictAccessDirectory