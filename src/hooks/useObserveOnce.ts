import { useEffect, useState } from 'react'
import useIntersectionObserver, {
  IntersectionObserverConfig,
  Bounds,
} from './useIntersectionObserver'

interface WouldIntersectConfig extends IntersectionObserverConfig {
  shouldObserve?: boolean
  unobserveTimeout?: number
}

export default function useObserveOnce({
  element,
  root,
  shouldObserve = true,
  offset = 0,
  unobserveTimeout = 0,
}: WouldIntersectConfig) {
  const initialState = {
    isRight: false,
    isLeft: false,
    isBottom: false,
    isTop: false,
  }
  const [bounds, setBounds] = useState<Bounds>(initialState)

  useEffect(() => {
    const observer = new IntersectionObserver(handleObserve, {
      root, // null === watch viewport
      rootMargin: '0px',
      threshold: 0.5,
    })

    if (element && shouldObserve) {
      observer.observe(element)
    }

    if (!shouldObserve) {
      setTimeout(() => {
        setBounds(initialState)
      }, unobserveTimeout)
    }

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

      if (element) {
        observer.unobserve(element)
      }
    }

    return () => {
      if (element) {
        observer.unobserve(element)
      }
    }
  }, [element, root, offset, shouldObserve])

  return bounds
}
