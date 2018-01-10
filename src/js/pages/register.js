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
