const webhandle = require('webhandle')
// const commingle = require('commingle')
const usersSetup = require('webhandle-users/integrate-with-webhandle')
const path = require('path')
const express = require('express');

// const ConfigurationDreck = require('dreck/configuration-dreck')

const filog = require('filter-log')
const restrictAdminDirectory = require('./restrict-admin-directory')
let log
/*
const calendarInit = require('webhandle-calendar/handles/webhandle-calendar-admin')
const sortEvents = require('webhandle-calendar/services/event-sort')

const peopleGroupsIntegrator = require('@dankolz/ei-people-groups-1/server-js/webhandle-people-groups-integrator')
const jobsIntegrator = require('@dankolz/webhandle-jobs/server-js/webhandle-jobs-integrator')
const slideIntegrator = require('ei-slideshow-1/server-js/webhandle-slideshow-integrator')
const restrictInternalDirectory = require('./restrict-internal-directory')
*/

module.exports = function(app) {
	let firstDb = Object.keys(webhandle.dbs)[0]
	let dbName = firstDb || "unknowndb"
	log = filog(dbName)
	//	app.use('/', require('./routes/index'));

	if(firstDb && process.env.initialAdminPassword) {
		let preSecuredRouter = express.Router()
		let securedRouter = require('webhandle-users/utils/allow-group')(
			['administrators'],
			preSecuredRouter
		)
		webhandle.routers.primary.use(securedRouter)

		// Add the user auth
		require('./enable-users')(dbName, process.env.initialAdminPassword)
		
		// Custom menu
		require('./enable-menu')()

		// Add the page editor
		require('./enable-page-editor')()
	}

	// add a couple javascript based tripartite templates. More a placeholder
	// for project specific templates than it is a useful library.
	require('./add-templates.js')()
	restrictAdminDirectory()

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
	if(!webhandle.dbs[dbName].collections.configuration) {
		webhandle.dbs[dbName].collections.configuration = webhandle.dbs[dbName].db.collection('configuration')
	}
	let siteConfig = new ConfigurationDreck({
		mongoCollection: webhandle.dbs[dbName].collections.configuration,
		templatePrefix: 'site-config/',
		locals: {
			pretemplate: 'app_pre',
			posttemplate: 'app_post'
		},
		afterModifyUrl: '/menu',
		configurationId: 'siteconfig'
	})
	let siteConfigRouter = siteConfig.addToRouter(express.Router())
	preSecuredRouter.use('/admin/config', siteConfigRouter)
	*/
	// Fetch configuration like:
	// let config = (await webhandle.dbs[dbName].collections.configuration.find({configurationId: 'siteconfig'}).toArray())[0]
	
/*
    let idex = require('webhandle-indexer')
    idex.init(idex.getDefaultOptions({
        projectRoot: webhandle.projectRoot
    }))

    app.use(require('./routes/search'))
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

    webhandle.routers.primary.use((req, res, next) => {
        let pageInfo = res.locals.pageInfo = res.locals.pageInfo || {}
        const url = req.originalUrl;

        const fullUrl = `https://www.thesitename.com${url}`
        pageInfo.reqURL = fullUrl
        next()
    })

	webhandle.addTemplateDir(path.join(webhandle.projectRoot, 'node_modules/@dankolz/social-head-attributes/views'))
}

