$(document).ready(function () {
    function readURL(input) {
        if (input.files && input.files[0]) {
            var reader = new FileReader();

            reader.onload = function (e) {
                $('.js-user-photo').attr('src', e.target.result);
            };

            reader.readAsDataURL(input.files[0]);
        }
    }
    $('#take_file').change(function () {
        readURL(this);
    });
    $('.clear_photo_field').on('click',function () {
        $('.js-user-photo').attr('src', 'assets/images/personal-photo.png');
    });
});
