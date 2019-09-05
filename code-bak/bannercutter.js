var BannerCutter = function(settings){
	settings = $.extend({
		num : 0,
		timer : 0
	},settings)
	var bannerCutter = function(){
		if($(".banner li").size()<=1){
			return;
		}
		$(".banner li").fadeOut("slow");
		$(".player-index li").removeClass();
		if(settings.num < $(".banner li").length-1) settings.num ++;
		else settings.num  = 0;
		$(".banner li:eq("+settings.num+")").fadeIn("slow");
		$(".player-index li:eq("+settings.num+")").addClass("current");
	}
	
	var autoCutter = function(){
		if($(window).width() > 960){
			var ml = ($(window).width() - 960) / 2;
			$(".player-index",".banner_wrap").css("marginRight",ml);
		}
		$(window).resize(function(){
			if($(window).width() > 960){
				var ml = ($(window).width() - 960) / 2;
				$(".player-index",".banner_wrap").css("marginRight",ml);
			}
		});
		settings.timer = window.setInterval(bannerCutter,5000);
	}
	
	var stop = function(){
		$(".banner li").stop(false,true);
		clearInterval(settings.timer);
	}
	
	$(".banner li").hover(
		stop,
		function(){
			if(settings.timer){
				stop()
			}
			autoCutter();
		}
	)
	$(".player-index li").hover(
		function(){
			stop();
			settings.num = $(this).index() - 1;
			bannerCutter();
		},
		function(){
			if(settings.timer){
				stop()
			}
			autoCutter();
		}
	)
	autoCutter();
}