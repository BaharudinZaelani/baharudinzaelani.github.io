$(document).ready(()=>{
    // home
    // get image
    let postImage = $(".post-image");
    postImage.each(function(e) {
        $(this).css('background-image', 'url(' + $(this).children().attr('content') + ')' );
    });

    // blog post
    // add clas to separator image
    let separator = $(".separator");
    separator.each(function(e) {
        // tag img
        $(this).children().children().css("width", "100%");
        $(this).children().children().addClass("img-thumbnail");
    });

});