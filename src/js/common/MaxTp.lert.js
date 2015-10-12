define(function(require,exports,module){

		var $ = require("jq");

		//lert
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
