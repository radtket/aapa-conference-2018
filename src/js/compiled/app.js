'use strict';

/* ---------------------------------------------
 Hamburger Animation and Dropdown
 --------------------------------------------- */
var hamburgerButton = document.querySelector('.hamburger');

function hamburgerJig() {
	var hamburgerBar = hamburgerButton.querySelector('.hamburger__menu--bar');
	var navMenu = document.querySelector('.navbar__bottom--nav');
	hamburgerBar.classList.toggle('animate');
	navMenu.classList.toggle('js-show-menu');
}
hamburgerButton.addEventListener('click', hamburgerJig);

/* ---------------------------------------------
 Sets Body Margin to Nav Size
 --------------------------------------------- */

function setNavMargin() {
	var pageBody = document.querySelector('body');
	var headerNav = document.querySelector('.navbar');
	pageBody.style.marginTop = headerNav.offsetHeight + 'px';
}

document.addEventListener('DOMContentLoaded', setNavMargin);
window.addEventListener('resize', setNavMargin);

/* ---------------------------------------------
 Add Mobile Nav
 --------------------------------------------- */

function addMobileNav() {
	var navbar = document.querySelector('.navbar');
	if (window.innerWidth <= 850) {
		navbar.classList.add('mobile-on');
	} else {
		navbar.classList.remove('mobile-on');
	}
}

document.addEventListener('DOMContentLoaded', addMobileNav);
window.addEventListener('resize', addMobileNav);

var mnHasSub = $('.has__sub-nav');
var mnThisLi = void 0;

// $(".mobile-on .has__sub-nav").find(".fa:first").removeClass("fa-angle-right").addClass("fa-angle-down");

mnHasSub.click(function () {
	if ($('.navbar').hasClass('mobile-on')) {
		mnThisLi = $(this).parent('li:first');
		if (mnThisLi.hasClass('js-opened')) {
			mnThisLi.find('.sub-nav:first').slideUp(function () {
				mnThisLi.removeClass('js-opened');
				// mnThisLi.find(".has__sub-nav").find(".fa:first").removeClass("fa-angle-up").addClass("fa-angle-down");
			});
		} else {
			// $(this).find(".fa:first").removeClass("fa-angle-down").addClass("fa-angle-up");
			mnThisLi.addClass('js-opened');
			mnThisLi.find('.sub-nav:first').slideDown();
		}

		return false;
	}
});

mnThisLi = mnHasSub.parent('li');
mnThisLi.hover(function () {
	if (!$('.navbar').hasClass('mobile-on')) {
		$(this).find('.has__sub-nav:first').addClass('sub-nav-open');
		$(this).find('.sub-nav:first').stop(true, true).fadeIn('fast');
	}
}, function () {
	if (!$('.navbar').hasClass('mobile-on')) {
		$(this).find('.has__sub-nav:first').removeClass('sub-nav-open');
		$(this).find('.sub-nav:first').stop(true, true).delay(100).fadeOut('fast');
	}
});
