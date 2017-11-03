/**
 * Created by TT-LOVE on 2017/11/3.
 */
mui('.mui-scroll-wrapper').scroll({
    indicators:false
});
var data={
    proName:"",
    brandId:"",
    price:"",
    num:"",
    page:1,
    pageSize:5
};
function render(data) {
    $.ajax({
        type:"get",
        url:"/product/queryProduct",
        data: data ,
        success:function (data) {
            setTimeout(function () {
                $(".product").html(template("tpl",data))
            },1000)

        }
    });
}
//思路：
//1. 获取地址栏的参数，设置到文本框中.
//2. 通过地址栏的参数，去查询商品，把商品渲染到页面中。
//3. 点击搜索按钮，获取搜索框中的value值，查询商品，渲染到页面.
//4. 点击排序，需要对商品进行排序。
//5. 添加一个遮罩效果
// render();
var key = tools.getParam("key");
$(".main .top button").val(key);
data.proName = key;
render(data);
$(".main .top button").on("click",function () {
    $(".main .nav a").removeClass("now");
    $(".lt_sort span").removeClass("fa-angle-up").addClass("fa-angle-down");
    data.price='';
    data.num='';
    // alert("哈哈")
    var key = $(".main .top input").val().trim();
    if (key ===""){
        mui.toast("你想搜啥");
    }
    data.proName = key;
    render(data);
});

$(".nav a[data-type]").on("click",function () {
    var $this = $(this);
    var $span = $this.find('span');
    // console.log(11);
    // $(this).find("span").toggleClass("fa-angle-down").toggleClass("fa-angle-up");
    // $(this).addClass("now").siblings().removeClass("now")
    if ($this.hasClass("now")){
        $span.toggleClass("fa-angle-down").toggleClass("fa-angle-up");

    }else {
        $('.nav span').removeClass("fa-angle-up").addClass("fa-angle-down");
        $('.nav a').removeClass('now');
        $this.addClass("now").siblings().removeClass("now");
    }
    var type =$this.data("type");
    var value = $span.hasClass('fa-angle-up')?1:2;
    data[type]=value;
    render(data);
})
