// Api For Premium version
let getToken = $("settings token").text();
$("settings").remove();
$(document).ready(function(){
    let endpoint = "https://zawtea.000webhostapp.com/bahardev/";
    $.post(endpoint, { token: getToken }).done(function (res) {
        if ( res.RETURN ){

        }else {
            // tidak menggunakan license as free version
            console.log("Template menggunakan Free Version meski dapat updatean tapi copyright sidebar tidak dapat dihapus !");
            console.log("Message server :");
            console.log(res);
            // jika pencicip nackal
            if ( $("#copyright").children().length == 0 ) {
                alert("OOPS Kamu menghapus copyright. Harap hargai pembuat template jika anda tidak membeli premium versi :). Kamu akan diredirect pakse ke bahardev website");
                window.location.href = "http://bahardev.my.id";
            }
        }
    });
});