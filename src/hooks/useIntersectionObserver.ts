import { useEffect, useState } from 'react'

export interface Bounds {
  isTop: boolean
  isLeft: boolean
  isBottom: boolean
  isRight: boolean
}

export interface IntersectionObserverConfig {
  element: Element | null
  root?: Element | null
  offset?: number
}

export default function useIntersectionObserver({
  element,
  root,
  offset = 0,
}: IntersectionObserverConfig) {
  const [bounds, setBounds] = useState<Bounds>({
    isRight: false,
    isLeft: false,
    isBottom: false,
    isTop: false,
  })
  useEffect(() => {
    function handleObserve(entries: IntersectionObserverEntry[]) {
      const entry = entries[0]
      const rect = entry.boundingClientRect
      const root = entry.rootBounds
      if (root) {
        setBounds({
          isTop: rect.top < 0,
          isLeft: rect.left < 0,
          isBottom: rect.bottom > root.bottom,
          isRight: rect.right > root.right,
        })
      }
    }

    const observer = new IntersectionObserver(handleObserve, {
      root, // null === watch viewport
      rootMargin: '0px',
      threshold: 0.5,
    })

    if (element) {
      observer.observe(element)
    }

    return () => {
      if (element) {
        observer.unobserve(element)
      }
    }
  }, [element, root, offset])
  return bounds
}
