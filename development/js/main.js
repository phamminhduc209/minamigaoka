(function($){
    "use strict";
    /*  [ Sticky Menu ] */
    // $('.stick-header').sticky({ topSpacing: 0 });
    
    // ===== Scroll to Top ==== 
    $(window).scroll(function () {
        if ($(this).scrollTop() >= 200) {
            $('#return-to-top').addClass('td-scroll-up-visible');
        } else {
            $('#return-to-top').removeClass('td-scroll-up-visible');
        }
    });
    $('#return-to-top').click(function () {
        $('body,html').animate({
            scrollTop: 0
        }, 'slow');
    });
    

})(jQuery); // End of use strict