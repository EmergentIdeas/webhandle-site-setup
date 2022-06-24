var $ = require('jquery')
var tri = require('tripartite')

window.CKEDITOR_BASEPATH = '/'
require('./pages')


var editing = require('webhandle-page-editor')
editing({
	configFile: '/webhandle-page-editor/std-config.js',
	fileFunctionsPrefix: '/webhandle-page-editor'
})




