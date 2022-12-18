$(document).ready(()=>{
    // home
    // get image
    let postImage = $(".post-image");
    postImage.each(function(e) {
        $(this).css('background-image', 'url(' + $(this).children().attr('content') );
    });
});