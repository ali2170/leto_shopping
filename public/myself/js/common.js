if (location.href.indexOf("login.html") < 0 ){
    $.ajax({
        url: "/employee/checkRootLogin",
        type:"get",
        success:function (data) {
            if (data.error ===400){
                location.href = "login.html";
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


$(function () {
    $(".child").prev().on("click",function () {
        $(this).next().slideToggle();
    })



    $(".icon_menu").on("click", function () {
        //让侧边栏慢慢的出去
        $(".aside").toggleClass("now");
        //慢慢的变长
        $(".main").toggleClass("now");
    });
    $(".icon_logout").on("click",function () {
        $("#logoutModal").modal("show");
    })
    $(".btn_logout").on("click",function () {
        $.ajax({
            type:"get",
            url:"/employee/employeeLogout",
            success:function (data) {
                if (data.success){
                    window.location.href = "login.html";
                }
            }
        })
    })
});