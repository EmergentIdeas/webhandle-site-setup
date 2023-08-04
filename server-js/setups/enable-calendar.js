const calendarInit = require('webhandle-calendar/handles/webhandle-calendar-admin')
// const sortEvents = require('webhandle-calendar/services/event-sort')
let webhandle = require('webhandle')

function enableCalendar(dbName) {
	calendarInit({
		mongoDb: webhandle.dbs[dbName].db,
		pretemplate: 'app_pre',
		posttemplate: 'app_post'
	})

}

module.exports = enableCalendar