define(function(require, exports, module){

	//初始化jquery

	//var $ = require("jq");


	
	// function GetQueryString(name)
	// {
	//      var reg = new RegExp("(^|&)"+ name +"([^&]*)(&|$)");
	//      var r = window.location.search.substr(1).match(reg);
	//      if(r!=null)return  unescape(r[2]); return null;
	// }

	//完整依赖

	var commonTest = require("../common/MaxTp.test.js");

	//commonTest.testagain("测试require");

	$("input").unbind("click").bind("click",function(){
		 window.location.reload()
	});

	function lookLink(btn,parent,inputLink){
		var url = $(btn).parents(parent).find(inputLink).val();
		if(tyurl(url)){
		  $(btn).attr("href",url)[0].click().unbind("click");
		}else{
		  $(btn).attr("href","http://"+url)[0].click();
		}
	}

	//加载弹出框
	require.async('../common/MaxTp.lert.js',function(common){
		common.lert("click", {
			obj : ".pass",
			del : true,
			okval : "确认",
			noval : "取消",
			content : "点击确认后，请先核对赠送的信息是否正确<br/>确认后将无法取消！",
			ok : function(b, o) {
				$.ajax({
					url : basePath + "/accountcenter/donate/launch.htm",
					type : "post", //请求类型
					async : false,//默认true异步请求 ，false同步请求
					data: '${accountDonateDtoJson}',
					contentType : 'application/json;charset=utf-8',
					dataType: 'json',
					success : function(data) {
						if (data.message == "ok") {
							$("#brandJson").val(JSON.stringify(data.brandJson));
							$("#accountDonateDtoJsons").val(JSON.stringify(data.accountDonateDtos));
							//alert(43);
							//console.log(data.accountDonateDtos);
							//alert(JSON.stringify(data.accountDonateDtos));
							$("#forms").submit();		
						}else if(data.message == "error"){//当前账户余额不足。不能进行赠送操作
							//window.location.href=basePath + "/accountcenter/donate/forwordError.htm?";
							//alert("赠送项目的数量不足，无法执行此操作");
							newCommon.lert("alway", {
								del : true,
								content : "赠送项目的数量不足，无法执行此操作",
								ok : function(b, o) {
								
								}
							})

						}else{
							newCommon.lert("alway", {
								del : true,
								content : "程序异常",
								ok : function(b, o) {
								
								}
							})
						}
					}
				});
			}
		});

	});
	
	
	var demo = function demo (str){
			alert(str);
	}

	exports.a = demo;

	//左侧导航
	require.async('../common/MaxTp.leftnav.js',function(common){
		common.leftNav("thisDom");
	});

	//分页
	require.async('../common/MaxTp.page.js',function(page){
		page.getPagehtml("#111",'111','222','444');
	});

	//popup
	require.async('../common/MaxTp.popup.js',function(popup){
		//popup.popStatus();
	});

	//alert
	var commonAlert = require("../common/MaxTp.alert.js");

	//commonAlert.alertReturnMsg("表达错误");


	//加载头部

	require("../common/MaxTp.global.js");


});