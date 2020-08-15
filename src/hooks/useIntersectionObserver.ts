import { useEffect, useState } from 'react'

export default function useIntersectionObserver(
  element?: Element | null,
  root?: Element | null,
  offset?: number,
) {
  const [hasIntersected, setHasIntersected] = useState<boolean>(false)
  useEffect(() => {
    function observe(entries: IntersectionObserverEntry[]) {
      const entry = entries[0]
      const rect = entry.boundingClientRect as DOMRectReadOnly
      console.log(entry.intersectionRatio)
      setHasIntersected(rect.y < (offset || 0))
    }

    const observer = new IntersectionObserver(observe, {
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
  return false
}
