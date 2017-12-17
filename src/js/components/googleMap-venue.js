/* ---------------------------------------------
 Venue Map
 --------------------------------------------- */

function initializeVenueMap() {
	const mapOptions = {
		mapTypeId: 'roadmap',
		styles: [
			{
				featureType: 'administrative.locality',
				elementType: 'all',
				stylers: [
					{
						visibility: 'on',
					},
				],
			},
			{
				featureType: 'administrative.locality',
				elementType: 'geometry.fill',
				stylers: [
					{
						saturation: '100',
					},
					{
						lightness: '-53',
					},
				],
			},
			{
				featureType: 'landscape.man_made',
				elementType: 'geometry.fill',
				stylers: [
					{
						visibility: 'on',
					},
					{
						color: '#efefe9',
					},
				],
			},
			{
				featureType: 'landscape.natural',
				elementType: 'geometry.fill',
				stylers: [
					{
						visibility: 'on',
					},
					{
						color: '#ebe6e1',
					},
					{
						lightness: '0',
					},
				],
			},
			{
				featureType: 'landscape.natural.landcover',
				elementType: 'geometry.fill',
				stylers: [
					{
						visibility: 'on',
					},
				],
			},
			{
				featureType: 'landscape.natural.terrain',
				elementType: 'geometry.fill',
				stylers: [
					{
						visibility: 'on',
					},
				],
			},
			{
				featureType: 'poi',
				elementType: 'geometry.fill',
				stylers: [
					{
						color: '#636cb2',
					},
				],
			},
			{
				featureType: 'poi.attraction',
				elementType: 'geometry',
				stylers: [
					{
						visibility: 'off',
					},
				],
			},
			{
				featureType: 'poi.attraction',
				elementType: 'geometry.fill',
				stylers: [
					{
						color: '#ed3e7a',
					},
				],
			},
			{
				featureType: 'poi.business',
				elementType: 'all',
				stylers: [
					{
						visibility: 'off',
					},
				],
			},
			{
				featureType: 'poi.business',
				elementType: 'geometry.fill',
				stylers: [
					{
						color: '#ee9334',
					},
				],
			},
			{
				featureType: 'poi.government',
				elementType: 'geometry.fill',
				stylers: [
					{
						visibility: 'off',
					},
				],
			},
			{
				featureType: 'road',
				elementType: 'all',
				stylers: [
					{
						visibility: 'on',
					},
					{
						lightness: '-22',
					},
					{
						saturation: '15',
					},
					{
						color: '#b8a1cd',
					},
				],
			},
			{
				featureType: 'road',
				elementType: 'geometry.fill',
				stylers: [
					{
						color: '#ffffff',
					},
				],
			},
			{
				featureType: 'road',
				elementType: 'labels.text',
				stylers: [
					{
						visibility: 'on',
					},
					{
						saturation: '0',
					},
					{
						lightness: '-25',
					},
				],
			},
			{
				featureType: 'road',
				elementType: 'labels.text.fill',
				stylers: [
					{
						visibility: 'on',
					},
					{
						lightness: '-82',
					},
				],
			},
			{
				featureType: 'road',
				elementType: 'labels.text.stroke',
				stylers: [
					{
						visibility: 'on',
					},
					{
						color: '#ffffff',
					},
				],
			},
			{
				featureType: 'road.highway',
				elementType: 'all',
				stylers: [
					{
						saturation: '0',
					},
					{
						lightness: '0',
					},
				],
			},
			{
				featureType: 'road.highway',
				elementType: 'geometry.fill',
				stylers: [
					{
						saturation: '1',
					},
					{
						lightness: '11',
					},
					{
						gamma: '2.60',
					},
					{
						color: '#7673c0',
					},
				],
			},
			{
				featureType: 'road.highway',
				elementType: 'geometry.stroke',
				stylers: [
					{
						gamma: '6.13',
					},
				],
			},
			{
				featureType: 'water',
				elementType: 'all',
				stylers: [
					{
						visibility: 'on',
					},
					{
						saturation: '75',
					},
					{
						color: '#63d0df',
					},
					{
						lightness: '14',
					},
					{
						gamma: '1.61',
					},
				],
			},
		],
	};

	// Display a map on the page
	const htmlMapElement = document.getElementById('map_canvas');
	const map = new google.maps.Map(htmlMapElement, mapOptions);
	map.setTilt(45);
	const buttons = Array.from(document.querySelectorAll('.venue-button'));

	// Declared Initial Bounds
	const bounds = new google.maps.LatLngBounds();

	const hotels = [
		{
			name: 'Hilton New Orleans Riverside',
			address: {
				street: '2 Poydras St',
				city: 'New Orleans',
				state: 'LA',
				zip: 70130,
			},
			phone: '(504) 561-0500',
			lat: 29.9475753,
			lon: -90.0656035,
			rates: {
				single: 232,
				double: 232,
				trip: 262,
				quad: 282,
				shuttle: false,
			},
		},
		{
			name: 'New Orleans Ernest N. Morial Convention Center',
			address: {
				street: '900 Convention Center Blvd.',
				city: 'New Orleans',
				state: 'LA',
				zip: 70130,
			},
			phone: '(504) 582-3000',
			lat: 29.9369727,
			lon: -90.0655532,
			rates: {
				single: 149,
				double: 149,
				trip: 169,
				quad: 189,
				shuttle: true,
			},
		},
	];

	// Info Window Content
	const infoWindowContent = [];

	// Display multiple markers on a map
	const infoWindow = new google.maps.InfoWindow();

	// Function to link outside click to infobox
	function generateTriggerCallback(object, eventType) {
		return function() {
			google.maps.event.trigger(object, eventType);
		};
	}

	// Loop through our array of markers & place each one on the map
	for (let i = 0; i < hotels.length; i += 1) {
		const position = new google.maps.LatLng(hotels[i].lat, hotels[i].lon);
		bounds.extend(position);
		const marker = new google.maps.Marker({
			position,
			map,
			title: hotels[i].name,
		});

		infoWindowContent.push(`<div class="info_content">
				<address style="max-width: 250px;">
				<h3>${hotels[i].name}</h3>
				${hotels[i].address.street} </br>${hotels[i].address.city}, ${hotels[i].address.state} ${hotels[i].address.zip}
				</address>
			</div>`);

		// Allow each marker to have an info window
		google.maps.event.addListener(
			marker,
			'click',
			(function(marker, i) {
				return function() {
					infoWindow.setContent(infoWindowContent[i]);
					infoWindow.open(map, marker);
				};
			})(marker, i)
		);

		// Add Event Listener for Buttons outside the map
		buttons[i].addEventListener('click', generateTriggerCallback(marker, 'click'));

		// Automatically center the map fitting all markers on the screen
		map.fitBounds(bounds);
	}

	// Override our map zoom level once our fitBounds function runs (Make sure it only runs once)
	const boundsListener = google.maps.event.addListener(map, 'bounds_changed', function() {
		this.setZoom(15);
		google.maps.event.removeListener(boundsListener);
	});
}
