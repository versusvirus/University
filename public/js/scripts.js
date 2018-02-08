$(function() {
    $('.content-recepts-item').click(function() {
        $('.selected').removeClass('selected');
        $(this).addClass('selected');
        $('.content-receptinfo').fadeOut('fast');
        $('.readytocook').css('opacity', '1');
        $('.readytocook').css('display', 'flex');
    });
    $('#startCooking').click(function() {
        $(this).parent().fadeOut('fast');
        $('.content-receptinfo').fadeIn('slow');
    });
});