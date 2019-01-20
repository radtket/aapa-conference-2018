import splitHeightInit from "../components/splitSection";
import tabs from "../components/tabs-horizontal";

$(window).on("resize", () => {
	splitHeightInit();
});
tabs({
	el: "#regRates",
	tabNavigationLinks: ".agenda-tabs__nav--link",
	tabContentContainers: ".agenda-tabs__content-item"
}).init();
tabs({
	el: "#regSingleRates",
	tabNavigationLinks: ".agenda-tabs__nav--link",
	tabContentContainers: ".agenda-tabs__content-item"
}).init();
tabs({
	el: "#regPkgRates",
	tabNavigationLinks: ".agenda-tabs__nav--link",
	tabContentContainers: ".agenda-tabs__content-item"
}).init();
