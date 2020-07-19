import { useEffect, useRef, useState, RefObject } from 'react'
// export default function useCtx(canvasRef: RefObject<HTMLCanvasElement>) {
//   const [ctx, setCtx] = useState<CanvasRenderingContext2D | null>()
//   const [matrix] = useState(new DOMMatrix())
//   useEffect(() => {
//     const canvas = canvasRef.current
//     if (canvas) {
//       setCtx(canvas.getContext('2d'))
//     }
//   }, [canvasRef])
//   return [ctx, matrix]
// }

export default function useTransformRefs(
  canvasRef: RefObject<HTMLCanvasElement>,
): { ctx: CanvasRenderingContext2D | null; matrix: DOMMatrix } {
  const [ctx, setCtx] = useState<CanvasRenderingContext2D | null>(null)
  const matrixRef = useRef(new DOMMatrix())
  useEffect(() => {
    if (canvasRef?.current) {
      setCtx(canvasRef.current.getContext('2d'))
    }
  }, [canvasRef])
  return { ctx, matrix: matrixRef.current }
}
