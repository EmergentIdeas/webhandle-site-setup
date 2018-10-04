const webhandle = require('webhandle')
const express = require('express');

let setup = () => {

	let adminRouter = express.Router()
	adminRouter.get('/menu', (req, res, next) => {
		res.render('menu')
	})
	let securedAdminRouter = require('webhandle-users/utils/allow-group')(
		['administrators', 'page-editors'],
		adminRouter
	)
	webhandle.routers.primary.use(securedAdminRouter)

}

module.exports = setup