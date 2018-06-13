$(document).ready(function () {
    $('#take_file').on('change',function () {
        if($(this).files && $(this).files[0]){
            $('.js-user-photo').attr('src',e.target.result);
        }
        var test = $('#take_file').prop('files')[0];
        console.log(test)
    });
});
