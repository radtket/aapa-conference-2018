import twitterFetcher from "twitter-fetcher";

const twitterFeed = {
	profile: { screenName: "AAPAorg" },
	domId: "twitterFeed",
	maxTweets: 3,
	enableLinks: true,
	showUser: true,
	showTime: true,
	showImages: false,
	lang: "en"
};

twitterFetcher.fetch(twitterFeed);
