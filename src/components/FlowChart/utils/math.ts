import { Circle, Point, Rect } from '../types'

export const norm = (value: number, min: number, max: number) => {
  return (value - min) / (max - min)
}

export const lerp = (norm: number, min: number, max: number) => {
  return (max - min) * norm + min
}

export const map = (
  value: number,
  sourceMin: number,
  sourceMax: number,
  destMin: number,
  destMax: number,
) => {
  return lerp(norm(value, sourceMin, sourceMax), destMin, destMax)
}

// return min/max if value exceeds min/max
export const clamp = (value: number, min: number, max: number) => {
  return Math.min(Math.max(value, Math.min(min, max)), Math.max(min, max))
}

export const distance = (p0: Point, p1: Point) => {
  var dx = p1.x - p0.x,
    dy = p1.y - p0.y
  return Math.sqrt(dx * dx + dy * dy)
}

export const distanceXY = (x0: number, y0: number, x1: number, y1: number) => {
  var dx = x1 - x0,
    dy = y1 - y0
  return Math.sqrt(dx * dx + dy * dy)
}

export const circleCollision = (c0: Circle, c1: Circle): boolean => {
  return distance(c0, c1) <= c0.radius + c1.radius
}

export const circlePointCollision = (
  x: number,
  y: number,
  circle: Circle,
): boolean => {
  return distanceXY(x, y, circle.x, circle.y) < circle.radius
}

export const pointInRect = (x: number, y: number, rect: Rect): boolean => {
  return (
    inRange(x, rect.x, rect.x + rect.width) &&
    inRange(y, rect.y, rect.y + rect.height)
  )
}

export const inRange = (value: number, min: number, max: number): boolean => {
  return value >= Math.min(min, max) && value <= Math.max(min, max)
}

export const rangeIntersect = (
  min0: number,
  max0: number,
  min1: number,
  max1: number,
) => {
  return (
    Math.max(min0, max0) >= Math.min(min1, max1) &&
    Math.min(min0, max0) <= Math.max(min1, max1)
  )
}

export const rectIntersect = (r0: Rect, r1: Rect) => {
  return (
    rangeIntersect(r0.x, r0.x + r0.width, r1.x, r1.x + r1.width) &&
    rangeIntersect(r0.y, r0.y + r0.height, r1.y, r1.y + r1.height)
  )
}

export const degreesToRads = (degrees: number) => {
  return (degrees / 180) * Math.PI
}

export const radsToDegrees = (radians: number) => {
  return (radians * 180) / Math.PI
}

export const randomRange = (min: number, max: number) => {
  return min + Math.random() * (max - min)
}

export const randomInt = (min: number, max: number) => {
  return Math.floor(min + Math.random() * (max - min + 1))
}

export const roundToPlaces = (value: number, places: number) => {
  var mult = Math.pow(10, places)
  return Math.round(value * mult) / mult
}

export const roundNearest = (value: number, nearest: number) => {
  return Math.round(value / nearest) * nearest
}

export const quadraticBezier = (
  p0: Point,
  p1: Point,
  p2: Point,
  t: number,
  pFinal: Point,
) => {
  pFinal = pFinal || {}
  pFinal.x = Math.pow(1 - t, 2) * p0.x + (1 - t) * 2 * t * p1.x + t * t * p2.x
  pFinal.y = Math.pow(1 - t, 2) * p0.y + (1 - t) * 2 * t * p1.y + t * t * p2.y
  return pFinal
}

export const cubicBezier = (
  p0: Point,
  p1: Point,
  p2: Point,
  p3: Point,
  t: number,
  pFinal: Point,
) => {
  pFinal = pFinal || {}
  pFinal.x =
    Math.pow(1 - t, 3) * p0.x +
    Math.pow(1 - t, 2) * 3 * t * p1.x +
    (1 - t) * 3 * t * t * p2.x +
    t * t * t * p3.x
  pFinal.y =
    Math.pow(1 - t, 3) * p0.y +
    Math.pow(1 - t, 2) * 3 * t * p1.y +
    (1 - t) * 3 * t * t * p2.y +
    t * t * t * p3.y
  return pFinal
}
