// scroll header
$(window).scroll(function() {
    let scroll = $(window).scrollTop();
    // console.log();
    if ( scroll > 49 ) {
        $(".wrp-header").addClass("scroll-true");
    }else {
        $(".wrp-header").removeClass("scroll-true");
    }
});

$(document).ready(()=>{

});