$(function() {
    /*
    Для создания модального окна необходимо создать элемент (ссылку, кнопку),
    присвоить ей класс js-modal а так же data-href ="#modalKa",
    при клике на эту кнопку(ссылку) происходит поиск по дата атрибуту
    если дата атрибут и айдишник обёртки схожи то вызывается попап окно
    Пример структуры:
    <button class="js-modal" data-href="#myModal2">test</button>
    <div id="modalKa" class="modal__wrap">
        some text
    </div>
    Не забываем менять айдишники
    */
    var __curModal ;
    $('.js-modal').on('click', function(){
        __curModal = $(this).data('href');
        openModal(__curModal);
    });
    //============ Position on orientationchange and resize
    $(window).on("orientationchange resize", function() {
        if($('body').hasClass('modal_open')){
            setModalPosition(__curModal);
        }
    });
    //============ CLOSE on button */
    $(document).on('click', function(e){
        if(e.target.className == 'modal__overlay' || e.target.className == 'modal__close'){
            closeModal();
        }
    });
    //============  ESCAPE key pressed
    $(document).keydown(function(e) {
        if (e.keyCode == 27) {
            closeModal();
        }
    });

    //============ Position function
    const setModalPosition = (id) => {
        var modal = $(id),
            position ;
        modal.stop();
        setTimeout(function(){
            if( modal[0].clientHeight > $(window).height() ){
                position = "TOP"
            } else {
                position = "CENTER"
            }
            modal.animate( getPosition(position), 400);
            function getPosition(position){
                if(position == "TOP") {
                    return {
                        top: '20px',
                        marginTop: 0,
                        opacity: 1
                    }
                } else {
                    return {
                        top: $(window).height() / 2 + 'px',
                        opacity: 1,
                        marginTop: '-' + modal[0].clientHeight / 2 + 'px'
                    }
                }
            }
        }, 200);
    };
    //============ OPEN function
    const openModal = (id) => {
        if( $(id)[0].parentElement.className != 'modal__overlay' ){
            $(id).wrap("<div class='modal__overlay'></div>");
        }
        if($('body').hasClass('modal_open')){
            closeModal();
        }

        setTimeout(function () {
            var overlay = $(id).parent();
            $(id).css('display', 'block');
            overlay.fadeIn(400, setModalPosition(id));
            $('body').addClass('modal_open');
        }, 300);
    };

    //============ CLOSE function
    const closeModal = () => {
        var modal = $('.modal__wrap');
        modal.animate({ opacity: 0, top: '45%'}, 200);
        modal.css('display', 'none');
        modal.parent('.modal__overlay').fadeOut(400);
        $('body').removeClass('modal_open');
        setTimeout(function () {
            modal.removeAttr('style');
        }, 250);
    };

});
