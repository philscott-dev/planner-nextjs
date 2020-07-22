/** @jsx jsx */
import { FC } from 'react'
import { jsx, css } from '@emotion/react'
import { IconButton, Dropdown, DropdownOption } from 'lib'
import { FiMoreVertical, FiEdit } from 'react-icons/fi'
import { FaAngleDoubleDown, FaAngleDoubleUp, FaTrashAlt } from 'react-icons/fa'

interface PlannerRowControlsProps {
  className?: string
}

const PlannerRowControls: FC<PlannerRowControlsProps> = ({ className }) => {
  const handleOptionClick = () => {
    console.log('test')
  }

  return (
    <div className={className}>
      <Dropdown
        renderNode={(onClick) => (
          <IconButton onMouseDown={onClick}>
            <FiMoreVertical />
          </IconButton>
        )}
      >
        <DropdownOption onMouseDown={handleOptionClick}>
          <FiEdit css={iconCss} /> Rename
        </DropdownOption>
        <DropdownOption onMouseDown={handleOptionClick}>
          <FaAngleDoubleUp css={iconCss} /> Row Up
        </DropdownOption>
        <DropdownOption onMouseDown={handleOptionClick}>
          <FaAngleDoubleDown css={iconCss} /> Row Down
        </DropdownOption>
        <DropdownOption isDelete={true} onMouseDown={handleOptionClick}>
          <FaTrashAlt css={iconCss} /> Delete Row
        </DropdownOption>
      </Dropdown>
    </div>
  )
}

export default PlannerRowControls

const iconCss = css`
  margin-right: 8px;
`
