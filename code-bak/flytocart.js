/**
 * 飞入购物车动画：设置飞入图片的起始位置（top、left），获取迷你购物车的位置（top、left），设置为飞入图片的结束位置（top、left）
 */
/* {
flyToCart: function(obj) {
    if(obj.attr("productDetail") == "1"){
        // 商品详细页面添加商品到购物车效果
        var $detailImg = $(".inspirationdetail").find(".choose").find("img");
        if($detailImg.length > 0) {
            var $flyImg = $detailImg.clone().css({"position":"absolute", "top": $detailImg.offset().top, "left": $detailImg.offset().left, "z-index": 99999}).show();
            $flyImg.appendTo("body").animate({top:$(".ShopCart:visible").offset().top, left: $(".ShopCart:visible").offset().left, width: 50, height:50}, {
                duration: 1000,
                complete: function(){
                    $flyImg.remove();
                }
            });
        }
    }else{
        // 弹出框添加商品到购物车效果
        var $ProductBox_detail = obj.closest(".ProductBox_detail");
        if($ProductBox_detail.length > 0) {
            var $gridListImg = $ProductBox_detail.find(".Product_Img").find("img");
            var $flyImg = $gridListImg.clone().css({"position":"absolute", "top": $gridListImg.offset().top, "left": $gridListImg.offset().left, "z-index": 99999}).show();
            $flyImg.appendTo("body").animate({top:$(".ShopCart").offset().top, left: $(".ShopCart").offset().left, width: 50, height:50}, {duration: 1000, complete: function(){
                    $flyImg.remove();
                    if($("#shoppingCartFooter:visible").length > 0){
                        ScrollFooter.ajaxAddProduct($("#shoppingCartFooter"));
                    }
                } 
            });
        }
    }
}
} */