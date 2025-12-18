var $ = window.jQuery = require('jquery')
var tri = require('tripartite')

require('./pages')

const { ImageBrowserView, FileSelectDialog, loadStyles  } = require('@webhandle/tree-file-browser/client-lib/dynamic-load.mjs')

var editing = require('webhandle-page-editor')
editing({
	configFile: '/webhandle-page-editor/std-config.js',
	fileFunctionsPrefix: '/webhandle-page-editor'
})

// Prevents a link which is being editing acting as a link
for(let a of document.querySelectorAll('a')) {
	a.addEventListener('click', (evt) => {
		if(a.querySelector('.cke_editable')) {
			evt.stopPropagation()
			evt.preventDefault()
		}
	})
}


