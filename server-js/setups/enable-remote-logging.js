let express = require('express')
const remoteClientLogger = require('@dankolz/remote-client-logger')
const webhandle = require('webhandle')
const filog = require('filter-log')
let log = filog('remote-logging')


function enableLogging() {

	let loggingRouter = express.Router()
	remoteClientLogger(loggingRouter, {
		infoHandler: (msg) => {
			log.info(msg)
		}
		, errorHandler: (msg) => {
			log.error(msg)
		}
		, debugHandler: (msg) => {
			log.debug(msg)
		}
	})

	webhandle.routers.primary.use('/remote-logging', loggingRouter)
}

module.exports = enableLogging
