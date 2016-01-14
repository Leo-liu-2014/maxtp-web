/*
 * maxtp 广告展示
   2015/12/27

*/

var MaxtpAdShow = (function(){

    //获取广告类型
    var __type = function(types,that){


        if(types == "slider"){
           
           that.eachSlide();
           return;
        }
        if(types == "simpleimg"){
           
           that.createSimpleImg();
            return;
        }
        if(types == "text"){
           
           that.createText();
            return;
        }
    }; 

    var __maxtpSlideImg = function(jQuery, time, type, bgcolor) {
            
            var o = $(jQuery), t = time > 2000 ? time : 2000, speed = 650, arr = bgcolor ? bgcolor : [''], banner = 'false', st;
            var prev_next_btn = '<a href="javascript:;" class="btn_prev" id="btn_prev"></a><a href="javascript:;" class="btn_next" id="btn_next"></a> ';
            var flicking_begin_1 = '<div class="flicking_inner"><div class="btn_area">';
            var flicking_begin_2 = '<div class="tabBtn"><div class="tabBtn_area">';
            var flicking_end = '</div></div>';
            var flicking_inner_first = '<a class="on" href="javascript:;"></a> ';
            var flicking_inner = '<a href="javascript:;"></a>';
            var ww;      //window's width
            var btndelaytime = 0;
            if (type == '1' || type == 1) { banner = 'true'; }
            if (o.length == 0) {
                var warn = "Please use available parameters.\n" +
                                    "In the function: \n" +
                                    "\"maxtpSlideImg(\"" + jQuery + "\", " + time + ", " + type + (bgcolor ? (", " + bgcolor) : "") + ");\"";
                console.warn(warn);
            } else {
                if (o.find('li').length > 0) {
                    o.find('li').each(function (i) {
                        if (arr[i]) $(this).css({ 'background': arr[i] });
                        if (i > 0) $(this).css({ 'left': $(this).width(), 'display': 'none' });
                    })
                }
                if (o) {
                    var index = 0;
                    addFlickingInner(o, type, index);
                    var flick = $(o.find('div.tabBtn').find('a'));
                    if (banner == 'true') {
                        flick = $(o.find('div.flicking_inner')).find('a');
                        if ($(o.find('li')).length > 1) {
                            addPrevNextBtn(o);
                        }
                    }
                    play();
                    flick.each(function () {
                        $(this).bind('click', function () {
                            if (btndelaytime == 0) {
                                clearInterval(st);
                                btndelaytime++;
                                if ($(this).index() < index) {
                                    index = $(this).index();
                                    jumpPlay(-1);
                                } else if ($(this).index() > index) {
                                    index = $(this).index();
                                    jumpPlay(1);
                                } else if ($(this).index() == index) {
                                    play();
                                }
                                var bdt = setTimeout(function () {
                                    btndelaytime = 0;
                                }, speed);
                            }

                        })
                    })
                    if (o.find('.btn_prev').length > 0 && o.find('.btn_next').length > 0) {
                        prevNext($(o.find('.btn_prev')), -1, o.find('li').length);
                        prevNext($(o.find('.btn_next')), 1, o.find('li').length);
                    }
                }
            }
            function prevNext(btn, n, len) {     //绑定左右切换按钮事件
                btn.unbind('click').bind('click', function () {
                    if (btndelaytime == 0) {
                        clearInterval(st);
                        btndelaytime++;
                        index += n;
                        if (index < 0) index = len - 1;
                        if (index == len) index = 0;
                        jumpPlay(n);
                        var bdt = setTimeout(function () {
                            btndelaytime = 0;
                        }, speed);
                    }

                });
            }
            function addFlickingInner(o, type, n) {       //添加圆点按钮
                var html;
                var len = o.find('li').length;
                if (len > 1) {
                    html = flicking_begin_1;
                    if (banner == 'false') { html = flicking_begin_2; }
                    for (var i = 0; i < len; i++) {
                        if (n == i) {
                            html += flicking_inner_first;
                        } else {
                            html += flicking_inner;
                        }
                    }
                    html += flicking_end;
                    o.append(html);
                }
            }
            function addPrevNextBtn(o) {              //添加左右切换按钮
                o.find('div.ad_image').append(prev_next_btn);
                $(o).hover(function () {
                    o.find('.btn_prev').show();
                    o.find('.btn_next').show();
                }, function () {
                    o.find('.btn_prev').hide();
                    o.find('.btn_next').hide();
                })
            }
            function play() {     
                //轮播
                st = setInterval(function () {
                    btndelaytime++;
                    index++;
                    if (index == o.find('li').length) index = 0;
                    $(o.find('li')[index]).show().animate({ left: '0' }, speed);
                    $(o.find('li')[index]).siblings('li').animate({ left: '-' + ww + 'px' }, speed, function () {
                        $(o.find('li')[index]).siblings('li').hide().css({ 'left': ww + 'px' });
                        btndelaytime = 0;
                    });
                    $(flick[index]).addClass('on').siblings().removeClass('on');

                    //添加轮播图图片预加载判断   lxj
                    initSlideImgSource(index);

                }, t);
            }
            function jumpPlay(n) {  //轮播跳转
                clearInterval(st);
                if (n > 0) {
                    $(o.find('li')[index]).show().animate({ left: '0px' }, speed);
                    $(o.find('li')[index]).siblings('li').animate({ left: '-' + ww + 'px' }, speed, function () {
                        $(o.find('li')[index]).siblings('li').hide().css({ 'left': ww + 'px' });
                    });
                    $(flick[index]).addClass('on').siblings().removeClass('on');
                    play();
                } else {
                    $(o.find('li')[index]).show().css({ 'left': '-' + ww + 'px' }).animate({ left: '0px' }, speed);
                    $(o.find('li')[index]).siblings('li').animate({ left: ww + 'px' }, speed, function () {
                        $(o.find('li')[index]).siblings('li').hide().css({ 'left': ww + 'px' });
                    });
                    $(flick[index]).addClass('on').siblings().removeClass('on');
                    play();
                }
                //添加轮播图图片预加载判断   lxj
                initSlideImgSource(index);

            }
            $(window).resize(function () {
                ww = $(o.find('li')).width();
                $(o.find('li')).each(function (i) {
                    if ($(this).css('display') == 'none') {
                        $(this).css({
                            'left': ww
                        })
                    }
                });
                initSlideImgSource();
            })
            $(window).resize();

            //初始化加载第一张轮播图 lxj 11/24
            function initSlideImgSource(i){
                if (o.attr("slideImgSource") ==""){
                            var slideSourceSrc = $(o.find('li > a')[0]).attr("slide-source");
                            if(!$(o.find('li > a')[0]).data("isloaded")){
                                $(o.find('li > a')[0]).css("backgroundImage",'url('+slideSourceSrc+')').data("isloaded",true);
                            }

                        if(i >= 1){

                            if(!$(o.find('li > a')[i]).data("isloaded")){
                                var slideSourceSrc = $(o.find('li > a')[i]).attr("slide-source");
                                $(o.find('li > a')[i]).css("backgroundImage",'url('+slideSourceSrc+')').data("isloaded",true);
                            }
                        }

                   

                }
            }
        }


    var MaxtpAdShowFun = function(){
        
    };


    MaxtpAdShowFun.prototype.init = function(config){
        this.adDom = $(config.id);
        this.jsonData = config.data;
        this.style = config.style;
        this.types = config.types;
        
        console.log($("div[code = '00003']").html("123123123123"));
        this.render();
        return this;

    };

    MaxtpAdShowFun.prototype.render = function() {

          __type(this.types,this);

    };
    MaxtpAdShowFun.prototype.eachSlide = function(){
        for(i in this.jsonData.slider){

           this.createSlider(this.jsonData.slider[i],i);

        }


    };

    MaxtpAdShowFun.prototype.createSlider = function(slider,i){

        var sliderDom = "<div class='n_js top15'>";
        var sliderWarpNext = ""
        var sliderDomList = "<div class='righthd' id='maxtpSlide"+i+"' ad-source='maxtpSlide'><div class='buyImg'>";
        var sliderDomListImg = "<ul class='inBox'>";

        var h2Title = "<h2>"+slider.h2title+"</h2>";

        if(slider.h2title == ""){

            h2Title = ""
        }

        this.newSliderSrc =  slider.imgsrc.split("|");
        this.newSliderLinks = slider.links.split("|");
        this.newSliderTitle = slider.titles.split("|");

        for(var p = 0 ; p<this.newSliderSrc.length;p++){
            sliderDomListImg+="<li><a href='"+this.newSliderLinks[p]+"' title='"+this.newSliderTitle[p]+"'><img src='"+this.newSliderSrc[p]+"' alt='"+this.newSliderTitle[p]+"'></a></li>"
        }

        this.adDom.append(sliderDom+h2Title+sliderDomList+sliderDomListImg);
        
        
    };

    MaxtpAdShowFun.prototype.createSimpleImg = function() {
        var sliderDom = "<div class='n_js top15'>";

        var sliderDomListImg = '';

        for(i in  this.jsonData.simpleimg){

          if(this.jsonData.simpleimg[i].h2title == ""){

            sliderDomListImg +='<div class="'+this.style.class+'"><a href="'+this.jsonData.simpleimg[i].link+'"><img src="'+this.jsonData.simpleimg[i].src+'" /></a></div>';
          }
          else{
            sliderDomListImg +='<h2>'+this.jsonData.simpleimg[i].h2title+'</h2><a href="javascript:;"><img src="'+this.jsonData.simpleimg[i].src+'"></a></div>';
          }
        }


        this.adDom.append(sliderDom+sliderDomListImg);
    };

    MaxtpAdShowFun.prototype.createText = function(data) {

        var textDom = '';
        for(i in  this.jsonData.text){
            textDom +='<a href="'+this.jsonData.text[i].link+'" target="_blank">'+this.jsonData.text[i].text+'</a>';
          
          
        }

        this.adDom.append(textDom);
    };

    MaxtpAdShowFun.prototype.destroy = function(){

        this.sliderNum = $("div[ad-source]").length;

        for(var i = 0; i < this.sliderNum; i ++){

          __maxtpSlideImg("#maxtpSlide"+i+"",'3000','2');
        }
    };

    return MaxtpAdShowFun;

})();


$(function(){

    var adcounterDom = $("div[adSource]"),
        //codes = adcounterDom.attr("code"),
        adtype = adcounterDom.attr("adtype"),
        adShowtype = adcounterDom.attr("showtype");

        var adcounterDomArray = [];
        for(var i = 0; i < adcounterDom.length; i ++){
            
            var codes = $("div[adSource]").eq(i).attr("code");

            adcounterDomArray.push(codes);
        }
        // $.ajax({
        //     url : "",
        //     type :  "jsonp",
        //     data : {code : codes,adtype: adtype,showtype: showtype},
        //     callback function(data){
        //         console.log(data);
        //     }
        // });


    new MaxtpAdShow().init({idcodes:"#MaxtpAd",data:maxtpAdcounter,codes: adcounterDomArray});
    //new MaxtpAdShow().init({id:"#MaxtpAdds",data:maxtpAdcounter,style:"aa"});


})