define([
    'jquery',
    'jqcookie'
], function() {
    var burl = 'http://127.0.0.1/fqu/fqu/fqu/php/';
    function render(){
        $.ajax({
            type: 'get',
            url: burl + 'goodslist.php',
            data: {
                sid:location.search.substring(1).split('=')[1]
            },
            dataType: 'json' 
        }).done((data)=>{
            $('.article-type').html(data.listtype);
            $('.article-title').html(data.title);
            $('.title p').html(data.description);
            $('.article-from').html(data.from);
            $('.price b').html(data.nprice);
            $('.price strong').html(`指导价：￥${data.oprice}`)
            $('.fdj img').attr('src',data.url);
            $('.country').html(`${data.country}品牌`);
            $('.from img').attr('src',data.countryicon)
            let str='';
            let flag=true;
            for(let v of data.urls.split(',')){
              
                if(flag){
                    str+=` <li class='active'><a href="javascript:;"><img src="${v}" alt=""><span></span></a></li>`;
                    flag=false;
                }else{
                    str+=` <li><a href="javascript:;"><img src="${v}" alt=""><span></span></a></li>`;
                }
                    
            }
            $('.fdj-list ul').html(str);
                str='';
                flag=true;
                for(let v of data.model.split(',')){
                if(flag){
                    str+=`<span class="list chose">
                                    ${v}
                                    <span class="icon icon23"></span>
                            </span>`;
                            flag=false;
                }else{
                    str+=`<span class="list">${v}<span class=""></span></span>`
                }
            }
                $('.model').html(str);
        })
    }
    return {
        render
    }
    
});