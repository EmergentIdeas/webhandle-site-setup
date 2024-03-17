
let websafeChars = 'abcdefghijklmnopqrstuvwxyz_1234567890'.split('')

function makeWebSafe(value) {
	value = value.toLowerCase()
	let result = ''
	for (let c of value) {
		if (websafeChars.includes(c)) {
			result += c
		}
		else {
			result += '-'
		}
	}
	result = result.replace(/--+/g, '-')

	return result
}

module.exports = makeWebSafe