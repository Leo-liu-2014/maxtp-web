
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
;define(function(require, exports, module){

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



});;define(function(require,exports,module){

	var $ = require("jq");

	//左侧菜单模块，传入左侧外层DOM可实现菜单树
	
	module.exports = {

		leftNav : function(id){
				console.log(id);
				$("#"+id+" li").on("click",function(){
					 if($(this).find("div")&&$(this).find("div").css("display")!="none"){
							  $(this).find("div").slideUp()
							  $(this).find("div").prev().find("i").removeClass().addClass("bg2")
					 }else{
						      $(this).find("div").prev().find("i").removeClass().addClass("bg1")
							  $(this).find("div").slideDown()	 
					 }
				})
				$("#"+id+" li").find("div.list").on("click",function(event){
					 event.stopPropagation();
					 $(this).show();
				})
		}
	}
});define(function(require,exports,module){

		var $ = require("jq");


		//初始化icont数据
		var icont = {
		   1:"mistake",
		   2:"misx"
			}
		var icon
		var icontype =function(num){
		   icon = icont[num];
		}


		// 不提供接口的内置popup

		//加载没有冒泡的点击事件
		function truble(json){
			var box =typeof json['box']=='string'?$(json['box']):json['box'];
			box.on('click',function(event){
				event.stopPropagation();
				$(this).show();
			})
			$(document.body).on('click',function(){
			  	 box.hide();
			  })
		}

		function popup(json){
			var element = {
					ShutDownFn:json["DownFn"] || ".close",
					RemoveBox:json['del'] || false,
					write:json['write']||''
			}
			var num = 2;
			while($("#MASK"+num).length>0){num++;}													//设置下标数num
			setwrite(json,1)//设置自定义弹出框html
			$(document.body).append("<div mask='mask' id='MASK"+num+"'></div>"+element['write']);  									//创建遮罩层标签
			
			CreatBox(json,num);
			if(json['mask']!=false){
				layerMask($("#MASK"+num),num).fadeIn(300);
		    }
		    midpos(json,num).fadeIn(300);													    //使弹出内容居中
			WindowScrollSize($("#MASK"+num),num,json);				//跟随滚动条滚动
			ShutDownFn($(json['box']),$("#MASK"+num),element["ShutDownFn"],element['RemoveBox'],json['lastfn'],json['This']);//关闭
			Confirm(json,num,element['RemoveBox']);
			if(json['documentEvent']){
			  truble(json)
			}
		}


		//设置div代码在js中，同等外部调用，样式可自定义设置
		function setwrite(json,step){
			if(json['write']&&step == 1){
				if($(json['box']).length>0){
					$(json['box']).remove();
				}
			}
		}

	 // 验证重复元素，有重复返回true；否则返回false
		function mm(arr){
				var hash = {};
				for(var i in arr) {
					if(hash[arr[i]])
					return true;
					hash[arr[i]] = true;
				}
				return false;
		}

		//生成html

		function CreatBox(json,num){
			var element = {
			     title:json['title'] || "温馨提示",
				 okval:json['okval'] || "确认",
				 noval:json['noval'] || "取消",
				 noval:json['btn'],
				 bgcolor:json["bgcolor"]=="bgyellow"?"bg_box_orange":json["bgcolor"] || 'bg_box_green',
				 conCon:"",
				 btncon:''
			}
			if(json['content']){
				var tit = json['title']=="del"?"":"<h3>"+element['title']+"<span class='close'></span></h3>";
				var boxstyle = json['title']=="del"?"titledel":"";
				for(var i=0;i<json['content'].split('|').length;i++){
					 if(json['liclass']){
						element['conCon']+='<li class="'+json['liclass'][i]+'">'+json['content'].split('|')[i]+'</li>'
					 }else if(json['allclass']){
						 element['conCon']+='<li class="'+json['allclass']+'">'+json['content'].split('|')[i]+'</li>'
					 }else{
						element['conCon']+='<li>'+json['content'].split('|')[i]+'</li>';
					 }
				}
				//通用按钮设置
				if(json['btn']){
					element['btncon'] = "<p class='btnLength'><input type='button' value='确定' class='bg1 leftBtn okBtn'><input type='button' value='取消' class='bg2 rightBtn noBtn'></p>" 
				}else{
					json['okCon']=json['noCon']='';
					function setbtn(a,str,n){
						if(json[a]&&json[a]!=null&&json[a]!="undefined"){
							return json[str] = '<input type="button" class="'+n+'" value="'+json[a]+'">'
						}
					}
					setbtn('okval','okCon','bg1 okBtn')
					setbtn('noval','noCon','bg2 noBtn')
					if(json['okval']||json['noval']){
						element['btncon'] = '<p class="btnLength">'+json['okCon']+json['noCon']+'</p>';
					}
				}
				$(document.body).append("<div id='DialogBox"+num+"' class='pop-box "+boxstyle+" "+element["bgcolor"]+"'>"+tit+"<div class='pop_cont'><ul>"+element["conCon"]+"</ul>"+element['btncon']+"</div></div>");
				json['box']="#DialogBox"+num;
			}
		}

		//计算遮罩层
		function layerMask(mask,num){
				var len = 0.6;
			    var w = Math.max($(document).width(), $(document.body).width());
				var h = Math.max($(document).height(), $(document.body).height());
				return mask.css({
					position:"absolute",
					width: w + "px",
					height:h + 'px',
					background:"#333",
					left:0,
					top:0,
					opacity:0,
					zIndex:100
				}).animate({
					opacity:len
				},500)
		}

		//跟随滚动
		function WindowScrollSize(mask,num,json){
			var element = {
			    	WindowScrollSize:json["scrollSize"]==false?"false":"true"|| "true",
			}
			 if(element['WindowScrollSize']=="true"){
				 $(window).scroll(function(){
					   if ($(json['box']).css("display")=='block'){
							midpos(json,num);
						}
				 });
			 }
			 $(window).resize(function(){
				 if (mask.css("display")=='block'&&json['title']!='del'){
				 	if(json['mask']!=false){
				 		layerMask(mask,num)
				 	}
				 }
				 if ($(json['box']).css("display")=='block'){midpos(json,num);}
			 })
		}

		//关闭弹出层
		function ShutDownFn(box,mask,downName,del,lastfn,attr){
		    box.find(downName).off("click",null);
		    box.find(downName).on("click",function(){
		    	if(typeof lastfn != "function"&&lastfn!=null){
		    		newCommon.lert("alway",{del:true,content:lastfn['content'],okval:lastfn['okval'],noval:lastfn['noval'],down:".close",ok:function(){
		   		    	del?box.remove():box.hide();
						mask.remove();
						lastfn['fn']&&lastfn['fn']()
						box.find(".okBtn").off("click",null);
						box.find(".noBtn").off("click",null);
		   		    }})
				 }else{
					del?box.remove():box.hide();
					mask.remove();
					lastfn&&lastfn();
					box.find(".okBtn").off("click",null);
					box.find(".noBtn").off("click",null);
					//yanxf 针对用户后台签到样式 7天一个周期 是一个周期的是红色否则为灰色圈
					if(attr){
						$(attr).addClass("circle1");	
				 	}
				 }
		   	  	
			})
		}

		//弹出层居中
		function midpos(json,num){
			var result = null
			$(json["box"]).css("position","absolute")
			if(json["follow"]){
				var obj = json["follow"][2]?json["follow"][2]:json["This"];
			    result = $(json["box"]).css({
					 width:"auto",
					 zIndex:120,
					 top:$(obj).offset().top+json["follow"][1],
					 left:$(obj).offset().left+json["follow"][0]
				})
			}else{
				result = $(json["box"]).css({
					 zIndex:120,
					 top:($(window).height() - $(json["box"]).outerHeight()) / 2 + $(document).scrollTop()+ 'px',
					 left:($(window).width() - $(json["box"]).outerWidth()) / 2 +  $(document).scrollLeft()+ 'px'
				})
			}
			return result
		}

		//确定回调函数
		function Confirm(json,num,del){
			var timer = null,
				$index=$(json['This']).index(".addfs");
			
			focusandblur(json["box"],'input[type=text]',1);
			focusandblur(json["box"],'input[type=password]',1);
			focusandblur(json["box"],'textarea',0);
			function focusandblur(box,must,num){
			     $(box+" "+must).each(function(index, element) {
				 	 var obj = $(this).parent().find(".textError");
					 $(this).on("focus",function(){
						 if(!json['onfocus']&&num==1){
							  $(this).parent().addClass("ongreen");
							  obj.removeClass("yellow").addClass("green").html(obj.attr("data-val")).fadeIn(1);
						  }
						 endcount($(this))//获得焦点时提示字符
						 inputCount(this)//按下键盘时提示字符数
					 });
				     $(this).on("blur",function(){
				     	var attr = this;
				     	setTimeout(function(){
					       nomust($(attr),null,json["inputText"])
					    },1)
					 });
			    });
		   }
			
			$(json['box']).find(".serachBtn").off("click",null);
			$(json['box']).find(".serachBtn").on("click",function(){
				      var must = newCommon.must(json["box"]+" .mustVal");//至少上传一张图片
					   var least = newCommon.least(json["box"]+" .mustVal",json['checkImg']);//至少上传一张图片
					   var radio = newCommon.Radioeffect(json["box"]+" .mustVal");//单选验证
					   var sel = newCommon.seleffect(json["box"]+" select.mustVal",json["selText"]);//下拉验证
					  var same = newCommon.password( elem(json["pwd1"]), elem(json["pwd2"]));//再次输入密码 是否一直
					var textPass = newCommon.inputnomust(json["box"],json["inputText"],"input[type=password]");
					   var textArea = newCommon.inputnomust(json["box"],json["inputText"],"textarea");
		 			var textInput = newCommon.inputnomust(json["box"],json["inputText"],"input[type=text]");
				   //yanxf 2015-07-03
				  
				   if(textInput&&textArea&&textPass&&must&&least[0]&&sel&&same){
						//搜索的回调函数
							 	json['searchfn']&&json['searchfn']($(json['box']),$(json['This']));
							 	//json['sear']&&json['sear']($(json['box']),$(json['This']));
							
						
						/*
						yanxf  2015-07-02
						
						if(!json["notoff"]){
							setTimeout(function(){
							 	json['ok']&&json['ok']($(json['box']),$(json['This']),json['obj']);
							 	$("#MASK"+num).remove();
							 	del?$(json['box']).remove():$(json['box']).hide();
							},1)
						 }else{
						 	var lose = function(){
					 			del?$(json['box']).remove():$(json['box']).hide();
					 			$("#MASK"+num).remove()
					 		}
						 	setTimeout(function(){
							 	json['notfn']&&json['notfn']($(json['box']),$(json['This']),lose);
							 	json['ok']&&json['ok']($(json['box']),$(json['This']),lose);
							},1)
						 }
						 */
						 
				   }else{
						newCommon.least(json["box"]+" .mustVal",json['checkImg'],true);
						newCommon.Radioeffect(json["box"]+" .mustVal",true);
						newCommon.seleffect(json["box"]+" .mustVal",json["selText"],true);
						newCommon.password( elem(json["pwd1"]), elem(json["pwd2"]),true);
				   }
				   setTimeout(function(){
				   		$(this).blur();
				   },1)
				  
			})
			//针对品牌铁杆粉丝 页面的确定
			
			$(json['box']).find(".sureBtn").off("click",null);
			$(json['box']).find(".sureBtn").on("click",function(){
				
					var lose = function(){
							del?$(json['box']).remove():$(json['box']).hide();
							$("#MASK"+num).remove()
					}
					
				/*
				yanxf 2015-07-03
				将数据回填
				
				*/
					var $text=$(json['box']).find(".text"),
						$text1=$text.eq(1).find("span").html(),
						$text4=$text.eq(4).find("span").html(),
						$boxImg1=$(".img1").attr("src"),
						$boxImg2=$(".img2").attr("src");
						
						
						//页面
						$olChild=$(".obj1>ol").eq($index),
					 	$imgClass=$olChild.find(".img"),
						$img=$imgClass.find("img"),
						$nickname=$imgClass.find(".txt"),
						$medal=$imgClass.find(".txt1"),
						$fans=$imgClass.find(".txt2"),
						$icon=$olChild.find(".icon"),
						$iconimg=$icon.find("img");
						
						//yanxf 2015-07-03 判断弹出层内容为空 则不回填到页面
						if($("ul#userInfo").children().length!=0){
							
						
						if($text1!=""&&$text4!=""&&$boxImg1!="undefined"&&$boxImg2!="undefined"){
							$img.attr("src",$boxImg1);
							$iconimg.attr("src",$boxImg2);
							$nickname.html($text1);
							$medal.html("品牌勋章："+$text4);
							$fans.html("粉丝："+$text4)
						}
						}
						json['notfn']&&json['notfn']($(json['box']),$(json['This']),lose);
						json['ok']&&json['ok']($(json['box']),$(json['This']),lose);
						lose();	
				
					
				     
				   
				  
			})
			
			
			
			
			
			$(json['box']).find(".okBtn").off("click",null);
			//确认按钮
			$(json['box']).find(".okBtn").on("click",function(){
					
				       var must = newCommon.must(json["box"]+" .mustVal");//至少上传一张图片
					   var least = newCommon.least(json["box"]+" .mustVal",json['checkImg']);//至少上传一张图片
					   var radio = newCommon.Radioeffect(json["box"]+" .mustVal");//单选验证
					   var sel = newCommon.seleffect(json["box"]+" select.mustVal",json["selText"]);//下拉验证
					   var same = newCommon.password( elem(json["pwd1"]), elem(json["pwd2"]));//再次输入密码 是否一直

					   var textPass = newCommon.inputnomust(json["box"],json["inputText"],"input[type=password]");
					   var textArea = newCommon.inputnomust(json["box"],json["inputText"],"textarea");
		 			   var textInput = newCommon.inputnomust(json["box"],json["inputText"],"input[type=text]");
				   if(textInput&&textArea&&textPass&&must&&least[0]&&sel&&same){
						if(!json["notoff"]){
							setTimeout(function(){
							 	json['ok']&&json['ok']($(json['box']),$(json['This']),json['obj']);
								$("#MASK"+num).remove();
							 	del?$(json['box']).remove():$(json['box']).hide();
							},1)
						 }else{
						 	var lose = function(){
					 			del?$(json['box']).remove():$(json['box']).hide();
					 			$("#MASK"+num).remove()
					 		}
						 	setTimeout(function(){
							 	json['notfn']&&json['notfn']($(json['box']),$(json['This']),lose);
							 	json['ok']&&json['ok']($(json['box']),$(json['This']),lose);
							},1)
						 }
						 
				   }else{
						newCommon.least(json["box"]+" .mustVal",json['checkImg'],true);
						newCommon.Radioeffect(json["box"]+" .mustVal",true);
						newCommon.seleffect(json["box"]+" .mustVal",json["selText"],true);
						newCommon.password( elem(json["pwd1"]), elem(json["pwd2"]),true);
				   }
				   setTimeout(function(){
				   		$(this).blur();
				   },1)
				  
			})
			$(json['box']).find(".noBtn").on("click",function(){
				setTimeout(function(){
				 	del?$(json['box']).remove():$(json['box']).hide();
				},1)
			     $("#MASK"+num).remove();
				 json['no']&&json['no']($(json['box']),$(json['This']),json['obj']);
				 $(this).off("click",null);
				 $(json['box']).find(".okBtn").off("click",null);
			})
			if(json['timing']){
				timer = setTimeout(function(){
					del?$(json['box']).remove():$(json['box']).hide();
					$("#MASK"+num).remove();
				},json['timing'])
			}
			
			$(document).keypress(function(e) { 
		       if(e.which == 13) {
		          $(json['box']).find(".okBtn").click(); 
		       } 
		    }); 
		}
		//返回对象类型
		function elem(obj){
			return typeof obj == "object"?obj:$(obj);
		}

		// newCommon 基础验证

		var newCommon = {

				//上传所有图片
				  must:function(imgbox,way){
				      var  result = true
					  $("img.must",imgbox).each(function(index, element) {
						   if($(this).attr('src')==''){
							  var obj = $(this).parents(imgbox).find(".textError")
							  if(way){
						        obj.fadeIn(300);
							    obj.html(obj.attr("data-val"))
							  }
							  result = false
						   }
					  });
					  return result
				   },//至少上传一张图片验证
				    least:function(imgbox,endfn,way){
					  var  result = true,onoff=true,end=true;
					  $(imgbox).each(function(){
					  	 onoff = blurImg(this,endfn,true,way,this)
					  	 if(!onoff){
					  	 	end = onoff
					  	 }
					  })
					  return [end]
				   },
				   //登录注册条件
					  inputnomust:function(capt,endfn,textType,keydown){
						  var onoff = null,num = $(capt+" "+textType).length;
						  $(capt+" "+textType).each(function(index, element) {
				          	   num = nomust($(this),num,endfn)
				          	   if(keydown){
								   $(this).on("keydown",function(){
										 var This = $(this);
										 setTimeout(function(){
											 nomust(This,num,endfn);
										 },1)
								   })
							   }
							   
				          });
						  return num==0?true:false;  
						  
					  },
					  //单选验证
				   Radioeffect:function(imgbox,way){
					   var result = true
					   $(imgbox).each(function(){
						   var attr = this;
						   if($("input[type=radio]",attr).length>0){
							   if($("input[type=radio]:checked",attr).length==0){
									result = false;
									if(way)$('.textError',this).show().html("<i class='"+icon+"'></i>"+$('.textError',this).attr('data-val'));  
							   }else{
									result = true;
									if(way)$('.textError',this).hide();  
							   }
						   }
						   $("input[type=radio]",attr).on("click",function(){
							   result = true;
								if(way)$('.textError',attr).hide();    
						   })
					   })
					  return result
				   },//验证下拉框
				   seleffect:function(obj,endfn,way){
					  var result = true;
					  $(obj).change(function(){
						 selval($(this))
					  })
					  selval($(obj))
					  function selval(obj){
						  $(obj).each(function(index, element) {
							  if($(this).get(0).tagName == "SELECT"){
							  	var tempResult=blurSel($(this),endfn);
							  	if (result) {
							  		result=tempResult;
							  	};
								 // result = blurSel($(this),endfn) 之前李腾的代码
								}
						  });
					  }
					  return result;
				   } ,//密码不一致判断
				   password:function(word1,word2,onoff){
						 var arrAttr = [word1.val(),word2.val()];
						 var txt = word2.parent().find(".textError");
						 var content = "<i class='"+icon+"'></i>两次输入密码不一致";
						 if(onoff){
								 if(word2.val()!=""&&!newCommon.password( word1,word2)){
								 	 setTimeout(function(){
										 txt.removeClass("green").addClass("yellow").html(content).show();
									 },1)
								 }
								 word2.on("blur",function(){
								 	setTimeout(function(){
								 		focusblur($(this))
								 	},1)
								 });
								 word2.on("focus",function(){
									 setTimeout(function(){
								 		focusblur($(this),1)
								 	},1)
								 });
								 word1.on("blur",function(){
								 	setTimeout(function(){
								 		focusblur($(this))
								 	},1)
									 
								 });
								 function focusblur(obj,n){
								     if(!newCommon.password( word1,word2)){
										 if(word2.val()!=""){
											 if(n==1){
											 	 obj.parent().removeClass("ongreen").addClass("oncaps");
											 	 txt.show();
											 }else{
											 	 word2.parent().removeClass("ongreen").addClass("oncaps");
												 txt.removeClass("green").addClass("yellow").html(content).show();
											 }
										 }
									 }else{
									 	if(word2.val()!=""){
									 		if(n==1){
									 			txt.show();
									 		}else{
									 			word2.parent().removeClass("oncaps")
									 		    txt.hide();
									 		}
									 		//txt.hide();
									 	}
									 }
								 }
						 }
						 return mm(arrAttr)
					  }




		};
		//模块借口调用
		module.exports = {
		 //lert模块 用来接收配置
		 lert:function(oEvent,set,endfn){
			set['obj']=typeof set['obj']=="string"?$(set['obj']):set['obj'];
			switch(oEvent){
				case "click":
				  set['obj'].off("click",null)
				  set['obj'].on("click",function(event){
				  	event.stopPropagation();
					  var attr = this;
				      popup({box:set["box"],
					  		 scrollSize:set["scrollSize"],           //参数值：false true  不设置默认是 true跟随滚动条滚动
							 DownFn:set['DownFn'],					 //设置框内关闭元素  任何jq对象元素
							 del:set['del'],						 //参数值：false  隐藏弹出层  默认为true删除层
							 onfocus:set["onfocus"],				 //值:true 禁止获得焦点提示输入框内容  默认为false
							 notoff:set["notoff"],				     //值:true 验证通过 禁止关闭弹出框 通过调用参数执行参数关闭
							 notfn:set['notfn'],
							 title:set['title'],					 //设置弹出框的标题
							 bgcolor:set['bgcolor'],				 //默认绿色  参数等于bgyellow 为橘色
							 content:set['content'],				 //设置弹出框的内容  当这个参数存在时 弹出框默认为自动生成   
							 write:set['write'],				 //设置弹出框的内容  当这个参数存在时 弹出框默认为自动生成   
							 documentEvent:set['documentEvent'],							 
							 liclass:set['class'],					 //给生成的内容列表添加class [class1,class2] 与行数必须对应
							 allclass:set['allclass'],               //给列表的每一个元素添加同样的class 
							 follow:set["follow"],					 //参数：[x,y] 例如[10,-100]  定位弹出框与点击的元素的位置
							 okval:set['okval'],					 //确认按钮设置 例如 参数值:"确认"
							 noval:set['noval'],					 //取消按钮设置 例如 参数值:"取消"
							 ok:set['ok'],							 //确认回调函数 例如ok:function(){}
							 no:set['no'],							 //取消回调函数 例如 no:function(){}
							 sear:set['sear'],
							
							 searchfn:set['searchfn'],
							 defaultfn:set['defaultfn'],
							 
							
							 lastfn:set['lastfn'],					 //关闭按钮回调函数 例如 lastfn:function(){}
							 timing:set['timing'],					 //定时关闭弹出框  参数值:数字  单位 ms （毫秒）例如timing:1000
							 mask:set['mask'],						 //参数值为false时 弹出的提示框没有遮罩层  例如:mask:false
							 inputText:set['inputText'],			 //验证表单参数 
							 checkImg:set['checkImg'],			     //验证图片 
							 btn:set['btn'],						 //参数值:true 显示默认按钮 确定和取消 默认为false不显示
							 obj:set['obj'],						 //所有可点击的元素
							 This:attr								 //当前点击的元素
					  })
					 set['startfn']&&set['startfn'](set["box"],$(attr));
					// set['defaultfn']&&set['defaultfn'](set["box"],$(attr))
				  });
					break;
					case "alway":
					      popup({box:set["box"],
						  		 scrollSize:set["scrollSize"],           
								 DownFn:set['DownFn'],					
								 del:set['del'],						 
								 onfocus:set["onfocus"],
								 notoff:set["notoff"],				     //值:true 禁止获得焦点提示输入框内容  默认为false
								 notfn:set['notfn'],
								 title:set['title'],
								 bgcolor:set['bgcolor'],
								 write:set['write'],			
								 documentEvent:set['documentEvent'],
								 content:set['content'],	 //设置弹出框的内容  当这个参数存在时 弹出框默认为自动生成   
								 liclass:set['class'],
								 allclass:set['allclass'],
								 follow:set["follow"],
								 okval:set['okval'],
								 noval:set['noval'],
								 ok:set['ok'],
								 startfn:set['startfn'],
								 no:set['no'],
								 lastfn:set['lastfn'],
								 timing:set['timing'],
								 mask:set['mask'],
								 inputText:set['inputText'],
								 checkImg:set['checkImg'],			     //验证图片 							 
								 btn:set['btn'],
								 defaultfn:set['defaultfn']
						  })
						 
						   set['defaultfn']&&set['defaultfn'](set["box"]);
					break;
					case "dblclick":
					  set['obj'].off("dblclick",null)
					  set['obj'].on("dblclick",function(event){
					  	event.stopPropagation();
						  var attr = this
					      popup({box:set["box"],
						  		 scrollSize:set["scrollSize"],           //参数值：false true  不设置默认是 true跟随滚动条滚动
								 DownFn:set['DownFn'],					 //设置框内关闭元素  任何jq对象元素
								 del:set['del'],						 //参数值：false  隐藏弹出层  默认为true删除层
								 onfocus:set["onfocus"],				 //值:true 禁止获得焦点提示输入框内容  默认为false
								 notoff:set["notoff"],				     //值:true 禁止获得焦点提示输入框内容  默认为false
								 notfn:set['notfn'],
								 title:set['title'],					 //设置弹出框的标题 
								 bgcolor:set['bgcolor'],				 //默认绿色  参数等于bgyellow 为橘色
								 content:set['content'],				 //设置弹出框的内容  当这个参数存在时 弹出框默认为自动生成   
								 write:set['write'],				 //设置弹出框的内容  当这个参数存在时 弹出框默认为自动生成   
								 documentEvent:set['documentEvent'],							 
								 liclass:set['class'],					 //给生成的内容列表添加class [class1,class2] 与行数必须对应
								 allclass:set['allclass'],               //给列表的每一个元素添加同样的class 
								 follow:set["follow"],					 //参数：[x,y] 例如[10,-100]  定位弹出框与点击的元素的位置
								 okval:set['okval'],					 //确认按钮设置 例如 参数值:"确认"
								 noval:set['noval'],					 //取消按钮设置 例如 参数值:"取消"
								 ok:set['ok'],							 //确认回调函数 例如ok:function(){}
								 no:set['no'],							 //取消回调函数 例如 no:function(){}
								 lastfn:set['lastfn'],					 //关闭按钮回调函数 例如 lastfn:function(){}
								 timing:set['timing'],					 //定时关闭弹出框  参数值:数字  单位 ms （毫秒）例如timing:1000
								 mask:set['mask'],						 //参数值为false时 弹出的提示框没有遮罩层  例如:mask:false
								 inputText:set['inputText'],			 //验证表单参数 
								 btn:set['btn'],						 //参数值:true 显示默认按钮 确定和取消 默认为false不显示
								 obj:set['obj'],						 //所有可点击的元素
								 This:attr								 //当前点击的元素
						  })
						 set['startfn']&&set['startfn'](set["box"],this)
					  });
					break;
					case "show":
					  set['obj'].off("click",null)
					  set['obj'].on("click",function(){
						  var attr = this
					      popup({box:set["box"],
						  		 scrollSize:set["scrollSize"],           
								 DownFn:set['DownFn'],					
								 del:set['del'],						 
								 onfocus:set["onfocus"],			    
								 title:set['title'],					
								 bgcolor:set['bgcolor'],				 
								 content:set['content'],				
								 liclass:set['class'],					 
								 allclass:set['allclass'],				
								 follow:set["follow"],					 
								 okval:set['okval'], 					 
								 noval:set['noval'],				
								 no:set['no'],
								 ok:set['ok'],
								 lastfn:set['lastfn'],
								 timing:set['timing'],
								 mask:set['mask'],
								 inputText:set['inputText'],
								 btn:set['btn'],
								 obj:set['obj'],
								 This:attr
						  })
						  set['startfn']&&set['startfn']()
					  });
					break;
					case "alshow":
					      popup({box:set["box"],
						  		 scrollSize:set["scrollSize"],           
								 DownFn:set['DownFn'],					 
								 del:set['del'],						
								 onfocus:set["onfocus"],
								 title:set['title'],
								 bgcolor:set['bgcolor'],
								 content:set['content'],
								 liclass:set['class'],
								 allclass:set['allclass'],
								 follow:set["follow"],
								 okval:set['okval'],
								 noval:set['noval'],
								 ok:set['ok'],
								 no:set['no'],
								 lastfn:set['lastfn'],
								 timing:set['timing'],
								 mask:set['mask'],
								 inputText:set['inputText'],
								 btn:set['btn']
						  })
					break;
			   }
			}
	   }

});
;define(function(require,exports,module){

var $ = require("jq");

var pageFormId;

	module.exports = {
			/**
			 * 得到分页html
			 */
			getPagehtml : function (form_id,pageNum,totalPage,numPerPage) {
				console.log(form_id,pageNum,totalPage,numPerPage);
				if(totalPage<1){
					return;
				}
				pageFormId = form_id;
				var pageHtml = " <div class=\"yahoo\"> <input type='hidden' id='pagenum' name='pagenum'/> <input type='hidden' id='pagesize' name='pagesize'/>";
				//判断跳转到第一页的控件是否可用
				if(pageNum<=1){
					pageHtml=pageHtml+"<span class='disabled'> &lt; </span>";
				}else{
					pageHtml=pageHtml+"<a href='javascript:void(0);' onclick='goToPage("+((pageNum-1)<1?1:(pageNum-1))+","+numPerPage+")'> &lt; </a>";
				}	 
				if(totalPage<=7){//如果总共只有7页，则全部显示
					for (var i=1;i<=totalPage;i++){		
						if(pageNum==i){
							pageHtml=pageHtml+"&nbsp;<span class='current'>"+i+"</span>";
						}else{
							pageHtml=pageHtml+"&nbsp;<a href='javascript:void(0);' onclick='goToPage("+i+","+numPerPage+")'>"+i+"</a>";
						}			
					}		
				}else if(pageNum<=3){//如果不止7页，且当前页数是3以下
					var maxPage=totalPage>5?5:totalPage;
					for (var i=1;i<=maxPage;i++){		
						if(pageNum==i){
							pageHtml=pageHtml+"&nbsp;<span class='current'>"+i+"</span>";
						}else{
							pageHtml=pageHtml+"&nbsp;<a href='javascript:void(0);' onclick='goToPage("+i+","+numPerPage+")'>"+i+"</a>";
						}			
					}
					pageHtml=pageHtml+"...";
				}else if(pageNum>=4&&pageNum<=5){//如果不止7页，且当前页数是第4页或第5页
					var maxPage=totalPage>(pageNum+2)?(pageNum+2):totalPage;
					for (var i=1;i<=maxPage;i++){		
						if(pageNum==i){
							pageHtml=pageHtml+"&nbsp;<span class='current'>"+i+"</span>";
						}else{
							pageHtml=pageHtml+"&nbsp;<a href='javascript:void(0);' onclick='goToPage("+i+","+numPerPage+")'>"+i+"</a>";
						}			
					}
					pageHtml=pageHtml+"...";
				}else {//如果不止7页，且当前页是6页或以上
					pageHtml=pageHtml+"&nbsp;<a href='javascript:void(0);' onclick='goToPage("+1+","+numPerPage+")'>"+1+"</a>";
					pageHtml=pageHtml+"&nbsp;<a href='javascript:void(0);' onclick='goToPage("+2+","+numPerPage+")'>"+2+"</a>";
					pageHtml=pageHtml+"...";		 
					
					if(pageNum+2<totalPage){//如果当前页以后还有3页或以上，则后面加省略号
						var maxPage=totalPage>(pageNum+2)?(pageNum+2):totalPage;
						for (var i=pageNum-2;i<=maxPage;i++){		
							if(pageNum==i){
								pageHtml=pageHtml+"&nbsp;<span class='current'>"+i+"</span>";
							}else{
								pageHtml=pageHtml+"&nbsp;<a href='javascript:void(0);' onclick='goToPage("+i+","+numPerPage+")'>"+i+"</a>";
							}			
						}	 
						pageHtml=pageHtml+"..."; 			
					}else{//如果当前页已经靠近最后一页前3，则最后5页要全部显示,并不带少略号
						for (var i=totalPage-4;i<=totalPage;i++){		
							if(pageNum==i){
								pageHtml=pageHtml+"&nbsp;<span class='current'>"+i+"</span>";
							}else{
								pageHtml=pageHtml+"&nbsp;<a href='javascript:void(0);' onclick='goToPage("+i+","+numPerPage+")'>"+i+"</a>";
							}			
						}				
					} 
				} 
				//判断最后一页控件是否可用
				if(pageNum>=totalPage){
					pageHtml=pageHtml+"&nbsp;<span class='disabled'> &gt; </span>";
				}else{
					pageHtml=pageHtml+"&nbsp;<a href='javascript:void(0);' onclick='goToPage("+((pageNum+1)>=totalPage?totalPage:(pageNum+1))+","+numPerPage+")'> &gt; </a>";
				} 
				pageHtml=pageHtml+" 共"+totalPage+"页 ,去第 <input type=\"text\" value="+pageNum+" id=\""+form_id+"_enterNum\" >页 ";
					var ss10="";
					var ss20="";
					var ss50="";
					var ss100="";
					if(numPerPage==10){
						ss10="selected='selected'";
					}else if(numPerPage==20){
						ss20="selected='selected'";
					}else if(numPerPage==50){
						ss50="selected='selected'";
					}else if(numPerPage==100){
						ss100="selected='selected'";
					}
					pageHtml=pageHtml+"<select name='pageSizeSelect' id='pageSizeSelect' onchange='goToPage(1,this.value)'><option "+ss10+" value='10'>10/页</option><option "+ss20+" value='20'>20/页</option><option value='50' "+ss50+">50/页</option><option value='100' "+ss100+">100/页</option></select>";		
					pageHtml=pageHtml+ " 	<a class=\"go\" href=\"javascript:jumpTo('"+form_id+"',"+numPerPage+");\">GO</a> " + " </div> ";
				//return pageHtml;
					$("#page_div").html(pageHtml);
				
			},

			jumpTo : function (form_id,numPerPage){

					$("#pagenum").val($("#"+form_id+"_enterNum").val());
					$("#pagesize").val(numPerPage);
					$("#"+pageFormId).submit();
			},

			goToPage : function(pageNum,numPerPage){
				$("#pagenum").val(pageNum);
				$("#pagesize").val(numPerPage);
				$("#"+pageFormId).submit();
			}

	};
});;/**
 * This jQuery plugin displays pagination links inside the selected elements.
 *
 * @author Gabriel Birke (birke *at* d-scribe *dot* de)
 * @version 1.2
 * @param {int} maxentries Number of entries to paginate
 * @param {Object} opts Several options (see README for documentation)
 * @return {Object} jQuery Object
 */
jQuery.fn.pagination = function(maxentries, opts){
	opts = jQuery.extend({
		form_id:'',
		total_page:0,
		items_per_page:20,
		num_display_entries:5,
		current_page:0,
		//disabled
		num_edge_entries:2,
		link_to:'javascript:void(0)',
		prev_text:'<',
		next_text:'>',
		ellipse_text:'.....',
		prev_show_always:true,
		next_show_always:true,
		select_page_size:true,
		show_total_page:true,
		go_page_num:true,
		onload_callback:false,
		callback:function(){return false;}
	},opts||{});
	
	return this.each(function() {
		/**
		 * 计算最大分页显示数目
		 */
		function numPages() {			
			if(opts.total_page>0){
				return opts.total_page;
			}
			opts.total_page=Math.ceil(maxentries/opts.items_per_page);
			return opts.total_page;
		}	
		/**
		 * 极端分页的起始和结束点，这取决于current_page 和 num_display_entries.
		 * @返回 {数组(Array)}
		 */
		function getInterval()  {
			var ne_half = Math.ceil(opts.num_display_entries/2);
			var np = numPages();
			opts.total_page=np;
			var upper_limit = np-opts.num_display_entries;
			var start = current_page>ne_half?Math.max(Math.min(current_page-ne_half, upper_limit), 0):0;
			var end = current_page>ne_half?Math.min(current_page+ne_half, np):Math.min(opts.num_display_entries, np);
			if(end-start>opts.num_display_entries){
				start+=1;
			}
			return [start,end];
		}
		
		/**
		 * 分页链接事件处理函数
		 * @参数 {int} page_id 为新页码
		 */
		function pageSelected(page_id,page_size, evt){
			current_page = page_id;
			drawLinks();
			var continuePropagation = opts.callback(opts.form_id,page_id,page_size, panel);
			if (!continuePropagation) {
				if (evt.stopPropagation) {
					evt.stopPropagation();
				}
				else {
					evt.cancelBubble = true;
				}
			}
			return continuePropagation;
		}
		
		/**
		 * 此函数将分页链接插入到容器元素中
		 */
		function drawLinks() {
			panel.empty();
			//添加容器
			panel.append('<div class="yahoo">');
			var interval = getInterval();
			var np = numPages();
			// 这个辅助函数返回一个处理函数调用有着正确page_id的pageSelected。
			var getClickHandler = function(page_id,page_size) {
				return function(evt){ return pageSelected(page_id,page_size,evt); }
			}
			//辅助函数用来产生一个单链接(如果不是当前页则产生span标签)
			var appendItem = function(page_id, appendopts){
				page_id = page_id<0?0:(page_id<np?page_id:np-1); // 规范page id值
				appendopts = jQuery.extend({text:page_id+1, classes:""}, appendopts||{});
				if(page_id == current_page){
					var lnk = jQuery("<span class='current'>"+(appendopts.text)+"</span>");
				}else{
					var lnk = jQuery("<a>"+(appendopts.text)+"</a>")
						.bind("click", getClickHandler(page_id,opts.items_per_page))
						.attr('href', opts.link_to.replace(/__id__/,page_id));		
				}
				if(appendopts.classes){lnk.addClass(appendopts.classes);}
				if(appendopts.text=='<' || appendopts.text=='>'){
					lnk.removeClass('current');
				}
				panel.append(lnk);
			}
			// 产生"Previous"-链接
			if(opts.prev_text && (current_page > 0 || opts.prev_show_always)){
				appendItem(current_page-1,{text:opts.prev_text, classes:"prev"});
			}else{
				panel.append('<span class="disabled"> '+opts.prev_text+' </span>')
			}
			// 产生起始点
			if (interval[0] > 0 && opts.num_edge_entries > 0)
			{
				var end = Math.min(opts.num_edge_entries, interval[0]);
				for(var i=0; i<end; i++) {
					appendItem(i);
				}
				if(opts.num_edge_entries < interval[0] && opts.ellipse_text)
				{
					//jQuery("<span>"+opts.ellipse_text+"</span>").appendTo(panel);
					panel.append(opts.ellipse_text);
				}
			}
			// 产生内部的些链接
			for(var i=interval[0]; i<interval[1]; i++) {
				appendItem(i);
			}
			//添加最后的...
			if(opts.total_page>5 && current_page+3<opts.total_page){
				panel.append(opts.ellipse_text);
			}
			
			// 产生结束点
			//if (interval[1] < np && opts.num_edge_entries > 0)
			//{
			//	if(np-opts.num_edge_entries > interval[1]&& opts.ellipse_text)
			//	{
			//		jQuery("<span>"+opts.ellipse_text+"</span>").appendTo(panel);
			//	}
			//	var begin = Math.max(np-opts.num_edge_entries, interval[1]);
			//	for(var i=begin; i<np; i++) {
			//		appendItem(i);
			//	}			
			//}
			// 产生 "Next"-链接
			if(opts.next_text && (current_page < np-1 || opts.next_show_always)){
				appendItem(current_page+1,{text:opts.next_text, classes:"next"});
			}else{
				panel.append('<span class="disabled"> '+opts.next_text+' </span>')
			}
			
			//添加总共几页的显示			
			panel.append(' 共'+opts.total_page+'页')
			if(opts.go_page_num){
				panel.append(' ,去第');
				var pagenum=jQuery('<input type="text" paging="pagenum" value="'+(parseInt(current_page)+1)+'">').bind('change',function(){
					var val=$(this).val().replace(/[^\d]/g,'');					
					if(val=='0' || val==''){
						val=parseInt(current_page)+1;
					}
					if(parseInt(val)>opts.total_page){
						val=opts.total_page;
					}
					$(this).val(val);
				})
				panel.append(pagenum);
			}
			//添加选择每页显示条数
			if(opts.select_page_size){
				var options='';				
				options+='<select paging="pagesize">';				
				options+='<option value="10">10/页</option>';
				options+='<option value="20">20/页</option>';
				options+='<option value="50">50/页</option>';
				options+='<option value="100">100/页</option>';
				options+='</select>';				
				var optionsElement=jQuery(options).bind('change',function(evt){
					pageSelected(0,$(this).val(),evt);
				});
				optionsElement.val(opts.items_per_page);
				panel.append(optionsElement);
			}
			//添加Go button
			if(opts.go_page_num || opts.select_page_size){
				var goLink=jQuery('<a class="go" href="'+opts.link_to+'">GO</a>').bind('click',function(evt){					
					var pagenum=$(this).parent().find('input[paging=pagenum]').val();
					if(isNaN(pagenum)){
						pagenum=0;
					}else{
						pagenum=parseInt(pagenum)-1;
					}
					var pagesize=$(this).parent().find('select[paging=pagesize]').val();
					if(pagesize!=opts.items_per_page){
						pagenum=0;
					}
					pageSelected(pagenum,pagesize,evt);
				});
				panel.append(goLink);
			}
			//关闭div
			panel.append('</div>');
		}
		
		//从选项中提取current_page		
		var current_page = opts.current_page;
		//创建一个显示条数和每页显示条数值
		maxentries = (!maxentries || maxentries < 0)?1:maxentries;
		opts.items_per_page = (!opts.items_per_page || opts.items_per_page < 0)?1:opts.items_per_page;
		//添加额外的节点
		jQuery(this).html('<div class="yahoo"></div>');
		//存储DOM元素，以方便从所有的内部结构中获取		
		var panel = jQuery(this).find('div.yahoo');
		// 获得附加功能的元素
		this.selectPage = function(page_id){ pageSelected(page_id);}
		this.prevPage = function(){ 
			if (current_page > 0) {
				pageSelected(current_page - 1,opts.items_per_page);
				return true;
			}
			else {
				return false;
			}
		}
		this.nextPage = function(){ 
			if(current_page < numPages()-1) {
				pageSelected(current_page+1,opts.items_per_page);
				return true;
			}
			else {
				return false;
			}
		}
		//所有初始化完成，绘制链接
		if(!(opts.total_page==0 && maxentries==0)){
			drawLinks();
		}		
        // 回调函数
		if(opts.onload_callback){
			opts.callback(opts.form_id,current_page,opts.items_per_page,this);
		}       
	});
}

/**
 * 修改jquery.pageination分页查询 
 * 参数说明 
 * @divId 放置分页内容的DIV id 
 * @param form_id 搜索表单的id,
 * @param current_page 当前页嘛 
 * @param total_page 总页数 
 * @param page_size 每页显示的条数 
 * @param callback 回调函数
 * @param options 其他参数
 */
function generatePagingHtml(divId,form_id,current_page,total_page,page_size,callback,options){
	if(total_page=='' || current_page=='' || page_size==''){
		return;
	}
	current_page=parseInt(current_page);
	total_page=parseInt(total_page);
	page_size=parseInt(page_size);
	if(total_page<1){
		return;
	}
	select_page_size=true;
	if(typeof(options)!='undefined' && typeof(options.select_page_size)!='undefined' && !options.select_page_size){
		select_page_size=false;
	}
	$("#"+divId).pagination(0, {
			form_id:form_id,			
			current_page:current_page-1,
			total_page:total_page,
			items_per_page:page_size,
			select_page_size:select_page_size,
			callback: function(form_id,pagenum,pagesize){
				pagenum++;
				callback(form_id,pagenum,pagesize);
			}
		});
};


;define(function(require,exports,module){

	var $ = require("jq");
	require('../../css/common/MaxTp.popup.css');


	var 
		windowWidth,
		windowHeight,
		popstatus,
		//超时时间
		outTime;
	/*
	* whWindow()	浏览器宽高的获取
	*/
	function whWindow() {
		windowWidth = $(window).width();
		windowHeight = $(window).height();
	}
	/*
	* windowSize()	窗口监听函数
	*/
	$(window).resize(function() {
		whWindow();
		popStatuRe();
	});
	whWindow();
	/*
	* popStatus()	提示
	* status	1正确，2提示，3加载，4失败
	* html	提示信息
	* timeout	提示时间,单位：秒
	* url	是否跳转页面,没有则留空
	* bremove	是否使用遮照,不为空时使用
	*/
	module.exports = {

		popStatus : function (status, html, timeout, url, bremove) {

				//请求超时时间
				var timeous = 20;
				clearTimeout(popstatus);
				clearTimeout(outTime);
				$('body #wstatus').remove();
				$('body #bremove').remove();
				if (status == 1) {
					$('body').append('<div id="wstatus"><div class="wstatus_s wstatus_s1"></div><span class="wstatus_f">'+html+'</span></div>');
				}else if (status == 2) {
					$('body').append('<div id="wstatus"><div class="wstatus_s wstatus_s2"></div><span class="wstatus_f">'+html+'</span></div>');
				}else if (status == 3) {
					$('body').append('<div id="wstatus"><div class="wstatus_s wstatus_s3"></div><span class="wstatus_f">'+html+'</span></div>');
				}else {
					$('body').append('<div id="wstatus"><div class="wstatus_s wstatus_s4"></div><span class="wstatus_f">'+html+'</span></div>');
				}
				popStatuRe();
				//是否使用遮照
				if (bremove) {
					$('body').append('<div id="bremove" />');
				}
				if (!url) {
					url = 0;
				}
				//抖动
				/*if (status == 2 || status ==4) {
					var sw = (windowWidth/2)-($('#wstatus').width()+18)/2;
					var sh = (windowHeight/2)-($('#wstatus').height()+18)/2;
					$('body #wstatus').animate({left:sw-15+'px'},100);
					$('body #wstatus').animate({left:sw+30+'px'},100);
					$('body #wstatus').animate({left:sw-30+'px'},100);
					$('body #wstatus').animate({left:sw+30+'px'},100);
					$('body #wstatus').animate({left:sw+'px'},100);
					$('body #wstatus').animate({top:sh-15+'px'},100);
					$('body #wstatus').animate({top:sh+30+'px'},100);
					$('body #wstatus').animate({top:sh-30+'px'},100);
					$('body #wstatus').animate({top:sh+30+'px'},100);
					$('body #wstatus').animate({top:sh+'px'},100);
				}*/
				popstatus = setTimeout(function() {
					//判断是否有跳转地址
					if (url != 0) {
						if (url == '?') {
							reloads();
						}else {
							location.href = url;
						}
					}
					$('body #wstatus').remove();
					$('body #bremove').eq(-1).remove();
				},timeout*1000);
				//超时时间设置
				if (timeout >= timeous) {
					outTime = setTimeout(function() {
						if ($('body #wstatus')) {
							clearTimeout(popstatus);
							$('body #wstatus').remove();
							popStatus(4, '阿哦,请求地址错误或超时,请重试！', 3, '', true);
						}
					},timeout*1000-1000);
				}
			}
	}
	/*
	* popStatuRe()	位置矫正
	*/
	function popStatuRe() {

		$('body #wstatus').css({'left':(windowWidth/2)-($('#wstatus').width()+18)/2+'px','top':(windowHeight/2)-($('#wstatus').height()+18)/2+'px'});
	}


});define(function(require, exports, module){

	//获取jquery
	var $ = require("jq");

var common = {
		choose:function(btn,val){
		     common.lert("click",{obj:btn,bgcolor:"bggreen",title:"温馨提示",content:val})	
	    },//判断管理我的退货地址初始化默认选中
		thCheck:function(btn){
			$("input[name=reAdree]").attr("checked",false);
		    $("input[name=reAdree]").each(function(index){
				if(btn.prev().html()==$(this).next().children().last().html()){
				    $(this).attr("checked",true);
				}
			}) 
		}
		,//indexHeaderSearch 首页搜索选择搜索分类
		indexHeaderSearch:function(objid,boxid){
			 var obj = $('#'+objid),box = $('#'+boxid)
		     obj.on('mouseover',function(event){
				 event.stopPropagation();
				 var _this = $(this)
				 $(this).parent().next().show()
				 $(this),$(this).parent().css("border-radius","5px 5px 5px 0px")
				 $(this).parent().next().children().click(function(){
					   _this.html($(this).children().html())
				       box.hide();
				 })
			 })
			 obj.on('mouseout',function(){
				 $(this).parent().next().hide()
				 $(this),$(this).parent().css("border-radius","5px")
			 })
			 box.on('mouseover',function(event){
				 event.stopPropagation();
				 obj,obj.parent().css("border-radius","5px 5px 5px 0px")
				 $(this).show()
			 })
			 box.on('mouseout',function(){
				 $(this).hide()
				 obj,obj.parent().css("border-radius","5px")
			 })
			 
		},//AttentionMaxtp关注美试划过效果
		AttentionMaxtp:function(id,imgsrc1,imgsrc2){
			 var obj = $("#"+id)
		     obj.mouseover(function(){
				$(this).children().last().show()
				$(this).children().first().children().first().attr('src',imgsrc1)
				$(this).addClass(id)	 
			 })
			 obj.mouseout(function(){
				$(this).children().last().hide()
				$(this).children().first().children().first().attr('src',imgsrc2)
				$(this).removeClass(id)	 	 
			 })
		},
		//left  弹出层调用
		lert:function(oevent,set,endfn){
			if($("#abk").length==0&&$("#mask").length==0){
			  $(document.body).children().first().after('<div id="abk"></div>');
			  var oMask = $("#abk")
			}
			if($("#abk").length==1){var oMask = $("#abk")}
			if($("#mask").length==1){var oMask = $("#mask")}
			switch(oevent){
			    case "click":
				set["obj"].on("click",function(){
				    	openBox($("#"+set["id"]),oMask,$("."+set["id"]),$(this),{type:set["type"],id:set["id"],background:set["bgcolor"],liclass:set['addclass'],allclass:set['allclass'],title:set["title"],proUrl:set["proUrl"],phone:set["phone"],reportType:set["reportType"],typetxt:set["typetxt"],reson:set["reson"],uploadBox:set["uploadBox"],uploadts:set["uploadts"],okval:set['okval'],noval:set['noval'],midval:set['midval'],Btn:set["Btn"],twoBtns:set["twoBtns"],other:set["other"],content:set["content"],func:set["func"],ok:set["ok"],cannel:set["cannel"],coverImg:set['coverImg'],Custom:set['Custom'],imgSrc:set['imgSrc'],imgWidth:set['imgWidth'],imgHeight:['imgHeight'],readress:set['readress']},null,endfn);
						set.endfn&&set.endfn(set["obj"],$(this))
				})
				break;
				case "alway":
				    Operate(null,oMask,null,{type:set["type"],id:set["id"],background:set["bgcolor"],liclass:set['addclass'],allclass:set['allclass'],title:set["title"],proUrl:set["proUrl"],phone:set["phone"],reportType:set["reportType"],typetxt:set["typetxt"],reson:set["reson"],uploadBox:set["uploadBox"],uploadts:set["uploadts"],okval:set['okval'],noval:set['noval'],midval:set['midval'],Btn:set["Btn"],twoBtns:set["twoBtns"],other:set["other"],content:set["content"],func:set["func"],ok:set["ok"],cannel:set["cannel"],coverImg:set['coverImg'],Custom:set['Custom'],imgSrc:set['imgSrc'],imgWidth:set['imgWidth'],imgHeight:['imgHeight'],readress:set['readress']},null,endfn);
				
			   break;
			   case "show":
			    set["obj"].on("click",function(){
				    	Operate($(this),oMask,set['box'],set["down"],{flag:set['flag'],qk:set['qk'],masktwo:set["masktwo"],no:set['no']},set['ok']);
						set.endfn&&set.endfn(set["obj"],$(this))
				})
				
				   break;
			   case "alshow":
			       Operate(set['obj'],oMask,set['box'],set["down"],{flag:set['flag'],qk:set['qk'],masktwo:set["masktwo"]},set['ok']);
				   break;
			}
			
		},//定位弹出层不跟踪
		poslert:function(mouseEvent,posset){
             Clickshow({obj:posset["obj"],box:posset["box"],onOF:mouseEvent,grade:posset["grade"],left:posset["left"],top:posset["top"],oClose:posset["down"],cannel:posset["cannel"]})
	   },
	   areaCl:function(classNa,endfn){//排序按钮点击选择位置
		   $('.'+classNa).on('click',function(ev){
               Ev= ev || window.event; 
			   var name = $(this).attr('name');
			   var mousePos = mouseCoords(ev);
			    if(mousePos.y<($(this).offset().top+$(this).height()/2)){
				   endfn&&endfn(name,'top')
			    }else{
				   endfn&&endfn(name,'bottom')
			    }
				function mouseCoords(ev){
				if(ev.pageX || ev.pageY){
				    return {x:ev.pageX, y:ev.pageY};
				}
				return{
					x:ev.clientX + document.body.scrollLeft - document.body.clientLeft,
					y:ev.clientY + document.body.scrollTop - document.body.clientTop
				};
				} 
		   })
		   
	   },
	   CoverFigure:function(id,className,n){//用户更换背景效果
		      var obj = $('#'+id);
			  obj.children().eq(n).addClass(className)
			  obj.children().each(function(index,element){
				  $(this).on('click',function(){
					  obj.children().removeClass(className);
					  $(this).addClass(className)  
				  })  
			  })
	   },
	   secCategory:function(){//选择类目
		       function getsj(obj,ulclass){
					   $(".ulTwo").hide();
					   $(".ulThree").hide();
					   obj.children().each(function(index, element){
							 var _this=$(this)
							  ulclass.append("<li>");
							  ulclass.children().eq(index).html($(this).html())
						});
						ulclass.children().each(function(index1, element){
							  $(this).on("click",function(){
								   //重新生成需创建的li
									if($(this).parents("ul").hasClass("ulOne")){
								       //$(this).find("i").show();
									   $(".unfold ul").children().removeClass("on");			//清空li的class="on"
									   $(".unfold select").children().attr("selected",false);	//取消二级与三级的select的值
									   $(".ulTwo").html("");									//将二级UL子节点清空
									   $(".lm_search span").hide();								//当前选择类目
									   $(".lmone").show().html($(this).html());	
									   //开发加入访问数据代码  1级选项框
									   obj.children().attr("selected",false);
											obj.children().eq(index1).attr("selected","selected");//设置li对应的select  修改到这里 方便获取select当前选中值 
											//实现访问数据库 访问方式:Ajax 
											ajax_Category(".sec_one",".sec_two");
											//数据加载到下拉后再同步ul
									   getsj($(".sec_two"), $(".ulTwo"));//创建二级ul子节点个数与二级select子节点个数对应
									}else{
										ulclass.children().removeClass("on");				    //控制清空当前点击ul中的li的class="on"
									}
									if($(this).parents("ul").hasClass("ulTwo")){
									   //$(".unfold ul.ulTwo").find("i").hide();
								       //$(this).find("i").show();
										$(".ulThree").children().removeClass("on").end().html("");      //清空三级ul中的li的class="on"
										$(".sec_three").children().attr("selected",false);      //取消三级的select的值
										$(".lmthree").hide();									//当前选择类目
										$(".lmtwo").show().last().html($(this).html());
										//开发加入访问数据代码  2级选项框  
										obj.children().attr("selected",false);
											obj.children().eq(index1).attr("selected",
													"selected");
											//实现访问数据库 访问方式:Ajax  
											ajax_Category(".sec_two",".sec_three"); 
											//数据加载到下拉后再同步ul 
										getsj($(".sec_three"), $(".ulThree"))//创建三级ul子节点个数与三级select子节点个数对应
										
									}else{
										ulclass.children().removeClass("on");					//控制清空当前点击ul中的li的class="on"
									}
									if($(this).parents("ul").hasClass("ulThree")){
									   //$(".unfold ul.ulThree").find("i").hide();
								       //$(this).find("i").show();
										$(".lmthree").show().last().html($(this).html());
									}
				
									$(this).addClass("on");										//当前点击的li的class="on"
									obj.children().attr("selected",false).eq(index1).attr("selected","selected");	//清空当前点击ul对应的select的值
										//设置点击li对应的select得知
									//以下控制显示隐藏
									$(".ulOne").show()
									if($(".ulOne").children().hasClass("on")){
										$(".ulTwo").show();
									}
									$(".ulTwo").children().hasClass("on")?$(".ulThree").show():$(".ulThree").hide();
							  sortoption()
							  }) 

						  });
				    }
				    function nameul(tag){
					   return $(".unfold").append($("<ul id='"+tag+"' class='"+tag+"'></ul>"));
				    }
					//开发  加入ajax代码实现访问
					function ajax_Category(tj1,tj2){
						$.ajax( {
							type : "get",
							async : false,
							url : "queryCategory.htm",
							data : {id : $(tj1).find("option:selected").attr("value")},
							success : function(can) {//给二级下拉项添加代码,实现访问二级   
								var ajson = eval("("+can.toString()+")"); 
								var sec= $(tj2);
								sec.html(" "); //将二级多选项清空
								for ( var i = 0; i < ajson.length; i++) {
									sec.append("<option value='"+ ajson[i]["id"] + "'>"+ ajson[i]["name"] + "</option>");
								}
						    }
						});
					}
		       nameul("ulOne");
			   nameul("ulTwo");
			   nameul("ulThree");
			   //每次获取数据时从新赋值给ul值并重新生成需创建的标签
			   getsj($(".sec_one"),$(".ulOne"));
			   getsj($(".sec_two"),$(".ulTwo"));
			   getsj($(".sec_three"),$(".ulThree"));
			   function sortoption(){
						$(".unfold").each(function() {
							var attr = this;
							$("ul",this).each(function(index, element) {
								$(this).children().each(function(n,o) {
									 $("select",attr).eq(index).children().eq(n).html($(this).html()).attr("selected",false);
									 if($(this).hasClass("on")){
										 $("select",attr).eq(index).children().eq(n).attr("selected",true);
									 }
								});
							});
						});
				}

	   },//上传图片检测显示有图片的
       imgsh:function(){
            $('.pz').each(function(index, element) {
				var This = $(this)
                  if($(this).find('img').attr("src")==''){
				      $(this).hide();
				      $(this).prev().show();
				  }else{
				     $(this).prev().hide();
					 $(this).show();
					 $(this).parent().find(".textError").hide();
				  }
				  $(this).children().last().on('click',function(){
					     This.find('img').attr("src",'');
						 This.hide();
						 This.prev().show();
						 
				  })
            });
       },//旗子备注划过效果
	   onflag:function(){
		 // var ishave = $('.redPf'),isnone = $('.noPf');
		  $(arguments).each(function(index, element) {
              $(this).on('mouseover',function(){
				  if(!$(this).hasClass("noPf")){
						$(this).children().show(); 
				  }
			  })
			   $(this).on('mouseout',function(){
					$(this).children().hide(); 
			  })
          });
	   },
	   InitializeFlag:function(box,This){
				  var flagColor = ['redPf','yellowPf','greenPf','bluePf','purplePf']
				  var dx = This.attr('class').split(' ')[This.attr('class').split(' ').length-1]
				  if(arrIndex(dx,flagColor)!=-1){
					box.find("input[type=radio]").eq(arrIndex(dx,flagColor)).attr("checked",true);
					box.find('textarea').val(This.find('p').html());
				  }else{
					   box.find("input[type=radio]").eq(0).attr('checked',true);
					   box.find('textarea').val("");
				  }
				  box.find('input[type="radio"]').on("click",function(){
					  $(this).attr('checked',true);
				  })
	   },//小旗子确定事件操作
	   getflag:function(box,obj,mask){
			   var flagColor = ['redPf','yellowPf','greenPf','bluePf','purplePf']
			      obj.children().html("<p>"+box.find('textarea').val()+"</p>")
				   box.find('input[type="radio"]').on("click",function(){
					   box.find('input[type="radio"]').attr('checked',false);
					   $(this).attr('checked',true);
					   common.onflag($(".okPf"));  
				   })
				   box.find('input[type="radio"]').each(function(index, element){
						if(box.find('input[type="radio"]').eq(index).attr('checked')=="checked"){
							 obj.removeClass().addClass('okPf '+flagColor[index]);
						}
				   });
				   
	   },//各行变色
	   addGhbs:function(obj,tagName,style){
	       $(obj).each(function(){
			    var attr = this;
					$(tagName,attr).each(function(index, element) {
						if((index+1)%2!=0){
						$(this).addClass(style)
					}
                });
				
		   })
	   },
	   adress:function(obj){
			obj.each(function(index, element) {
				$(this).on("click",function(){
					fz($(this),".people",4)
					fz($(this),".MobilePhone",5)
					fz($(this),".telephone",5)
					fz($(this),".PostalCode",5)
					var province = $(this).parents("div.message").find(".province").attr("name")
					var city = $(this).parents("div.message").find(".city").attr("name")
					var county = $(this).parents("div.message").find(".county").attr("name")
				    $("#hidorderid").val($(this).parents("div.message").find("input").val());   
					_init_area_sc("prov1","city1","county1",province,city,county);
					fz($(this),".DelAddress",0)
				})
				
				
			});
			function fz(obj,className,num){
					//$("#siteChange").find(className).val(obj.parents("div.message").find(className).html().substring(num))
				var content=obj.parents("div.message").find(className).html();
				
				if(null !=content && "" !=content)
				{
					if(className == '.DelAddress'){
						content = content.split($("#county1").find("option:selected").text())[1];
						$("#siteChange").find(className).val(content);
					}else{
						$("#siteChange").find(className).val(obj.parents("div.message").find(className).html().substring(num))
					}
					
				}
			} 
	   },//验证弹出框表单
	   effect:function(box,inp,str,way){
		   //判断输入框是否输入内容
		      if(str == "val"){
				  var mn = 0,ln=0,top=0;
				  box.find(inp).each(function(index, element) {
					   if($(this).val()==""){
						   mn++
						   ln=mn
						   $(this).parent().find(".textError").fadeIn(150);
						   $(this).parent().find(".textError").html($(this).parent().find(".textError").attr("data-val"))
						   if(ln==1&&way){
						      //window.scrollTo(0,$(this).offset().top-50);
							  top = $(this).offset().top
						   }
					   }
				   });
				   return [ln,top]
			  }
			  //判断至少上传一张图片
			  if(str == "img"){
				  var num = 0,len = null,top=0;
				  box.find(inp+" img").each(function(index, element) {
					   if($(this).attr("src")!=""){
					      num++
					   }
					   len=num
                  });
				  if(len==0){
					 box.find(inp).parent().find(".textError").html(box.find(inp).parent().find(".textError").attr("data-val"))
					 box.find(inp).parent().find(".textError").fadeIn(150)
					 top = box.find(inp).parent().offset().top
				  }
		          return [len,top]
			  }
			  //验证下拉菜单
			  if(str == "select"){
				   var mb = 0,lb=0,top=0;
				   box.find(inp).each(function(index, element) {
                      if($(this).val()=="selected"||$(this).val()==""){
					       mb++
						   lb=mb
						   $(this).parent().find(".textError").fadeIn(150);
						   $(this).parent().find(".textError").html($(this).parent().find(".textError").attr("data-val"))
						   if(lb==1&&way){
							  top = $(this).offset().top
						   }
					  }
                   });
				   box.find(inp).change(function(){
					  selectOk($(this))
				   })
				   return [lb,top]
			  }
	   },
	   imgMust:function(box,imgbox,way){
		      var num=0,onoff=null,top=0;
			  box.find(imgbox).each(function() {
				  $("img.must",this).each(function(index, element) {
                        onoff = num;
						if($(this).attr("src")==""){
						   $(this).parents(imgbox).find(".textError").html($(this).parents(imgbox).find(".textError").attr("data-val")).fadeIn(150)
						   num++
						   onoff=num;
						   if(onoff==1&&way){
							   top = $(this).offset().top
							}
						}
						
                  });
			  });
			  return [onoff,top]
	   },least:function(imgbox,way){
			  var  result = true,onoff=false,top
			  $(imgbox).each(function(){
				  var num,n=0
			      $('.least',this).each(function(index,element){
					    num = 0
			            if($(this).attr('src')!=""){
						    n++;
						}
						result = n;
				  })
				   if(result == 0 && num ==0){
			         onoff = true;
					 $('.textError',this).show().html($('.textError',this).attr('data-val'));
					 top = $('.least',this).offset().top;
				   }
			 })
			
			  return [onoff,top]
	   },//单选验证
	   Radioeffect:function(imgbox,way){
		   var result = true
		   $(imgbox).each(function(){
			   var attr = this;
			   if($("input[type=radio]",attr).length>0){
				   if($("input[type=radio]:checked",attr).length==0){
						result = false;
						$('.textError',this).show().html($('.textError',this).attr('data-val'));  
				   }else{
						result = true;
						$('.textError',this).hide();  
				   }
			   }
			   $("input[type=radio]",attr).on("click",function(){
				   result = true;
					$('.textError',attr).hide();    
			   })
		   })
		  return result
	   }
	   ,//验证页面表单
	   effectHtml:function(element){
		  var box = element["box"]?$(element["box"]):$(document.body)
		  var must = element["must"]||"mustVal";
		  var imgbox = element["imgbox"]||box;
		  $(element["btn"]).on("click",function(event){
			    common.pressword($(".testword"),element['txt']);
			    common.pressword($(".PassWord"),element['txt']);
			    cexa = new ControlForm("mustVal",null,null,null,true);
				cexa.selected();
				var num = common.effect(box,".pz."+must,"img",true);
				var mn  = common.effect(box,"input[type=text]."+must,"val",true);
				var mb  = common.effect(box,"select."+must,"select",true);
				var radio = common.Radioeffect("."+must);
				var least = common.least("."+must);//至少上传一张图片
				var same = common.password()==true?false:true;//再次输入密码 是否一直
				if(mn[0]!=0||mb[0]!=0||box.find("textarea."+must).val()==""||least[0]||same||!radio){
				   if(same){
					   common.password(true,element['txt'])
				   }
				   common.least("."+must,true)
				   common.effect(box,"input[type=text]."+must,"val",true);
				   common.effect(box,"input[type=password]."+must,"val",true);
				   common.effect(box,"textarea."+must,"val",true);
				   common.effect(imgbox,".pz."+must,"img",true);
				   if(!isNaN(minArr([mn[1],mb[1],least[1]]))){
				   		window.scrollTo(0,minArr([mn[1],mb[1],least[1]])-50)
				   }
				}else{
				   element["ok"]&&element["ok"]($(this),event,box)
				}
	  	  })
	   },//划过钻出效果
	   dril:function(obj){
		   obj.hover(
			     function(){
					$(this).children("img").siblings("p").show();
				    $(this).children("img").siblings("p").stop().animate({height:30+"px"},200);
				 },
				 function(){
				    $(this).children("img").siblings("p").stop().animate({height:0+"px"},200,function(){
					     $(this).hide()
					});
				 }
			 )   
	   
	   },//选中后文字加粗
	   textBold:function(obj){
	        obj.each(function(){
				$('input[type=radio]:checked',this).next().css({fontWeight:"bold"})	
				$('input[type=radio]',this).on("click",function(){
					$(this).parent().find("input[type=radio]").next().css({fontWeight:"400"})
				    $(this).next().css({fontWeight:"bold"})	
				})	
			})
 	   },//限制多选框最多选n项
       limitSel:function(obj,n){
	       obj = typeof obj == "object"?obj:$(obj);
		   obj.each(function(){
			   var attr = this
			   $('input[type=checkbox]',attr).on("click",function(){
			       if($('input[type=checkbox]:checked',attr).length>=n){
					   $('input[type=checkbox]',attr).attr("disabled",true);
					   $('input[type=checkbox]:checked',attr).attr("disabled",false);
				   }else{
					   $('input[type=checkbox]',attr).attr("disabled",false);
				   }
			   })   
		   })
	   },//登录提示大写锁定框
	   capsLock:function(obj,ts){
	       obj = typeof obj == "object"?obj:$(obj);
	       ts = typeof ts == "object"?ts:$(ts);
		   function  detectCapsLock(event){
				var e = event||window.event;
				var o = e.target||e.srcElement;
				var oTip = ts;
				var keyCode = e.keyCode||e.which; // 按键的keyCode 
				var isShift = e.shiftKey ||(keyCode == 16 )||false ; // shift键是否按住
				if (
				   ((keyCode >= 65 && keyCode <= 90) && !isShift) // Caps Lock 打开，且没有按住shift键 
				   || ((keyCode >= 97 && keyCode <= 122) && isShift)// Caps Lock 打开，且按住shift键
				){
					$(oTip).show()
				 }else{
					$(oTip).hide()
				 } 
			}
			obj.on("keypress",detectCapsLock)
	  },//账号管理 品牌入驻信息主账号信息（公司信息添加新资质）
	  addShb:function(json,n,fal){
		  $(json["box"]).each(function(index, element) {
               var attr = this;
			   var btn = $(this).next().children().first(); 
			   btn.off("click",null)
               btn.on("click",function(){
				  var num = $(attr).children().length
				  if(num<n){
					  $(attr).append($(json["html"]).html());
				  }
				  if(num==n-1){
					  btn.hide();
				  }
				  del(attr)
				  sorting();
				  if(fal){
				  	common.addShb({box:".newShb",list:".Shblist",html:"#shbhtml",down:"i.iclose",sorting:".cxl",nameval:"name_h"},5,false);
				  }
		      });
			  del(attr)
			  sorting()
		      function del(attr){
				    $(json["down"],attr).on("click",function(){
						  $(this).parents(json["list"]).animate({height:0,padding:0,margin:0},function(){
							   $(this).remove();  
							   btn.show();
							   sorting();
						  }) 
						   
					 })   
			  }
			  function sorting(){
				  $(json["box"]).each(function(index, element) {
					  $(this).children().each(function(index1, element) {
						   $(this).find(json["sorting"]).html(index1+1)
					  });
				  });
			  }
		 }); 
	  },//类目管理-发起修改增加功能
	 categ:function(field,endfn){
	     $(field["Recycling"]).each(function(index, element) {
              var attr = this;
			  var box = $(field["box"],attr);
			  var btn = box.next().find("input.on");
			  var del = box.find("i.delete.on")
			  var html = $(field["html"]).html();
			  var name = field["className"]||""; 
			  count(box);
			  yunxing()
			  function yunxing(){
				  btn.off("click",null)
				  common.lert("show",{obj:btn,box:$("#editText"),qk:true,ok:function(b,m,o){
					   box.append(html);
					   box.children().last().find("a"+name).html(b.find('input').val())
					   common.categ({Recycling:".Recycling",box:".lmBox",html:"#htmlone",edit:".edit",three:true})
					   count(box); 
					   //增加后添加删除操作 
					   if(field["one"]){
						   o.removeClass("on");
						   o.parent().prev().children().last().find("i.delete").addClass("on1").on("click",function(){
								$(this).parent().remove();
								o.addClass("on");
								yunxing();
						   })
						   btn.off("click",null);
					   }
					   if(field["two"]){
						   o.parent().prev().children().last().find("i.delete").addClass("on1").on("click",function(){
								$(this).parents("."+box.children().attr("class")).remove();
								yunxing()
								count(box)
						   })
					   }
					   if(field["three"]){
						   o.parent().prev().children().last().find("i.delete").addClass("on1").on("click",function(){
								$(this).parent().remove();
								yunxing()
								count(box)
						   })
					   }
				  }})
			  }
         });
		 function count(box){
			   box.children().each(function(m,k){
				    var attr = this;
	   				var edit = $(field["edit"]+".on",this) ;
					var count = (m+1)<10?"0"+(m+1):(m+1);
					var del = $(field["del"]+".on",this) ;
					$(this).find("font.count").html(count);
					edit.off("click",null);
					common.lert("show",{obj:edit,box:$("#editText"),qk:true,ok:function(b,m,o){
						o.prev().html(b.find('input').val());
					}})
					del.off("click",null);
					common.lert("click",{obj:del,content:"确认删除类目",qk:true,bgcolor:"bggreen",okval:"确认",noval:"取消",ok:function(b,m,o){
						var onoff = false;
						if(field["one"]){
						   //alert(1)	
						}else if(field["two"]){
						   //alert(2)
						}else{
							onoff = true;
						}
						if(onoff){
							o.off("click",null)
							o.parent().addClass("hui");
							o.removeClass("on");
						}
						
					}})
					
					
			   })
	     }
	 },//密码不一致验证提示
	  password:function(on,txt){
		 var arrClass = [$(".PassWord"),$(".testword")];
		 var arr = [arrClass[0].val(),arrClass[1].val()];
		 var content = txt;
		 if(on&&on!=''){
			 $(".testword").parent().find(".textError").html(content).fadeIn(150);
			 
		 }
		 return mm(arr)
	  },
	  pressword:function(obj,text){
		  var txt = $(".testword").parent().find(".textError");
		  var content = text;
		  obj.on("focus",function(){
			  if(!common.password()&&$(this).val()!=""&&$(".testword").val()!=''){
				 txt.html(content).fadeIn(150);
			  }
		  }) 
		  if($(".PassWord").val!=''){
			  obj.on("keypress",function(event){
				 var e = event||window.event;
				 var o = e.target||e.srcElement;
				 var keyCode = e.keyCode||e.which; // 按键的keyCode
				 if(
					((keyCode >= 65 && keyCode <= 90))||((keyCode >= 49 && keyCode <= 57))||((keyCode >= 97 && keyCode <= 122))){
						setTimeout(function(){
							 if(!common.password()){
								txt.html(content).fadeIn(150);
							 }else{
								txt.hide();
							 }
						},1)
				  }else if(keyCode == 8 ){
						setTimeout(function(){
							if(!common.password()){
								 txt.html(content).fadeIn(150);
							}else{
								txt.hide();
							}
						},1)
				  }
			  });
		  }
	  },//纳税人选项显示隐藏
	  Taxpayer:function(fw,sel,box,text){
		    val = typeof sel == "object"?sel:$(sel);
		    obj = typeof box == "object"?box:$(box);
		    fw = typeof fw == "object"?fw:$(fw);
			obj.hide();
			fw.each(function(){
				var This = this
			   	$(sel,this).each(function(){
					var attr = this
					$(this).children().each(function(index, element) {
                        if($(this).val()==$(attr).val()&&$(this).html()==text){
						    $(box,This).show();
						}
                    });
					$(this).change(function(){
						   if($('option:selected',this).html()==text){
							   $(box,This).show();
						   }else{
								$(box,This).hide();	
						   }
					})
				})
			})
			
	  },//发货管理修改地址
	  selure:function (obj,box,arrnum){
	 	   $(arrnum).each(function(index, element) {
			    var attr = this
				$("input[type=radio]",$("#"+box+this)).each(function(a,b) {
					var This = $(this)
					var num = $(this).next().children().length
					$(this).next().children().each(function(n,o) {
                        if($(this).html()==$("#"+obj+attr).children().eq(n).html()){
							num--
						}
                    });
					num==0?This.attr("checked",true):This.attr("checked",false);
                });
				common.lert("show",{obj:$(".reSelect"+attr),box:$("#"+box+attr),ok:function(o,b,t){
				    t.parent().next().html( b.find('input[type=radio]:checked').next().html())
				}})
           });
	  }
}

// 验证重复元素，有重复返回true；否则返回false
function mm(arr){
	var hash = {};
	for(var i in arr) {
		if(hash[arr[i]])
		return true;
		hash[arr[i]] = true;
	}
	return false;
}

//选项卡
function setTab(name,cursel,n){
	for(i=1;i<=n;i++){
		var menu=document.getElementById(name+i);
		var con=document.getElementById("con_"+name+"_"+i);
		menu.className=i==cursel?"hover":"";
		con.style.display=i==cursel?"block":"none";
	}
}
//获取滚动条滚动的距离
function getScrollTop() {  
	var scrollPos;  
	if (window.pageYOffset) {  
		scrollPos = window.pageYOffset; 
	}  
	else if (document.compatMode && document.compatMode != 'BackCompat'){
		scrollPos = document.documentElement.scrollTop; 
	}  
	else if (document.body){
		scrollPos = document.body.scrollTop; 
	}   
	return scrollPos;   
}
function arrIndex(v,arr){
		     for(var i=0;i<arr.length;i++){
			     if(arr[i]==v){
			        return i
				 }	 
		     }
			 return -1
		  }
function minArr(arr){
   for(var i=0;i<=arr.length-1;i++){ 
     if(arr[i]!=0){
	  var count = arr[i];	 
	  break; 
	 }
   }
   for(var i=1;i<=arr.length-1;i++){ 
	   if(arr[i]<count&&arr[i]!=0){
		 count=arr[i]  
	   }
   }
   return count
}
//获取到到页面的绝对距离
function getPos(obj) {
		var pos = {left: 0, top: 0};
		while(obj) {
			pos.left += obj.offsetLeft;
			pos.top += obj.offsetTop;
			obj = obj.offsetParent;
		}
		return pos;
}
//放大镜效果 
function glass(id){
   this.id = document.getElementById(id);
   if(this.id.getElementsByTagName('div')[0].className=="showImg"){
      this.showBox = this.id.getElementsByTagName('div')[0];
	  this.oImg = this.showBox.getElementsByTagName('img')[0];
   };
   this.oUl = this.id.getElementsByTagName('ul')[0];
   this.aLi = this.oUl.getElementsByTagName('li');
   this.oOl = this.id.getElementsByTagName('ol')[0];
   this.oLi = this.oOl.getElementsByTagName('li');
   if(this.id.getElementsByTagName('p')[0]){
	   this.aP = this.id.getElementsByTagName('p')[0];
	   this.aA = this.aP.getElementsByTagName('a');
	   this.aP.style.left = this.id.offsetLeft + "px";
       this.aP.style.top = this.id.offsetTop + this.id.offsetHeight - this.aP.offsetHeight + "px";
   };
   this.L = 0;
   this.T = 0;
   this.scaleX = 0;
   this.scaleY = 0;
   
};
glass.prototype.forli = function(){
	for(var i=0;i<this.aLi.length;i++){
		this.onmo(i);
	}
};
glass.prototype.onmo = function(that){
   var oSpan = this.aLi[that].getElementsByTagName("span")[0]||null;
   var oA = this.aLi[that].getElementsByTagName('a')[0];
   var This = this;
   this.aLi[that].onmouseover = function(ev){
	    if(oSpan===null)return;
	    oSpan.style.display = 'block';
		This.showBox.style.display = 'block';
	    This.oImg.src = oA.getAttribute('href');
		This.showBox.style.top = getPos(this).top+"px";
		This.showBox.style.left = getPos(This.id).left+This.id.offsetWidth+10+"px";
		This.distance(ev,that,oSpan);//初始化计算为止
	};
	this.aLi[that].onmouseout = function(){
	    if(oSpan===null)return;
	    oSpan.style.display = 'none';
		This.showBox.style.display = 'none';
	};
	this.aLi[that].onmousemove = function(ev){
		This.move(ev,that,oSpan);
	};
}
//初始化计算位置
glass.prototype.distance = function(ev,that,oSpan){
	if(oSpan===null)return;
	ev = ev || window.event;
	this.L = ev.clientX - this.aLi[that].offsetLeft - oSpan.offsetWidth/2;
	this.T = ev.clientY - this.aLi[that].offsetTop+getScrollTop()  - oSpan.offsetHeight/2;
	if(this.L<0){
		this.L = 0;
	}
	else if(this.L>this.aLi[that].offsetWidth - oSpan.offsetWidth){
		this.L = this.aLi[that].offsetWidth - oSpan.offsetWidth;
	}
	if(this.T<0){
		this.T = 0;
	}
	else if(this.T>this.aLi[that].offsetHeight - oSpan.offsetHeight){
		this.T = this.aLi[that].offsetHeight - oSpan.offsetHeight;
	}
	oSpan.style.left = this.L + 'px';
	oSpan.style.top = this.T+ 'px';
	this.scaleX = this.L/(this.aLi[that].offsetWidth - oSpan.offsetWidth);
	this.scaleY = this.T/(this.aLi[that].offsetHeight - oSpan.offsetHeight);
	this.oImg.style.left = - this.scaleX * ( this.oImg.offsetWidth - this.showBox.offsetWidth ) + 'px';
	this.oImg.style.top = - this.scaleY * ( this.oImg.offsetHeight - this.showBox.offsetHeight ) + 'px';	
}
//鼠标移动计算位置
glass.prototype.move =function(ev,that,oSpan){
	if(oSpan===null)return;
	this.distance(ev,that,oSpan);
}

//选项卡
glass.prototype.thisTab = function(){
    var This = this;
	for(var i=0;i<this.oLi.length;i++){



		this.oLi[i].index = i;
		this.oLi[i].onmouseover =function(){
			This.tabfn(this);
		}
	}
}
//选项卡
glass.prototype.tabfn = function(that){
	for(var i=0;i<this.oLi.length;i++){
	   this.aLi[i].style.display="none";
	   this.oLi[i].className = "";
	}
	this.aLi[that.index].style.display = "block";
	this.oLi[that.index].className = "on";
	//非放大镜代码
	//$(".selImg").hide();
	$(".selImg").css("z-index",00);
	$("#blk1").hide();
}  
//图片上下翻页
glass.prototype.prevNext = function(){
	var This = this;
	if(this.aA==null)return;
   	this.aA[0].onclick = function(){
		if(parseInt(getStyle(This.oOl,"left")) < 0 ){
	   	   This.oOl.style.left =  parseInt(getStyle(This.oOl,"left")) + parseInt(getStyle(This.oOl.parentNode,"width")) + "px";
		}
	}
	this.aA[1].onclick = function(){
		if(parseInt(getStyle(This.oOl,"left")) > -(This.oOl.children.length-5) * 62){
	   	   This.oOl.style.left =  parseInt(getStyle(This.oOl,"left")) - parseInt(getStyle(This.oOl.parentNode,"width"))+ "px";
		}
	}
}
//获取元素样式的值
function getStyle(obj, attr) {
	return obj.currentStyle?obj.currentStyle[attr]:getComputedStyle(obj, 0)[attr]; 
}
//放大镜创建对象
function magnifier(id){
    var id = new glass(id);
	id.forli();
	id.thisTab();
	id.prevNext();
}
//字符计算（汉字2，字母数字1）
function getByteLen(val) {
		var len = 0;
		for (var i = 0; i < val.length; i++) {
			var length = val.charCodeAt(i);
			if (length >= 0 && length <= 128){
				len += 1;
			}else{
				len += 2;
			}
		}
		return len;
	}

//控制字符限制
function ControlForm(oClass,aClass,len,id,onoff){
	 this.onoff = onoff;
	 this.c= aClass;
	 this.len = len;
	 this.id = document.getElementById(id);
     this.oText = getByClass(this.id,"*",oClass);
     this.oLen = getByClass(this.id,"*",aClass);
	 this.sel = getByClass(this.id,"*",oClass);
	 this.timer = null;
}
ControlForm.prototype.contentNum = function(){
	if(!this.id){return;}
	var This =this;
	 for(var i=0;i<this.oText.length;i++){
	      this.oText[i].index = i;
		  this.oText[i].onfocus = function(){
			 //$(this).parent().find('.textError').attr("class","abcde")
		     This.time($(this));
		  }
		  this.oText[i].onblur = function(){
			 //$(this).parent().find('.abcde').attr("class","textError")
		     This.notime($(this));
		  }
	 }
}

ControlForm.prototype.time = function(that){
	  var This = this;
		  this.timer = setInterval(function(){
	          var txtLen = that.hasClass("one")?that.val().length:getByteLen(that.val());
			  var kg = that.hasClass("relen")?false:true;
			  if(txtLen<=This.len){
				    This.number(that)
					that.parent().find("."+This.c).html(kg?txtLen:This.len-txtLen);
					if(!kg){
					   that.parent().find(".relen").html(Math.floor((This.len-txtLen)/2));
					}
			  }else{
				 that.val( that.val().substr(0,that.val().length-1))
    			 that.parent().find(This.aClass).html(This.len);
				 //that.parent().find('.abcde').attr("class","textError")
				 that.parent().find('.textError').fadeIn().html("最多输入"+This.len+"个字符")
			  }
		  },1)
}
ControlForm.prototype.notime = function(that){
	  clearInterval(this.timer);
	  if(that.val()==""){
		  var val = that.parent().find(".textError").attr("data-val")
		  that.parent().find('.textError').fadeIn().html(val)
	  }else if(that.val()[that.val().length-1]=="."){
		  that.parent().find('.textError').hide()
	
	  }else{
			that.parent().find('.textError').fadeIn().html("请输入小数点后两位").hide();
	  }
}
ControlForm.prototype.selected = function(){
	 $(this.sel).change(function(){
         selectOk($(this))
	 })
}
ControlForm.prototype.number = function(that){
	var attr = ["number","chinese","price","china"];
	if($(that).hasClass(attr[0])){
	     if(shuzi($(that).val())){
			 delChar($(that))
			 //$(that).parent().find('.textError').fadeIn().html("只能输入数字")
		 }
		 if($(that).hasClass("thanZero")&&$(that).val()<=0){
			 delChar($(that))
			 // $(that).parent().find('.textError').fadeIn().html("请输入大于0的正整数");
		 }
		 if($(that).hasClass("grade100")&&$(that).val()>100){
			 delChar($(that))
			// $(that).parent().find('.textError').fadeIn().html("只能输入 0-100 的数 ");
		 }
	}
	if($(that).hasClass(attr[1])){
	     if(!chinese($(that).val())&&$(that).val()!=""){
			 delChar($(that))
			 //$(that).parent().find('.textError').fadeIn().html("只能输入中文和英文")
		 }
	}
	if($(that).hasClass(attr[2])){
		var pricePe=/^\d+(\.\d{2})?$/;
		
		if(pricePe.test($(that).val())){
			
		
		}else{
			
			
			$(that).parent().find('.textError').html("请输入小数点后两位").show();
			
			return false;
			
		}
		
//		var pricePe=/^\d+$/;
//	     if(!price($(that).val())){
//			 if(getlen($(that).val(),".")==1&&$(that).val()[($(that).val().length-1)]=="."){
//				 console.log("IFA")
//				 $(that).val($(that).val()+"0")
//		     	//$(that).parent().find('.textError').fadeIn().html("请输入小数点后两位")
//			 }else{
//				 console.log('else')
//			   // $(that).parent().find('.textError').fadeIn().html("只能输入最多两位小数的金额")
//			 }
//			
//		 }
	}
	if($(that).hasClass(attr[3])){
	     if(!china($(that).val())){
			 delChar($(that))
			 //$(that).parent().find('.textError').fadeIn().html("只能输入中文")
		 }
	}
	function delChar(obj){		
	   obj.val(obj.val().substr(0,obj.val().length-1))
	}
	
}

function getlen(str,ch){
  var ret=0;
  for(var i=0;i<str.length;i++){if(str.charAt(i)==ch)   ret++;}
  return ret;
}
function textcount(id){
	arrtxt = [];
	for(var i=0;i<=500;i++){
	   	arrtxt.push(i);
	}
	arrtxt.push(1000)
	for(var i=0;i<arrtxt.length;i++){
			    var cex = cex+arrtxt[i]
				cex = new ControlForm("text"+arrtxt[i],"textLen"+arrtxt[i],arrtxt[i],id,true);
				cex.contentNum();	
	}
	//验证下拉框
	cexa = new ControlForm("valMust",null,null,id,true);
	cexa.selected();			
	cexa1 = new ControlForm("mustVal",null,null,id,true);
	cexa1.selected();			

}
//中文和字母
function chinese(str){
    var s =/^[a-zA-Z\u4e00-\u9fa5]+$/;
	return s.test(str);
}

//中文
function china(str){
    var s = /[\u4E00-\uFA29]/ ;
	return s.test(str);
}

//判断非数字
function shuzi(str){
		var s =/\D/g;
		return s.test(str);
}  
//价格
function price(str){
  var s =/^(([0-9]+\.\d{1,2})|([0-9]*[1-9][0-9]*\.\d{1,2})|([0-9]*[1-9][0-9]*))$/ ;
  return s.test(str);
}
//数字和字母
function letterNum(str){
  var s = /^[A-Z]+$/
  return s.test(str)
}

//数字和字母
function mobilephone(str){
  var s = /^1[0-9]{10}$/
  return s.test(str)
}

function phone(obj){
	try{
			var result = true;
	if(mobilephone(obj.val())){
	   result = true;	
	}else{
	   obj.parent().find(".textError").html("请输入正确的手机号码").show();
	   result = false;
	}
   return result
	}catch(e){

	}

}
$(function(){
	for(var i=0;i<20;i++){
	   textcount("txtCon"+i);
    }
})
function priceFn(obj){
	var re=/^\d+(\.\d+)?$/;
	if(re.test($(obj).val())){
		return true
		
	}else{
		return false;
	}
}
// $(function(){
// 	if(!templodaCheckInput || templodaCheckInput){
// 		for(var i=0;i<20;i++){
// 		   textcount("txtCon"+i);
// 	    }
// 	}
	
// })
	//获取元素class
function getByClass(oParent, tagName, className) {
	if(!oParent){return;}
	var aEls = oParent.getElementsByTagName(tagName);
	var arr = [];
	var re = new RegExp('(^|\\s)'+className+'(\\s|$)', 'i');
	for (var i=0; i<aEls.length; i++) {
		if (re.test(aEls[i].className)) {
			arr.push(aEls[i]);
		}
	}
	return arr;
}
//划过点击显示
//json变量：box(弹出框) - left(根据obj进行定位的left值) - top(根据obj进行定位的top值) - content(输出的内容，按需添加) - obj(被点击的对象) - oClose(关闭点击的对象) - onOF(判断属于哪一类型的方法)- 是否属于打分方法（默认为否）
function Clickshow(o){
	var con_op = { 
	    obj:o.obj||$('.lj_sq em'), 
		box:o.box||$('.wh_cont'), 
		oClose:o.oClose||$('.lj_sq em'),
	    left:o.left||0,
		top:o.top||0,
		onOF:o.onOF,
		grade:o.grade||false,
		t0:null,
		t1:null,
		t3:null,
		t4:null
		};
	if(con_op.content){
	   con_op.box.html('<p>'+con_op.content+'</p>');
	}
    if(con_op.onOF==true){//划过类, 划过obj 显示box 划出隐藏
	   con_op.obj.on("mouseover",function(event){
		     event.stopPropagation();
			 if(o.pos==null){
			 con_op.box.css({left:$(this).offset().left+con_op.left+"px",top:$(this).offset().top- con_op.box.height()-con_op.top+"px"});
			 }
			 clearTimeout(con_op.t0);
			 clearTimeout(con_op.t1);
			 con_op.t3=setTimeout(function(){
			   	con_op.box.fadeIn(150);
				$(".blk").hide();
			},300);
            o['cannel']&&o['cannel'](con_op.obj,con_op.box)
	   }) 
	   con_op.box.on("mouseover",function(event){
			event.stopPropagation();
			 clearTimeout(con_op.t0);
			 clearTimeout(con_op.t1);
			con_op.t4=setTimeout(function(){
			   	con_op.box.fadeIn(150);
			},300);
	   });
	   con_op.obj.on("mouseout",function(event){
			event.stopPropagation();
			 clearTimeout(con_op.t3);
			 clearTimeout(con_op.t4);
			con_op.t1=setTimeout(function(){
			   	con_op.box.hide();
			},300);
			
	   })
	   con_op.box.on("mouseout",function(event){
			event.stopPropagation();
			 clearTimeout(con_op.t3);
			 clearTimeout(con_op.t4);
			con_op.t0=setTimeout(function(){
			   	con_op.box.hide();
			},300);
	   })
	   
   }else if(con_op.onOF==false){//点击类，点击obj弹出box,点击document隐藏box
      //点击按钮显示
	  con_op.obj.each(function(index,element){
		 $(this).click(function(event){
		   event.stopPropagation();
		   $(".blk").hide();
		   var _this = $(this);
		   if(con_op.left!=undefined&&con_op.top!=undefined){
			   if($(window).height()+$(document).scrollTop()<getPos(this).top+con_op.box.outerHeight(true)){
				   con_op.box.css({left:getPos(this).left+con_op.left+"px",top:getPos(this).top- con_op.box.outerHeight(true)+"px"});
				}else{
			   	   con_op.box.css({left:getPos(this).left+con_op.left+"px",top:getPos(this).top- con_op.box.height()-con_op.top+"px"});
				};
			};
			con_op.box.show();
			//打分函数参数为点击的按钮的索引值
		   if(con_op.grade){grade(index)};
	   }) ;
	  })
	   //点击关闭
	   con_op.oClose.click(function(event){
		    event.stopPropagation();
			con_op.box.hide();
	   })
	   con_op.box.click(function(event){
		    event.stopPropagation();
	   }) 
	   document.onclick = function(){
		      con_op.box.hide();
	   }
	   //以下为授权书效果
   }else if(con_op.onOF == "authoriz"){
	    con_op.obj.on('mouseover',function(){
		    $(this).children().first().show();
			this.style.position ='relative';
			$(this).children().first().css({position:'absolute',left:'35px',zIndex:'77'});
			con_op.obj.css({zIndex:'77'});
		}) ;
		con_op.obj.on('mouseout',function(){
			$(this).children().first().hide();
		}) ;
   };
};
//end




//单选全选开始
  /*singlefn({multiple:$(".multiple"),single:".single",batchBtn:".batchBtn"});
*/
  /*singlefn({multiple:$(".multiple2"),single:".single2",batchBtn:".batchBtn2"});*/

  function singlefn(json,boxjs){ 
    if($(json.single+":checked").length==0){
		common.choose($(json.batchBtn),$(json.batchBtn).attr("data-v"))
	}else{
		$(json.batchBtn).off("click",null)
	}
    //全选
    json.multiple.click(function(){
		   $(json.single).attr('checked',this.checked);
		   checedNum(json.single,json.batchBtn,boxjs);
	});
	//单选
	$(json.single).click(function(){
		   checedNum(json.single,json.batchBtn,boxjs);
	});

	
};
//判断checkbox是否被选中
	function checedNum(single,batchBtn,boxjs){
		if($(single+':checkbox:checked').length>0){
			$(batchBtn).off('click',null);
			$(batchBtn).on('click',function(){ 
			     if($('#recycle').length>0){
					
				 	uPbox($('#recycle'),$('#mask'), $('.shatdown'),'');
				 }else{
	                //boxjs?common.lert("alway",boxjs):null;
					boxjs();
				 }
			});
		}else{
			$(batchBtn).off('click',null);
	        common.choose($(batchBtn),$(batchBtn).attr("data-v"))
		};
	};
  
	//点击放入回收站等
//待多选框的弹出框
function addChecked(that,This){
	 $('.single').each(function(index1, element1) {
		$(this).attr("id","cbx_"+index1);
		that.eq(index1).attr("id","a"+index1);
	 });
	 $('.single').attr("checked",false);
	 $(".multiple").attr("checked",false);
	 $('#cbx_'+This.attr("id").substr(1)).attr('checked',"checked");
}
function delChecked(obj){
		obj.attr("checked",false);
} ;
//end

//待多选框的弹出框
function ev_begin(box,that,oMask,Close,num){
		if(!that){return};
		if(!num){num=1};
		that.each(function(index, element){
			 var thethis = $(this);
			 $(this).on("mousedown",function(){
				 if(num==1){
					 $('.single').each(function(index1, element1) {
					    $(this).attr("id","cbx_"+index1);
				     });
					 if(box&&oMask&&Close){
						uPbox(box,oMask,Close,this,$('#cbx_'+index+''));
						checedNum(".single",".batchBtn");
						Close.on("mousedown",function(){
						    box.hide();
							oMask.hide();	
					    })
					 }
					 Close.on("mousedown",function(){
						    $('#cbx_'+index+'').attr('checked',false);	
					 })
					 $('.single').attr("checked",false);
					 $(".multiple").attr("checked",false);
					 $('#cbx_'+index+'').attr('checked',"checked");
					  
				 }else if(num==2){
					 $('.single2').each(function(index1, element1) {
					    $(this).attr("id","cbx_"+index1+index1);
				     });
					 if(box&&oMask&&Close){
						uPbox(box,oMask,Close,this,$('#cbx_'+index+index+''));
						checedNum(".single2",".batchBtn2");
					 }
					 Close.on("mousedown",function(){
						    $('#cbx_'+index+'').attr('checked',false);	
					 })
					 $('.single2').attr("checked",false);
					 $(".multiple2").attr("checked",false);
					 $('#cbx_'+index+index+'').attr('checked',"checked");
					  
				 };
				 $(".bg2.rightBtn").on("mousedown",function(){
				     $('#cbx_'+index+'').attr('checked',false);	
				 })
			 });
			  
   		 });
  
} ;
//弹出框
function oTk(obj,mask,Close,d,json,endfn){
	   if(typeof json == "function"){
		  endfn = json;
		  json = "";	
	   }
	   d.click(function(){
		  uPbox(obj,mask,Close,"");
		  $('.cash').val($(this).val());
		  Operate($(this),mask,obj,json,'',endfn);
		  endfn&&endfn(obj.find("p").children().eq(0),$(this))
		  obj.find("p").children().eq(0).click(function(){
		      obj.hide();
			  mask.hide()
		  })
	   })
}
function openBox(box,mask,Close,obj,json,extend,endfn){
		  Operate(obj,mask,box,json,extend,endfn);
}
function Operate(This,oMask,box,json,extend,endfn){
  if(json == null || typeof json == "string" || json=="undefined"){	
    var pos = ''
     box.find(".btnLength").children().each(function(index){
		//getboxyz($(this),index,box,oMask,endfn,extend)
		$(this).on("click",function(){
			if(index==0){
				
				var num =common.effect(box,".pz.valMust","img");
				var mn  = common.effect(box,"input[type=text].valMust","val")[0];
				var mb  = common.effect(box,"select.valMust","select")[0];
				if(box.find(".valMust.MobilePhone").length>0){
				   var tel = phone(box.find(".valMust.MobilePhone"))
				}else{
				   var tel = true;
				}
				if(box.find(".valMust.price").length>0){
					var re=/^\d+(\.\d+)?$/g,
						val=box.find(".valMust.price").val();
					if(re.test(val)){
						
					} else{
						box.find(".valMust.price").parent().find(".textError").show().html("请输入正确的金额");
						  return false;
					}
					
				}
				
				if(mn!=0||mb!=0||box.find("textarea.valMust").val()==""||num===0||!tel){
				   common.effect(box,"input[type=text].valMust","val");
				   common.effect(box,"textarea.valMust","val");
				   common.effect(box,".pz.valMust","img");
				   
				}else{
					
					box.hide();  
					oMask.hide();
					endfn&&endfn(box,oMask,This);
					if(extend["flag"]==true){
						 box.find(".btnLength").children().eq(0).off("click",null);
					}
					if(extend["qk"]){
						 box.find(".btnLength").children().eq(0).off("click",null);
					     box.find("input[type=text]").val("")
					     box.find(".textError").hide();
					}
					$(".single").attr("checked",false)
			    }
				  
			}else{
				
			  box.find(".btnLength").children().eq(0).off("click",null);
			  box.find(".textError").hide();
			  box.find("input[type=text]").val("");
			  //box.find("textarea").val("");
			  box.find("select option:first").attr('selected','selected');
			  extend['no']&&extend['no']();
			  $(this).off("click",null);
			  box.hide();  
			  oMask.hide();
			    for(var i=0;i<20;i++){
				   textcount("txtCon"+i);
			    }
			}
		})
	  });
	  box.find(".listBtn").each(function(index, element) {
           $(this).on("click",function(){
			      box.find(".listBtn").off("click",null)
			      endfn&&endfn($(this),box,This);
				  box.hide();  
				  oMask.hide();
		   })  
      });
	  //小旗子弹框初始化显示对应信息
	  if(extend["flag"]==true){
		pos = {str1:"stopscroll",str2:This}
	  	common.InitializeFlag(box,This)
	  }
	  //两层遮罩层
	  if(extend["masktwo"]==true){
		  var htm = "<div id='maskTwo'></div>"
	      $("#mask").length>0?$("#mask").after(htm):$("#abk").after(htm);
		   mAsk($("#maskTwo"))
	  }
	  
	  if(!json)json=".close";
	  if(This){
		  common.selure(This.parent().next(),"godizhi")//初始化选择地址
	  }
      return uPbox(box,oMask,$(json),pos);
  }
	//简单弹出框自动生成html
	//自动设置ID
	for(var i=0;i<=15;i++){
		if(!json['id']&&$('#stylebox'+i).length==1){
		   json['id'] = 'stylebox'+(i+1)
		   if($("#"+json['id']).length==1){
			    json['id']=null;
			    continue;   
		   }
		}
	}
	json['id'] = json["id"]||"stylebox0";
	//通用按钮设置
	json['btnCon']=json['okCon']=json['noCon']=json['midCon']='';
	function setbtn(a,str,n){
		if(json[a]&&json[a]!=null&&json[a]!="undefined"){
			return json[str] = '<input type="button" class="'+n+'" value="'+json[a]+'">'
		}
	}
	setbtn('okval','okCon','bg1 leftBtn')
	setbtn('noval','noCon','bg2 rightBtn')
	setbtn('midval','midCon','bg3')
	if(json['okval']||json['noval']||json['midval']){
		json['btnCon'] = '<p class="btnLength">'+json['okCon']+json['noCon']+json['midCon']+'</p>';
	}
	//通用背景颜色设置
	json['bgcolor']=json['background']||'bg_box_orange';
    var bgcolor1 = json['bgcolor']=='bggreen'?'bg_box_green':'bg_box_orange';
    var bgcolor2 = json['bgcolor']=='bggreen'?'bggreen':'';
    //通用标题设置
	json["title"] = json["title"]||'温馨提示';
	//简易提示弹出框·
	if(json["type"]==null){
		var smileBox = {
			bgstring:'',
			content:json['content']||'异常提示',
			liclass:[],
			conCon:''
		}
		//content
		if(smileBox['content']){
			for(var i=0;i<smileBox['content'].split('|').length;i++){
				 if(json['liclass']){
			        smileBox['conCon']+='<li class="'+json['liclass'][i]+'">'+smileBox['content'].split('|')[i]+'</li>'
				 }else if(json['allclass']){
					 smileBox['conCon']+='<li class="'+json['allclass']+'">'+smileBox['content'].split('|')[i]+'</li>'
				 }else{
			        smileBox['conCon']+='<li>'+smileBox['content'].split('|')[i]+'</li>';
				 }
			}
	    }json['bgcolor']=json['background']||'bg_box_green';
		oCon = '<div id="'+json['id']+'" class="pop-box '+bgcolor1+'"><h3>'+json["title"]+'<span class="close"></span></h3><div class="pop_cont"><ul>'+smileBox['conCon']+'</ul>'+json['btnCon']+'</div></div>';
	}
	
	//修改用户主页封面图
    if(json["type"] == 'cover'){
	   	var cover = {
		    cimg:json["coverImg"]||['../01通用版块/style/images/bannk/setbg.jpg','../01通用版块/style/images/bannk/classify12.jpg','../01通用版块/style/images/bannk/setbg.jpg','../01通用版块/style/images/bannk/setbg.jpg','../01通用版块/style/images/bannk/setbg.jpg','../01通用版块/style/images/bannk/setbg.jpg'],
		    imgCon:''
		}
		//图片模块
		for(var i=0;i<cover['cimg'].length;i++){
			cover['imgCon']+='<li class="'+(i%2==1?"r0":"")+(cover['cimg'].length>6?(i%2==0?'r17':""):"")+'"><img src="'+cover['cimg'][i]+'" width="335" height="100"></li>';
		}
		oCon = '<div id="'+json["id"]+'" class="setBg"><h3>个性化设置 — <span class="green">'+json["title"]+'</span></h3><ul id="coverUl">'+cover['imgCon']+'</ul><div class="line"></div>'+json['btnCon'];
		
	}
    //退款沟通查看凭证图片放大显示
    if(json['type'] == 'lookImg'){
        json['imgWidth']=json['imgWidth']||300;
        json['imgHeight']=json['imgHeight']||300;
        oCon = '<div id="'+json["id"]+'" class="pzImg"><span class="close"></span><img src="'+This.prev().children().attr('src')+'" width="'+json['imgWidth']+'" height="'+json['imgHeight']+'"></div>'
    }
	//公用生成html并设置box
	if(json['type']!='show'){
	    if($("#"+json['id']).length<1)oMask.after(oCon);
	    var  box = $("#"+json['id']);
	}else{
	    var box = box;	
	}
	//公用确认回调函数
	/*box.find(".btnLength").children().eq(0).on("click",function(){
		oMask.hide();
		json["func"]&&json["func"](box,oMask);
		json["ok"]&&json["ok"](box,oMask);
	})*/
	box.find(".btnLength").children().each(function(index){
		$(this).on("click",function(){
			if(index==0){
				var num =common.effect(box,".pz.valMust","img");
				var mn  = common.effect(box,"input[type=text].valMust","val")[0];
				var mb  = common.effect(box,"select.valMust","select")[0];
				if(mn!=0||mb!=0||box.find("textarea.valMust").val()==""||num===0){
				   common.effect(box,"input[type=text].valMust","val");
				   common.effect(box,"textarea.valMust","val");
				   common.effect(box,".pz.valMust","img");
				   common.effect(box,"select.valMust","select")
				}else{
					box.hide();  
					oMask.hide();
					endfn&&endfn(box,oMask,This);
					json["func"]&&json["func"](box,oMask,This);
					json["ok"]&&json["ok"](box,oMask,This);
					$(".single").attr("checked",false);
					if(json["qk"]){
						 box.find(".btnLength").children().eq(0).off("click",null);
					     box.find("input[type=text]").val("")
					     box.find(".textError").hide();
					}
			    }
				  
			}else{
			
			  box.find(".btnLength").children().eq(0).off("click",null);
			  box.find("input[type=text]").parent().find(".textError").hide()
			  box.find("textarea").parent().find(".textError").hide()
			  box.find(".pz").parent().find(".textError").hide()
			  box.find("input[type=text]").val("");
			  box.find("textarea").val("");
			  box.find("select option:first").attr('selected','selected');
			  box.hide();  
			  oMask.hide();
			  box.remove();
			  if(This!=null){
				  This.parents("tr").find(".single[type=checkbox]:checked").each(function(){
						$(this).attr("checked",false)  
				  })	
			  }
			}
		})
	  });
	
	/*box.find(".btnLength").children().each(function(index){
		$(this).on("click",function(){
			  box.find(".btnLength").children().eq(0).off("click",null)
			  box.remove();
			  if(This!=null){
				  This.parents("tr").find(".single[type=checkbox]:checked").each(function(){
						$(this).attr("checked",false)  
				  })	
			  }
			  index>0?oMask.hide():'';
		})
	})*/
	for(var i=0;i<20;i++){
	   textcount("txtCon"+i);
    }
	endfn&&endfn(json['Custom']);
	uPbox(box,oMask,$(".close"),"remove",json["cannel"]);
}
//end
//弹出框函数

function uPbox(obj, mask, Close,val,endfn) {
	obj.show();
	val["str1"]=="stopscroll"?clickPos():midpos();
	mask.show();
	mAsk(mask);
	/*Close.off('click',null)
	Close.on('click',function(){
		obj.find(".btnLength").children().eq(0).off("click",null)
		val=='remove'?obj.remove():obj.hide();
		if(!$(this).hasClass("subClose")){
		   mask.hide();
		   $(".subClose").parent().parent().hide();
		}else{
		   $("#maskTwo").hide();	
		}
		endfn&&endfn()
	})*/
	obj.each(function(){
		var attr = this;
		$("."+Close.attr("class"),attr).off("click",null)
    	$("."+Close.attr("class"),attr).on('click',function(){
			$(attr).find(".btnLength").children().eq(0).off("click",null)
			val=='remove'?$(attr).remove():$(attr).hide();
			if(!$("."+Close.attr("class"),attr).hasClass("subClose")){
			   mask.hide();
			   $(".subClose").parent().parent().hide();
			}else{
			   $("#maskTwo").hide();
			}
			endfn&&endfn()
		})
	})
	
	
	if(val["str1"]!="stopscroll"){
		window.onscroll = function() {
			if (obj.css('display') == 'block'){midpos();}
		}
		window.onresize = function() {
			if (mask.css('display') == 'block'){mAsk();}
			if (obj.css('display') == 'block'){midpos();}
		}
	}
	function midpos(){//获取obj1的位置并赋值(居中)
		obj.css({top:($(window).height() - obj.outerHeight()) / 2 + $(document).scrollTop()+ 'px',
		         left:($(window).width() - obj.outerWidth()) / 2 +  $(document).scrollLeft()+ 'px'
				})
	}
	function clickPos(){
		obj.css({
			     top:val["str2"].offset().top+val["str2"].height()+ 'px',
		         left:val["str2"].offset().left-obj.width()+ 'px'
				})
	}
	
}
function mAsk(mask){//获取oMask的最大高度 与 最大宽度并赋值
       if(!mask){return}
	    var w = Math.max(document.body.offsetWidth, document.documentElement.clientWidth);
		var h = Math.max($(document).height(), $(document.body).height());
		mask.css({width: w +"px",height:h+ 'px',display:"block"})
}
//one  end 
//固定调用裸价体验类似模板调用弹框 不居中
function ev2_n(box,that,mas,Close){
	that.each(function(index, element){
		 var thethis = $(this)
         $(this).on("mousedown",function(event){
			 event.stopPropagation();
			 var _this = this;
			 //运营确认
			 if(this.innerHTML!='<span class="icon_fund online"></span>运营已确认'){
					oPbox(box,mas,Close,this)
					Close.on('click' , function() {
						mas.hide();
						box.hide();
						if(thethis.parent().next().html()!=''){
							thethis.parent().next().show()
						}
						thethis.parent().html('<span class="icon_fund online"></span>运营已确认');
						
					})
			 }
	     })
    });
}
function oPbox(obj, mask, Close,li){
	    obj.show()
		var w = Math.max(document.body.offsetWidth, document.documentElement.clientWidth);
		var h = Math.max($(document).height(), $(document.body).height());
		mask.css({width: w +"px",height:h+ 'px',display:'block'})
		obj.css({
			     top:getPos(li).top+li.offsetHeight+ 'px',
		         left:getPos(li).left-obj.outerWidth()+li.offsetWidth+ 'px'
				})
		Close.on('click',function(event){
			event.stopPropagation();
			mask.hide();
			obj.hide();
	    })
		obj.on("click",function(event){
			event.stopPropagation();
		    obj.show();
			mask.show();
		})
}

//焦点图幻灯片效果

function slideImg(json,time,id){
	if(!json&&!time&&!id){json={}}
	if(!json&&id){
		if(!time)return;
	   json = {
			 jQuery:id,//幻灯片id
			 liBox:"buyImg ul.inBox",  //幻灯片图片Box
			 allBtn:"tabBtn a",//切换按钮
			 imgWidth:232,
			 btnPos:{position:"absolute",top:210+"px",paddingLeft:($("#"+id+" .tabBtn a").outerWidth()+6)*(5-$("#"+id+" .tabBtn a").length)+"px"},
			 movement:"fadeinout",
			 settime:(time*1000)
		}
	}
	var o = {
		     liBox:$("#"+json.jQuery+" ."+json.liBox),  //图片盒子
			 allBtn:$("#"+json.jQuery+" ."+json.allBtn),//切换按钮
			 imgWidth:json.imgWidth||$("#"+json.jQuery+" .liBox img").css("width"),//滑动一次图片的滑动宽度，不设置默认为图片宽度
			 prev:$("#"+json.jQuery+" ."+(json.prev || "btn_prev")),//上一张按钮 (不设置按钮class默认是id下的.btn_prev)
			 next:$("#"+json.jQuery+" ."+(json.next || "btn_next")),//下一张按钮 (不设置按钮class默认是id下的.btn_next)
			 settime:json.settime||3000,//切换一次停留的时间（默认3秒）
			 speed:json.speed||200,//图片切换一次的时间（默认0.5秒）
			 ClickBackSpeed:json.ClickBackSpeed||2000,//点击图片切换后停留时间再次执行自动切换
			 movement:json.movement||'slide',//默认为slide(滑动)  fadeinout(淡入淡出)
		     btnPos:json.btnPos||{paddingLeft:"400px",bottom:"20px"},//控制切换按钮的css位置样式 （全屏显示幻灯片时常用）
			 fullScreen:json.fullScreen||false ,//是否全屏（默认为false）
			 autoPlay:json.autoPlay||true,
			 objImg:null,
			 _objImg:null,
			 onOff: true,
			 num:0
		};
    //计算全屏显示时的高度
    if(o.fullScreen){
		
		var h =parseInt($(window).width()/($("#"+json.jQuery+" img").outerWidth()/$("#"+json.jQuery+" img").height()))
		$("#"+json.jQuery).css('height',h+"px");
		o.allBtn.parent().css(o.btnPos)
	 	$("#"+json.jQuery+" img").css({"height":h+"px","width":$(window).width()})
	}else{
		var w = parseInt($("#"+json.jQuery+" img").css("border-left"))+parseInt($("#"+json.jQuery+" img").css("border-right"))
	    var h =parseInt(parseInt(o.imgWidth)/($("#"+json.jQuery+" img").width()/$("#"+json.jQuery+" img").height()))
		$("#"+json.jQuery).css('height',h+"px");
		o.allBtn.parent().css(o.btnPos)
	 	$("#"+json.jQuery+" img").css({"height":h+"px","width":o.imgWidth-w+"px"})
		
	}
	//自动播放
	if(o.autoPlay){
	  autoPlay()
	}
	//划过显示第几张
	imgBtn()
	function autoPlay(){
		o.objImg = setInterval(function(){
		 		o.num++;
				if(o.num>=o.liBox.children().length){
					o.num=0
				}
				play(o.liBox,o.num,o.allBtn)
		},o.settime)
	}
	
	function imgBtn(){
       o.allBtn.each(function(index, element) {
			$(this).click(function(){
				 clearInterval(o.objImg);
				 o.num = index;
				 play(o.liBox,index,o.allBtn,function(){
				   	o._objImg = setTimeout(autoPlay,o.ClickBackSpeed)
				});
			})
       });
	}
	
	//判断是否存在上下按钮
	if(o.prev.length>0&&o.next.length>0){
		prevNext(o.prev,-1)
		prevNext(o.next,1)
	}
	//点击按钮切换幻灯片
	function prevNext(btn,num){
		btn.click(function(){
			clearInterval(o.objImg);
			if(o.onOff){
			  num<0?o.num--:o.num++;
				if(o.num<0){
				   o.num=o.liBox.children().length-1
				}
				if(o.num>o.liBox.children().length-1){
			       o.num=0
				}
				play(o.liBox,o.num,o.allBtn,function(){ 
				   	o._objImg = setTimeout(autoPlay,o.ClickBackSpeed)//切换图片后设置时间再次自动切换
				});
			} 
		})
	}
    function play(liBox,num,allBtn,CallBack){
		if(o.onOff){
		    o.onOff = false;
			//判断动画效果
			switch(o.movement){
			   case "slide":
			        liBox.animate({left:-parseInt(o.imgWidth)*num+"px"},o.speed,"linear",function(){sports()})
					break;
			   case "fadeinout":
			        liBox.animate({opacity: '0.5'},o.speed,function(){
					   $(this).css({left:-parseInt(o.imgWidth)*num+"px"})
					   $(this).animate({opacity: '1'},o.speed,"linear",function(){sports()})
					})
					break;
			}
			function sports(){
			   clearInterval(o._objImg)
			   o.onOff = true
			   if(o.autoPlay){
				  CallBack&&CallBack()
			   }	
			}
            allBtn.removeClass("on")
		    allBtn.eq(num).addClass("on")			
		}
    }
}
//幻灯片结束

//划过边框变色
$(function(){
  $(".overborder").children().on("mouseover",function(){
	  $(".overborder").children().removeClass("on");
	  $(this).addClass("on");  
  });
  $(".overborder").children().on("mouseout",function(){
	  $(".overborder").children().removeClass("on");
  });
})

//地址显示隐藏
$(function(){
 
 $(".management").each(function(a, b) {
	 var attr = this
	bgadress()
	$(".Modify",attr).each(function(index, element) {
		var num =index;
		 $(this).on("click",function(){
			 var that = $(this)
			 $("#ModifyBox",attr).show();
			 $(".Modify",attr).each(function(index1, element) {
				 $("#ModifyBox",attr).removeClass("ModifyBox"+index1);
			 })
			 $("#ModifyBox",attr).addClass("ModifyBox"+index)
				 intext($(".ModifyBox"+index,attr),".people",4,$(this),index);
				 intext($(".ModifyBox"+index,attr),".Warehouse",0,$(this),index);
				 intext($(".ModifyBox"+index,attr),".DelAddress",0,$(this),index);
				 intext($(".ModifyBox"+index,attr),".PostalCode",5,$(this),index);
				 intext($(".ModifyBox"+index,attr),".MobilePhone",5,$(this),index);						 
				 intext($(".ModifyBox"+index,attr),".telephone",5,$(this),index);
		    bgadress()						 
		 })
	});
	function intext(obj,className,num,_this,index){
			 if(index!=0){
				 if(_this.parents("p").find(className).html()!=null){
					 obj.find(className).val(_this.parents("p").find(className).html().substring(num))
				 }
			  }else{
				obj.find(className).val("")
			  }
	}

	$(".b_lvs",attr).find("input[type='radio'][name!=default]",attr).on("click",function(){
		$("#ModifyBox",attr).hide();
		$(".b_lvs",attr).find("input[type='radio'][name!=default]",attr).attr('checked',false);
		$(this).attr('checked',"checked")
			bgadress()
	})
	//判断是否有背景
	function bgadress(){
		$(".b_lvs",attr).each(function(index, element) {
            if($(this).find("input[type='radio'][name!=default]",attr).attr('checked')!=null){
		         $(this).addClass("lvs")
				 $(this).find("span.relative").show();
			}else{
		         $(this).removeClass("lvs");
				 $(this).find("span.relative").hide();
		    }
			 
			$(this).on("mouseover",function(){
				$(this).find("span.relative").show();
		 	})
			$(this).on("mouseout",function(){
				if($(this).find("input[type='radio'][name!=default]").attr('checked')!='checked'){
			      	$(this).find("span.relative").hide()
				}
		 	})	
        });
	}
	
});
});
   

//调查器点击增加删除
function surdce(obj,n,type,m){
	var inputName = "surveyDto.questionDto.option";
	var count = $("#areabox1").children().length;
	var obtn = null;
	var num = 0;
	//预览
	var preview = $("#hiddenarea").html();
	var prevsec = $("#prevsec").html()
	var prevsec1 = $("#prevsec1").html()
	//增加问题
	var newhtml = $("#areabox").html()
	var box = $("#areabox1")
	//增加选项
	var thehtml = $("#areasec").html()
obj.on("click",function(){
    var that = $(this)
    //增加新选项
	if(type == "text"){
	    var box1 = $(this).parent().prev();
	     num = box1.children().length
		if(num<n){
		     box1.append(thehtml)
			 var mn = $(this).parents("ul").attr("id").substring(2);
			 $("#obssec"+mn).append(prevsec);
			 $("#obssec1"+mn).append(prevsec1);
			 $(".selectval"+mn).append('<option value="'+(num+1)+'">最多选'+(num+1)+'项</option>');
			 box1.children().last().find("input").attr("name",inputName+(num+1));
			 $("#hideinput"+mn).children().first().remove();
			 box1.children().last().find("input").addClass("induty"+mn)
			 $("#obssec"+mn).last().find("span").addClass("duty"+mn)
			 box1.children().each(function(index, element) {
				 $(this).find("strong").html(index+1);
		     });
			 $("#obssec"+mn).children().each(function(index, element) {
				 $(this).find("strong").html(index+1);
		     });
		 }
		 for(var i=0;i<20;i++){
		   textcount("txtCon"+i);
		 }
	}
	//增加新问题
	if(type == "area"){
		    count++
	        num = box.children().length;
		 if(num<n){
	        box.append(newhtml);
			listprev= $("#list_numb");
			listprev.append(preview)
			box.children().last().attr("id","aa"+count);
			listprev.children().last().attr("id","bb"+count);
			box.children().each(function(index, element) {
                 $(this).find("font").html(index+1);
                 $(this).find(".listtext input").addClass("induty"+$(this).attr("id").substring(2));
                 $(this).find(".listtext").attr("id","aa1"+$(this).attr("id").substring(2))
                 $(this).find(".tro input").addClass("trouble"+$(this).attr("id").substring(2));
				 $(this).find(".Addcolumn input").addClass("adda"+$(this).attr("id").substring(2))
				 $(this).find("li.reward .seccont").addClass("selectval"+$(this).attr("id").substring(2))
				 $(this).find("li.hideyu").attr("id","hideinput"+$(this).attr("id").substring(2))
            });
			//
			listprev.children().each(function(index, element) {
                 $(this).find("font").html(index+1);
                 $(this).find("li.fl span").addClass("duty"+$(this).attr("id").substring(2));
                 $(this).find("ul li.fl").attr("id","obssec"+$(this).attr("id").substring(2));
                 $(this).find("ul li.fr").attr("id","obssec1"+$(this).attr("id").substring(2));
                 $(this).find("p.tlb span").addClass("trob"+$(this).attr("id").substring(2));
                 $(this).find("p.tlb a").addClass("maxsec"+$(this).attr("id").substring(2));
            });
			surdce($(".adda"+count),m,"text");
		 }
		 surbtn(count)
		 for(var i=0;i<20;i++){
		    textcount("txtCon"+i);
		 }
	 }
		 //如果已经增加至第n题，置灰按钮
		 if(num>=n-1){
			 $(this).parent().hide();
			 num=n-1;
		  };
		 delsmallbox()
		 delbigbox()
})
	//问题删除操作
	delbigbox()
	function delbigbox(){
	   $(".delnew").on("click",function(){
			obtn = $(this).parents("ul"); className ="font"; 
			obtn.animate({height:0,marginTop:0,marginBottom:0,paddingTop:0,opacity:0},400,function(){
				var docthis = $(this);
				listprev = $("#list_numb");
				listprev.children().eq(ulindex($(this),docthis)).remove();
				$(this).remove();
				box.children().each(function(index, element) {
					$(this).find(className).html(index+1);
				});
				listprev.children().each(function(index, element) {
					$(this).find(className).html(index+1);
				})
		   });
		   if($("#list_numb").children().length<n+1){
			   $(".newproblem").parent().show();
			}
	   });
	}
	//选项删除操作
	delsmallbox()
	function delsmallbox(){
		$(".surdel").on("click",function(){
			  obtn = $(this).parent(); className ="strong";
			  var par = null
				obtn.animate({height:0,marginTop:0,marginBottom:0,paddingTop:0,opacity:0},400,function(){
					var docthis = $(this);
					listprev = $("#obssec"+$(this).parents("ul").attr("id").substring(2));
					$(".selectval"+$(this).parents("ul").attr("id").substring(2)).children().last().remove();
					$("#hideinput"+$(this).parents("ul").attr("id").substring(2)).children().first().before('<input type="text" name="'+inputName+$("#aa1"+$(this).parents("ul").attr("id").substring(2)+"").children().length+'">')
					if($("#aa1"+$(this).parents("ul").attr("id").substring(2)+"").children().length==5){
						$("#hideinput"+$(this).parents("ul").attr("id").substring(2)).html('<input type="text" name="'+inputName+$("#aa1"+$(this).parents("ul").attr("id").substring(2)+"").children().length+'">')
					}
					listprev.children().eq(ulindex($(this),docthis)).remove();
					$("#obssec1"+$(this).parents("ul").attr("id").substring(2)).children().eq(ulindex($(this),docthis)).remove()
					par = $(this).parent();
					$(this).remove();
					par.children().each(function(index, element) {
						$(this).find(className).html(index+1);
						$(this).find("input").attr("name",inputName+(index+1));
					})
					listprev.children().each(function(index, element) {
						$(this).find(className).html(index+1);
					})
			   });
			   //判断按钮是否置灰
			   if($(this).parent().parent().children().length < n+1){
				   $(".adda"+$(this).parents("ul").attr("id").substring(2)).parent().show();
			   }
		})	
	}
}
//
//加载页面默认生成对应预览内容
$("#areabox1").children().each(function(index, element) {
	 if($("#list_numb").html()==""){
		$("#list_numb").html($("#hiddenarea").html())
	 }else{
		$("#list_numb").append($("#hiddenarea").html())
	 }
});
$("#list_numb").children().each(function(index, element) {
   $(this).attr("id","bb"+(index+1));
   $(this).find("font").html(index+1)
   $(this).find("li.fl").attr("id","obssec"+(index+1))
   $(this).find("p.tlb span").addClass("trob"+(index+1))
   $(this).find("li.fl span").addClass("duty"+(index+1))
   $(this).find("li.fr").attr("id","obssec1"+(index+1))  
   $(this).find(".maxsec1").attr("class","maxsec"+(index+1))     
});
$("#areabox1").children().each(function(index, element) {
	 $("#aa1"+(index+1)).children().each(function(index1, element) {
		   if($(".selectval"+(index+1)).children().length-1<index1){
				$(".selectval"+(index+1)).append('<option value="'+(index1+1)+'">最多选'+(index1+1)+'项</option>');
				$("#obssec"+(index+1)).append('<p><input type="radio" disabled="disabled" >\
				<label><strong>'+(index1+1)+'</strong>. <span class="duty'+(index+1)+'"></span></label></p>');
				$("#obssec1"+(index+1)).append($("#prevsec1").html())
		   }
	 });
	 $(".selectval"+(index+1)).children().eq($(".selectval"+(index+1)).attr("defaultValue")-1).attr("selected",true);
});

//返回兄弟节点的位置
function ulindex(obj,that){
	var len = 0
    obj.parent().children().each(function(index, element) {
		if(that.html()==obj.parent().children().eq(index).html()){
			len = index
		}
	});	
	return len
}

//预览
$(".reward input[type=radio]").on("click",function(){
    if($(this).val()==0){
	   $(".rewardbox table").hide()	
	   $(".rewardbox .name").html($(this).next().html())
	}else{
	   $(".rewardbox table").show()
	   var ls =$(this).next().html()=="体验宝"?"tyb":"msjf"
	   $(".rewardbox .name").html("<span class='"+ls+"'></span>"+$(this).next().html())
	}
})
surbtn($("#areabox1").children().length);
function surbtn(count){
   $("#SurDevBox .Abstract").parent().css('position',"relative");
   $(".surbtn").on("mousedown",function(){
	    //获取主题的值
	    $("#SurDevBox .theme").html($(".intheme").val());
	    //获取摘要的值
		$("#SurDevBox .Abstract").html($('.inAbstract').val());
	    //获取品牌名称的值
		$("#SurDevBox .brand").html($('.inbrand').html());
		//获取奖励的数量
       if($(".reward input[type=radio]:checked").val()==1||$(".reward input[type=radio]:checked").val()==2){
			$(".name_a").html($("#rewardbox td.name").html());
	    	$(".am_a_1").html($(".am_a1").val());
	    	$(".am_a_2").html($(".am_a2").val());
			$(".name_a").parent().show();
		}else if($("#rewardbox td.name").html()=="无"){
			$("#rewardbox input").val("");
		   	$(".name_a").parent().hide();
		}
	    //获取问题及选项的值
		for(var i=1;i<=count;i++){
			if($("#SurDevBox .trob"+i)&&$('.duty'+i)&&$('.induty'+i)){
			   $("#SurDevBox .trob"+i).html($('.trouble'+i).val());
			   $('.duty'+i).each(function(index, element) {
				  $('.duty'+i).eq(index).html($('.induty'+i).eq(index).val());
			   });
			}
	    }
		//获取最多选几项
		for(var i=0;i<=count;i++){

		   var htmlsec = ['单选','最多选2项','最多选3项','最多选4项','最多选5项']
		   $(".selectval"+(i+1)).children().each(function(index, element) {
                if($(".selectval"+(i+1)).val()==index+1){
		   	       $('.maxsec'+(i+1)).html(htmlsec[index])
			       //单选时，改为单选按钮，多选时改为多选按钮
				   if(index==0){
				       $('#obssec'+(i+1)+' input').each(function(index, element) {
							$(this).after('<input type="radio" value="'+index+'" disabled="disabled" \>').remove();
					   });
				   }else{
					    $('#obssec'+(i+1)+' input').each(function(index, element) {
							$(this).after('<input type="checkbox" value="'+index+'" disabled="disabled" \>').remove();
					   });
				   }
		       }
           });
		}
		//获取调查周期的值
	    if($("#inunitper").length>0){
	    	$("#unitper").html($("#inunitper").children().eq($("#inunitper").val()).html())
	    }
	   //调查结果显示
	   $('li.surveyresult input[id=surv]').each(function(index, element) {
           if($('li.surveyresult input[id=surv]').eq(index).attr("checked")){
			  $('li.surveyresult input[name=surveyresult]').eq(index).attr({checked:true,disabled:false})  
		   } 
       });
   });
}

//选择品牌-字母加载更多效果
$(function(){
//默认状态下加载更多
	function loadbrand(n,obj,num){
	//默认
	if(num==1){
		obj.children().each(function(index, element) {
			index<=n-1?$(this).show():$(this).hide();			//默认加载n个字母
			loadbrand(1,$(this),2);								//每个字母显示1行//加载全部时按钮隐藏
		});
	}
	//单字母
	if(num==2){
		var m = 0;
		obj.children().last().children().each(function(index, element) {
			m =Math.floor(index/5);
			if(m<=n-1){											//默认显示n行品牌
				obj.children().last().children().eq(index).show()
			}else{
				obj.children().last().children().eq(index).hide();
			}
																//加载全部时按钮隐藏
			if(obj.children().last().children().length/5<=n)$("#more_click1").hide();
		});
		$("#more_click1").on("click",function(){				//点击加载n行品牌
			loadbrand(n+6,obj,num);
		})
	}
}
loadbrand(0,$("#oBrand"),1);
Letteron()
//判断字母是否能点击
function Letteron(){
	var LetterArr = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26];//字母容器
	$("#oButn").children().each(function(index,element) {

		var that = $(this);
		$("#oBrand").children().each(function(index1,element1) {
			if(that.html()==$(this).children().first().html()&&index!=0){
				LetterArr[index] = that.html();//数据中显示该字母赋值给容器，不显示的字母，赋值为空；
			}
		});
		$(this).on("click",function(){
		    $(".nofound").hide();
		})
	});
	//循环26个字母
	for(var i=1;i<LetterArr.length;i++){
		//给不可点击的字母添加class'nopointer'
		if($("#oButn").children().eq(i).html()!=LetterArr[i]){
			$("#oButn").children().eq(i).removeClass().addClass("nopointer")
		}
		//选择字母显示品牌
		if($("#oButn").children().eq(i).attr("class")!="nopointer"){ //排除可以点击的字母
			$("#oButn").children().eq(i).addClass("keep")
		}
	}
	$(".keep").each(function(index, element) {
		 $(this).on("click",function(){
			var _this = $(this);
			$("#oButn").children().removeClass("on"); //清空所有可以点击字母的class
			$(this).addClass("on"); //当前点击添加class
			$("#oBrand").children().each(function(index, element) { //遍历显示的字母，选项卡
				if($(this).children().first().html()== _this.html()){
					$("#oBrand").children().hide();
					$(this).show();
					$("#more_click").hide();
					$("#more_click1").show();
					if($(this).css('display')!="none"){//判断点击字母 控制对应的 内容默认显示6行
						loadbrand(6,$(this),2);
					}
				}
			});
			
		});
        
    });
	
}
})

/*判断select下拉框是否选择*/
function selectOk(obj){
	if(obj.get(0).tagName == "SELECT"){
		 if(obj.val()=="selected"||obj.val()==""){
			 obj.parent().find(".textError").fadeIn(150);
			 obj.parent().find(".textError").html(obj.parent().find(".textError").attr("data-val"))
		 }else{
			obj.parent().find(".textError").hide();
		 }	
	 }
}


//设计快递单模板
function SetList(objbox,dropBox){
    var check = varobj(objbox);
	var drop = varobj(dropBox);
	 check.find('input').each(function(index,element){
		 if($(this).attr("checked")=='checked'){
		     drag("drag"+index,"h2","coor"+index);
		 }
		 $(this).on("click",function(){
			 if($("#drag"+index).length==0){
			    drop.append("<div id='drag"+index+"' name='"+$(this).attr("name")+
"'><h2 onselectstart='return false;'>"+$(this).next().html()+"</h2><p class='coor' id='coor"+index+"'></p></div>")
				$("#drag"+index).css({top:(Math.floor(index/7)*30)+"px",left:(90*(index%7))+"px",position:"absolute"});
				drag("drag"+index,"h2","coor"+index);
				
			 }else{
			    $("#drag"+index).remove();
			 }
			  
		 })
	 })
}
function varobj(obj){
	 var object = typeof obj=="string"?$(obj):obj;
	 return object
}

//拖拽移动放大缩小功能
function drag(box,obj,tuo){
	var oDiv=document.getElementById(tuo);
	var oDiv2=document.getElementById(box);
	var h2=oDiv2.getElementsByTagName(obj)[0];
	var mouseStart={};
	var divStart={};
	var rightStart={};
	var bottomStart={};
	//往右同时往下拽
	oDiv.onmousedown=function(ev){
		var ev=ev||event;
		mouseStart.x=ev.clientX;
		mouseStart.y=ev.clientY;
		divStart.x=oDiv.offsetLeft;
		divStart.y=oDiv.offsetTop;
		if(oDiv.setCapture){
			oDiv.onmousemove=doDrag;
			oDiv.onmouseup=stopDrag;
			oDiv.setCapture();
		}
		else{
			document.addEventListener("mousemove",doDrag,true);
			document.addEventListener("mouseup",stopDrag,true);
		}
	};
	function doDrag(ev){
		var oEvent=ev||event;
		var l=oEvent.clientX-mouseStart.x+divStart.x;
		var t=oEvent.clientY-mouseStart.y+divStart.y;
		var w=l+oDiv.offsetWidth;
		var h=t+oDiv.offsetHeight;
		if(w<oDiv.offsetWidth){
			w=oDiv.offsetWidth;
		}
		else if(w>document.documentElement.clientWidth-oDiv2.offsetLeft){
			w=document.documentElement.clientWidth-oDiv2.offsetLeft-2;
		}
		if(h<oDiv.offsetHeight){
			h=oDiv.offsetHeight;
		}
		else if(h>document.documentElement.clientHeight-oDiv2.offsetTop){
			h=document.documentElement.clientHeight-oDiv2.offsetTop-2;
		}
		oDiv2.style.width=w+"px";
		oDiv2.style.height=h+"px";
	};
	function stopDrag(){
		if(oDiv.releaseCapture){
			oDiv.onmousemove=null;
			oDiv.onmouseup=null;
			oDiv.releaseCapture();
		}
		else{
			document.removeEventListener("mousemove",doDrag,true);
			document.removeEventListener("mouseup",stopDrag,true);
		}
	};
	//h2完美拖拽
	h2.onmousedown=function(ev){
		var oEvent=ev||event;
		mouseStart.x=oEvent.clientX;
		mouseStart.y=oEvent.clientY;
		divStart.x=oDiv2.offsetLeft;
		divStart.y=oDiv2.offsetTop;
		if(h2.setCapture){
			h2.onmousemove=doDrag3;
			h2.onmouseup=stopDrag3;
			h2.setCapture();
		}
		else{
			document.addEventListener("mousemove",doDrag3,true);
			document.addEventListener("mouseup",stopDrag3,true);
		}
	};
	function doDrag3(ev){
		var ev=ev||event;
		var l=ev.clientX-mouseStart.x+divStart.x;
		var t=ev.clientY-mouseStart.y+divStart.y;
		if(l<0){
			l=0;
		}else if(l>980-$(oDiv2).width()){
		    l=980-$(oDiv2).width()+'px';
		}else if(l>document.documentElement.clientWidth-oDiv2.offsetWidth){
			l=document.documentElement.clientWidth-oDiv2.offsetWidth;
		}
		if(t<0){
			t=0;
		}else if(t>$("#setimglist").height()-30){
		     t = $("#setimglist").height()-30+'px'
		}else if(t>document.documentElement.clientHeight-oDiv2.offsetHeight){
			t=document.documentElement.clientHeight-oDiv2.offsetHeight;
		}
		oDiv2.style.left=l+"px";
		oDiv2.style.top=t+"px";
	};
	function stopDrag3(){
		if(h2.releaseCapture){
			h2.onmousemove=null;
			h2.onmouseup=null;
			h2.releaseCapture();
		}
		else{
			document.removeEventListener("mousemove",doDrag3,true);
			document.removeEventListener("mouseup",stopDrag3,true);
		}
	}
};

function lasttime(obj,href,endfn){
	var i = 4;
	var intervalid;
	intervalid = setInterval(fun, 1000);
	function fun() {
		if (i == 1) {
			window.location.href = href;
			clearInterval(intervalid);
			endfn&&endfn();
		}
		document.getElementById(obj).innerHTML = i;
		i--;
	}
}


module.exports = {
	sqhover : function(model,obj,box){
		console.log(model);
		$(model).each(function(index, element) {
			var attr = this;
	        $(obj,attr).hover(function(){
				$(box,attr).show().stop().animate({height:"32px"},150)
			},function(){
				$(box,attr).stop().animate({height:"0"},150,function(){
				   $(box,attr).hide();
				})
			})
	    });
	},
	lasttime : function(obj,href,endfn){
		console.log(obj);
	}
}

});;
var newCommon = {
		//判断管理我的退货地址初始化默认选中
		thCheck:function(btn){
			$("input[name=reAdree]").attr("checked",false);
		    $("input[name=reAdree]").each(function(index){
				if(btn.prev().html()==$(this).next().children().last().html()){
				    $(this).attr("checked",true);
				}
			})
		}
		,//indexHeaderSearch 首页搜索选择搜索分类
		indexHeaderSearch:function(objid,boxid){
			 var obj = $('#'+objid),box = $('#'+boxid)
		     obj.on('mouseover',function(event){
				 event.stopPropagation();
				 var _this = $(this)
				 $(this).parent().next().show()
				 $(this),$(this).parent().css("border-radius","5px 5px 5px 0px")
				 $(this).parent().next().children().click(function(){
					   _this.html($(this).children().html())
				       box.hide();
				 })
			 })
			 obj.on('mouseout',function(){
				 $(this).parent().next().hide()
				 $(this),$(this).parent().css("border-radius","5px")
			 })
			 box.on('mouseover',function(event){
				 event.stopPropagation();
				 obj,obj.parent().css("border-radius","5px 5px 5px 0px")
				 $(this).show()
			 })
			 box.on('mouseout',function(){
				 $(this).hide()
				 obj,obj.parent().css("border-radius","5px")
			 })
			 
		},//AttentionMaxtp关注美试划过效果
		AttentionMaxtp:function(id,imgsrc1,imgsrc2){
			 var obj = $("#"+id)
		     obj.mouseover(function(){
				$(this).children().last().show()
				$(this).children().first().children().first().attr('src',imgsrc1)
				$(this).addClass(id)	 
			 })
			 obj.mouseout(function(){
				$(this).children().last().hide()
				$(this).children().first().children().first().attr('src',imgsrc2)
				$(this).removeClass(id)	 	 
			 })
		},
		poslert:function(mouseEvent,posset){
             Clickshow(
			 	{
					obj:posset["obj"],
					box:posset["box"],
					onOF:mouseEvent,
					grade:posset["grade"],
					left:posset["left"],
					top:posset["top"],
					oClose:posset["down"],
					cannel:posset["cannel"],
					beforeFn:posset['beforeFn']}
				)
	   },
	   //排序 处理同一个元素点击的不同的位置 触发不同的事件
	   areaCl:function(classNa,endfn){//排序按钮点击选择位置
		   $('.'+classNa).on('click',function(ev){
               Ev= ev || window.event; 
			   var name = $(this).attr('name');
			   var mousePos = mouseCoords(ev);
			    if(mousePos.y<($(this).offset().top+$(this).height()/2)){
				   endfn&&endfn(name,'top')
			    }else{
				   endfn&&endfn(name,'bottom')
			    }	
				function mouseCoords(ev){
				if(ev.pageX || ev.pageY){
				    return {x:ev.pageX, y:ev.pageY};
				}
				return{
					x:ev.clientX + document.body.scrollLeft - document.body.clientLeft,
					y:ev.clientY + document.body.scrollTop - document.body.clientTop
				};
				}
		   })
	   },
	   secCategory:function(opts){//选择类目 
		       function getsj(obj,ulclass){
					   $(".ulTwo").hide();
					   $(".ulThree").hide();
					   obj.children().each(function(index, element){
							 var _this=$(this)
							  ulclass.append("<li>");
							  ulclass.children().eq(index).html($(this).html())
						});
						ulclass.children().each(function(index1, element){
							  $(this).on("click",function(){
								   //重新生成需创建的li
									if($(this).parents("ul").hasClass("ulOne")){
								       //$(this).find("i").show();
									   $(".unfold ul").children().removeClass("on");			//清空li的class="on"
									   $(".unfold select").children().attr("selected",false);	//取消二级与三级的select的值
									   $(".ulTwo").html("");									//将二级UL子节点清空
									   $(".lm_search span").hide();								//当前选择类目
									   $(".lmone").show().html($(this).html());	
									   //开发加入访问数据代码  1级选项框
									   obj.children().attr("selected",false);
											obj.children().eq(index1).attr("selected","selected");//设置li对应的select  修改到这里 方便获取select当前选中值 
											//实现访问数据库 访问方式:Ajax 
											if(opts && opts.beforeFn){
										  		opts.beforeFn('.sec_one','.sec_two');
										  	}else{
										  		ajax_Category(".sec_one",".sec_two");										  		
										  	}
											//数据加载到下拉后再同步ul
									   getsj($(".sec_two"), $(".ulTwo"));//创建二级ul子节点个数与二级select子节点个数对应
									}else{
										ulclass.children().removeClass("on");				    //控制清空当前点击ul中的li的class="on"
									}
									if($(this).parents("ul").hasClass("ulTwo")){
									   //$(".unfold ul.ulTwo").find("i").hide();
								       //$(this).find("i").show();
										$(".ulThree").children().removeClass("on").end().html("");      //清空三级ul中的li的class="on"
										$(".sec_three").children().attr("selected",false);      //取消三级的select的值
										$(".lmthree").hide();									//当前选择类目
										$(".lmtwo").show().last().html($(this).html());
										//开发加入访问数据代码  2级选项框  
										obj.children().attr("selected",false);
											obj.children().eq(index1).attr("selected",
													"selected");
											//实现访问数据库 访问方式:Ajax
											if(opts && opts.beforeFn){
												opts.beforeFn('.sec_two','.sec_three');
										  	}else{
										  		ajax_Category(".sec_two",".sec_three"); 										  		
										  	}											
											//数据加载到下拉后再同步ul 
										getsj($(".sec_three"), $(".ulThree"))//创建三级ul子节点个数与三级select子节点个数对应
										
									}else{
										ulclass.children().removeClass("on");					//控制清空当前点击ul中的li的class="on"
									}
									if($(this).parents("ul").hasClass("ulThree")){
									   //$(".unfold ul.ulThree").find("i").hide();
								       //$(this).find("i").show();
										$(".lmthree").show().last().html($(this).html());
									}
				
									$(this).addClass("on");										//当前点击的li的class="on"
									obj.children().attr("selected",false).eq(index1).attr("selected","selected");	//清空当前点击ul对应的select的值
										//设置点击li对应的select得知
									//以下控制显示隐藏
									$(".ulOne").show()
									if($(".ulOne").children().hasClass("on")){
										$(".ulTwo").show();
									}
									$(".ulTwo").children().hasClass("on")?$(".ulThree").show():$(".ulThree").hide();
							  sortoption()
							  }) 
						  });
				    }
				    function nameul(tag){
					   return $(".unfold").append($("<ul id='"+tag+"' class='"+tag+"'></ul>"));
				    }
					//开发  加入ajax代码实现访问
					function ajax_Category(tj1,tj2){
						$.ajax( {
							type : "get",
							async : false,
							url : "queryCategory.htm",
							data : {id : $(tj1).find("option:selected").attr("value")},
							success : function(can) {//给二级下拉项添加代码,实现访问二级   
								var ajson = eval("("+can.toString()+")"); 
								var sec= $(tj2);
								sec.html(" "); //将二级多选项清空
								for ( var i = 0; i < ajson.length; i++) {
									sec.append("<option value='"+ ajson[i]["id"] + "'>"+ ajson[i]["name"] + "</option>");
								}
						    }
						});
					}
		       nameul("ulOne");
			   nameul("ulTwo");
			   nameul("ulThree");
			   //每次获取数据时从新赋值给ul值并重新生成需创建的标签
			   getsj($(".sec_one"),$(".ulOne"));
			   getsj($(".sec_two"),$(".ulTwo"));
			   getsj($(".sec_three"),$(".ulThree"));
			   function sortoption(){
						$(".unfold").each(function() {
							var attr = this;
							$("ul",this).each(function(index, element) {
								$(this).children().each(function(n,o) {
									 $("select",attr).eq(index).children().eq(n).html($(this).html()).attr("selected",false);
									 if($(this).hasClass("on")){
										 $("select",attr).eq(index).children().eq(n).attr("selected",true);
									 }
								});
							});
						});
				}

	   },//旗子备注划过效果
	   onflag:function(){
		 // var ishave = $('.redPf'),isnone = $('.noPf');
		  $(arguments).each(function(index, element) {
              $(this).on('mouseover',function(){
				  if(!$(this).hasClass("noPf")){
						$(this).children().show(); 
				  }
			  })
			   $(this).on('mouseout',function(){
					$(this).children().hide(); 
			  })
          });
	   },
	   InitializeFlag:function(box,This){
				  var flagColor = ['redPf','yellowPf','greenPf','bluePf','purplePf']
				  var dx = This.attr('class').split(' ')[This.attr('class').split(' ').length-1]
				  if(arrIndex(dx,flagColor)!=-1){
					box.find("input[type=radio]").eq(arrIndex(dx,flagColor)).attr("checked",true);
					box.find('textarea').val(This.find('p').html());
				  }else{
					   box.find("input[type=radio]").eq(0).attr('checked',true);
					   box.find('textarea').val("");
				  }
				  box.find('input[type="radio"]').on("click",function(){
					  $(this).attr('checked',true);
				  })
	   },//小旗子确定事件操作
	   getflag:function(box,obj,mask){
			   var flagColor = ['redPf','yellowPf','greenPf','bluePf','purplePf']
			      obj.children().html("<p>"+box.find('textarea').val()+"</p>")
				   box.find('input[type="radio"]').on("click",function(){
					   box.find('input[type="radio"]').attr('checked',false);
					   $(this).attr('checked',true);
					   newCommon.onflag($(".okPf"));  
				   })
				   box.find('input[type="radio"]').each(function(index, element){
						if(box.find('input[type="radio"]').eq(index).attr('checked')=="checked"){
							 obj.removeClass().addClass('okPf '+flagColor[index]);
						}
				   });
				   
	   },//各行变色
	   addGhbs:function(obj,tagName,style){
	       $(obj).each(function(){
			    var attr = this;
					$(tagName,attr).each(function(index, element) {
						if((index+1)%2!=0){
						$(this).addClass(style)
					}
                });
				
		   })
	   },
	   adress:function(obj){
		obj.each(function(index, element) {
			$(this).on("click",function(){
				fz($(this),".people",4)
				fz($(this),".MobilePhone",5)
				fz($(this),".telephone",5)
				fz($(this),".PostalCode",5)
				fz($(this),".DelAddress",0)
				var province = $(this).parents("div.message").find(".province").attr("name")
				var city = $(this).parents("div.message").find(".city").attr("name")
				var county = $(this).parents("div.message").find(".county").attr("name")
			    $("#hidorderid").val($(this).parents("div.message").find("input").val());   
				_init_area_sc("prov1","city1","county1",province,city,county);
				
			})
			
			
		});
		function fz(obj,className,num){
				//$("#siteChange").find(className).val(obj.parents("div.message").find(className).html().substring(num))
			var content=obj.parents("div.message").find(className).html();
			if(null !=content && "" !=content)
			{
				$("#siteChange").find(className).val(obj.parents("div.message").find(className).html().substring(num))
				
			}
		} 
	   },//验证页面表单
	   effectHtml:function(btn,finaly){
	       btn = typeof btn == "object"?btn:$(btn);
		   btn.off("click",null);
		   //初始化获得焦点效果
		   focusandblur(finaly["box"],'input[type=text]',1);
		   focusandblur(finaly["box"],'input[type=password]',1);
		   focusandblur(finaly["box"],'textarea',0);
		   newCommon.password( elem(finaly["pwd1"]), elem(finaly["pwd2"]),true);
		   function focusandblur(box,must,num){
			     $(box+" "+must).each(function(index, element) {
				 	 var obj = $(this).parent().find(".textError");
					 $(this).on("focus",function(){
					 	var This = this
						 if(!finaly['onfocus']&&num==1){
						 	$(this).parent().removeClass("oncaps").addClass("ongreen");
						 	setTimeout(function(){
						 		if(obj.html()){
				    		    	 obj.removeClass("yellow").addClass("green").html(obj.attr("data-val")).fadeIn(0);
				    			}
						 	},1)
						  }
						 endcount($(this))//获得焦点时提示字符
						 inputCount(this)//按下键盘时提示字符数
					 });
				     $(this).on("blur",function(){
				     	var attr = this
				     	setTimeout(function(){
				     		nomust($(attr),null,finaly["inputText"])
				     	},1)
				     	  
					 });
			    });
		   }
		   //判断点击是否通过验证
		   function Condition(){
		   	   var must = newCommon.must(finaly["box"]+" .mustVal");//至少上传一张图片
			   var least = newCommon.least(finaly["box"]+" .mustVal",finaly['checkImg']);//至少上传一张图片
			   var radio = newCommon.Radioeffect(finaly["box"]+" .mustVal");//单选验证
			   var sel = newCommon.seleffect(finaly["box"]+" select.mustVal",finaly["selText"]);//下拉验证
			   var same = newCommon.password( elem(finaly["pwd1"]), elem(finaly["pwd2"]));//再次输入密码 是否一直

			   var textPass = newCommon.inputnomust(finaly["box"],finaly["inputText"],"input[type=password]",finaly['keydown']);
			   var textArea = newCommon.inputnomust(finaly["box"],finaly["inputText"],"textarea",finaly['keydown']);
 			   var textInput = newCommon.inputnomust(finaly["box"],finaly["inputText"],"input[type=text]",finaly['keydown']);
 			   var typehidden = newCommon.inputnomust(finaly["box"],finaly["inputText"],"input[type=hidden][check='true']",finaly['keydown']);
 			// 闫晓芳 针对公司一般纳税人类型
			  if($(finaly['box']).find("#taxpayerBox").css("display")=="none"){
				  if(same&&textInput&&typehidden&&textArea&&sel&&textPass){
				    finaly["ok"]&&finaly["ok"]();	//通过验证
			   }else{
					newCommon.least(finaly["box"]+" .mustVal",finaly['checkImg'],true);
					newCommon.Radioeffect(finaly["box"]+" .mustVal",true);
					newCommon.seleffect(finaly["box"]+" .mustVal",finaly["selText"],true);
				    newCommon.password( elem(finaly["pwd1"]), elem(finaly["pwd2"]),true);
				    $(finaly["box"]+" input.mustVal.empty").each(function(index,element){
				    	if($(this).val()==""){
				    		finaly['empty']&&finaly['empty']()
				    		return false;
				    	}
				    })
				  
			   }
				  
				  
				  
				}else{
			   if(same&&textInput&&typehidden&&textArea&&must&&least[0]&&sel&&textPass){
					/*针对 美试后台--账户结算中心--赠送管理--美试赠送用户--单个赠送，赠送体验宝/积分，"赠送理由"非空判断问题*/
					if($("#reason")){
						var re=/^\s+$/,
							val=$("#reason").val();
							if(re.test(val)){
								return ;	
							}
					}
					finaly["ok"]&&finaly["ok"]();	//通过验证
			   }else{
					newCommon.least(finaly["box"]+" .mustVal",finaly['checkImg'],true);
					newCommon.Radioeffect(finaly["box"]+" .mustVal",true);
					newCommon.seleffect(finaly["box"]+" .mustVal",finaly["selText"],true);
				    newCommon.password( elem(finaly["pwd1"]), elem(finaly["pwd2"]),true);
				    $(finaly["box"]+" input.mustVal.empty").each(function(index,element){
				    	if($(this).val()==""){
				    		finaly['empty']&&finaly['empty']()
				    		return false;
				    	}
				    })
				  
			   }
				}
			   //跳到第一条错误信息提示的位置
			   $(".textError").each(function(index,element){
			  	  if($(this).css("display")!="none"&&getScrollTop()>($(this).offset().top-50)){
			  	  	window.scrollTo(0,$(this).offset().top-50);
			  	  	return false;
			  	  }
			  })
		   }
		   btn.on("click",function(){
			   Condition();
			   btn.blur();
		   })
	       /* 绑定键盘按下事件 
		   去掉回车键 提交表单事件  闫晓芳
		   $(document).keypress(function(e) { 
		       if(e.which == 13&&$("div[mask=mask]").length==0) {
		          btn.click(); 
		       } 
		   });
		   */ 
	       
	       
	  },//划过钻出效果
	   dril:function(obj){
		   obj.hover(
			     function(){
					$(this).children("img").siblings("p").show();
				    $(this).children("img").siblings("p").stop().animate({height:30+"px"},200);
				 },
				 function(){
				    $(this).children("img").siblings("p").stop().animate({height:0+"px"},200,function(){
					     $(this).hide()
					});
				 }
			 )   
	   
	   },//选中后文字加粗
	   textBold:function(obj){
	        obj.each(function(){
				$('input[type=radio]:checked',this).next().css({fontWeight:"bold"})	
				$('input[type=radio]',this).on("click",function(){
					$(this).parent().find("input[type=radio]").next().css({fontWeight:"400"})
				    $(this).next().css({fontWeight:"bold"})	
				})	
			})
 	   },//限制多选框最多选n项
       limitSel:function(obj,n){
	       obj = typeof obj == "object"?obj:$(obj);
		   obj.each(function(){
			   var attr = this
			   $('input[type=checkbox]',attr).on("click",function(){
			       if($('input[type=checkbox]:checked',attr).length>=n){
					   $('input[type=checkbox]',attr).attr("disabled",true);
					   $('input[type=checkbox]:checked',attr).attr("disabled",false);
				   }else{
					   $('input[type=checkbox]',attr).attr("disabled",false);
				   }
			   })   
		   })
	   },//登录提示大写锁定框
	   capsLock:function(obj,ts){
		       obj = typeof obj == "object"?obj:$(obj);
		       //ts = typeof ts == "object"?ts:$(ts);
			   function  detectCapsLock(event){
					var e = event||window.event;
					var o = e.target||e.srcElement;
					//var oTip = ts;
					var oTip = obj.parent().find(ts);
					var keyCode = e.keyCode||e.which; // 按键的keyCode 
					var isShift = e.shiftKey ||(keyCode == 16 )||false ; // shift键是否按住
					if (
					   ((keyCode >= 65 && keyCode <= 90) && !isShift) // Caps Lock 打开，且没有按住shift键 
					   || ((keyCode >= 97 && keyCode <= 122) && isShift)// Caps Lock 打开，且按住shift键
					){
						$(oTip).show();
					 }else{
						$(oTip).hide().parent().removeClass("oncaps")
					 } 
				}
				function  blurCapsLock(){
				    var oTip = obj.parent().find(ts);
					$(oTip).hide();
				}
				obj.on("keypress",detectCapsLock)
				obj.on("blur",blurCapsLock)
		  },//登录注册条件//账号管理 品牌入驻信息主账号信息（公司信息添加新资质）
	  addShb:function(json,n,fal){
		  $(json["box"]).each(function(index, element) {
               var attr = this;
			   var btn = $(this).next().children().first(); 
			   btn.off("click",null)
               btn.on("click",function(){
				  var num = $(attr).children().length
				  if(num<n){
					  $(attr).append($(json["html"]).html());
				  }
				  if(num==n-1){
					  btn.hide();
				  }
				  del(attr)
				  sorting();
				  if(fal){
				  	newCommon.addShb({box:".newShb",list:".Shblist",html:"#shbhtml",down:"i.iclose",sorting:".cxl",nameval:"name_h"},5,false);
				  }
		      });
			  del(attr)
			  sorting()
		      function del(attr){
				    $(json["down"],attr).on("click",function(){
						  $(this).parents(json["list"]).animate({height:0,padding:0,margin:0},function(){
							   $(this).remove();  
							   btn.show();
							   sorting();
						  }) 
						   
					 })   
			  }
			  function sorting(){
				  $(json["box"]).each(function(index, element) {
					  $(this).children().each(function(index1, element) {
						   $(this).find(json["sorting"]).html(index1+1)
					  });
				  });
			  }
		 }); 
	  },//纳税人选项显示隐藏
	  Taxpayer:function(fw,sel,box,text){
		    val = typeof sel == "object"?sel:$(sel);
		    obj = typeof box == "object"?box:$(box);
		    fw = typeof fw == "object"?fw:$(fw);
			obj.hide();
			fw.each(function(){
				var This = this
			   	$(sel,this).each(function(){
					var attr = this
					$(this).children().each(function(index, element) {
                        if($(this).val()==$(attr).val()&&$(this).html()==text){
						    $(box,This).show();
						}
                    });
					$(this).change(function(){
						   if($('option:selected',this).html()==text){
							   $(box,This).show();
						   }else{
								$(box,This).hide();	
						   }
					})
				})
			})
			
	  },//发货管理修改地址
	  selure:function (obj,box,arrnum){
	 	   $(arrnum).each(function(index, element) {
			    var attr = this
				$("input[type=radio]",$("#"+box+this)).each(function(a,b) {
					var This = $(this)
					var num = $(this).next().children().length
					$(this).next().children().each(function(n,o) {
                        if($(this).html()==$("#"+obj+attr).children().eq(n).html()){
							num--
						}
                    });
					num==0?This.attr("checked",true):This.attr("checked",false);
                });
				newCommon.lert("show",{obj:$(".reSelect"+attr),box:$("#"+box+attr),ok:function(o,b,t){
				    t.parent().next().html( b.find('input[type=radio]:checked').next().html())
				}})
           });
	  }
}



//选项卡
function setTab(name,cursel,n){
	for(i=1;i<=n;i++){
		var menu=document.getElementById(name+i);
		var con=document.getElementById("con_"+name+"_"+i);
		menu.className=i==cursel?"hover":"";
		con.style.display=i==cursel?"block":"none";
	}
}
//获取滚动条滚动的距离
function getScrollTop() {  
	var scrollPos;  
	if (window.pageYOffset) {  
		scrollPos = window.pageYOffset; 
	}  
	else if (document.compatMode && document.compatMode != 'BackCompat'){
		scrollPos = document.documentElement.scrollTop; 
	}  
	else if (document.body){
		scrollPos = document.body.scrollTop; 
	}   
	return scrollPos;   
}
function arrIndex(v,arr){
		     for(var i=0;i<arr.length;i++){
			     if(arr[i]==v){
			        return i
				 }	 
		     }
			 return -1
		  }
function minArr(arr){
   for(var i=0;i<=arr.length-1;i++){ 
     if(arr[i]!=0){
	  var count = arr[i];	 
	  break; 
	 }
   }
   for(var i=1;i<=arr.length-1;i++){ 
	   if(arr[i]<count&&arr[i]!=0){
		 count=arr[i]  
	   }
   }
   return count
}
//获取到到页面的绝对距离
function getPos(obj) {
		var pos = {left: 0, top: 0};
		while(obj) {
			pos.left += obj.offsetLeft;
			pos.top += obj.offsetTop;
			obj = obj.offsetParent;
		}
		return pos;
}

//点击按钮查看对象链接 btn点击的按钮 parent向父级寻找节点 inputLink 通过父级锁定跳转的链接
function lookLink(btn,parent,inputLink){
	var url = $(btn).parents(parent).find(inputLink).val();
	if(tyurl(url)){
	  $(btn).attr("href",url)[0].click();
	}else{
	  $(btn).attr("href","http://"+url)[0].click();
	}
}
//放大镜效果 
function glass(id){
   this.id = document.getElementById(id);
   if(this.id.getElementsByTagName('div')[0].className=="showImg"){
      this.showBox = this.id.getElementsByTagName('div')[0];
	  this.oImg = this.showBox.getElementsByTagName('img')[0];
   };
   this.oUl = this.id.getElementsByTagName('ul')[0];
   this.aLi = this.oUl.getElementsByTagName('li');
   this.oOl = this.id.getElementsByTagName('ol')[0];
   this.oLi = this.oOl.getElementsByTagName('li');
   if(this.id.getElementsByTagName('p')[0]){
	   this.aP = this.id.getElementsByTagName('p')[0];
	   this.aA = this.aP.getElementsByTagName('a');
	   this.aP.style.left = this.id.offsetLeft + "px";
       this.aP.style.top = this.id.offsetTop + this.id.offsetHeight - this.aP.offsetHeight + "px";
   };
   this.L = 0;
   this.T = 0;
   this.scaleX = 0;
   this.scaleY = 0;
   
};
glass.prototype.forli = function(){
	for(var i=0;i<this.aLi.length;i++){
		this.onmo(i);
	}
};
glass.prototype.onmo = function(that){
   var oSpan = this.aLi[that].getElementsByTagName("span")[0]||null;
   var oA = this.aLi[that].getElementsByTagName('a')[0];
   var This = this;
   this.aLi[that].onmouseover = function(ev){
	    if(oSpan===null)return;
	    oSpan.style.display = 'block';
		This.showBox.style.display = 'block';
	    This.oImg.src = oA.getAttribute('href');
		This.showBox.style.top = getPos(this).top+"px";
		This.showBox.style.left = getPos(This.id).left+This.id.offsetWidth+10+"px";
		This.distance(ev,that,oSpan);//初始化计算为止
	};
	this.aLi[that].onmouseout = function(){
	    if(oSpan===null)return;
	    oSpan.style.display = 'none';
		This.showBox.style.display = 'none';
	};
	this.aLi[that].onmousemove = function(ev){
		This.move(ev,that,oSpan);
	};
}
//初始化计算位置
glass.prototype.distance = function(ev,that,oSpan){
	if(oSpan===null)return;
	ev = ev || window.event;
	this.L = ev.clientX - this.aLi[that].offsetLeft - oSpan.offsetWidth/2;
	this.T = ev.clientY - this.aLi[that].offsetTop+getScrollTop()  - oSpan.offsetHeight/2;
	if(this.L<0){
		this.L = 0;
	}
	else if(this.L>this.aLi[that].offsetWidth - oSpan.offsetWidth){
		this.L = this.aLi[that].offsetWidth - oSpan.offsetWidth;
	}
	if(this.T<0){
		this.T = 0;
	}
	else if(this.T>this.aLi[that].offsetHeight - oSpan.offsetHeight){
		this.T = this.aLi[that].offsetHeight - oSpan.offsetHeight;
	}
	oSpan.style.left = this.L + 'px';
	oSpan.style.top = this.T+ 'px';
	this.scaleX = this.L/(this.aLi[that].offsetWidth - oSpan.offsetWidth);
	this.scaleY = this.T/(this.aLi[that].offsetHeight - oSpan.offsetHeight);
	this.oImg.style.left = - this.scaleX * ( this.oImg.offsetWidth - this.showBox.offsetWidth ) + 'px';
	this.oImg.style.top = - this.scaleY * ( this.oImg.offsetHeight - this.showBox.offsetHeight ) + 'px';	
}
//鼠标移动计算位置
glass.prototype.move =function(ev,that,oSpan){
	if(oSpan===null)return;
	this.distance(ev,that,oSpan);
}

//选项卡
glass.prototype.thisTab = function(){
    var This = this;
	for(var i=0;i<this.oLi.length;i++){



		this.oLi[i].index = i;
		this.oLi[i].onmouseover =function(){
			This.tabfn(this);
		}
	}
}
//选项卡
glass.prototype.tabfn = function(that){
	for(var i=0;i<this.oLi.length;i++){
	   this.aLi[i].style.display="none";
	   this.oLi[i].className = "";
	}
	this.aLi[that.index].style.display = "block";
	this.oLi[that.index].className = "on";
	//非放大镜代码
	//$(".selImg").hide();
	$(".selImg").css("z-index",00);
	$("#blk1").hide();
}  
//图片上下翻页
glass.prototype.prevNext = function(){
	var This = this;
	if(this.aA==null)return;
   	this.aA[0].onclick = function(){
		if(parseInt(getStyle(This.oOl,"left")) < 0 ){
	   	   This.oOl.style.left =  parseInt(getStyle(This.oOl,"left")) + parseInt(getStyle(This.oOl.parentNode,"width")) + "px";
		}
	}
	this.aA[1].onclick = function(){
		if(parseInt(getStyle(This.oOl,"left")) > -(This.oOl.children.length-5) * 62){
	   	   This.oOl.style.left =  parseInt(getStyle(This.oOl,"left")) - parseInt(getStyle(This.oOl.parentNode,"width"))+ "px";
		}
	}
}
//获取元素样式的值
function getStyle(obj, attr) {
	return obj.currentStyle?obj.currentStyle[attr]:getComputedStyle(obj, 0)[attr]; 
}
//放大镜创建对象
function magnifier(id){
    var id = new glass(id);
	id.forli();
	id.thisTab();
	id.prevNext();
}
//字符计算（汉字2，字母数字1）
function newGetByteLen(val,strlen){
		var len = 0,count = 0;
		for (var i = 0; i < val.length; i++) {
			var length = val.charCodeAt(i);
			if (length >= 0 && length <= 128){
				len += 1;
			}else{
				len += 2;
			}
			if(len<=strlen){
				count++
			}
		}
		return [len,count];
	}

/**
 * 字符串截取
 * @param val
 * @returns {String}
 */
function stringIndexOf(val,length){
	var value = val;
	var len = newGetByteLen(val,length);
	if(val.length>length){
		value = val.substring(0,len[1]);
		return value + "...";
	}else{
		return value
	}
	
}
/**
 *设置封面背景
 **/
function CoverFigure(id,className,n){//用户更换背景效果
      var obj = $('#'+id);
      if(typeof n == "number"){
		  obj.children().eq(n).addClass(className);
		  obj.children().eq(n).append("<div class='icon'></div>");
	  }
	  obj.children().each(function(index,element){
	      $(this).on('click',function(){
			  obj.children().removeClass(className);
			  $(this).addClass(className)
			  $('#'+id+" div.icon").remove();
			  $(this).append("<div class='icon'></div>")
		  }) 
		  $(this).on('mouseover',function(){
			  obj.children().removeClass("hover");
			  $(this).addClass("hover")  
		  })  
	  })
}


/**
 *
点击obj 显示box 参数：jQuery对象
 * 
 * */
function clickPos(obj,box){
	obj.on("click",function(event){
		event.stopPropagation();
		box.show();
	})
	box.on("click",function(event){
		event.stopPropagation();
		$(this).show();
	})
	$(document).on("click",function(){
		box.hide();
	});
}

function phone(obj){
	var result = true;
	if(mobilephone(obj.val())){
	   result = true;	
	}else{
	   obj.parent().find(".textError").html("请输入正确的手机号码").show();
	   result = false;
	}
   return result
}

	//获取元素class
function getByClass(oParent, tagName, className) {
	if(!oParent){return;}
	var aEls = oParent.getElementsByTagName(tagName);
	var arr = [];
	var re = new RegExp('(^|\\s)'+className+'(\\s|$)', 'i');
	for (var i=0; i<aEls.length; i++) {
		if (re.test(aEls[i].className)) {
			arr.push(aEls[i]);
		}
	}
	return arr;
}
//划过点击显示
//json变量：box(弹出框) - left(根据obj进行定位的left值) - top(根据obj进行定位的top值) - content(输出的内容，按需添加) - obj(被点击的对象) - oClose(关闭点击的对象) - onOF(判断属于哪一类型的方法)- 是否属于打分方法（默认为否）
function Clickshow(o){
	var con_op = { 
	    obj:o.obj||$('.lj_sq em'), 
		box:o.box||$('.wh_cont'), 
		oClose:o.oClose||$('.lj_sq em'),
	    left:o.left||0,
		top:o.top||0,
		onOF:o.onOF,
		grade:o.grade||false,
		t0:null,
		t1:null,
		t3:null,
		t4:null,
		beforeFn:o.beforeFn
		};
	
	
	if(con_op.content){
	   con_op.box.html('<p>'+con_op.content+'</p>');
	}
    if(con_op.onOF==true){//划过类, 划过obj 显示box 划出隐藏
	   con_op.obj.on("mouseover",function(event){
		     event.stopPropagation();
			 if(con_op.beforeFn){
				//yanxf
				con_op.beforeFn($(this));	
			}
			 
			 if(o.pos==null){
			 con_op.box.css({left:$(this).offset().left+con_op.left+"px",top:$(this).offset().top- con_op.box.height()-con_op.top+"px"});
			 }
			 clearTimeout(con_op.t0);
			 clearTimeout(con_op.t1);
			 con_op.t3=setTimeout(function(){
			   	con_op.box.fadeIn(150);
				$(".blk").hide();
			},300);
            o['cannel']&&o['cannel'](con_op.obj,con_op.box)
	   }) 
	   con_op.box.on("mouseover",function(event){
			event.stopPropagation();
			 clearTimeout(con_op.t0);
			 clearTimeout(con_op.t1);
			con_op.t4=setTimeout(function(){
			   	con_op.box.fadeIn(150);
			},300);
	   });
	   con_op.obj.on("mouseout",function(event){
			event.stopPropagation();
			 clearTimeout(con_op.t3);
			 clearTimeout(con_op.t4);
			con_op.t1=setTimeout(function(){
			   	con_op.box.hide();
			},300);
			
	   })
	   con_op.box.on("mouseout",function(event){
			event.stopPropagation();
			 clearTimeout(con_op.t3);
			 clearTimeout(con_op.t4);
			con_op.t0=setTimeout(function(){
			   	con_op.box.hide();
			},300);
	   })
	   
   }else if(con_op.onOF==false){//点击类，点击obj弹出box,点击document隐藏box
      //点击按钮显示
	  con_op.obj.each(function(index,element){
		 $(this).click(function(event){
		   event.stopPropagation();
		   $(".blk").hide();
		   var _this = $(this);
		   if(con_op.left!=undefined&&con_op.top!=undefined){
			   if($(window).height()+$(document).scrollTop()<getPos(this).top+con_op.box.outerHeight(true)){
				   con_op.box.css({left:getPos(this).left+con_op.left+"px",top:getPos(this).top- con_op.box.outerHeight(true)+"px"});
				}else{
			   	   con_op.box.css({left:getPos(this).left+con_op.left+"px",top:getPos(this).top- con_op.box.height()-con_op.top+"px"});
				};
			};
			if(typeof(con_op.beforeFn)=='function'){
				con_op.beforeFn(_this);
			}
			con_op.box.show();
			o['cannel']&&o['cannel'](con_op.obj,con_op.box)
			//打分函数参数为点击的按钮的索引值
		   if(con_op.grade){grade(index)};
	   }) ;
	  })
	   //点击关闭
	   con_op.oClose.click(function(event){
		    event.stopPropagation();
			con_op.box.hide();
	   })
	   con_op.box.click(function(event){
		    event.stopPropagation();
	   }) 
	   document.onclick = function(){
		      con_op.box.hide();
	   }
	   //以下为授权书效果
   }else if(con_op.onOF == "authoriz"){
	    con_op.obj.on('mouseover',function(){
		    $(this).children().first().show();
			this.style.position ='relative';
			$(this).children().first().css({position:'absolute',left:'35px',zIndex:'77'});
			con_op.obj.css({zIndex:'77'});
		}) ;
		con_op.obj.on('mouseout',function(){
			$(this).children().first().hide();
		}) ;
   };
};
//end


/*
 * 
 *相册插件 
 * 
 * */
function showAlbum(json){
	var o={ 
			leftBtn:json['leftbtn']||".towardLeft",
			rightBtn:json['rightbtn']||".towardRight",
			margin:json['margin']||20
		  }
	$(json['obj']).each(function(){
		 var num=0,maxNum=$(json['list'],attr).children().length-1;
		 var attr = this;
		 //按钮点击事件
		 $(o.rightBtn,attr).on("click",function(){
		 	  num++
		 	  num = prevnext(num)
		 	  
		 })
		 $(o.leftBtn,attr).on("click",function(){
		      num--
		 	  num =  prevnext(num)
		 })
		 //执行方法
		 function prevnext(num){
		 	if(num>maxNum){
		 		num = maxNum;
		 		json['maxfn']&&json['maxfn']();
		 	}
		 	if(num<0){
		 		num=0;
		 		json['minfn']&&json['minfn']()
		 	}
		 	$("ul",attr).animate({left:-json['scrollWidth']*num},json['settime'])
		 	return num
		 }
		 //控制样式
		 $(o.leftBtn,attr).css({marginLeft:o.margin})
		 $(o.rightBtn,attr).css({marginRight:o.margin})
	})
}

function reportHideShow(box,obj){
	$(box).each(function(){
   	   var attr = this;
   	   $(obj,this).hide();
   	   $(this).hover(function(){
   	   	   $(obj,this).show();
   	   },
   	   function(){
   	   	  $(obj,this).hide();
   	   })
   })
}

//划过显示阴影
function  hoverShaow(obj){
	$(obj).hover(function(){
		$(this).css("box-shadow","3px 3px 3px #ccc")
	},function(){
		$(this).css("box-shadow","")
	})
}
//无限左侧菜单展开收缩
function unlimit(obj){
	$(obj).find("li").each(function(){
	    $(this).on("click",function(event){
	  		event.stopPropagation();
			if($(this).children("ul").css("display")!="none"){
	 			if($(this).children("i").attr("class")=="bg2"){
	 				$(this).children("ul").stop().slideUp();
					$(this).children("i").attr("class","bg1")
				}else{
					$("#unlimit a").removeClass("textlv")
					$(this).children("a").addClass("textlv")
				}
			}else{
				if($(this).children("i").attr("class")=="bg1"){
				    $(this).children("ul").stop().slideDown();
					$(this).children("i").attr("class","bg2") 
	    		}else{
					$("#unlimit a").removeClass("textlv")
					$(this).children("a").addClass("textlv")
				}
	    	}
    	})
    })
}

//划过边框变色
$(function(){
	overaddon()
})
function overaddon(){
  $(".overborder").children().on("mouseover",function(){
	  $(".overborder").children().removeClass("on");
	  $(this).addClass("on");  
  });
  $(".overborder").children().on("mouseout",function(){
	  $(".overborder").children().removeClass("on");
  });
 }
//地址显示隐藏
$(function(){
 
 $(".management").each(function(a, b) {
	 var attr = this
	bgadress()
	$(".Modify",attr).each(function(index, element) {
		var num =index;
		 $(this).on("click",function(){
			 var that = $(this)
			 $("#ModifyBox",attr).show();
			 $(".Modify",attr).each(function(index1, element) {
				 $("#ModifyBox",attr).removeClass("ModifyBox"+index1);
			 })
			 $("#ModifyBox",attr).addClass("ModifyBox"+index)
				 intext($(".ModifyBox"+index,attr),".people",4,$(this),index);
				 intext($(".ModifyBox"+index,attr),".Warehouse",0,$(this),index);
				 intext($(".ModifyBox"+index,attr),".DelAddress",0,$(this),index);
				 intext($(".ModifyBox"+index,attr),".PostalCode",5,$(this),index);
				 intext($(".ModifyBox"+index,attr),".MobilePhone",5,$(this),index);						 
				 intext($(".ModifyBox"+index,attr),".telephone",5,$(this),index);
		    bgadress()						 
		 })
	});
	function intext(obj,className,num,_this,index){
			 if(index!=0){
				 if(_this.parents("p").find(className).html()!=null){
					 obj.find(className).val(_this.parents("p").find(className).html().substring(num))
				 }
			  }else{
				obj.find(className).val("")
			  }
	}

	$(".b_lvs",attr).find("input[type='radio'][name!=default]",attr).on("click",function(){
		$("#ModifyBox",attr).hide();
		$(".b_lvs",attr).find("input[type='radio'][name!=default]",attr).attr('checked',false);
		$(this).attr('checked',"checked")
			bgadress()
	})
	//判断是否有背景
	function bgadress(){
		$(".b_lvs",attr).each(function(index, element) {
            if($(this).find("input[type='radio'][name!=default]",attr).attr('checked')!=null){
		         $(this).addClass("lvs")
				 $(this).find("span.relative").show();
			}else{
		         $(this).removeClass("lvs");
				 $(this).find("span.relative").hide();
		    }
			 
			$(this).on("mouseover",function(){
				$(this).find("span.relative").show();
		 	})
			$(this).on("mouseout",function(){
				if($(this).find("input[type='radio'][name!=default]").attr('checked')!='checked'){
			      	$(this).find("span.relative").hide()
				}
		 	})	
        });
	}
	
});
});
//调查器点击增加删除
function surdce(obj,n,type,m){
	var inputName = "surveyDto.questionDto.option";
	var count = $("#areabox1").children().length;
	var obtn = null;
	var num = 0;
	//预览
	var preview = $("#hiddenarea").html();
	var prevsec = $("#prevsec").html()
	var prevsec1 = $("#prevsec1").html()
	//增加问题
	var newhtml = $("#areabox").html()
	var box = $("#areabox1")
	//增加选项
	var thehtml = $("#areasec").html()
obj.on("click",function(){
    var that = $(this)
    //增加新选项
	if(type == "text"){
	    var box1 = $(this).parent().prev();
	     num = box1.children().length
		if(num<n){
		     box1.append(thehtml)
			 var mn = $(this).parents("ul").attr("id").substring(2);
			 $("#obssec"+mn).append(prevsec);
			 $("#obssec1"+mn).append(prevsec1);
			 $(".selectval"+mn).append('<option value="'+(num+1)+'">最多选'+(num+1)+'项</option>');
			 box1.children().last().find("input").attr("name",inputName+(num+1));
			 $("#hideinput"+mn).children().first().remove();
			 box1.children().last().find("input").addClass("induty"+mn)
			 $("#obssec"+mn).last().find("span").addClass("duty"+mn)
			 box1.children().each(function(index, element) {
				 $(this).find("strong").html(index+1);
		     });
			 $("#obssec"+mn).children().each(function(index, element) {
				 $(this).find("strong").html(index+1);
		     });
		 }
		 initializeCount($("input"))
	     initializeCount($("textarea"))
	}
	//增加新问题
	if(type == "area"){
		    count++
	        num = box.children().length;
		 if(num<n){
	        box.append(newhtml);
			listprev= $("#list_numb");
			listprev.append(preview)
			box.children().last().attr("id","aa"+count);
			listprev.children().last().attr("id","bb"+count);
			box.children().each(function(index, element) {
                 $(this).find("font").html(index+1);
                 $(this).find(".listtext input").addClass("induty"+$(this).attr("id").substring(2));
                 $(this).find(".listtext").attr("id","aa1"+$(this).attr("id").substring(2))
                 $(this).find(".tro input").addClass("trouble"+$(this).attr("id").substring(2));
				 $(this).find(".Addcolumn input").addClass("adda"+$(this).attr("id").substring(2))
				 $(this).find("li.reward .seccont").addClass("selectval"+$(this).attr("id").substring(2))
				 $(this).find("li.hideyu").attr("id","hideinput"+$(this).attr("id").substring(2))
            });
			//
			listprev.children().each(function(index, element) {
                 $(this).find("font").html(index+1);
                 $(this).find("li.fl span").addClass("duty"+$(this).attr("id").substring(2));
                 $(this).find("ul li.fl").attr("id","obssec"+$(this).attr("id").substring(2));
                 $(this).find("ul li.fr").attr("id","obssec1"+$(this).attr("id").substring(2));
                 $(this).find("p.tlb span").addClass("trob"+$(this).attr("id").substring(2));
                 $(this).find("p.tlb a").addClass("maxsec"+$(this).attr("id").substring(2));
            });
			surdce($(".adda"+count),m,"text");
		 }
		 surbtn(count)
		 initializeCount($("input"))
	     initializeCount($("textarea"))
	 }
		 //如果已经增加至第n题，置灰按钮
		 if(num>=n-1){
			 $(this).parent().hide();
			 num=n-1;
		  };
		 delsmallbox()
		 delbigbox()
})
	//问题删除操作
	delbigbox()
	function delbigbox(){
	   $(".delnew").on("click",function(){
			obtn = $(this).parents("ul"); className ="font"; 
			obtn.animate({height:0,marginTop:0,marginBottom:0,paddingTop:0,opacity:0},400,function(){
				var docthis = $(this);
				listprev = $("#list_numb");
				listprev.children().eq(ulindex($(this),docthis)).remove();
				$(this).remove();
				box.children().each(function(index, element) {
					$(this).find(className).html(index+1);
				});
				listprev.children().each(function(index, element) {
					$(this).find(className).html(index+1);
				})
		   });
		   if($("#list_numb").children().length<n+1){
			   $(".newproblem").parent().show();
			}
	   });
	}
	//选项删除操作
	delsmallbox()
	function delsmallbox(){
		$(".surdel").on("click",function(){
			  obtn = $(this).parent(); className ="strong";
			  var par = null
				obtn.animate({height:0,marginTop:0,marginBottom:0,paddingTop:0,opacity:0},400,function(){
					var docthis = $(this);
					listprev = $("#obssec"+$(this).parents("ul").attr("id").substring(2));
					$(".selectval"+$(this).parents("ul").attr("id").substring(2)).children().last().remove();
					$("#hideinput"+$(this).parents("ul").attr("id").substring(2)).children().first().before('<input type="text" name="'+inputName+$("#aa1"+$(this).parents("ul").attr("id").substring(2)+"").children().length+'">')
					if($("#aa1"+$(this).parents("ul").attr("id").substring(2)+"").children().length==5){
						$("#hideinput"+$(this).parents("ul").attr("id").substring(2)).html('<input type="text" name="'+inputName+$("#aa1"+$(this).parents("ul").attr("id").substring(2)+"").children().length+'">')
					}
					listprev.children().eq(ulindex($(this),docthis)).remove();
					$("#obssec1"+$(this).parents("ul").attr("id").substring(2)).children().eq(ulindex($(this),docthis)).remove()
					par = $(this).parent();
					$(this).remove();
					par.children().each(function(index, element) {
						$(this).find(className).html(index+1);
						$(this).find("input").attr("name",inputName+(index+1));
					})
					listprev.children().each(function(index, element) {
						$(this).find(className).html(index+1);
					})
			   });
			   //判断按钮是否置灰
			   if($(this).parent().parent().children().length < n+1){
				   $(".adda"+$(this).parents("ul").attr("id").substring(2)).parent().show();
			   }
		})	
	}
}

function ylhtml(){
//加载页面默认生成对应预览内容
$("#areabox1").children().each(function(index, element) {
	 if($("#list_numb").html()==""){
		$("#list_numb").html($("#hiddenarea").html())
	 }else{
		$("#list_numb").append($("#hiddenarea").html())
	 }
});
$("#list_numb").children().each(function(index, element) {
   $(this).attr("id","bb"+(index+1));
   $(this).find("font").html(index+1)
   $(this).find("li.fl").attr("id","obssec"+(index+1))
   $(this).find("p.tlb span").addClass("trob"+(index+1))
   $(this).find("li.fl span").addClass("duty"+(index+1))
   $(this).find("li.fr").attr("id","obssec1"+(index+1))  
   $(this).find(".maxsec1").attr("class","maxsec"+(index+1))     
});
$("#areabox1").children().each(function(index, element) {
	 $("#aa1"+(index+1)).children().each(function(index1, element) {
		   if($(".selectval"+(index+1)).children().length-1<index1){
				$(".selectval"+(index+1)).append('<option value="'+(index1+1)+'">最多选'+(index1+1)+'项</option>');
				$("#obssec"+(index+1)).append('<p><input type="radio" disabled="disabled" >\
				<label><strong>'+(index1+1)+'</strong>. <span class="duty'+(index+1)+'"></span></label></p>');
				$("#obssec1"+(index+1)).append($("#prevsec1").html())
		   }
	 });
	 $(".selectval"+(index+1)).children().eq($(".selectval"+(index+1)).attr("defaultValue")-1).attr("selected",true);
});
}
//返回兄弟节点的位置
function ulindex(obj,that){
	var len = 0
    obj.parent().children().each(function(index, element) {
		if(that.html()==obj.parent().children().eq(index).html()){
			len = index
		}
	});	
	return len
}

$(function(){  
//预览
$(".reward input[type=radio]").on("click",function(){
    if($(this).val()==0){
	   $(".rewardbox table").hide()	
	   $(".rewardbox .name").html($(this).next().html())
	}else{
	   $(".rewardbox table").show()
	   var ls =$(this).next().html()=="体验宝"?"tyb":"msjf"
	   $(".rewardbox .name").html("<span class='"+ls+"'></span>"+$(this).next().html());
	   
	   var leftCount = $(this).next().html()=="体验宝"?$("#ingot").val():$("#score").val()
	   $("#leftCount").html(leftCount);

	}
})
//活动调查预览
	setTimeout(function(){
		surbtn($("#areabox1").children().length);
		ylhtml()
	},100)
})
function surbtn(count){
	newCommon.addGhbs(".ghbs","p","cur-addbg")
   $("#SurDevBox .Abstract").parent().css('position',"relative");
   $(".surbtn").on("mousedown",function(){
	    //获取主题的值
	    $("#SurDevBox .theme").html($(".intheme").val());
	    //获取摘要的值
		$("#SurDevBox .Abstract").html($('.inAbstract').val());
	    //获取品牌名称的值
		$("#SurDevBox .brand").html($('.inbrand').html());
		//获取奖励的数量
       if($(".reward input[type=radio]:checked").val()==1||$(".reward input[type=radio]:checked").val()==2){
			$(".name_a").html($("#rewardbox td.name").html());
	    	$(".am_a_1").html($(".am_a1").val());
	    	$(".am_a_2").html($(".am_a2").val());
			$(".name_a").parent().show();
		}else if($("#rewardbox td.name").html()=="无"){
			$("#rewardbox input").val("");
		   	$(".name_a").parent().hide();
		}
	    //获取问题及选项的值
		for(var i=1;i<=count;i++){
			if($("#SurDevBox .trob"+i)&&$('.duty'+i)&&$('.induty'+i)){
			   $("#SurDevBox .trob"+i).html($('.trouble'+i).val());
			   $('.duty'+i).each(function(index, element) {
				  $('.duty'+i).eq(index).html($('.induty'+i).eq(index).val());
			   });
			}
	    }
		//获取最多选几项
		for(var i=0;i<=count;i++){

		   var htmlsec = ['单选','最多选2项','最多选3项','最多选4项','最多选5项']
		   $(".selectval"+(i+1)).children().each(function(index, element) {
                if($(".selectval"+(i+1)).val()==index+1){
		   	       $('.maxsec'+(i+1)).html(htmlsec[index])
			       //单选时，改为单选按钮，多选时改为多选按钮
				   if(index==0){
				       $('#obssec'+(i+1)+' input').each(function(index, element) {
							$(this).after('<input type="radio" value="'+index+'" disabled="disabled" \>').remove();
					   });
				   }else{
					    $('#obssec'+(i+1)+' input').each(function(index, element) {
							$(this).after('<input type="checkbox" value="'+index+'" disabled="disabled" \>').remove();
					   });
				   }
		       }
           });
		}
		//获取调查周期的值
	    if($("#inunitper").length>0){
	    	$("#unitper").html($("#inunitper").children().eq($("#inunitper").val()).html())
	    }
	   //调查结果显示  闫晓芳修改
	   $('li.surveyresult #surv').each(function(index, element) {
           if($('li.surveyresult #surv').eq(index).attr("checked")){
			  $('li.surveyresult input[name=surveyresult]').eq(index).attr({checked:true,disabled:false})  
		   } 
       });

	   //品牌体验中心活动调查获取图片视频的值
	    $("#ylImg").find("img").attr("src",$(".imgSi").find("img").attr("src"));
	   $("#ylVideo").children().attr("src",$("#videoYl").children().attr("src"));
	   $("#xbSex").html($("#Gender option:selected").text())
	   //年龄
	   $("#ageTime").html($("#age1").val()+"-"+$("#age2").val()+"岁")
	   if($("#age1").val()==''||$("#age2").val()==''){
	   	$("#ageTime").html('')
	   }
	   //类别
	   $("#MemType").html($("#classHY option:selected").text())
	   //会员等级
	   if($("#lvTj1 option:selected").text()=='不限'||$("#lvTj2 option:selected").text()=='不限'){
		   $("#Level").html('不限')
	   }else{
		   $("#Level").html($("#lvTj1 option:selected").text()+"-"+$("#lvTj2 option:selected").text())
	   }
	   //勋章赋值
	   $("#Medal").html($("#enterXz option:selected").text()+"个以上")
	   if($("#enterXz option:selected").text()=='不限'){
	   	 $("#Medal").html('不限')
	   }
	   //参与的省份
	   var citySelected = $(".city_sec option:selected").text();
	   if(citySelected != "全部参加"){
		   $("#provinceTitle").html(citySelected);
		   $("#Province").html(proval(0)+"&nbsp;&nbsp;"+proval(1)+"&nbsp;&nbsp;"+proval(2));
	   }else{
		   $("#provinceTitle").html("参加省份");
		   $("#Province").html("全部参加");
	   }
	   
	   function proval(n){
		    var pro =  $("#Prov input:checked").eq(n)
	        return pro.next().html()?pro.next().html():'';
	   }
   });
}


//选择品牌-字母加载更多效果
$(function(){
//默认状态下加载更多
	function loadbrand(n,obj,num){
	//默认
	if(num==1){
		obj.children().each(function(index, element) {
			index<=n-1?$(this).show():$(this).hide();			//默认加载n个字母
			loadbrand(1,$(this),2);								//每个字母显示1行//加载全部时按钮隐藏
		});
	}
	//单字母
	if(num==2){
		var m = 0;
		obj.children().last().children().each(function(index, element) {
			m =Math.floor(index/5);
			if(m<=n-1){											//默认显示n行品牌
				obj.children().last().children().eq(index).show()
			}else{
				obj.children().last().children().eq(index).hide();
			}
																//加载全部时按钮隐藏
			if(obj.children().last().children().length/5<=n)$("#more_click1").hide();
		});
		$("#more_click1").on("click",function(){				//点击加载n行品牌
			loadbrand(n+6,obj,num);
		})
	}
}
loadbrand(0,$("#oBrand"),1);
Letteron()
//判断字母是否能点击
function Letteron(){
	var LetterArr = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26];//字母容器
	$("#oButn").children().each(function(index,element) {

		var that = $(this);
		$("#oBrand").children().each(function(index1,element1) {
			if(that.html()==$(this).children().first().html()&&index!=0){
				LetterArr[index] = that.html();//数据中显示该字母赋值给容器，不显示的字母，赋值为空；
			}
		});
		$(this).on("click",function(){
		    $(".nofound").hide();
		})
	});
	//循环26个字母
	for(var i=1;i<LetterArr.length;i++){
		//给不可点击的字母添加class'nopointer'
		if($("#oButn").children().eq(i).html()!=LetterArr[i]){
			$("#oButn").children().eq(i).removeClass().addClass("nopointer")
		}
		//选择字母显示品牌
		if($("#oButn").children().eq(i).attr("class")!="nopointer"){ //排除可以点击的字母
			$("#oButn").children().eq(i).addClass("keep")
		}
	}
	$(".keep").each(function(index, element) {
		 $(this).on("click",function(){
			var _this = $(this);
			$("#oButn").children().removeClass("on"); //清空所有可以点击字母的class
			$(this).addClass("on"); //当前点击添加class
			$("#oBrand").children().each(function(index, element) { //遍历显示的字母，选项卡
				if($(this).children().first().html()== _this.html()){
					$("#oBrand").children().hide();
					$(this).show();
					$("#more_click").hide();
					$("#more_click1").show();
					if($(this).css('display')!="none"){//判断点击字母 控制对应的 内容默认显示6行
						loadbrand(6,$(this),2);
					}
				}
			});
			
		});
        
    });
	
}
})
//划过显示敬请期待...
function stayTybed(obj){
	$(obj).children().hide();
	$(obj).hover(function(){
		$(this).children().show();
	},function(){
		$(this).children().hide();
	})
	
}

/*判断select下拉框是否选择*/
function selectOk(obj){
	if(obj.get(0).tagName == "SELECT"){
		 if(obj.val()=="selected"||obj.val()==""){
			 obj.parent().find(".textError").fadeIn(150);
			 obj.parent().find(".textError").html(obj.parent().find(".textError").attr("data-val"))
		 }else{
			obj.parent().find(".textError").hide();
		 }	
	 }
}

//reset 重置默认值操作  yanxf 2015-07-09  
function clearVal(box){
	$(box).find("input[type=text]").val("");
	$(box).find("select").val($(box).find("select:selected").val())
	$(".ifbox li input").attr("disabled",false);
    $(".ifbox li select").attr("disabled",false);
}

//reset 重置默认值操作
function clearValue(box){
	$(box).find("input[type=text]").val("");
	//隐藏域表单清除
	$(box).find("input[type=hidden][clearValue=true]").val("");
	$(box).find("select").val($(box).find("select:selected").val())
	$(".ifbox li input").attr("disabled",false);
    $(".ifbox li select").attr("disabled",false);
}


//设计快递单模板
function SetList(objbox,dropBox){
    var check = varobj(objbox);
	var drop = varobj(dropBox);
	 check.find('input').each(function(index,element){
		 if($(this).attr("checked")=='checked'){
		     drag("drag"+index,"h2","coor"+index);
		 }
		 $(this).on("click",function(){
			 if($("#drag"+index).length==0){
			    drop.append("<div id='drag"+index+"' name='"+$(this).attr("name")+
"'><h2 onselectstart='return false;'>"+$(this).next().html()+"</h2><p class='coor' id='coor"+index+"'></p></div>")
				$("#drag"+index).css({top:(Math.floor(index/7)*30)+"px",left:(90*(index%7))+"px",position:"absolute"});
				drag("drag"+index,"h2","coor"+index);
				
			 }else{
			    $("#drag"+index).remove();
			 }
			  
		 })
	 })
}

//设置点击file
function clickFile(file){
	$(file).click();
}

function varobj(obj){
	 var object = typeof obj=="string"?$(obj):obj;
	 return object
}

//拖拽移动放大缩小功能
function drag(box,obj,tuo){
	var oDiv=document.getElementById(tuo);
	var oDiv2=document.getElementById(box);
	var h2=oDiv2.getElementsByTagName(obj)[0];
	var mouseStart={};
	var divStart={};
	var rightStart={};
	var bottomStart={};
	//往右同时往下拽
	oDiv.onmousedown=function(ev){
		var ev=ev||event;
		mouseStart.x=ev.clientX;
		mouseStart.y=ev.clientY;
		divStart.x=oDiv.offsetLeft;
		divStart.y=oDiv.offsetTop;
		if(oDiv.setCapture){
			oDiv.onmousemove=doDrag;
			oDiv.onmouseup=stopDrag;
			oDiv.setCapture();
		}
		else{
			document.addEventListener("mousemove",doDrag,true);
			document.addEventListener("mouseup",stopDrag,true);
		}
	};
	function doDrag(ev){
		var oEvent=ev||event;
		var l=oEvent.clientX-mouseStart.x+divStart.x;
		var t=oEvent.clientY-mouseStart.y+divStart.y;
		var w=l+oDiv.offsetWidth;
		var h=t+oDiv.offsetHeight;
		if(w<oDiv.offsetWidth){
			w=oDiv.offsetWidth;
		}
		else if(w>document.documentElement.clientWidth-oDiv2.offsetLeft){
			w=document.documentElement.clientWidth-oDiv2.offsetLeft-2;
		}
		if(h<oDiv.offsetHeight){
			h=oDiv.offsetHeight;
		}
		else if(h>document.documentElement.clientHeight-oDiv2.offsetTop){
			h=document.documentElement.clientHeight-oDiv2.offsetTop-2;
		}
		oDiv2.style.width=w+"px";
		oDiv2.style.height=h+"px";
	};
	function stopDrag(){
		if(oDiv.releaseCapture){
			oDiv.onmousemove=null;
			oDiv.onmouseup=null;
			oDiv.releaseCapture();
		}
		else{
			document.removeEventListener("mousemove",doDrag,true);
			document.removeEventListener("mouseup",stopDrag,true);
		}
	};
	//h2完美拖拽
	h2.onmousedown=function(ev){
		var oEvent=ev||event;
		mouseStart.x=oEvent.clientX;
		mouseStart.y=oEvent.clientY;
		divStart.x=oDiv2.offsetLeft;
		divStart.y=oDiv2.offsetTop;
		if(h2.setCapture){
			h2.onmousemove=doDrag3;
			h2.onmouseup=stopDrag3;
			h2.setCapture();
		}
		else{
			document.addEventListener("mousemove",doDrag3,true);
			document.addEventListener("mouseup",stopDrag3,true);
		}
	};
	function doDrag3(ev){
		var ev=ev||event;
		var l=ev.clientX-mouseStart.x+divStart.x;
		var t=ev.clientY-mouseStart.y+divStart.y;
		if(l<0){
			l=0;
		}else if(l>980-$(oDiv2).width()){
		    l=980-$(oDiv2).width()+'px';
		}else if(l>document.documentElement.clientWidth-oDiv2.offsetWidth){
			l=document.documentElement.clientWidth-oDiv2.offsetWidth;
		}
		if(t<0){
			t=0;
		}else if(t>$("#setimglist").height()-30){
		     t = $("#setimglist").height()-30+'px'
		}else if(t>document.documentElement.clientHeight-oDiv2.offsetHeight){
			t=document.documentElement.clientHeight-oDiv2.offsetHeight;
		}
		oDiv2.style.left=l+"px";
		oDiv2.style.top=t+"px";
	};
	function stopDrag3(){
		if(h2.releaseCapture){
			h2.onmousemove=null;
			h2.onmouseup=null;
			h2.releaseCapture();
		}
		else{
			document.removeEventListener("mousemove",doDrag3,true);
			document.removeEventListener("mouseup",stopDrag3,true);
		}
	}
};

function lasttime(obj,href,endfn){
	var i = 4;
	var intervalid;
	intervalid = setInterval(fun, 1000);
	function fun() {
		if (i == 1) {
			window.location.href = href;
			clearInterval(intervalid);
			endfn&&endfn();
		}
		document.getElementById(obj).innerHTML = i;
		i--;
	}
}
//划过显示立即申请等效果
function sqhover(model,obj,box,theHeight){
	var h = theHeight||32
	$(model).each(function(index, element) {
		var attr = this;
        $(obj,attr).hover(function(){
			$(box,attr).show().stop().animate({height:h},150)
		},function(){
			$(box,attr).stop().animate({height:"0"},150,function(){
			   $(box,attr).hide();
			})
		})
    });
	
}
/****************更新字符控制代码***********************/
$(function(){
	initializeCount($("input[type=text]"))
	initializeCount($("textarea"))
})

function inputCount(that){
	$(that).on("keydown",function(){
		 endcount($(that))
   })
	$(that).on("keyup",function(){
		endcount($(that))
   })
}
function endcount(obj){
	setTimeout(function(){
		var count=obj.attr("maxlength") ==undefined?2000:obj.attr("maxlength");
		if(newGetByteLen(obj.val(),count)[0]<=count){
			obj.parent().find(".textLen").html(newGetByteLen(obj.val(),count)[0]);
		}else{
			var thisval = obj.val().substring(0, newGetByteLen(obj.val(),count)[1]);
				obj.val(thisval)
				obj.parent().find(".textLen").html(newGetByteLen(obj.val(),count)[0]);
		}
	},1)
}
function initializeCount(obj){
	obj.each(function(){
		if($(this).parent().find(".textLen").length>0){
		  $(this).parent().find(".textLen").html(newGetByteLen($(this).val())[0])
		}
		inputCount(this)
	})
}

/*提示判断*/

//有焦点值为空的时候
function onkong(obj,num){
    for(var i=0;i<=num;i++){
		Simplify(obj,obj.attr('name'),1);
    }
}
//无焦点值为空
function nokong(obj,num){
   for(var i=0;i<=num;i++){
	    Simplify(obj,obj.attr('name'));
   }
}
//添加提示文字判断文字颜色
function Simplify(obj,name,color){
  var lv = "green",ju = "yellow";
  var icon1 = "<i class='"+icon+"'></i>";
  if(color){
	  lv = "yellow",ju = "green";
  }
  if(obj.attr("name")==name){
	   obj.parent().find(".textError").removeClass(lv).addClass(ju).html(icon1+obj.parent().find(".textError").attr("data-val")).fadeIn(1);
   } 
}
//失去焦点判断输入信息提示
function nomust(obj,num,endfn){
	
	 var len
  	 if(obj.val()==""){
	      if(obj.hasClass("mustVal")){
			    if(num){nokong($(this),num);}//点击确认后显示错误提示
				//yanxf 2015-07-03 
				setInfo({obj:obj,icon:icon});
		  }else{
		  		if(num){num--;}
				setHide(obj,".textError")//隐藏
		  }
	  }else if(number(obj.val())&&obj.hasClass("Number")){					//只能输入数字
			onbginner(obj)
			setInfo({obj:obj,icon:icon,content:"请输入数字"})				//设置错误提示内容
	  }else if(!chinese(obj.val())&&obj.hasClass("chinese")){				//只能输入数字
			onbginner(obj)
			setInfo({obj:obj,icon:icon,content:"请输入中文"})
	  }else if(space(obj.val())&&obj.hasClass("space")){				//只能输入数字
			onbginner(obj)
			setInfo({obj:obj,icon:icon,content:"必填项，输入内容不能为空"})
	  }else if(!mobilephone(obj.val())&&obj.hasClass("mobilephone")){		//移动电话
			onbginner(obj)
			setInfo({obj:obj,icon:icon,content:"请输入正确的手机号码"})
	  }else if(!phone(obj.val())&&obj.hasClass("phone")){					//固定电话
			onbginner(obj)
			setInfo({obj:obj,icon:icon,content:"请输入正确的电话号码"})
	  }else if(!phone(obj.val())&&!mobilephone(obj.val())&&obj.hasClass("telephone")){//移动电话或固定电话
			onbginner(obj)
			setInfo({obj:obj,icon:icon,content:"请输入正确的电话号码"})
	  }else if(!price1(obj.val())&&obj.hasClass("price")){					//价格
			onbginner(obj)
			setInfo({obj:obj,icon:icon,content:"请输入正确的价格"})	
	//  yanxf 2015-07-06
	  }else if(!payment(obj.val())&&obj.hasClass("payment")){
		 	onbginner(obj);
			setInfo({obj:obj,icon:icon,content:"请输入正确的付款金额"});
 
	  }else if(!checkEmail(obj.val())&&obj.hasClass("checkEmail")){			//邮箱
			onbginner(obj);
			setInfo({obj:obj,icon:icon,content:"邮箱格式错误"});
	  }else if(obj.attr("name")=="nickName4_20"&&(!nickName(obj.val()) || newGetByteLen(obj.val())[0] < 4 || newGetByteLen(obj.val())[0] > 20)){//密码
			onbginner(obj)
			setInfo({obj:obj,icon:icon,content:"请输入4-20个字符，支持中英文、数字、“_”或减号"})
	  }else if(obj.hasClass("nickName6_18")&&(newGetByteLen(obj.val())[0] < 6 || newGetByteLen(obj.val())[0] > 18)){											//密码
			onbginner(obj)
			setInfo({obj:obj,icon:icon,content:"请输入6-18位字母、数字或符号的组合，字母区分大小写"})
	  }else if(obj.attr("name")=="nickName6_18"&&(newGetByteLen(obj.val())[0] < 6 || newGetByteLen(obj.val())[0] > 18)){											//密码
			onbginner(obj)
			setInfo({obj:obj,icon:icon,content:"请输入6-18位字母、数字或符号的组合，字母区分大小写"})
	  }else if(!maxtpUrl(obj.val())&&obj.hasClass("maxtpUrl")){
		    onbginner(obj)
		    setInfo({obj:obj,icon:icon,content:"仅支持美试网站内链接"})
	  }else if(!idNumber(obj.val())&&obj.hasClass("idNumber")){
		    onbginner(obj)
		    setInfo({obj:obj,icon:icon,content:"请输入正确的身份证号"})
	  }else{
			if(num){num--;}
			setHide(obj,".textError")//隐藏
			if(endfn){
			  	num = endfn(obj,num)
			}
	  }
	  len = num
	  return len;
}

function blurSel(obj,endfn){
	var result = true
	  //条件判断开始
	  if(endfn){
		  result = endfn(obj,result);
	  }else{
	  	  if(obj.val()=="selected"||obj.val()==""){
				result  = false
				setInfo({obj:obj})
		   }else{
				result = true;
				errorhide(obj);
		   }
	  }
      return result
}

function blurImg(attr,endfn,onoff,way,attr){
	  var num,n=0,result=true;
	  if($('img.least',attr).length>0){
	      $('img.least',attr).each(function(index,element){
			    num = 0
	            if($(this).attr('src')!=""){
				    n++;
				}
				result = n;
		  })
		   if(result == 0 && num ==0){
	         onoff = false;
		   }
		   if(endfn){
		     onoff = endfn($('img.least',attr),onoff)
		   }
		   if(way&&!onoff){
		    	 $('.textError',attr).show().html("<i class='"+icon+"'></i>"+$('.textError',attr).attr('data-val'));
		   }
	  }
      return onoff
}
//条件判断结束
function onbg(obj){
  obj.parent().removeClass("ongreen").addClass("oncaps");
}
function onbginner(obj){
  obj.parent().removeClass("ongreen").addClass("oncaps");
}
function onbg1(obj,num){
  obj.parent().removeClass("ongreen").addClass("oncaps");
}
function errorEle(obj,className){
  return obj.parent().find(className).removeClass("green").addClass("yellow");
}
function errorhide(obj){
	obj.parent().find(".textError").hide();
}
function setInfo(json){
   var obj = json['obj'];
   var icon = json["icon"]||"misx";
   var className = json["className"]||".textError";
   var val = json["val"]||"data-val";
   var html =json['content']||obj.parent().find(className).attr(val); 
   onbginner(obj)
   errorEle(obj,className).html("<i class='"+icon+"'></i>"+html).show();	
}
function setHide(obj){
   obj.parent().removeClass("ongreen").removeClass("oncaps");
   $(arguments).each(function(index, element) {
	   if(index>0){
      	  obj.parent().find($(arguments)[index]).hide();	
	   }
   });
   
}

function clearError(){
	$(".mustVal").each(function(){
		errorhide($(this))
		setHide($(this))
	})
}
function elem(obj){
	return typeof obj == "object"?obj:$(obj);
}
/**
 *控制输入类型
 *return element
 */


//只能输入正整数
function numberDel(obj){
	obj=obj==undefined?".numberDel":obj;
	$(obj).each(function(){
		var attr = this;
		$(this).on('keyup',regEpx)
		$(this).on('onafterpaste',regEpx)
		$(this).on('blur',regEpx)
	})
	function regEpx(){
		$(this).val(testPoint($(this).val().replace(/\D/g,'')))
	}
}
//只能输入字母和数字
function numberDelletter(obj){
	obj=obj==undefined?".numberDelletter":obj;
	$(obj).each(function(){
		var attr = this;
		$(this).on('keyup',regEpx)
		$(this).on('onafterpaste',regEpx)
		$(this).on('blur',regEpx)
	})
	function regEpx(){
		$(this).val(testPoint($(this).val().replace(/[^a-zA-Z0-9]/g
,'')))
	}
}
function noSpace(obj){
	obj=obj==undefined?".noSpace":obj;
	$(obj).each(function(){
		var attr = this;
		$(this).on('keyup',regEpx)
		$(this).on('onafterpaste',regEpx)
		$(this).on('blur',regEpx)
	})
	function regEpx(){
		$(this).val(testPoint($(this).val().replace(/\s/g,'')))
	}
}
//只能输入正整数
function price(obj){
	obj=obj==undefined?".price":obj;
	$(obj).each(function(){
		var attr = this;
		$(this).on('keyup',function(){
			regEpx(this)
		});
		$(this).on('keydown',function(){
			regEpx(this)
		})
		$(this).on('onafterpaste',function(){
			regEpx(this)
		})
		$(this).on('blur',function(){
			regEpx(this)
			zeroFill(this)
		})
	})
	function regEpx(attr){
		if($(attr).val().charAt(0)=="-"&&$(attr).hasClass("negative")){
			$(attr).val('-'+testPoint($(attr).val().substring(1).replace(/[^0123456789.]/g,'')))
		}else{
			$(attr).val(testPoint($(attr).val().replace(/[^0123456789.]/g,'')))
		}
		
	}
}
//失去焦点补齐两位小数
function zeroFill(obj){
	var subval = $(obj).val().substring(1)
	var val = $(obj).val()
	if(val.charAt(0)=='-'&&!dian(parseFloat(subval))&&subval!=''){
		var num = parseFloat(subval)
		$(obj).val("-"+fixed(num))
	}else if(!dian(parseFloat(val))&&val!=''){
		var num1 = parseFloat(val)
		$(obj).val(fixed(num1))
	}else{
		$(obj).val('0.00')
    }
}
//将数字转化保留两位小数
function fixed(num){
  return num.toFixed(2);
}
//截取小数点后两位并排除  首字符为.的情况 排除 连续输入.
function testPoint(val){
	var num = 0,len=0;
	for(var i=0;i<val.length;i++){
		if(number(val.charAt(i))&&val.charAt(i)=='.'){
			num++;
			if(num>=1){
				if(val.charAt(i+1)=="."){
					len = i-2;
				}else if(val.charAt(i+2)=="."){
					len = i-1;
				}else{
					len = i;
				}
			    break;
			}
		}
	}
	if(len==0&&val.charAt(0)=='.'){
		len = 0
	}else if(len==0&&val.charAt(0)!='.'){
		len = 1000000000;
	}else{
		len = len+3
	}
	return val.substring(0,len)
}


/**
 * 正则表达式
 * return true or false
 * */
//判断非数字
function number(str){
		var s =/\D/g;
		return s.test(str);
}
function dian(str){
		var s =/[^0123456789.]/g;
		return s.test(str);
}
//空格正则
function space(str){
	var s =/^[\s　]*$/ ;
	return s.test(str);
}
//判断非数字
function nickName(str){
		var s =/^[a-zA-Z0-9-_\u4e00-\u9fa5]+$/;
		return s.test(str);
}
// 身份证号码为15位或者18位，15位时全为数字，18位前17位为数字，最后一位是校验位，可能为数字或字符X
function idNumber(str){
		var s =/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
		return s.test(str);
}

//中文和字母
function chinese(str){
    var s =/^[a-zA-Z\u4e00-\u9fa5]+$/;
	return s.test(str);
}

//中文
function china(str){
    var s = /[\u4E00-\uFA29]/ ;
	return s.test(str);
}

//判断非数字
function shuzi(str){
		var s =/\D/g;
		return s.test(str);
}  
//价格
function price1(str){
  var s =/^(([0-9]+\.\d{1,2})|([0-9]*[1-9][0-9]*\.\d{1,2})|([0-9]*[1-9][0-9]*))$/ ;
  return s.test(str);
}
//付款金额 允许数字 yanxf 2015-07-06 .
function payment(str){
	var s=/^([1-9][\d]{0,7}|0)(\.[\d]{1,2})?$/;
	return  s.test(str);	
}
//数字和字母
function letterNum(str){
  var s = /^[A-Z]+$/
  return s.test(str);
}

//数字和字母
function mobilephone(str){
  var s = /^1[0-9]{10}$/
  return s.test(str)
}
function phone(str){
	var s = /0\d{2,3}-\d{5,9}|0\d{2,3}-\d{5,9}/
	return s.test(str)
}
//邮箱验证
function checkEmail(str){
	var s= /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/
	return s.test(str)
}
//美试网站内链接验证
function maxtpUrl(url) {
	var strRegex = "^((https|http)://)" + "(([0-9]{1,3}\.){3}[0-9]{1,3}" 
			+ "|localhost|" 
			+ "([0-9a-z_!~*'()-]+\.)*" 
			+ "maxtp."
			+ "[a-z]{2,6})"
			+"(:[0-9]{1,4})?"
			+"([0-9a-z_!~*'()-]+\.)*?";
	var re = new RegExp(strRegex);
	return re.test(url);
}

//验证链接是否带有http:// 或 https://
function tyurl(url) {
	var s = /^(http:\/\/)|(https:\/\/)/ 
	return s.test(url);
}

// 验证重复元素，有重复返回true；否则返回false
function mm(arr){
	var hash = {};
	for(var i in arr) {
		if(hash[arr[i]])
		return true;
		hash[arr[i]] = true;
	}
	return false;
}
/*
 *
 *公用单选多选代码
 * 
 */
function singlefn(json,boxjs){ 
    var data = json['data-class']||"data-v";
    newCommon.lert("click",{obj:json['batchBtn'],content:$(json['batchBtn']).attr(data),del:true})
	Num()
	//全选
	if(json['multiple']){
		json['multiple'].on("click",function(){
			  var attr = this
			  setTimeout(function(){
				   $(json['single']).attr('checked',attr.checked);
					checedNum(json,boxjs);
					Num()
			  },1)
		});
	}

	//单选
	$(json['single']).on("click",function(){
		if(json['multiple']){
			if($(json['single']+":checked").length==$(json['single']).length){
				 json['multiple'].attr("checked",true)	
			}else{
				 json['multiple'].attr("checked",false)	
			}
		}
		checedNum(json,boxjs);
		Num()
	});
	function Num(){
	    $(json["dxNum"]).html($(json['single']+":checked").length)
	    $(json["qxNum"]).html($(json['single']).length)
	}
	checedNum(json,boxjs);
};

//判断checkbox是否被选中
function checedNum(json,boxjs){
        var data = json['dataClass']||"data-v"
    	$(json['batchBtn']).off('click',null)
		$(json['batchBtn']).on('click',function(){ 
		    if($(json['single']+":checked").length!=0){
				boxjs();
			}else{
				newCommon.lert("alway",{content:$(json['batchBtn']).attr(data),del:true})	
			}
		});
		json['endfn']&&json['endfn']()
		if(json['func']){
			if($(json['single']+":checked").length!=0){
				json['func'](json['batchBtn'])	
			}else{
			   $(json['batchBtn']).off('click',null)
			   newCommon.lert("click",{obj:json['batchBtn'],content:$(json['batchBtn']).attr(data),del:true})
			}
		}
};
//选择性验证辅助方法
function checkeddx(Checkbox,className,tagName){
    $(Checkbox).parents(tagName).each(function(){
        var attr = this;
        if($(Checkbox,this).attr("checked")=="checked"){
            $(attr).addClass(className)
        }else{
            $(this).removeClass(className)
            $(".textError",this).hide();
        }
    })
}

/*
  按钮读秒函数
 * 
 * 
 * */
function messageCode(paramete){
     var obj = paramete["obj"];             //按钮对象
     var num = paramete["sum"];             //总共可以点击的次数
     var Surplus = paramete["Surplus"];     //显示剩余点击的次数
     var Start = paramete["Starttimes"];    //初始化设置第几次开始
     var time= paramete["lasttime"];        //读秒剩余时间
     var type = paramete["type"];           //特殊情况判断的类型
     var miao = time;
     var timer = null,txt=null,typeon = null;
     var bggreen = paramete["bggreen"]||"btn_wsyhcz"
     var bggray = paramete["bggray"]||"btn_wsyhcz_2"
     var dataText = {
            phoneClass:["重新发送","重新发送验证邮件","重新获取激活邮件"]   
            ,endfn:null
     }
     var btnhui = $(obj).removeClass(bggreen).addClass(bggray);
     
     if(type&&type=="emailpost"){
         txt = dataText["phoneClass"][1];
         typeon = type;
         $("#lookEmail").show();
     }else if(type&&type=="emailActivate"){
         txt = dataText["phoneClass"][2];
         typeon = type;
         $("#emailBox").attr("disabled",true);
         dataText["endfn"] = function(){
            $("#emailBox").attr("disabled",false);
         }
         $("#lookEmail").show();
     }else if(type&&type=="box"){
             common.lert("alway",{bgcolor:"bggreen",content:"夺标压顶无可奈何花落去",okval:"确认"});
             txt = dataText["phoneClass"][0];
             typeon = "box";
     }else{
         txt = dataText["phoneClass"][0];
         typeon = null;
     }
     //初始化发送按钮，清空初始化事件
     btnhui.val(txt+"（"+miao+"）");
     $(obj).attr("disabled",true);
     $(obj).off("click",null);
     //判断初始化是否可以发送
     if(num==Start){
         btnhui
         btnhui.val(txt)
         $("#showTime").html("发送太频繁，请24小时后再试").show();
         return false;
     }else if(num==Start+1){//还可以发送0次
         Start++;
         btnhui.val(txt);
         $("#showTime").show().html("您还可以发送"+(num-Start)+"次，请24小时后再试");
     }else{//发送倒数读秒
         Start++;
         timer = setInterval(function(){
             miao--;
             btnhui.val(txt+"（"+miao+"）");
             if(miao==0){
                 clearInterval(timer);
                 $(obj).attr("disabled",false);
                 $(obj).removeClass(bggray).addClass(bggreen).val(txt);
                 if(dataText["endfn"]!=null&&typeof dataText["endfn"]=="function")dataText["endfn"]()//
             }
          },1000)
     }
     startcount()
     //判断发送剩余次数，Surplus为剩余多少次开始计算
     function startcount(){
         if(num-Start<=Surplus&&num-Start>0){
            $("#showTime").show().html("您还可以发送"+(num-Start)+"次");
         }
     }
     
}
//检测图片是否显示
function detectPicture(){
	$("img[src='']").hide();
	$("img[src!='']").show();
}
/****************************
 * 公用弹出框模块代码  *
 * *************************/
//登陆弹出框html
function loginBoxFn(){
	icontype(1)
	var str = ""
	    str +='<div id="loginBox" class="pop-box  bg_box_green">';
	    str +='<h3>请登录<span class="close"></span></h3>';
	    str +='<div class="loginCon">';
	    str +='<div class="inp_box">';
	    str +='<ul>';
	    str +='<li class="bg_username"><input class="mustVal" type="text" name="username" placeholder="手机号码">';
	    str +='<p class="textError" data-val="请输入账号！"></p></li>';
	    str +='<li class="bg_password"><input class="mustVal" type="password" name="password" placeholder="密码">';
	    str +='<p class="textError" data-val="请输入密码！"></p></li>'
	    str +='<li class="verCode"><input class="code mustVal" type="text" placeholder="验证码">';
	    str +='<img src="../../01通用版块/style/images/bannk/yzm.png" alt="" /><span>换一张</span>';
	    str +='<p class="textError" data-val="请输入验证码！"></p></li></ul>'
	    str +='<div class="logBtn"><input class="okBtn" type="button" value="登录"></div>';
	    str +='<div class="getWord"><p><a href="#">忘记登录手机号</a>|<a href="#">忘记密码</a>|<a href="#">免费注册</a></p></div>';
	    str +='</div></div></div>';
	    
	    newCommon.lert("alway",{write:str,box:"#loginBox",notoff:true,inputText:function(obj,num){
	if(number(obj.val())&&obj.hasClass("abcde")){//只能输入数字
		onbg(obj)
		num++
		setInfo({obj:obj,icon:"misx",content:"woshiabcde"})//设置错误提示内容
	 }
	return num
},ok:function(b,t,c){
	alert(t)
}})
}
//跟随滚动
function WindowScrollSize(mask,num,json){
	var element = {
	    	WindowScrollSize:json["scrollSize"]==false?"false":"true"|| "true",
	}
	 if(element['WindowScrollSize']=="true"){
		 $(window).scroll(function(){
			   if ($(json['box']).css("display")=='block'){
					midpos(json,num);
				}
		 });
	 }
	 $(window).resize(function(){
		 if (mask.css("display")=='block'&&json['title']!='del'){
		 	if(json['mask']!=false){
		 		layerMask(mask,num)
		 	}
		 }
		 if ($(json['box']).css("display")=='block'){midpos(json,num);}
	 })
}


/**
 **
 *弹出框汇总
 **
 **/
//成功操作弹出框
function successAlert(content){
	newCommon.lert("alway",{
		del:true,
		title:"del",
		mask:false,
		timing:1000,
		content:"<div class='checkMark'></div><font class='green succe'>"+content+"</font>"
	})
	//$(".succe").parents(".pop_cont").css({padding:"20px 30px"})
}
//橘色叹号弹出框
function orangeMark(content){
	newCommon.lert("alway",{del:true,content:"<div class='circle_mark1'></div>"+content})
}

// 显示隐藏
function fadeInout (clickId,cont){
	// var num=0;
    $(clickId).click(function (){
       // if (num==0) {
       		 $(cont).fadeIn();
       // 		 num=1
       // }
       // else{
       // 		 $(cont).fadeOut();
       // 		 num=0
       // }
    })
}

function deletesixin (){
	$(".deletesixin").each(function(i){
		// alert($(".mysixinCont").length)
   		$(this).on("click",function (){
   			var _this=$(this)
   			 newCommon.lert("alway",{okval:"确定",noval:"取消",content:"<div class='circle_mark1'></div>是否删除该私信聊天数据？</span>",ok:function (){
   			 		_this.hide()
		   			$(".deletP").eq(i).show()
		   			$(".alreadydel").eq(i).show()
		   			var getheight=$(".mysixinCont").eq(i).height()/2
		   			if ($(".mysixinCont").eq(i).hasClass("secondContent")) {
		   				$(".alreadydel").eq(i).css({ "top": getheight,"left": "-32px" })
		   			}else{
		   				$(".alreadydel").eq(i).css({ "top": getheight,"right": "-32px" })
		   			}
   			 }})
   			
	})
 })
}
function deletsixinliebiao (){
	$(".delete").each(function(i){
   		$(this).on("click",function (){
   			var _this=$(this)
   			 newCommon.lert("alway",{okval:"确定",noval:"取消",content:"<div class='circle_mark1'></div>是否删除该私信聊天数据？</span>",ok:function (){
		   			$(".alreadydel2").eq(i).show()
		   			_this.off()
   			 }})
   			
	})
 })
}


 ;/*! jQuery v1.9.0 | (c) 2005, 2012 jQuery Foundation, Inc. | jquery.org/license */
define(function(require,exports,module){
(function(e,t){"use strict";function n(e){var t=e.length,n=st.type(e);return st.isWindow(e)?!1:1===e.nodeType&&t?!0:"array"===n||"function"!==n&&(0===t||"number"==typeof t&&t>0&&t-1 in e)}function r(e){var t=Tt[e]={};return st.each(e.match(lt)||[],function(e,n){t[n]=!0}),t}function i(e,n,r,i){if(st.acceptData(e)){var o,a,s=st.expando,u="string"==typeof n,l=e.nodeType,c=l?st.cache:e,f=l?e[s]:e[s]&&s;if(f&&c[f]&&(i||c[f].data)||!u||r!==t)return f||(l?e[s]=f=K.pop()||st.guid++:f=s),c[f]||(c[f]={},l||(c[f].toJSON=st.noop)),("object"==typeof n||"function"==typeof n)&&(i?c[f]=st.extend(c[f],n):c[f].data=st.extend(c[f].data,n)),o=c[f],i||(o.data||(o.data={}),o=o.data),r!==t&&(o[st.camelCase(n)]=r),u?(a=o[n],null==a&&(a=o[st.camelCase(n)])):a=o,a}}function o(e,t,n){if(st.acceptData(e)){var r,i,o,a=e.nodeType,u=a?st.cache:e,l=a?e[st.expando]:st.expando;if(u[l]){if(t&&(r=n?u[l]:u[l].data)){st.isArray(t)?t=t.concat(st.map(t,st.camelCase)):t in r?t=[t]:(t=st.camelCase(t),t=t in r?[t]:t.split(" "));for(i=0,o=t.length;o>i;i++)delete r[t[i]];if(!(n?s:st.isEmptyObject)(r))return}(n||(delete u[l].data,s(u[l])))&&(a?st.cleanData([e],!0):st.support.deleteExpando||u!=u.window?delete u[l]:u[l]=null)}}}function a(e,n,r){if(r===t&&1===e.nodeType){var i="data-"+n.replace(Nt,"-$1").toLowerCase();if(r=e.getAttribute(i),"string"==typeof r){try{r="true"===r?!0:"false"===r?!1:"null"===r?null:+r+""===r?+r:wt.test(r)?st.parseJSON(r):r}catch(o){}st.data(e,n,r)}else r=t}return r}function s(e){var t;for(t in e)if(("data"!==t||!st.isEmptyObject(e[t]))&&"toJSON"!==t)return!1;return!0}function u(){return!0}function l(){return!1}function c(e,t){do e=e[t];while(e&&1!==e.nodeType);return e}function f(e,t,n){if(t=t||0,st.isFunction(t))return st.grep(e,function(e,r){var i=!!t.call(e,r,e);return i===n});if(t.nodeType)return st.grep(e,function(e){return e===t===n});if("string"==typeof t){var r=st.grep(e,function(e){return 1===e.nodeType});if(Wt.test(t))return st.filter(t,r,!n);t=st.filter(t,r)}return st.grep(e,function(e){return st.inArray(e,t)>=0===n})}function p(e){var t=zt.split("|"),n=e.createDocumentFragment();if(n.createElement)for(;t.length;)n.createElement(t.pop());return n}function d(e,t){return e.getElementsByTagName(t)[0]||e.appendChild(e.ownerDocument.createElement(t))}function h(e){var t=e.getAttributeNode("type");return e.type=(t&&t.specified)+"/"+e.type,e}function g(e){var t=nn.exec(e.type);return t?e.type=t[1]:e.removeAttribute("type"),e}function m(e,t){for(var n,r=0;null!=(n=e[r]);r++)st._data(n,"globalEval",!t||st._data(t[r],"globalEval"))}function y(e,t){if(1===t.nodeType&&st.hasData(e)){var n,r,i,o=st._data(e),a=st._data(t,o),s=o.events;if(s){delete a.handle,a.events={};for(n in s)for(r=0,i=s[n].length;i>r;r++)st.event.add(t,n,s[n][r])}a.data&&(a.data=st.extend({},a.data))}}function v(e,t){var n,r,i;if(1===t.nodeType){if(n=t.nodeName.toLowerCase(),!st.support.noCloneEvent&&t[st.expando]){r=st._data(t);for(i in r.events)st.removeEvent(t,i,r.handle);t.removeAttribute(st.expando)}"script"===n&&t.text!==e.text?(h(t).text=e.text,g(t)):"object"===n?(t.parentNode&&(t.outerHTML=e.outerHTML),st.support.html5Clone&&e.innerHTML&&!st.trim(t.innerHTML)&&(t.innerHTML=e.innerHTML)):"input"===n&&Zt.test(e.type)?(t.defaultChecked=t.checked=e.checked,t.value!==e.value&&(t.value=e.value)):"option"===n?t.defaultSelected=t.selected=e.defaultSelected:("input"===n||"textarea"===n)&&(t.defaultValue=e.defaultValue)}}function b(e,n){var r,i,o=0,a=e.getElementsByTagName!==t?e.getElementsByTagName(n||"*"):e.querySelectorAll!==t?e.querySelectorAll(n||"*"):t;if(!a)for(a=[],r=e.childNodes||e;null!=(i=r[o]);o++)!n||st.nodeName(i,n)?a.push(i):st.merge(a,b(i,n));return n===t||n&&st.nodeName(e,n)?st.merge([e],a):a}function x(e){Zt.test(e.type)&&(e.defaultChecked=e.checked)}function T(e,t){if(t in e)return t;for(var n=t.charAt(0).toUpperCase()+t.slice(1),r=t,i=Nn.length;i--;)if(t=Nn[i]+n,t in e)return t;return r}function w(e,t){return e=t||e,"none"===st.css(e,"display")||!st.contains(e.ownerDocument,e)}function N(e,t){for(var n,r=[],i=0,o=e.length;o>i;i++)n=e[i],n.style&&(r[i]=st._data(n,"olddisplay"),t?(r[i]||"none"!==n.style.display||(n.style.display=""),""===n.style.display&&w(n)&&(r[i]=st._data(n,"olddisplay",S(n.nodeName)))):r[i]||w(n)||st._data(n,"olddisplay",st.css(n,"display")));for(i=0;o>i;i++)n=e[i],n.style&&(t&&"none"!==n.style.display&&""!==n.style.display||(n.style.display=t?r[i]||"":"none"));return e}function C(e,t,n){var r=mn.exec(t);return r?Math.max(0,r[1]-(n||0))+(r[2]||"px"):t}function k(e,t,n,r,i){for(var o=n===(r?"border":"content")?4:"width"===t?1:0,a=0;4>o;o+=2)"margin"===n&&(a+=st.css(e,n+wn[o],!0,i)),r?("content"===n&&(a-=st.css(e,"padding"+wn[o],!0,i)),"margin"!==n&&(a-=st.css(e,"border"+wn[o]+"Width",!0,i))):(a+=st.css(e,"padding"+wn[o],!0,i),"padding"!==n&&(a+=st.css(e,"border"+wn[o]+"Width",!0,i)));return a}function E(e,t,n){var r=!0,i="width"===t?e.offsetWidth:e.offsetHeight,o=ln(e),a=st.support.boxSizing&&"border-box"===st.css(e,"boxSizing",!1,o);if(0>=i||null==i){if(i=un(e,t,o),(0>i||null==i)&&(i=e.style[t]),yn.test(i))return i;r=a&&(st.support.boxSizingReliable||i===e.style[t]),i=parseFloat(i)||0}return i+k(e,t,n||(a?"border":"content"),r,o)+"px"}function S(e){var t=V,n=bn[e];return n||(n=A(e,t),"none"!==n&&n||(cn=(cn||st("<iframe frameborder='0' width='0' height='0'/>").css("cssText","display:block !important")).appendTo(t.documentElement),t=(cn[0].contentWindow||cn[0].contentDocument).document,t.write("<!doctype html><html><body>"),t.close(),n=A(e,t),cn.detach()),bn[e]=n),n}function A(e,t){var n=st(t.createElement(e)).appendTo(t.body),r=st.css(n[0],"display");return n.remove(),r}function j(e,t,n,r){var i;if(st.isArray(t))st.each(t,function(t,i){n||kn.test(e)?r(e,i):j(e+"["+("object"==typeof i?t:"")+"]",i,n,r)});else if(n||"object"!==st.type(t))r(e,t);else for(i in t)j(e+"["+i+"]",t[i],n,r)}function D(e){return function(t,n){"string"!=typeof t&&(n=t,t="*");var r,i=0,o=t.toLowerCase().match(lt)||[];if(st.isFunction(n))for(;r=o[i++];)"+"===r[0]?(r=r.slice(1)||"*",(e[r]=e[r]||[]).unshift(n)):(e[r]=e[r]||[]).push(n)}}function L(e,n,r,i){function o(u){var l;return a[u]=!0,st.each(e[u]||[],function(e,u){var c=u(n,r,i);return"string"!=typeof c||s||a[c]?s?!(l=c):t:(n.dataTypes.unshift(c),o(c),!1)}),l}var a={},s=e===$n;return o(n.dataTypes[0])||!a["*"]&&o("*")}function H(e,n){var r,i,o=st.ajaxSettings.flatOptions||{};for(r in n)n[r]!==t&&((o[r]?e:i||(i={}))[r]=n[r]);return i&&st.extend(!0,e,i),e}function M(e,n,r){var i,o,a,s,u=e.contents,l=e.dataTypes,c=e.responseFields;for(o in c)o in r&&(n[c[o]]=r[o]);for(;"*"===l[0];)l.shift(),i===t&&(i=e.mimeType||n.getResponseHeader("Content-Type"));if(i)for(o in u)if(u[o]&&u[o].test(i)){l.unshift(o);break}if(l[0]in r)a=l[0];else{for(o in r){if(!l[0]||e.converters[o+" "+l[0]]){a=o;break}s||(s=o)}a=a||s}return a?(a!==l[0]&&l.unshift(a),r[a]):t}function q(e,t){var n,r,i,o,a={},s=0,u=e.dataTypes.slice(),l=u[0];if(e.dataFilter&&(t=e.dataFilter(t,e.dataType)),u[1])for(n in e.converters)a[n.toLowerCase()]=e.converters[n];for(;i=u[++s];)if("*"!==i){if("*"!==l&&l!==i){if(n=a[l+" "+i]||a["* "+i],!n)for(r in a)if(o=r.split(" "),o[1]===i&&(n=a[l+" "+o[0]]||a["* "+o[0]])){n===!0?n=a[r]:a[r]!==!0&&(i=o[0],u.splice(s--,0,i));break}if(n!==!0)if(n&&e["throws"])t=n(t);else try{t=n(t)}catch(c){return{state:"parsererror",error:n?c:"No conversion from "+l+" to "+i}}}l=i}return{state:"success",data:t}}function _(){try{return new e.XMLHttpRequest}catch(t){}}function F(){try{return new e.ActiveXObject("Microsoft.XMLHTTP")}catch(t){}}function O(){return setTimeout(function(){Qn=t}),Qn=st.now()}function B(e,t){st.each(t,function(t,n){for(var r=(rr[t]||[]).concat(rr["*"]),i=0,o=r.length;o>i;i++)if(r[i].call(e,t,n))return})}function P(e,t,n){var r,i,o=0,a=nr.length,s=st.Deferred().always(function(){delete u.elem}),u=function(){if(i)return!1;for(var t=Qn||O(),n=Math.max(0,l.startTime+l.duration-t),r=n/l.duration||0,o=1-r,a=0,u=l.tweens.length;u>a;a++)l.tweens[a].run(o);return s.notifyWith(e,[l,o,n]),1>o&&u?n:(s.resolveWith(e,[l]),!1)},l=s.promise({elem:e,props:st.extend({},t),opts:st.extend(!0,{specialEasing:{}},n),originalProperties:t,originalOptions:n,startTime:Qn||O(),duration:n.duration,tweens:[],createTween:function(t,n){var r=st.Tween(e,l.opts,t,n,l.opts.specialEasing[t]||l.opts.easing);return l.tweens.push(r),r},stop:function(t){var n=0,r=t?l.tweens.length:0;if(i)return this;for(i=!0;r>n;n++)l.tweens[n].run(1);return t?s.resolveWith(e,[l,t]):s.rejectWith(e,[l,t]),this}}),c=l.props;for(R(c,l.opts.specialEasing);a>o;o++)if(r=nr[o].call(l,e,c,l.opts))return r;return B(l,c),st.isFunction(l.opts.start)&&l.opts.start.call(e,l),st.fx.timer(st.extend(u,{elem:e,anim:l,queue:l.opts.queue})),l.progress(l.opts.progress).done(l.opts.done,l.opts.complete).fail(l.opts.fail).always(l.opts.always)}function R(e,t){var n,r,i,o,a;for(n in e)if(r=st.camelCase(n),i=t[r],o=e[n],st.isArray(o)&&(i=o[1],o=e[n]=o[0]),n!==r&&(e[r]=o,delete e[n]),a=st.cssHooks[r],a&&"expand"in a){o=a.expand(o),delete e[r];for(n in o)n in e||(e[n]=o[n],t[n]=i)}else t[r]=i}function W(e,t,n){var r,i,o,a,s,u,l,c,f,p=this,d=e.style,h={},g=[],m=e.nodeType&&w(e);n.queue||(c=st._queueHooks(e,"fx"),null==c.unqueued&&(c.unqueued=0,f=c.empty.fire,c.empty.fire=function(){c.unqueued||f()}),c.unqueued++,p.always(function(){p.always(function(){c.unqueued--,st.queue(e,"fx").length||c.empty.fire()})})),1===e.nodeType&&("height"in t||"width"in t)&&(n.overflow=[d.overflow,d.overflowX,d.overflowY],"inline"===st.css(e,"display")&&"none"===st.css(e,"float")&&(st.support.inlineBlockNeedsLayout&&"inline"!==S(e.nodeName)?d.zoom=1:d.display="inline-block")),n.overflow&&(d.overflow="hidden",st.support.shrinkWrapBlocks||p.done(function(){d.overflow=n.overflow[0],d.overflowX=n.overflow[1],d.overflowY=n.overflow[2]}));for(r in t)if(o=t[r],Zn.exec(o)){if(delete t[r],u=u||"toggle"===o,o===(m?"hide":"show"))continue;g.push(r)}if(a=g.length){s=st._data(e,"fxshow")||st._data(e,"fxshow",{}),"hidden"in s&&(m=s.hidden),u&&(s.hidden=!m),m?st(e).show():p.done(function(){st(e).hide()}),p.done(function(){var t;st._removeData(e,"fxshow");for(t in h)st.style(e,t,h[t])});for(r=0;a>r;r++)i=g[r],l=p.createTween(i,m?s[i]:0),h[i]=s[i]||st.style(e,i),i in s||(s[i]=l.start,m&&(l.end=l.start,l.start="width"===i||"height"===i?1:0))}}function $(e,t,n,r,i){return new $.prototype.init(e,t,n,r,i)}function I(e,t){var n,r={height:e},i=0;for(t=t?1:0;4>i;i+=2-t)n=wn[i],r["margin"+n]=r["padding"+n]=e;return t&&(r.opacity=r.width=e),r}function z(e){return st.isWindow(e)?e:9===e.nodeType?e.defaultView||e.parentWindow:!1}var X,U,V=e.document,Y=e.location,J=e.jQuery,G=e.$,Q={},K=[],Z="1.9.0",et=K.concat,tt=K.push,nt=K.slice,rt=K.indexOf,it=Q.toString,ot=Q.hasOwnProperty,at=Z.trim,st=function(e,t){return new st.fn.init(e,t,X)},ut=/[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,lt=/\S+/g,ct=/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,ft=/^(?:(<[\w\W]+>)[^>]*|#([\w-]*))$/,pt=/^<(\w+)\s*\/?>(?:<\/\1>|)$/,dt=/^[\],:{}\s]*$/,ht=/(?:^|:|,)(?:\s*\[)+/g,gt=/\\(?:["\\\/bfnrt]|u[\da-fA-F]{4})/g,mt=/"[^"\\\r\n]*"|true|false|null|-?(?:\d+\.|)\d+(?:[eE][+-]?\d+|)/g,yt=/^-ms-/,vt=/-([\da-z])/gi,bt=function(e,t){return t.toUpperCase()},xt=function(){V.addEventListener?(V.removeEventListener("DOMContentLoaded",xt,!1),st.ready()):"complete"===V.readyState&&(V.detachEvent("onreadystatechange",xt),st.ready())};st.fn=st.prototype={jquery:Z,constructor:st,init:function(e,n,r){var i,o;if(!e)return this;if("string"==typeof e){if(i="<"===e.charAt(0)&&">"===e.charAt(e.length-1)&&e.length>=3?[null,e,null]:ft.exec(e),!i||!i[1]&&n)return!n||n.jquery?(n||r).find(e):this.constructor(n).find(e);if(i[1]){if(n=n instanceof st?n[0]:n,st.merge(this,st.parseHTML(i[1],n&&n.nodeType?n.ownerDocument||n:V,!0)),pt.test(i[1])&&st.isPlainObject(n))for(i in n)st.isFunction(this[i])?this[i](n[i]):this.attr(i,n[i]);return this}if(o=V.getElementById(i[2]),o&&o.parentNode){if(o.id!==i[2])return r.find(e);this.length=1,this[0]=o}return this.context=V,this.selector=e,this}return e.nodeType?(this.context=this[0]=e,this.length=1,this):st.isFunction(e)?r.ready(e):(e.selector!==t&&(this.selector=e.selector,this.context=e.context),st.makeArray(e,this))},selector:"",length:0,size:function(){return this.length},toArray:function(){return nt.call(this)},get:function(e){return null==e?this.toArray():0>e?this[this.length+e]:this[e]},pushStack:function(e){var t=st.merge(this.constructor(),e);return t.prevObject=this,t.context=this.context,t},each:function(e,t){return st.each(this,e,t)},ready:function(e){return st.ready.promise().done(e),this},slice:function(){return this.pushStack(nt.apply(this,arguments))},first:function(){return this.eq(0)},last:function(){return this.eq(-1)},eq:function(e){var t=this.length,n=+e+(0>e?t:0);return this.pushStack(n>=0&&t>n?[this[n]]:[])},map:function(e){return this.pushStack(st.map(this,function(t,n){return e.call(t,n,t)}))},end:function(){return this.prevObject||this.constructor(null)},push:tt,sort:[].sort,splice:[].splice},st.fn.init.prototype=st.fn,st.extend=st.fn.extend=function(){var e,n,r,i,o,a,s=arguments[0]||{},u=1,l=arguments.length,c=!1;for("boolean"==typeof s&&(c=s,s=arguments[1]||{},u=2),"object"==typeof s||st.isFunction(s)||(s={}),l===u&&(s=this,--u);l>u;u++)if(null!=(e=arguments[u]))for(n in e)r=s[n],i=e[n],s!==i&&(c&&i&&(st.isPlainObject(i)||(o=st.isArray(i)))?(o?(o=!1,a=r&&st.isArray(r)?r:[]):a=r&&st.isPlainObject(r)?r:{},s[n]=st.extend(c,a,i)):i!==t&&(s[n]=i));return s},st.extend({noConflict:function(t){return e.$===st&&(e.$=G),t&&e.jQuery===st&&(e.jQuery=J),st},isReady:!1,readyWait:1,holdReady:function(e){e?st.readyWait++:st.ready(!0)},ready:function(e){if(e===!0?!--st.readyWait:!st.isReady){if(!V.body)return setTimeout(st.ready);st.isReady=!0,e!==!0&&--st.readyWait>0||(U.resolveWith(V,[st]),st.fn.trigger&&st(V).trigger("ready").off("ready"))}},isFunction:function(e){return"function"===st.type(e)},isArray:Array.isArray||function(e){return"array"===st.type(e)},isWindow:function(e){return null!=e&&e==e.window},isNumeric:function(e){return!isNaN(parseFloat(e))&&isFinite(e)},type:function(e){return null==e?e+"":"object"==typeof e||"function"==typeof e?Q[it.call(e)]||"object":typeof e},isPlainObject:function(e){if(!e||"object"!==st.type(e)||e.nodeType||st.isWindow(e))return!1;try{if(e.constructor&&!ot.call(e,"constructor")&&!ot.call(e.constructor.prototype,"isPrototypeOf"))return!1}catch(n){return!1}var r;for(r in e);return r===t||ot.call(e,r)},isEmptyObject:function(e){var t;for(t in e)return!1;return!0},error:function(e){throw Error(e)},parseHTML:function(e,t,n){if(!e||"string"!=typeof e)return null;"boolean"==typeof t&&(n=t,t=!1),t=t||V;var r=pt.exec(e),i=!n&&[];return r?[t.createElement(r[1])]:(r=st.buildFragment([e],t,i),i&&st(i).remove(),st.merge([],r.childNodes))},parseJSON:function(n){return e.JSON&&e.JSON.parse?e.JSON.parse(n):null===n?n:"string"==typeof n&&(n=st.trim(n),n&&dt.test(n.replace(gt,"@").replace(mt,"]").replace(ht,"")))?Function("return "+n)():(st.error("Invalid JSON: "+n),t)},parseXML:function(n){var r,i;if(!n||"string"!=typeof n)return null;try{e.DOMParser?(i=new DOMParser,r=i.parseFromString(n,"text/xml")):(r=new ActiveXObject("Microsoft.XMLDOM"),r.async="false",r.loadXML(n))}catch(o){r=t}return r&&r.documentElement&&!r.getElementsByTagName("parsererror").length||st.error("Invalid XML: "+n),r},noop:function(){},globalEval:function(t){t&&st.trim(t)&&(e.execScript||function(t){e.eval.call(e,t)})(t)},camelCase:function(e){return e.replace(yt,"ms-").replace(vt,bt)},nodeName:function(e,t){return e.nodeName&&e.nodeName.toLowerCase()===t.toLowerCase()},each:function(e,t,r){var i,o=0,a=e.length,s=n(e);if(r){if(s)for(;a>o&&(i=t.apply(e[o],r),i!==!1);o++);else for(o in e)if(i=t.apply(e[o],r),i===!1)break}else if(s)for(;a>o&&(i=t.call(e[o],o,e[o]),i!==!1);o++);else for(o in e)if(i=t.call(e[o],o,e[o]),i===!1)break;return e},trim:at&&!at.call("\ufeff\u00a0")?function(e){return null==e?"":at.call(e)}:function(e){return null==e?"":(e+"").replace(ct,"")},makeArray:function(e,t){var r=t||[];return null!=e&&(n(Object(e))?st.merge(r,"string"==typeof e?[e]:e):tt.call(r,e)),r},inArray:function(e,t,n){var r;if(t){if(rt)return rt.call(t,e,n);for(r=t.length,n=n?0>n?Math.max(0,r+n):n:0;r>n;n++)if(n in t&&t[n]===e)return n}return-1},merge:function(e,n){var r=n.length,i=e.length,o=0;if("number"==typeof r)for(;r>o;o++)e[i++]=n[o];else for(;n[o]!==t;)e[i++]=n[o++];return e.length=i,e},grep:function(e,t,n){var r,i=[],o=0,a=e.length;for(n=!!n;a>o;o++)r=!!t(e[o],o),n!==r&&i.push(e[o]);return i},map:function(e,t,r){var i,o=0,a=e.length,s=n(e),u=[];if(s)for(;a>o;o++)i=t(e[o],o,r),null!=i&&(u[u.length]=i);else for(o in e)i=t(e[o],o,r),null!=i&&(u[u.length]=i);return et.apply([],u)},guid:1,proxy:function(e,n){var r,i,o;return"string"==typeof n&&(r=e[n],n=e,e=r),st.isFunction(e)?(i=nt.call(arguments,2),o=function(){return e.apply(n||this,i.concat(nt.call(arguments)))},o.guid=e.guid=e.guid||st.guid++,o):t},access:function(e,n,r,i,o,a,s){var u=0,l=e.length,c=null==r;if("object"===st.type(r)){o=!0;for(u in r)st.access(e,n,u,r[u],!0,a,s)}else if(i!==t&&(o=!0,st.isFunction(i)||(s=!0),c&&(s?(n.call(e,i),n=null):(c=n,n=function(e,t,n){return c.call(st(e),n)})),n))for(;l>u;u++)n(e[u],r,s?i:i.call(e[u],u,n(e[u],r)));return o?e:c?n.call(e):l?n(e[0],r):a},now:function(){return(new Date).getTime()}}),st.ready.promise=function(t){if(!U)if(U=st.Deferred(),"complete"===V.readyState)setTimeout(st.ready);else if(V.addEventListener)V.addEventListener("DOMContentLoaded",xt,!1),e.addEventListener("load",st.ready,!1);else{V.attachEvent("onreadystatechange",xt),e.attachEvent("onload",st.ready);var n=!1;try{n=null==e.frameElement&&V.documentElement}catch(r){}n&&n.doScroll&&function i(){if(!st.isReady){try{n.doScroll("left")}catch(e){return setTimeout(i,50)}st.ready()}}()}return U.promise(t)},st.each("Boolean Number String Function Array Date RegExp Object Error".split(" "),function(e,t){Q["[object "+t+"]"]=t.toLowerCase()}),X=st(V);var Tt={};st.Callbacks=function(e){e="string"==typeof e?Tt[e]||r(e):st.extend({},e);var n,i,o,a,s,u,l=[],c=!e.once&&[],f=function(t){for(n=e.memory&&t,i=!0,u=a||0,a=0,s=l.length,o=!0;l&&s>u;u++)if(l[u].apply(t[0],t[1])===!1&&e.stopOnFalse){n=!1;break}o=!1,l&&(c?c.length&&f(c.shift()):n?l=[]:p.disable())},p={add:function(){if(l){var t=l.length;(function r(t){st.each(t,function(t,n){var i=st.type(n);"function"===i?e.unique&&p.has(n)||l.push(n):n&&n.length&&"string"!==i&&r(n)})})(arguments),o?s=l.length:n&&(a=t,f(n))}return this},remove:function(){return l&&st.each(arguments,function(e,t){for(var n;(n=st.inArray(t,l,n))>-1;)l.splice(n,1),o&&(s>=n&&s--,u>=n&&u--)}),this},has:function(e){return st.inArray(e,l)>-1},empty:function(){return l=[],this},disable:function(){return l=c=n=t,this},disabled:function(){return!l},lock:function(){return c=t,n||p.disable(),this},locked:function(){return!c},fireWith:function(e,t){return t=t||[],t=[e,t.slice?t.slice():t],!l||i&&!c||(o?c.push(t):f(t)),this},fire:function(){return p.fireWith(this,arguments),this},fired:function(){return!!i}};return p},st.extend({Deferred:function(e){var t=[["resolve","done",st.Callbacks("once memory"),"resolved"],["reject","fail",st.Callbacks("once memory"),"rejected"],["notify","progress",st.Callbacks("memory")]],n="pending",r={state:function(){return n},always:function(){return i.done(arguments).fail(arguments),this},then:function(){var e=arguments;return st.Deferred(function(n){st.each(t,function(t,o){var a=o[0],s=st.isFunction(e[t])&&e[t];i[o[1]](function(){var e=s&&s.apply(this,arguments);e&&st.isFunction(e.promise)?e.promise().done(n.resolve).fail(n.reject).progress(n.notify):n[a+"With"](this===r?n.promise():this,s?[e]:arguments)})}),e=null}).promise()},promise:function(e){return null!=e?st.extend(e,r):r}},i={};return r.pipe=r.then,st.each(t,function(e,o){var a=o[2],s=o[3];r[o[1]]=a.add,s&&a.add(function(){n=s},t[1^e][2].disable,t[2][2].lock),i[o[0]]=function(){return i[o[0]+"With"](this===i?r:this,arguments),this},i[o[0]+"With"]=a.fireWith}),r.promise(i),e&&e.call(i,i),i},when:function(e){var t,n,r,i=0,o=nt.call(arguments),a=o.length,s=1!==a||e&&st.isFunction(e.promise)?a:0,u=1===s?e:st.Deferred(),l=function(e,n,r){return function(i){n[e]=this,r[e]=arguments.length>1?nt.call(arguments):i,r===t?u.notifyWith(n,r):--s||u.resolveWith(n,r)}};if(a>1)for(t=Array(a),n=Array(a),r=Array(a);a>i;i++)o[i]&&st.isFunction(o[i].promise)?o[i].promise().done(l(i,r,o)).fail(u.reject).progress(l(i,n,t)):--s;return s||u.resolveWith(r,o),u.promise()}}),st.support=function(){var n,r,i,o,a,s,u,l,c,f,p=V.createElement("div");if(p.setAttribute("className","t"),p.innerHTML="  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>",r=p.getElementsByTagName("*"),i=p.getElementsByTagName("a")[0],!r||!i||!r.length)return{};o=V.createElement("select"),a=o.appendChild(V.createElement("option")),s=p.getElementsByTagName("input")[0],i.style.cssText="top:1px;float:left;opacity:.5",n={getSetAttribute:"t"!==p.className,leadingWhitespace:3===p.firstChild.nodeType,tbody:!p.getElementsByTagName("tbody").length,htmlSerialize:!!p.getElementsByTagName("link").length,style:/top/.test(i.getAttribute("style")),hrefNormalized:"/a"===i.getAttribute("href"),opacity:/^0.5/.test(i.style.opacity),cssFloat:!!i.style.cssFloat,checkOn:!!s.value,optSelected:a.selected,enctype:!!V.createElement("form").enctype,html5Clone:"<:nav></:nav>"!==V.createElement("nav").cloneNode(!0).outerHTML,boxModel:"CSS1Compat"===V.compatMode,deleteExpando:!0,noCloneEvent:!0,inlineBlockNeedsLayout:!1,shrinkWrapBlocks:!1,reliableMarginRight:!0,boxSizingReliable:!0,pixelPosition:!1},s.checked=!0,n.noCloneChecked=s.cloneNode(!0).checked,o.disabled=!0,n.optDisabled=!a.disabled;try{delete p.test}catch(d){n.deleteExpando=!1}s=V.createElement("input"),s.setAttribute("value",""),n.input=""===s.getAttribute("value"),s.value="t",s.setAttribute("type","radio"),n.radioValue="t"===s.value,s.setAttribute("checked","t"),s.setAttribute("name","t"),u=V.createDocumentFragment(),u.appendChild(s),n.appendChecked=s.checked,n.checkClone=u.cloneNode(!0).cloneNode(!0).lastChild.checked,p.attachEvent&&(p.attachEvent("onclick",function(){n.noCloneEvent=!1}),p.cloneNode(!0).click());for(f in{submit:!0,change:!0,focusin:!0})p.setAttribute(l="on"+f,"t"),n[f+"Bubbles"]=l in e||p.attributes[l].expando===!1;return p.style.backgroundClip="content-box",p.cloneNode(!0).style.backgroundClip="",n.clearCloneStyle="content-box"===p.style.backgroundClip,st(function(){var r,i,o,a="padding:0;margin:0;border:0;display:block;box-sizing:content-box;-moz-box-sizing:content-box;-webkit-box-sizing:content-box;",s=V.getElementsByTagName("body")[0];s&&(r=V.createElement("div"),r.style.cssText="border:0;width:0;height:0;position:absolute;top:0;left:-9999px;margin-top:1px",s.appendChild(r).appendChild(p),p.innerHTML="<table><tr><td></td><td>t</td></tr></table>",o=p.getElementsByTagName("td"),o[0].style.cssText="padding:0;margin:0;border:0;display:none",c=0===o[0].offsetHeight,o[0].style.display="",o[1].style.display="none",n.reliableHiddenOffsets=c&&0===o[0].offsetHeight,p.innerHTML="",p.style.cssText="box-sizing:border-box;-moz-box-sizing:border-box;-webkit-box-sizing:border-box;padding:1px;border:1px;display:block;width:4px;margin-top:1%;position:absolute;top:1%;",n.boxSizing=4===p.offsetWidth,n.doesNotIncludeMarginInBodyOffset=1!==s.offsetTop,e.getComputedStyle&&(n.pixelPosition="1%"!==(e.getComputedStyle(p,null)||{}).top,n.boxSizingReliable="4px"===(e.getComputedStyle(p,null)||{width:"4px"}).width,i=p.appendChild(V.createElement("div")),i.style.cssText=p.style.cssText=a,i.style.marginRight=i.style.width="0",p.style.width="1px",n.reliableMarginRight=!parseFloat((e.getComputedStyle(i,null)||{}).marginRight)),p.style.zoom!==t&&(p.innerHTML="",p.style.cssText=a+"width:1px;padding:1px;display:inline;zoom:1",n.inlineBlockNeedsLayout=3===p.offsetWidth,p.style.display="block",p.innerHTML="<div></div>",p.firstChild.style.width="5px",n.shrinkWrapBlocks=3!==p.offsetWidth,s.style.zoom=1),s.removeChild(r),r=p=o=i=null)}),r=o=u=a=i=s=null,n}();var wt=/(?:\{[\s\S]*\}|\[[\s\S]*\])$/,Nt=/([A-Z])/g;st.extend({cache:{},expando:"jQuery"+(Z+Math.random()).replace(/\D/g,""),noData:{embed:!0,object:"clsid:D27CDB6E-AE6D-11cf-96B8-444553540000",applet:!0},hasData:function(e){return e=e.nodeType?st.cache[e[st.expando]]:e[st.expando],!!e&&!s(e)},data:function(e,t,n){return i(e,t,n,!1)},removeData:function(e,t){return o(e,t,!1)},_data:function(e,t,n){return i(e,t,n,!0)},_removeData:function(e,t){return o(e,t,!0)},acceptData:function(e){var t=e.nodeName&&st.noData[e.nodeName.toLowerCase()];return!t||t!==!0&&e.getAttribute("classid")===t}}),st.fn.extend({data:function(e,n){var r,i,o=this[0],s=0,u=null;if(e===t){if(this.length&&(u=st.data(o),1===o.nodeType&&!st._data(o,"parsedAttrs"))){for(r=o.attributes;r.length>s;s++)i=r[s].name,i.indexOf("data-")||(i=st.camelCase(i.substring(5)),a(o,i,u[i]));st._data(o,"parsedAttrs",!0)}return u}return"object"==typeof e?this.each(function(){st.data(this,e)}):st.access(this,function(n){return n===t?o?a(o,e,st.data(o,e)):null:(this.each(function(){st.data(this,e,n)}),t)},null,n,arguments.length>1,null,!0)},removeData:function(e){return this.each(function(){st.removeData(this,e)})}}),st.extend({queue:function(e,n,r){var i;return e?(n=(n||"fx")+"queue",i=st._data(e,n),r&&(!i||st.isArray(r)?i=st._data(e,n,st.makeArray(r)):i.push(r)),i||[]):t},dequeue:function(e,t){t=t||"fx";var n=st.queue(e,t),r=n.length,i=n.shift(),o=st._queueHooks(e,t),a=function(){st.dequeue(e,t)};"inprogress"===i&&(i=n.shift(),r--),o.cur=i,i&&("fx"===t&&n.unshift("inprogress"),delete o.stop,i.call(e,a,o)),!r&&o&&o.empty.fire()},_queueHooks:function(e,t){var n=t+"queueHooks";return st._data(e,n)||st._data(e,n,{empty:st.Callbacks("once memory").add(function(){st._removeData(e,t+"queue"),st._removeData(e,n)})})}}),st.fn.extend({queue:function(e,n){var r=2;return"string"!=typeof e&&(n=e,e="fx",r--),r>arguments.length?st.queue(this[0],e):n===t?this:this.each(function(){var t=st.queue(this,e,n);st._queueHooks(this,e),"fx"===e&&"inprogress"!==t[0]&&st.dequeue(this,e)})},dequeue:function(e){return this.each(function(){st.dequeue(this,e)})},delay:function(e,t){return e=st.fx?st.fx.speeds[e]||e:e,t=t||"fx",this.queue(t,function(t,n){var r=setTimeout(t,e);n.stop=function(){clearTimeout(r)}})},clearQueue:function(e){return this.queue(e||"fx",[])},promise:function(e,n){var r,i=1,o=st.Deferred(),a=this,s=this.length,u=function(){--i||o.resolveWith(a,[a])};for("string"!=typeof e&&(n=e,e=t),e=e||"fx";s--;)r=st._data(a[s],e+"queueHooks"),r&&r.empty&&(i++,r.empty.add(u));return u(),o.promise(n)}});var Ct,kt,Et=/[\t\r\n]/g,St=/\r/g,At=/^(?:input|select|textarea|button|object)$/i,jt=/^(?:a|area)$/i,Dt=/^(?:checked|selected|autofocus|autoplay|async|controls|defer|disabled|hidden|loop|multiple|open|readonly|required|scoped)$/i,Lt=/^(?:checked|selected)$/i,Ht=st.support.getSetAttribute,Mt=st.support.input;st.fn.extend({attr:function(e,t){return st.access(this,st.attr,e,t,arguments.length>1)},removeAttr:function(e){return this.each(function(){st.removeAttr(this,e)})},prop:function(e,t){return st.access(this,st.prop,e,t,arguments.length>1)},removeProp:function(e){return e=st.propFix[e]||e,this.each(function(){try{this[e]=t,delete this[e]}catch(n){}})},addClass:function(e){var t,n,r,i,o,a=0,s=this.length,u="string"==typeof e&&e;if(st.isFunction(e))return this.each(function(t){st(this).addClass(e.call(this,t,this.className))});if(u)for(t=(e||"").match(lt)||[];s>a;a++)if(n=this[a],r=1===n.nodeType&&(n.className?(" "+n.className+" ").replace(Et," "):" ")){for(o=0;i=t[o++];)0>r.indexOf(" "+i+" ")&&(r+=i+" ");n.className=st.trim(r)}return this},removeClass:function(e){var t,n,r,i,o,a=0,s=this.length,u=0===arguments.length||"string"==typeof e&&e;if(st.isFunction(e))return this.each(function(t){st(this).removeClass(e.call(this,t,this.className))});if(u)for(t=(e||"").match(lt)||[];s>a;a++)if(n=this[a],r=1===n.nodeType&&(n.className?(" "+n.className+" ").replace(Et," "):"")){for(o=0;i=t[o++];)for(;r.indexOf(" "+i+" ")>=0;)r=r.replace(" "+i+" "," ");n.className=e?st.trim(r):""}return this},toggleClass:function(e,t){var n=typeof e,r="boolean"==typeof t;return st.isFunction(e)?this.each(function(n){st(this).toggleClass(e.call(this,n,this.className,t),t)}):this.each(function(){if("string"===n)for(var i,o=0,a=st(this),s=t,u=e.match(lt)||[];i=u[o++];)s=r?s:!a.hasClass(i),a[s?"addClass":"removeClass"](i);else("undefined"===n||"boolean"===n)&&(this.className&&st._data(this,"__className__",this.className),this.className=this.className||e===!1?"":st._data(this,"__className__")||"")})},hasClass:function(e){for(var t=" "+e+" ",n=0,r=this.length;r>n;n++)if(1===this[n].nodeType&&(" "+this[n].className+" ").replace(Et," ").indexOf(t)>=0)return!0;return!1},val:function(e){var n,r,i,o=this[0];{if(arguments.length)return i=st.isFunction(e),this.each(function(r){var o,a=st(this);1===this.nodeType&&(o=i?e.call(this,r,a.val()):e,null==o?o="":"number"==typeof o?o+="":st.isArray(o)&&(o=st.map(o,function(e){return null==e?"":e+""})),n=st.valHooks[this.type]||st.valHooks[this.nodeName.toLowerCase()],n&&"set"in n&&n.set(this,o,"value")!==t||(this.value=o))});if(o)return n=st.valHooks[o.type]||st.valHooks[o.nodeName.toLowerCase()],n&&"get"in n&&(r=n.get(o,"value"))!==t?r:(r=o.value,"string"==typeof r?r.replace(St,""):null==r?"":r)}}}),st.extend({valHooks:{option:{get:function(e){var t=e.attributes.value;return!t||t.specified?e.value:e.text}},select:{get:function(e){for(var t,n,r=e.options,i=e.selectedIndex,o="select-one"===e.type||0>i,a=o?null:[],s=o?i+1:r.length,u=0>i?s:o?i:0;s>u;u++)if(n=r[u],!(!n.selected&&u!==i||(st.support.optDisabled?n.disabled:null!==n.getAttribute("disabled"))||n.parentNode.disabled&&st.nodeName(n.parentNode,"optgroup"))){if(t=st(n).val(),o)return t;a.push(t)}return a},set:function(e,t){var n=st.makeArray(t);return st(e).find("option").each(function(){this.selected=st.inArray(st(this).val(),n)>=0}),n.length||(e.selectedIndex=-1),n}}},attr:function(e,n,r){var i,o,a,s=e.nodeType;if(e&&3!==s&&8!==s&&2!==s)return e.getAttribute===t?st.prop(e,n,r):(a=1!==s||!st.isXMLDoc(e),a&&(n=n.toLowerCase(),o=st.attrHooks[n]||(Dt.test(n)?kt:Ct)),r===t?o&&a&&"get"in o&&null!==(i=o.get(e,n))?i:(e.getAttribute!==t&&(i=e.getAttribute(n)),null==i?t:i):null!==r?o&&a&&"set"in o&&(i=o.set(e,r,n))!==t?i:(e.setAttribute(n,r+""),r):(st.removeAttr(e,n),t))},removeAttr:function(e,t){var n,r,i=0,o=t&&t.match(lt);if(o&&1===e.nodeType)for(;n=o[i++];)r=st.propFix[n]||n,Dt.test(n)?!Ht&&Lt.test(n)?e[st.camelCase("default-"+n)]=e[r]=!1:e[r]=!1:st.attr(e,n,""),e.removeAttribute(Ht?n:r)},attrHooks:{type:{set:function(e,t){if(!st.support.radioValue&&"radio"===t&&st.nodeName(e,"input")){var n=e.value;return e.setAttribute("type",t),n&&(e.value=n),t}}}},propFix:{tabindex:"tabIndex",readonly:"readOnly","for":"htmlFor","class":"className",maxlength:"maxLength",cellspacing:"cellSpacing",cellpadding:"cellPadding",rowspan:"rowSpan",colspan:"colSpan",usemap:"useMap",frameborder:"frameBorder",contenteditable:"contentEditable"},prop:function(e,n,r){var i,o,a,s=e.nodeType;if(e&&3!==s&&8!==s&&2!==s)return a=1!==s||!st.isXMLDoc(e),a&&(n=st.propFix[n]||n,o=st.propHooks[n]),r!==t?o&&"set"in o&&(i=o.set(e,r,n))!==t?i:e[n]=r:o&&"get"in o&&null!==(i=o.get(e,n))?i:e[n]},propHooks:{tabIndex:{get:function(e){var n=e.getAttributeNode("tabindex");return n&&n.specified?parseInt(n.value,10):At.test(e.nodeName)||jt.test(e.nodeName)&&e.href?0:t}}}}),kt={get:function(e,n){var r=st.prop(e,n),i="boolean"==typeof r&&e.getAttribute(n),o="boolean"==typeof r?Mt&&Ht?null!=i:Lt.test(n)?e[st.camelCase("default-"+n)]:!!i:e.getAttributeNode(n);return o&&o.value!==!1?n.toLowerCase():t},set:function(e,t,n){return t===!1?st.removeAttr(e,n):Mt&&Ht||!Lt.test(n)?e.setAttribute(!Ht&&st.propFix[n]||n,n):e[st.camelCase("default-"+n)]=e[n]=!0,n}},Mt&&Ht||(st.attrHooks.value={get:function(e,n){var r=e.getAttributeNode(n);return st.nodeName(e,"input")?e.defaultValue:r&&r.specified?r.value:t
},set:function(e,n,r){return st.nodeName(e,"input")?(e.defaultValue=n,t):Ct&&Ct.set(e,n,r)}}),Ht||(Ct=st.valHooks.button={get:function(e,n){var r=e.getAttributeNode(n);return r&&("id"===n||"name"===n||"coords"===n?""!==r.value:r.specified)?r.value:t},set:function(e,n,r){var i=e.getAttributeNode(r);return i||e.setAttributeNode(i=e.ownerDocument.createAttribute(r)),i.value=n+="","value"===r||n===e.getAttribute(r)?n:t}},st.attrHooks.contenteditable={get:Ct.get,set:function(e,t,n){Ct.set(e,""===t?!1:t,n)}},st.each(["width","height"],function(e,n){st.attrHooks[n]=st.extend(st.attrHooks[n],{set:function(e,r){return""===r?(e.setAttribute(n,"auto"),r):t}})})),st.support.hrefNormalized||(st.each(["href","src","width","height"],function(e,n){st.attrHooks[n]=st.extend(st.attrHooks[n],{get:function(e){var r=e.getAttribute(n,2);return null==r?t:r}})}),st.each(["href","src"],function(e,t){st.propHooks[t]={get:function(e){return e.getAttribute(t,4)}}})),st.support.style||(st.attrHooks.style={get:function(e){return e.style.cssText||t},set:function(e,t){return e.style.cssText=t+""}}),st.support.optSelected||(st.propHooks.selected=st.extend(st.propHooks.selected,{get:function(e){var t=e.parentNode;return t&&(t.selectedIndex,t.parentNode&&t.parentNode.selectedIndex),null}})),st.support.enctype||(st.propFix.enctype="encoding"),st.support.checkOn||st.each(["radio","checkbox"],function(){st.valHooks[this]={get:function(e){return null===e.getAttribute("value")?"on":e.value}}}),st.each(["radio","checkbox"],function(){st.valHooks[this]=st.extend(st.valHooks[this],{set:function(e,n){return st.isArray(n)?e.checked=st.inArray(st(e).val(),n)>=0:t}})});var qt=/^(?:input|select|textarea)$/i,_t=/^key/,Ft=/^(?:mouse|contextmenu)|click/,Ot=/^(?:focusinfocus|focusoutblur)$/,Bt=/^([^.]*)(?:\.(.+)|)$/;st.event={global:{},add:function(e,n,r,i,o){var a,s,u,l,c,f,p,d,h,g,m,y=3!==e.nodeType&&8!==e.nodeType&&st._data(e);if(y){for(r.handler&&(a=r,r=a.handler,o=a.selector),r.guid||(r.guid=st.guid++),(l=y.events)||(l=y.events={}),(s=y.handle)||(s=y.handle=function(e){return st===t||e&&st.event.triggered===e.type?t:st.event.dispatch.apply(s.elem,arguments)},s.elem=e),n=(n||"").match(lt)||[""],c=n.length;c--;)u=Bt.exec(n[c])||[],h=m=u[1],g=(u[2]||"").split(".").sort(),p=st.event.special[h]||{},h=(o?p.delegateType:p.bindType)||h,p=st.event.special[h]||{},f=st.extend({type:h,origType:m,data:i,handler:r,guid:r.guid,selector:o,needsContext:o&&st.expr.match.needsContext.test(o),namespace:g.join(".")},a),(d=l[h])||(d=l[h]=[],d.delegateCount=0,p.setup&&p.setup.call(e,i,g,s)!==!1||(e.addEventListener?e.addEventListener(h,s,!1):e.attachEvent&&e.attachEvent("on"+h,s))),p.add&&(p.add.call(e,f),f.handler.guid||(f.handler.guid=r.guid)),o?d.splice(d.delegateCount++,0,f):d.push(f),st.event.global[h]=!0;e=null}},remove:function(e,t,n,r,i){var o,a,s,u,l,c,f,p,d,h,g,m=st.hasData(e)&&st._data(e);if(m&&(u=m.events)){for(t=(t||"").match(lt)||[""],l=t.length;l--;)if(s=Bt.exec(t[l])||[],d=g=s[1],h=(s[2]||"").split(".").sort(),d){for(f=st.event.special[d]||{},d=(r?f.delegateType:f.bindType)||d,p=u[d]||[],s=s[2]&&RegExp("(^|\\.)"+h.join("\\.(?:.*\\.|)")+"(\\.|$)"),a=o=p.length;o--;)c=p[o],!i&&g!==c.origType||n&&n.guid!==c.guid||s&&!s.test(c.namespace)||r&&r!==c.selector&&("**"!==r||!c.selector)||(p.splice(o,1),c.selector&&p.delegateCount--,f.remove&&f.remove.call(e,c));a&&!p.length&&(f.teardown&&f.teardown.call(e,h,m.handle)!==!1||st.removeEvent(e,d,m.handle),delete u[d])}else for(d in u)st.event.remove(e,d+t[l],n,r,!0);st.isEmptyObject(u)&&(delete m.handle,st._removeData(e,"events"))}},trigger:function(n,r,i,o){var a,s,u,l,c,f,p,d=[i||V],h=n.type||n,g=n.namespace?n.namespace.split("."):[];if(s=u=i=i||V,3!==i.nodeType&&8!==i.nodeType&&!Ot.test(h+st.event.triggered)&&(h.indexOf(".")>=0&&(g=h.split("."),h=g.shift(),g.sort()),c=0>h.indexOf(":")&&"on"+h,n=n[st.expando]?n:new st.Event(h,"object"==typeof n&&n),n.isTrigger=!0,n.namespace=g.join("."),n.namespace_re=n.namespace?RegExp("(^|\\.)"+g.join("\\.(?:.*\\.|)")+"(\\.|$)"):null,n.result=t,n.target||(n.target=i),r=null==r?[n]:st.makeArray(r,[n]),p=st.event.special[h]||{},o||!p.trigger||p.trigger.apply(i,r)!==!1)){if(!o&&!p.noBubble&&!st.isWindow(i)){for(l=p.delegateType||h,Ot.test(l+h)||(s=s.parentNode);s;s=s.parentNode)d.push(s),u=s;u===(i.ownerDocument||V)&&d.push(u.defaultView||u.parentWindow||e)}for(a=0;(s=d[a++])&&!n.isPropagationStopped();)n.type=a>1?l:p.bindType||h,f=(st._data(s,"events")||{})[n.type]&&st._data(s,"handle"),f&&f.apply(s,r),f=c&&s[c],f&&st.acceptData(s)&&f.apply&&f.apply(s,r)===!1&&n.preventDefault();if(n.type=h,!(o||n.isDefaultPrevented()||p._default&&p._default.apply(i.ownerDocument,r)!==!1||"click"===h&&st.nodeName(i,"a")||!st.acceptData(i)||!c||!i[h]||st.isWindow(i))){u=i[c],u&&(i[c]=null),st.event.triggered=h;try{i[h]()}catch(m){}st.event.triggered=t,u&&(i[c]=u)}return n.result}},dispatch:function(e){e=st.event.fix(e);var n,r,i,o,a,s=[],u=nt.call(arguments),l=(st._data(this,"events")||{})[e.type]||[],c=st.event.special[e.type]||{};if(u[0]=e,e.delegateTarget=this,!c.preDispatch||c.preDispatch.call(this,e)!==!1){for(s=st.event.handlers.call(this,e,l),n=0;(o=s[n++])&&!e.isPropagationStopped();)for(e.currentTarget=o.elem,r=0;(a=o.handlers[r++])&&!e.isImmediatePropagationStopped();)(!e.namespace_re||e.namespace_re.test(a.namespace))&&(e.handleObj=a,e.data=a.data,i=((st.event.special[a.origType]||{}).handle||a.handler).apply(o.elem,u),i!==t&&(e.result=i)===!1&&(e.preventDefault(),e.stopPropagation()));return c.postDispatch&&c.postDispatch.call(this,e),e.result}},handlers:function(e,n){var r,i,o,a,s=[],u=n.delegateCount,l=e.target;if(u&&l.nodeType&&(!e.button||"click"!==e.type))for(;l!=this;l=l.parentNode||this)if(l.disabled!==!0||"click"!==e.type){for(i=[],r=0;u>r;r++)a=n[r],o=a.selector+" ",i[o]===t&&(i[o]=a.needsContext?st(o,this).index(l)>=0:st.find(o,this,null,[l]).length),i[o]&&i.push(a);i.length&&s.push({elem:l,handlers:i})}return n.length>u&&s.push({elem:this,handlers:n.slice(u)}),s},fix:function(e){if(e[st.expando])return e;var t,n,r=e,i=st.event.fixHooks[e.type]||{},o=i.props?this.props.concat(i.props):this.props;for(e=new st.Event(r),t=o.length;t--;)n=o[t],e[n]=r[n];return e.target||(e.target=r.srcElement||V),3===e.target.nodeType&&(e.target=e.target.parentNode),e.metaKey=!!e.metaKey,i.filter?i.filter(e,r):e},props:"altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),fixHooks:{},keyHooks:{props:"char charCode key keyCode".split(" "),filter:function(e,t){return null==e.which&&(e.which=null!=t.charCode?t.charCode:t.keyCode),e}},mouseHooks:{props:"button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),filter:function(e,n){var r,i,o,a=n.button,s=n.fromElement;return null==e.pageX&&null!=n.clientX&&(r=e.target.ownerDocument||V,i=r.documentElement,o=r.body,e.pageX=n.clientX+(i&&i.scrollLeft||o&&o.scrollLeft||0)-(i&&i.clientLeft||o&&o.clientLeft||0),e.pageY=n.clientY+(i&&i.scrollTop||o&&o.scrollTop||0)-(i&&i.clientTop||o&&o.clientTop||0)),!e.relatedTarget&&s&&(e.relatedTarget=s===e.target?n.toElement:s),e.which||a===t||(e.which=1&a?1:2&a?3:4&a?2:0),e}},special:{load:{noBubble:!0},click:{trigger:function(){return st.nodeName(this,"input")&&"checkbox"===this.type&&this.click?(this.click(),!1):t}},focus:{trigger:function(){if(this!==V.activeElement&&this.focus)try{return this.focus(),!1}catch(e){}},delegateType:"focusin"},blur:{trigger:function(){return this===V.activeElement&&this.blur?(this.blur(),!1):t},delegateType:"focusout"},beforeunload:{postDispatch:function(e){e.result!==t&&(e.originalEvent.returnValue=e.result)}}},simulate:function(e,t,n,r){var i=st.extend(new st.Event,n,{type:e,isSimulated:!0,originalEvent:{}});r?st.event.trigger(i,null,t):st.event.dispatch.call(t,i),i.isDefaultPrevented()&&n.preventDefault()}},st.removeEvent=V.removeEventListener?function(e,t,n){e.removeEventListener&&e.removeEventListener(t,n,!1)}:function(e,n,r){var i="on"+n;e.detachEvent&&(e[i]===t&&(e[i]=null),e.detachEvent(i,r))},st.Event=function(e,n){return this instanceof st.Event?(e&&e.type?(this.originalEvent=e,this.type=e.type,this.isDefaultPrevented=e.defaultPrevented||e.returnValue===!1||e.getPreventDefault&&e.getPreventDefault()?u:l):this.type=e,n&&st.extend(this,n),this.timeStamp=e&&e.timeStamp||st.now(),this[st.expando]=!0,t):new st.Event(e,n)},st.Event.prototype={isDefaultPrevented:l,isPropagationStopped:l,isImmediatePropagationStopped:l,preventDefault:function(){var e=this.originalEvent;this.isDefaultPrevented=u,e&&(e.preventDefault?e.preventDefault():e.returnValue=!1)},stopPropagation:function(){var e=this.originalEvent;this.isPropagationStopped=u,e&&(e.stopPropagation&&e.stopPropagation(),e.cancelBubble=!0)},stopImmediatePropagation:function(){this.isImmediatePropagationStopped=u,this.stopPropagation()}},st.each({mouseenter:"mouseover",mouseleave:"mouseout"},function(e,t){st.event.special[e]={delegateType:t,bindType:t,handle:function(e){var n,r=this,i=e.relatedTarget,o=e.handleObj;return(!i||i!==r&&!st.contains(r,i))&&(e.type=o.origType,n=o.handler.apply(this,arguments),e.type=t),n}}}),st.support.submitBubbles||(st.event.special.submit={setup:function(){return st.nodeName(this,"form")?!1:(st.event.add(this,"click._submit keypress._submit",function(e){var n=e.target,r=st.nodeName(n,"input")||st.nodeName(n,"button")?n.form:t;r&&!st._data(r,"submitBubbles")&&(st.event.add(r,"submit._submit",function(e){e._submit_bubble=!0}),st._data(r,"submitBubbles",!0))}),t)},postDispatch:function(e){e._submit_bubble&&(delete e._submit_bubble,this.parentNode&&!e.isTrigger&&st.event.simulate("submit",this.parentNode,e,!0))},teardown:function(){return st.nodeName(this,"form")?!1:(st.event.remove(this,"._submit"),t)}}),st.support.changeBubbles||(st.event.special.change={setup:function(){return qt.test(this.nodeName)?(("checkbox"===this.type||"radio"===this.type)&&(st.event.add(this,"propertychange._change",function(e){"checked"===e.originalEvent.propertyName&&(this._just_changed=!0)}),st.event.add(this,"click._change",function(e){this._just_changed&&!e.isTrigger&&(this._just_changed=!1),st.event.simulate("change",this,e,!0)})),!1):(st.event.add(this,"beforeactivate._change",function(e){var t=e.target;qt.test(t.nodeName)&&!st._data(t,"changeBubbles")&&(st.event.add(t,"change._change",function(e){!this.parentNode||e.isSimulated||e.isTrigger||st.event.simulate("change",this.parentNode,e,!0)}),st._data(t,"changeBubbles",!0))}),t)},handle:function(e){var n=e.target;return this!==n||e.isSimulated||e.isTrigger||"radio"!==n.type&&"checkbox"!==n.type?e.handleObj.handler.apply(this,arguments):t},teardown:function(){return st.event.remove(this,"._change"),!qt.test(this.nodeName)}}),st.support.focusinBubbles||st.each({focus:"focusin",blur:"focusout"},function(e,t){var n=0,r=function(e){st.event.simulate(t,e.target,st.event.fix(e),!0)};st.event.special[t]={setup:function(){0===n++&&V.addEventListener(e,r,!0)},teardown:function(){0===--n&&V.removeEventListener(e,r,!0)}}}),st.fn.extend({on:function(e,n,r,i,o){var a,s;if("object"==typeof e){"string"!=typeof n&&(r=r||n,n=t);for(s in e)this.on(s,n,r,e[s],o);return this}if(null==r&&null==i?(i=n,r=n=t):null==i&&("string"==typeof n?(i=r,r=t):(i=r,r=n,n=t)),i===!1)i=l;else if(!i)return this;return 1===o&&(a=i,i=function(e){return st().off(e),a.apply(this,arguments)},i.guid=a.guid||(a.guid=st.guid++)),this.each(function(){st.event.add(this,e,i,r,n)})},one:function(e,t,n,r){return this.on(e,t,n,r,1)},off:function(e,n,r){var i,o;if(e&&e.preventDefault&&e.handleObj)return i=e.handleObj,st(e.delegateTarget).off(i.namespace?i.origType+"."+i.namespace:i.origType,i.selector,i.handler),this;if("object"==typeof e){for(o in e)this.off(o,n,e[o]);return this}return(n===!1||"function"==typeof n)&&(r=n,n=t),r===!1&&(r=l),this.each(function(){st.event.remove(this,e,r,n)})},bind:function(e,t,n){return this.on(e,null,t,n)},unbind:function(e,t){return this.off(e,null,t)},delegate:function(e,t,n,r){return this.on(t,e,n,r)},undelegate:function(e,t,n){return 1===arguments.length?this.off(e,"**"):this.off(t,e||"**",n)},trigger:function(e,t){return this.each(function(){st.event.trigger(e,t,this)})},triggerHandler:function(e,n){var r=this[0];return r?st.event.trigger(e,n,r,!0):t},hover:function(e,t){return this.mouseenter(e).mouseleave(t||e)}}),st.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "),function(e,t){st.fn[t]=function(e,n){return arguments.length>0?this.on(t,null,e,n):this.trigger(t)},_t.test(t)&&(st.event.fixHooks[t]=st.event.keyHooks),Ft.test(t)&&(st.event.fixHooks[t]=st.event.mouseHooks)}),function(e,t){function n(e){return ht.test(e+"")}function r(){var e,t=[];return e=function(n,r){return t.push(n+=" ")>C.cacheLength&&delete e[t.shift()],e[n]=r}}function i(e){return e[P]=!0,e}function o(e){var t=L.createElement("div");try{return e(t)}catch(n){return!1}finally{t=null}}function a(e,t,n,r){var i,o,a,s,u,l,c,d,h,g;if((t?t.ownerDocument||t:R)!==L&&D(t),t=t||L,n=n||[],!e||"string"!=typeof e)return n;if(1!==(s=t.nodeType)&&9!==s)return[];if(!M&&!r){if(i=gt.exec(e))if(a=i[1]){if(9===s){if(o=t.getElementById(a),!o||!o.parentNode)return n;if(o.id===a)return n.push(o),n}else if(t.ownerDocument&&(o=t.ownerDocument.getElementById(a))&&O(t,o)&&o.id===a)return n.push(o),n}else{if(i[2])return Q.apply(n,K.call(t.getElementsByTagName(e),0)),n;if((a=i[3])&&W.getByClassName&&t.getElementsByClassName)return Q.apply(n,K.call(t.getElementsByClassName(a),0)),n}if(W.qsa&&!q.test(e)){if(c=!0,d=P,h=t,g=9===s&&e,1===s&&"object"!==t.nodeName.toLowerCase()){for(l=f(e),(c=t.getAttribute("id"))?d=c.replace(vt,"\\$&"):t.setAttribute("id",d),d="[id='"+d+"'] ",u=l.length;u--;)l[u]=d+p(l[u]);h=dt.test(e)&&t.parentNode||t,g=l.join(",")}if(g)try{return Q.apply(n,K.call(h.querySelectorAll(g),0)),n}catch(m){}finally{c||t.removeAttribute("id")}}}return x(e.replace(at,"$1"),t,n,r)}function s(e,t){for(var n=e&&t&&e.nextSibling;n;n=n.nextSibling)if(n===t)return-1;return e?1:-1}function u(e){return function(t){var n=t.nodeName.toLowerCase();return"input"===n&&t.type===e}}function l(e){return function(t){var n=t.nodeName.toLowerCase();return("input"===n||"button"===n)&&t.type===e}}function c(e){return i(function(t){return t=+t,i(function(n,r){for(var i,o=e([],n.length,t),a=o.length;a--;)n[i=o[a]]&&(n[i]=!(r[i]=n[i]))})})}function f(e,t){var n,r,i,o,s,u,l,c=X[e+" "];if(c)return t?0:c.slice(0);for(s=e,u=[],l=C.preFilter;s;){(!n||(r=ut.exec(s)))&&(r&&(s=s.slice(r[0].length)||s),u.push(i=[])),n=!1,(r=lt.exec(s))&&(n=r.shift(),i.push({value:n,type:r[0].replace(at," ")}),s=s.slice(n.length));for(o in C.filter)!(r=pt[o].exec(s))||l[o]&&!(r=l[o](r))||(n=r.shift(),i.push({value:n,type:o,matches:r}),s=s.slice(n.length));if(!n)break}return t?s.length:s?a.error(e):X(e,u).slice(0)}function p(e){for(var t=0,n=e.length,r="";n>t;t++)r+=e[t].value;return r}function d(e,t,n){var r=t.dir,i=n&&"parentNode"===t.dir,o=I++;return t.first?function(t,n,o){for(;t=t[r];)if(1===t.nodeType||i)return e(t,n,o)}:function(t,n,a){var s,u,l,c=$+" "+o;if(a){for(;t=t[r];)if((1===t.nodeType||i)&&e(t,n,a))return!0}else for(;t=t[r];)if(1===t.nodeType||i)if(l=t[P]||(t[P]={}),(u=l[r])&&u[0]===c){if((s=u[1])===!0||s===N)return s===!0}else if(u=l[r]=[c],u[1]=e(t,n,a)||N,u[1]===!0)return!0}}function h(e){return e.length>1?function(t,n,r){for(var i=e.length;i--;)if(!e[i](t,n,r))return!1;return!0}:e[0]}function g(e,t,n,r,i){for(var o,a=[],s=0,u=e.length,l=null!=t;u>s;s++)(o=e[s])&&(!n||n(o,r,i))&&(a.push(o),l&&t.push(s));return a}function m(e,t,n,r,o,a){return r&&!r[P]&&(r=m(r)),o&&!o[P]&&(o=m(o,a)),i(function(i,a,s,u){var l,c,f,p=[],d=[],h=a.length,m=i||b(t||"*",s.nodeType?[s]:s,[]),y=!e||!i&&t?m:g(m,p,e,s,u),v=n?o||(i?e:h||r)?[]:a:y;if(n&&n(y,v,s,u),r)for(l=g(v,d),r(l,[],s,u),c=l.length;c--;)(f=l[c])&&(v[d[c]]=!(y[d[c]]=f));if(i){if(o||e){if(o){for(l=[],c=v.length;c--;)(f=v[c])&&l.push(y[c]=f);o(null,v=[],l,u)}for(c=v.length;c--;)(f=v[c])&&(l=o?Z.call(i,f):p[c])>-1&&(i[l]=!(a[l]=f))}}else v=g(v===a?v.splice(h,v.length):v),o?o(null,a,v,u):Q.apply(a,v)})}function y(e){for(var t,n,r,i=e.length,o=C.relative[e[0].type],a=o||C.relative[" "],s=o?1:0,u=d(function(e){return e===t},a,!0),l=d(function(e){return Z.call(t,e)>-1},a,!0),c=[function(e,n,r){return!o&&(r||n!==j)||((t=n).nodeType?u(e,n,r):l(e,n,r))}];i>s;s++)if(n=C.relative[e[s].type])c=[d(h(c),n)];else{if(n=C.filter[e[s].type].apply(null,e[s].matches),n[P]){for(r=++s;i>r&&!C.relative[e[r].type];r++);return m(s>1&&h(c),s>1&&p(e.slice(0,s-1)).replace(at,"$1"),n,r>s&&y(e.slice(s,r)),i>r&&y(e=e.slice(r)),i>r&&p(e))}c.push(n)}return h(c)}function v(e,t){var n=0,r=t.length>0,o=e.length>0,s=function(i,s,u,l,c){var f,p,d,h=[],m=0,y="0",v=i&&[],b=null!=c,x=j,T=i||o&&C.find.TAG("*",c&&s.parentNode||s),w=$+=null==x?1:Math.E;for(b&&(j=s!==L&&s,N=n);null!=(f=T[y]);y++){if(o&&f){for(p=0;d=e[p];p++)if(d(f,s,u)){l.push(f);break}b&&($=w,N=++n)}r&&((f=!d&&f)&&m--,i&&v.push(f))}if(m+=y,r&&y!==m){for(p=0;d=t[p];p++)d(v,h,s,u);if(i){if(m>0)for(;y--;)v[y]||h[y]||(h[y]=G.call(l));h=g(h)}Q.apply(l,h),b&&!i&&h.length>0&&m+t.length>1&&a.uniqueSort(l)}return b&&($=w,j=x),v};return r?i(s):s}function b(e,t,n){for(var r=0,i=t.length;i>r;r++)a(e,t[r],n);return n}function x(e,t,n,r){var i,o,a,s,u,l=f(e);if(!r&&1===l.length){if(o=l[0]=l[0].slice(0),o.length>2&&"ID"===(a=o[0]).type&&9===t.nodeType&&!M&&C.relative[o[1].type]){if(t=C.find.ID(a.matches[0].replace(xt,Tt),t)[0],!t)return n;e=e.slice(o.shift().value.length)}for(i=pt.needsContext.test(e)?-1:o.length-1;i>=0&&(a=o[i],!C.relative[s=a.type]);i--)if((u=C.find[s])&&(r=u(a.matches[0].replace(xt,Tt),dt.test(o[0].type)&&t.parentNode||t))){if(o.splice(i,1),e=r.length&&p(o),!e)return Q.apply(n,K.call(r,0)),n;break}}return S(e,l)(r,t,M,n,dt.test(e)),n}function T(){}var w,N,C,k,E,S,A,j,D,L,H,M,q,_,F,O,B,P="sizzle"+-new Date,R=e.document,W={},$=0,I=0,z=r(),X=r(),U=r(),V=typeof t,Y=1<<31,J=[],G=J.pop,Q=J.push,K=J.slice,Z=J.indexOf||function(e){for(var t=0,n=this.length;n>t;t++)if(this[t]===e)return t;return-1},et="[\\x20\\t\\r\\n\\f]",tt="(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",nt=tt.replace("w","w#"),rt="([*^$|!~]?=)",it="\\["+et+"*("+tt+")"+et+"*(?:"+rt+et+"*(?:(['\"])((?:\\\\.|[^\\\\])*?)\\3|("+nt+")|)|)"+et+"*\\]",ot=":("+tt+")(?:\\(((['\"])((?:\\\\.|[^\\\\])*?)\\3|((?:\\\\.|[^\\\\()[\\]]|"+it.replace(3,8)+")*)|.*)\\)|)",at=RegExp("^"+et+"+|((?:^|[^\\\\])(?:\\\\.)*)"+et+"+$","g"),ut=RegExp("^"+et+"*,"+et+"*"),lt=RegExp("^"+et+"*([\\x20\\t\\r\\n\\f>+~])"+et+"*"),ct=RegExp(ot),ft=RegExp("^"+nt+"$"),pt={ID:RegExp("^#("+tt+")"),CLASS:RegExp("^\\.("+tt+")"),NAME:RegExp("^\\[name=['\"]?("+tt+")['\"]?\\]"),TAG:RegExp("^("+tt.replace("w","w*")+")"),ATTR:RegExp("^"+it),PSEUDO:RegExp("^"+ot),CHILD:RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\("+et+"*(even|odd|(([+-]|)(\\d*)n|)"+et+"*(?:([+-]|)"+et+"*(\\d+)|))"+et+"*\\)|)","i"),needsContext:RegExp("^"+et+"*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\("+et+"*((?:-\\d)?\\d*)"+et+"*\\)|)(?=[^-]|$)","i")},dt=/[\x20\t\r\n\f]*[+~]/,ht=/\{\s*\[native code\]\s*\}/,gt=/^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,mt=/^(?:input|select|textarea|button)$/i,yt=/^h\d$/i,vt=/'|\\/g,bt=/\=[\x20\t\r\n\f]*([^'"\]]*)[\x20\t\r\n\f]*\]/g,xt=/\\([\da-fA-F]{1,6}[\x20\t\r\n\f]?|.)/g,Tt=function(e,t){var n="0x"+t-65536;return n!==n?t:0>n?String.fromCharCode(n+65536):String.fromCharCode(55296|n>>10,56320|1023&n)};try{K.call(H.childNodes,0)[0].nodeType}catch(wt){K=function(e){for(var t,n=[];t=this[e];e++)n.push(t);return n}}E=a.isXML=function(e){var t=e&&(e.ownerDocument||e).documentElement;return t?"HTML"!==t.nodeName:!1},D=a.setDocument=function(e){var r=e?e.ownerDocument||e:R;return r!==L&&9===r.nodeType&&r.documentElement?(L=r,H=r.documentElement,M=E(r),W.tagNameNoComments=o(function(e){return e.appendChild(r.createComment("")),!e.getElementsByTagName("*").length}),W.attributes=o(function(e){e.innerHTML="<select></select>";var t=typeof e.lastChild.getAttribute("multiple");return"boolean"!==t&&"string"!==t}),W.getByClassName=o(function(e){return e.innerHTML="<div class='hidden e'></div><div class='hidden'></div>",e.getElementsByClassName&&e.getElementsByClassName("e").length?(e.lastChild.className="e",2===e.getElementsByClassName("e").length):!1}),W.getByName=o(function(e){e.id=P+0,e.innerHTML="<a name='"+P+"'></a><div name='"+P+"'></div>",H.insertBefore(e,H.firstChild);var t=r.getElementsByName&&r.getElementsByName(P).length===2+r.getElementsByName(P+0).length;return W.getIdNotName=!r.getElementById(P),H.removeChild(e),t}),C.attrHandle=o(function(e){return e.innerHTML="<a href='#'></a>",e.firstChild&&typeof e.firstChild.getAttribute!==V&&"#"===e.firstChild.getAttribute("href")})?{}:{href:function(e){return e.getAttribute("href",2)},type:function(e){return e.getAttribute("type")}},W.getIdNotName?(C.find.ID=function(e,t){if(typeof t.getElementById!==V&&!M){var n=t.getElementById(e);return n&&n.parentNode?[n]:[]}},C.filter.ID=function(e){var t=e.replace(xt,Tt);return function(e){return e.getAttribute("id")===t}}):(C.find.ID=function(e,n){if(typeof n.getElementById!==V&&!M){var r=n.getElementById(e);return r?r.id===e||typeof r.getAttributeNode!==V&&r.getAttributeNode("id").value===e?[r]:t:[]}},C.filter.ID=function(e){var t=e.replace(xt,Tt);return function(e){var n=typeof e.getAttributeNode!==V&&e.getAttributeNode("id");return n&&n.value===t}}),C.find.TAG=W.tagNameNoComments?function(e,n){return typeof n.getElementsByTagName!==V?n.getElementsByTagName(e):t}:function(e,t){var n,r=[],i=0,o=t.getElementsByTagName(e);if("*"===e){for(;n=o[i];i++)1===n.nodeType&&r.push(n);return r}return o},C.find.NAME=W.getByName&&function(e,n){return typeof n.getElementsByName!==V?n.getElementsByName(name):t},C.find.CLASS=W.getByClassName&&function(e,n){return typeof n.getElementsByClassName===V||M?t:n.getElementsByClassName(e)},_=[],q=[":focus"],(W.qsa=n(r.querySelectorAll))&&(o(function(e){e.innerHTML="<select><option selected=''></option></select>",e.querySelectorAll("[selected]").length||q.push("\\["+et+"*(?:checked|disabled|ismap|multiple|readonly|selected|value)"),e.querySelectorAll(":checked").length||q.push(":checked")}),o(function(e){e.innerHTML="<input type='hidden' i=''/>",e.querySelectorAll("[i^='']").length&&q.push("[*^$]="+et+"*(?:\"\"|'')"),e.querySelectorAll(":enabled").length||q.push(":enabled",":disabled"),e.querySelectorAll("*,:x"),q.push(",.*:")})),(W.matchesSelector=n(F=H.matchesSelector||H.mozMatchesSelector||H.webkitMatchesSelector||H.oMatchesSelector||H.msMatchesSelector))&&o(function(e){W.disconnectedMatch=F.call(e,"div"),F.call(e,"[s!='']:x"),_.push("!=",ot)}),q=RegExp(q.join("|")),_=RegExp(_.join("|")),O=n(H.contains)||H.compareDocumentPosition?function(e,t){var n=9===e.nodeType?e.documentElement:e,r=t&&t.parentNode;return e===r||!(!r||1!==r.nodeType||!(n.contains?n.contains(r):e.compareDocumentPosition&&16&e.compareDocumentPosition(r)))}:function(e,t){if(t)for(;t=t.parentNode;)if(t===e)return!0;return!1},B=H.compareDocumentPosition?function(e,t){var n;return e===t?(A=!0,0):(n=t.compareDocumentPosition&&e.compareDocumentPosition&&e.compareDocumentPosition(t))?1&n||e.parentNode&&11===e.parentNode.nodeType?e===r||O(R,e)?-1:t===r||O(R,t)?1:0:4&n?-1:1:e.compareDocumentPosition?-1:1}:function(e,t){var n,i=0,o=e.parentNode,a=t.parentNode,u=[e],l=[t];if(e===t)return A=!0,0;if(e.sourceIndex&&t.sourceIndex)return(~t.sourceIndex||Y)-(O(R,e)&&~e.sourceIndex||Y);if(!o||!a)return e===r?-1:t===r?1:o?-1:a?1:0;if(o===a)return s(e,t);for(n=e;n=n.parentNode;)u.unshift(n);for(n=t;n=n.parentNode;)l.unshift(n);for(;u[i]===l[i];)i++;return i?s(u[i],l[i]):u[i]===R?-1:l[i]===R?1:0},A=!1,[0,0].sort(B),W.detectDuplicates=A,L):L},a.matches=function(e,t){return a(e,null,null,t)},a.matchesSelector=function(e,t){if((e.ownerDocument||e)!==L&&D(e),t=t.replace(bt,"='$1']"),!(!W.matchesSelector||M||_&&_.test(t)||q.test(t)))try{var n=F.call(e,t);if(n||W.disconnectedMatch||e.document&&11!==e.document.nodeType)return n}catch(r){}return a(t,L,null,[e]).length>0},a.contains=function(e,t){return(e.ownerDocument||e)!==L&&D(e),O(e,t)},a.attr=function(e,t){var n;return(e.ownerDocument||e)!==L&&D(e),M||(t=t.toLowerCase()),(n=C.attrHandle[t])?n(e):M||W.attributes?e.getAttribute(t):((n=e.getAttributeNode(t))||e.getAttribute(t))&&e[t]===!0?t:n&&n.specified?n.value:null},a.error=function(e){throw Error("Syntax error, unrecognized expression: "+e)},a.uniqueSort=function(e){var t,n=[],r=1,i=0;if(A=!W.detectDuplicates,e.sort(B),A){for(;t=e[r];r++)t===e[r-1]&&(i=n.push(r));for(;i--;)e.splice(n[i],1)}return e},k=a.getText=function(e){var t,n="",r=0,i=e.nodeType;if(i){if(1===i||9===i||11===i){if("string"==typeof e.textContent)return e.textContent;for(e=e.firstChild;e;e=e.nextSibling)n+=k(e)}else if(3===i||4===i)return e.nodeValue}else for(;t=e[r];r++)n+=k(t);return n},C=a.selectors={cacheLength:50,createPseudo:i,match:pt,find:{},relative:{">":{dir:"parentNode",first:!0}," ":{dir:"parentNode"},"+":{dir:"previousSibling",first:!0},"~":{dir:"previousSibling"}},preFilter:{ATTR:function(e){return e[1]=e[1].replace(xt,Tt),e[3]=(e[4]||e[5]||"").replace(xt,Tt),"~="===e[2]&&(e[3]=" "+e[3]+" "),e.slice(0,4)},CHILD:function(e){return e[1]=e[1].toLowerCase(),"nth"===e[1].slice(0,3)?(e[3]||a.error(e[0]),e[4]=+(e[4]?e[5]+(e[6]||1):2*("even"===e[3]||"odd"===e[3])),e[5]=+(e[7]+e[8]||"odd"===e[3])):e[3]&&a.error(e[0]),e},PSEUDO:function(e){var t,n=!e[5]&&e[2];return pt.CHILD.test(e[0])?null:(e[4]?e[2]=e[4]:n&&ct.test(n)&&(t=f(n,!0))&&(t=n.indexOf(")",n.length-t)-n.length)&&(e[0]=e[0].slice(0,t),e[2]=n.slice(0,t)),e.slice(0,3))}},filter:{TAG:function(e){return"*"===e?function(){return!0}:(e=e.replace(xt,Tt).toLowerCase(),function(t){return t.nodeName&&t.nodeName.toLowerCase()===e})},CLASS:function(e){var t=z[e+" "];return t||(t=RegExp("(^|"+et+")"+e+"("+et+"|$)"))&&z(e,function(e){return t.test(e.className||typeof e.getAttribute!==V&&e.getAttribute("class")||"")})},ATTR:function(e,t,n){return function(r){var i=a.attr(r,e);return null==i?"!="===t:t?(i+="","="===t?i===n:"!="===t?i!==n:"^="===t?n&&0===i.indexOf(n):"*="===t?n&&i.indexOf(n)>-1:"$="===t?n&&i.substr(i.length-n.length)===n:"~="===t?(" "+i+" ").indexOf(n)>-1:"|="===t?i===n||i.substr(0,n.length+1)===n+"-":!1):!0}},CHILD:function(e,t,n,r,i){var o="nth"!==e.slice(0,3),a="last"!==e.slice(-4),s="of-type"===t;return 1===r&&0===i?function(e){return!!e.parentNode}:function(t,n,u){var l,c,f,p,d,h,g=o!==a?"nextSibling":"previousSibling",m=t.parentNode,y=s&&t.nodeName.toLowerCase(),v=!u&&!s;if(m){if(o){for(;g;){for(f=t;f=f[g];)if(s?f.nodeName.toLowerCase()===y:1===f.nodeType)return!1;h=g="only"===e&&!h&&"nextSibling"}return!0}if(h=[a?m.firstChild:m.lastChild],a&&v){for(c=m[P]||(m[P]={}),l=c[e]||[],d=l[0]===$&&l[1],p=l[0]===$&&l[2],f=d&&m.childNodes[d];f=++d&&f&&f[g]||(p=d=0)||h.pop();)if(1===f.nodeType&&++p&&f===t){c[e]=[$,d,p];break}}else if(v&&(l=(t[P]||(t[P]={}))[e])&&l[0]===$)p=l[1];else for(;(f=++d&&f&&f[g]||(p=d=0)||h.pop())&&((s?f.nodeName.toLowerCase()!==y:1!==f.nodeType)||!++p||(v&&((f[P]||(f[P]={}))[e]=[$,p]),f!==t)););return p-=i,p===r||0===p%r&&p/r>=0}}},PSEUDO:function(e,t){var n,r=C.pseudos[e]||C.setFilters[e.toLowerCase()]||a.error("unsupported pseudo: "+e);return r[P]?r(t):r.length>1?(n=[e,e,"",t],C.setFilters.hasOwnProperty(e.toLowerCase())?i(function(e,n){for(var i,o=r(e,t),a=o.length;a--;)i=Z.call(e,o[a]),e[i]=!(n[i]=o[a])}):function(e){return r(e,0,n)}):r}},pseudos:{not:i(function(e){var t=[],n=[],r=S(e.replace(at,"$1"));return r[P]?i(function(e,t,n,i){for(var o,a=r(e,null,i,[]),s=e.length;s--;)(o=a[s])&&(e[s]=!(t[s]=o))}):function(e,i,o){return t[0]=e,r(t,null,o,n),!n.pop()}}),has:i(function(e){return function(t){return a(e,t).length>0}}),contains:i(function(e){return function(t){return(t.textContent||t.innerText||k(t)).indexOf(e)>-1}}),lang:i(function(e){return ft.test(e||"")||a.error("unsupported lang: "+e),e=e.replace(xt,Tt).toLowerCase(),function(t){var n;do if(n=M?t.getAttribute("xml:lang")||t.getAttribute("lang"):t.lang)return n=n.toLowerCase(),n===e||0===n.indexOf(e+"-");while((t=t.parentNode)&&1===t.nodeType);return!1}}),target:function(t){var n=e.location&&e.location.hash;return n&&n.slice(1)===t.id},root:function(e){return e===H},focus:function(e){return e===L.activeElement&&(!L.hasFocus||L.hasFocus())&&!!(e.type||e.href||~e.tabIndex)},enabled:function(e){return e.disabled===!1},disabled:function(e){return e.disabled===!0},checked:function(e){var t=e.nodeName.toLowerCase();return"input"===t&&!!e.checked||"option"===t&&!!e.selected},selected:function(e){return e.parentNode&&e.parentNode.selectedIndex,e.selected===!0},empty:function(e){for(e=e.firstChild;e;e=e.nextSibling)if(e.nodeName>"@"||3===e.nodeType||4===e.nodeType)return!1;return!0},parent:function(e){return!C.pseudos.empty(e)},header:function(e){return yt.test(e.nodeName)},input:function(e){return mt.test(e.nodeName)},button:function(e){var t=e.nodeName.toLowerCase();return"input"===t&&"button"===e.type||"button"===t},text:function(e){var t;return"input"===e.nodeName.toLowerCase()&&"text"===e.type&&(null==(t=e.getAttribute("type"))||t.toLowerCase()===e.type)},first:c(function(){return[0]}),last:c(function(e,t){return[t-1]}),eq:c(function(e,t,n){return[0>n?n+t:n]}),even:c(function(e,t){for(var n=0;t>n;n+=2)e.push(n);return e}),odd:c(function(e,t){for(var n=1;t>n;n+=2)e.push(n);return e}),lt:c(function(e,t,n){for(var r=0>n?n+t:n;--r>=0;)e.push(r);return e}),gt:c(function(e,t,n){for(var r=0>n?n+t:n;t>++r;)e.push(r);return e})}};for(w in{radio:!0,checkbox:!0,file:!0,password:!0,image:!0})C.pseudos[w]=u(w);for(w in{submit:!0,reset:!0})C.pseudos[w]=l(w);S=a.compile=function(e,t){var n,r=[],i=[],o=U[e+" "];if(!o){for(t||(t=f(e)),n=t.length;n--;)o=y(t[n]),o[P]?r.push(o):i.push(o);o=U(e,v(i,r))}return o},C.pseudos.nth=C.pseudos.eq,C.filters=T.prototype=C.pseudos,C.setFilters=new T,D(),a.attr=st.attr,st.find=a,st.expr=a.selectors,st.expr[":"]=st.expr.pseudos,st.unique=a.uniqueSort,st.text=a.getText,st.isXMLDoc=a.isXML,st.contains=a.contains}(e);var Pt=/Until$/,Rt=/^(?:parents|prev(?:Until|All))/,Wt=/^.[^:#\[\.,]*$/,$t=st.expr.match.needsContext,It={children:!0,contents:!0,next:!0,prev:!0};st.fn.extend({find:function(e){var t,n,r;if("string"!=typeof e)return r=this,this.pushStack(st(e).filter(function(){for(t=0;r.length>t;t++)if(st.contains(r[t],this))return!0}));for(n=[],t=0;this.length>t;t++)st.find(e,this[t],n);return n=this.pushStack(st.unique(n)),n.selector=(this.selector?this.selector+" ":"")+e,n},has:function(e){var t,n=st(e,this),r=n.length;return this.filter(function(){for(t=0;r>t;t++)if(st.contains(this,n[t]))return!0})},not:function(e){return this.pushStack(f(this,e,!1))},filter:function(e){return this.pushStack(f(this,e,!0))},is:function(e){return!!e&&("string"==typeof e?$t.test(e)?st(e,this.context).index(this[0])>=0:st.filter(e,this).length>0:this.filter(e).length>0)},closest:function(e,t){for(var n,r=0,i=this.length,o=[],a=$t.test(e)||"string"!=typeof e?st(e,t||this.context):0;i>r;r++)for(n=this[r];n&&n.ownerDocument&&n!==t&&11!==n.nodeType;){if(a?a.index(n)>-1:st.find.matchesSelector(n,e)){o.push(n);break}n=n.parentNode}return this.pushStack(o.length>1?st.unique(o):o)},index:function(e){return e?"string"==typeof e?st.inArray(this[0],st(e)):st.inArray(e.jquery?e[0]:e,this):this[0]&&this[0].parentNode?this.first().prevAll().length:-1},add:function(e,t){var n="string"==typeof e?st(e,t):st.makeArray(e&&e.nodeType?[e]:e),r=st.merge(this.get(),n);return this.pushStack(st.unique(r))},addBack:function(e){return this.add(null==e?this.prevObject:this.prevObject.filter(e))}}),st.fn.andSelf=st.fn.addBack,st.each({parent:function(e){var t=e.parentNode;return t&&11!==t.nodeType?t:null},parents:function(e){return st.dir(e,"parentNode")},parentsUntil:function(e,t,n){return st.dir(e,"parentNode",n)},next:function(e){return c(e,"nextSibling")},prev:function(e){return c(e,"previousSibling")
},nextAll:function(e){return st.dir(e,"nextSibling")},prevAll:function(e){return st.dir(e,"previousSibling")},nextUntil:function(e,t,n){return st.dir(e,"nextSibling",n)},prevUntil:function(e,t,n){return st.dir(e,"previousSibling",n)},siblings:function(e){return st.sibling((e.parentNode||{}).firstChild,e)},children:function(e){return st.sibling(e.firstChild)},contents:function(e){return st.nodeName(e,"iframe")?e.contentDocument||e.contentWindow.document:st.merge([],e.childNodes)}},function(e,t){st.fn[e]=function(n,r){var i=st.map(this,t,n);return Pt.test(e)||(r=n),r&&"string"==typeof r&&(i=st.filter(r,i)),i=this.length>1&&!It[e]?st.unique(i):i,this.length>1&&Rt.test(e)&&(i=i.reverse()),this.pushStack(i)}}),st.extend({filter:function(e,t,n){return n&&(e=":not("+e+")"),1===t.length?st.find.matchesSelector(t[0],e)?[t[0]]:[]:st.find.matches(e,t)},dir:function(e,n,r){for(var i=[],o=e[n];o&&9!==o.nodeType&&(r===t||1!==o.nodeType||!st(o).is(r));)1===o.nodeType&&i.push(o),o=o[n];return i},sibling:function(e,t){for(var n=[];e;e=e.nextSibling)1===e.nodeType&&e!==t&&n.push(e);return n}});var zt="abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",Xt=/ jQuery\d+="(?:null|\d+)"/g,Ut=RegExp("<(?:"+zt+")[\\s/>]","i"),Vt=/^\s+/,Yt=/<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,Jt=/<([\w:]+)/,Gt=/<tbody/i,Qt=/<|&#?\w+;/,Kt=/<(?:script|style|link)/i,Zt=/^(?:checkbox|radio)$/i,en=/checked\s*(?:[^=]|=\s*.checked.)/i,tn=/^$|\/(?:java|ecma)script/i,nn=/^true\/(.*)/,rn=/^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,on={option:[1,"<select multiple='multiple'>","</select>"],legend:[1,"<fieldset>","</fieldset>"],area:[1,"<map>","</map>"],param:[1,"<object>","</object>"],thead:[1,"<table>","</table>"],tr:[2,"<table><tbody>","</tbody></table>"],col:[2,"<table><tbody></tbody><colgroup>","</colgroup></table>"],td:[3,"<table><tbody><tr>","</tr></tbody></table>"],_default:st.support.htmlSerialize?[0,"",""]:[1,"X<div>","</div>"]},an=p(V),sn=an.appendChild(V.createElement("div"));on.optgroup=on.option,on.tbody=on.tfoot=on.colgroup=on.caption=on.thead,on.th=on.td,st.fn.extend({text:function(e){return st.access(this,function(e){return e===t?st.text(this):this.empty().append((this[0]&&this[0].ownerDocument||V).createTextNode(e))},null,e,arguments.length)},wrapAll:function(e){if(st.isFunction(e))return this.each(function(t){st(this).wrapAll(e.call(this,t))});if(this[0]){var t=st(e,this[0].ownerDocument).eq(0).clone(!0);this[0].parentNode&&t.insertBefore(this[0]),t.map(function(){for(var e=this;e.firstChild&&1===e.firstChild.nodeType;)e=e.firstChild;return e}).append(this)}return this},wrapInner:function(e){return st.isFunction(e)?this.each(function(t){st(this).wrapInner(e.call(this,t))}):this.each(function(){var t=st(this),n=t.contents();n.length?n.wrapAll(e):t.append(e)})},wrap:function(e){var t=st.isFunction(e);return this.each(function(n){st(this).wrapAll(t?e.call(this,n):e)})},unwrap:function(){return this.parent().each(function(){st.nodeName(this,"body")||st(this).replaceWith(this.childNodes)}).end()},append:function(){return this.domManip(arguments,!0,function(e){(1===this.nodeType||11===this.nodeType||9===this.nodeType)&&this.appendChild(e)})},prepend:function(){return this.domManip(arguments,!0,function(e){(1===this.nodeType||11===this.nodeType||9===this.nodeType)&&this.insertBefore(e,this.firstChild)})},before:function(){return this.domManip(arguments,!1,function(e){this.parentNode&&this.parentNode.insertBefore(e,this)})},after:function(){return this.domManip(arguments,!1,function(e){this.parentNode&&this.parentNode.insertBefore(e,this.nextSibling)})},remove:function(e,t){for(var n,r=0;null!=(n=this[r]);r++)(!e||st.filter(e,[n]).length>0)&&(t||1!==n.nodeType||st.cleanData(b(n)),n.parentNode&&(t&&st.contains(n.ownerDocument,n)&&m(b(n,"script")),n.parentNode.removeChild(n)));return this},empty:function(){for(var e,t=0;null!=(e=this[t]);t++){for(1===e.nodeType&&st.cleanData(b(e,!1));e.firstChild;)e.removeChild(e.firstChild);e.options&&st.nodeName(e,"select")&&(e.options.length=0)}return this},clone:function(e,t){return e=null==e?!1:e,t=null==t?e:t,this.map(function(){return st.clone(this,e,t)})},html:function(e){return st.access(this,function(e){var n=this[0]||{},r=0,i=this.length;if(e===t)return 1===n.nodeType?n.innerHTML.replace(Xt,""):t;if(!("string"!=typeof e||Kt.test(e)||!st.support.htmlSerialize&&Ut.test(e)||!st.support.leadingWhitespace&&Vt.test(e)||on[(Jt.exec(e)||["",""])[1].toLowerCase()])){e=e.replace(Yt,"<$1></$2>");try{for(;i>r;r++)n=this[r]||{},1===n.nodeType&&(st.cleanData(b(n,!1)),n.innerHTML=e);n=0}catch(o){}}n&&this.empty().append(e)},null,e,arguments.length)},replaceWith:function(e){var t=st.isFunction(e);return t||"string"==typeof e||(e=st(e).not(this).detach()),this.domManip([e],!0,function(e){var t=this.nextSibling,n=this.parentNode;(n&&1===this.nodeType||11===this.nodeType)&&(st(this).remove(),t?t.parentNode.insertBefore(e,t):n.appendChild(e))})},detach:function(e){return this.remove(e,!0)},domManip:function(e,n,r){e=et.apply([],e);var i,o,a,s,u,l,c=0,f=this.length,p=this,m=f-1,y=e[0],v=st.isFunction(y);if(v||!(1>=f||"string"!=typeof y||st.support.checkClone)&&en.test(y))return this.each(function(i){var o=p.eq(i);v&&(e[0]=y.call(this,i,n?o.html():t)),o.domManip(e,n,r)});if(f&&(i=st.buildFragment(e,this[0].ownerDocument,!1,this),o=i.firstChild,1===i.childNodes.length&&(i=o),o)){for(n=n&&st.nodeName(o,"tr"),a=st.map(b(i,"script"),h),s=a.length;f>c;c++)u=i,c!==m&&(u=st.clone(u,!0,!0),s&&st.merge(a,b(u,"script"))),r.call(n&&st.nodeName(this[c],"table")?d(this[c],"tbody"):this[c],u,c);if(s)for(l=a[a.length-1].ownerDocument,st.map(a,g),c=0;s>c;c++)u=a[c],tn.test(u.type||"")&&!st._data(u,"globalEval")&&st.contains(l,u)&&(u.src?st.ajax({url:u.src,type:"GET",dataType:"script",async:!1,global:!1,"throws":!0}):st.globalEval((u.text||u.textContent||u.innerHTML||"").replace(rn,"")));i=o=null}return this}}),st.each({appendTo:"append",prependTo:"prepend",insertBefore:"before",insertAfter:"after",replaceAll:"replaceWith"},function(e,t){st.fn[e]=function(e){for(var n,r=0,i=[],o=st(e),a=o.length-1;a>=r;r++)n=r===a?this:this.clone(!0),st(o[r])[t](n),tt.apply(i,n.get());return this.pushStack(i)}}),st.extend({clone:function(e,t,n){var r,i,o,a,s,u=st.contains(e.ownerDocument,e);if(st.support.html5Clone||st.isXMLDoc(e)||!Ut.test("<"+e.nodeName+">")?s=e.cloneNode(!0):(sn.innerHTML=e.outerHTML,sn.removeChild(s=sn.firstChild)),!(st.support.noCloneEvent&&st.support.noCloneChecked||1!==e.nodeType&&11!==e.nodeType||st.isXMLDoc(e)))for(r=b(s),i=b(e),a=0;null!=(o=i[a]);++a)r[a]&&v(o,r[a]);if(t)if(n)for(i=i||b(e),r=r||b(s),a=0;null!=(o=i[a]);a++)y(o,r[a]);else y(e,s);return r=b(s,"script"),r.length>0&&m(r,!u&&b(e,"script")),r=i=o=null,s},buildFragment:function(e,t,n,r){for(var i,o,a,s,u,l,c,f=e.length,d=p(t),h=[],g=0;f>g;g++)if(o=e[g],o||0===o)if("object"===st.type(o))st.merge(h,o.nodeType?[o]:o);else if(Qt.test(o)){for(s=s||d.appendChild(t.createElement("div")),a=(Jt.exec(o)||["",""])[1].toLowerCase(),u=on[a]||on._default,s.innerHTML=u[1]+o.replace(Yt,"<$1></$2>")+u[2],c=u[0];c--;)s=s.lastChild;if(!st.support.leadingWhitespace&&Vt.test(o)&&h.push(t.createTextNode(Vt.exec(o)[0])),!st.support.tbody)for(o="table"!==a||Gt.test(o)?"<table>"!==u[1]||Gt.test(o)?0:s:s.firstChild,c=o&&o.childNodes.length;c--;)st.nodeName(l=o.childNodes[c],"tbody")&&!l.childNodes.length&&o.removeChild(l);for(st.merge(h,s.childNodes),s.textContent="";s.firstChild;)s.removeChild(s.firstChild);s=d.lastChild}else h.push(t.createTextNode(o));for(s&&d.removeChild(s),st.support.appendChecked||st.grep(b(h,"input"),x),g=0;o=h[g++];)if((!r||-1===st.inArray(o,r))&&(i=st.contains(o.ownerDocument,o),s=b(d.appendChild(o),"script"),i&&m(s),n))for(c=0;o=s[c++];)tn.test(o.type||"")&&n.push(o);return s=null,d},cleanData:function(e,n){for(var r,i,o,a,s=0,u=st.expando,l=st.cache,c=st.support.deleteExpando,f=st.event.special;null!=(o=e[s]);s++)if((n||st.acceptData(o))&&(i=o[u],r=i&&l[i])){if(r.events)for(a in r.events)f[a]?st.event.remove(o,a):st.removeEvent(o,a,r.handle);l[i]&&(delete l[i],c?delete o[u]:o.removeAttribute!==t?o.removeAttribute(u):o[u]=null,K.push(i))}}});var un,ln,cn,fn=/alpha\([^)]*\)/i,pn=/opacity\s*=\s*([^)]*)/,dn=/^(top|right|bottom|left)$/,hn=/^(none|table(?!-c[ea]).+)/,gn=/^margin/,mn=RegExp("^("+ut+")(.*)$","i"),yn=RegExp("^("+ut+")(?!px)[a-z%]+$","i"),vn=RegExp("^([+-])=("+ut+")","i"),bn={BODY:"block"},xn={position:"absolute",visibility:"hidden",display:"block"},Tn={letterSpacing:0,fontWeight:400},wn=["Top","Right","Bottom","Left"],Nn=["Webkit","O","Moz","ms"];st.fn.extend({css:function(e,n){return st.access(this,function(e,n,r){var i,o,a={},s=0;if(st.isArray(n)){for(i=ln(e),o=n.length;o>s;s++)a[n[s]]=st.css(e,n[s],!1,i);return a}return r!==t?st.style(e,n,r):st.css(e,n)},e,n,arguments.length>1)},show:function(){return N(this,!0)},hide:function(){return N(this)},toggle:function(e){var t="boolean"==typeof e;return this.each(function(){(t?e:w(this))?st(this).show():st(this).hide()})}}),st.extend({cssHooks:{opacity:{get:function(e,t){if(t){var n=un(e,"opacity");return""===n?"1":n}}}},cssNumber:{columnCount:!0,fillOpacity:!0,fontWeight:!0,lineHeight:!0,opacity:!0,orphans:!0,widows:!0,zIndex:!0,zoom:!0},cssProps:{"float":st.support.cssFloat?"cssFloat":"styleFloat"},style:function(e,n,r,i){if(e&&3!==e.nodeType&&8!==e.nodeType&&e.style){var o,a,s,u=st.camelCase(n),l=e.style;if(n=st.cssProps[u]||(st.cssProps[u]=T(l,u)),s=st.cssHooks[n]||st.cssHooks[u],r===t)return s&&"get"in s&&(o=s.get(e,!1,i))!==t?o:l[n];if(a=typeof r,"string"===a&&(o=vn.exec(r))&&(r=(o[1]+1)*o[2]+parseFloat(st.css(e,n)),a="number"),!(null==r||"number"===a&&isNaN(r)||("number"!==a||st.cssNumber[u]||(r+="px"),st.support.clearCloneStyle||""!==r||0!==n.indexOf("background")||(l[n]="inherit"),s&&"set"in s&&(r=s.set(e,r,i))===t)))try{l[n]=r}catch(c){}}},css:function(e,n,r,i){var o,a,s,u=st.camelCase(n);return n=st.cssProps[u]||(st.cssProps[u]=T(e.style,u)),s=st.cssHooks[n]||st.cssHooks[u],s&&"get"in s&&(o=s.get(e,!0,r)),o===t&&(o=un(e,n,i)),"normal"===o&&n in Tn&&(o=Tn[n]),r?(a=parseFloat(o),r===!0||st.isNumeric(a)?a||0:o):o},swap:function(e,t,n,r){var i,o,a={};for(o in t)a[o]=e.style[o],e.style[o]=t[o];i=n.apply(e,r||[]);for(o in t)e.style[o]=a[o];return i}}),e.getComputedStyle?(ln=function(t){return e.getComputedStyle(t,null)},un=function(e,n,r){var i,o,a,s=r||ln(e),u=s?s.getPropertyValue(n)||s[n]:t,l=e.style;return s&&(""!==u||st.contains(e.ownerDocument,e)||(u=st.style(e,n)),yn.test(u)&&gn.test(n)&&(i=l.width,o=l.minWidth,a=l.maxWidth,l.minWidth=l.maxWidth=l.width=u,u=s.width,l.width=i,l.minWidth=o,l.maxWidth=a)),u}):V.documentElement.currentStyle&&(ln=function(e){return e.currentStyle},un=function(e,n,r){var i,o,a,s=r||ln(e),u=s?s[n]:t,l=e.style;return null==u&&l&&l[n]&&(u=l[n]),yn.test(u)&&!dn.test(n)&&(i=l.left,o=e.runtimeStyle,a=o&&o.left,a&&(o.left=e.currentStyle.left),l.left="fontSize"===n?"1em":u,u=l.pixelLeft+"px",l.left=i,a&&(o.left=a)),""===u?"auto":u}),st.each(["height","width"],function(e,n){st.cssHooks[n]={get:function(e,r,i){return r?0===e.offsetWidth&&hn.test(st.css(e,"display"))?st.swap(e,xn,function(){return E(e,n,i)}):E(e,n,i):t},set:function(e,t,r){var i=r&&ln(e);return C(e,t,r?k(e,n,r,st.support.boxSizing&&"border-box"===st.css(e,"boxSizing",!1,i),i):0)}}}),st.support.opacity||(st.cssHooks.opacity={get:function(e,t){return pn.test((t&&e.currentStyle?e.currentStyle.filter:e.style.filter)||"")?.01*parseFloat(RegExp.$1)+"":t?"1":""},set:function(e,t){var n=e.style,r=e.currentStyle,i=st.isNumeric(t)?"alpha(opacity="+100*t+")":"",o=r&&r.filter||n.filter||"";n.zoom=1,(t>=1||""===t)&&""===st.trim(o.replace(fn,""))&&n.removeAttribute&&(n.removeAttribute("filter"),""===t||r&&!r.filter)||(n.filter=fn.test(o)?o.replace(fn,i):o+" "+i)}}),st(function(){st.support.reliableMarginRight||(st.cssHooks.marginRight={get:function(e,n){return n?st.swap(e,{display:"inline-block"},un,[e,"marginRight"]):t}}),!st.support.pixelPosition&&st.fn.position&&st.each(["top","left"],function(e,n){st.cssHooks[n]={get:function(e,r){return r?(r=un(e,n),yn.test(r)?st(e).position()[n]+"px":r):t}}})}),st.expr&&st.expr.filters&&(st.expr.filters.hidden=function(e){return 0===e.offsetWidth&&0===e.offsetHeight||!st.support.reliableHiddenOffsets&&"none"===(e.style&&e.style.display||st.css(e,"display"))},st.expr.filters.visible=function(e){return!st.expr.filters.hidden(e)}),st.each({margin:"",padding:"",border:"Width"},function(e,t){st.cssHooks[e+t]={expand:function(n){for(var r=0,i={},o="string"==typeof n?n.split(" "):[n];4>r;r++)i[e+wn[r]+t]=o[r]||o[r-2]||o[0];return i}},gn.test(e)||(st.cssHooks[e+t].set=C)});var Cn=/%20/g,kn=/\[\]$/,En=/\r?\n/g,Sn=/^(?:submit|button|image|reset)$/i,An=/^(?:input|select|textarea|keygen)/i;st.fn.extend({serialize:function(){return st.param(this.serializeArray())},serializeArray:function(){return this.map(function(){var e=st.prop(this,"elements");return e?st.makeArray(e):this}).filter(function(){var e=this.type;return this.name&&!st(this).is(":disabled")&&An.test(this.nodeName)&&!Sn.test(e)&&(this.checked||!Zt.test(e))}).map(function(e,t){var n=st(this).val();return null==n?null:st.isArray(n)?st.map(n,function(e){return{name:t.name,value:e.replace(En,"\r\n")}}):{name:t.name,value:n.replace(En,"\r\n")}}).get()}}),st.param=function(e,n){var r,i=[],o=function(e,t){t=st.isFunction(t)?t():null==t?"":t,i[i.length]=encodeURIComponent(e)+"="+encodeURIComponent(t)};if(n===t&&(n=st.ajaxSettings&&st.ajaxSettings.traditional),st.isArray(e)||e.jquery&&!st.isPlainObject(e))st.each(e,function(){o(this.name,this.value)});else for(r in e)j(r,e[r],n,o);return i.join("&").replace(Cn,"+")};var jn,Dn,Ln=st.now(),Hn=/\?/,Mn=/#.*$/,qn=/([?&])_=[^&]*/,_n=/^(.*?):[ \t]*([^\r\n]*)\r?$/gm,Fn=/^(?:about|app|app-storage|.+-extension|file|res|widget):$/,On=/^(?:GET|HEAD)$/,Bn=/^\/\//,Pn=/^([\w.+-]+:)(?:\/\/([^\/?#:]*)(?::(\d+)|)|)/,Rn=st.fn.load,Wn={},$n={},In="*/".concat("*");try{Dn=Y.href}catch(zn){Dn=V.createElement("a"),Dn.href="",Dn=Dn.href}jn=Pn.exec(Dn.toLowerCase())||[],st.fn.load=function(e,n,r){if("string"!=typeof e&&Rn)return Rn.apply(this,arguments);var i,o,a,s=this,u=e.indexOf(" ");return u>=0&&(i=e.slice(u,e.length),e=e.slice(0,u)),st.isFunction(n)?(r=n,n=t):n&&"object"==typeof n&&(o="POST"),s.length>0&&st.ajax({url:e,type:o,dataType:"html",data:n}).done(function(e){a=arguments,s.html(i?st("<div>").append(st.parseHTML(e)).find(i):e)}).complete(r&&function(e,t){s.each(r,a||[e.responseText,t,e])}),this},st.each(["ajaxStart","ajaxStop","ajaxComplete","ajaxError","ajaxSuccess","ajaxSend"],function(e,t){st.fn[t]=function(e){return this.on(t,e)}}),st.each(["get","post"],function(e,n){st[n]=function(e,r,i,o){return st.isFunction(r)&&(o=o||i,i=r,r=t),st.ajax({url:e,type:n,dataType:o,data:r,success:i})}}),st.extend({active:0,lastModified:{},etag:{},ajaxSettings:{url:Dn,type:"GET",isLocal:Fn.test(jn[1]),global:!0,processData:!0,async:!0,contentType:"application/x-www-form-urlencoded; charset=UTF-8",accepts:{"*":In,text:"text/plain",html:"text/html",xml:"application/xml, text/xml",json:"application/json, text/javascript"},contents:{xml:/xml/,html:/html/,json:/json/},responseFields:{xml:"responseXML",text:"responseText"},converters:{"* text":e.String,"text html":!0,"text json":st.parseJSON,"text xml":st.parseXML},flatOptions:{url:!0,context:!0}},ajaxSetup:function(e,t){return t?H(H(e,st.ajaxSettings),t):H(st.ajaxSettings,e)},ajaxPrefilter:D(Wn),ajaxTransport:D($n),ajax:function(e,n){function r(e,n,r,s){var l,f,v,b,T,N=n;2!==x&&(x=2,u&&clearTimeout(u),i=t,a=s||"",w.readyState=e>0?4:0,r&&(b=M(p,w,r)),e>=200&&300>e||304===e?(p.ifModified&&(T=w.getResponseHeader("Last-Modified"),T&&(st.lastModified[o]=T),T=w.getResponseHeader("etag"),T&&(st.etag[o]=T)),304===e?(l=!0,N="notmodified"):(l=q(p,b),N=l.state,f=l.data,v=l.error,l=!v)):(v=N,(e||!N)&&(N="error",0>e&&(e=0))),w.status=e,w.statusText=(n||N)+"",l?g.resolveWith(d,[f,N,w]):g.rejectWith(d,[w,N,v]),w.statusCode(y),y=t,c&&h.trigger(l?"ajaxSuccess":"ajaxError",[w,p,l?f:v]),m.fireWith(d,[w,N]),c&&(h.trigger("ajaxComplete",[w,p]),--st.active||st.event.trigger("ajaxStop")))}"object"==typeof e&&(n=e,e=t),n=n||{};var i,o,a,s,u,l,c,f,p=st.ajaxSetup({},n),d=p.context||p,h=p.context&&(d.nodeType||d.jquery)?st(d):st.event,g=st.Deferred(),m=st.Callbacks("once memory"),y=p.statusCode||{},v={},b={},x=0,T="canceled",w={readyState:0,getResponseHeader:function(e){var t;if(2===x){if(!s)for(s={};t=_n.exec(a);)s[t[1].toLowerCase()]=t[2];t=s[e.toLowerCase()]}return null==t?null:t},getAllResponseHeaders:function(){return 2===x?a:null},setRequestHeader:function(e,t){var n=e.toLowerCase();return x||(e=b[n]=b[n]||e,v[e]=t),this},overrideMimeType:function(e){return x||(p.mimeType=e),this},statusCode:function(e){var t;if(e)if(2>x)for(t in e)y[t]=[y[t],e[t]];else w.always(e[w.status]);return this},abort:function(e){var t=e||T;return i&&i.abort(t),r(0,t),this}};if(g.promise(w).complete=m.add,w.success=w.done,w.error=w.fail,p.url=((e||p.url||Dn)+"").replace(Mn,"").replace(Bn,jn[1]+"//"),p.type=n.method||n.type||p.method||p.type,p.dataTypes=st.trim(p.dataType||"*").toLowerCase().match(lt)||[""],null==p.crossDomain&&(l=Pn.exec(p.url.toLowerCase()),p.crossDomain=!(!l||l[1]===jn[1]&&l[2]===jn[2]&&(l[3]||("http:"===l[1]?80:443))==(jn[3]||("http:"===jn[1]?80:443)))),p.data&&p.processData&&"string"!=typeof p.data&&(p.data=st.param(p.data,p.traditional)),L(Wn,p,n,w),2===x)return w;c=p.global,c&&0===st.active++&&st.event.trigger("ajaxStart"),p.type=p.type.toUpperCase(),p.hasContent=!On.test(p.type),o=p.url,p.hasContent||(p.data&&(o=p.url+=(Hn.test(o)?"&":"?")+p.data,delete p.data),p.cache===!1&&(p.url=qn.test(o)?o.replace(qn,"$1_="+Ln++):o+(Hn.test(o)?"&":"?")+"_="+Ln++)),p.ifModified&&(st.lastModified[o]&&w.setRequestHeader("If-Modified-Since",st.lastModified[o]),st.etag[o]&&w.setRequestHeader("If-None-Match",st.etag[o])),(p.data&&p.hasContent&&p.contentType!==!1||n.contentType)&&w.setRequestHeader("Content-Type",p.contentType),w.setRequestHeader("Accept",p.dataTypes[0]&&p.accepts[p.dataTypes[0]]?p.accepts[p.dataTypes[0]]+("*"!==p.dataTypes[0]?", "+In+"; q=0.01":""):p.accepts["*"]);for(f in p.headers)w.setRequestHeader(f,p.headers[f]);if(p.beforeSend&&(p.beforeSend.call(d,w,p)===!1||2===x))return w.abort();T="abort";for(f in{success:1,error:1,complete:1})w[f](p[f]);if(i=L($n,p,n,w)){w.readyState=1,c&&h.trigger("ajaxSend",[w,p]),p.async&&p.timeout>0&&(u=setTimeout(function(){w.abort("timeout")},p.timeout));try{x=1,i.send(v,r)}catch(N){if(!(2>x))throw N;r(-1,N)}}else r(-1,"No Transport");return w},getScript:function(e,n){return st.get(e,t,n,"script")},getJSON:function(e,t,n){return st.get(e,t,n,"json")}}),st.ajaxSetup({accepts:{script:"text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"},contents:{script:/(?:java|ecma)script/},converters:{"text script":function(e){return st.globalEval(e),e}}}),st.ajaxPrefilter("script",function(e){e.cache===t&&(e.cache=!1),e.crossDomain&&(e.type="GET",e.global=!1)}),st.ajaxTransport("script",function(e){if(e.crossDomain){var n,r=V.head||st("head")[0]||V.documentElement;return{send:function(t,i){n=V.createElement("script"),n.async=!0,e.scriptCharset&&(n.charset=e.scriptCharset),n.src=e.url,n.onload=n.onreadystatechange=function(e,t){(t||!n.readyState||/loaded|complete/.test(n.readyState))&&(n.onload=n.onreadystatechange=null,n.parentNode&&n.parentNode.removeChild(n),n=null,t||i(200,"success"))},r.insertBefore(n,r.firstChild)},abort:function(){n&&n.onload(t,!0)}}}});var Xn=[],Un=/(=)\?(?=&|$)|\?\?/;st.ajaxSetup({jsonp:"callback",jsonpCallback:function(){var e=Xn.pop()||st.expando+"_"+Ln++;return this[e]=!0,e}}),st.ajaxPrefilter("json jsonp",function(n,r,i){var o,a,s,u=n.jsonp!==!1&&(Un.test(n.url)?"url":"string"==typeof n.data&&!(n.contentType||"").indexOf("application/x-www-form-urlencoded")&&Un.test(n.data)&&"data");return u||"jsonp"===n.dataTypes[0]?(o=n.jsonpCallback=st.isFunction(n.jsonpCallback)?n.jsonpCallback():n.jsonpCallback,u?n[u]=n[u].replace(Un,"$1"+o):n.jsonp!==!1&&(n.url+=(Hn.test(n.url)?"&":"?")+n.jsonp+"="+o),n.converters["script json"]=function(){return s||st.error(o+" was not called"),s[0]},n.dataTypes[0]="json",a=e[o],e[o]=function(){s=arguments},i.always(function(){e[o]=a,n[o]&&(n.jsonpCallback=r.jsonpCallback,Xn.push(o)),s&&st.isFunction(a)&&a(s[0]),s=a=t}),"script"):t});var Vn,Yn,Jn=0,Gn=e.ActiveXObject&&function(){var e;for(e in Vn)Vn[e](t,!0)};st.ajaxSettings.xhr=e.ActiveXObject?function(){return!this.isLocal&&_()||F()}:_,Yn=st.ajaxSettings.xhr(),st.support.cors=!!Yn&&"withCredentials"in Yn,Yn=st.support.ajax=!!Yn,Yn&&st.ajaxTransport(function(n){if(!n.crossDomain||st.support.cors){var r;return{send:function(i,o){var a,s,u=n.xhr();if(n.username?u.open(n.type,n.url,n.async,n.username,n.password):u.open(n.type,n.url,n.async),n.xhrFields)for(s in n.xhrFields)u[s]=n.xhrFields[s];n.mimeType&&u.overrideMimeType&&u.overrideMimeType(n.mimeType),n.crossDomain||i["X-Requested-With"]||(i["X-Requested-With"]="XMLHttpRequest");try{for(s in i)u.setRequestHeader(s,i[s])}catch(l){}u.send(n.hasContent&&n.data||null),r=function(e,i){var s,l,c,f,p;try{if(r&&(i||4===u.readyState))if(r=t,a&&(u.onreadystatechange=st.noop,Gn&&delete Vn[a]),i)4!==u.readyState&&u.abort();else{f={},s=u.status,p=u.responseXML,c=u.getAllResponseHeaders(),p&&p.documentElement&&(f.xml=p),"string"==typeof u.responseText&&(f.text=u.responseText);try{l=u.statusText}catch(d){l=""}s||!n.isLocal||n.crossDomain?1223===s&&(s=204):s=f.text?200:404}}catch(h){i||o(-1,h)}f&&o(s,l,f,c)},n.async?4===u.readyState?setTimeout(r):(a=++Jn,Gn&&(Vn||(Vn={},st(e).unload(Gn)),Vn[a]=r),u.onreadystatechange=r):r()},abort:function(){r&&r(t,!0)}}}});var Qn,Kn,Zn=/^(?:toggle|show|hide)$/,er=RegExp("^(?:([+-])=|)("+ut+")([a-z%]*)$","i"),tr=/queueHooks$/,nr=[W],rr={"*":[function(e,t){var n,r,i=this.createTween(e,t),o=er.exec(t),a=i.cur(),s=+a||0,u=1,l=20;if(o){if(n=+o[2],r=o[3]||(st.cssNumber[e]?"":"px"),"px"!==r&&s){s=st.css(i.elem,e,!0)||n||1;do u=u||".5",s/=u,st.style(i.elem,e,s+r);while(u!==(u=i.cur()/a)&&1!==u&&--l)}i.unit=r,i.start=s,i.end=o[1]?s+(o[1]+1)*n:n}return i}]};st.Animation=st.extend(P,{tweener:function(e,t){st.isFunction(e)?(t=e,e=["*"]):e=e.split(" ");for(var n,r=0,i=e.length;i>r;r++)n=e[r],rr[n]=rr[n]||[],rr[n].unshift(t)},prefilter:function(e,t){t?nr.unshift(e):nr.push(e)}}),st.Tween=$,$.prototype={constructor:$,init:function(e,t,n,r,i,o){this.elem=e,this.prop=n,this.easing=i||"swing",this.options=t,this.start=this.now=this.cur(),this.end=r,this.unit=o||(st.cssNumber[n]?"":"px")},cur:function(){var e=$.propHooks[this.prop];return e&&e.get?e.get(this):$.propHooks._default.get(this)},run:function(e){var t,n=$.propHooks[this.prop];return this.pos=t=this.options.duration?st.easing[this.easing](e,this.options.duration*e,0,1,this.options.duration):e,this.now=(this.end-this.start)*t+this.start,this.options.step&&this.options.step.call(this.elem,this.now,this),n&&n.set?n.set(this):$.propHooks._default.set(this),this}},$.prototype.init.prototype=$.prototype,$.propHooks={_default:{get:function(e){var t;return null==e.elem[e.prop]||e.elem.style&&null!=e.elem.style[e.prop]?(t=st.css(e.elem,e.prop,"auto"),t&&"auto"!==t?t:0):e.elem[e.prop]},set:function(e){st.fx.step[e.prop]?st.fx.step[e.prop](e):e.elem.style&&(null!=e.elem.style[st.cssProps[e.prop]]||st.cssHooks[e.prop])?st.style(e.elem,e.prop,e.now+e.unit):e.elem[e.prop]=e.now}}},$.propHooks.scrollTop=$.propHooks.scrollLeft={set:function(e){e.elem.nodeType&&e.elem.parentNode&&(e.elem[e.prop]=e.now)}},st.each(["toggle","show","hide"],function(e,t){var n=st.fn[t];st.fn[t]=function(e,r,i){return null==e||"boolean"==typeof e?n.apply(this,arguments):this.animate(I(t,!0),e,r,i)}}),st.fn.extend({fadeTo:function(e,t,n,r){return this.filter(w).css("opacity",0).show().end().animate({opacity:t},e,n,r)},animate:function(e,t,n,r){var i=st.isEmptyObject(e),o=st.speed(t,n,r),a=function(){var t=P(this,st.extend({},e),o);a.finish=function(){t.stop(!0)},(i||st._data(this,"finish"))&&t.stop(!0)};return a.finish=a,i||o.queue===!1?this.each(a):this.queue(o.queue,a)},stop:function(e,n,r){var i=function(e){var t=e.stop;delete e.stop,t(r)};return"string"!=typeof e&&(r=n,n=e,e=t),n&&e!==!1&&this.queue(e||"fx",[]),this.each(function(){var t=!0,n=null!=e&&e+"queueHooks",o=st.timers,a=st._data(this);if(n)a[n]&&a[n].stop&&i(a[n]);else for(n in a)a[n]&&a[n].stop&&tr.test(n)&&i(a[n]);for(n=o.length;n--;)o[n].elem!==this||null!=e&&o[n].queue!==e||(o[n].anim.stop(r),t=!1,o.splice(n,1));(t||!r)&&st.dequeue(this,e)})},finish:function(e){return e!==!1&&(e=e||"fx"),this.each(function(){var t,n=st._data(this),r=n[e+"queue"],i=n[e+"queueHooks"],o=st.timers,a=r?r.length:0;for(n.finish=!0,st.queue(this,e,[]),i&&i.cur&&i.cur.finish&&i.cur.finish.call(this),t=o.length;t--;)o[t].elem===this&&o[t].queue===e&&(o[t].anim.stop(!0),o.splice(t,1));for(t=0;a>t;t++)r[t]&&r[t].finish&&r[t].finish.call(this);delete n.finish})}}),st.each({slideDown:I("show"),slideUp:I("hide"),slideToggle:I("toggle"),fadeIn:{opacity:"show"},fadeOut:{opacity:"hide"},fadeToggle:{opacity:"toggle"}},function(e,t){st.fn[e]=function(e,n,r){return this.animate(t,e,n,r)}}),st.speed=function(e,t,n){var r=e&&"object"==typeof e?st.extend({},e):{complete:n||!n&&t||st.isFunction(e)&&e,duration:e,easing:n&&t||t&&!st.isFunction(t)&&t};return r.duration=st.fx.off?0:"number"==typeof r.duration?r.duration:r.duration in st.fx.speeds?st.fx.speeds[r.duration]:st.fx.speeds._default,(null==r.queue||r.queue===!0)&&(r.queue="fx"),r.old=r.complete,r.complete=function(){st.isFunction(r.old)&&r.old.call(this),r.queue&&st.dequeue(this,r.queue)},r},st.easing={linear:function(e){return e},swing:function(e){return.5-Math.cos(e*Math.PI)/2}},st.timers=[],st.fx=$.prototype.init,st.fx.tick=function(){var e,n=st.timers,r=0;for(Qn=st.now();n.length>r;r++)e=n[r],e()||n[r]!==e||n.splice(r--,1);n.length||st.fx.stop(),Qn=t},st.fx.timer=function(e){e()&&st.timers.push(e)&&st.fx.start()},st.fx.interval=13,st.fx.start=function(){Kn||(Kn=setInterval(st.fx.tick,st.fx.interval))},st.fx.stop=function(){clearInterval(Kn),Kn=null},st.fx.speeds={slow:600,fast:200,_default:400},st.fx.step={},st.expr&&st.expr.filters&&(st.expr.filters.animated=function(e){return st.grep(st.timers,function(t){return e===t.elem}).length}),st.fn.offset=function(e){if(arguments.length)return e===t?this:this.each(function(t){st.offset.setOffset(this,e,t)});var n,r,i={top:0,left:0},o=this[0],a=o&&o.ownerDocument;if(a)return n=a.documentElement,st.contains(n,o)?(o.getBoundingClientRect!==t&&(i=o.getBoundingClientRect()),r=z(a),{top:i.top+(r.pageYOffset||n.scrollTop)-(n.clientTop||0),left:i.left+(r.pageXOffset||n.scrollLeft)-(n.clientLeft||0)}):i},st.offset={setOffset:function(e,t,n){var r=st.css(e,"position");"static"===r&&(e.style.position="relative");var i,o,a=st(e),s=a.offset(),u=st.css(e,"top"),l=st.css(e,"left"),c=("absolute"===r||"fixed"===r)&&st.inArray("auto",[u,l])>-1,f={},p={};c?(p=a.position(),i=p.top,o=p.left):(i=parseFloat(u)||0,o=parseFloat(l)||0),st.isFunction(t)&&(t=t.call(e,n,s)),null!=t.top&&(f.top=t.top-s.top+i),null!=t.left&&(f.left=t.left-s.left+o),"using"in t?t.using.call(e,f):a.css(f)}},st.fn.extend({position:function(){if(this[0]){var e,t,n={top:0,left:0},r=this[0];return"fixed"===st.css(r,"position")?t=r.getBoundingClientRect():(e=this.offsetParent(),t=this.offset(),st.nodeName(e[0],"html")||(n=e.offset()),n.top+=st.css(e[0],"borderTopWidth",!0),n.left+=st.css(e[0],"borderLeftWidth",!0)),{top:t.top-n.top-st.css(r,"marginTop",!0),left:t.left-n.left-st.css(r,"marginLeft",!0)}}},offsetParent:function(){return this.map(function(){for(var e=this.offsetParent||V.documentElement;e&&!st.nodeName(e,"html")&&"static"===st.css(e,"position");)e=e.offsetParent;return e||V.documentElement})}}),st.each({scrollLeft:"pageXOffset",scrollTop:"pageYOffset"},function(e,n){var r=/Y/.test(n);st.fn[e]=function(i){return st.access(this,function(e,i,o){var a=z(e);return o===t?a?n in a?a[n]:a.document.documentElement[i]:e[i]:(a?a.scrollTo(r?st(a).scrollLeft():o,r?o:st(a).scrollTop()):e[i]=o,t)},e,i,arguments.length,null)}}),st.each({Height:"height",Width:"width"},function(e,n){st.each({padding:"inner"+e,content:n,"":"outer"+e},function(r,i){st.fn[i]=function(i,o){var a=arguments.length&&(r||"boolean"!=typeof i),s=r||(i===!0||o===!0?"margin":"border");return st.access(this,function(n,r,i){var o;return st.isWindow(n)?n.document.documentElement["client"+e]:9===n.nodeType?(o=n.documentElement,Math.max(n.body["scroll"+e],o["scroll"+e],n.body["offset"+e],o["offset"+e],o["client"+e])):i===t?st.css(n,r,s):st.style(n,r,i,s)},n,a?i:t,a,null)}})}),e.jQuery=e.$=st,"function"==typeof define&&define.amd&&define.amd.jQuery&&define("jquery",[],function(){return st})})(window);
//返回jquery对象
return $.noConflict(true);
});
//@ sourceMappingURL=jquery.min.map;define(function(require, exports, module){

	//初始化jquery

	var $ = require("jq");


	$("input").unbind("click").bind("click",function(){
		alert(123);
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
		popup.popStatus();
	});

	//新版分页
	var commonAlert = require("../common/MaxTp.alert.js");

	commonAlert.alertReturnMsg("表达错误");


	//加载头部

	require("../common/MaxTp.global.js");


});;define(function(require, exports, module){


	var doSomething = function(){
		alert(123);
	};

   exports.doSomething = function(str) {

   		alert(str);

   };
	
});;/*
 SeaJS - A Module Loader for the Web
 v1.3.1 | seajs.org | MIT Licensed
*/
this.seajs={_seajs:this.seajs};seajs.version="1.3.1";seajs._util={};seajs._config={debug:"",preload:[]};
(function(a){var b=Object.prototype.toString,d=Array.prototype;a.isString=function(a){return"[object String]"===b.call(a)};a.isFunction=function(a){return"[object Function]"===b.call(a)};a.isRegExp=function(a){return"[object RegExp]"===b.call(a)};a.isObject=function(a){return a===Object(a)};a.isArray=Array.isArray||function(a){return"[object Array]"===b.call(a)};a.indexOf=d.indexOf?function(a,b){return a.indexOf(b)}:function(a,b){for(var c=0;c<a.length;c++)if(a[c]===b)return c;return-1};var c=a.forEach=
d.forEach?function(a,b){a.forEach(b)}:function(a,b){for(var c=0;c<a.length;c++)b(a[c],c,a)};a.map=d.map?function(a,b){return a.map(b)}:function(a,b){var d=[];c(a,function(a,c,e){d.push(b(a,c,e))});return d};a.filter=d.filter?function(a,b){return a.filter(b)}:function(a,b){var d=[];c(a,function(a,c,e){b(a,c,e)&&d.push(a)});return d};var e=a.keys=Object.keys||function(a){var b=[],c;for(c in a)a.hasOwnProperty(c)&&b.push(c);return b};a.unique=function(a){var b={};c(a,function(a){b[a]=1});return e(b)};
a.now=Date.now||function(){return(new Date).getTime()}})(seajs._util);(function(a){a.log=function(){if("undefined"!==typeof console){var a=Array.prototype.slice.call(arguments),d="log";console[a[a.length-1]]&&(d=a.pop());if("log"!==d||seajs.debug)if(console[d].apply)console[d].apply(console,a);else{var c=a.length;if(1===c)console[d](a[0]);else if(2===c)console[d](a[0],a[1]);else if(3===c)console[d](a[0],a[1],a[2]);else console[d](a.join(" "))}}}})(seajs._util);
(function(a,b,d){function c(a){a=a.match(o);return(a?a[0]:".")+"/"}function e(a){f.lastIndex=0;f.test(a)&&(a=a.replace(f,"$1/"));if(-1===a.indexOf("."))return a;for(var b=a.split("/"),c=[],d,e=0;e<b.length;e++)if(d=b[e],".."===d){if(0===c.length)throw Error("The path is invalid: "+a);c.pop()}else"."!==d&&c.push(d);return c.join("/")}function p(a){var a=e(a),b=a.charAt(a.length-1);if("/"===b)return a;"#"===b?a=a.slice(0,-1):-1===a.indexOf("?")&&!l.test(a)&&(a+=".js");0<a.indexOf(":80/")&&(a=a.replace(":80/",
"/"));return a}function h(a){if("#"===a.charAt(0))return a.substring(1);var c=b.alias;if(c&&s(a)){var d=a.split("/"),e=d[0];c.hasOwnProperty(e)&&(d[0]=c[e],a=d.join("/"))}return a}function j(a){return 0<a.indexOf("://")||0===a.indexOf("//")}function k(a){return"/"===a.charAt(0)&&"/"!==a.charAt(1)}function s(a){var b=a.charAt(0);return-1===a.indexOf("://")&&"."!==b&&"/"!==b}var o=/.*(?=\/.*$)/,f=/([^:\/])\/\/+/g,l=/\.(?:css|js)$/,n=/^(.*?\w)(?:\/|$)/,i={},d=d.location,q=d.protocol+"//"+d.host+function(a){"/"!==
a.charAt(0)&&(a="/"+a);return a}(d.pathname);0<q.indexOf("\\")&&(q=q.replace(/\\/g,"/"));a.dirname=c;a.realpath=e;a.normalize=p;a.parseAlias=h;a.parseMap=function(r){var d=b.map||[];if(!d.length)return r;for(var m=r,f=0;f<d.length;f++){var g=d[f];if(a.isArray(g)&&2===g.length){var k=g[0];if(a.isString(k)&&-1<m.indexOf(k)||a.isRegExp(k)&&k.test(m))m=m.replace(k,g[1])}else a.isFunction(g)&&(m=g(m))}j(m)||(m=e(c(q)+m));m!==r&&(i[m]=r);return m};a.unParseMap=function(a){return i[a]||a};a.id2Uri=function(a,
d){if(!a)return"";a=h(a);d||(d=q);var e;j(a)?e=a:0===a.indexOf("./")||0===a.indexOf("../")?(0===a.indexOf("./")&&(a=a.substring(2)),e=c(d)+a):e=k(a)?d.match(n)[1]+a:b.base+"/"+a;return p(e)};a.isAbsolute=j;a.isRoot=k;a.isTopLevel=s;a.pageUri=q})(seajs._util,seajs._config,this);
(function(a,b){function d(a,c){a.onload=a.onerror=a.onreadystatechange=function(){o.test(a.readyState)&&(a.onload=a.onerror=a.onreadystatechange=null,a.parentNode&&!b.debug&&j.removeChild(a),a=void 0,c())}}function c(b,c){i||q?(a.log("Start poll to fetch css"),setTimeout(function(){e(b,c)},1)):b.onload=b.onerror=function(){b.onload=b.onerror=null;b=void 0;c()}}function e(a,b){var c;if(i)a.sheet&&(c=!0);else if(a.sheet)try{a.sheet.cssRules&&(c=!0)}catch(d){"NS_ERROR_DOM_SECURITY_ERR"===d.name&&(c=
!0)}setTimeout(function(){c?b():e(a,b)},1)}function p(){}var h=document,j=h.head||h.getElementsByTagName("head")[0]||h.documentElement,k=j.getElementsByTagName("base")[0],s=/\.css(?:\?|$)/i,o=/loaded|complete|undefined/,f,l;a.fetch=function(b,e,i){var h=s.test(b),g=document.createElement(h?"link":"script");i&&(i=a.isFunction(i)?i(b):i)&&(g.charset=i);e=e||p;"SCRIPT"===g.nodeName?d(g,e):c(g,e);h?(g.rel="stylesheet",g.href=b):(g.async="async",g.src=b);f=g;k?j.insertBefore(g,k):j.appendChild(g);f=null};
a.getCurrentScript=function(){if(f)return f;if(l&&"interactive"===l.readyState)return l;for(var a=j.getElementsByTagName("script"),b=0;b<a.length;b++){var c=a[b];if("interactive"===c.readyState)return l=c}};a.getScriptAbsoluteSrc=function(a){return a.hasAttribute?a.src:a.getAttribute("src",4)};a.importStyle=function(a,b){if(!b||!h.getElementById(b)){var c=h.createElement("style");b&&(c.id=b);j.appendChild(c);c.styleSheet?c.styleSheet.cssText=a:c.appendChild(h.createTextNode(a))}};var n=navigator.userAgent,
i=536>Number(n.replace(/.*AppleWebKit\/(\d+)\..*/,"$1")),q=0<n.indexOf("Firefox")&&!("onload"in document.createElement("link"))})(seajs._util,seajs._config,this);(function(a){var b=/(?:^|[^.$])\brequire\s*\(\s*(["'])([^"'\s\)]+)\1\s*\)/g;a.parseDependencies=function(d){var c=[],e,d=d.replace(/^\s*\/\*[\s\S]*?\*\/\s*$/mg,"").replace(/^\s*\/\/.*$/mg,"");for(b.lastIndex=0;e=b.exec(d);)e[2]&&c.push(e[2]);return a.unique(c)}})(seajs._util);
(function(a,b,d){function c(a,b){this.uri=a;this.status=b||0}function e(a,d){return b.isString(a)?c._resolve(a,d):b.map(a,function(a){return e(a,d)})}function p(a,u){var e=b.parseMap(a);r[e]?u():q[e]?v[e].push(u):(q[e]=!0,v[e]=[u],c._fetch(e,function(){r[e]=!0;var d=f[a];d.status===i.FETCHING&&(d.status=i.FETCHED);m&&(c._save(a,m),m=null);t&&d.status===i.FETCHED&&(f[a]=t,t.realUri=a);t=null;q[e]&&delete q[e];if(d=v[e])delete v[e],b.forEach(d,function(a){a()})},d.charset))}function h(a,b){var c=a(b.require,
b.exports,b);void 0!==c&&(b.exports=c)}function j(a){var c=a.realUri||a.uri,d=l[c];d&&(b.forEach(d,function(b){h(b,a)}),delete l[c])}function k(a){var c=a.uri;return b.filter(a.dependencies,function(a){g=[c];if(a=s(f[a]))g.push(c),b.log("Found circular dependencies:",g.join(" --\> "),void 0);return!a})}function s(a){if(!a||a.status!==i.SAVED)return!1;g.push(a.uri);a=a.dependencies;if(a.length){var c=a.concat(g);if(c.length>b.unique(c).length)return!0;for(c=0;c<a.length;c++)if(s(f[a[c]]))return!0}g.pop();
return!1}function o(a){var b=d.preload.slice();d.preload=[];b.length?w._use(b,a):a()}var f={},l={},n=[],i={FETCHING:1,FETCHED:2,SAVED:3,READY:4,COMPILING:5,COMPILED:6};c.prototype._use=function(a,c){b.isString(a)&&(a=[a]);var d=e(a,this.uri);this._load(d,function(){o(function(){var a=b.map(d,function(a){return a?f[a]._compile():null});c&&c.apply(null,a)})})};c.prototype._load=function(a,d){function e(a){(a||{}).status<i.READY&&(a.status=i.READY);0===--g&&d()}var x=b.filter(a,function(a){return a&&
(!f[a]||f[a].status<i.READY)}),j=x.length;if(0===j)d();else for(var g=j,h=0;h<j;h++)(function(a){function b(){d=f[a];if(d.status>=i.SAVED){var u=k(d);u.length?c.prototype._load(u,function(){e(d)}):e(d)}else e()}var d=f[a]||(f[a]=new c(a,i.FETCHING));d.status>=i.FETCHED?b():p(a,b)})(x[h])};c.prototype._compile=function(){function a(b){b=e(b,c.uri);b=f[b];if(!b)return null;if(b.status===i.COMPILING)return b.exports;b.parent=c;return b._compile()}var c=this;if(c.status===i.COMPILED)return c.exports;
if(c.status<i.SAVED&&!l[c.realUri||c.uri])return null;c.status=i.COMPILING;a.async=function(a,b){c._use(a,b)};a.resolve=function(a){return e(a,c.uri)};a.cache=f;c.require=a;c.exports={};var d=c.factory;b.isFunction(d)?(n.push(c),h(d,c),n.pop()):void 0!==d&&(c.exports=d);c.status=i.COMPILED;j(c);return c.exports};c._define=function(a,d,j){var g=arguments.length;1===g?(j=a,a=void 0):2===g&&(j=d,d=void 0,b.isArray(a)&&(d=a,a=void 0));!b.isArray(d)&&b.isFunction(j)&&(d=b.parseDependencies(j.toString()));
var g={id:a,dependencies:d,factory:j},k;if(document.attachEvent){var h=b.getCurrentScript();h&&(k=b.unParseMap(b.getScriptAbsoluteSrc(h)));k||b.log("Failed to derive URI from interactive script for:",j.toString(),"warn")}if(h=a?e(a):k){if(h===k){var l=f[k];l&&(l.realUri&&l.status===i.SAVED)&&(f[k]=null)}g=c._save(h,g);if(k){if((f[k]||{}).status===i.FETCHING)f[k]=g,g.realUri=k}else t||(t=g)}else m=g};c._getCompilingModule=function(){return n[n.length-1]};c._find=function(a){var c=[];b.forEach(b.keys(f),
function(d){if(b.isString(a)&&-1<d.indexOf(a)||b.isRegExp(a)&&a.test(d))d=f[d],d.exports&&c.push(d.exports)});return c};c._modify=function(b,c){var d=e(b),j=f[d];j&&j.status===i.COMPILED?h(c,j):(l[d]||(l[d]=[]),l[d].push(c));return a};c.STATUS=i;c._resolve=b.id2Uri;c._fetch=b.fetch;c._save=function(a,d){var j=f[a]||(f[a]=new c(a));j.status<i.SAVED&&(j.id=d.id||a,j.dependencies=e(b.filter(d.dependencies||[],function(a){return!!a}),a),j.factory=d.factory,j.status=i.SAVED);return j};var q={},r={},v=
{},m=null,t=null,g=[],w=new c(b.pageUri,i.COMPILED);a.use=function(b,c){o(function(){w._use(b,c)});return a};a.define=c._define;a.cache=c.cache=f;a.find=c._find;a.modify=c._modify;c.fetchedList=r;a.pluginSDK={Module:c,util:b,config:d}})(seajs,seajs._util,seajs._config);
(function(a,b,d){var c="seajs-ts="+b.now(),e=document.getElementById("seajsnode");e||(e=document.getElementsByTagName("script"),e=e[e.length-1]);var p=e&&b.getScriptAbsoluteSrc(e)||b.pageUri,p=b.dirname(function(a){if(a.indexOf("??")===-1)return a;var c=a.split("??"),a=c[0],c=b.filter(c[1].split(","),function(a){return a.indexOf("sea.js")!==-1});return a+c[0]}(p));b.loaderDir=p;var h=p.match(/^(.+\/)seajs\/[\.\d]+(?:-dev)?\/$/);h&&(p=h[1]);d.base=p;d.main=e&&e.getAttribute("data-main");d.charset=
"utf-8";a.config=function(e){for(var k in e)if(e.hasOwnProperty(k)){var h=d[k],o=e[k];if(h&&k==="alias")for(var f in o){if(o.hasOwnProperty(f)){var l=h[f],n=o[f];/^\d+\.\d+\.\d+$/.test(n)&&(n=f+"/"+n+"/"+f);l&&l!==n&&b.log("The alias config is conflicted:","key =",'"'+f+'"',"previous =",'"'+l+'"',"current =",'"'+n+'"',"warn");h[f]=n}}else if(h&&(k==="map"||k==="preload")){b.isString(o)&&(o=[o]);b.forEach(o,function(a){a&&h.push(a)})}else d[k]=o}if((e=d.base)&&!b.isAbsolute(e))d.base=b.id2Uri((b.isRoot(e)?
"":"./")+e+"/");if(d.debug===2){d.debug=1;a.config({map:[[/^.*$/,function(a){a.indexOf("seajs-ts=")===-1&&(a=a+((a.indexOf("?")===-1?"?":"&")+c));return a}]]})}a.debug=!!d.debug;return this};a.debug=!!d.debug})(seajs,seajs._util,seajs._config);
(function(a,b,d){a.log=b.log;a.importStyle=b.importStyle;a.config({alias:{seajs:b.loaderDir}});b.forEach(function(){var a=[],e=d.location.search,e=e.replace(/(seajs-\w+)(&|$)/g,"$1=1$2"),e=e+(" "+document.cookie);e.replace(/seajs-(\w+)=[1-9]/g,function(b,d){a.push(d)});return b.unique(a)}(),function(b){a.use("seajs/plugin-"+b);"debug"===b&&(a._use=a.use,a._useArgs=[],a.use=function(){a._useArgs.push(arguments);return a})})})(seajs,seajs._util,this);
(function(a,b,d){var c=a._seajs;if(c&&!c.args)d.seajs=a._seajs;else{d.define=a.define;b.main&&a.use(b.main);if(b=(c||0).args)for(var c={"0":"config",1:"use",2:"define"},e=0;e<b.length;e+=2)a[c[b[e]]].apply(a,b[e+1]);d.define.cmd={};delete a.define;delete a._util;delete a._config;delete a._seajs}})(seajs,seajs._config,this);