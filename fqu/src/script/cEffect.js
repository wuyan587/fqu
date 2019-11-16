define([
    'jquery',
    'jqcookie'
], function() {
        let ashop=[];
        function init(){
            change();
            event();
            $('.footer-warp').load('./foot.html');
        }
        function change(){
            if($.cookie('shop')){
                $('.cart-none').hide();
                $('.cart-list').show();
                ashop=JSON.parse($.cookie('shop'));
            }else{
            $('.cart-none').show();
            $('.cart-list').hide();
        }
        if($.cookie('shop')) $('.cart-num .num').html(JSON.parse($.cookie('shop')).length);
        else $('.cart-num .num').html(0);
        }
        function btn(num, type) {
            if (type) {
                num++;
                return num
            } else {
                num--;
                if (num < 0)
                    num = 0;
                return num;
            }
        }
        function setcookie(obj){
            let sid=obj.parentsUntil('tbody').parent().attr('sid');
            let num=obj.parentsUntil('tbody').find('.num-input').val();
            for(let v of ashop){
                if(v.sid==sid){
                    v.num=num;
                }
            }
            $.cookie('shop',JSON.stringify(ashop));
        }
        function delcookie(obj){
            let sid=obj.parentsUntil('tbody').parent().attr('sid');
            ashop.forEach((v,i)=>{
                if(v.sid==sid){
                    ashop.splice(i,1);
                }
            })
            $.cookie('shop',JSON.stringify(ashop));
            
            if(ashop.length==0)
                $.cookie('shop','');
        }
        function price(obj) {
            let sprice = 0;
            let num = obj.parentsUntil('tbody').find('.num-input').val();
            sprice = num * obj.parentsUntil('tbody').find('.td3 b').html();
            obj.parentsUntil('tbody').find('.price').html(sprice);
        }

        function allprice() {
            let aprice = 0;
            $('.select:checked').parentsUntil('tbody').find('.price').each((i, v) => {
                aprice += parseInt($(v).html());
            })
            $('.all-price').html(`￥${aprice}`);
        }

        function chose(bool) {
            $('.select').each((i, v) => {
                $(v).prop('checked', bool);
            });
            $('.all-select').each((i, v) => {
                $(v).prop('checked', bool);
            });
        }
        function alldelect(){
            $('.select:checked').each((i,v)=>{
                delcookie($(v));
                $(v).parentsUntil('tbody').parent().remove();
                
            })
        }
        function event(){
            $('section').on('click', function (ev) {
                let num = 0;
                var ev = $(ev.target);
                switch (true) {
                    case ev.hasClass('del'):
                        num = ev.parent().find('input').val();
                        ev.parent().find('input').val(btn(num, false));
                        setcookie(ev);
                        price(ev);
                        break;
                    case ev.hasClass('add'):
                        num = ev.parent().find('input').val();
                        ev.parent().find('input').val(btn(num, true));
                        setcookie(ev);
                        price(ev);
                        break;
                    case ev.hasClass('delete'):
                        delcookie(ev);
                        ev.parentsUntil('tbody').parent().remove();
                        
                        break;
                    case ev.hasClass('all-select'):
                        if (ev.prop('checked')) {
                            chose(true);
                        } else {
                            chose(false);
                        }
                        break;
                    case ev.hasClass('select'):
                        if ($('.select:checked').length == $('.select').length) {
                            $('.all-select').each((i, v) => {
                                $(v).prop('checked', true);
                            });
                        } else {
                            $('.all-select').each((i, v) => {
                                $(v).prop('checked', false);
                            });
                        }
                        break;
                    case ev.hasClass('del-chose'):
                            alldelect();
                            break;
                }
                allprice();
                $('.chose-num').html($('.select:checked').length);
                change();
            })
            $('.cart-list').on('blur','.num-input',function(){
                price($(this));
                setcookie($(this));
            })
        }
        
        
        return {
            init,
            allprice,
            change
        }
});