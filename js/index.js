$(function(){

    var whatN = 0;//第几次抽奖
    var luck_n = 60;//幸运值
    var pre_n = 0;//之前获取的房间数
    var openId = 'o6BszxKaGA8Be9j2K12uC9wQTGmA';
    var new_page = '0';


    var sex = '1'; //0男 1女
    var phone = '';
    var phone2 = '';
    var timeOut = [1000,2000,3000,3000,4000,2500];
    var readyOn = true;

    // var pic = ['./img/0.jpg', './img/1.gif', './img/2.gif', './img/3.gif', './img/4.jpg', './img/5.jpg']
    var pic = ['./img/0.jpg', './img/1.jpg', './img/2.jpg', './img/3.jpg', './img/4.jpg', './img/5.jpg']

    var App = {
        init:function(){
            var self = this;
            self.render();
            
        },
        render:function(){
            var self = this;
             
            self.renderHtml();

            self.getHouse();

            self.secondClick();

            self.radioClick();

            self.submitClick();

            self.scrollToBottom();
        },
        renderHtml:function(){
            var self = this;

            if(new_page == 1){
                $('.need').removeClass("hidden");
                $('.need').addClass("new_page");
                $('.get_house').addClass('hidden');
            } else if (new_page == 0){
                $('.need').removeClass("hidden");
                $('.get_house').addClass('hidden');
            }

            $('.get_house .txt').text('今晚将有'+pre_n+'间房');

            var scale = 0;
            self.timerIn = null;
            clearInterval(self.timerIn);
            self.timerIn = setInterval(function(){
                scale++;
                console.log(scale);
                if(scale == 22){
                    clearInterval(self.timerIn);
                }
                if(scale%2 == 1)
                    $('.need').css('transform','scale(0.8)');
                else
                    $('.need').css('transform', 'scale(1)');
            },500)
        },
        getHouse:function(){
            var self = this;
            setTimeout(() => {
                $('.start_animation').addClass('hidden');
                $('.luck_sec').removeClass("hidden");
            }, 2000);

            $('.need').on("click", function () {
                if (new_page == 1) return;
                new_page = 0;

                clearInterval(self.timerIn);
                $('.need').css('transform', 'scale(1)');



                $('.pray').removeClass("hidden");

                $('.need').addClass("hidden");
                $('.get_house').removeClass("hidden");
                $('.get_house .txt,.get_house .title').addClass("vhidden");
                setTimeout(() => {
                    $('.pray').addClass("hidden");

                    var luck = self.rendomNum(luck_n);
                    $('.person_img').attr("src", pic[luck]);

                    $('.person').removeClass("hidden");


                    setTimeout(() => {

                        $('.get_house .txt,.get_house .title').removeClass("vhidden");
                        $('.person').addClass("hidden");
                        $(".get_house .txt").text("今晚将有"+luck+"间房");
                        $('.person_img').attr("src", pic[0]);
                        whatN = 1;
                        pre_n = luck;
                        readyOn = false;
                        $.post("http://ba.jixuanjk.com/result.php",
                            {
                                openid: openId,
                                room: pre_n
                            },
                            function (result) {
                                readyOn = true;
                                if (result == 1) {
                                    
                                } else {
                                    mui.alert("系统好像发生了异常", '温馨提示', '我知道了');
                                }
                            });

                    }, timeOut[luck]);


                }, 3000);
            });
        },
        secondClick:function(){
            var self = this;
            $('.get_house_again,.new_page').on("click",function(){
                if (!readyOn) return ;

                clearInterval(self.timerIn);
                $('.need').css('transform', 'scale(1)');

                if(whatN == 3){
                    $(".get_house .txt").html("您今天的运气值已用完<br/>请明天再试");
                    $('.need').addClass('hidden');
                    $('.get_house').removeClass('hidden');
                    $(".get_house .title").addClass("hidden");
                    $(".get_house_again").addClass("hidden");
                    return;
                }
                if(whatN == 1){
                    $(".alert_input").removeClass("hidden");
                }else{
                    self.getLuckHouse()
                }
                

            })

            $(".sex_sure").on("click",function(){
                if(phone.length != 11 || phone[0] != 1){
                    mui.alert("请输入正确的手机号码", '温馨提示', '我知道了')
                }else{
                    $.post("http://ba.jixuanjk.com/save.php",
                        {
                            openid: openId,
                            phone: phone,
                            sex: sex,
                            source: '1'
                        },
                        function (result) {
                            if (result == 1) {
                                $('.alert_input').addClass("hidden");
                                self.getLuckHouse();
                            } else {
                                mui.alert("系统好像发生了异常", '温馨提示', '我知道了');
                            }
                        });

                }
            })
        },
        getLuckHouse:function(){
            var self = this;

            $('.pray').removeClass("hidden");


            $('.get_house .txt,.get_house .title').addClass("vhidden");


            setTimeout(() => {
                $('.pray').addClass("hidden");


                $('.need').addClass('hidden');
                $('.get_house').removeClass('hidden');

                var ln = self.rendomNum(luck_n);
                console.log(timeOut[ln])
                $('.person_img').attr("src", pic[ln]);
                $('.person').removeClass("hidden");

                setTimeout(() => {
                    $('.get_house .txt,.get_house .title').removeClass("vhidden");
                    $('.person').addClass("hidden");
                    $('.luck_sec').removeClass("hidden");
                    $('.need').addClass("hidden");
                    $('.get_house').removeClass("hidden");
                    $('.person_img').attr("src", pic[0]);

                    $(".get_house .txt").text("今晚将有" + ln + "间房");
                    
                    whatN++;
                    pre_n = ln;
                    readyOn = false;
                    $.post("http://ba.jixuanjk.com/result.php",
                        {
                            openid: openId,
                            room: pre_n

                        },
                        function (result) {
                            readyOn = true;
                            if (result == 1) {
                                
                            } else {
                                mui.alert("系统好像发生了异常", '温馨提示', '我知道了');
                            }
                        });

                }, timeOut[ln]);
            }, 3000);
        },
        rendomNum: function (n) {
            var rn = Math.random();
            if (whatN == 0 ){
                if (n <= 55) {
                    return 0;
                } else {
                    if (rn < 0.7) {
                        return 1;
                    } else {
                        return 2;
                    }
                }
            } else if (whatN == 1) {
                switch (pre_n) {
                    case 0:
                        return 1;
                        break;
                    case 1:
                        if (rn < 0.25) {
                            return 1;
                        } else if (rn < 0.85) {
                            return 2;
                        } else if (rn < 0.95) {
                            return 3;
                        } else {
                            return 4;
                        }
                        break;
                    case 2:
                        if (rn < 0.70) {
                            return 2;
                        } else if (rn < 0.95) {
                            return 3;
                        } else {
                            return 4;
                        }
                        break;
                    default:
                        break;
                }
            } else if (whatN == 2) {
                switch (pre_n) {
                    case 1:
                        if (rn < 0.25) {
                            return 1;
                        } else if (rn < 0.85) {
                            return 2;
                        } else if (rn < 0.95) {
                            return 3;
                        } else {
                            return 4;
                        }
                        break;
                    case 2:
                        if (rn < 0.70) {
                            return 2;
                        } else if (rn < 0.95) {
                            return 3;
                        } else {
                            return 4;
                        }
                        break;
                    case 3:
                        if (rn < 0.90) {
                            return 3;
                        } else if (rn < 0.95) {
                            return 4;
                        } else {
                            return 5;
                        }
                        break;
                    case 4:
                        if (rn < 0.95) {
                            return 4;
                        }else {
                            return 5;
                        }
                        break;
                    default:
                        break;
                }
            }
            
        },
        radioClick:function(){
            var self = this;
            $('.sex input').eq(sex).prop("checked",true)


            $('.sex input').on('change',function(){
                console.log($(this).prop("checked"),$(this).val());
                sex = $(this).val();
            });
            
            $('.sex_input_phone').on('input',function(){
                console.log($(this).val());
                phone = $(this).val();
            });
            $(".submitInput").on('input', function () {
                console.log($(this).val());
                phone2 = $(this).val();
            });
        },
        submitClick:function(){
            var self = this;
            $('.submitButton').on("click",function(){
                if (phone2.length != 11 || phone2[0] != 1) {
                    mui.alert("请输入正确的手机号码", '温馨提示', '我知道了')
                } else {
                    $.post("http://ba.jixuanjk.com/save.php",
                        {
                            openid: openId,
                            phone: phone2,
                            source: '2'

                        },
                        function (result) {
                            console.log(result)
                            if (result == 1) {
                                mui.alert("感谢报名“妈宝”，我们的客服将在3个工作日与您联系开放福利", '温馨提示', '我知道了')
                            } else {
                                mui.alert("系统好像发生了异常", '温馨提示', '我知道了');
                            }
                        });

                }
            })
        },
        scrollToBottom:function(){
            var self = this;

            console.log($(document).height(),$(window).height());
            var doc = $(document).height();
            var win = $(window).height();
            var dis = parseInt(doc - win);

            $('.line,.line_txt').on('click',function(){
                $(window).scrollTop(dis)
            })
        }

    }



    App.init();
})
