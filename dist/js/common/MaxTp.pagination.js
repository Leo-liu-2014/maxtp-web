/*! maxtp 2015-10-08 */
function generatePagingHtml(a,b,c,d,e,f,g){""!=d&&""!=c&&""!=e&&(c=parseInt(c),d=parseInt(d),e=parseInt(e),1>d||(select_page_size=!0,"undefined"==typeof g||"undefined"==typeof g.select_page_size||g.select_page_size||(select_page_size=!1),$("#"+a).pagination(0,{form_id:b,current_page:c-1,total_page:d,items_per_page:e,select_page_size:select_page_size,callback:function(a,b,c){b++,f(a,b,c)}})))}jQuery.fn.pagination=function(a,b){return b=jQuery.extend({form_id:"",total_page:0,items_per_page:20,num_display_entries:5,current_page:0,num_edge_entries:2,link_to:"javascript:void(0)",prev_text:"<",next_text:">",ellipse_text:".....",prev_show_always:!0,next_show_always:!0,select_page_size:!0,show_total_page:!0,go_page_num:!0,onload_callback:!1,callback:function(){return!1}},b||{}),this.each(function(){function c(){return b.total_page>0?b.total_page:(b.total_page=Math.ceil(a/b.items_per_page),b.total_page)}function d(){var a=Math.ceil(b.num_display_entries/2),d=c();b.total_page=d;var e=d-b.num_display_entries,f=g>a?Math.max(Math.min(g-a,e),0):0,h=g>a?Math.min(g+a,d):Math.min(b.num_display_entries,d);return h-f>b.num_display_entries&&(f+=1),[f,h]}function e(a,c,d){g=a,f();var e=b.callback(b.form_id,a,c,h);return e||(d.stopPropagation?d.stopPropagation():d.cancelBubble=!0),e}function f(){h.empty(),h.append('<div class="yahoo">');var a=d(),f=c(),i=function(a,b){return function(c){return e(a,b,c)}},j=function(a,c){if(a=0>a?0:f>a?a:f-1,c=jQuery.extend({text:a+1,classes:""},c||{}),a==g)var d=jQuery("<span class='current'>"+c.text+"</span>");else var d=jQuery("<a>"+c.text+"</a>").bind("click",i(a,b.items_per_page)).attr("href",b.link_to.replace(/__id__/,a));c.classes&&d.addClass(c.classes),("<"==c.text||">"==c.text)&&d.removeClass("current"),h.append(d)};if(b.prev_text&&(g>0||b.prev_show_always)?j(g-1,{text:b.prev_text,classes:"prev"}):h.append('<span class="disabled"> '+b.prev_text+" </span>"),a[0]>0&&b.num_edge_entries>0){for(var k=Math.min(b.num_edge_entries,a[0]),l=0;k>l;l++)j(l);b.num_edge_entries<a[0]&&b.ellipse_text&&h.append(b.ellipse_text)}for(var l=a[0];l<a[1];l++)j(l);if(b.total_page>5&&g+3<b.total_page&&h.append(b.ellipse_text),b.next_text&&(f-1>g||b.next_show_always)?j(g+1,{text:b.next_text,classes:"next"}):h.append('<span class="disabled"> '+b.next_text+" </span>"),h.append(" 共"+b.total_page+"页"),b.go_page_num){h.append(" ,去第");var m=jQuery('<input type="text" paging="pagenum" value="'+(parseInt(g)+1)+'">').bind("change",function(){var a=$(this).val().replace(/[^\d]/g,"");("0"==a||""==a)&&(a=parseInt(g)+1),parseInt(a)>b.total_page&&(a=b.total_page),$(this).val(a)});h.append(m)}if(b.select_page_size){var n="";n+='<select paging="pagesize">',n+='<option value="10">10/页</option>',n+='<option value="20">20/页</option>',n+='<option value="50">50/页</option>',n+='<option value="100">100/页</option>',n+="</select>";var o=jQuery(n).bind("change",function(a){e(0,$(this).val(),a)});o.val(b.items_per_page),h.append(o)}if(b.go_page_num||b.select_page_size){var p=jQuery('<a class="go" href="'+b.link_to+'">GO</a>').bind("click",function(a){var c=$(this).parent().find("input[paging=pagenum]").val();c=isNaN(c)?0:parseInt(c)-1;var d=$(this).parent().find("select[paging=pagesize]").val();d!=b.items_per_page&&(c=0),e(c,d,a)});h.append(p)}h.append("</div>")}var g=b.current_page;a=!a||0>a?1:a,b.items_per_page=!b.items_per_page||b.items_per_page<0?1:b.items_per_page,jQuery(this).html('<div class="yahoo"></div>');var h=jQuery(this).find("div.yahoo");this.selectPage=function(a){e(a)},this.prevPage=function(){return g>0?(e(g-1,b.items_per_page),!0):!1},this.nextPage=function(){return g<c()-1?(e(g+1,b.items_per_page),!0):!1},(0!=b.total_page||0!=a)&&f(),b.onload_callback&&b.callback(b.form_id,g,b.items_per_page,this)})};