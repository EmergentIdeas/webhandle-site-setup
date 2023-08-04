const moment = require('moment')
const webhandle = require('webhandle')
const slugify = require('./utils/slugify')

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
	let escapeAttributeValue = require('../server-js/utils/escape-attribute-value')
	templates['escAttr'] = (val) => {
		if (val && typeof val == 'string') {
			return escapeAttributeValue(val, true)
		}
		return val
	}

	templates['slugify'] = (data) => {
		return slugify(data)
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
	}
	templates['humanDate'] = (data) => {
		return moment(data).format('MMMM Do YYYY, h:mm:ss a')
	}

	templates['insertPublicFileContents'] = () => {
	}

	templates['insertPublicFileContents'].write = (thedata, stream, callback) => {
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

	templates['insertPublicDirectoryContents'] = () => {
	}

	templates['insertPublicDirectoryContents'].write = (thedata, stream, callback) => {
		webhandle.sinks.project.getFullFileInfo('public' + thedata, (err, data) => {
			if (data) {
				let result = ''
				function readNextFile() {

					if(data.children.length == 0) {
						stream.write(result, "UTF-8", () => {
							if (callback) {
								callback()
							}
						})
					}
					else {
						let child = data.children.pop()
						webhandle.sinks.project.read(child.relPath, (err, fileData) => {
							result += fileData.toString()
							readNextFile()
						})
					}
				}
				readNextFile()
			} else {
				if (callback) {
					callback()
				}
			}
		})
	}
}

module.exports = loadTemplates
