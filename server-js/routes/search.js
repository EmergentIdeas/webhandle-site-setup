

var express = require('express');
var router = express.Router();

const filog = require('filter-log')
let log = filog('webhandle:search')
const _ = require('underscore')


const wh = require('webhandle')

let idex = require('webhandle-indexer')

const commingle = require('commingle')



router.use('/search', (req, res, next) => {
	let items = idex.indexer.search(req.body.term || req.query.term).map((item) => {
		return item.replace('.tri', '').replace('.json', '').replace('.html', '')
	})
	
	items = _.uniq(items)
	
	res.locals.results = []
	let finds = []
	items.forEach((item) => {
		finds.push((one, two, next) => {
			wh.pageServer.findPageInfo(item, (err, info) => {
				if(!info.pageInfo) {
					info.pageInfo = {}
				}
				if(!info.pageInfo.title) {
					info.pageInfo.title = ''
				}	
				let barDex = info.pageInfo.title.indexOf("|")
				if(barDex > 0 ) {
					info.pageInfo.title = info.pageInfo.title.substring(0, barDex)
				}
				if(info.pageInfo.pageVisibility != 'private') {
					res.locals.results.push({
						path: item,
						title: info.pageInfo.title,
						description: info.pageInfo.description
					})
				}
				next()
			})
		})
	})
	
	commingle(finds)(null, null, () => {
		res.locals.searchTerm = req.body.term || req.query.term
		res.locals.page = res.locals.page || {}
		res.locals.page.title = 'Search: ' + res.locals.searchTerm + ' | Search Results'
		next()
	})
	
})

module.exports = router
