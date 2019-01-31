/* eslint-disable func-names */
$(".accordion > dd").hide();
$(".accordion > dt > a").click(function() {
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
});
