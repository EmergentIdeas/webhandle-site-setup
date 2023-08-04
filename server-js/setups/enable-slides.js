const slideIntegrator = require('ei-slideshow-1/server-js/webhandle-slideshow-integrator')

function enableSlides(dbName) {
	slideIntegrator(dbName, {
		addTemplateDir: false
	})

}

module.exports = enableSlides