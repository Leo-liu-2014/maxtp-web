/**
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


