$(window).on('resize', () => {
	splitHeightInit();
});
const regRates = tabs({
	el: '#regRates',
	tabNavigationLinks: '.agenda-tabs__nav--link',
	tabContentContainers: '.agenda-tabs__content-item',
});
const regSingleRates = tabs({
	el: '#regSingleRates',
	tabNavigationLinks: '.agenda-tabs__nav--link',
	tabContentContainers: '.agenda-tabs__content-item',
});
const regPkgRates = tabs({
	el: '#regPkgRates',
	tabNavigationLinks: '.agenda-tabs__nav--link',
	tabContentContainers: '.agenda-tabs__content-item',
});
regRates.init();
regSingleRates.init();
regPkgRates.init();

/* ---------------------------------------------
Split Section - Hotel Policy & Rates
--------------------------------------------- */
function splitHeightInit() {
	(function($) {
		$('.split-section-media-table, .split-section-content').css('height', 'auto');

		if ($(window).width() > 992) {
			$('.split-section').each(function() {
				const splitSectionHeight = $(this)
					.find('.split-section-content')
					.innerHeight();
				$(this)
					.find('.split-section-media-table')
					.height(splitSectionHeight);
			});
		}
	})(jQuery);
}
