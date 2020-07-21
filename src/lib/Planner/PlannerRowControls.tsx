/** @jsx jsx */
import styled from '@emotion/styled'
import { FC, useState, createRef } from 'react'
import { jsx } from '@emotion/react'
import { IconButton, Dropdown, DropdownOption } from 'lib'
import { FiMoreVertical } from 'react-icons/fi'
import { useOnClickOutside } from 'hooks'

interface PlannerRowControlsProps {
  className?: string
}

const PlannerRowControls: FC<PlannerRowControlsProps> = ({ className }) => {
  const ref = createRef<HTMLDivElement>()
  const [isVisible, setVisibility] = useState(false)
  useOnClickOutside(ref, () => setVisibility(false), true)

  const handleNodeClick = () => {
    setVisibility(!isVisible)
  }

  const handleOptionClick = () => {
    setVisibility(false)
  }

  return (
    <div className={className}>
      <IconButton onMouseDown={handleNodeClick}>
        <FiMoreVertical />
      </IconButton>
      <Dropdown ref={ref} isVisible={isVisible}>
        <DropdownOption onMouseDown={handleOptionClick}>one</DropdownOption>
        <DropdownOption onMouseDown={handleOptionClick}>two</DropdownOption>
        <DropdownOption onMouseDown={handleOptionClick}>three</DropdownOption>
      </Dropdown>
    </div>
  )
}

export default styled(PlannerRowControls)`
  position: relative;
  display: block;
`