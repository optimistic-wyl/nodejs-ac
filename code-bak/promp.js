
(function($){
	$.toggleDialog=function(options){
		    this.options = options;
		    // 需要操作的对话框元素对象
			var objEven = $(options.even); 
			// 打开/关闭层 (true:显示弹出层；false:隐藏弹出层)
			var display = options.display; 			
			//弹出的对话框不居中显示(true:不居中显示；false:居中显示)。默认为居中
			var isCenter = options.isNotCenter?false:true;
			//自定义弹出框的显示位置
			var isDefinePosition = options.isDefinePosition?true:false;
			//弹出的对话框不是否显示遮罩层。默认为显示
			var isOverlay = options.isNotOverlay?false:true;
			// 遮罩层背景色。默认为黑色
			var background = options.background?options.background: '#000000';	
			// 遮罩层透明度，取值范围在0-1之间。默认为0.5
			var opacity = options.opacity?options.opacity:0.5; 
			// 点击遮罩层也将关闭弹出层内容	
			var areaAllClose=options.areaAllClose!=undefined?options.areaAllClose:true;
			//关闭时回调
			var closeCallback = options.closeCallback ? options.closeCallback : function(){}
			
			var maxZindex = 0;
			
			$(".popbox .close").unbind("click").click(function(event){
				event.preventDefault();
				$.toggleDialog({
					even:$(this).parents(".popbox"),
					display:false
				});
				closeCallback()
			});
			
			var closeDialog=function(boxObj){
		        // 隐藏对话框
				boxObj.hide();
				if ($(".popbox:visible").length<1) {
			        // 隐藏遮罩层 
					$("#divOverlay").remove();
				}else
				{
					$(".popbox:visible").each(function(){
						var zIndex = parseInt($(this).css("z-index"));
						if(zIndex > maxZindex){
							maxZindex = zIndex;
						}
					});
					$("#divOverlay").css("z-index",maxZindex-1);
				}
				/*
				 * modify by wangyl at 2012-11-17
				 */
				if($(".detailPopbox").length){
					$("body").css({"overflow":"hidden"})
				}else{
					$("body").css({"overflow":"auto"})
				}
				
				return false;
			}
			/* 
			* 修改记录： 
			*	修改弹出框居中实现方法  hanhx by 2012-09-14
			*/
			var resizeBox = function(){
				var cw = $(window).height();
				var _boxH=objEven.outerHeight();
				var _boxW=objEven.outerWidth();
				var position = objEven.css("position");
				var boxMT = -(_boxH/2);
	            var boxML=-(_boxW/2);
	            if(position == "absolute"){
	            	boxMT=-(_boxH/2) + $(document).scrollTop();
	            }
	            var wh = $(window).height();
				objEven.css({left:"50%",top:"50%",marginTop: boxMT + "px",marginLeft:boxML+"px"}); 
				if(objEven.offset().top < 0){
					objEven.css({marginTop: 0,top : "15%"});  
				}else if(cw < _boxH){
					objEven.css({marginTop: boxMT +(_boxH -cw)+"px"});  
				}else{
					objEven.css({marginTop: boxMT +"px"});  
				}
			}

		    if (display) {
		        // 显示遮罩层
				if(isOverlay){
					if (document.getElementById("divOverlay") === null) {
						$("body").append("<div id='divOverlay'></div>");
					}
					// 动态设置遮罩层样式
					$("#divOverlay").css({
						background:background,
						opacity:opacity
					}).html("");
				}
				
				objEven.css("visibility","visible");   
		        // 显示对话框 
		        objEven.show(); 
		        // 居中显示
				if(isCenter && !isDefinePosition)
				{
					resizeBox();
				}else{
					$("#divOverlay").addClass("scrollOverlay").html(objEven).css({opacity:"1","background-color":"rgba(0,0,0,0.5)"})
					if(document.all){
						$("#divOverlay").css("background","url("+ctx+"/staticresource/frontstage/images/common/black_0_6.png) repeat transparent")
					}
				}
			
				// 处理弹出框中嵌套弹出多个遮罩层时的显示问题
				// 处理Prompt类型弹出框
				var morePop = $(".popbox:visible").length;
				if(objEven.hasClass("popbox"))
				{
					if(morePop>1)
					{
						$(".popbox:visible").each(function(){
							var zIndex = parseInt($(this).css("z-index"));
							if(zIndex > maxZindex){
								maxZindex = zIndex;
							}
						});
						objEven.css("z-index",maxZindex+1)
						$("#divOverlay").css("z-index",maxZindex);
					}
				}
				if(areaAllClose && (morePop>0)){
			    	$("#divOverlay").unbind("click").bind("click",function(event){
			    		closeDialog(objEven);
		    		});
			    }else{
			    	$("#divOverlay").unbind("click");
			    }
		    }else{
		    	closeDialog(objEven);
		    }
	}
})(jQuery);