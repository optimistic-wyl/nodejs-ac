
// 设置摘录模块容器的滚动条位置
const markListWrap = $('.mark-left-v3-wrap')
const wrapSL = markListWrap.scrollLeft()
const item = $(`.mark-list-item-container:eq(${this.injuryGroupVOIndex})`)
const il = item.width() * this.injuryGroupVOIndex
const ir = il + item.width()
if (il < wrapSL) {
  markListWrap.animate({
    scrollLeft: markListWrap.scrollLeft() + item.position().left - 48
  }, 200)
} else if (ir > wrapSL + markListWrap.width()) {
  markListWrap.animate({
    scrollLeft: markListWrap.scrollLeft() + item.position().left - markListWrap.outerWidth(true) / 2 - 48
  }, 200)
}