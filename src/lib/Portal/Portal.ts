import { FC, useEffect } from 'react'
import { createPortal } from 'react-dom'

interface PortalProps {
  mountId: string
}

let el: HTMLDivElement

const Portal: FC<PortalProps> = ({ children, mountId }) => {
  useEffect(() => {
    el = document?.createElement('div')
  }, [])

  useEffect(() => {
    const portalRoot = document.getElementById(mountId)
    portalRoot?.appendChild(el)
    return () => {
      portalRoot?.removeChild(el)
    }
  })

  return el ? createPortal(children, el) : null
}

export default Portal
