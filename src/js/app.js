/* ---------------------------------------------
 Hamburger Animation and Dropdown
 --------------------------------------------- */
const hamburgerButton = document.querySelector('.hamburger');

function hamburgerJig() {
	const hamburgerBar = hamburgerButton.querySelector('.hamburger__menu--bar');
	const navMenu = document.querySelector('.navbar__bottom--nav');
	hamburgerBar.classList.toggle('animate');
	navMenu.classList.toggle('js-show-menu');
}
hamburgerButton.addEventListener('click', hamburgerJig);

/* ---------------------------------------------
 Sets Body Margin to Nav Size
 --------------------------------------------- */

function setNavMargin() {
	const pageBody = document.querySelector('body');
	const headerNav = document.querySelector('.navbar');
	pageBody.style.marginTop = `${headerNav.offsetHeight}px`;
}

document.addEventListener('DOMContentLoaded', setNavMargin);
window.addEventListener('resize', setNavMargin);

/* ---------------------------------------------
 Add Mobile Nav
 --------------------------------------------- */

function addMobileNav() {
	const navbar = document.querySelector('.navbar');
	if (window.innerWidth <= 850) {
		navbar.classList.add('mobile-on');
	} else {
		navbar.classList.remove('mobile-on');
	}
}

document.addEventListener('DOMContentLoaded', addMobileNav);
window.addEventListener('resize', addMobileNav);

const mnHasSub = $('.has__sub-nav');
let mnThisLi;

// $(".mobile-on .has__sub-nav").find(".fa:first").removeClass("fa-angle-right").addClass("fa-angle-down");

mnHasSub.click(function() {
	if ($('.navbar').hasClass('mobile-on')) {
		mnThisLi = $(this).parent('li:first');
		if (mnThisLi.hasClass('js-opened')) {
			mnThisLi.find('.sub-nav:first').slideUp(() => {
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
