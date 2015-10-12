var icont = {
	   1:"mistake",
	   2:"misx"
	}
var icon
var icontype =function(num){
   icon = icont[num];
}
var newCommon = {
	    //左侧选项卡
	    leftNav:function(id){
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
		},
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
		//left  弹出层调用
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
							 hideError:set['hideError'],
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
		},//定位弹出层不跟踪
		
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
	   },//登录注册条件
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
		  
	  },//上传所有图片
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
	   },//单选验证
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
//					 word1.on("keypress",function(event){
//						 var e = event||window.event;
//						 pressyx(e)
//					  });
//					 word2.on("keypress",function(event){
//						 var e = event||window.event;
//						 pressyx(e)
//					  });
					  
//					  function pressyx(e){
//							 var o = e.target||e.srcElement;
//							 var keyCode = e.keyCode||e.which; // 按键的keyCode
//							 if(
//								((keyCode >= 65 && keyCode <= 90))||((keyCode >= 49 && keyCode <= 57))||((keyCode >= 97 && keyCode <= 122))){
//									setTimeout(function(){
//										 if(!newCommon.password(word1,word2)){
//											
//											if(word2.val()!=""){
//											    word2.parent().removeClass("ongreen").addClass("oncaps");
//											   txt.removeClass("green").addClass("yellow").html(content).show();
//											}
//										 }else{
//											txt.removeClass("green").hide();
//										 } 	
//									},2)
//							  }else if(keyCode == 8 ){
//									setTimeout(function(){
//										if(!newCommon.password(word1,word2)){
//											 if(word2.val()!=""){
//												txt.removeClass("green").addClass("yellow").html(content).show();
//												word2.parent().removeClass("ongreen").addClass("oncaps");
//											 }else{
//												txt.removeClass("green").addClass("yellow").html("<i class='"+icon+"'></i>"+txt.attr("data-val")); 
//											 }
//										}else{
//											txt.hide();
//										}
//									},2)
//							  }
//						 }
			 }
			 return mm(arrAttr)
		  },//验证页面表单
	   effectHtml:function(btn,finaly){
	       btn = typeof btn == "object"?btn:$(btn);
		   btn.off("click",null);
		   //初始化获得焦点效果
		   focusandblur(finaly["box"],'input[type=text]',1);
		   focusandblur(finaly["box"],'input[type=password]',1);
		   focusandblur(finaly["box"],'textarea',0);
		   focusandblur(finaly["box"],'select',0);
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

				     $(this).on("blur paste change input",function(){
				     	var attr = this
				     	nomust($(attr),null,finaly["inputText"])
			    		});
				     $(this).on("propertychange",function(event){
				     	if(event.propertyName.toLowerCase () == "value"){
				     	var attr = this
				     	nomust($(attr),null,finaly["inputText"]);
				     	}
			    		})
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

//点击按钮查看对象链接 btn点击的按钮 parent向父级寻找节点 inputLink 通过父级锁定跳转的链接
function lookLink(btn,parent,inputLink){
	var url = $(btn).parents(parent).find(inputLink).val();
	if(btn.tagName == "A"){
		$(btn).attr("href",url)[0];
		return;
	}
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
			 	if (o.top==undefined) {
			 		 con_op.box.css({left:$(this).offset().left+con_op.left+"px",top:$(this).offset().top- con_op.box.height()-con_op.top+o.box.height()+45+"px"});
			 	}else{
			 		 con_op.box.css({left:$(this).offset().left+con_op.left+"px",top:$(this).offset().top- con_op.box.height()-con_op.top+"px"});
			 	}
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
			 imgWidth:'auto'||(json.imgWidth>1920?1920:json.imgWidth)||$("#"+json.jQuery+" .liBox img").css("width"),//滑动一次图片的滑动宽度，不设置默认为图片宽度
			 prev:$("#"+json.jQuery+" ."+(json.prev || "btn_prev")),//上一张按钮 (不设置按钮class默认是id下的.btn_prev)
			 next:$("#"+json.jQuery+" ."+(json.next || "btn_next")),//下一张按钮 (不设置按钮class默认是id下的.btn_next)
			 settime:json.settime||3000,//切换一次停留的时间（默认3秒）
			 speed:json.speed||500,//图片切换一次的时间（默认0.5秒）
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
	$("#"+json.jQuery).hover(function(){
		o.prev.show();
		o.next.show()
	},function(){
		o.prev.hide();
		o.next.hide();
	})
    //计算全屏显示时的高度
    if(o.fullScreen){
		var w = parseInt($("#"+json.jQuery+" img").css("width"));
		var h =parseInt($("#"+json.jQuery+" img").height());
		var maxWidth = $(window).width()>1920?1920:$(window).width();
		$("#"+json.jQuery).css('height',h+"px");
		o.allBtn.parent().css(o.btnPos);
		//$("#"+json.jQuery+" li").css({"overflow":"hidden","width":maxWidth+"px"});
		$("#"+json.jQuery+" img").each(function(index){
			$(this).css({"width":w+"px",marginLeft:(-(w -maxWidth)/2)+"px"});
		})
	 	$("#"+json.jQuery+" img").css({"height":h+"px"});
	}else{
		var w = parseInt($("#"+json.jQuery+" img").css("border-left"))+parseInt($("#"+json.jQuery+" img").css("border-right"));
	    var h =parseInt(parseInt(o.imgWidth=='auto'?$(window).width():o.imgWidth)/($("#"+json.jQuery+" img").width()/$("#"+json.jQuery+" img").height()));
		$("#"+json.jQuery).css('height',h+"px");
		o.allBtn.parent().css(o.btnPos);
	 	$("#"+json.jQuery+" img").css({"height":$("#"+json.jQuery+" img").height()+"px","width":o.imgWidth-w+"px"});
		
	}
	//自动播放
	if(o.autoPlay){
	  autoPlay();
	}
	//划过显示第几张
	imgBtn();
	function autoPlay(){
		o.objImg = setInterval(function(){
		 		o.num++;
				if(o.num>=o.liBox.children().length){
					o.num=0;
				}
				play(o.liBox,o.num,o.allBtn);
		},o.settime);
	}
	
	function imgBtn(){
       o.allBtn.each(function(index, element) {
			$(this).click(function(){
				 clearInterval(o.objImg);
				 o.num = index;
				 play(o.liBox,index,o.allBtn,function(){
				   	o._objImg = setTimeout(autoPlay,o.ClickBackSpeed);
				});
			})
       });
	}
	
	//判断是否存在上下按钮
	if(o.prev.length>0&&o.next.length>0){
		prevNext(o.prev,-1);
		prevNext(o.next,1);
	}
	//点击按钮切换幻灯片
	function prevNext(btn,num){
		btn.click(function(){
			clearInterval(o.objImg);
			if(o.onOff){
			  num<0?o.num--:o.num++;
				if(o.num<0){
				   o.num=o.liBox.children().length-1;
				}
				if(o.num>o.liBox.children().length-1){
			       o.num=0;
				}
				play(o.liBox,o.num,o.allBtn,function(){ 
				   	o._objImg = setTimeout(autoPlay,o.ClickBackSpeed);//切换图片后设置时间再次自动切换
				});
			} 
		})
	}
	var play_i = 0;
	var play_li = o.liBox.children('li');
    function play(liBox,num,allBtn,CallBack){
    		
		if(o.onOff){
		    o.onOff = false;
			//判断动画效果
			switch(o.movement){
			   case "slide":
			        liBox.animate({left:-parseInt(o.imgWidth=='auto'?$(window).width():o.imgWidth)*num+"px"},o.speed,"linear",function(){sports()});
					break;
			   case "fadeinout":
				$(play_li[(num)>=play_li.length?0:num]).show().animate({opacity: '1'},o.speed,"linear",function(){sports()});
				$(play_li[num]).siblings('li').animate({opacity: '0'},o.speed,function(){
			   		$(play_li[num]).siblings('li').hide();
			   	})
				
			        	/*liBox.animate({opacity: '0.5'},o.speed,function(){
					$(this).css({left:-parseInt(o.imgWidth=='auto'?$(window).width():o.imgWidth)*num+"px"});
					$(this).animate({opacity: '1'},o.speed,"linear",function(){sports()});
				})*/
				break;
			}
			function sports(){
			   clearInterval(o._objImg);
			   o.onOff = true;
			   if(o.autoPlay){
				  CallBack&&CallBack();
			   }	
			}
            			allBtn.removeClass("on");
		    	allBtn.eq(num).addClass("on");			
		}
    }
}
//幻灯片结束
/*
 * 
 *相册插件 
 * 
 * */
function showAlbum(json){
	var o={ 
			leftBtn:json['leftbtn']||".towardLeft",
			rightBtn:json['rightbtn']||".towardRight",
			margin:json['margin']||20,
			imgNum:json['imgNum']||0
		  }
	$(json['obj']).find("ul").css("left",o.imgNum*-json['scrollWidth'])
	$(json['obj']).each(function(){
		 var num=o.imgNum,maxNum=$(json['list'],attr).children().length-1;
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
	   $("#Level").html($("#lvTj1 option:selected").text()+"-"+$("#lvTj2 option:selected").text())
	   if($("#lvTj1 option:selected").text()=='不限'&&$("#lvTj2 option:selected").text()=='不限'){
	   	$("#Level").html('不限')
	   }
	   //勋章赋值
	   $("#Medal").html($("#enterXz option:selected").text()+"个以上")
	   if($("#enterXz option:selected").text()=='不限'){
	   	 $("#Medal").html('不限')
	   }
	   //参与的省份
	   $("#proTitle").html($(".city_sec option:selected").text())
	   if($("#proTitle").html()!='全部参加'){
	    		$("#Province").html(proval(0)+"&nbsp;&nbsp;"+proval(1)+"&nbsp;&nbsp;"+proval(2))
	   }else{
	   	$("#Province").html("")
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
	   if(obj.hasClass("mustVal")&&obj.val().trim()==""){
	   	if(obj.is('select')){
	   		var showTip = "必选项，请选择";
	   	}else{
	   		var showTip = "必填项，请填写";
	   	}
	 		onbginner(obj)
			setInfo({obj:obj,icon:icon,content:showTip});
		}
	  else if(number(obj.val())&&obj.hasClass("Number")){					//只能输入数字
			onbginner(obj)
			setInfo({obj:obj,icon:icon,content:"请输入数字"})				//设置错误提示内容
	  }else if(!fnumber(obj.val())&&obj.hasClass("fNumber")){					//只能输入负整数
			onbginner(obj)
			setInfo({obj:obj,icon:icon,content:"请输入负整数"})				//设置错误提示内容
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
			setInfo({obj:obj,icon:icon,content:"请输入正确的金额"});
 
	  }else if(!twoPointNum(obj.val())&&obj.hasClass("twoPointNum")){
		 	onbginner(obj);
			setInfo({obj:obj,icon:icon,content:"请输入精确到小数点后两位的数"});
 
	  }else if(selfMaxPay(obj.val(),obj.parent().find('.maxPay').text().trim())&&obj.hasClass("selfMaxPay")){	
	  		onbginner(obj);
			setInfo({obj:obj,icon:icon,content:"请输入小于"+obj.parent().find('.maxPay').text().trim()+"的付款金额"})	
	  												
	  }else if(!threemy(obj.val())&&obj.hasClass("threemy")){
		 	onbginner(obj);
			setInfo({obj:obj,icon:icon,content:"请输入小于300的付款金额"});
 
	  }else if(!number6(obj.val())&&obj.hasClass("number6")){
		 	onbginner(obj);
			setInfo({obj:obj,icon:icon,content:obj.attr('error-val')});
 
	  }else if(!paymentSix(obj.val())&&obj.hasClass("paymentSix")){
		 	onbginner(obj);
			setInfo({obj:obj,icon:icon,content:"请输入正确的6位金额，可精确到分"});
 
	  }else if(!checkEmail(obj.val())&&obj.hasClass("checkEmail")){			//邮箱
			onbginner(obj);
			setInfo({obj:obj,icon:icon,content:"邮箱格式错误"});
	  }else if(!weixin(obj.val())&&obj.hasClass("weixin")){	                //微信
			onbginner(obj);
			setInfo({obj:obj,icon:icon,content:"请输入正确的微信号"});
	  }else if(obj.attr("name")=="nickName4_20"&&(!nickName(obj.val()) || newGetByteLen(obj.val())[0] < 4 || newGetByteLen(obj.val())[0] > 20)){//密码
			onbginner(obj)
			setInfo({obj:obj,icon:icon,content:"请输入4-20个字符，支持中英文、数字、“_”或减号"})
	  }else if(!nickName6_18(obj.val())&&obj.hasClass("nickName6_18")){											//密码
			onbginner(obj)
			setInfo({obj:obj,icon:icon,content:"请输入6-18位字母、数字或符号的组合，字母区分大小写"})
	  }else if(!nickName6_18(obj.val())&&obj.attr("name")=="nickName6_18"){											//密码
			onbginner(obj)
			setInfo({obj:obj,icon:icon,content:"请输入6-18位字母、数字或符号的组合，字母区分大小写"})
	  }else if(!maxtpUrl(obj.val())&&obj.hasClass("maxtpUrl")){
		    onbginner(obj)
		    setInfo({obj:obj,icon:icon,content:"仅支持美试网站内链接"})
	  }else if(!weiboUrl(obj.val())&&obj.hasClass("weiboUrl")){
		    onbginner(obj)
		    setInfo({obj:obj,icon:icon,content:"请输入正确的微博地址"})
	  }else if(!idNumber(obj.val())&&obj.hasClass("idNumber")){
		    onbginner(obj)
		    setInfo({obj:obj,icon:icon,content:"请输入正确的身份证号"})
	  }else if(!qq(obj.val())&&obj.hasClass("qq")){
		    onbginner(obj)
		    setInfo({obj:obj,icon:icon,content:"请输入正确的QQ号"})
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
				setInfo({obj:obj,content:"必选项,请选择"})
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

//只能输入负整数
function fNumberDel(obj){
	obj=obj==undefined?".fNumberDel":obj;
	var len = 0;
	$(obj).each(function(){
		var attr = this;
		$(this).on('keyup',regEpx)
		$(this).on('onafterpaste',regEpx)
		$(this).on('blur',regEpx)
 	})
	function regEpx(){
		var s = new RegExp("^\\-[1-9][0-9]*$|^\\-?$");
		var str = $(this).val();

        if(!s.test(str)){
        	if(str.length-len>1){
        		$(this).val(str.substring(0,str.length-1));
        		len++;
        	}else{
        		$(this).val(str.substring(0,str.length-len));
        		len += str.length;
        	}
        }
		if(str.charAt(1)=="0"){
		$(this).val('-'+str.substring(2,str.length-1));
		}
	}
}
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
		var num = $(this).val();
		if(num.charAt(0)=="0"){
		$(this).val(num.substring(1,num.length));
		}
	}
}

//只能输入自定义位数的数字
function numValidate(obj){
	obj=obj==undefined?".numValidate":obj;
	$(obj).each(function(){
		var attr = this;
		$(this).on('keyup',regEpx)
		$(this).on('onafterpaste',regEpx)
		$(this).on('blur',regEpx)
	})
	function regEpx(){
		var lenStr = $(this).attr('length');
		var len = Number(lenStr.trim().split('_')[1]);
		var s = new RegExp("^\\d{0,"+len+"}$");
		var str = $(this).val();
        if(!s.test(str)){
        	$(this).val("");
        }
	}
}
//只能输入六位数字
function selfMaxChinese(obj){
	obj=obj==undefined?".selfMaxChinese":obj;
	$(obj).each(function(){
		var attr = this;
		$(this).on('keyup',regEpx)
		$(this).on('onafterpaste',regEpx)
		$(this).on('blur',regEpx)
	})
	function regEpx(){
		var lenStr = $(this).attr('length');
		var len = Number(lenStr.trim().split('_')[1]);
		var s = new RegExp("^[a-zA-Z\\u4e00-\\u9fa5]{0,"+len+"}$");
		var str = $(this).val();
        if(!s.test(str)){
        	$(this).val(str.substring(0,len));
        }
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
		$(this).on('keypress',function(event){
			if(event.keyCode == 32)
			event.returnValue = false;
		})
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
function fnumber(str){
		var s =/^\-[1-9][0-9]*$/;
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
//6-18位数字字母
function nickName6_18(str){
	var s = /^((?=.*?\d)(?=.*?[A-Za-z])|(?=.*?\d)(?=.*?[\.\\\/\?!@#$%^&])|(?=.*?[A-Za-z])(?=.*?[\.\\\/\?!@#$%^&]))[\dA-Za-z\.\\\/\?!@#$%^&]{6,18}$/;
	return s.test(str);
}

//数字小于300
function threemy(str){
	 var s =  /^([1-9]|[1-9][0-9]|[0-2][0-9][0-9]|300)$/
	return s.test(str)
}
//数字小于自定义大小金额
function selfMaxPay(str,maxPay){
	 if(Number(str)>Number(maxPay))
	 {
	 	return true;
	 } 
	 else {
	 	return false;
	 }
}
//判断非数字
function shuzi(str){
		var s =/\D/g;
		return s.test(str);
}  
//判断qq号
function qq(str){
		var s =/[1-9]\d{4,}/;
		return s.test(str);
} 
//价格
function price1(str){
  var s =/^(([0-9]+\.\d{1,2})|([0-9]*[1-9][0-9]*\.\d{1,2})|([0-9]*[1-9][0-9]*))$/ ;
  return s.test(str);
}
//付款金额 允许数字 yanxf 2015-07-06 .
// function payment(str){
// 	var s=/^([1-9][\d]{0,7}|0)(\.[\d]{1,2})?$/;
// 	return  s.test(str);	
// }
function payment(str){
	var s=/^([1-9][\d]{0,13}|0)(\.[\d]{1,2})?$/;
	return  s.test(str);	
}

function paymentSix(str){
	var s=/^([1-9][\d]{0,5}|0)(\.[\d]{1,2})?$/;
	return  s.test(str);	
}
//数字和字母
function letterNum(str){
  var s = /^[A-Z]+$/
  return s.test(str);
}
//六位数字
function number6(str){
  var s = /^\d{6}$/
  return s.test(str)
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
//微信验证
function weixin(str){
	var s = /^[a-z_\d]+$/
	return s.test(str)
}
//邮箱验证
function checkEmail(str){
	var s= /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/
	return s.test(str)
}
//两位小数点验证
function twoPointNum(str){
	var s= /^\d+(\.\d{1,2})?$/;
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
//微博链接验证
function weiboUrl(url) {
	var strRegex = "^(((ht|f)tp(s?))\://)?(www.|[a-zA-Z].)[a-zA-Z0-9\-\.]+\.(com|edu|gov|mil|net|org|biz|info|name|museum|us|ca|uk)(\:[0-9]+)*(/($|[a-zA-Z0-9\.\,\;\?\'\\\+&amp;%\$#\=~_\-]+))*$";
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
	    	WindowScrollSize:json["scrollSize"]==false?"false":"true"|| "true"
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

//隐藏 textError
function hideError(json){
	$(json['box']).find('.textError').hide();
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

//确定回调函数
function Confirm(json,num,del){
	var timer = null,
		$index=$(json['This']).index(".addfs");
	
	focusandblur(json["box"],'input[type=text]',1);
	focusandblur(json["box"],'input[type=password]',1);
	focusandblur(json["box"],'textarea',0);
	focusandblur(json["box"],'select',0 );
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
//设置div代码在js中，同等外部调用，样式可自定义设置
function setwrite(json,step){
	if(json['write']&&step == 1){
		if($(json['box']).length>0){
			$(json['box']).remove();
		}
	}
}

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
//函数主体
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
	if(json['hideError']){
		hideError(json);
	}
	if(json['documentEvent']){
	  truble(json)
	}
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
  $(".refundResson").bind("focus", function(){
         $("label[for=inputs]")[0].style.display = 'none';
    });
 $(".refundResson").bind("blur", function(){
     if ("" == this.value) {
        　　　$("label[for=inputs]")[0].style.display = '';
        　}
 });
 
//table中首列复选框联动
 function checkSelectAll(id) { var thckbox = $('#' + id + ' th input[type=checkbox]'); var tdckbox = $('#' + id + ' td input[type=checkbox]'); tdckbox.each(function (i) { $(this).bind('click', function () { var ifall = CkAll(); if (ifall) { thckbox.attr('checked', 'checked'); } else { thckbox.attr('checked', null); } }); }); function CkAll() { var result = true; for (var i = 0; i < tdckbox.length; i++) { if ($(tdckbox[i]).attr('checked') != 'checked') { result = false; } } return result; } }
