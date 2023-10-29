window.require = require
window.jQuery = window.$ = require('jquery')


var tri = require('tripartite')
var tripartite = tri

/*
const SwipeListener = require('swipe-listener')
const Shiner = require('shiner/shiner-no-jquery')($)
window.Shiner = Shiner
let createShows = require('shiner/create-shows')
*/

$(function() {
/*
	createShows(Shiner, SwipeListener ).forEach(shine => shine.shineOn())
*/
/*
	require('./enable-remote-logging')
*/

	$('header .tribar').on('click', function(evt) {
		evt.preventDefault()
		$('header nav').toggleClass('open')
		$('body').toggleClass('locked');
	})
	$('header .menu li').removeClass('current')
	$('header .menu a').each(function() {
		if($(this).attr('href') == window.location.pathname) {
			$(this).closest('li').addClass('current')
		}
	})
})
