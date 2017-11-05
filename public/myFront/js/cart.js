/**
 * Created by TT-LOVE on 2017/11/4.
 */
    mui.init({
    pullRefresh : {
        container:".mui-scroll-wrapper",//下拉刷新容器标识，querySelector能定位的css选择器均可，比如：id、.class等
        down : {
            auto: true,//可选,默认false.首次加载自动上拉刷新一次
            callback :function () {
                $.ajax({
                    type:"get",
                    url:" /cart/queryCart",
                    success:function (data) {
                        setTimeout(function () {
                            tools.checkLogin(data);
                            console.log(data);
                            $("#OA_task_2").html(template("tpl",{data:data}));
                            mui('.mui-scroll-wrapper').pullRefresh().endPulldownToRefresh();
                        },1000)

                    }
                });
            }
        }
    }
});

// 如果用到了下拉或者上拉刷新功能,不能用click事件,只能用tap时间


// 删除功能
// 由于是动态生成,所以只能用注册委托事件

$("#OA_task_2").on("tap",".btn_delete",function () {
    var id = $('.btn_delete').data('id');
    mui.confirm("确定要删吗?","嘎哈呢",["是","否"],function (data) {
        if (data.index === 1){
            mui.toast("操作取消");
        }else{
            $.ajax({
                type:'get',
                url:" /cart/deleteCart",
                data:{
                    id:[id],
                },
                success:function (data) {
                    tools.checkLogin(data);
                    if(data.success){
                        mui('.mui-scroll-wrapper').pullRefresh().pulldownLoading();

                    }
                }
            })
        }
    })

});

// 编辑订单功能


// 未完待续



$("#OA_task_2").on("tap",".btn_edit",function () {
    // var id = $('.btn_edit').data('id');
    // var size = $('.btn_edit').data('size');
    // var num = $('.btn_edit').data('num');
    // console.log(id);
    // console.log(size);
    // var $this = $(this);
    var data = this.dataset;
    var html = template('tpl2',data);
    console.log(data);
    html = html.replace(/\n/g, "");

    // html = html.replace(/\n/g,"");
    mui.confirm(html,"编辑商品",["是","否"],function (e) {
        if (e.index === 1){
            mui.toast("操作取消");
        }
        if (e.index === 0){
            $.ajax({
                type:'post',
                url:'/cart/updateCart',
                data:{
                    id:data.id,
                    size:$('.edit_size span.now').html(),
                    num:$('.edit_num input ').val()
                },
                success:function (data) {
                    tools.checkLogin(data);
                    if (data.success){
                        mui('.mui-scroll-wrapper').pullRefresh().pulldownLoading();
                    }
                }
            });
        }
    })
    mui('.mui-numbox').numbox();
    $('.edit_size span').on("tap",function () {
        $(this).addClass('now').siblings().removeClass('now');
    })
});




// 计算总金额
$("#OA_task_2").on('change','.ck',function () {
    var total = 0 ;
    $(':checked').each(function (i,e) {
        total+=$(this).data('num')*$(this).data('price');
    })

    $('.cart_info span').html(total);
})