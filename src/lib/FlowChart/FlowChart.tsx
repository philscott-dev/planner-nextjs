/** @jsx jsx */
import { FC, useRef, useState, DragEvent } from 'react'
import { jsx } from '@emotion/react'
import styled from '@emotion/styled'
import Canvas from './Canvas'
import { Node, Point } from './types'
import { getCanvasPoint } from './helpers/helpers'
import useTransformRefs from './hooks/useTransformRefs'
import { NODE_HEIGHT, NODE_WIDTH, colors } from './constants'
import { Text } from 'lib'
import EditPanel from './EditPanel'

interface FlowChartProps {
  className?: string
}
const FlowChart: FC<FlowChartProps> = ({ className }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { ctx, matrix } = useTransformRefs(canvasRef)
  const [nodes, setNodes] = useState<Node[]>([])
  const [dragStartOffset, setDragStartOffset] = useState<Point>({ x: 0, y: 0 })
  const [translateOffset, setTranslateOffset] = useState<Point>({ x: 0, y: 0 })
  const [scale, setScale] = useState<number>(1)
  const [color, setColor] = useState('')
  const [activeId, setActiveId] = useState<number>()

  //get initial mouse offset in dom object
  const handleDragNewNode = (e: DragEvent<HTMLDivElement>) => {
    const elem = e.currentTarget
    const { x, y } = getCanvasPoint(e, elem)
    setDragStartOffset({ x, y })
    setColor(elem.getAttribute('color') || '')
  }

  const handleTranslate = (pt: Point) => {
    setTranslateOffset(pt)
  }

  const handleScale = (factor: number) => {
    setScale(factor)
  }

  const handleDropNewNode = (e: DragEvent) => {
    e.preventDefault()
    const { current: canvas } = canvasRef
    if (canvas) {
      const { x, y } = getCanvasPoint(e, canvas)
      const node: Node = {
        id: nodes.length,
        title: color,
        color,
        rect: {
          x: x - dragStartOffset.x - translateOffset.x,
          y: y - dragStartOffset.y - translateOffset.y,
          width: NODE_WIDTH,
          height: NODE_HEIGHT,
        },
      }
      setNodes([...nodes, node])
    }
  }

  const handleClickNode = (id: number) => {
    setActiveId(id)
  }

  return (
    <div className={className}>
      <Sidebar>
        {colors.map((color) => (
          <Wrapper key={color}>
            <Square draggable onDragStart={handleDragNewNode} color={color}>
              <Text>{color}</Text>
            </Square>
          </Wrapper>
        ))}
      </Sidebar>
      <Container>
        <Canvas
          ref={canvasRef}
          canvas={canvasRef.current}
          ctx={ctx}
          matrix={matrix}
          translateOffset={translateOffset}
          scale={scale}
          nodes={nodes}
          activeId={activeId}
          onSetNodes={setNodes}
          onClickNode={handleClickNode}
          onDrop={handleDropNewNode}
          onTranslate={handleTranslate}
          onScale={handleScale}
        />
      </Container>

      <EditPanel nodes={nodes} activeId={activeId} />
    </div>
  )
}

export default styled(FlowChart)`
  height: 900px;
  display: flex;
`

const Wrapper = styled.div`
  background-color: transparent;
  padding: 16px;
`

const Square = styled.div<{ color: string }>`
  min-width: ${NODE_WIDTH}px;
  min-height: ${NODE_HEIGHT}px;
  border-radius: 12px;
  background-color: ${({ color }) => color};
  box-sizing: border-box;
  padding-top: 8px;
  padding-left: 16px;
`

const Container = styled.div`
  flex: 1;
`

const Sidebar = styled.div`
  min-height: 100px;
`
