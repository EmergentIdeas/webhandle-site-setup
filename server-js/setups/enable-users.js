const webhandle = require('webhandle')
const usersSetup = require('webhandle-users/integrate-with-webhandle')

let setup = (dbName, defaultAdminPassword) => {

	let auth = usersSetup({
		app: webhandle, 
		// set this db up in the env file
		mongoDb: webhandle.dbs[dbName].db, 
		pretemplate: 'app_pre', 
		posttemplate: 'app_post',
		onLogin: (req, res, next) => {
			// This is a handle that gets run when a user successully logs in
			res.redirect('/menu')
		}
	})	
	auth.createUserIfNoneExists('administrator', defaultAdminPassword, ['administrators'])

	// import('@webhandle/emailed-password-reset').then(({default: userInteractions}) => {
	// 	webhandle.routers.primary.use('/password-reset', userInteractions({
	// 		siteUrl: 'http://localhost:3000'
	// 		, templateName: 'reset-email'
	// 		, from: 'website@localhost'
	// 		, grecaptchaPrivate: process.env.grecaptchaPrivate
	// 		, requiredGrecaptchaScore: .4
	// 	}))
	// })
}

module.exports = setup