/**
 * Created by TT-LOVE on 2017/11/4.
 */
$(function () {
    $(".btn_login").on("click",function () {
        var username = $("[name='username']").val();
        var password = $("[name='password']").val();
        if (!username){
            mui.toast('请输入用户名');
            return false;
        }
        if (!password){
            mui.toast('请输入密码');
            return false;
        }
        $.ajax({
            type:"post",
            url:" /user/login",
            data:{
                username:username,
                password:password
            },
            success:function (data) {
                if (data.error === 403){
                    mui.toast(data.message);
                }
                if (data.success){
                    var search = location.search;
                    // console.log(search);
                    if (search.indexOf("retUrl")>-1){
                        search = search.replace("?retUrl=","");
                        location.href = search;
                    }else {
                        location.href="user.html";
                    }
                }
            }
        })
    })
});