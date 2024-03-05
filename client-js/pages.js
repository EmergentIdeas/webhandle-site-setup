window.require = require
// window.jQuery = window.$ = require('jquery')


var tri = require('tripartite')
var tripartite = tri

/*
const SwipeListener = require('swipe-listener')
const Shiner = require('shiner/shiner-no-jquery')($)
window.Shiner = Shiner
let createShows = require('shiner/create-shows')
*/

/*
	createShows(Shiner, SwipeListener ).forEach(shine => shine.shineOn())
*/
/*
	require('./enable-remote-logging')
*/

let tribar = document.querySelector('header .tribar')
if(tribar) {
	tribar.addEventListener('click', function (evt) {
		evt.preventDefault()
		document.querySelector('header nav').classList.toggle('open')
		document.querySelector('body').classList.toggle('locked');
	})
}

