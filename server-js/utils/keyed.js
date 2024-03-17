
/**
 * Arranges a list into a keyed object
 * @param {array | iterable} list The list of objects to key
 * @param {*} keyProperty The name of the property to get the key from
 * @returns An object where the key property names are the attributes of the objects
 */
function keyed(list, keyProperty) {
	let result = [...list].reduce((acc, opt) => {
		acc[opt[keyProperty]] = opt
		return acc
	}, {})

	return result
}

module.exports = keyed