const moment = require('moment')
let tripartite = require('tripartite')
const webhandle = require('webhandle')

let templates = {}

let loadTemplates = function() {
	webhandle.templateLoaders.push((name, callback) => {
		callback(templates[name])
	})

	templates['humanDateOnly'] = (data) => {
		return moment(data).format('MMMM Do, YYYY')
	}
	templates['humanTimeOnly'] = (data) => {
		return moment(data).format('h:mm a')
	}
	templates['humanDateTime'] = (data) => {
		return moment(data).format('MMMM Do, YYYY h:mm a')
	}

	templates['slugify'] = (data) => {
		return slug(data)
	}
	templates['currentYear'] = (data) => {
		return moment(data).format('YYYY')
	}
	templates['dus'] = (data) => {
		let length
		try {
			if(Number.isInteger(data)) {
				length = data	
			}
			else if(Number.isInteger(parseInt(data))) {
				length = parseInt(data)
			}
		}
		catch(e) {}
		if(length) {
			let s = ''
			while(length > 0) {
				s += '_'
				length--
			}
			return s
		}
		else {
			return '__'
		}
		return moment(data).format('MMMM Do YYYY, h:mm:ss a')
	}
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