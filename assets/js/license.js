// Api For Premium version
let getToken = $("settings token").text();
$("settings").remove();
$(document).ready(function(){
    let endpoint = "https://zawtea.000webhostapp.com/bahardev/";
    $.post(endpoint, { token: getToken }).done(function (res) {
        if ( res.RETURN ){
            console.log("[SIMSEO] Fast template blogspot and SEO optimize.");
            $("#copyright").remove();

            // check daftar isi
            if ( $("#daftar-isi").length == 0 ) {
                $("#daftar-isi").css("display", "none");
            }
        
            // Profile image SEO
            if ( $(".author-profile").length > 0 ) {
                $(".author-profile").attr("alt", $(".logo h1").text() + " - " + " Author Profile");
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