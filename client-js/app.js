var $ = require('jquery')
var tri = require('tripartite')

require('./pages')
var UploadableImage = require('ei-pic-browser/uploadable-image')

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

	$('.app-page input[type=text].picture-input-field').each(function() {
			new UploadableImage(this)
	})


	require('webhandle-page-editor/app-client')
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

