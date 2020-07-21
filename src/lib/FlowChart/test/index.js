var canvas = document.getElementsByTagName('canvas')[0]
canvas.width = 800
canvas.height = 600

var gkhead = new Image()

window.onload = function () {
  var ctx = canvas.getContext('2d')
  trackTransforms(ctx)

  function redraw() {
    console.log('redraw')
    // Clear the entire canvas
    var p1 = ctx.transformedPoint(0, 0)
    var p2 = ctx.transformedPoint(canvas.width, canvas.height)
    ctx.clearRect(p1.x, p1.y, p2.x - p1.x, p2.y - p1.y)

    ctx.save()
    ctx.setTransform(1, 0, 0, 1, 0, 0)
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.restore()

    ctx.drawImage(gkhead, 0, 0)
  }
  redraw()

  var lastX = canvas.width / 2,
    lastY = canvas.height / 2

  var dragStart, dragged

  canvas.addEventListener(
    'mousedown',
    function (evt) {
      console.log('mousedown')
      document.body.style.mozUserSelect = document.body.style.webkitUserSelect = document.body.style.userSelect =
        'none'
      lastX = evt.offsetX || evt.pageX - canvas.offsetLeft
      lastY = evt.offsetY || evt.pageY - canvas.offsetTop
      dragStart = ctx.transformedPoint(lastX, lastY)
      dragged = false
    },
    false,
  )

  canvas.addEventListener(
    'mousemove',
    function (evt) {
      console.log('mousemove')
      lastX = evt.offsetX || evt.pageX - canvas.offsetLeft
      lastY = evt.offsetY || evt.pageY - canvas.offsetTop
      dragged = true
      if (dragStart) {
        var pt = ctx.transformedPoint(lastX, lastY)
        ctx.translate(pt.x - dragStart.x, pt.y - dragStart.y)
        redraw()
      }
    },
    false,
  )

  canvas.addEventListener(
    'mouseup',
    function (evt) {
      console.log('mouseup')
      dragStart = null
      if (!dragged) zoom(evt.shiftKey ? -1 : 1)
    },
    false,
  )

  var scaleFactor = 1.1

  var zoom = function (clicks) {
    console.log('zoom')
    var pt = ctx.transformedPoint(lastX, lastY)
    ctx.translate(pt.x, pt.y)
    var factor = Math.pow(scaleFactor, clicks)
    ctx.scale(factor, factor)
    ctx.translate(-pt.x, -pt.y)
    redraw()
  }

  var handleScroll = function (evt) {
    console.log('handleScroll')
    var delta = evt.wheelDelta
      ? evt.wheelDelta / 40
      : evt.detail
      ? -evt.detail
      : 0
    if (delta) zoom(delta)
    return evt.preventDefault() && false
  }

  canvas.addEventListener('DOMMouseScroll', handleScroll, false)
  canvas.addEventListener('mousewheel', handleScroll, false)
}

gkhead.src = 'http://phrogz.net/tmp/gkhead.jpg'

// Adds ctx.getTransform() - returns an SVGMatrix
// Adds ctx.transformedPoint(x,y) - returns an SVGPoint
function trackTransforms(ctx) {
  console.log('trackTransforms')
  var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
  var xform = svg.createSVGMatrix()
  ctx.getTransform = function () {
    console.log('getTransform')
    return xform
  }

  var savedTransforms = []
  var save = ctx.save
  ctx.save = function () {
    console.log('save')
    savedTransforms.push(xform.translate(0, 0))
    return save.call(ctx)
  }

  var restore = ctx.restore
  ctx.restore = function () {
    console.log('restore')
    xform = savedTransforms.pop()
    return restore.call(ctx)
  }

  var scale = ctx.scale
  ctx.scale = function (sx, sy) {
    console.log('scale')
    xform = xform.scaleNonUniform(sx, sy)
    return scale.call(ctx, sx, sy)
  }

  var rotate = ctx.rotate
  ctx.rotate = function (radians) {
    console.log('rotate')
    xform = xform.rotate((radians * 180) / Math.PI)
    return rotate.call(ctx, radians)
  }

  var translate = ctx.translate
  ctx.translate = function (dx, dy) {
    console.log('translate')
    xform = xform.translate(dx, dy)
    return translate.call(ctx, dx, dy)
  }

  var transform = ctx.transform
  ctx.transform = function (a, b, c, d, e, f) {
    console.log('transform')
    var m2 = svg.createSVGMatrix()
    m2.a = a
    m2.b = b
    m2.c = c
    m2.d = d
    m2.e = e
    m2.f = f
    xform = xform.multiply(m2)
    return transform.call(ctx, a, b, c, d, e, f)
  }

  var setTransform = ctx.setTransform
  ctx.setTransform = function (a, b, c, d, e, f) {
    console.log('setTransform')
    xform.a = a
    xform.b = b
    xform.c = c
    xform.d = d
    xform.e = e
    xform.f = f
    return setTransform.call(ctx, a, b, c, d, e, f)
  }

  var pt = svg.createSVGPoint()
  ctx.transformedPoint = function (x, y) {
    console.log('transformedPoint')
    pt.x = x
    pt.y = y
    return pt.matrixTransform(xform.inverse())
  }
}

// handleScroll
// zoom
// transformedPoint
// translate
// scale
// translate
// redraw
// transformedPoint
// transformedPoint
// save
// setTransform
// restore
