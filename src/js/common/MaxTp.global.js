define(function(require, exports, module){

	var $ = require("jq");
/**
 * 全局公共js文件
 */
$(function(){
	/**
	 * 头部文件引入。
	 */ 
	if($("#maxtpLoginTopPage").length>0){ 
		var dispalyMaxtpUserInfo=$("#maxtpLoginTopPage").attr('dispalyMaxtpUserInfo')=='false'?'false':'true';

		$("#maxtpLoginTopPage").load(thisPath+"/login/top.htm?dispalyMaxtpUserInfo="+dispalyMaxtpUserInfo,function(data){
			if($("#maxtpLoginTopPage").attr('topModuleName')!=''){	
				$('#topModuleName').html($("#maxtpLoginTopPage").attr('topModuleName'))
			}else{
				$('#topModuleName').remove();
			}
		}).show(); 
	}
	/**
	 * ajax请求未登录跳转到登陆首页
	 */
	$.ajaxSetup({
	    complete:function(XMLHttpRequest,textStatus){
	          if(textStatus=="parsererror"){
	               window.location.href = thisPath + "/login.htm";
	          }
	    }
	});
});


module.exports = {


	//限制长度
		verifyLen : function (lue,len) {
			var test = lue.value;
			var maxLen = parseInt(len);
			if (test.length > maxLen) {
				$(lue).val(test.substring(0, maxLen)); 
			}
		},

		//限制只能输入数字 长度限制
		limitVal : function (val,len){
			val.value=val.value.replace(/\D/g,'') 
			verifyLen(val,len);
		}





}



});