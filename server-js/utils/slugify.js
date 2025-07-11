function slugify(value = '') {
	if(typeof value !== 'string') {
		value = value.toString()
	}
	value = value.replace(/[^a-z0-9-.]/gi, '-').toLowerCase();
	while(value.startsWith('-')) {
		value = value.substring(1)
	}
	while(value.endsWith('-')) {
		value = value.substring(0, value.length - 1)
	}
	while(value.includes('--')) {
		value = value.split('--').join('-')
	}
	return value
}

module.exports = slugify