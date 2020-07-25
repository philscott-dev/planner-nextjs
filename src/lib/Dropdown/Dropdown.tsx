/** @jsx jsx */
import styled from '@emotion/styled'
import { FC, useState, createRef, ReactNode } from 'react'
import { jsx } from '@emotion/react'
import { useOnClickOutside } from 'hooks'
import DropdownMenu from './DropdownMenu'

interface DropdownProps {
  className?: string
  renderNode: (onClick: () => void) => ReactNode
}
const Dropdown: FC<DropdownProps> = ({ className, children, renderNode }) => {
  const ref = createRef<HTMLDivElement>()
  const [isVisible, setVisibility] = useState(false)
  useOnClickOutside(ref, () => setVisibility(false), isVisible)

  const handleNodeClick = () => {
    setVisibility(!isVisible)
  }

  const handleMenuClick = () => {
    setVisibility(false)
  }

  return (
    <div ref={ref} className={className}>
      {renderNode(handleNodeClick)}
      <DropdownMenu onMouseDown={handleMenuClick} isVisible={isVisible}>
        {children}
      </DropdownMenu>
    </div>
  )
}

export default styled(Dropdown)`
  position: relative;
  display: block;
`
