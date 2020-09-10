import { useEffect, useState } from 'react'

interface ViewportBounds {
  isTop: boolean
  isLeft: boolean
  isBottom: boolean
  isRight: boolean
}

export default function useViewportBounds(elem: Element | null) {
  const [viewportBounds, setViewportBounds] = useState<ViewportBounds>({
    isRight: false,
    isLeft: false,
    isBottom: false,
    isTop: false,
  })
  useEffect(() => {
    function getViewportBounds() {
      const rect = elem?.getBoundingClientRect()
      if (!rect || !window || !document) {
        return
      }

      console.log(window.innerWidth, document.documentElement.clientWidth)

      setViewportBounds({
        isTop: rect.top < 0,
        isLeft: rect.left < 0,
        isBottom:
          rect.bottom >
          (window.outerHeight || document.documentElement.clientHeight),
        isRight:
          rect.right >
          (window.innerWidth || document.documentElement.clientWidth),
      })
    }

    getViewportBounds()
    window.addEventListener('resize', getViewportBounds, false)
    return () => window.removeEventListener('resize', getViewportBounds, false)
  }, [elem])
  return viewportBounds
}
