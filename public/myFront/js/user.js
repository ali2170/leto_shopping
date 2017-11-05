/**
 * Created by TT-LOVE on 2017/11/4.
 */
$(function () {
    // 动态渲染个人资料
    $.ajax({
        type:"get",
        url:"/user/queryUserMessage",
        success:function (data) {
            tools.checkLogin(data);
            $('.user_info').html(template('tpl',data));
        }
    })



    // 退出按钮
    $('.mui-btn').on("click",function () {
        console.log("哈哈");
        mui.confirm("要退了?","干啥玩意!",['是','否'],function (data) {
            console.log(data);
            if (data.index === 1){
                mui.toast("操作取消");
            }
            if (data.index ===0){
                $.ajax({
                    type:'get',
                    url:'/user/logout',
                    success:function (data) {
                        if (data.success){
                            location.href='login.html';
                        }
                    }
                })
            }
        })
    })
})