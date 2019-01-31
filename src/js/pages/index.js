import "owl.carousel";
import initializeClock from "../components/countdown-clock";
import tabs from "../components/tabs-horizontal";

/* ---------------------------------------------
 Main Carousel
 --------------------------------------------- */
function mainCarouselInit() {
	// Declare Carousel jquery object
	const owl = $(".opening-slider");

	// Carousel initialization
	owl.owlCarousel({
		loop: true,
		margin: 0,
		navSpeed: 500,
		nav: true,
		navText: [
			'<svg><use xmlns:xlink="http://www.w3.org/2000/xlink" xlink:href="#slider-nav-prev"></use></svg>',
			'<svg><use xmlns:xlink="http://www.w3.org/2000/xlink" xlink:href="#slider-nav-next"></use></svg>'
		],
		navContainerClass: "owl-carousel__nav",
		navClass: ["owl-carousel__nav--prev", "owl-carousel__nav--next"],
		navElement: "button",
		dotsClass: "owl-carousel__dots-purple",
		dotClass: "owl-carousel__dots--item",
		items: 1
	});

	// add animate.css class(es) to the elements to be animated
	function setAnimation(_elem, _InOut) {
		// Store all animationend event name in a string.
		// cf animate.css documentation
		const animationEndEvent =
			"webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend";

		// eslint-disable-next-line func-names
		_elem.each(function() {
			const $elem = $(this);
			const $animationType = `animated ${$elem.data(`animation-${_InOut}`)}`;

			$elem.addClass($animationType).one(animationEndEvent, () => {
				$elem.removeClass($animationType); // remove animate.css Class at the end of the animations
			});
		});
	}

	// Fired before current slide change
	owl.on("change.owl.carousel", event => {
		const $currentItem = $(".owl-item", owl).eq(event.item.index);
		const $elemsToanim = $currentItem.find("[data-animation-out]");
		setAnimation($elemsToanim, "out");
	});

	// Fired after current slide has been changed
	owl.on("changed.owl.carousel", event => {
		const $currentItem = $(".owl-item", owl).eq(event.item.index);
		const $elemsToanim = $currentItem.find("[data-animation-in]");
		setAnimation($elemsToanim, "in");
	});
}

mainCarouselInit();

/* ---------------------------------------------
 Slider Textbox Calculate on Resize
 --------------------------------------------- */
function textboxHeightCalculator() {
	const slides = Array.from(document.querySelectorAll(".carousel-container"));
	slides.forEach(element => {
		const textbox = element.querySelector(".carousel-text");
		const polygon = element.querySelector(".polygon");
		const textboxWidth = textbox.offsetHeight;
		const textboxHeight = textbox.offsetWidth;
		const windowDiff = (window.innerWidth - 1200) / 2;
		if (windowDiff >= 0) {
			polygon.style.width = `${textboxWidth + textboxHeight + windowDiff}px`;
		} else {
			polygon.style.width = `${textboxWidth + textboxHeight}px`;
		}
	});
}

/* ---------------------------------------------
 Split Section - Home Page
 --------------------------------------------- */
function introSplitHeightInit() {
	const splitSectionItems = Array.from(
		document.querySelectorAll(".intro-split-section")
	);

	if (window.innerWidth > 1050) {
		for (let i = 0; i < splitSectionItems.length; i += 1) {
			const element = splitSectionItems[i];
			const splitSectionHeight = element.querySelector(
				".intro-split-section__content"
			).offsetHeight;
			element.querySelector(
				".intro-split-section__video--table"
			).style.height = `${splitSectionHeight}px`;
		}
	}
}

/* ---------------------------------------------
 Events Carousel
 --------------------------------------------- */
$(".events").owlCarousel({
	loop: false,
	margin: 10,
	nav: true,
	navText: [
		'<svg><use xmlns:xlink="http://www.w3.org/2000/xlink" xlink:href="#slider-nav-prev"></use></svg>',
		'<svg><use xmlns:xlink="http://www.w3.org/2000/xlink" xlink:href="#slider-nav-next"></use></svg>'
	],
	navContainerClass: "owl-carousel__nav",
	navClass: ["owl-carousel__nav--prev", "owl-carousel__nav--next"],
	navElement: "button",
	dotsClass: "owl-carousel__dots-teal",
	dotClass: "owl-carousel__dots--item",
	stagePadding: 10,
	responsive: {
		0: {
			items: 1,
			center: true
		},
		600: {
			items: 2
		},
		872: {
			items: 3
		},
		1200: {
			items: 4
		},
		1600: {
			items: 5
		}
	}
});

$(document).on("ready", () => {
	$(window).trigger("resize");
	initializeClock(".js-countdown", new Date(2019, 6, 27));
	tabs({
		el: "#tabs",
		tabNavigationLinks: ".agenda-tabs__nav--link",
		tabContentContainers: ".agenda-tabs__content-item"
	}).init();
});

$(window).on("resize", () => {
	textboxHeightCalculator();
	introSplitHeightInit();
});
