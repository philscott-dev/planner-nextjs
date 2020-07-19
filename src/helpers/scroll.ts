import { useEffect, useState } from 'react'

export default function useIntersectionObserver(trackingId: string) {
  const [hasIntersected, setHasIntersected] = useState<boolean>(false)
  useEffect(() => {
    function observe(entries: IntersectionObserverEntry[]) {
      const entry = entries[0]
      const rect = entry.boundingClientRect as DOMRectReadOnly
      setHasIntersected(rect.y < 0)
    }

    const config = {
      root: null,
      rootMargin: '0px',
      threshold: 0.5,
    }

    const observer = new IntersectionObserver(observe, config)
    const element = document.querySelector(trackingId)
    if (element) {
      observer.observe(element)
    }

    return () => {
      if (element) {
        observer.unobserve(element)
      }
    }
  })
  return hasIntersected
}
