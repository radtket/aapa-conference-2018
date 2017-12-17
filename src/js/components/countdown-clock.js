/* ---------------------------------------------
 Countdown Clock
 --------------------------------------------- */
function getTimeRemaining(endtime) {
	const t = Date.parse(endtime) - Date.parse(new Date());
	const seconds = Math.floor((t / 1000) % 60);
	const minutes = Math.floor((t / 1000 / 60) % 60);
	const hours = Math.floor((t / (1000 * 60 * 60)) % 24);
	const days = Math.floor(t / (1000 * 60 * 60 * 24));
	return {
		total: t,
		days,
		hours,
		minutes,
		seconds,
	};
}

function initializeClock(id, endtime) {
	const clock = document.querySelector(id);
	const daysSpan = clock.querySelector('.days');
	const hoursSpan = clock.querySelector('.hours');
	const minutesSpan = clock.querySelector('.minutes');
	const secondsSpan = clock.querySelector('.seconds');
	let countdownInterval;

	function updateClock() {
		const t = getTimeRemaining(endtime);

		daysSpan.innerHTML = t.days;
		hoursSpan.innerHTML = `0${t.hours}`.slice(-2);
		minutesSpan.innerHTML = `0${t.minutes}`.slice(-2);
		secondsSpan.innerHTML = `0${t.seconds}`.slice(-2);

		if (t.total <= 0) {
			clearInterval(countdownInterval);
		}
	}

	updateClock();
	countdownInterval = setInterval(updateClock, 1000);
}
