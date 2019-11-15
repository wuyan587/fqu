require.config({

    paths:{
        'jquery':'https://cdnjs.cloudflare.com/ajax/libs/jquery/1.12.4/jquery.min',  //插件名称必须交jquery
        'jqcookie':'https://cdnjs.cloudflare.com/ajax/libs/jquery-cookie/1.4.1/jquery.cookie.min',
        'jqlazyload':'https://cdn.bootcss.com/jquery_lazyload/1.9.7/jquery.lazyload.min'
    }
})
require(['jquery','jqcookie'], function () {
      var currentPage = $("#current-page").attr("current-page");
      var targetModule = $("#current-page").attr("target-module");
      if (targetModule) {
        // 页面加载完毕后再执行相关业务代码比较稳妥
        $(function () {
          require([targetModule], function (targetModule) {
            // 不要在这里写业务代码
            //全部统一调用init方法
            //也就是每个模块都暴露一个init方法用于事件监听，页面内容加载等
            targetModule.init(currentPage);
          });
        });
        return;
      }
  });