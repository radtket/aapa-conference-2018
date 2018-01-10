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
