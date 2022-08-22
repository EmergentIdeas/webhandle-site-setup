function createIdQuery(id) {
	if(typeof id == 'object') {
		return id
	}
	let query;
	if(typeof id == 'string' && id.length == 24) {
		query = {
			id: Buffer.from(id, "hex"),
			_bsontype: "ObjectID"
		}
	}

	if(!query || query.id.toString('hex') != id) {
		query = {
			_id: id
		}
	}
	return query
}

module.exports = createIdQuery
