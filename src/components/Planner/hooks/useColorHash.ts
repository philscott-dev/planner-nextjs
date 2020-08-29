import ColorHash from 'color-hash'
import { useRef } from 'react'

const colorHash = new ColorHash({
  saturation: 1,
  lightness: 0.4,
  hash: (str) => {
    let hash = 0
    for (let i = 0; i < str.length; i++) {
      hash += str.charCodeAt(i)
    }
    return hash
  },
})

export default function useColorHash(value?: string) {
  const color = useRef<string>()

  if (value !== undefined) {
    color.current = colorHash.hex(value)
  }

  return color.current
}
