define([
    'jquery',
    'jqcookie'
], function() {
    function init(){
        
       
        $('.header-warp').load('./header.html',function(){
            if($.cookie('shop')) $('.num').html(JSON.parse($.cookie('shop')).length);
            else $('.num').html(0);
        });
        $('.footer-warp').load('./foot.html');
        banner('.banner');
        topnav();
    }
    function banner(obj){
        function change(i){
            blist.find('li').eq(i).addClass('active').siblings().removeClass('active');
            bbtn.find('li').eq(i).addClass('active').siblings().removeClass('active');
        }
        let blist=$(obj).find('.banner-list');
        let bbtn=$(obj).find('.banner-btn');
        let index=0;
        let timer=null;
        timer=setInterval(()=>{
            index++;
            if(index>=bbtn.find('li').length)
                index=0;
            change(index);
        },3000)
        bbtn.find('li').on('click',function(){
           index=$(this).index();
           change(index);
        })
    $(obj).hover(function(){
        clearInterval(timer);
    },function(){
        timer=setInterval(()=>{
            index++;
            if(index>=bbtn.find('li').length)
                index=0;
            change(index);
        },3000)
    });
    }
    function topnav(){
        $(window).on('scroll',function(){
            if($(window).scrollTop()>300)
            $('.nav-fixed').stop(true).animate({
                opacity:1,
                top:0
            })
            else{
                $('.nav-fixed').stop(true).animate({
                    opacity:0,
                    top:-59
                })
            }
        })
    }
    return {
        init
    }
});