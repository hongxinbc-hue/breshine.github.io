(function($) {
    'use strict';
	
$(document).ready(function () {	
	   function twreproduct(){
		var eproduct = $("#em_load_product");
		if( eproduct.length ){
			eproduct.imagesLoaded( function() {
				eproduct.isotope({
					itemSelector: ".eproduct_item",
					layoutMode: 'masonry',
					filter:"*",
					animationOptions :{
						duration:1000
					},
					hiddenStyle: {
						opacity: 0,
						transform: 'scale(.4)rotate(60deg)',
					},
					visibleStyle: {
						opacity: 1,
						transform: 'scale(1)rotate(0deg)',
					},
					stagger: 0,
					transitionDuration: '0.9s',
					masonry: {}
				});
				$("#witrp_filter li").on('click',function(){
					$("#witrp_filter li").removeClass("ema_product_item");
					$(this).addClass("ema_product_item");

					var selector = $(this).attr("data-filter");
					eproduct.isotope({
						filter: selector,
						animationOptions: {
							animationDuration: 750,
							easing: 'linear',
							queue: false
						}
					});
					return false;
				});

			});
		}
	}
	twreproduct();	
});
	
	
})(jQuery);			
			