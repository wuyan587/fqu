define(['md5',
    'jquery'
    
], function() {
    var burl = 'http://10.31.154.141/fqu/fqu/fqu/php/';
    let uflag=false,
        pflag=false;
        
    function init(){
        $('.username,.password').on('focus',function(){
            $(this).addClass('chose').next('.error').hide();
        })
        $('.username').on('blur',function(){
            $(this).removeClass('chose');
            if($(this).val()==''){
                $('.username').removeClass('active');
                $('.username-error').show().html('请输入您的手机号码');
                uflag=false;
            }else{
                let reg=/^1[3456789]\d{9}$/;
                if(reg.test($(this).val())){
                    $.ajax({
                        type: 'post',
                        url: burl + 'goodslist.php',
                        data: {
                            username:$('.username').val(),
                            typeof: 'yz'
                        },
                    }).done(data=>{
                        if(data){
                            $('.username').removeClass('active');
                            $('.username-error').show().html('手机号已存在');
                            uflag=false;
                        }else{
                            $('.username').addClass('active');
                            $('.username-error').hide();
                            uflag=true;
                                                }
                    })
                }else{
                    uflag=false;
                    $('.username-error').show().html('您的手机号码格式有误');
                }
                
            }
        })
        
        $('.password').on('input',function(){
            $(this).removeClass('chose');
            if($(this).val()==''){
                $('.password').removeClass('active');
                $('.password-error').show().html('请设置登录密码');
                pflag=false;
            }else if($(this).val().length<6||$(this).val().length>=18){
                $('.password').removeClass('active');
                $('.password-error').show().html('密码长度不正确');
                pflag=false;
            }else{
                let reg1=/\W/,
                    reg2=/[0-9]/,
                    reg3=/[a-z]/,
                    reg4=/[A-Z]/;
                let flag=0;
                if(reg1.test($(this).val())) flag++;
                if(reg2.test($(this).val())) flag++;
                if(reg3.test($(this).val())) flag++;
                if(reg4.test($(this).val())) flag++;
                switch(flag){
                    case 1:
                            $('.password').removeClass('active');
                            $('.password-error').show().html('密码太弱');
                            pflag=false;
                        break;
                    case 2:
                    case 3:
                            $('.password').removeClass('active');
                            $('.password-error').show().html('强度中等');
                            pflag=true;
                        break;
                    case 4:
                            $('.password').addClass('active');
                            $('.password-error').hide();
                            pflag=true;
                            break;
                }              
            }
        })
        $('.register-btn button').on('click',function(){
            if(pflag&&uflag){
                $.ajax({
                    type: 'post',
                    url: burl + 'goodslist.php',
                    data: {
                        username:$('.username').val(),
                        password:$.md5($('.password').val()),
                        typeof: 'add'
                    },
                })
                alert('注册成功');
            }
        })
        
    };
    return {
        init
    }

});