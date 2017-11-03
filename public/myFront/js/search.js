// localstorage.setItem("lt_search_history",["哈","呵呵"]);
// localStorage.setItem("lt_search_history",'["哈","呵呵","哈哈哈哈哈哈哈或或或","丫丫"]');
// 获取localStorage历史记录
function getHistory() {
    var search_history = localStorage.getItem("lt_search_history") || "[]";
    var arr = JSON.parse(search_history);
    return arr;
}
function render() {
    var arr = getHistory();
    //模版第二个参数：必须是对象，因为在模版中是直接通过对象的属性来获取。
    $(".history").html(template("tpl", {arr: arr}));
}
// console.log(arr);
render();


// 清空历史记录

$('.history ').on("click",'.fa-trash',function () {

    localStorage.removeItem("lt_search_history");
    render();
});

// 删除单条信息
$('.history').on("click",".fa-close",function () {
    var that = $(this);
    mui.confirm("您确定要删除这条记录吗","温馨提示",["否","是"],function (data) {
        console.log(data);
        if (data.index === 0){
            mui.toast("操作取消");
            return;
        }else {
            var arr = getHistory();
            var index = that.data("index");
            // console.log(arr);
            arr.splice(index,1);
            localStorage.setItem("lt_search_history",JSON.stringify(arr));
            // console.log(arr);
            render();
            mui.toast("操作成功");
        }
    })

});

// 添加功能
// /1. 注册点击事件
//2. 获取文本框中的value值，判断如果没有输入关键字，给用户一个提示
//3. 需要把这个value值存储到缓存中
//4. 页面需要跳转到搜索详情页-  把关键字带过去


$('.top button').on("click",function () {
    var txt = $('.top .txt').val();
    if (txt ===""){
        mui.alert("亲,你要嘎哈","温馨提示");
        return;
    }
    var arr = getHistory();
    var index = arr.indexOf(txt);
    if (index != -1){
        arr.splice(index,1);
    }
    if (arr.length >= 10){
        arr.pop();
    }
    arr.unshift(txt);
    localStorage.setItem("lt_search_history",JSON.stringify(arr));
    location.href="searchList.html?key="+txt;
})