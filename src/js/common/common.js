define(function(require, exports, module){

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
    //imgbHeigh设置图片的高imgHeight冲了，暂时这么写。hyq2015/10/10
        json['imgbHeigh']=json['imgbHeight']||300;
        oCon = '<div id="'+json["id"]+'" class="pzImg"><span class="close"></span><img src="'+This.prev().children().attr('src')+'" width="'+json['imgWidth']+'" height="'+json['imgbHeight']+'"></div>'
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

});