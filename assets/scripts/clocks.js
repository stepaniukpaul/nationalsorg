'use strict';
$(document).ready(function () {

    function analogClock( element, utc ) {
        // utc - время нужной страны в формате UTC
        const sec = element.querySelector('.clock__hand_second');
        const min = element.querySelector('.clock__hand_minute');
        const hour = element.querySelector('.clock__hand_hour');

        setInterval(function () {
            var seconds = new Date().getSeconds();
            var sdegree = seconds * 6;
            var srotate = "rotate(" + sdegree + "deg)";
            sec.style.transform = srotate;
        }, 1000);

        setInterval(function () {
            var mins = new Date().getMinutes();
            var mdegree = mins * 6;
            var mrotate = "rotate(" + mdegree + "deg)";
            min.style.transform = mrotate;
        }, 1000);

        setInterval(function () {
            var hours = new Date().getUTCHours() + +utc;
            var mins = new Date().getMinutes();
            var hdegree = hours * 30 + (mins / 2);
            var hrotate = "rotate(" + hdegree + "deg)";
            hour.style.transform = hrotate;
        }, 1000);
    }


    window.addEventListener('load', function () {
       var allClocksArr = [].slice.call( document.querySelectorAll('.clock-group__item') );

       for ( var i = 0; i < allClocksArr.length; i++ ) {
           var timeDifference = allClocksArr[i].getAttribute('data-clock');

           analogClock( allClocksArr[i], timeDifference );
       }
    });


});


