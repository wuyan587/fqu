define([
    'cEffect',
    'jquery',
    'jqcookie',
    
], function(a1) {
    var burl = 'http://127.0.0.1/fqu/fqu/fqu/php/',
        str = '';
    function render(){
        if(!$.cookie('shop'))
            return false;
        JSON.parse($.cookie('shop')).forEach((v,i) => {
            $.ajax({
            type: 'get',
            url: burl + 'goodslist.php',
            data: {
                sid:v.sid
            },
            dataType: 'json' 
        }).done((data)=>{
            str=$('.cart-list table').html()+` <tbody sid='${data.sid}'>
                            <tr>
                                <td class="td1">
                                    <div class="cart-pos">
                                        <input type="checkbox" class='select'  name="" id="" checked>
                                        <a href="">
                                            <img src="${data.url}" alt="">
                                        </a>
                                    </div>
                                </td>
                                <td class="td2">
                                    <h2>
                                        <a href="">${data.title}</a>
                                    </h2>
                                    <div class="cart-detail">包装规格:${v.type}</div>
                                </td>
                                <td class="td3">
                                    <b>${data.nprice}</b>
                                </td>
                                <td class="td4">
                                    <div>
                                        <span class="btn btn-num">
                                            <a href="javascript:;" class="del">-</a>
                                            <a href="javascript:;" class="add">+</a>
                                            <input type="text" class="num-input" value="${v.num}">

                                        </span>
                                    </div>
                                </td>
                                <td class="td5">
                                    <b class="price">${data.nprice*v.num}</b>
                                </td>
                                <td class="td6">
                                    <a href="javascript:;" class="delete icon icon72">删除</a>
                                </td>
                            </tr>
                        </tbody>
            `
            $('.cart-list table').html(str);
            $('.chose-num').html($('.select:checked').length);
            a1.allprice();
        })
    })
    }
    return{
        render
    }
});