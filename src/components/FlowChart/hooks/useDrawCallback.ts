import { useCallback, useEffect } from 'react'
import { Node, Point } from '../types'
import { drawRoundRect, drawText, drawPathAngle, drawGrid } from '../utils/draw'

export default function useDraw(
  canvas: HTMLCanvasElement | null,
  ctx: CanvasRenderingContext2D | null | undefined,
  origin: Point,
  translateOffset: Point,
  scale: number,
  nodes: Node[],
  isDragging: boolean,
  activeId?: number,
) {
  const draw = useCallback(() => {
    if (canvas && ctx) {
      ctx.save()
      ctx.setTransform(1, 0, 0, 1, 0, 0)
      ctx.clearRect(0, 0, canvas.width / scale, canvas.height / scale)
      ctx.restore()

      ctx.scale(scale, scale)

      //draw grid
      drawGrid(
        ctx,
        canvas.width / scale, //divide by scale to grow the grid
        canvas.height / scale, //divide by scale to grow the grid
        40,
        translateOffset,
        '#0253B1',
      )

      //draw nodes
      nodes.forEach((node, index) => {
        const rect = {
          x: node.rect.x + translateOffset.x,
          y: node.rect.y + translateOffset.y,
          width: node.rect.width,
          height: node.rect.height,
        }
        // draw each rect
        drawRoundRect(ctx, rect, 12, node.color, true, activeId === node.id)
        //draw paths for nodes
        const r = nodes[index + 1]?.rect
        if (nodes.length && r) {
          const nextRect = {
            x: r.x + translateOffset.x,
            y: r.y + translateOffset.y,
            width: r.width,
            height: r.height,
          }
          drawPathAngle(ctx, rect, nextRect)
        }

        // draw text in nodes
        const TEXT_OFFSET_Y = 24
        const TEXT_OFFSET_X = 16
        drawText(
          ctx,
          node.title,
          node.rect.x + TEXT_OFFSET_X + translateOffset.x,
          node.rect.y + TEXT_OFFSET_Y + translateOffset.y,
          {
            color: '#ffffff',
            face: 'Poppins-Regular',
          },
        )
      })
    }
  }, [canvas, ctx, scale, translateOffset, isDragging, nodes, activeId])
  useEffect(draw)
  return draw
}
