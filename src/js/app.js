(function($) {
	$(window).load(() => {
		// Page loader
		$('body').imagesLoaded(() => {
			$('.page-loader div').fadeOut();
			$('.page-loader')
				.delay(200)
				.fadeOut('slow');
		});

		$(window).trigger('scroll');
		$(window).trigger('resize');

		// Hash menu forwarding
		if (window.location.hash && $(window.location.hash).length) {
			const hashOffset = $(window.location.hash).offset().top;
			$('html, body').animate({
				scrollTop: hashOffset,
			});
		}
	});

	$(document).on('ready', () => {
		$(window).trigger('resize');
		initNavbarNav();
	});

	$(window).on('resize', () => {
		initNavbarResize();
	});
})($);

/* ---------------------------------------------
 Body Margin to Nav Size && Mobile On - on resize
 --------------------------------------------- */
function initNavbarResize() {
	// Sets Body Margin to Nav Size
	document.querySelector('body').style.marginTop = `${document.querySelector('.navbar').offsetHeight}px`;
	// Mobile On - on resize
	if ($(window).width() <= 850) {
		$('.navbar').addClass('mobile-on');
	} else if ($(window).width() > 850) {
		$('.navbar').removeClass('mobile-on');
	}
}

/* ---------------------------------------------
 Hamburger Animation and Dropdown
 --------------------------------------------- */
function initNavbarNav() {
	/* Hamburger Animation and Dropdown */
	$('.hamburger').on('click', () => {
		$('.hamburger__menu--bar').toggleClass('animate');
		$('.navbar__bottom--nav').toggleClass('js-show-menu');
	});

	/* Sub Nav - Mobile */
	const mnHasSub = $('.has__sub-nav');
	let mnThisLi;

	$('.mobile-on .has__sub-nav').removeClass('subnav-opened');

	mnHasSub.click(function() {
		if ($('.navbar').hasClass('mobile-on')) {
			mnThisLi = $(this).parent('li:first');
			if (mnThisLi.hasClass('js-opened')) {
				mnThisLi.find('.sub-nav:first').slideUp(() => {
					mnThisLi.removeClass('js-opened');
					mnThisLi.find('.has__sub-nav').removeClass('subnav-opened');
				});
			} else {
				mnThisLi.find('.has__sub-nav').addClass('subnav-opened');
				mnThisLi.addClass('js-opened');
				mnThisLi.find('.sub-nav:first').slideDown();
			}

			return false;
		}
	});

	/* Sub Nav - Desktop */
	mnThisLi = mnHasSub.parent('li');
	mnThisLi.hover(
		function() {
			if (!$('.navbar').hasClass('mobile-on')) {
				$(this)
					.find('.has__sub-nav:first')
					.addClass('sub-nav-open');
				$(this)
					.find('.sub-nav:first')
					.stop(true, true)
					.fadeIn('fast');
			}
		},
		function() {
			if (!$('.navbar').hasClass('mobile-on')) {
				$(this)
					.find('.has__sub-nav:first')
					.removeClass('sub-nav-open');
				$(this)
					.find('.sub-nav:first')
					.stop(true, true)
					.delay(100)
					.fadeOut('fast');
			}
		}
	);
}

// const config3 = {
// 	id: '943235979355312128',
// 	domId: 'example3',
// 	maxTweets: 5,
// 	enableLinks: true,
// 	showImages: false,
// };
// twitterFetcher.fetch(config3);

const twitterFeed = {
	profile: { screenName: 'AAPAorg' },
	domId: 'twitterFeed',
	maxTweets: 3,
	enableLinks: true,
	showUser: true,
	showTime: true,
	showImages: false,
	lang: 'en',
};
