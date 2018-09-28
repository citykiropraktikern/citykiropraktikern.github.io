jQuery(document).ready(function($) {
    
    /* Superfish Menu Call */
    $('#corpus_menu').superfish({});
    
    /* Responsive Menu */
    $('.primarymenu-resp').sidr({
        'name': 'sidr-menu',
        'side': 'right',
    });
    
    $(window).resize(function() {
        if($('.sidr').css('display') == 'block'){
            $.sidr('close', 'sidr-menu');
        }
    });

    /* Service Section */
    var serviceAnchorColor = $('.mudpack-service-text a').css('color');
    $('.mudpack-service-text').hover(
        function(){
            $(this).children('a').stop().animate({
                color: '#DDDDDD'
            });
            $(this).children('a').children('i').stop().fadeIn();
        },
        function(){
            $(this).children('a').children('i').stop().fadeOut(100);
            $(this).children('a').stop().animate({
                color: serviceAnchorColor
            }, 800);
        });
		
    /* Flexslider */
    $('.slider').flexslider({
        animation: corpus_slide_vars.animation,
        direction: 'horizontal',
        slideshow: true,
        slideshowSpeed: parseInt(corpus_slide_vars.slideshowSpeed),
        animationSpeed: parseInt(corpus_slide_vars.animationSpeed),
        pauseOnAction: true,
        controlNav: false,
        directionNav: Boolean(corpus_slide_vars.directionNav),
        smoothHeight: Boolean(corpus_slide_vars.smoothHeight),
    });
    
    /* Owl Carousel */
    $(".owl-carousel").owlCarousel({
        items: 1,
        loop: true,
        nav: true,
    });
    
    /* Project */
    var textOverlayContainerHeight = $('.projects-section .project-box-container .project-text-overlay-container').css('height');
    
    $('.projects-section .project-box-container').hover(function(){
        $(this).find('.project-text-overlay-container').stop().animate(
            {
                height: '100%'
            }, {
                duration: 400,
                done: function(){
                    $(this).find('.project-box-button').fadeIn(100);
                }
            });
    }, function(){
        $(this).find('.project-text-overlay-container').stop().animate(
            {
                height: textOverlayContainerHeight
            }, {
                duration: 400,
                start: function(){
                    $(this).find('.project-box-button').fadeOut(100);
                },
            });
    });
    //$('.projects-section .project-text-overlay-container')
});