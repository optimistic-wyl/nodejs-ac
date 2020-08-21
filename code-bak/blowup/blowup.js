
/**
 * 说明：放大镜 + 放大镜中内容缩放效果
 */
import $ from 'jquery'

function blowupFunc(el) {
  const $element = $(el)
  // If the target element is not an image
  if (!$element.is('img')) {
    console.log(
      '%c Blowup.js Error: ' + '%cTarget element is not an image.',
      'background: #FCEBB6; color: #F07818; font-size: 17px; font-weight: bold;',
      'background: #FCEBB6; color: #F07818; font-size: 17px;'
    )
    return
  }

  // Constants
  var $IMAGE_URL = $element.attr('src')
  // Default attributes
  var defaults = {
    round: true,
    width: 200,
    height: 200,
    background: '#FFF',
    shadow: '0 8px 17px 0 rgba(0, 0, 0, 0.2)',
    border: '6px solid #FFF',
    cursor: true,
    zIndex: 999999,
    scale: 1.8
  }

  // Update defaults with custom attributes
  var $options = $.extend(defaults, {})

  // Modify target image
  $element.on('dragstart', function(e) {
    e.preventDefault()
  })
  $element.css('cursor', $options.cursor ? 'crosshair' : 'none')

  // Create magnification lens element
  var lens = document.createElement('div')
  lens.id = 'BlowupLens'

  // Attack the element to the body
  $('body').append(lens)

  // Updates styles

  $('#BlowupLens').css({
    position: 'absolute',
    visibility: 'hidden',
    'pointer-events': 'none',
    zIndex: $options.zIndex,
    width: $options.width,
    height: $options.height,
    border: $options.border,
    background: $options.background,
    'border-radius': $options.round ? '50%' : 'none',
    'box-shadow': $options.shadow,
    'background-repeat': 'no-repeat'
  })

  // Show magnification lens
  $element.mouseenter(function() {
    $('#BlowupLens').css('visibility', 'visible')
  })

  // Mouse motion on image
  $element.mousemove(function(e) {
    // Lens position coordinates
    var lensX = e.pageX - $options.width / 2
    var lensY = e.pageY - $options.height / 2

    // Relative coordinates of image
    var relX = e.pageX - $(this).offset().left
    var relY = e.pageY - $(this).offset().top
    var width = $element.width()
    var height = $element.height()
    // Zoomed image coordinates
    var zoomX = -Math.floor((relX / width) * (width * $options.scale) - $options.width / 2)
    var zoomY = -Math.floor((relY / height) * (height * $options.scale) - $options.height / 2)

    var backPos = zoomX + 'px ' + zoomY + 'px'
    var backgroundSize = width * $options.scale + 'px ' + height * $options.scale + 'px'

    // Apply styles to lens
    $('#BlowupLens').css({
      left: lensX,
      top: lensY,
      'background-image': 'url(' + $IMAGE_URL + ')',
      'background-size': backgroundSize,
      'background-position': backPos
    })
    var scale = $options.scale
    $element.on('mousewheel DOMMouseScroll', onMouseScroll)

    function onMouseScroll(e) {
      e.preventDefault()
      var wheel = e.originalEvent.wheelDelta || -e.originalEvent.detail
      var delta = Math.max(-1, Math.min(1, wheel))
      if (delta < 0) {
        scale += 0.2
        $options.scale = scale
        doSomething(scale)
      } else {
        scale -= 0.2
        $options.scale = scale
        doSomething(scale)
      }
    }

    function doSomething(scale) {
      var zoomX = -Math.floor((relX / $element.width()) * (width * scale) - $options.width / 2)
      var zoomY = -Math.floor((relY / $element.height()) * (height * scale) - $options.height / 2)

      var backPos = zoomX + 'px ' + zoomY + 'px'
      var backgroundSize = width * scale + 'px ' + height * scale + 'px'

      // Apply styles to lens
      $('#BlowupLens').css({
        'background-size': backgroundSize,
        'background-position': backPos
      })
    }
  })
  // Hide magnification lens
  $element.mouseleave(function() {
    $options.scale = 1.8
    $('#BlowupLens').css('visibility', 'hidden')
  })
}
export default {
  bind: blowupFunc,
  update: blowupFunc
}
