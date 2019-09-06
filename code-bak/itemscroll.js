function itemsScroll(scrollType,obj,showItems,scrollItemsNum) {
    var objPanel = obj.closest(".JS_ProductShow").find("ul");
    var objPanelItems = objPanel.find("li");
    var itemsLength = objPanelItems.length;	// 总Items个数
    var showItems = showItems;	// 每次最多会显示的Items数
    var scrollItemsNum = scrollItemsNum;	// 一次滚动的Items数
    var dividers = Math.ceil(itemsLength / scrollItemsNum);
    var _boxWidth = parseInt(objPanel.find("li").outerWidth(true));	// Items容器的宽度
    var _moveWidth = _boxWidth * scrollItemsNum;	// 每次滚动距离
    var _moveMaxOffset = (dividers - 1) * _moveWidth;
    var _moveMinOffset = (itemsLength - showItems) * _moveWidth;
    var _panelLeft = isNaN(parseInt(objPanel.css("left"))) ? 0 : parseInt(objPanel.css("left"));
    if (showItems == itemsLength) return;
    // 向左滚动
    if (scrollType == 1) {
        if (_panelLeft == 0) {
            for (var i = 1; i <= scrollItemsNum; i++) {
                $(objPanelItems[itemsLength - i]).prependTo(objPanel);
            }
            objPanel.css({left: -_moveWidth});
            objPanel.not(":animated").animate({left: "+=" + _moveWidth}, {
                duration: "slow", complete: function () {
                    for (var j = scrollItemsNum + 1; j <= itemsLength; j++) {
                        $(objPanelItems[itemsLength - j]).prependTo(objPanel);
                    }
                    objPanel.css({left: -_moveWidth * (dividers - 1)});
                }
            });
        } else {
            objPanel.not(":animated").animate({left: "+=" + _moveWidth}, "slow");
        }
    }
    else {
        // 向右移动
        if (Math.abs(_panelLeft) >= _moveMaxOffset) {
            for (var i = 0; i < scrollItemsNum; i++) {
                $(objPanelItems[i]).appendTo(objPanel);
            }
            objPanel.css({left: -_moveWidth * (dividers - 2)});
            objPanel.not(":animated").animate({left: "-=" + _moveWidth}, {
                duration: "slow", complete: function () {
                    for (var j = scrollItemsNum; j <= itemsLength; j++) {
                        $(objPanelItems[j]).appendTo(objPanel);
                    }
                    objPanel.css({left: 0});
                }
            });
        } else {
            objPanel.not(":animated").animate({left: "-=" + _moveWidth}, "slow");
        }
    }
}