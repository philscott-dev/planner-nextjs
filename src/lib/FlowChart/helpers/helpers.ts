import { MouseEvent, DragEvent } from 'react'
import { Point } from '../types'

export const getCanvasPoint = (
  event:
    | MouseEvent<HTMLCanvasElement, globalThis.MouseEvent>
    | globalThis.MouseEvent
    | DragEvent,
  elem: HTMLElement,
  translate?: Point,
  scale?: number,
) => {
  const boundingRect = elem.getBoundingClientRect()
  //there might be some issue with subtracting the translate???????
  const x =
    event.clientX - boundingRect.left - (translate?.x ?? 0) / (scale || 1)
  const y =
    event.clientY - boundingRect.top - (translate?.y ?? 0) / (scale || 1)
  return { x, y }
}

export function translateWithScale() {}
