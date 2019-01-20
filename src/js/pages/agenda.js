// Alt Algenda - Verical Tabs
$(".js-alt-agenda-tab-content").hide();
$(".js-alt-agenda-tab-content:first").show();

/* if in tab mode */
function inTabMode(event) {
	event.preventDefault();

	$(".js-alt-agenda-tab-content").hide();
	const activeTab = $(this).attr("rel");
	$(`#${activeTab}`).show();

	$(".js-alt-agenda-tab").removeClass("is-active");
	$(this).addClass("is-active");

	$(".js-alt-agenda-tab-accordion-heading").removeClass("is-active");
	$(`.js-alt-agenda-tab-accordion-heading[rel^='${activeTab}']`).addClass(
		"is-active"
	);
}

/* if in accordion mode */
function inAccordionMode(event) {
	event.preventDefault();

	$(".js-alt-agenda-tab-content").hide();
	const accordionActiveTab = $(this).attr("rel");
	$(`#${accordionActiveTab}`).show();

	$(".js-alt-agenda-tab-accordion-heading").removeClass("is-active");
	$(this).addClass("is-active");

	$(".js-alt-agenda-tab").removeClass("is-active");
	$(`.js-alt-agenda-tab[rel^='${accordionActiveTab}']`).addClass("is-active");
}

$(".js-alt-agenda-tab").click(inTabMode());
$(".js-alt-agenda-tab-accordion-heading").click(inAccordionMode());
