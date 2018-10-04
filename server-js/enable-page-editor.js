const webhandle = require('webhandle')
const usersSetup = require('webhandle-users/integrate-with-webhandle')
const path = require('path')
const express = require('express');


let setup = () => {

	let pageEditingRouter = express.Router()
	require('webhandle-page-editor/webhandle-integrator')(webhandle, path.join(webhandle.projectRoot, 'pages'), pageEditingRouter)
	let securedRouter = require('webhandle-users/utils/allow-group')(
		['administrators', 'page-editors'],
		pageEditingRouter
	)
	webhandle.routers.primary.use('/webhandle-page-editor', securedRouter)
}

module.exports = setup