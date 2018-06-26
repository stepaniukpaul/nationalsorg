/*
    Что бы получить предпросмотр картинки
    вызываем функцию readURL в событии change которое вызываем на инпут type = "file"



*/
$(document).ready(function () {
    //Get preview image in file loader field
    function readURL(input) {
        if (input.files && input.files[0]) {
            // create filereader
            var reader = new FileReader();


            // А так же нужно указать место для замены src картинки которую нужно поменять на загруженную
            reader.onload = function (e) {
                //Change default image src on new path
                $('.js-user-photo').attr('src', e.target.result);
            };
            // read file path
            reader.readAsDataURL(input.files[0]);
        }
    }
    //When field have change call function readURL
    $('#take_file, .take-file').change(function () {
        readURL(this);
    });
    // Remove photo from preview and change on default image
    $('.clear_photo_field').on('click',function () {
        $('.js-user-photo').attr('src', 'assets/images/personal-photo.png');
    });

    $('#req_field').on('change',function () {
        var files = fileInput.files;

        for (var i = 0; i < files.length; i++) {
            alert("Filename " + files[i].name);
        }
    });

    //    File name

    /*
        Получаем и записываем имя картинки в span

        Для этого делаем такую структуру

        <div class="file-load">
            <span class="req_field">Image File</span>
            <input type="file" class=" load_file-target " id="YOUR ID" data-multiple-caption="{count} files selected" >
            <label for="YOUR ID" class="set_req">
                <span class="cur_file-name">Select file...</span>
            </label>
        </div>

        В переменную inputs добавляем свой класс что бы данные выбирались именно с него
        Атрибут data-multiple-caption обязательный , а так же не забыть поменять айди
    */
    var inputs = $( '.load_file-target' );
    Array.prototype.forEach.call( inputs, function( input )
    {
        var label	 = input.nextElementSibling,
            labelVal = label.innerHTML;
        input.addEventListener( 'change', function( e ){
            var fileName = '';
            if( this.files && this.files.length > 1 ){
                fileName = ( this.getAttribute( 'data-multiple-caption' ) || '' ).replace( '{count}', this.files.length );
            }
            else{
                fileName = e.target.value.split( '\\' ).pop();
            }
            if( fileName ){
                label.querySelector( 'span' ).innerHTML = fileName;

            }

            else{
                label.innerHTML = labelVal;
            }
        });
    });
    /*
        Получаем данные из полей type file и выводим эти данны(размер, имя) файла на странице
       */

    $('#forum-load_vid').change(function () {
        var name = this.files[0].name;
        var size = this.files[0].size;
        if(size < 1024){
            $('.form_js-vid_size').text('0.' + Math.round(size));
        }else{
            $('.form_js-vid_size').text( Math.round(size / 1024) / 1000);
        }
       $('.form_js-vid_name').text(name);
    });

    $('#forum-load_pict').change(function () {
        var name = this.files[0].name;
        var size = Math.round(this.files[0].size);
        if(size < 1024){
            $('.form_js-vid_size').text('0.' + Math.round(size));
        }else{
            $('.form_js-img_size').text( Math.round(size / 1024) / 1000);
        }
        $('.form_js-img_name').text(name);
    });
    /*Проверка , и добавление класса required если не был загружен файл (логотип компании)
        если файл не был выбран и остается дефолтное значение тега span , то добавляем класс required , что
        указывает пользователю на то что пропущенно обязательное поле
    */
    $('.partners_form-send').on('click',function () {
        if( $('.cur_file-name').text() == 'Select file...'){
            $('.set_req').addClass('required');
        }else{
            $('.set_req').removeClass('required');
        }
    });
});
