define([
    'jquery',
    'jqcookie'
], function() {
    function init(){
        if($.cookie('shop')) $('.cart-num .num').html(JSON.parse($.cookie('shop')).length);
        else $('.cart-num .num').html(0);
    }
    return {
        init
    }
});