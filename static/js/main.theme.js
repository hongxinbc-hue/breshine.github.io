(function($) {
    'use strict';
	
$(document).ready(function () {	


	/* portfolio active */	
   function twrportfolio(){
            var portfolio = $("#em_load");
            if( portfolio.length ){
                portfolio.imagesLoaded( function() {
                    portfolio.isotope({
                        itemSelector: ".eportfolio_item",
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
                    $(".filter_menu li").on('click',function(){
                        $(".filter_menu li").removeClass("current_menu_item");
                        $(this).addClass("current_menu_item");

                        var selector = $(this).attr("data-filter");
                        portfolio.isotope({
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
        twrportfolio();	

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
	
       /* Counter Js */
        function counterUp(){
            if ( $('.counter').length ){
                $('.counter').counterUp({
                    delay: 1,
                    time: 1000
                });
            }
        }
        counterUp();	
		
    /*---------------------
    WOW active js 
    --------------------- */
    new WOW().init();
    /*--------------------------
     scrollUp
    ---------------------------- */
    $.scrollUp({
        scrollText: '<i class="icofont-thin-up"></i>',
        easingType: 'linear',
        scrollSpeed: 900,
        animation: 'fade'
    });

	// Mouse Direction Hover Iffect
	$('.single_protfolio').directionalHover();

	$('.single_protfolio').directionalHover({
		// CSS class for the overlay
		overlay: "em_port_content",
		// Linear or swing
		easing: "swing",
		speed: 50
	});	
	
	
	
	
	
	

	
	


		
		
});
	
	
})(jQuery);			
			