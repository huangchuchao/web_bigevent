/* 
    每次调用 $.get() $.post() $.ajax() 的时候，
    会先调用ajaxPrefilter这个函数。
    在这个函数中可以拿到我们给ajax的配置对象
*/
$.ajaxPrefilter(function(options){
    // console.log(options.url)
    // 在发起真正的ajax请求之前，统一拼接请求的根路径
    options.url = "http://www.liulongbin.top:3007" + options.url
})