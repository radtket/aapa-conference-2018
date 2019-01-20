// Verical Tabs
$(".js-vertical-tab-content").hide();
$(".js-vertical-tab-content:first").show();

/* if in tab mode */
function inTabMode(e) {
	e.preventDefault();

	$(".js-vertical-tab-content").hide();
	const activeTab = $(this).attr("rel");
	$(`#${activeTab}`).show();

	$(".js-vertical-tab").removeClass("is-active");
	$(this).addClass("is-active");

	$(".js-vertical-tab-accordion-heading").removeClass("is-active");
	$(`.js-vertical-tab-accordion-heading[rel^='${activeTab}']`).addClass(
		"is-active"
	);
}

/* if in accordion mode */
function inAccordionMode(e) {
	e.preventDefault();

	$(".js-vertical-tab-content").slideUp("easeOutExpo");
	const accordionActiveTab = $(this).attr("rel");
	$(`#${accordionActiveTab}`).slideDown("easeOutExpo");

	$(".js-vertical-tab-accordion-heading").removeClass("is-active");
	$(this).addClass("is-active");

	$(".js-vertical-tab").removeClass("is-active");
	$(`.js-vertical-tab[rel^='${accordionActiveTab}']`).addClass("is-active");
}

$(".js-vertical-tab").click(inTabMode());
$(".js-vertical-tab-accordion-heading").click(inAccordionMode());
