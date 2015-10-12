define(function(require,exports,module){

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
});