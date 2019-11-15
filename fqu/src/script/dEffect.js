define([
    'jquery',
    'jqcookie'
], function() {
    'use strict';
        let ashop=[];
        let flag=true;
        let fdj={};
        function init(){
            fd();
            model();
            btn();
            buy();
            if($.cookie('shop')) $('.cart-num .num').html(JSON.parse($.cookie('shop')).length);
            else $('.cart-num .num').html(0);
        }
        function fd(){
            fdj.bl=($('.dt').height()-$('.fdj').height())/$('.fdj').height();
            $('.fdj').on('mouseover',()=>{
                $('.dt').css('opacity',1);
                $('.xt').css('opacity',0);
            })
            $('.fdj').on('mouseout',()=>{
                $('.dt').css('opacity',0);
                $('.xt').css('opacity',1);
            })
        
                $('.xt').on('mousemove',function(ev){
                    fdj.pyX=ev.offsetX;
                    fdj.pyY=ev.offsetY;
                    $('.dt').css({
                        left:-fdj.pyX*fdj.bl,
                        top:-fdj.pyY*fdj.bl
                    })

                })
        }
        
        function model(){
            $('.model').on('click','.list',function(){
                $(this).addClass('chose').siblings().removeClass('chose').find('span').removeClass('icon icon23');
                $(this).find('span').addClass('icon icon23');
            })
        }
        
        if($.cookie('shop')){
            ashop=JSON.parse($.cookie('shop'));
        }
        function btn(){
                $('.buy-num a').on('click',function(){
                    let num=$('.buy-num input').val();
                    if($(this).hasClass('add')){
                        num++;
                    }else{
                        num--;
                        if(num<=0)
                            num=1;
                    }
                    $('.buy-num input').val(num);
                })
            };
        function buy(){
            let sid=location.search.substring(1).split('=')[1];
                   
            $('.buy-btn button').on('click',function(){
                let num=$('.buy-num input').val();
                for(let v of ashop){
                if(v.sid==sid){
                    v.num=parseInt(v.num)+parseInt(num);
                    v.type=$.trim($('.model .chose').text());
                    flag=false;
                    }else 
                        flag=true;
                }
                if(flag){
                    ashop.push({
                        sid:sid,
                        num:num,
                        type:$.trim($('.model .chose').text())
                    })
                }
                $.cookie('shop',JSON.stringify(ashop));
                $('.cart-num .num').html(JSON.parse($.cookie('shop')).length);
            })
        }
        $('.fdj-list ul').on('click','li',function(){
            let src=$(this).find('img').attr('src');
            $(this).addClass('active').siblings().removeClass('active');
            $('.fdj img').each((i,v)=>{
                $(v).attr('src',src);
            })
        })
            
        return {
            init
        }
});