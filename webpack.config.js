const path = require("path");

module.exports = {
	mode: "production",
	entry: {
		index: "./src/js/pages/index.js",
		countdownClock: "./src/js/components/countdown-clock.js",
		housingInfoAndPolicies: ["./src/js/pages/housing-info-and-policies.js"],
		agenda: ["./src/js/pages/agenda.js"],
		register: ["./src/js/pages/register.js"],
		app: ["./src/js/app.js"],
		accordion: ["./src/js/components/accordion.js"],
		googleMapVenue: ["./src/js/components/googleMap-venue.js"],
		tabsVertical: ["./src/js/components/tabs-vertical.js"],
		tabsHorizontal: ["./src/js/components/tabs-horizontal.js"],
		splitSection: ["./src/js/components/splitSection.js"],
		getTweets: ["./src/js/components/getTweets.js"]
	},
	output: {
		filename: "[name].min.js"
	},
	module: {
		rules: [
			{
				test: /\.js?$/,
				include: [path.resolve(__dirname, "./assets/js")],
				loader: "babel-loader"
			}
		]
	}
};
