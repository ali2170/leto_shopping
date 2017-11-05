/**
 * Created by TT-LOVE on 2017/11/3.
 */
mui(".mui-scroll-wrapper").scroll({
    indicatiors:false
})


var id = tools.getParam('productId');
$.ajax({
    type:"get",
    url:"/product/queryProductDetail",
    data:{
        id:id
    },
    success:function (data) {
        // console.log(data);
        var temp = data.size.split("-");
        var sizeArray = [];
        for(var i = temp[0]; i <= temp[1]; i++){
            sizeArray.push(i);
        }

        data.sizeArray = sizeArray;
        $(".mui-scroll").html(template('tpl',data));

        // 动态生成的都需要手动初始化

        mui('.mui-slider').slider({
            interval:1000//自动轮播周期，若为0则不自动播放，默认为0；
        });
        mui(".mui-numbox").numbox();
        // 动态生成的都需要手动初始化
    }
});
$(".mui-scroll").on("click",".size",function () {
    $(this).addClass("now").siblings().removeClass("now");
});
$(".add_cart").on("click",function () {
    var size = $('.size.now').html();
    var num = $('.item input').val();
    if (!size){
        mui.toast('请选择尺码!');
        return false;
    }
    $.ajax({
        type:"post",
        url:" /cart/addCart",
        data:{
            productId:id,
            size:size,
            num:num
        },
        success:function (data) {
            tools.checkLogin(data);
            if (data.success){
                mui.toast("添加成功!")
            }
        }
    });
})