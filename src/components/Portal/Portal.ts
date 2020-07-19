import { FC, useEffect } from 'react'
import { createPortal } from 'react-dom'

interface PortalProps {
  mountId: string
}

const Portal: FC<PortalProps> = ({ children, mountId }) => {
  const el = document.createElement('div')

  useEffect(() => {
    const portalRoot = document.getElementById(mountId)
    portalRoot!.appendChild(el)
    return () => {
      portalRoot!.removeChild(el)
    }
  })

  return createPortal(children, el)
}

export default Portal
