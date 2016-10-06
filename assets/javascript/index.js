'use strict';

jQuery(document).ready(function ($) {

  var sliderWrapperWidth = $('#sliderWrapper').width();
	var slideCount = $('#slider ul li').length;
	var slideWidth = $('#slider ul li').width();
	var slideHeight = $('#slider ul li').height();
	var sliderUlWidth = slideCount * slideWidth;


  	$('#slider ul li').css({ width: sliderWrapperWidth });
	  $('#slider ul').css({ marginLeft: - sliderWrapperWidth });
    $('#slider ul li:last-child').prependTo('#slider ul');

    $(window).resize(function() {
      $('#slider ul li').css({ width: sliderWrapperWidth });
	    $('#slider ul').css({ marginLeft: - sliderWrapperWidth });
    });

    function moveLeft() {
        $('#slider ul').animate({
            left: + sliderWrapperWidth
        }, 400, function () {
            $('#slider ul li:last-child').prependTo('#slider ul');
            $('#slider ul').css('left', '');
        });
    };

    function moveRight() {
        $('#slider ul').animate({
            left: - sliderWrapperWidth
        }, 400, function () {
            $('#slider ul li:first-child').appendTo('#slider ul');
            $('#slider ul').css('left', '');
        });
    };


    $('a.control_prev').click(function () {
        moveLeft();
    });

    $('a.control_next').click(function () {
        moveRight();
    });

});


// weirdness with perspecive hover fx ↓
//
// var sheet = $(".sheet");
//
// $(document).on("mousemove",function(e) {
//   var ax = -($(window).innerWidth()/2- e.pageX)/50;
//   var ay = ($(window).innerHeight()/2- e.pageY)/50;
//   sheet.attr("style", "transform: rotateY("+ax+"deg) rotateX("+ay+"deg);-webkit-transform: rotateY("+ax+"deg) rotateX("+ay+"deg);-moz-transform: rotateY("+ax+"deg) rotateX("+ay+"deg)");
// });


// just to demo the transition-out by now…

$('.viewAllButton').click(function() {
  $('.projects-wrapper').addClass('fadeInProjects');
  $('html, body').animate({
        scrollTop: $(".projects-wrapper").offset().top -200
    }, 600);
    setTimeout(
    function() {
      $('body').css('overflow', 'visible');
    }, 300);


});

$(document).ready(function() {
//if it's not the homepage enable scroll again…
if($("#homepage-flag").length > 0) {
  $('body').css('overflow', 'hidden');
}
else {
  $('body').css('overflow', 'auto');
}
});

$(document).ready(function() {
  //forget scroll history
  if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual';
  }
  //set scroll position to the top of the page.
  window.scrollTo(0, 0);
  window.addEventListener('unload', function(e) {
  window.scrollTo(0, 0);

});
  // -------------------------------------------------------------
  // # Some operations for the post page
  // -------------------------------------------------------------
  var theTags = $('p.post-tags').text(); // 1. get contents from p
  var theTags = theTags+','; // 2. add comma, shitty I know
  $('p.post-tags').text(""); // 3. clean original p element
  $.each(theTags.split(",").slice(0, -1), function(index, item) { // 4. split & slice the comma sepparated string, and for each item do:
    item = item.replace(/(^\s+|\s+$)/g, ''); // 5. remove spaces, shitty I know II
    $('p.post-tags').append('<span>' + item + '</span>'); // 6. append as spans inside p
  });

  $('.post-content').children('p').children('img').addClass('post-content-image');
  $(".post-content-image").parent().css('text-align', 'center');
  $('.post-content-image').click(function() {
    $(this).toggleClass('post-content-image-expanded');
  });

});

/*---------------------------------------------
RANDOM EMOJI URL
----------------------------------------------*/

var URLEmoji = URLEmoji || {}

URLEmoji.addEmojiToURL = function () {
  var urlemoji = ['😉', '😊', '😋', '😌', '😍', '😘', '😎']


  // Only Mac
  if (navigator.userAgent.indexOf('Mac OS X') !== -1) {
    var eNumber = Math.floor(Math.random() * (urlemoji.length - 1))
    window.location.hash = urlemoji[eNumber]
    // history.pushState({}, null, urlemoji[eNumber]);
  }


};

URLEmoji.addEmojiToURL();


/*---------------------------------------------
SMOOTH SCROLLTO ANCHORS
----------------------------------------------*/
$(function() {
  $('a[href*="#"]:not([href="#"])').click(function() {
    $('body').css('overflow', 'visible'); /* TODO: <-- either fix this or remove those links from the homepage*/
    $('.projects-wrapper').addClass('fadeInProjects'); /* TODO: <-- FIX THIS SHIT*/

    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
      var target = $(this.hash);
      var mastHeight = $('.mast').height();
      var viewportHeight = $(window).height();
      console.log(mastHeight, viewportHeight);
      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
      if (target.length) {
        $('html, body').animate({
          scrollTop: target.offset().top // + (mastHeight / viewportHeight)
        }, 1000);

        return false;
      }
    }
  });
});


/*---------------------------------------------
Clippy Headings
- Creates a scrolling cliprect effect on fixed headings
----------------------------------------------*/


(function($) {
  var s,
  clippy = {
    settings: {
      heading: $('.js-clippy'),
    },
    init: function() {
      s = this.settings;
      this.bindEvents();
    },
    bindEvents: function(){/* Add "scroll" also to enable clippy FX*/
      $(window).on("load resize", $.proxy(this.getClippy, this));
    },

    getClippy: function(){
        s.heading.each(function() {
          var layerOffset = $(this).closest('article, section').offset(),
              containerOffset = layerOffset.top - $(window).scrollTop(),
              clippy = containerOffset - $(this).css("top").replace(/[^-\d\.]/g, '') - $(this).css("margin-top").replace(/[^-\d\.]/g, '');
          $(this).css('clip', 'rect('+ clippy +'px, auto, auto, auto)');
        });
        $('.js-clippy').removeClass('hidden');
    },
  };
   clippy.init();

})(jQuery);



/*
Header animation on scroll
 */

// $(document).ready(function() {
// 	var header = $(".site-header");
//   var intro = $(".site-intro");
//   var herotxt = $(".hero-text");
//   var projectanchors = $(".project-anchors");
// 	var tagline = $(".site-tagline");
// 	var pos = header.position();
// 	if($("#homepage-flag").length > 0) {
//
//   $('body').css('overflow', 'hidden');
//
// 	$(window).scroll(function() {
// 		var windowpos = $(window).scrollTop();
// 		if (windowpos >= pos.top & windowpos >=300) {
// 			// header.addClass("small-header");
//       herotxt.addClass("hero-text-fadeout");
// 			// tagline.addClass("site-tagline-fadeout");
// 		}
// 		else {
// 			// header.removeClass("small-header");
// 			herotxt.removeClass("hero-text-fadeout");
// 			// tagline.removeClass("site-tagline-fadeout");
// 		}
// 	});
// }
// else {
//   intro.addClass("hero-text-fadeout");
//   // projectanchors.addClass("project-anchors-fadeout");
//   $("a[data-href]").each(function(){
//     var posthref = $(this).data("href")
//     $(this).attr("href", posthref);
//   });
// }
// });

$(document).ready( function() {
    var topOfOthDiv = $(".mast").first().offset().top;
    topOfOthDiv = topOfOthDiv - 150;
    $(window).scroll(function() {
        if($(window).scrollTop() > topOfOthDiv && window.innerWidth<=1900) { //scrolled past the other div + not in a bigass monitor
            $(".site-header").addClass("light"); //reached the desired point -- show div
        }
        else {
            $(".site-header").removeClass("light");
        }

    });
});


( function($) {
	/**
	 * Our trigger event for opening the overlay. This class
	 * should exist on the overlay trigger, as well as an
	 * attribute (data-overlay) to adentify the overlay to open.
	*/
	$( '.overlay-trigger' ).on( 'click', function( event ) {
		event.preventDefault();

		/**
		 * Set the overlay variable based on the data provided
		 * by the overlay trigger.
		 */
		var overlay = $( this ).data( 'overlay' );

		/**
		 * If the overlay variable is not defined, give a message
		 * and return.
		*/
		if ( ! overlay ) {
			console.log( 'You must provide the overlay id in the trigger. (data-overlay="overlay-id").' );
			return;
		}

		/**
		 * If we've made it this far, we should have the data
		 * needed to open a overlay. Here we set the id variable
		 * based on overlay variable.
		 */
		var id = '#' + overlay;

		/**
		 * Let's open up the overlay and prevent the body from
		 * scrolling, both by adding a simple class. The rest
		 * is handled by CSS (awesome).
		 */
		$( id ).addClass( 'overlay-open' );
		$( 'body' ).addClass( 'overlay-view' );

		/**
		 * When the overlay outer wrapper or `overlay-close`
		 * triger is clicked, lets remove the classes from
		 * the current overlay and body. Removal of these
		 * classes restores the current state of the user
		 * experience. Again, all handled by CSS (awesome).
		 */
		$( id ).on( 'click', function( event ) {
			// Verify that only the outer wrapper was clicked.
			if ( event.target.id == overlay ) {
				$( id ).removeClass( 'overlay-open' );
				$( 'body' ).removeClass( 'overlay-view' );
			}
		});

		$( '.overlay-close' ).on( 'click', function( event ) {
			$( id ).removeClass( 'overlay-open' );
			$( 'body' ).removeClass( 'overlay-view' );
		});

		/**
		 * Closes the overlay when the esc key is pressed. See
		 * comment above on closing the overlay for more info
		 * on how this is accomplished.
		 */
		$( document ).keyup( function( event ) {
			// Verify that the esc key was pressed.
			if ( event.keyCode == 27 ) {
				$( id ).removeClass( 'overlay-open' );
				$( 'body' ).removeClass( 'overlay-view' );
			}
		});
	});
}) (jQuery);

//# sourceMappingURL=index.js.map
