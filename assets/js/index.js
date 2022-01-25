$(function () {
    // 获取用户的基本信息
    getUserInfo();

    // 导出layer模块
    var layer = layui.layer;
    // 点击按钮，实现退出功能
    $("#btnLogout").on("click", function () {
        // 提示用户是否确认退出
        layer.confirm("确认退出登录吗？", { icon: 3, title: "提示" }, function (index) {
            // 1、清除本地存储中的 token
            localStorage.removeItem("token")
            // 2、重新跳转到登录页面
            location.href = "./login.html"
            // 关闭 confirm 询问框
            layer.close(index);
        });
    });
});

// 获取用户的基本信息
function getUserInfo() {
    $.ajax({
        method: "GET",
        url: "/my/userinfo",
        /* headers: {
                Authorization: localStorage.getItem("token") || ""
            }, */
        success: function (res) {
            // console.log(res)
            if(res.status !== 0) return layui.layer.msg("获取用户信息失败！")
            // 渲染用户头像
            renderAvatar(res.data);
        },
        /* // 无论请求成功还是失败，最终都会调用 complete 函数
        complete: function(res){
            // res.responseJSON 保存着服务器返回的数据
            // console.log(res)
            if(res.responseJSON.status === 1 && res.responseJSON.message === "身份认证失败！"){
                // 1、清除本地存储的 token
                localStorage.removeItem("token")
                // 2、强制跳转到登录页面
                location.href = "./login.html"
            }
        } */
    });
}

// 渲染用户头像
function renderAvatar(user) {
    // 获取用户名称
    var name = user.nickname || user.username;
    // 设置欢迎文本
    $("#welcome").html("欢迎&nbsp;&nbsp;" + name);
    if (user.user_pic !== null) {
        // 渲染图片头像
        $(".layui-nav-img").attr("src", user.user_pic).show();
        $(".text-avatar").hide();
    } else {
        // 渲染文本头像
        $(".layui-nav-img").hide();
        var firstname = name[0].toUpperCase();
        $(".text-avatar").html(firstname).show();
    }
}
