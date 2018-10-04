const moment = require('moment')
let tripartite = require('tripartite')
const webhandle = require('webhandle')

let templates = {}

let loadTemplates = function() {
	webhandle.templateLoaders.push((name, callback) => {
		callback(templates[name])
	})

	templates['humanDate'] = (data) => {
		return moment(data).format('MMMM Do YYYY, h:mm:ss a')
	}

	templates['insert-public-file-contents'] = () => {
	}

	templates['insert-public-file-contents'].write = (thedata, stream, callback) => {
		webhandle.sinks.project.read('public' + thedata, (err, data) => {
			if (data) {
				stream.write(data.toString(), "UTF-8", () => {
					if (callback) {
						callback()
					}
				})
			} else {
				if (callback) {
					callback()
				}
			}
		})
	}
}

module.exports = loadTemplates