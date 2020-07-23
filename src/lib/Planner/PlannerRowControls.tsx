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
  id: string | number
  index: number
  rowCount: number
  onRowRename: (value: string, rowId: string | number, index: number) => void
  onRowDelete: (rowId: string | number, index: number) => void
  onRowUp: (rowId: string | number, index: number) => void
  onRowDown: (rowId: string | number, index: number) => void
}

const PlannerRowControls: FC<PlannerRowControlsProps> = ({
  className,
  label,
  id,
  index,
  rowCount,
  onRowDelete,
  onRowRename,
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
    onRowUp(id, index)
  }
  const handleRowDownClick = () => {
    onRowDown(id, index)
  }
  const handleDeleteRowClick = () => {
    setDeleteVisibility(true)
  }

  const handleRenameCancel = () => {
    setRenameVisibility(false)
  }

  const handleRenameConfirm = (value: string) => {
    onRowRename(value, id, index)
    setRenameVisibility(false)
  }

  const handleDeleteCancel = () => {
    setDeleteVisibility(false)
  }
  const handleDeleteConfirm = () => {
    onRowDelete(id, index)
    setDeleteVisibility(false)
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
        <DropdownOption disabled={index === 0} onMouseDown={handleRowUpClick}>
          <FaAngleDoubleUp css={iconCss} /> Row Up
        </DropdownOption>
        <DropdownOption
          disabled={rowCount === index + 1}
          onMouseDown={handleRowDownClick}
        >
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
        onDelete={handleDeleteConfirm}
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
