/** @jsx jsx */
import { useState, forwardRef, WheelEvent, MouseEvent, DragEvent } from 'react'
import { jsx } from '@emotion/react'
import styled from '@emotion/styled'
import useResize from './hooks/useResize'
import useDrawCallback from './hooks/useDrawCallback'
import { Node, Point } from './types'
import { pointInRect } from './utils/math'
import { getCanvasPoint } from './helpers/helpers'

interface CanvasProps {
  className?: string
  canvas: HTMLCanvasElement | null
  ctx: CanvasRenderingContext2D | null
  matrix: DOMMatrix
  nodes: Node[]
  activeId?: number
  translateOffset: Point
  scale: number
  onSetNodes: (nodes: Node[]) => void
  onDrop: (e: DragEvent) => void
  onClickNode: (id: number) => void
  onTranslate: (point: Point) => void
  onScale: (factor: number) => void
}
const Canvas = forwardRef<HTMLCanvasElement, CanvasProps>(
  (
    {
      className,
      canvas,
      ctx,
      matrix,
      nodes,
      activeId,
      translateOffset,
      scale,
      onSetNodes,
      onDrop,
      onClickNode,
      onTranslate,
      onScale,
    },
    canvasRef,
  ) => {
    const [isDragging, setDragging] = useState(false)
    const [dragIndex, setDragIndex] = useState<number | undefined>()
    const [clickOffset, setClickOffset] = useState<Point>() // probably needs renaming
    const [origin, setOrigin] = useState<Point>({ x: 0, y: 0 }) // for scale calculations

    const draw = useDrawCallback(
      canvas,
      ctx,
      origin,
      translateOffset,
      scale,
      nodes,
      isDragging,
      activeId,
    )
    useResize(canvas, draw)

    const onMouseDown = (
      e: MouseEvent<HTMLCanvasElement, globalThis.MouseEvent>,
    ) => {
      if (canvas) {
        const { x, y } = getCanvasPoint(e, canvas, translateOffset)
        console.log(x + translateOffset.x, y + translateOffset.y)
        const node = nodes.find((n) =>
          pointInRect(x + translateOffset.x, y + translateOffset.y, n.rect),
        )
        if (node) {
          document.body.style.webkitUserSelect = 'none'
          document.body.style.userSelect = 'none'
          setDragging(true)
          setDragIndex(node.id)
          setClickOffset({
            x: x - node.rect.x + translateOffset.x,
            y: y - node.rect.y + translateOffset.y,
          })
          onClickNode(node.id)
        } else {
          const { x, y } = getCanvasPoint(e, canvas)
          setDragging(true)
          setClickOffset({ x, y })
        }
      }
    }

    const onMouseMove = (
      e: MouseEvent<HTMLCanvasElement, globalThis.MouseEvent>,
    ) => {
      if (canvas && ctx) {
        const { x, y } = getCanvasPoint(e, canvas)
        if (isDragging && dragIndex !== undefined && clickOffset) {
          const node = nodes[dragIndex]
          const { width, height } = node.rect
          const dragX = x - clickOffset.x
          const dragY = y - clickOffset.y
          const dragNode = {
            ...node,
            rect: { ...node.rect, x: dragX, y: dragY, width, height },
          }
          onSetNodes([
            ...nodes.slice(0, dragIndex),
            dragNode,
            ...nodes.slice(dragIndex + 1),
          ])
        } else if (isDragging && clickOffset) {
          const dragX = x - clickOffset.x / scale
          const dragY = y - clickOffset.y / scale

          // do the new translate
          ctx.translate(dragX, dragY)

          //set the position
          setClickOffset({ x: x * scale, y: y * scale })

          //accumulate the translate
          onTranslate({
            x: translateOffset.x + dragX,
            y: translateOffset.y + dragY,
          })
        }
      }
    }

    const onMouseUp = (
      e: MouseEvent<HTMLCanvasElement, globalThis.MouseEvent>,
    ) => {
      document.body.style.webkitUserSelect = 'inherit'
      document.body.style.userSelect = 'inherit'
      setDragging(false)
      setDragIndex(undefined)
      setClickOffset(undefined)
    }

    const onWheel = (e: WheelEvent<HTMLCanvasElement>) => {
      if (ctx && canvas) {
        const intensity = 0.001
        // dont pass in translate offset, as this zoom
        // is based off of canvas position only
        const { x, y } = getCanvasPoint(e, canvas)
        const zoom = Math.exp(e.deltaY * intensity)
        ctx.translate(origin.x, origin.y)
        const factor = scale * zoom
        const positionX = origin.x - (x / factor - x / scale)
        const positionY = origin.y - (y / factor - y / scale)
        ctx.scale(zoom, zoom)
        ctx.translate(-positionX, -positionY)

        //update state
        onTranslate({
          x: origin.x + translateOffset.x + -positionX,
          y: origin.y + translateOffset.y + -positionY,
        })
        //set scale and fac
        onScale(factor)
        setOrigin({ x: positionX, y: positionY })
      }
    }

    return (
      <StyledCanvas
        ref={canvasRef}
        className={className}
        onMouseDown={onMouseDown}
        onMouseUp={onMouseUp}
        onMouseMove={onMouseMove}
        onWheel={onWheel}
        onDrop={onDrop}
        onDragOver={(e) => e.preventDefault()}
      ></StyledCanvas>
    )
  },
)

const StyledCanvas = styled.canvas`
  background: ${({ theme }) => theme.color.blue[500]};
`

export default Canvas
