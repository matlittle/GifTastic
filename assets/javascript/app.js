// create a starting array of topics
var topics = ["Aaron Donald", "Todd Gurley", "Jared Goff"];

buildButtonList(topics);

// initialize page by building buttons from array of topics
function buildButtonList(arr) {
	var btnDiv = $("#button-row");

	for (var i = 0; i < arr.length; i++) {
		var newBtn = $("<input>").attr("type", "button").attr("value", arr[i]);
		$(newBtn).addClass("gif-btn");

		$(btnDiv).append(newBtn);
	}
}

// when user clicks a button, send request to giphy, and get gifs based on button clicked
function requestGifs() {
	const url = "https://api.giphy.com/v1/gifs/search";
	const apiKey = "TH0GEBfezZR36QstPFbKKOPXMAeBGylD";

	search = $(this).val();

	var params = {
		api_key: apiKey,
		q: search, //search term
		limit: 9,
		rating: "g"
	}

	var xhrUrl = url + "?" + $.param(params)

	$.get(xhrUrl, addGifs);
}

// when user clicks on a gif, change the image source to still/animate
function toggleGifState(btn) {
	var newState = ($(this).attr("data-state") === "still" ? "animate" : "still");

	$(this).attr("data-state", newState);
	$(this).attr("src", $(this).attr(`data-${newState}`));
}

// populate page from gifs in response
function addGifs(response) {
	var gifs = response.data;
	console.log(gifs);

	$("#gif-col").empty();

	gifs.forEach(function(gif) {
		var stillSrc = gif.images.fixed_height_still.url;
		var animateSrc = gif.images.fixed_height.url;

		var gifDiv = $("<div>").addClass("col-xs-12 col-md-6 col-lg-4");

		var newGif = $("<img>").addClass("gif");
		$(newGif).attr("src", stillSrc).attr("data-state", "still");
		$(newGif).attr("data-still", stillSrc).attr("data-animate", animateSrc);

		$(gifDiv).append(newGif);
		$("#gif-col").append(gifDiv);
	})
}

// when user enters topic and clicks submit, add new button for user input based on value
function addTopic() {

}


$(document).on("click", ".gif-btn", requestGifs);
$(document).on("click", ".gif", toggleGifState);