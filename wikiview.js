// // // // // // // // // //
// WIKIPEDIA VIWER (by HE) //
// // // // // // // // // //

$(document).ready(function() {
	// Layout
	// // //

	var wikiBoxMarginTop;
	$(window).resize(function() {
		// wikiBox margin
		if (!resultsShown) {
			wikiBoxMarginTop = (($(window).height() - $("#wikiBox").height()) / 2);
			$("#wikiBox").css("margin-top", wikiBoxMarginTop);
		}
		$("#scrollTop").css("left", $(window).width() - 100);
		$("#scrollTop").css("top", $(window).height() - 100);
	});

	$(window).resize();

	// Remove button focus
	$(".btn").focus(function(event) {
		event.target.blur();
	});

	// Random button click
	$("#randomBtn").click(function() {
		window.open("http://en.wikipedia.org/wiki/Special:Random");
	}); // <<< random.click

	// SEARCHING THE WIKI
	// // // // // // //

	// Slide the wikiBox
	function slideBoxUp() {
		$("#wikiBox").animate({
			marginTop: (0.2 * wikiBoxMarginTop) + 'px',
		}, 500);
	}

	function slideBoxDown() {
		$("#wikiBox").animate({
			marginTop: wikiBoxMarginTop + 'px',
		}, 500);
	}

	// Search bar animation
	var isOpen = false; // True when the input field is open
	var resultsShown = false; // True when the results are shown
	$("#searchBtn").click(function() {
		if (!isOpen) {
			isOpen = true;
			$("#searchInput").animate({
				width: '10em',
				paddingRight: '1em',
				paddingLeft: '1em',
			}, 500);
			$("#searchBtn").html('<span class="glyphicon glyphicon-remove"></span>');
		}
		else {
			isOpen = false;
			resultsShown = false;
			slideBoxDown();
			removeResults();
			$("#searchInput").animate({
				width: '0',
				padding: '0',
			}, 500);
			$("#searchBtn").html('<span class="glyphicon glyphicon-search"></span>');
			// empty input field
			$("#searchInput").val("");
		}
	}); // <<< search.click

	// Functions

	// Animate redults
	function animateResults() {
		$("#resultsBox").animate({
			marginTop: '3em',
			opacity: '1',
		}, 200); // <<< resultBox.animate
	}

	function removeResults() {
		$("#resultsBox").html("");
		$("#resultsBox").css('margin-top', '10em');
		$("#resultsBox").css('opacity', '0');
	}

	// JSON to HTML
	function renderResults(results) {
		var link = "https://en.wikipedia.org/wiki/?curid=";
		for (var key in results) {
			if (results.hasOwnProperty(key)) {
				$("#resultsBox").append('<a href="' + link + results[key].pageid +
										'" target="_blank"><div class="result well"><h3>' +
										results[key].title + '</h1><p>' +
										results[key].extract + '</p></div></a>');
			}
		}
		animateResults();
		resultsShown = true;
	}


	// Get data from Mediawiki using JSONP
	function fetchData(searchedFor) {
		$.getJSON('https://en.wikipedia.org/w/api.php?action=query&generator=search&' +
					'gsrlimit=15&prop=extracts&pilimit=max&exintro&explaintext&exsentences=1&' +
					'exlimit=max&gsrsearch=' + searchedFor + '&format=json&callback=?', function(json) {
				var results = json.query.pages;
				renderResults(results);
				});
	}

	function getInput() {
		return $("#searchInput").val();
	}

	// Start searching/animating when Enter is pressed
	$("#searchInput").keyup(function(event) {
		if (event.which == 13) {
			var searchedFor = getInput();
			fetchData(searchedFor);
			if (isOpen)
				slideBoxUp();
			if (resultsShown)
				removeResults().delay(100);
		}
	});

	// ELEMENTS
	// // // //

	// Blink subtitle link
	(function blink() {
		$("h1 sub a").delay(4000).fadeOut(300).fadeIn(300, blink);
	})();

	// Scroll to top button
	$("#scrollTop").click(function() {
		$('html, body').animate({scrollTop : 0},500);
		return false;
	});
	// Only show when started scrolling
	$(window).scroll(function(){
		if ($(this).scrollTop() > 100) {
			$("#scrollTop").fadeIn();
		} else {
			$("#scrollTop").fadeOut();
		}
	}); // <<< scroll

}); // <<< ready
