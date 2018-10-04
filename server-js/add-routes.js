// const webhandle = require('webhandle')
// const commingle = require('commingle')
// const usersSetup = require('webhandle-users/integrate-with-webhandle')
// const path = require('path')
// const express = require('express');


module.exports = function(app) {
	//	app.use('/', require('./routes/index'));


	// Add the user auth
	
	// let auth = usersSetup({
	// 	app: webhandle, 
	// 	// set this db up in the env file
	// 	mongoDb: webhandle.dbs.dbName.db, 
	// 	pretemplate: 'app_pre', 
	// 	posttemplate: 'app_post',
	// 	onLogin: (req, res, next) => {
	// 		// This is a handle that gets run when a user successully logs in
	// 		res.redirect('/menu')
	// 	}
	// })	
	// auth.createUserIfNoneExists('administrator', 'change_this_password', ['administrators'])

	// Custom menu
	
	// let adminRouter = express.Router()
	// adminRouter.get('/menu', (req, res, next) => {
	// 	res.render('menu')
	// })
	// let securedAdminRouter = require('webhandle-users/utils/allow-group')(
	// 	['administrators', 'page-editors'],
	// 	adminRouter
	// )
	// webhandle.routers.primary.use(securedAdminRouter)


	// Add the page editor
	
	// let pageEditingRouter = express.Router()
	// require('webhandle-page-editor/webhandle-integrator')(webhandle, path.join(webhandle.projectRoot, 'pages'), pageEditingRouter)
	// let securedRouter = require('webhandle-users/utils/allow-group')(
	// 	['administrators', 'page-editors'],
	// 	pageEditingRouter
	// )
	// webhandle.routers.primary.use('/webhandle-page-editor', securedRouter)

	require('./add-templates.js')
}

