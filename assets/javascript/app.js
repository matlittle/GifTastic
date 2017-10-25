// create a starting array of topics
var topics = ["Aaron Donald", "Todd Gurley", "Jared Goff", "Alec Ogletree", "Trumaine Johnson", "Robert Quinn", "Tavon Austin", "Johnny Hekker", "Cooper Kupp", "Kurt Warner", "Marshall Faulk", "Isaac Bruce", "Torry Holt", "Eric Dickerson", "Jack Youngblood"];

buildButtonList(topics);

// initialize page by building buttons from array of topics
function buildButtonList(arr) {
	var btnDiv = $("#button-row");
	$(btnDiv).empty();

	for (var i = 0; i < arr.length; i++) {
		var newBtn = $("<input>").attr("type", "button").attr("value", arr[i]);
		$(newBtn).addClass("gif-btn btn btn-default navbar-btn");

		$(btnDiv).append(newBtn);
	}
}

// when user clicks a button, send request to giphy, and get gifs based on button clicked
function requestGifs(search) {
	const endUrl = "https://api.giphy.com/v1/gifs/search";
	const apiKey = "TH0GEBfezZR36QstPFbKKOPXMAeBGylD";

	var params = {
		api_key: apiKey,
		q: search, //search term
		limit: 10,
		rating: "g"
	}

	var xhrUrl = endUrl + "?" + $.param(params)

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

		var gifDiv = $("<div>").addClass("col-md-12 col-lg-6");

		var newGif = $("<img>").addClass("gif");
		$(newGif).attr("src", stillSrc).attr("data-state", "still");
		$(newGif).attr("data-still", stillSrc).attr("data-animate", animateSrc);

		var rating = $("<p>").addClass("rating").text(`Rating: ${gif.rating.toUpperCase()}`);

		$(gifDiv).append(newGif).append(rating);
		$("#gif-col").append(gifDiv);
	})
}

// when user enters topic and clicks submit, add new button for user input based on value
function addTopic() {
	var newTopic = $("#topic-input").val();

	if(newTopic.length > 0){
		$("#topic-input").val("");
		topics.push(newTopic);
		buildButtonList(topics);
		requestGifs(newTopic);
	}
}
	

$("#topic-btn").click( function(event) {
	event.preventDefault();
	addTopic();
});

$(document).on("click", ".gif", toggleGifState);
$(document).on("click", ".gif-btn", function() { 
	requestGifs($(this).val()) 
});

$(window).keydown(function(event){
	if(event.keyCode == 13) {
		event.preventDefault();
		return false;
	}
});
