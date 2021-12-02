var dpr, rem, scale;
/**
 * document: html文档
 * document.documentElement: 获取元素<html>
 * HTMLElement: 是一种泛指html元素类型：html，div，p，span等
 */

/**
 * 回顾知新：
 * 320    375   414.....这些尺寸是在设置width=device-width打印出的，
 * 是设备独立像素（密度无关像素）
 * 
 * 物理像素：设备像素
 * 
 * dpr = 设备像素 / 设备独立像素
 * 
 * css像素：设备无关像素
 * 
 * 参考：
 * 使用Flexible实现手淘H5页面的终端适配：https://github.com/amfe/article/issues/17
 * 
 * viewport：
 *  layout viewport（布局视口）: docEl.clientWidth
 *  visual viewport（视觉视口）: window.innerWidth
 *  ideal viewport（理想视口）：screen.width,个人认为就是设备独立像素
 * 
 * 算法：
 * rootfontsize = screenwidth / x
 * rem = px/设计宽度 * x
 */

function setting() {
var docEl = document.documentElement;
var fontEl = document.getElementById('htmlFontsize') || document.createElement('style')
fontEl.setAttribute('id', 'htmlFontsize');
var metaEl = document.querySelector('meta[name="viewport"]');
dpr = Math.floor(window.devicePixelRatio) || 1;
rem = screen.width * dpr / 10;
scale = 1 / dpr;

// 设置viewport，进行缩放，达到高清效果
//alert(docEl.clientWidth)
metaEl.setAttribute('content', 'initial-scale=' + scale + ',maximum-scale=' + scale + ', minimum-scale=' + scale + ',user-scalable=no');
//alert(docEl.clientWidth)
// 设置data-dpr属性，留作的css hack之用
docEl.setAttribute('data-dpr', dpr);

// 动态写入样式
docEl.firstElementChild.appendChild(fontEl);
fontEl.innerHTML = 'html{font-size:' + rem + 'px!important;}';

// 给js调用的，某一dpr下rem和px之间的转换函数
window.rem2px = function(v) {
    v = parseFloat(v);
    return v * rem;
};
window.px2rem = function(v) {
    v = parseFloat(v);
    return v / rem;
};

window.dpr = dpr;
window.rem = rem;
}
setting()
window.onresize = function(){
    setting()
} 