'use strict'
/*
 * maxtp loginin
	 2015/12/28
*/


var maxtpLogin = (function(){

	var __verification = {

			isMobile : function(value) {
					return (/^(?:13\d|15\d|18\d|14\d|17\d)-?\d{5}(\d{3}|\*{3})$/.test(value));
			},

			isPassword : function(value) {

				 if(value.length < 6){
						return true
					}
			},

			isCheckCode : function(value) {
				//console.log(value);
				var result = false;
				$.ajax({
					url : memberPath + "/image/getCode.json",
					type : "get",
					async : false,
					dataType : "json",
					success : function(data) {
						//console.log(data.code);
						value = value.toLowerCase();
						if (value === data.code) {
							result = true
						}
					}
				});

				return result;				 
			},

			Trim : function() {
				var m = this.match(/^\s*(\S+(\s+\S+)*)\s*$/);
				return (m == null) ? "" : m[1];
			}

	};

	var __showErrorMessage = function(str,that) {
			var par = $(that).parent().find(".Prompt");

			par.show();

			par.html("<i class='mistake'></i>"+str).removeClass("green").addClass("yellow");

			$(that).parent().addClass("oncaps").removeClass("ongreen");

			//$(that).focus();
	};

	var __inputSuccess = function(that) {

			var par = $(that).parent().find(".Prompt");

			par.hide();
			$(that).parent().removeClass("oncaps ongreen");
	};

	var __showOkMessage = function(str,that) {

			var par = $(that).parent().find(".Prompt");

			par.show();

			par.html(str).removeClass("yellow").addClass("green");

			$(that).parent().removeClass("oncaps").addClass("ongreen")
	};

	var __remberUserData = function(that) {

			//记住用户名或者密码
		  var val_uu = $("#hide_uu").val();
			var val_up = $("#hide_up").val();
			if(val_uu !="" && val_uu != null){
				$.ajax({
					url : memberPath+"/user/rem.json",
					type : "get",
					async : false,
					dataType : "json",
					data:{uu:val_uu,up:val_up},
					success : function(data) {

						that.username.val(data.duu);

						$("#rem_phone").attr("checked",true);
						
						if(val_up !="" && val_up != null){

								that.password.val(data.dup);
								$("#rem_psw").attr("checked",true);
								$("#rem_phone").attr("checked",true);

						}else{

							$("#rem_psw").attr("checked",false);
						}

						//$('input[placeholder]').placeholder();
					}
				});

			}else{

				$("#rem_phone").attr("checked",false);
				//$('input[placeholder]').placeholder();
			}

	};

	var __changeCheckCode = function(that){
			
			$("#changeimage_link").on("click",function(event) {

				$(that.checkcode).val("");
				var src_link = memberPath+'/image/validcode.htm?date='+ new Date().getTime();
				$("#changeimage").attr("src",src_link);

			});

	};

	var __detectCapsLock = function(event){
		      var e = event || window.event,
		          kc = e.keyCode || e.which, // 按键的keyCode
		          isShift = e.shiftKey || (kc == 16 ) || false; // shift键是否按住

		      if (((kc >= 65 && kc <= 90) && !isShift) || ((kc >= 97 && kc <= 122) && isShift)) {
		      	 console.log(kc);
		          $(".capsLock").show();
		      }
		      else {
		          $(".capsLock").hide();
		      }
		}

	var __enter = function(that,event) {

			$("input[keydown=enter]").on("keypress",function(e){ 
					var curKey = e.keyCode || e.which
					if(curKey == 13){

						that.checkFormSubmit();

						return false; 
					}
				});

			$("input[keyup=caplock]").on("keypress",function(e){ 

					__detectCapsLock(e);
			})
			

	};

	__remberTypes = function(user,pwd){

			pwd.on("click",function() {  

					if(this.checked){

						user.prop("checked",true);
						user.attr("disabled",true);
						//如果选中记住密码，则记住账号默认也同时选中

						return;
					}

					user.attr("disabled",false);
					

				}); 

	};

	__setUserNameAndPassword = function(that) {


	};

	__initUserNameAndPassword = function() {

	};

	var maxtpLoginFun = function() {

	};

	maxtpLoginFun.prototype.init = function(maxtpLogin) {
			// 初始化数据
			this.username = $(maxtpLogin.userName);
			this.password = $(maxtpLogin.pwd);
			this.checkcode = $(maxtpLogin.checkcode);
			this.submit = $(maxtpLogin.submit);
			this.remPhone = $("#rem_phone");
			this.remPwd = $("#rem_psw");
			//验证码
			this.needCheckCode = false;
			//记住密码
			this.remberuserdata = false;


			// 初始化用户信息
			__remberUserData(this);
			this.render();
			__enter(this);
			__initUserNameAndPassword();
			__remberTypes(this.remPhone,this.remPwd);
			//__detectCapsLock();
			return this;
	};

	maxtpLoginFun.prototype.render = function(){

			var that = this;

			this.username.on("keyup",function(e){

						// if(!__verification.isMobile(that.username.val())){
						// 	__showErrorMessage("账号有误，请重新输入",this);
						// 	return;
						// }

						 __inputSuccess(this);

			}).focus(function(){
					__showOkMessage("请输入登录手机号",this);

			}).blur(function(){

					if(!__verification.isMobile(that.username.val())){
						__showErrorMessage("账号有误，请重新输入",this);
						return;
					}

					__inputSuccess(this);

			});

			this.password.on("keyup",function(e){

					// if(__verification.isPassword(that.password.val())){
					// 	__showErrorMessage("密码错误，请重新输入",this);
					// 	return;
					// }
					__inputSuccess(this);


			}).focus(function(){
					__showOkMessage("请输入登录密码",this);

			}).blur(function(){

					if(__verification.isPassword(that.password.val())){
						__showErrorMessage("密码错误，请重新输入",this);
						return;
					}

					__inputSuccess(this);

			});

			this.checkcode.focus(function(){ 
					__showOkMessage("请输入验证码",this);

			}).blur(function(){

					if(!__verification.isCheckCode(that.checkcode.val())){
						__showErrorMessage("验证码错误，请重新输入",this);
						return;
					}

					__inputSuccess(this);

			});


			this.submit.on("click",function(){

					that.checkFormSubmit(this);

			});


	};
 
	 maxtpLoginFun.prototype.checkFormSubmit = function(dom){


					if($(dom).hasClass("dis")){
						 return;
					}

					if(!__verification.isMobile(this.username.val())){
						__showErrorMessage("账号有误，请重新输入",this.username);
						return;
					}

					if(__verification.isPassword(this.password.val())){
						__showErrorMessage("密码错误，请重新输入",this.password);
						return;
					}
					
					if(this.needCheckCode){
						__changeCheckCode(this);

						if(!__verification.isCheckCode(this.checkcode.val())){
							__showErrorMessage("验证码错误，请重新输入",this.checkcode);
							return;
						}
					}

					//浏览器验证成功
					this.loginDataSubmit();
					//__setUserNameAndPassword(that);
	 }

	maxtpLoginFun.prototype.disabledLogin = function(){

			$(this.submit).addClass("dis").html("正在登录……");

	};

	maxtpLoginFun.prototype.freedLogin = function(){

			$(this.submit).removeClass("dis").html("登 录");

	};

	maxtpLoginFun.prototype.loginDataSubmit = function() {

			this.disabledLogin();
			this.ajaxMsg();

	};

	maxtpLoginFun.prototype.setPasswordClean = function() {

			this.password.val("");

	};
	maxtpLoginFun.prototype.ajaxMsg = function() {

				var phone = this.username.val(),
						password = this.password.val(),
						code = this.checkcode.val(),
						that = this,
						rempwd = $("#rem_psw").is(":checked")?"1":"0",
						remusername = $("#rem_phone").is(":checked")?"1":"0";
				
				$.ajax({
		        url:memberPath+"/user/ajaxlogin.jsonp",  
		        dataType:'jsonp',  
		        data:{phone : phone,password: password,checkbox_phone:remusername,checkbox_autoLogin:rempwd,code:code}, 
		        jsonp:'callbackfun',  
		        timeout : 30000,
		        error : function(xml,timery,z){
		        	alert("服务器请求超时，请重新登录！");
		        	that.freedLogin();
		        },
		        success:function(result) {

		        		// 释放点击事件
		        		that.freedLogin();
		        		
		        		if(result.inputErrorNum >=3){
		        				$("#validCodeDiv").show();
		        				that.needCheckCode = true;
		        				__changeCheckCode(that);
		        				//return;
		        		}

		        		if(result.code == 101){
		        			__showErrorMessage("<i class='mistake'></i>请输入手机号",that.username);
		        			return;
		        		}
		        		if(result.code == 102){
		        			__showErrorMessage("<i class='mistake'></i>请输入密码",that.password);
		        			return;
		        		}
		        		if(result.code == 103){
		        			__showErrorMessage("<i class='mistake'></i>请输入验证码",that.checkcode);
		        			return;
		        		}
		        		if(result.code == 104){
		        			__showErrorMessage("<i class='mistake'></i>验证码不正确",that.checkcode);
		        			return;
		        		}
		        		if(result.code == 201){
		        			__showErrorMessage("<i class='mistake'></i>该账号不存在，点击<a id='errorurl' class='blue' href='/user/regist/pollCode.htm?phone=18612834967'>免费注册</a>？",that.username);
		        			// 清空密码
		        			that.setPasswordClean();
		        			return;
		        		}if(result.code == 202){
		        			__showErrorMessage("<i class='mistake'></i>密码与账号不匹配，请重新输入",that.password);
		        			// 清空密码
		        			that.setPasswordClean();
		        			return;
		        		}if(result.code == 203){
		        			var stopcode = $(that.username).val();
		        			__showErrorMessage('<i class="mistake"></i>该账号违规,被暂停使用,<a id="errorurl" class="green" target="_blank" href="/user/phoneStateByPause.htm?phone='+stopcode+'">查看暂停时间</a>？</p>',that.username);
		        			// 清空密码
		        			that.setPasswordClean();
		        			return;
		        		}if(result.code == 204){
		        			var stopcode = $(that.username).val();
		        			__showErrorMessage('<i class="mistake"></i>提示账号和密码不正确，请重新输入</p>',that.username);
		        			// 清空密码
		        			that.setPasswordClean();
		        			return;
		        		}

		        		var returnUrl= $("#returnUrl").val();
		        		if(typeof(returnUrl)=='undefined' || $.trim(returnUrl)==''){
		        			returnUrl=memberPath;
		        		}
		        		window.location.href=returnUrl;      		
		        }
    		});  


	};


  return maxtpLoginFun;

})();


$(function(){


	document.msCapsLockWarningOff=!0//取消ie10默认的大写打开的样式

	new maxtpLogin().init({userName:"#phoneInput",pwd:"#passwordInput",checkcode:"#safecode",submit:"#loginBtn"});


})