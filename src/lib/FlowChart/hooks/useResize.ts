import { useEffect } from 'react'
export default function useResize(
  canvas: HTMLCanvasElement | null,
  draw: () => void,
) {
  useEffect(() => {
    function resize() {
      if (canvas) {
        const parent = canvas.parentElement
        canvas.width = parent?.clientWidth ?? 0
        canvas.height = parent?.clientHeight ?? 0
        draw()
      }
    }
    resize()
    window.addEventListener('resize', resize)
    return () => window.removeEventListener('resize', resize)
  }, [canvas, draw])
}
