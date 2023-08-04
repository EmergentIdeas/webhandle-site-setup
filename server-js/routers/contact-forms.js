var express = require('express');
var router = express.Router();

const filog = require('filter-log')
let log = filog('webhandle:contact-form')

const moment = require('moment')

const webhandle = require('webhandle')
const path = require('path')
const createIdQuery = require('../utils/create-id-query');

let savedEmailsCollectionName = "emailmessages"

const Emailer = require('webhandle-emailer/webhandle-emailer')
let mail = new Emailer()

let webhandleEmail
if (process.env.webhandleEmail) {
	if (typeof process.env.webhandleEmail == 'string') {
		try {
			webhandleEmail = JSON.parse(process.env.webhandleEmail)
		} catch (e) {
			log.error('Could not parse webhandleEmail options: ' + e.message)
		}
	}
}


let adminRouter = require('./admin-only')

/**
 * Returns a collection with specified name.
 * @param {string} name - The name of the collection.
 * @param {string} [dbName] - The name of the database. If not provided, the first
 * database will be chosen.
 * @returns A mongo collection object if found, otherwise null
 */
function getCollection(name, dbName) {
	let dbNames = Object.keys(webhandle.dbs)
	if(dbNames.length == 0) {
		return null
	}
	if(!dbName) {
		dbName = dbNames[0]
	}
	if(!dbNames.includes(dbName)) {
		return null
	}
	if (!webhandle.dbs[dbName].collections[name]) {
		webhandle.dbs[dbName].collections[name] = webhandle.dbs[dbName].db.collection(name)
	}
	return webhandle.dbs[dbName].collections[name] 
}

function createSaveMessage(messageType, renderTemplate) {

	return function(mailOptions, req, options, dat) {
		let now = new Date()
		let col = getCollection(savedEmailsCollectionName)
		if(col) {
			let saveInfo = {
				messageType: messageType
				, contents: mailOptions
				, date: now
				, renderTemplate: renderTemplate
				, data: dat
			}
			col.insertOne(saveInfo)
		}
	}
}

function isValueTrue(context) {
	if (typeof context == 'undefined') {
		return false
	}

	if (context === null || context === undefined || context === false) {
		return false
	}

	if (typeof context == 'string') {
		if (context) {
			return true
		}
		return false
	}
	if (typeof context == 'object') {
		return true
	}
	if (typeof context == 'array') {
		return context.length > 0
	}

	return false
}


let blacklisted = [
	"bestadultdating", 
	"sex in your city", 
	"Meet sexy girls",
	"Beautiful women", 
	"for sex in",
	"Looking for a boyfriend",
	"Beautiful girls",
	"Bitcoin", 
	"sex", 
	"sexy", 
	"dating", 
	"flirting",
	"viagra",
	"epileptogenesis",
	"ketoacidosis",
	"celiac",
	"webcam",
	"https:",
	"http:",
	"fuck"
]



const spamcheck = (req, res, callback) => {
	
	log.error('spamcheck run')
	let txt = JSON.stringify(req.body).toLowerCase()
	
	if(req.body.email) {
		if(req.body.email.toLowerCase().endsWith('.ru')) {
			log.error('spam blocked')
			return callback(new Error('email address ends with ru'))
		}
		if(req.body.email.toLowerCase().indexOf('.site') > -1) {
			log.error('spam blocked')
			return callback(new Error('email address ends with site'))
		}
		if(req.body.email.toLowerCase().indexOf('mail.ru') > -1) {
			log.error('spam blocked')
			return callback(new Error('email address ends with site'))
		}
		if(req.body.email.toLowerCase().indexOf('href') > -1) {
			log.error('spam blocked')
			return callback(new Error('email address has href'))
		}
		if(req.body.email.toLowerCase().indexOf('<') > -1) {
			log.error('spam blocked')
			return callback(new Error('email address has gt'))
		}
	}
	for(let phrase of blacklisted) {
		if(txt.indexOf(phrase.toLowerCase()) > -1) {
			log.error('spam blocked')
			return callback(new Error('Found blacklisted term: ' + phrase))
		}
	}
	if(txt.indexOf('@mail.ru') > -1) {
		log.error('spam blocked')
		return callback(new Error('Form contains @mail.ru'))
	}
	callback()
	
}

router.post('/contact', async (req, res, next) => {
	let configCol = getCollection('configuration')

	let config = {}
	if(configCol) {
		config = (await configCol.find({configurationId: 'siteconfig'}).toArray())[0]
	}
	if(!config) {
		config = {}
	}


	let destination = config.defaultContactEmail || webhandleEmail.destDefault
	let handler = mail.createFormHandler({
		to: destination,
		subject: () => "Contact from the site at " + moment().format("MM/DD/YY hh:mm a"),
		emailTemplate: 'contact-email',
		redirectUrl: '/thank-you.html',
		from: 'website@example.org',
		spamCheck: spamcheck,
		addTemplates: addTemplates,
		noVrf: true,
		preRenderProcessor: createSaveMessage('contact', 'contact-email')
		// , vrf: '12'
	})
	handler(req, res, next)
})

function addTemplates(tri) {
	tri.addTemplate('contact-forms/yesNo', function(context) {
		return isValueTrue(context) ? 'yes' : 'no'
	})
}



adminRouter.get('/admin/contact-messages', async (req, res, next) => {
	let messagesCol = getCollection('emailmessages')
	let messages = await messagesCol.find({}).toArray()
	messages.sort((one, two) => {
		return one.date.getTime() > two.date.getTime() ? -1 : 1
	})
	res.locals.messages = messages
	next()
})

adminRouter.get('/admin/contact-message/:id', async (req, res, next) => {
	let messagesCol = getCollection('emailmessages')
	let messages = await messagesCol.find(createIdQuery(req.params.id)).toArray()
	
	res.locals.message = messages[0]
	req.pagePath = '/admin/contact-message-detail'
	next()
})


module.exports = router;
