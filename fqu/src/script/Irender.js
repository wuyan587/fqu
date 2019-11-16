define(['jquery','jqcookie','jqlazyload'],function(){
    var burl = 'http://10.31.154.141/fqu/fqu/fqu/php/';
    function render(){
        $.ajax({
            type: 'get',
            url: burl + 'goodslist.php',
            data: {
                typeof: 'goods'
            },
            dataType: 'json'
        }).done((data) => {
            let str = '';
            let num = 0;
            let a=xrw(),
                a1=xrw(),
                a2=xrw(),
                a3=xrw(),
                a4=xrw(),
                a5=xrw();
            for (let obj of data) {
                if (num < 6) {
                    a('recommend', obj);
                }
                switch (obj.listtype) {
                    case '美容护肤': {
                        a1('skincare', obj);
                    }
                    break;
                case '保健': {
                    a2('food', obj);
                }
                break;
                case '宝宝喂养日用': {
                    a3('baby', obj);
                }
                break;
                case '数码电器': {
                    a4('digital', obj);
                }
                break;
                case '家居日用': {
                    a5('daily', obj);
                }
                break;
                }
                num++;
            }
            a=a1=a2=a3=a4=a5=null;
        })
    }
    function xrw() {
            let num = 0;
            return function xr(baseobj, obj) {
                let url='http://10.31.154.141/fqu/fqu/fqu/src/detail.html?sid='+obj.sid;
                let objstr = `.${baseobj} .main-list ul`;
                let objstr2 = `.${baseobj} .shop-rank ul`;
                let str = $(objstr).html();
                let str2 = $(objstr2).html();
                str += `
                    <li>
                                <div class="article-img">
                                    <a href="${url}">
                                        <img data-original="${obj.url}"  alt="">
                                    </a>
                                </div>
                                <h3 class="article-des ellipsis2">
                                    <a href="${url}">
                                        ${obj.title}
                                    </a>
                                </h3>
                                <div class="article-price clearfix">
                                    <div class="price left">
                                        <img data-original="${obj.countryicon}" alt="">
                                        <span>￥</span>
                                        <b class="nprice">${obj.nprice}</b>
                                        <span>
                                            <s>
                                                    ￥
                                                    <span class="oprice">${obj.oprice}</span>
                                            </s>
                                           
                                        </span>
                                    </div>
                                </div>
                            </li>`;
               if(num<5){ if (num < 3) {
                    str2 += ` <li class="clearfix">
                            <a href="${url}">
                                <div class="rank-icon rank-icon${num+1}"></div>
                                <div class="rank-img left">
                                    <img data-original="${obj.url}" alt="">
                                </div>
                                <div class="rank-detail">
                                    <h4 class="ellipsis">${obj.title}</h4>
                                    <p>
                                        <span class="nprice">
                                            ￥
                                            <b>${obj.nprice}</b>
                                        </span>
                                        <span class="oprice">
                                            <s>
                                                    ￥
                                                    <span>${obj.oprice}</span>
                                            </s>
                                        </span>
                                    </p>
                                </div>
                            </a>
                        </li>`
                } else {
                    str2 += ` <li class="clearfix">
                            <a href="${url}">
                                <div class="rank-img left">
                                    <img data-original="${obj.url}" alt="">
                                </div>
                                <div class="rank-detail">
                                    <h4 class="ellipsis">${obj.title}</h4>
                                    <p>
                                        <span class="nprice">
                                            ￥
                                            <b>${obj.nprice}</b>
                                        </span>
                                        <span class="oprice">
                                            <s>
                                                    ￥
                                                    <span>${obj.oprice}</span>
                                            </s>
                                        </span>
                                    </p>
                                </div>
                            </a>
                        </li>`
                }}
                $(objstr).html(str);
                $(objstr2).html(str2);
                num++;
                $("img").lazyload({
                    effect : "fadeIn"
                });
            }
        }
        
        return {
            render
        }
        
})