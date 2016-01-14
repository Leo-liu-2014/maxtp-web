define(function(require, exports, module){

	var $ = require("jq");
/**
 * 全局公共js文件
 */
	
	/**
	 * 头部文件引入。
	 */ 
	ajaxLoadUserLoginTopPage();
	
	//footer 引入
	if($("#ajaxLoadFooterDiv").length>0){ 
		var type=$("#ajaxLoadFooterDiv").attr('type');
		var params={type:type};
		$.ajax({
	        type : "GET",
	        async : false,
	        url : memberPath+"/common/footer.htm", //实际上访问时产生的地址为: common/footer.htm?callbackfun=jsonpCallback&type=10
	        data : params,
	        cache : false, 
	        dataType : "jsonp",
	        jsonp: "callbackfun",//传递给请求处理程序或页面的，用以获得jsonp回调函数名的参数名(默认为:callback)
	        jsonpCallback:"footerJsonpCallback",
	        success : function(json){
	        	$('#ajaxLoadFooterDiv').html(json.html).show();
	        },
	        error:function(){
	            
	        }
	    });
	}
	

/**
 * 
 * ajax 获取用户的未读私信 未读提醒
 * 
 * 元素标记 unreadinfo="true" unreadname="remindCount"
 * 		  unreadinfo="true" unreadname="messageCount"
 * 
 * @param selector 选择器内容
 * 
 * @return 返回json格式 {code:200,messageCount:0,remindCount:0}
 * 
 * */
function ajaxLoadUserUnreadCountInfo(selector){
	//当前页面已经加载	
	var elements=$(selector);
	if(elements.length<1 || elements.eq(0).data('loaded')){
		return;
	}
	var params={};
	
	$.ajax({
        type : "GET",
        async : true,
        url : memberPath+"/common/user/unread/count.htm",
        data : params,
        cache : false, 
        dataType : "jsonp",
        jsonp: "callbackfun",//传递给请求处理程序或页面的，用以获得jsonp回调函数名的参数名(默认为:callback)
        jsonpCallback:"unreadCountJsonpCallback",
        success : function(data){
        	elements.eq(0).data('loaded',true);
        	
        	var remindCount=data.remindCount>999 ? '999+' : data.remindCount;
        	var messageCount=data.messageCount>999 ? '999+' : data.messageCount;     	
        	elements.each(function(i){
        		var _this=$(this);
        		if(_this.attr('unreadname')=='remindCount'){
        			_this.text(remindCount);
        		}else if(_this.attr('unreadname')=='messageCount'){
        			_this.text(messageCount);
        		}
        	});
        },
        error:function(){
            
        }
    });

}

function ajaxLoadUserLoginTopPage(){
	if(jQuery("#userLoginTopPage").length>0){ 
		var dispalyUserInfo=jQuery("#userLoginTopPage").attr('dispalyUserInfo')=='false'?'false':'true';
		//添加_token fixed IE cache issue 226
		jQuery("#userLoginTopPage").load(basePath+"/user/top.htm?dispalyUserInfo="+dispalyUserInfo+"&_token"+new Date().getTime()).show(); 
	}
}
});