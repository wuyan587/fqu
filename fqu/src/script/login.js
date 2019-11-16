define(['md5',
    'jquery'
], function() {
    var burl = 'http://10.31.154.141/fqu/fqu/fqu/php/';
    let uflag=false;
    function init(){
        $('.login-btn button').on('click',function(){
            if(uflag){
                $.ajax({
                    type: 'post',
                    url: burl + 'goodslist.php',
                    data: {
                        username:$('.username').val(),
                        password:$.md5($('.password').val()),
                        typeof: 'login'
                    },
                }).done(data=>{
                    if(data){
                        location.href='http://10.31.154.141/fqu/fqu/fqu/src/index.html'
                    }else{
                        if($('.password').val()=='')
                        $('.password-error').show().html('请输入密码');
                        else
                        $('.password-error').show().html('账户名或登录密码错误，请重新输入');
                    }
                })
            }
           
        })
        $('.username,.password').on('focus',function(){
            $(this).addClass('chose').next('.error').hide();
        })
        $('.username').on('blur',function(){
            $(this).removeClass('chose');
            if($(this).val()==''){
                $('.username').removeClass('active');
                $('.username-error').show().html('请输入丰趣海淘帐号');
                uflag=false;
            }else{
                $.ajax({
                    type: 'post',
                    url: burl + 'goodslist.php',
                    data: {
                        username:$('.username').val(),
                        typeof: 'yz'
                    },
                }).done(data=>{
                    if(!data){
                        $('.username').removeClass('active');
                        $('.username-error').show().html('账户有误，请重新输入');
                        uflag=false;
                    }else{
                        $('.username').addClass('active');
                        $('.username-error').hide();
                        uflag=true;
                    }
                })
            }
        })
        $('.password').on('blur',function(){
            $(this).removeClass('chose');
            
        })
    }
   return {
       init
   }
});