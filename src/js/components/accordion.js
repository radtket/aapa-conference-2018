function activateAccordion() {
	if ($(this).hasClass("active")) {
		$(this)
			.parent()
			.next()
			.slideUp("easeOutExpo");
		$(this).removeClass("active");
	} else {
		$(this)
			.parent()
			.next("dd");
		$(this).addClass("active");
		$(this)
			.parent()
			.next()
			.slideDown("easeOutExpo");
	}

	return false;
}

$(".accordion > dd").hide();
$(".accordion > dt > a").click(activateAccordion());
