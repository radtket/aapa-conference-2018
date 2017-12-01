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

/* ---------------------------------------------
 Sub Nav - Mobile
 --------------------------------------------- */

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

/* ---------------------------------------------
 Sub Nav - Desktop
 --------------------------------------------- */

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

// Vanilla | Sub Nav - Desktop
// const subnavItems = document.querySelectorAll('.has__sub-nav');

// function navItemShow() {
// 	const navbar = document.querySelector('.navbar');
// 	if (!navbar.classList.contains('mobile-on')) {
// 		const li = this.parentNode;
// 		li.querySelector('.has__sub-nav').classList.add('sub-nav-open');
// 		li.querySelector('.sub-nav').style.display = 'block';
// 	}
// }

// function navItemHide() {
// 	const navbar = document.querySelector('.navbar');
// 	if (!navbar.classList.contains('mobile-on')) {
// 		const li = this.parentNode;
// 		li.querySelector('.has__sub-nav').classList.remove('sub-nav-open');
// 		li.querySelector('.sub-nav').style.display = 'none';
// 	}
// }

// subnavItems.forEach(subnavItem => subnavItem.addEventListener('mouseenter', navItemShow));
// subnavItems.forEach(subnavItem => subnavItem.addEventListener('mouseleave', navItemHide));

// Toggle
$('.accordion > dd').hide();
$('.accordion > dt > a').click(function () {
	if ($(this).hasClass('active')) {
		$(this).parent().next().slideUp('easeOutExpo');
		$(this).removeClass('active');
	} else {
		$(this).parent().next('dd');
		$(this).addClass('active');
		$(this).parent().next().slideDown('easeOutExpo');
	}

	return false;
});

// Tabs

$('.js-vertical-tab-content').hide();
$('.js-vertical-tab-content:first').show();

/* if in tab mode */

$('.js-vertical-tab').click(function (e) {
	e.preventDefault();

	$('.js-vertical-tab-content').hide();
	var activeTab = $(this).attr('rel');
	$('#' + activeTab).show();

	$('.js-vertical-tab').removeClass('is-active');
	$(this).addClass('is-active');

	$('.js-vertical-tab-accordion-heading').removeClass('is-active');
	$('.js-vertical-tab-accordion-heading[rel^=\'' + activeTab + '\']').addClass('is-active');
});

/* if in accordion mode */

$('.js-vertical-tab-accordion-heading').click(function (e) {
	e.preventDefault();

	$('.js-vertical-tab-content').slideUp('easeOutExpo');
	var accordionActiveTab = $(this).attr('rel');
	$('#' + accordionActiveTab).slideDown('easeOutExpo');

	$('.js-vertical-tab-accordion-heading').removeClass('is-active');
	$(this).addClass('is-active');

	$('.js-vertical-tab').removeClass('is-active');
	$('.js-vertical-tab[rel^=\'' + accordionActiveTab + '\']').addClass('is-active');
});

/* ---------------------------------------------
 Countdown Clock
 --------------------------------------------- */
// function getTimeRemaining(endtime) {
// 	const t = Date.parse(endtime) - Date.parse(new Date());
// 	const seconds = Math.floor((t / 1000) % 60);
// 	const minutes = Math.floor((t / 1000 / 60) % 60);
// 	const hours = Math.floor((t / (1000 * 60 * 60)) % 24);
// 	const days = Math.floor(t / (1000 * 60 * 60 * 24));
// 	return {
// 		total: t,
// 		days,
// 		hours,
// 		minutes,
// 		seconds,
// 	};
// }

// function initializeClock(id, endtime) {
// 	const clock = document.querySelector(id);
// 	const daysSpan = clock.querySelector('.days');
// 	const hoursSpan = clock.querySelector('.hours');
// 	const minutesSpan = clock.querySelector('.minutes');
// 	const secondsSpan = clock.querySelector('.seconds');
// 	let countdownInterval;

// 	function updateClock() {
// 		const t = getTimeRemaining(endtime);

// 		daysSpan.innerHTML = t.days;
// 		hoursSpan.innerHTML = `0${t.hours}`.slice(-2);
// 		minutesSpan.innerHTML = `0${t.minutes}`.slice(-2);
// 		secondsSpan.innerHTML = `0${t.seconds}`.slice(-2);

// 		if (t.total <= 0) {
// 			clearInterval(countdownInterval);
// 		}
// 	}

// 	updateClock();
// 	countdownInterval = setInterval(updateClock, 1000);
// }

// initializeClock('.js-countdown', new Date(2017, 12, 27));

/* ---------------------------------------------
 Tabs
 --------------------------------------------- */

function initTabs() {
	var tabs = document.querySelector('#tabs');
	var tabsNavItem = tabs.querySelectorAll('.agenda-tabs__nav--link');
	var tabsContainterItem = tabs.querySelectorAll('.agenda-tabs__content-item');
	var activeIndex = 0;

	function goToTab(index) {
		if (index !== activeIndex && index >= 0 && index <= tabsNavItem.length) {
			// Add/Remove class for nav-item
			tabsNavItem[activeIndex].classList.remove('is-active');
			tabsNavItem[index].classList.add('is-active');
			// Add/Remove class for containers
			tabsContainterItem[activeIndex].classList.remove('is-active');
			tabsContainterItem[index].classList.add('is-active');
			// set activeIndex
			activeIndex = index;
		}
	}

	// Handle Click
	function handClick(link, index) {
		link.addEventListener('click', function (e) {
			e.preventDefault();
			goToTab(index);
		});
	}

	// set click on all tabs-nav-items
	for (var i = 0; i < tabsNavItem.length; i += 1) {
		var link = tabsNavItem[i];
		handClick(link, i);
	}
}

document.addEventListener('DOMContentLoaded', initTabs);
