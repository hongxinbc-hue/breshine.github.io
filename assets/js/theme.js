(function ($) {
    'use strict';

    var onePageHeader = $('.one_page');
    var navScroll = onePageHeader.find('.trading_menu .nav_scroll');
    if (navScroll.length && $.fn.onePageNav) {
        navScroll.onePageNav({
            currentClass: 'current',
            changeHash: false,
            scrollSpeed: 1000,
            scrollOffset: onePageHeader.height() || 0,
            scrollThreshold: 0.5,
            filter: '',
            easing: 'swing'
        });
        navScroll.children('li:first-child').addClass('current');
    }

    if (onePageHeader.length && $.fn.scrollToFixed) {
        onePageHeader.scrollToFixed({
            preFixed: function () {
                $(this).find('.scroll_fixed').addClass('prefix');
            },
            postFixed: function () {
                $(this).find('.scroll_fixed').addClass('postfix').removeClass('prefix');
            }
        });
    }

    if (window.WOW) {
        new WOW().init();
    }

    if ($.scrollUp) {
        $.scrollUp({
            scrollText: '<i class="icofont-thin-up"></i>',
            easingType: 'linear',
            scrollSpeed: 900,
            animation: 'fade'
        });
    }

    if ($.fn.venobox) {
        $('.venobox').venobox({
            numeratio: true,
            infinigall: true
        });
    }

    var homeSlider = $('#mainSlider_id2');
    var homeSlides = homeSlider.children('img');
    if (homeSlides.length > 1) {
        var homeSlideIndex = 0;
        var homeCaption = $('#htmlcaption1_3936').appendTo(homeSlider).addClass('breshine-slider-caption is-visible');
        var homeControls = $('<div class="nivo-controlNav breshine-slider-controls"></div>');
        var homeSlideTimer;

        homeSlides.addClass('breshine-slide').eq(0).addClass('is-active');
        homeSlides.each(function (index) {
            $('<a class="nivo-control" href="#" aria-label="Show slide ' + (index + 1) + '">' + (index + 1) + '</a>')
                .toggleClass('active', index === 0)
                .appendTo(homeControls);
        });
        homeSlider.after(homeControls);

        function showHomeSlide(index) {
            homeSlideIndex = index;
            homeSlides.removeClass('is-active').eq(index).addClass('is-active');
            homeControls.children('a').removeClass('active').eq(index).addClass('active');
            homeCaption.toggleClass('is-visible', index === 0);
        }

        function startHomeSlider() {
            homeSlideTimer = setInterval(function () {
                showHomeSlide((homeSlideIndex + 1) % homeSlides.length);
            }, 6000);
        }

        startHomeSlider();
        homeControls.on('click', 'a', function (event) {
            event.preventDefault();
            clearInterval(homeSlideTimer);
            showHomeSlide($(this).index());
            startHomeSlider();
        });
    }
})(jQuery);
