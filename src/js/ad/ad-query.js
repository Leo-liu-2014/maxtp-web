/*
 * maxtp 广告展示
 * 根据前台传入数据来自动生成dom;
 * 根据页面私有属性adSource=ad 来遍历广告位置
 * 前台传入参数描述{"广告位置编号":code,"发布广告类型":adtype,"页面广告类型","adtype"}
 * by liu   2015/12/27
*/

var MaxtpAdShow = (function(){

    //获取广告类型
    var __type = function(codes,showtype,that){

        //console.log(codes);
        for(i in showtype){
            if(showtype[i] == "01"){
               that.createSlider(i);
            }
            if(showtype[i] == "02"){
               
               that.createSimpleImg(i);
            }
            if(showtype[i] == "03"){
               
               that.createText(i);
            }
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

        //初始化加载所需数据和dom节点
        this.jsonData = config.data;
        this.codes = config.codes;
        this.showtype = config.showtype;
        this.render();
        return this;
    };

    MaxtpAdShowFun.prototype.render = function() {

        __type(this.codes,this.showtype,this);
    };
    MaxtpAdShowFun.prototype.eachSlide = function(key){

        this.createSlider(this.jsonData.slider[i],i);
    };

    MaxtpAdShowFun.prototype.createSlider = function(key,i){

        var slider           = this.jsonData[key],
            sliderData       = this.jsonData[key].data,
            sliderDom        = "<div class='n_js top15'>",
            sliderWarpNext   = "",
            sliderDomList    = "<div class='righthd' ad-source='maxtpSlide'><div class='buyImg'>",
            sliderDomListImg = "<ul class='inBox'>",
            titlecounter     = "<h2>"+slider.titlecounter+"</h2>";

        if(slider.titlecounter == ""){

            titlecounter = ""
        }

        var newSliderUrl =   sliderData.urls.split("|"),
            newSliderLinks = sliderData.links.split("|"),
            newSliderIds =   sliderData.ids.split("|"),
            newSliderTitles = sliderData.titles.split("|");

        for(var p = 0 ; p< newSliderUrl.length;p++){

            sliderDomListImg+="<li><a href='"+newSliderLinks[p]+"' title='"+newSliderTitles[p]+"'><img src='"+newSliderUrl[p]+"' id='"+newSliderIds[p]+"' alt='"+newSliderTitles[p]+"'></a></li>"
        }

        var sliderController = $("div[code='"+this.codes[key]+"']");

        sliderController.html(sliderDom + titlecounter + sliderDomList + sliderDomListImg);

        var sliderControllerItem = sliderController.find(".righthd");

        //执行轮播效果
        __maxtpSlideImg(sliderControllerItem,slider.timer,'2');
        //this.adDom.append(sliderDom+h2Title+sliderDomList+sliderDomListImg);
        
    };

    MaxtpAdShowFun.prototype.createSimpleImg = function(key) {

        var simpleImgDom = "<div class='n_js top15'>",
            simpleImg = this.jsonData[key],
            simpleImgData  = this.jsonData[key].data,
            titlecounter = "<h2>"+simpleImg.titlecounter+"</h2>",
            simpleimgDomCounter = "<a href='"+simpleImgData.links+"'><img src='"+simpleImgData.urls+"' id='"+simpleImgData.ids+" '></a>";

        if(simpleImg.titlecounter == ""){

            simpleimgDomCounter = "<a href='"+simpleImgData.links+"'><img src='"+simpleImgData.urls+"' id='"+simpleImgData.ids+"'></a>";

            $("div[code='"+this.codes[key]+"']").html(simpleimgDomCounter);
            return
        }

        $("div[code='"+this.codes[key]+"']").html(titlecounter + simpleimgDomCounter);
    };

    MaxtpAdShowFun.prototype.createText = function(key) {

        var adText = this.jsonData[key],
            adTextData  = this.jsonData[key].data,
            textDom = "<a href='"+adTextData.links+"' id='"+adTextData.ids+"' >"+adTextData.urls+"</a>";

        $("div[code='"+this.codes[key]+"']").html(textDom);
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
        codes = '',
        adtype = adcounterDom.attr("adtype"),
        adShowtype = adcounterDom.attr("showtype"),
        adcounterDomArray = [],
        adtypeDomArray = [],
        adshowDomArray = [];

        for(var i = 0; i < adcounterDom.length; i ++){
            
            codes = $("div[adSource]").eq(i).attr("code");
            showtype = $("div[showtype]").eq(i).attr("showtype");
            adtype = $("div[adSource]").eq(i).attr("adtype");

            adcounterDomArray.push(codes);
            adshowDomArray.push(showtype);
            adtypeDomArray.push(adtype);
        }
        
        adcounterDomArrayStr = adcounterDomArray.toString().replace(/,/g,"|");
        adshowDomArrayStr   =  adshowDomArray.toString().replace(/,/g,"|");
        adtypeDomArrayStr   =  adtypeDomArray.toString().replace(/,/g,"|");

        //数据格式
        //var param = "code=02010101|02010201|02010301|02010302|02010303|02010304|02010305|02010306&adtype=01&showtype=01|01|02|02|02|02|02|02";
        
        var url;
        if(typeof memberPath == "undefined" ||typeof memberPath == undefined ){
            
            url=window.location.host;
        }
        if(typeof basePath == "undefined" ||typeof memberPath == undefined ){
            url=window.location.host;
        }
        else{

            url =memberPath;
        }

        $.ajax({
            url : url + "/common/advertShow.json?",
            dataType : "jsonp",
            jsonp:'callback',  
            data : {code : adcounterDomArrayStr,adtype:adtypeDomArrayStr,showtype:adshowDomArrayStr},
            success : function(result){
                
                new MaxtpAdShow().init({data:result,codes: adcounterDomArray,showtype:adshowDomArray});
                //页面跟踪
                piwikInitAdEventFn();
            }
        });
})


/**
 * 添加piwik页面跟踪属性
 */

function piwikInitAdBeforeFn(){
    try{
        var adcounterDom = $("div[adSource]");
        var codes="";
          for(var i = 0; i < adcounterDom.length; i ++){
             codes = codes+$("div[adSource]").eq(i).attr("code");       
             if(i<adcounterDom.length-1){
                 codes+="_";
             }
          }
        if(!(typeof(codes) == "undefined" || codes=="")){
            _paq.push(['setCustomVariable',5,'maxtp_ad_page',codes,'page']);
        }
    }catch(err){
        console.log(err);
    }
}
/**
 * 广告点击
 */
function piwikInitAdEventFn(){
    try{
        $("div[adSource] a img").bind('click',function(){
            var id=$(this).attr('id');
            var code=$(this).parents("div[adSource]").first().attr("code");
            if(!(typeof(id) == "undefined" || typeof(code)=="undefined" || id=='' || code=='')){
                _paq.push(['trackEvent', 'maxtp_ad', code, id]);
            }           
        });     
    }catch(err){
        console.log(err);
    }
    
}
