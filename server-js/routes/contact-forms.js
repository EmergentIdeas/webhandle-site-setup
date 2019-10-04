var express = require('express');
var router = express.Router();

const filog = require('filter-log')
let log = filog('webhandle:contact-form')

const moment = require('moment')

const wh = require('webhandle')
const path = require('path')


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

router.post('/contact', mail.createFormHandler({
	to: webhandleEmail.destDefault,
	subject: () => "Contact from the site at " + moment().format("MM/DD/YY hh:mm a"),
	emailTemplate: 'contact-email',
	redirectUrl: '/thank-you.html',
	from: 'from@example.com',
	spamCheck: spamcheck,
	addTemplates: addTemplates,
	noVrf: true
	// , vrf: '12'
}));


function addTemplates(tri) {
	tri.addTemplate('contact-forms/yesNo', function(context) {
		return isValueTrue(context) ? 'yes' : 'no'
	})
}




module.exports = router;
