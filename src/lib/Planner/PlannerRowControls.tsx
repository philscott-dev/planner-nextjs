/** @jsx jsx */
import { FC, useState, MouseEvent } from 'react'
import { jsx, css } from '@emotion/react'
import { IconButton, Dropdown, DropdownOption } from 'lib'
import { FiMoreVertical, FiEdit } from 'react-icons/fi'
import { FaAngleDoubleDown, FaAngleDoubleUp, FaTrashAlt } from 'react-icons/fa'
import { RenameDialog, DeleteDialog } from 'components'

interface PlannerRowControlsProps {
  className?: string
  label: string
  onRenameRow: (value: string) => void
  onDeleteRow: () => void
  onRowUp: () => void
  onRowDown: () => void
}

const PlannerRowControls: FC<PlannerRowControlsProps> = ({
  className,
  label,
  onDeleteRow,
  onRenameRow,
  onRowDown,
  onRowUp,
}) => {
  const [isRenameVisible, setRenameVisibility] = useState(false)
  const [isDeleteVisible, setDeleteVisibility] = useState(false)

  const onControlsClick = (e: MouseEvent<HTMLDivElement>) => {
    //e.preventDefault()
    e.stopPropagation()
  }

  const handleRenameClick = () => {
    setRenameVisibility(true)
  }
  const handleRowUpClick = () => {
    onRowUp()
  }
  const handleRowDownClick = () => {
    onRowDown()
  }
  const handleDeleteRowClick = () => {
    setDeleteVisibility(true)
  }

  const handleRenameCancel = () => {
    setRenameVisibility(false)
  }

  const handleRenameConfirm = (value: string) => {
    onRenameRow(value)
  }

  const handleDeleteCancel = () => {
    setDeleteVisibility(false)
  }
  const handleDeleteConfirm = () => {
    onDeleteRow()
  }

  return (
    <div className={className} onMouseDown={onControlsClick}>
      <Dropdown
        renderNode={(onClick) => (
          <IconButton onMouseDown={onClick}>
            <FiMoreVertical />
          </IconButton>
        )}
      >
        <DropdownOption onMouseDown={handleRenameClick}>
          <FiEdit css={iconCss} /> Rename
        </DropdownOption>
        <DropdownOption onMouseDown={handleRowUpClick}>
          <FaAngleDoubleUp css={iconCss} /> Row Up
        </DropdownOption>
        <DropdownOption onMouseDown={handleRowDownClick}>
          <FaAngleDoubleDown css={iconCss} /> Row Down
        </DropdownOption>
        <DropdownOption isDelete={true} onMouseDown={handleDeleteRowClick}>
          <FaTrashAlt css={iconCss} /> Delete Row
        </DropdownOption>
      </Dropdown>
      <DeleteDialog
        isVisible={isDeleteVisible}
        label={label}
        onCancel={handleDeleteCancel}
        onClickOutside={handleDeleteCancel}
        onConfirm={handleDeleteConfirm}
      />
      <RenameDialog
        isVisible={isRenameVisible}
        label={label}
        onCancel={handleRenameCancel}
        onClickOutside={handleRenameCancel}
        onConfirm={handleRenameConfirm}
      />
    </div>
  )
}

export default PlannerRowControls

const iconCss = css`
  margin-right: 8px;
`
