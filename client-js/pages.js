window.require = require
window.jQuery = window.$ = require('jquery')


var tri = require('tripartite')
var tripartite = tri


/*


var SwipeListener = require('swipe-listener')

var Shiner = require('shiner/shiner-no-jquery')($)
window.Shiner = Shiner

var total = $('.shiner-show .slide').length

if (total > 1) {

	$('.shiner-show .slide').addClass('invisible').eq(0).removeClass('invisible').addClass('visible')
	$('.shiner-show').addClass('transitions-on')


	for(var i = 0; i < total; i++) {
		$('.shiner-show .dots').append('<div class="dot">&nbsp;</div>')
	}

	$('.shiner-show .dots .dot').eq(0).addClass('current')

	var options = {}
	if (window.shinerDelay) {
		options.delay = window.shinerDelay
	}

	var shine = $('.shiner-show .slide').shiner(options)
	window.shine = shine


	$('.shiner-show .advance').on('click', function (evt) {
		shine.next()
	})
	$('.shiner-show .previous').on('click', function (evt) {
		shine.previous()
	})

	shine.onVisible = function (slide, ind) {
		var $placeOf = $('.shiner-show .place-of')
		if ($placeOf.length > 0) {
			$placeOf.html((ind + 1) + ' of ' + total)
		}

		var $theShow = $(slide).closest('.shiner-show')
		$theShow.find('.dot').removeClass('current').eq(ind).addClass('current')
	}


	var container = $('.shiner-show').get(0)
	try {
		window.shinerSwipeListener = SwipeListener(container)
		container.addEventListener('swipe', function (e) {
			var directions = e.detail.directions
			var x = e.detail.x
			var y = e.detail.y

			if (directions.left) {
				shine.next()
			}
			if (directions.right) {
				shine.previous()
			}
		})
	}
	catch(e) {
		
	}

	$('.shiner-show .dots .dot').on('click', function(evt) {
		var dotPos = $('.shiner-show .dots .dot').index(this)
		shine.showSlide(dotPos)
	})


}
else {
	$('.shiner-show .slide').removeClass('invisible').addClass('visible')
	$('.shiner-show').addClass('transitions-on')
}


*/

$('header .tribar').on('click', function(evt) {
	evt.preventDefault()
	$('header .menu').toggleClass('open')
	$('body').css('overflow', 'hidden');
})