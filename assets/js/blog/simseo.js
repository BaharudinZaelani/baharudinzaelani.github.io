// message
console.log("This Template Style like CSS/JS/Fonts (SIMSEO), hosted in my github pages, you can't modif this template if you get this template for FREE ! ");
console.log("if you want this template customize, you need purchase premium template");
console.log("@BaharDev : https://bahardev.my.id");
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