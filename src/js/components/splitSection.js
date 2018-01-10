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
