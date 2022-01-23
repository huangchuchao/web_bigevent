$(function () {
  /* "去注册账号"链接 */
  $("#link_reg").on("click", function () {
    $(".login-box").hide();
    $(".reg-box").show();
  });

  /* "去登陆"链接 */
  $("#link_login").on("click", function () {
    $(".reg-box").hide();
    $(".login-box").show();
  });

  // 从 layui 中获取 form 和 layer 对象
  var form = layui.form;
  var layer = layui.layer;
  // 通过 form.verify() 函数自定义校验规则
  form.verify({
    // 自定义了一个用于密码框验证的校验规则
    pwd: [/^[\S]{6,12}$/, "密码必须6到12位，且不能出现空格"],
    repwd: function (value) {
      var pwd = $(".reg-box [name=password]").val();
      if (pwd !== value) {
        return "两次密码不一致";
      }
    },
  });

  var baseUrl = "http://www.liulongbin.top:3007"
  /* 监听注册表单的提交事件 */
  $("#reg-form").on("submit", function (e) {
    // 阻止默认的提交事件
    e.preventDefault();
    var data = {
      username: $("#reg-form [name=username]").val(),
      password: $("#reg-form [name=password]").val(),
    };
    $.post(baseUrl + "/api/reguser", data, function (res) {
      if (res.status !== 0) return layer.msg(res.message);
      layer.msg("注册成功！请返回登录！");
      $("#link_login").click();
    });
  });

  /* 监听登录表单的提交事件 */
  $("#login-form").submit(function (e) {
    e.preventDefault();
    // console.log($(this).serialize());
    /* var data = {username: $('#login-form [name=username]').val(), password: $('#login-form [name=password]').val()} */
    $.ajax({
      url: baseUrl + "/api/login",
      method: "POST",
      data: $(this).serialize(),
      success: function (res) {
        if (res.status !== 0) return layer.msg("登陆失败！");
        layer.msg("登录成功！");
        // 将登录成功得到的 token 字符串保存到 localStorage 中
        localStorage.setItem('token', res.token)
        //登录成功跳转到首页
        location.href = "./index.html"; 
      },
    });
  });
});
