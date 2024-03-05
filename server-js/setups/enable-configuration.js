const ConfigurationDreck = require('dreck/configuration-dreck')
const express = require('express')
const webhandle = require('webhandle')
function enableConfiguration(dbName) {
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
	webhandle.routers.primary.use('/admin/config', siteConfigRouter)
	// Fetch configuration like:
	// let config = (await webhandle.dbs[dbName].collections.configuration.find({configurationId: 'siteconfig'}).toArray())[0]
	webhandle.pageServer.preRun.push(async (req, res, next) => {
		res.locals.config = (await webhandle.dbs[dbName].collections.configuration.find({configurationId: 'siteconfig'}).toArray())[0]
		next()
	})

}

module.exports = enableConfiguration