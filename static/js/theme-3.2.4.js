(function($) {
    'use strict';

	/* hamburger menu */
    $('.hamburger').on('click', function() {
        $(this).toggleClass('is-active');
        $(this).next().toggleClass('nav-show')
    });	
    /* mobile menu */
    $('.mobile-menu nav').meanmenu({
        meanScreenWidth: "990",
        meanMenuContainer: ".mobile-menu",
        onePage: true,
    });	
					
	/* top quearys menu */
    var emsmenu = $(".em-quearys-menu i.t-quearys");
    var emscmenu = $(".em-quearys-menu i.t-close");
    var emsinner = $(".em-quearys-inner");
    emsmenu.on('click', function() {
        emsinner.addClass('em-s-open');
        $(this).addClass('em-s-hiddens');
        emscmenu.removeClass('em-s-hidden');
    });
    emscmenu.on('click', function() {
        emsinner.removeClass('em-s-open');
        $(this).addClass('em-s-hidden');
        emsmenu.removeClass('em-s-hidden');
    });	
  /* popup sideber menu */
      var rightma = $(".right_sideber_menu i.openclass");
    var rightmi = $(".right_sideber_menu i.closeclass");
    var rightmir = $(".right_sideber_menu_inner");
    rightma.on('click', function() {
        rightmir.addClass('tx-s-open');
    });
    rightmi.on('click', function() {
        rightmir.removeClass('tx-s-open');

    });	
	    /*--
    	One Page Nav
    ----------------------------------- */
     var top_offset = $('.one_page').height() +0;
    $('.one_page .trading_menu .nav_scroll').onePageNav({
        currentClass: 'current',
        changeHash: false,
        scrollSpeed: 1000,
         scrollOffset: top_offset,
        scrollThreshold: 0.5,
        filter: '',
        easing: 'swing',
    });

    $(".nav_scroll > li:first-child").addClass("current");
    /* sticky nav */
    $('.one_page').scrollToFixed({
        preFixed: function() {
            $(this).find('.scroll_fixed').addClass('prefix');
        },
        postFixed: function() {
            $(this).find('.scroll_fixed').addClass('postfix').removeClass('prefix');
        }
    });	

	/* transprent menu */
    var headers1 = $('.trp_nav_area');
    $(window).on('scroll', function() {

        if ($(window).scrollTop() > 200) {
            headers1.addClass('hbg2');
        } else {
            headers1.removeClass('hbg2');
        }		

    });	
	/* headrooma menu */
	if ($('.headrooma').length != 0) {
        var myElement = document.querySelector(".headrooma");
        var headroom = new Headroom(myElement);
        headroom.init();
    }	
						
    /* Venubox */				
    $('.venobox').venobox({
        numeratio: true,
        infinigall: true
    });	

    /*--------------------------
    	blog messonary
    ---------------------------- */
    $('.bgimgload').imagesLoaded(function() {
        if ($.fn.isotope) {
            var $blogmassonary = $('.blog-messonary');
            $blogmassonary.isotope({
                itemSelector: '.grid-item',
                filter: '*',
                resizesContainer: true,
                layoutMode: 'masonry',
                transitionDuration: '0.8s'
            });

        };
    });		
	/* recent review */
	var recentreviewf = $('.recent-reviews');				
	if(recentreviewf.length > 0){
	recentreviewf.slick({
		infinite: true,
		autoplay: true,
		autoplaySpeed: 3000,					
		speed: 1000,					
		slidesToShow: 1,
		slidesToScroll: 1,
		arrows: true,
		dots: false,
	});
	}
	/* witr_footer_carousel */
	var tfooter = $('.witr_footer_carousel');		
	if(tfooter.length > 0){
		tfooter.slick({
			infinite: true,
			autoplay: true,
			autoplaySpeed: 3000,
			speed: 1000,					
			slidesToScroll: 1,
			arrows: false,
			dots: true,

		});			
	}

    /*--------------------------
    	single gallery
    ---------------------------- */
	
	var wsingle_gallery = $('.single_gallery');				
	if(wsingle_gallery.length > 0){
	wsingle_gallery.slick({
		infinite: true,
		autoplay: true,
		autoplaySpeed: 3000,					
		speed: 1000,					
		slidesToShow: 1,
		slidesToScroll: 1,
		arrows: true,
		dots: false,
	});
	}
/* woo active */	
	var wp_related = $('.wp_related');				
	if(wp_related.length > 0){
	wp_related.slick({
		infinite: false,
		autoplay: false,
		autoplaySpeed: 3000,					
		speed: 1000,					
		slidesToShow: 3,
		slidesToScroll: 1,
		arrows: true,
		dots: false,
		responsive: [
			{
				breakpoint: 1200,
				settings: {
					slidesToShow: 3,
				
				}
		},
			{
				breakpoint: 992,
				settings: {
					slidesToShow: 2,
					
				}
		},
			{
				breakpoint: 767,
				settings: {
					slidesToShow: 1,
					
				}
		}
		]
	});
	}	



	var witr_cross_car = $('.witr_cross_car');				
	if(witr_cross_car.length > 0){
	witr_cross_car.slick({
		infinite: false,
		autoplay: true,
		autoplaySpeed: 3000,					
		speed: 1000,					
		slidesToShow: 2,
		slidesToScroll: 1,
		arrows: true,
		dots: false,
		responsive: [
			{
				breakpoint: 1200,
				settings: {
					slidesToShow: 1,
				
				}
		}
		]
	});
	}
	
	
	/* preloader active */
	function txpreloader() {
		$(window).on('load', function () {
			$('#twr_pretwr_loader_pre').addClass('twr_loader_pre');
			if ($('#twr_pretwr_loader_pre').hasClass('twr_loader_pre')) {
				$('#pretwr_loader_pre').delay(900).queue(function () {
				   $(this).remove();
				});
			}
		});
	}
	txpreloader();
					
})(jQuery);


