function tabs(options) {
	const el = document.querySelector(options.el);
	const tabNavigationLinks = el.querySelectorAll(options.tabNavigationLinks);
	const tabContentContainers = el.querySelectorAll(
		options.tabContentContainers
	);
	let activeIndex = 0;
	let initCalled = false;

	/**
	 * goToTab
	 *
	 * @description Goes to a specific tab based on index. Returns nothing.
	 * @param {Number} index The index of the tab to go to
	 */
	function goToTab(index) {
		if (
			index !== activeIndex &&
			index >= 0 &&
			index <= tabNavigationLinks.length
		) {
			tabNavigationLinks[activeIndex].classList.remove("is-active");
			tabNavigationLinks[index].classList.add("is-active");
			tabContentContainers[activeIndex].classList.remove("is-active");
			tabContentContainers[index].classList.add("is-active");
			activeIndex = index;
		}
	}

	/**
	 * handleClick
	 *
	 * @description Handles click event listeners on each of the links in the
	 *   tab navigation. Returns nothing.
	 * @param {HTMLElement} link The link to listen for events on
	 * @param {Number} index The index of that link
	 */
	function handleClick(link, index) {
		link.addEventListener("click", e => {
			e.preventDefault();
			goToTab(index);
		});
	}

	/**
	 * init
	 *
	 * @description Initializes the component by removing the no-js class from
	 *   the component, and attaching event listeners to each of the nav items.
	 *   Returns nothing.
	 */
	function init() {
		if (!initCalled) {
			initCalled = true;
			el.classList.remove("no-js");

			for (let i = 0; i < tabNavigationLinks.length; i += 1) {
				const link = tabNavigationLinks[i];
				handleClick(link, i);
			}
		}
	}

	/**
	 * Returns init and goToTab
	 */
	return {
		init,
		goToTab
	};
}

/**
 * Attach to global namespace
 */
window.tabs = tabs;

export default tabs;
// function initTabs() {
// 	const tabs = document.querySelector('#tabs');
// 	const tabsNavItem = tabs.querySelectorAll('.agenda-tabs__nav--link');
// 	const tabsContainterItem = tabs.querySelectorAll('.agenda-tabs__content-item');
// 	let activeIndex = 0;

// 	function goToTab(index) {
// 		if (index !== activeIndex && index >= 0 && index <= tabsNavItem.length) {
// 			// Add/Remove class for nav-item
// 			tabsNavItem[activeIndex].classList.remove('is-active');
// 			tabsNavItem[index].classList.add('is-active');
// 			// Add/Remove class for containers
// 			tabsContainterItem[activeIndex].classList.remove('is-active');
// 			tabsContainterItem[index].classList.add('is-active');
// 			// set activeIndex
// 			activeIndex = index;
// 		}
// 	}

// 	// Handle Click
// 	function handClick(link, index) {
// 		link.addEventListener('click', e => {
// 			e.preventDefault();
// 			goToTab(index);
// 		});
// 	}

// 	// set click on all tabs-nav-items
// 	for (let i = 0; i < tabsNavItem.length; i += 1) {
// 		const link = tabsNavItem[i];
// 		handClick(link, i);
// 	}
// }
