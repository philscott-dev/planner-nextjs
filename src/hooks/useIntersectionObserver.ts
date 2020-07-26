import { useEffect, useState } from 'react'

export default function useIntersectionObserver(
  element?: Element | null,
  root?: Element | null,
) {
  const [hasIntersected, setHasIntersected] = useState<boolean>(false)
  useEffect(() => {
    function observe(entries: IntersectionObserverEntry[]) {
      const entry = entries[0]
      console.log(entries)
      const rect = entry.boundingClientRect as DOMRectReadOnly
      setHasIntersected(rect.y < 0)
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
  }, [element, root])
  return hasIntersected
}
