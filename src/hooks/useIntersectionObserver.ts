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
  observeOnce?: boolean
  shouldObserve?: boolean
  unobserveTimeout?: number
}

export default function useIntersectionObserver({
  element,
  root,
  offset = 0,
  observeOnce = false,
  shouldObserve = true,
  unobserveTimeout = 0,
}: IntersectionObserverConfig) {
  const [bounds, setBounds] = useState<Bounds>({
    isRight: false,
    isLeft: false,
    isBottom: false,
    isTop: false,
  })
  useEffect(() => {
    //configure observer
    const observer = new IntersectionObserver(handleObserve, {
      root, // null === watch viewport
      rootMargin: '0px',
      threshold: 0.5,
    })

    // turn on the observer
    if (element && shouldObserve) {
      observer.observe(element)
    }

    // clear if should unobserve
    let timeout
    if (!shouldObserve) {
      timeout = setTimeout(() => {
        setBounds({
          isRight: false,
          isLeft: false,
          isBottom: false,
          isTop: false,
        })
      }, unobserveTimeout)
    }
    if (timeout && shouldObserve) {
      clearTimeout(timeout)
    }

    // observer handler
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
      // immediately unobserve, if specified
      if (element && observeOnce) {
        observer.unobserve(element)
      }
    }

    // clear on unmount
    return () => {
      if (element) {
        observer.unobserve(element)
      }
    }
  }, [element, root, offset, shouldObserve, observeOnce, unobserveTimeout])
  return bounds
}
