let genBsonId

try {
	const {ObjectId} = require('bson')
	genBsonId = (val) => {
		let id = new ObjectId(val)
		return {
			_id: id
		}
	}

}
catch(e) {
	genBsonId = (val) => {
		return {
			_id: {
				id: Buffer.from(val, "hex"),
				_bsontype: "ObjectID",
			}
		}

	}
}


function createIdQuery(id) {
	if(typeof id == 'object') {
		return id
	}
	let query;
	if(typeof id == 'string' && id.length == 24) {
		query = genBsonId(id)
	}

	if(!query || query._id.toString('hex') != id) {
		query = {
			_id: id
		}
	}
	return query
}

module.exports = createIdQuery
