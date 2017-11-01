/**
 * Created by TT-LOVE on 2017/11/1.
 */
mui('.left .mui-scroll-wrapper').scroll({
    indicators:false
});

var scroll = mui('.right .mui-scroll-wrapper').scroll({
    indicators:false
});

$.ajax({
    type:"get",
    url:"/category/queryTopCategory",
    // data:,
    success:function (data) {
        var html = template("tpl",data);
        $(".left ul").html(html);
        renderSecond(data.rows[0].id);
    }
});
$(".left").on("click","li",function () {
    $(this).addClass('now').siblings().removeClass('now');
    var id = $(this).data("id");
    renderSecond(id);
    scroll.scrollTo(0,0,100);//100毫秒滚动到顶
})
function renderSecond(id){
    $.ajax({
        type:'get',
        url:"/category/querySecondCategory",
        data:{
            id:id
        },
        success:function (data) {
            var html = template("tpl2",data);
            console.log(data);
            $(".right ul").html(html);
        }
    })
}

