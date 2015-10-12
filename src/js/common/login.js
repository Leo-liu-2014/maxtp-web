// JavaScript Document
var mcal = {
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
	  },//登录注册条件
	  correctness:function(capt){
		  var onoff = null,num = $(capt+" input.mustVal").length;
		  $(capt+" input.mustVal").each(function(index, element) {
			   var onoff = ($(this).val()=="")
			   //输入为空状态
          	   num = blurElement($(this),num)
			   $(this).on("keypress",function(event){
				     var e = event||window.event;
					 var o = e.target||e.srcElement;
					 var keyCode = e.keyCode||e.which;
					 var This = $(this);
					 if (
					   ((keyCode >= 65 && keyCode <= 90))||((keyCode >= 49 && keyCode <= 57))||((keyCode >= 97 && keyCode <= 122))
					 ){
						$(this).parent().find(".Prompt").hide();
					 }else if(keyCode == 9){
						  if(This.val()=="")nokong(This,num);
					 }else{
						 setTimeout(function(){
		     				 if(This.val()=="")onkong(This,num);
						 },1)
					 }
			   })
			   
          });
		  
		  return num==0?true:false;  
		  
	  },
	  correctness2:function(capt){
		  var onoff = null,num = $(capt+" textarea.mustVal").length;
		  $(capt+" textarea.mustVal").each(function(index, element) {
			   var onoff = ($(this).val()=="")
			   //输入为空状态
          	   num = blurElement($(this),num)
			   $(this).on("keypress",function(event){
				     var e = event||window.event;
					 var o = e.target||e.srcElement;
					 var keyCode = e.keyCode||e.which;
					 var This = $(this);
					 if (
					   ((keyCode >= 65 && keyCode <= 90))||((keyCode >= 49 && keyCode <= 57))||((keyCode >= 97 && keyCode <= 122))
					 ){
						$(this).parent().find(".Prompt").hide();
					 }else if(keyCode == 9){
						  if(This.val()=="")nokong(This,num);
					 }else{
						 setTimeout(function(){
		     				 if(This.val()=="")onkong(This,num);
						 },1)
					 }
			   })
			   
          });
		  
		  return num==0?true:false;  
		  
	  },//上传所有图片
	  must:function(imgbox,way){
		      var  result = true
			  $("img.must",imgbox).each(function(index, element) {
				   if($(this).attr('src')==''){
					  var obj = $(this).parents(imgbox).find(".Prompt")
					  if(way){
				        obj.fadeIn(300);
					    obj.html(obj.attr("data-val"))
					  }
					  result = false
				   }
			  });
			  return result
	   },//至少上传一张图片验证
	    least:function(imgbox,way){
			  var  result = true,onoff=true,top
			  $(imgbox).each(function(){
				  var num,n=0
			      $('img.least',this).each(function(index,element){
					    num = 0
			            if($(this).attr('src')!=""){
						    n++;
						}
						result = n;
				  })
				   if(result == 0 && num ==0){
			         onoff = false;
					 if(way){
						 $('.Prompt',this).show().html("<i class='mistake'></i>"+$('.Prompt',this).attr('data-val'));
						 top = $('img.least',this).offset().top;
					 }
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
						if(way)$('.Prompt',this).show().html("<i class='mistake'></i>"+$('.Prompt',this).attr('data-val'));  
				   }else{
						result = true;
						if(way)$('.Prompt',this).hide();  
				   }
			   }
			   $("input[type=radio]",attr).on("click",function(){
				   result = true;
					if(way)$('.Prompt',attr).hide();    
			   })
		   })
		  return result
	   },//验证下拉框
	   seleffect:function(obj,way){
		  var result = true;
		  $(obj).change(function(){
			   selval($(this))
		  })
		  selval($(obj))
		  function selval(obj){
			  $(obj).each(function(index, element) {
				  if($(this).get(0).tagName == "SELECT"){
					   var error = $(this).parent().find(".Prompt")
					   if($(this).val()=="selected"||$(this).val()==""){
							result  = false
							error.fadeIn(150);
							error.html("<i class='mistake'></i>"+error.attr("data-val"))
					   }else{
							result = true;
							error.hide();
					   }
					}
			  });
		  }
		  return result;
	   } ,//密码不一致判断
	   password:function(word1,word2,onoff){
			 var arrAttr = [word1.val(),word2.val()];
			 var txt = word2.parent().find(".Prompt");
			 var content = "<i class='mistake'></i>两次输入密码不一致";
			 if(onoff){
					 if(word2.val()!=""&&!mcal.password( word1,word2)){
						 txt.removeClass("green").addClass("yellow").html(content).show();
					 }
					 word2.on("blur",function(){
						 focusblur($(this))
					 });
					 word2.on("focus",function(){
						 focusblur($(this),1)
					 });
					 function focusblur(obj,n){
					     if(!mcal.password( word1,word2)){
							 if(word2.val()!=""){
								 if(n==1){
								 	obj.parent().removeClass("ongreen").addClass("oncaps");
								 }
								 txt.removeClass("green").addClass("yellow").html(content).show();
							 }
						 } 
					 }
					 word1.on("keypress",function(event){
						 var e = event||window.event;
						 pressyx(e)
					  });
					 word2.on("keypress",function(event){
						 var e = event||window.event;
						 pressyx(e)
					  });
					  
					  function pressyx(e){
							 var o = e.target||e.srcElement;
							 var keyCode = e.keyCode||e.which; // 按键的keyCode
							 if(
								((keyCode >= 65 && keyCode <= 90))||((keyCode >= 49 && keyCode <= 57))||((keyCode >= 97 && keyCode <= 122))){
									setTimeout(function(){
										 if(!mcal.password(word1,word2)){
											
											if(word2.val()!=""){
											    word2.parent().removeClass("ongreen").addClass("oncaps");
											   txt.removeClass("green").addClass("yellow").html(content).show();
											}
										 }else{
											txt.removeClass("green").hide();
										 } 	
									},2)
							  }else if(keyCode == 8 ){
									setTimeout(function(){
										if(!mcal.password(word1,word2)){
											 if(word2.val()!=""){
												txt.removeClass("green").addClass("yellow").html(content).show();
												word2.parent().removeClass("ongreen").addClass("oncaps");
											 }else{
												txt.removeClass("green").addClass("yellow").html("<i class='mistake'></i>"+txt.attr("data-val")); 
											 }
										}else{
											txt.hide();
										}
									},2)
							  }
						 }
			 }
			 
			 return mm(arrAttr)
		  },//登录验证
	    login:function(btn,final){
	       btn = typeof btn == "object"?btn:$(btn);
		   btn.off("click",null);
		   //初始化获得焦点效果
		   $(final["box"]+" input.mustVal").each(function(index, element) {
				 var obj = $(this).parent().find(".Prompt");
                 $(this).on("focus",function(){
				      $(this).parent().addClass("ongreen");
					  obj.removeClass("yellow").addClass("green").html(obj.attr("data-val")).fadeIn(1);
				 });
				 $(this).on("blur",function(){
					  blurElement($(this))
				 });
           })
           $(final["box"]+" textarea.mustVal").each(function(index, element) {
				 var obj = $(this).parent().find(".Prompt");
     //             $(this).on("focus",function(){
				 //      $(this).parent().addClass("ongreen");                                          //多行输入框没有对焦显示绿色提示信息事件
					//   obj.removeClass("yellow").addClass("green").html(obj.attr("data-val")).fadeIn(1);
				 // });
				 $(this).on("blur",function(){
					  blurElement($(this))
				 });
           })
		   //判断点击是否通过验证
	       btn.on("click",function(){
			   var must = mcal.must(".mustVal");//至少上传一张图片
			   var least = mcal.least(".mustVal");//至少上传一张图片
			   var radio = mcal.Radioeffect(".mustVal");//单选验证
			   var sel = mcal.seleffect("select.mustVal");//下拉验证
			   if(final["pwd1"]!=undefined&&final["pwd2"]!=undefined){
			   	var same = mcal.password( elem(final["pwd1"]), elem(final["pwd2"]));//再次输入密码 是否一直
			   }
   			   if(mcal.correctness(final["box"])&&must&&least[0]&&sel&&same){
				    final["ok"]&&final["ok"]();	//通过验证
			   }else{
				    mcal.correctness(final["box"]);//不通过验证
				    mcal.correctness2(final["box"]);
					mcal.least(".mustVal",true);
					mcal.Radioeffect(".mustVal",true);
					mcal.seleffect(".mustVal",true);
				    mcal.password( elem(final["pwd1"]), elem(final["pwd2"]),true);
			   }
		   })
	  }

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
  var icon = "<i class='mistake'></i>";
  if(color){
	  lv = "yellow",ju = "green",icon="";
  }
  if(obj.attr("name")==name){
	   obj.parent().find(".Prompt").removeClass(lv).addClass(ju).html(icon+obj.parent().find(".Prompt").attr("data-val")).fadeIn(1);
   } 
}
//失去焦点判断输入信息提示
function blurElement(obj,num){
	  //条件判断开始
	  if(obj.val()==""){
		    if(num){nokong($(this),num);}//点击确认后显示错误提示
			onbg(obj)
			errorEle(obj).html("<i class='mistake'></i>"+obj.parent().find(".Prompt").attr("data-val")).show();
	  }else if(number(obj.val())&&obj.hasClass("number")){//只能输入数字
			onbg(obj)
			errorEle(obj).html("<i class='mistake'></i>您输入的格式有误，请重新输入").show();
	  }else{
		    if(num){num--;}
		    obj.parent().removeClass("ongreen").removeClass("oncaps");
	        obj.parent().find(".Prompt").hide();
	  }
	  
	  
	  //条件判断结束
	  function onbg(obj){
	  	  obj.parent().removeClass("ongreen").addClass("oncaps");
	  }
	  function errorEle(obj){
		  return obj.parent().find(".Prompt").removeClass("green").addClass("yellow");
	  }
	  return num
}
function elem(obj){
	return typeof obj == "object"?obj:$(obj);
}
//判断非数字
function number(str){
		var s =/\D/g;
		return s.test(str);
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
//获取元素ID
function id(id){
   return document.getElementById(id)
}

function messageCode(paramete){
	 var obj = paramete["obj"]; 			//按钮对象
	 var num = paramete["sum"]; 			//总共可以点击的次数
	 var Surplus = paramete["Surplus"];		//显示剩余点击的次数
	 var Start = paramete["Starttimes"];	//初始化设置第几次开始
	 var time= paramete["lasttime"];		//读秒剩余时间
	 var type = paramete["type"];			//特殊情况判断的类型
	 var style = paramete["styleChange"];
	 var miao = time
	 var timer = null,txt=null,typeon = null;
	 var dataText = {
			phoneClass:["重新发送","重新发送验证邮件","重新发送激活邮件","发送验证短信"]	
			,endfn:null
	 }
	 if(style==undefined||style==false){
	 	 var btnhui = $(obj).removeClass("btn_wsyhcz").addClass("btn_wsyhcz_2");
	 }else{
	 	var btnhui = $(obj);
	 }
	
	 if(type&&type=="emailpost"){
		 txt = dataText["phoneClass"][1];
		 $("#lookEmail").show();
	 }else if(type&&type=="emailActivate"){
		 txt = dataText["phoneClass"][2];
		 $("#emailBox").attr("disabled",true);
		 dataText["endfn"] = function(){
		    $("#emailBox").attr("disabled",false);
		 }
		 $("#lookEmail").show();
	 }else if(type&&type=="again"){
		 txt = dataText["phoneClass"][3];
	 }else if(type&&type=="box"){
		     common.lert("alway",{bgcolor:"bggreen",content:"夺标压顶无可奈何花落去",okval:"确认"});
			 txt = dataText["phoneClass"][0];
	 }else{
		 txt = dataText["phoneClass"][0];
	 }
	 //初始化发送按钮，清空初始化事件
	 btnhui.val(txt+"（"+miao+"）");
	 $(obj).attr("disabled",true);
	  $("#Input").attr("disabled",true).addClass("eaeaea")
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
	      if(miao==0){
		         timeend();
		  }else{
			 timer = setInterval(function(){
			 miao--;
		 	 btnhui.val(txt+"（"+miao+"）");
				 if(miao==0){
			         timeend()
				 }
	     	 },1000)
		  }
	      
	 }
	 function timeend(){
		 clearInterval(timer);
		 $(obj).attr("disabled",false);
		 $("#Input").attr("disabled",false)
		 $("#Input").removeClass("eaeaea")
		 if(style==undefined||style==false){
		 	$(obj).removeClass("btn_wsyhcz_2").addClass("btn_wsyhcz").val(txt);
		 }else{
		 	$(obj).val(txt);
		 }
		 
		 if(dataText["endfn"]!=null&&typeof dataText["endfn"]=="function")dataText["endfn"]()//
	 }
	 startcount()
	 //判断发送剩余次数，Surplus为剩余多少次开始计算
	 function startcount(){
		 if(num-Start<=Surplus&&num-Start>0){
			$("#showTime").show().html("您还可以发送"+(num-Start)+"次");
		 }
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