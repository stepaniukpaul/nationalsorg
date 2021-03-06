'use strict';

$(document).ready(function () {

    //Resize

    const SCREEN = {
        'mobile': 575,
        'mobile_hd': 767,
        'tablet': 991,
        'desktop': 1289
    };

    function checkWidth() {
        if ($(window).width() <= SCREEN.mobile_hd) {
            if ($('.m-control').hasClass('is-active')) {
                $('.m-menu').css({'display': 'block'});
            } else {
                $('.m-menu').css({'display': 'none'});
            }
        } else {
            $('.m-menu').fadeIn(200);
        }
    }

    checkWidth();
    $(window).resize(checkWidth);


    // Mobile control btn

    $('.m-control').on('click', function (e) {
        if ($(this).hasClass('is-active')) {
            $('.m-menu').fadeOut(200);
            $(this).removeClass('is-active');
        } else {
            $('.m-menu').fadeIn(200);
            $(this).addClass('is-active');
        }
    });


    //Aside bar functional

    $('.fixed-aside').on('click', function () {
        $(this).addClass('is-active');
    });

    $('.slideout__btn').on('click', function () {
        $(this).parent('.slideout').toggleClass('is-active');
    });

    $(document).on('touchstart click', function (e) {
        const fixedAside = $('.fixed-aside');
        if (e.target !== fixedAside[0] && !fixedAside.has(e.target).length){
            $('.fixed-aside').removeClass('is-active');
            $('.slideout').removeClass('is-active');
        }
    });


    //Dropdown button

    $('.dropdown__button').on('click', function () {
        $(this).siblings('.dropdown__content').toggleClass('is-visible');
    });

    $(document).on('touchstart click', function (event) {
        if ($(event.target).closest('.dropdown__button').length)
            return;
        $('.dropdown__content').removeClass('is-visible');
        event.stopPropagation();
    });


    //Slick slider

    $('#slider-main').slick({
        adaptiveHeight: true,
        slidesToShow: 5,
        swipeToSlide: true,
        responsive: [
            {
                breakpoint: (SCREEN.desktop + 1),
                settings: {
                    slidesToShow: 4
                }
            },
            {
                breakpoint: (SCREEN.tablet + 1),
                settings: {
                    slidesToShow: 3
                }
            },
            {
                breakpoint: (SCREEN.mobile_hd + 1),
                settings: {
                    slidesToShow: 2,
                    dots: true
                }
            },
            {
                breakpoint: (SCREEN.mobile + 1),
                settings: {
                    slidesToShow: 1,
                    dots: true
                }
            }
        ]
    });

    $('#slider-aside').slick({
        adaptiveHeight: true,
        slidesToShow: 1,
        swipeToSlide: true,
        responsive: [
            {
                breakpoint: (SCREEN.mobile + 1),
                settings: {
                    dots: true
                }
            }
        ]
    });
    (function() {
    if (window.pluso)if (typeof window.pluso.start == "function") return;
    if (window.ifpluso==undefined) { window.ifpluso = 1;
        var d = document, s = d.createElement('script'), g = 'getElementsByTagName';
        s.type = 'text/javascript'; s.charset='UTF-8'; s.async = true;
        s.src = ('https:' == window.location.protocol ? 'https' : 'http')  + '://share.pluso.ru/pluso-like.js';
        var h=d[g]('body')[0];
        h.appendChild(s);
    }})();

    // Datapicker
    $('#js-date-picker, .js-date-picker').datepicker({
        changeYear: true,
        yearRange: "1950:2018",
        dateFormat: "dd/mm/yy"
    });

    // Clear Date value in date field
    // $('.js-clear_date_field').click(function () {
    //     $('#js-date-picker').val('');
    // });
    $('.js-clear_date_field').click(function () {
        $(this).next().val('');
        return false
    });


// Date changer (Events page)
    $('.js-change_date_field').on('click', function () {
        var prevInput = $(this).prev();
        var nextInput = $(this).next();
        $(this).before(nextInput).after(prevInput);
    });
// Switch visibility
    $('.js_icon-switcher').click(function () {
        $('.select_icon_popup').slideToggle();

    });
    $('.close_popup_button').click(function () {
        $('.select_icon_popup').slideUp();
    });


    // tinymce
    tinymce.init({
        content_css: [
            './assets/fonts/fontawesome-free-5.0.13/web-fonts-with-css/css/fontawesome-all.min.css'],
        selector: '.js-tinymce',
        height: 80,
        verify_html: false,
        menubar: false,
        statusbar: false,
        font_formats:'HelveticaNeueCyr,Font Awesome 5 Free',
        plugins: [
            'advlist autolink lists link  charmap  preview anchor ',
            'table  paste'
        ],
        toolbar: 'bold | bullist numlist | italic | link',

    });

    setTimeout(function () {
        $('.js-selected_icon').each(function () {
            $(this).on('click',function () {
                var getIconStyle = $(this).attr('class');
                console.log(getIconStyle);
                $('.js_choice-icon').html('<i class="'  + getIconStyle + '"></i>' + ' Choice icon');
                $('.select_icon_popup').slideUp();
            })
        })
    },500);

    $('.js-validateBtn').on('click',function () {
       var chekOnEmpty = tinyMCE.activeEditor.getContent();
       if(chekOnEmpty.length == 0){
           $('.forum_editable_field label #mce_0_ifr').css('borderColor','red')
       }})


// Time picker (Setting event page)
    $('.js-time-picker').timepicker({ 'timeFormat': 'h:i A' });

// Radio btns (Setting event page)
    $('.radio-group .btn').on('click', function () {
        $(this).closest('.radio-group').find('.btn').removeClass('active');
        $(this).addClass('active')

    })
});