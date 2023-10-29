
let remoteLogger = window.remoteLogger = require('@dankolz/remote-client-logger/client-js/logging')('/remote-logging/')

remoteLogger.info({
	msg: 'page start'
})
window.onerror = function (msg, source, lineNo, columnNo, error) {
	let report = {
		messageType: 'browser-error',
		msg: msg,
		source: source,
		lineNo: lineNo,
		columnNo: columnNo,
		error: error
	}
	if (error) {
		report.stack = error.stack
	}
	remoteLogger.error(report)
}
function logError(e) {
	let report = {
		messageType: 'browser-error',
		msg: e.message,
		name: e.name,
		error: e,
		stack: e.stack
	}
	remoteLogger.error(report)
}

