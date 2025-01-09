var $ = require('jquery')
var tri = require('tripartite')

require('./pages')
var UploadableImage = require('ei-pic-browser/uploadable-image')

const setup = require('@webhandle/event-notification-panel').setup



window.CKEDITOR_BASEPATH = '/ckeditor/'

async function appSetup() {
	let escapeAttributeValue = require('../server-js/utils/escape-attribute-value')
	tri.templates['escAttr'] = (val) => {
		if (val && typeof val == 'string') {
			return escapeAttributeValue(val, true)
		}
		return val
	}


	// custom config
    CKEDITOR.config.customConfig = '/webhandle-page-editor/std-config.js' 

	require('webhandle-page-editor/app-client')

	let upcastFileInPicture = require('@webhandle/file-in-input').default
	upcastFileInPicture()

	$('.app-page input[type=text].picture-input-field').each(function() {
			new UploadableImage(this)
	})

	/*
	require('@dankolz/ei-people-groups-1/client-js/people-groups-client.js')
	require('@dankolz/sponsors/client-js/sponsors.js')
	require('webhandle-calendar/client-js/calendar-app-client.js')
	require('@dankolz/webhandle-jobs/client-js/jobs-client.js')
	require('ei-slideshow-1/client-js/slideshow-client')
	require('@dankolz/webhandle-news/client-js/app.js')
	*/
}

if(window.CKEDITOR) {
	appSetup()
}
else {
	let ckscript = document.createElement('script');
	ckscript.setAttribute('src','/ckeditor/ckeditor.js');
	ckscript.onload = function() {
		appSetup()
	}
	document.head.appendChild(ckscript)
}

function addPanel() {
	// If the event panel hasn't been added to the page by somebody else yet.
	if (!window.webhandle || !window.webhandle.eventPanel) {
		let panel = setup({
			notificationHolder: '#event-notifications' /* The selector of the element to which the
													panel should be added. */
		})

		if (window.initialPageMessages) {
			for (let msg of window.initialPageMessages) {
				panel.addNotification({
					model: {
						status: 'info',
						headline: msg
					}
				})
			}
		}
	}
}

if (document.readyState === "loading") {
	document.addEventListener("DOMContentLoaded", addPanel);
}
else {
	addPanel()
}
