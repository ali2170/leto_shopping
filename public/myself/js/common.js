if (location.href.indexOf("login.html") < 0 ){
    $.ajax({
        url: "/employee/checkRootLogin",
        type:"get",
        success:function (data) {
            if (data.error == 400){
                location.href = "index.html";
            }
        }
    });
}


 
$(document).ajaxStart(function () {
    NProgress.start();
});
$(document).ajaxStop(function () {
    setTimeout(function () {
        NProgress.done();
    },500)
});