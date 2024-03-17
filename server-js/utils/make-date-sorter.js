
function makeDate(input) {
	if(!input) {
		return new Date()
	}
	if(input instanceof Date == false) {
		return new Date(input)
	}
	return input
}

/**
 * Creates a function to sort by date
 * @param {string} fieldName The name of the field which contains the date
 * @returns 
 */
function makeDataSorter(fieldName) {
	return function sortByPubDate(obj1, obj2) {
		if(!obj1) {
			return -1
		}
		if(!obj2) {
			return 1
		}
		one = makeDate(obj1[fieldName])
		two = makeDate(obj2[fieldName])

		return one.getTime() < two.getTime() ? -1 : 1	
	}
}

module.exports = makeDataSorter