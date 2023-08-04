const newsIntegrator = require('@dankolz/webhandle-news/webhandle-news-integrator')
function enableNews(dbName) {
	newsIntegrator(dbName)

}

module.exports = enableNews