import { Point, Rect } from '../types'
import { distance } from './math'

interface Radius {
  tl: number
  tr: number
  br: number
  bl: number
}

export function drawRoundRect(
  ctx: CanvasRenderingContext2D,
  { x, y, width, height }: Rect,
  borderRadius: Radius | number,
  fillStyle: string,
  fill: boolean = true,
  stroke: boolean = false,
) {
  if (typeof stroke === 'undefined') {
    stroke = true
  }
  if (typeof borderRadius === 'undefined') {
    borderRadius = 3
  }
  if (typeof borderRadius === 'number') {
    borderRadius = {
      tl: borderRadius,
      tr: borderRadius,
      br: borderRadius,
      bl: borderRadius,
    }
  }
  // else {
  //   let defaultRadius = { tl: 0, tr: 0, br: 0, bl: 0 }
  //   for (let side in defaultRadius) {
  //     borderRadius[side] = borderRadius[side] || defaultRadius[side]
  //   }
  // }
  ctx.beginPath()

  ctx.shadowColor = '#00000040'
  ctx.shadowBlur = 30
  ctx.shadowOffsetX = 16
  ctx.shadowOffsetY = 16
  ctx.fillStyle = fillStyle

  ctx.moveTo(x + borderRadius.tl, y)
  ctx.lineTo(x + width - borderRadius.tr, y)
  ctx.quadraticCurveTo(x + width, y, x + width, y + borderRadius.tr)
  ctx.lineTo(x + width, y + height - borderRadius.br)
  ctx.quadraticCurveTo(
    x + width,
    y + height,
    x + width - borderRadius.br,
    y + height,
  )
  ctx.lineTo(x + borderRadius.bl, y + height)
  ctx.quadraticCurveTo(x, y + height, x, y + height - borderRadius.bl)
  ctx.lineTo(x, y + borderRadius.tl)
  ctx.quadraticCurveTo(x, y, x + borderRadius.tl, y)
  if (fill) {
    ctx.fill()
  }
  if (stroke) {
    ctx.lineWidth = 5
    ctx.strokeStyle = '#028FFF'

    ctx.closePath()
    ctx.stroke()
  }
}

interface TextOptions {
  size?: number
  face?: string
  color?: string
  align?: 'left' | 'right' | 'center'
}
export function drawText(
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  { size, face, color, align }: TextOptions,
) {
  ctx.font = `${size || 16}px ${face || 'Arial'}`
  if (align) ctx.textAlign = align
  if (color) ctx.fillStyle = color
  ctx.fillText(text, x, y)
}

export function drawPath(
  ctx: CanvasRenderingContext2D,
  rect: Rect,
  nextRect?: Rect,
) {
  if (nextRect) {
    ctx.beginPath()
    ctx.moveTo(rect.x + rect.width / 2, rect.y + rect.height / 2)
    ctx.lineTo(
      nextRect.x + nextRect.width / 2,
      nextRect.y + nextRect.height / 2,
    )
    ctx.lineWidth = 2
    ctx.strokeStyle = '#ffffff'
    ctx.closePath()
    ctx.stroke()
  }
}

export function drawPathCurve(
  ctx: CanvasRenderingContext2D,
  rect: Rect,
  nextRect?: Rect,
) {
  if (nextRect) {
    const x1 = rect.x + rect.width / 2
    const y1 = rect.y + rect.height / 2
    const x2 = nextRect.x + nextRect.width / 2
    const y2 = nextRect.y + nextRect.height / 2

    ctx.beginPath()
    ctx.moveTo(x1, y1)

    // Step 1: Calculate the difference between the start and end point
    const diffX = x2 - x1
    const diffY = y2 - y1

    // Step 2: Find angle between the two points
    const angle = Math.atan2(diffY, diffX)

    // Step 3: find center of line
    const mx = x1 + diffX * 0.5
    const my = y1 + diffY * 0.5

    // Step 4: produce control point
    const radius = 150
    const cx = mx + radius * Math.sin(angle)
    const cy = my - radius * Math.cos(angle)

    ctx.quadraticCurveTo(cx, cy, x2, y2)
    ctx.lineWidth = 2
    ctx.strokeStyle = '#ffffff'
    ctx.closePath()
    ctx.stroke()
  }
}

export function drawPathAngle(
  ctx: CanvasRenderingContext2D,
  rect: Rect,
  nextRect?: Rect,
) {
  if (nextRect) {
    const wr1 = rect.width / 2
    const hr1 = rect.height / 2
    const x1 = rect.x + wr1
    const y1 = rect.y + hr1

    const wr2 = nextRect.width / 2
    const hr2 = nextRect.height / 2
    const x2 = nextRect.x + wr2
    const y2 = nextRect.y + hr2

    let start = { x: 0, y: 0 }
    let end = { x: 0, y: 0 }
    let angle = { x: 0, y: 0 }
    //x2, y1 over, then down
    //x1, y2 down, then over

    const isUnder =
      distance({ x: x1, y: y1 }, { x: x1, y: y2 }) >
      distance({ x: x1, y: y1 }, { x: x2, y: y1 })
    const isLeft = x1 > x2

    ctx.beginPath()

    if (isUnder) {
      //set start point
      start.x = x1
      start.y = y1 + hr1

      end.x = x2
      end.y = y2 - hr2
    } else if (isLeft) {
      //set start point
      start.x = rect.x
      start.y = y1

      end.x = x2
      end.y = y2 - hr2
    } else {
      //set start point
      start.x = rect.x + rect.width
      start.y = y1

      end.x = x2
      end.y = y2 - hr2
    }

    ctx.moveTo(start.x, start.y)
    ctx.lineTo(end.x, end.y)

    ctx.lineWidth = 2
    ctx.strokeStyle = '#ffffff'
    ctx.stroke()
    ctx.closePath()

    const RECT_SIZE = 7
    ctx.rect(
      start.x - RECT_SIZE / 2,
      start.y - RECT_SIZE / 2,
      RECT_SIZE,
      RECT_SIZE,
    )
    ctx.fillStyle = '#ffffff'
    ctx.fill()
    drawArrow(ctx, end, 'down', 10)
  }
}

// TODO: adjust grid for scale, at step
export function drawGrid(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  step: number,
  translateOffset: Point,
  color: string,
) {
  ctx.beginPath()
  const offsetX = translateOffset.x % step
  const offsetY = translateOffset.y % step

  //vertical lines
  for (let x = 0; x <= width + step; x += step) {
    ctx.moveTo(x + offsetX, -Math.abs(offsetY))
    ctx.lineTo(x + offsetX, height)
  }
  ctx.strokeStyle = color
  ctx.lineWidth = 1
  ctx.stroke()
  ctx.beginPath()

  //horizontal lines
  for (let y = 0; y <= height + step; y += step) {
    ctx.moveTo(0, y + offsetY)
    ctx.lineTo(width, y + offsetY)
  }
  ctx.strokeStyle = color
  ctx.lineWidth = 1
  ctx.closePath()
  ctx.stroke()
}

export function drawArrow(
  ctx: CanvasRenderingContext2D,
  { x, y }: Point,
  direction: 'left' | 'right' | 'down' | 'up',
  size: number = 10,
) {
  ctx.beginPath()
  ctx.moveTo(x, y)
  const offset = size / 2

  if (direction === 'right') {
    ctx.lineTo(x - offset, y - offset)
    ctx.lineTo(x - offset, y + offset)
  }
  if (direction === 'left') {
    ctx.lineTo(x + offset, y - offset)
    ctx.lineTo(x + offset, y + offset)
  }
  if (direction === 'down') {
    ctx.lineTo(x + offset, y - offset)
    ctx.lineTo(x - offset, y - offset)
  }
  if (direction === 'up') {
    ctx.lineTo(x + offset, y + offset)
    ctx.lineTo(x - offset, y + offset)
  }

  ctx.closePath()
  ctx.fillStyle = '#ffffff'
  ctx.fill()
}
