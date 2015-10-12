
define(function(require,exports,module){

	var $ = require("jq");

	var newCommon = require("../common/MaxTp.lert.js");

	module.exports = {
		/**
		 * 弹出提示，刷新页面
		 * @param msg
		 */	
		alertReturnMsgReload : function(msg){
			newCommon.lert('alway',{ 
					 title:"温馨提示",
					 content:msg,
					 del:true,
					 okval:"确认",
					 ok:function(){
						 location.reload(true);
					 }
				});
		},
		/**
		 * 弹出提示，不刷新页面
		 * @param msg
		 */
		alertReturnMsg : function (msg){
				newCommon.lert('alway',{ 
					 title:"温馨提示",
					 content:msg,
					 del:true,
					 okval:"确认",
					 ok:function(){ 
					 }
				});
		},
		/**
		 * 弹出层
		 * @param msg
		 */
		alertMsg : function (msg){
			common.lert('alway',{
				 bgcolor:'bggreen',
				 title:"温馨提示",
				 content:msg
			});
		},
		/**
		 * 弹出提示框，完成后回调指定的方法
		 * @param msg
		 * @param param 回调方法的参数
		 * @param func
		 */
		alertReturnMsgByFunction : function (msg,param,func){
			newCommon.lert('alway',{ 
				 title:"温馨提示",
				 content:msg,
				 del:true,
				 okval:"确认",
				 ok:function(){ 
					 func(param);
				 }
			});
		},
		/**
		 * 弹出提示框，完成后回调指定的方法
		 * 带有取消按钮
		 * @param msg
		 * @param param 回调方法的参数
		 * @param func
		 */
		alertMsgCancleByFunction : function (msg,param,func){
			newCommon.lert('alway',{ 
				 title:"温馨提示",
				 content:msg,
				 del:true,
				 okval:"确认",
				 noval : "取消",
				 ok:function(){ 
					 func(param);
				 }
			});
		},
		/**
		 * 弹出提示，返回上个页面
		 * @param msg
		 */
		alertHistoryMsg : function (msg){
			newCommon.lert('alway',{ 
					 title:"温馨提示",
					 content:msg,
					 del:true,
					 okval:"确认",
					 ok:function(){ 
						 history.go(-1);
						 location.reload();
					 }
				});
		},
		/**
		 * 刷新指定页面
		 * @param url
		 */
		locationReload : function (url){
			if(url==null){
				location.reload(true);//刷新当前页面
			}else{
				window.location.href=url;
			} 
		}

}
	


});
