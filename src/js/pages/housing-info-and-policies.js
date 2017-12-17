$(window).on('resize', () => {
	splitHeightInit();
});

function showHotelDetails() {
	this.parentNode.querySelector('.hotel-details').classList.toggle('show-hotel-details');
	if (this.textContent === 'View Rates') {
		this.classList.add('active');
		this.textContent = 'Hide Rates';
	} else {
		this.classList.remove('active');
		this.textContent = 'View Rates';
	}
}

const hotelBtn = document.querySelectorAll('.hotel-btn');
hotelBtn.forEach(btn => btn.addEventListener('click', showHotelDetails));

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
