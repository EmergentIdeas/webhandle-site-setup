function slugify(value = '') {
	if(typeof value !== 'string') {
		value = value.toString()
	}
	return value.replace(/[^a-z0-9-.]/gi, '-').toLowerCase();
}

module.exports = slugify