define(function(require,exports,module){

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
})