var $ = require('jquery')
var tri = require('tripartite')

require('./pages')
var UploadableImage = require('ei-pic-browser/uploadable-image')

window.CKEDITOR_BASEPATH = '/'
require('ckeditor')

// custom config
// CKEDITOR.config.customConfig = '/ck-textarea-config.js'

$('.app-page input[type=text].picture-input-field').each(function() {
        new UploadableImage(this)
})


require('webhandle-page-editor/app-client')
/*
require('../node_modules/@dankolz/ei-people-groups-1/client-js/people-groups-client.js')
require('../node_modules/@dankolz/sponsors/client-js/sponsors.js')
require('../node_modules/webhandle-calendar/client-js/calendar-app-client.js')
require('../node_modules/@dankolz/webhandle-jobs/client-js/jobs-client.js')
require('ei-slideshow-1/client-js/slideshow-client')
require('../node_modules/@dankolz/webhandle-news/client-js/app.js')
*/
