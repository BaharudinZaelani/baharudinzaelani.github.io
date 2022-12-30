// Api For Premium version
let getToken = $("settings token").text();
let daftarIsi = $("settings daftarIsi").text();
let daftarIsiText = $("settings daftarText").text();
$("settings").remove();
$(document).ready(function(){
    let endpoint = "https://zawtea.000webhostapp.com/bahardev/";
    $.post(endpoint, { token: getToken }).done(function (res) {
        if ( res.RETURN ){
            console.log("[SIMSEO] Fast template blogspot and SEO optimize.");
            $("#copyright").remove();

            // check daftar isi
            // Jika daftar isi diset True ! Tampilan !.
            if ( daftarIsi == "true" ) {
                if ( $("#daftar-isi").length == 0 ) {
                    $("#daftar-isi").css("display", "none");
                }
                $(".daftar-isi h4").text(daftarIsiText);
            }else {
                $(".daftar-isi").css("display", "none");
            }
        
            // Profile image SEO
            if ( $(".author-profile").length > 0 ) {
                $(".author-profile img").attr("alt", $(".logo h1").text() + " - " + " Author Profile");
            }

            // comment SEO Setting
            $("#comments").ready(()=>{
                if ( $("#comments").length > 1 ) {
                    // remove comment-form if a redirect to _itself
                    if ( $(".comment-form a").length > 0 ) {
                        $(".comment-form").remove();
                    }
                    // comment iframe no have title
                    if ( $(".comment-replybox-thread").length > 0 ) {
                        $(".comment-replybox-thread iframe").attr("title", $(".logo h1").text() + " - " + " Comment Frame");
                    }
                }else {
                    $("#comments").remove();
                }
            });

            // add shadow to post-footer-line if exist
            if ( $(".post-footer .post-footer-line").length > 0 ) {
                $(".post-footer-line .post-footer-line").addClass("shadow-sm");
                $(".post-footer-line .post-footer-line").addClass("p-3");
                $(".post-footer-line .post-footer-line").addClass("d-block");
                $(".post-footer-line .post-footer-line").addClass("text-uppercase");
            }

        }else {
            // message
            console.log("This Template Style like CSS/JS/Fonts (SIMSEO), hosted in my github pages, you can't modif this template if you get this template for FREE ! ");
            console.log("if you want this template customize, you need purchase premium template");
            console.log("@BaharDev : https://bahardev.my.id");
            // tidak menggunakan license as free version
            console.log("Template menggunakan Free Version meski dapat updatean tapi copyright sidebar tidak dapat dihapus !");
            
            // jika pencicip nackal
            // check copyright anchor
            if ( $("#copyright a").text() === "@BaharDev" ) {
                console.log("Pengguna Template ini memenuhi syarat :3. Terimaksih dan Mohon maaf jika ini keterlaluan keamanannya. Tapi yahh emang gmna lagi saya cuman seorang manusia yang membutuhkan uang untuk dapat hidup.");
            }else {
                if ( $("#copyright").children().length == 0 ) {
                    alert("OOPS Kamu menghapus copyright. Harap hargai pembuat template jika anda tidak membeli premium versi :). Kamu akan diredirect pakse ke bahardev website");
                    window.location.href = "http://bahardev.my.id";
                }
            }
        }
    });
});