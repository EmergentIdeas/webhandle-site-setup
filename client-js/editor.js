var $ = window.jQuery = require('jquery')
var tri = require('tripartite')

require('./pages')

const { ImageBrowserView, FileSelectDialog, loadStyles  } = require('@webhandle/tree-file-browser/client-lib/dynamic-load.mjs')

var editing = require('webhandle-page-editor')
editing({
	configFile: '/webhandle-page-editor/std-config.js',
	fileFunctionsPrefix: '/webhandle-page-editor'
})




