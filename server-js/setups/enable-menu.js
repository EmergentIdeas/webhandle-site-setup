const webhandle = require('webhandle')
const express = require('express');
const secureRouter = require('../utils/secure-router')

let setup = () => {

	let adminRouter = express.Router()
	adminRouter.get('/menu', (req, res, next) => {
		res.render('menu')
	})
	let securedAdminRouter = secureRouter(adminRouter, {groups: ['administrators', 'page-editors']})
	webhandle.routers.primary.use(securedAdminRouter)

}

module.exports = setup