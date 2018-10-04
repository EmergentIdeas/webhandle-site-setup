// const webhandle = require('webhandle')
// const commingle = require('commingle')
// const usersSetup = require('webhandle-users/integrate-with-webhandle')
// const path = require('path')
// const express = require('express');


module.exports = function(app) {
	//	app.use('/', require('./routes/index'));


	// Add the user auth
	// require('./enable-users')(dbName, defaultAdminPassword)
	
	// Custom menu
	// require('./enable-menu')()

	// Add the page editor
	// require('./enable-page-editor')()

	// add a couple javascript based tripartite templates. More a placeholder
	// for project specific templates than it is a useful library.
	require('./add-templates.js')
}

