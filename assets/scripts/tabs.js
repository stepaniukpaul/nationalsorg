$(document).ready(function () {
    $('.login_form').addClass('activeTab');
    //Tabs
    /*
    * Обертка для всех табов tab_wrap
    * Всем кнопкам табов даем класс tablinks
    * Обертка для контена таба tabcontent
     */
    $('.tablinks').on('click', function () {
        // Hide all tabs
        var tabsArr = $('.tab_wrap').children(".tabcontent");
        tabsArr.each(function () {
           $(this).hide();
        });
        // Delete class active from tabs name
        var allTabs = $('.tablinks');
        allTabs.each(function () {
            $(this).removeClass('activeTab')
        });
        // Add class to need tab
        $(this).addClass('activeTab');
        // Show need tab
        var dataThis = $(this).attr('data-href');
        tabsArr.each(function () {
            if ( $(this).attr('id') == dataThis ){
                $(this).show();
            }
        })
    });
});