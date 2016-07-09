// RANDOM EMOJI IN URL
//
//
// var URLEmoji = URLEmoji || {}
//
// URLEmoji.addEmojiToURL = function () {
//   var urlemoji = ['😉', '😊', '😋', '😌', '😍', '😘', '😎']
//
//
//   // Only Mac
//   if (navigator.userAgent.indexOf('Mac OS X') !== -1) {
//     var eNumber = Math.floor(Math.random() * (urlemoji.length - 1))
//     window.location.hash = urlemoji[eNumber]
//     // history.pushState({}, null, urlemoji[eNumber]);
//   }
//
//
// };
//
// URLEmoji.addEmojiToURL();

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
    bindEvents: function(){
      $(window).on("load resize scroll", $.proxy(this.getClippy, this));
    },

    getClippy: function(){
        s.heading.each(function() {
          var layerOffset = $(this).closest('article, section').offset(),
              containerOffset = layerOffset.top - $(window).scrollTop(),
              clippy = containerOffset - $(this).css("top").replace(/[^-\d\.]/g, '') - $(this).css("margin-top").replace(/[^-\d\.]/g, '');
          $(this).css('clip', 'rect('+ clippy +'px, auto, auto, auto)');
        });
    },
  };
   clippy.init();

})(jQuery);



/*
Header animation on scroll
 */

$(document).ready(function() {
	var header = $(".site-header");
	var intro = $(".site-intro");
	var tagline = $(".site-tagline");
	var pos = header.position();
	if($("#homepage-flag").length > 0) {

	$(window).scroll(function() {
		var windowpos = $(window).scrollTop();
		if (windowpos >= pos.top & windowpos >=300) {
			// header.addClass("small-header");
			intro.addClass("site-intro-fadeout");
			// tagline.addClass("site-tagline-fadeout");
		}
		else {
			// header.removeClass("small-header");
			intro.removeClass("site-intro-fadeout");
			// tagline.removeClass("site-tagline-fadeout");
		}
	});
}
else {
  intro.addClass("site-intro-fadeout");
}
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
