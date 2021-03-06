// const webhandle = require('webhandle')
// const commingle = require('commingle')
// const usersSetup = require('webhandle-users/integrate-with-webhandle')
// const path = require('path')
// const express = require('express');


const filog = require('filter-log')
let log
/*
const calendarInit = require('webhandle-calendar/handles/webhandle-calendar-admin')
const sortEvents = require('webhandle-calendar/services/event-sort')

const peopleGroupsIntegrator = require('@dankolz/ei-people-groups-1/server-js/webhandle-people-groups-integrator')
const jobsIntegrator = require('@dankolz/webhandle-jobs/server-js/webhandle-jobs-integrator')
const slideIntegrator = require('ei-slideshow-1/server-js/webhandle-slideshow-integrator')
*/

module.exports = function(app) {
	let dbName = "thedbname"
	log = filog(dbName)
	//	app.use('/', require('./routes/index'));


	// Add the user auth
	// require('./enable-users')(dbName, defaultAdminPassword)
	
	// Custom menu
	// require('./enable-menu')()

	// Add the page editor
	// require('./enable-page-editor')()

	// add a couple javascript based tripartite templates. More a placeholder
	// for project specific templates than it is a useful library.
	require('./add-templates.js')()

	// app.use(require('./routes/contact-forms'))

	/*
	slideIntegrator(dbName, {
		addTemplateDir: false
	})

	calendarInit({
		mongoDb: webhandle.dbs[dbName].db,
		pretemplate: 'app_pre',
		posttemplate: 'app_post'
	})
	peopleGroupsIntegrator(dbName)
	jobsIntegrator(dbName)
	require('@dankolz/webhandle-news/webhandle-news-integrator')(dbName)
	*/
	
	
	/*
	webhandle.pageServer.preRun.push((req, res, next) => {
		if(!res.locals.page) {
			res.locals.page = {}
		}
		if(!res.locals.page.title) {
			res.locals.page.title = dbName
		}
		next()
	})
	*/
}

