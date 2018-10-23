// Scroll
$(function() {
    $('a[href*="#"]:not([href="#"])').click(function() {
        if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
            if (target.length) {
                $('html, body').animate({
                    scrollTop: target.offset().top
                }, 1000);
                return false;
            }
        }
    });
});

// Fancybox
$(document).ready(function() {
    $(".fancybox").fancybox({
        padding: 0,
        openEffect : 'elastic',
        openSpeed  : 150,
        closeEffect : 'elastic',
        closeSpeed  : 150,
        closeClick : true,
        helpers : {
            overlay : null
        }
    });
    $('.fancybox-buttons').fancybox({
        openEffect  : 'none',
        closeEffect : 'none',
        prevEffect : 'none',
        nextEffect : 'none',
        closeBtn  : false,
        helpers : {
            title : {
                type : 'inside'
            },
            buttons	: {}
        },
        afterLoad : function() {
            this.title = 'Image ' + (this.index + 1) + ' of ' + this.group.length + (this.title ? ' - ' + this.title : '');
        }
    });
    $('.fancybox-thumbs').fancybox({
        prevEffect : 'none',
        nextEffect : 'none',
        closeBtn  : false,
        arrows    : false,
        nextClick : true,
        helpers : {
            thumbs : {
                width  : 50,
                height : 50
            }
        }
    });
    $('.fancybox-media')
        .attr('rel', 'media-gallery')
        .fancybox({
            openEffect : 'none',
            closeEffect : 'none',
            prevEffect : 'none',
            nextEffect : 'none',
            arrows : false,
            helpers : {
                media : {},
                buttons : {}
            }
        });
    $("#fancybox-manual-a").click(function() {
        $.fancybox.open('1_b.jpg');
    });
    $("#fancybox-manual-b").click(function() {
        $.fancybox.open({
            href : 'iframe.html',
            type : 'iframe',
            padding : 5
        });
    });
    $("#fancybox-manual-c").click(function() {
        $.fancybox.open([
            {
                href : '1_b.jpg',
                title : 'My title'
            }, {
                href : '2_b.jpg',
                title : '2nd title'
            }, {
                href : '3_b.jpg'
            }
        ], {
            helpers : {
                thumbs : {
                    width: 75,
                    height: 50
                }
            }
        });
    });
});

//Slider
$(document).ready(function(){
    $('.classe-do-slider').slick({
        autoplay: true,
        dots: true,
        arrows: true,
        speed: 1500,
        pauseOnHover: true,
        adaptiveHeight: false,
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 3
    });
});

// Reveal when scroll
window.sr = ScrollReveal();
sr.reveal('.reveal');