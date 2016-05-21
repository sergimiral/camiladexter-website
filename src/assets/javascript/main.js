
var access_token = "12228466.31599a5.7e5fd8ae83094826b85eacfaad7dd185",
	resolution = "thumbnail",
	user_id = "2077414878",
	hashtag = "festiwall2015",
	last_url = "",
	// HASHTAG URL - USE THIS URL FOR HASHTAG PICS
	hashtag_url = "https://api.instagram.com/v1/tags/"+hashtag+"/media/recent?access_token="+access_token,
	// USER URL - USE THIS URL FOR USER PICS
	user_url = "https://api.instagram.com/v1/users/"+user_id+"/media/recent/?access_token="+access_token;

function loadFeed(next_url){
	var url = next_url;
	$(function() {
	    $.ajax({
	    	type: "GET",
	        dataType: "jsonp",
	        cache: false,
	        url: url,

	        success: function(data) {
		  		next_url = data.pagination.next_url;
		  		var count = 20;
	            for (var i = 0; i < count; i++) {
						if (typeof data.data[i] !== 'undefined') {
						//console.log("id: " + data.data[i].id);
							$("#instagram").append("<div class='instagram-wrap' id='pic-" + data.data[i].id + "'><a target='_blank' href='" + data.data[i].link + "'><img class='instagram-image' src='" + data.data[i].images.low_resolution.url +"' /></a></div>"
						);
					}
	      		}

		  		console.log("next_url: " + next_url);
		  		$("#showMore").hide();
		  		if (typeof next_url === 'undefined' || next_url.length < 10 ) {
			  		console.log("NO MORE");
			  		$("#showMore").hide();
			  		$("#more").attr("next_url", "");
		  		} else {
			        //set button value
			        console.log("displaying more");
			        $("#showMore").show();
			        $("#more").attr("next_url", next_url);
			        last_url = next_url;
	      		}
	        }
	    });
	});
}

//CALL THE SCRIPT TO START...
$( document ).ready(function() {
	//APPEND LOAD MORE BUTTON TO THE BODY...
	$("#more" ).click(function() {
		var next_url = $(this).attr('next_url');
		loadFeed(next_url);
		return false;
	});
	//start your engines
	loadFeed(user_url);
});
