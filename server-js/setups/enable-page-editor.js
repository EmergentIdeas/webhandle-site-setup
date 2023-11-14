const webhandle = require('webhandle')
const path = require('path')
const express = require('express');
const editorIntegrator = require('webhandle-page-editor/webhandle-integrator')
const secureRouter = require('../utils/secure-router')


let setup = async() => {
	let pageEditingRouter = express.Router()
	await editorIntegrator(webhandle, path.join(webhandle.projectRoot, 'pages'), pageEditingRouter)
	let securedRouter = secureRouter(pageEditingRouter, {groups: ['administrators', 'page-editors']})
	webhandle.routers.primary.use('/webhandle-page-editor', securedRouter)
}

module.exports = setup