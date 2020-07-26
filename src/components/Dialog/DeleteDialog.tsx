/** @jsx jsx */
import styled from '@emotion/styled'
import { FC, createRef, useRef } from 'react'
import { jsx } from '@emotion/react'
import { IconButton, Button } from 'lib'
import { FiTrash2, FiX } from 'react-icons/fi'
import { useOnClickOutside, useIntersectionObserver } from 'hooks'
import {
  Dialog,
  DialogLabel,
  DialogText,
  CancelButton,
  deleteCss,
  iconCss,
} from './components'

export interface DialogProps {
  id?: string | number
  className?: string
  isVisible: boolean
  label: string
  onClickOutside: () => void
  onCancel: () => void
  onDelete: () => void
}

const DeleteDialog: FC<DialogProps> = ({
  className,
  id,
  isVisible,
  label,
  onClickOutside,
  onDelete,
  onCancel,
}) => {
  const ref = useRef<HTMLDivElement>(null)
  useOnClickOutside(ref, onClickOutside, true)

  const handleDelete = () => {
    onDelete()
  }
  const handleCancel = () => {
    onCancel()
  }

  return (
    <Dialog ref={ref} className={className} isVisible={isVisible}>
      <Flex>
        <DialogLabel>Delete Row - {label}</DialogLabel>
        <IconButton onMouseDown={handleCancel}>
          <FiX />
        </IconButton>
      </Flex>
      <DialogText>
        Are you sure you want to permanently delete this row?
      </DialogText>
      <Flex>
        <CancelButton type="button" onMouseDown={handleCancel}>
          Cancel
        </CancelButton>
        <Button.Primary onMouseDown={handleDelete} css={deleteCss}>
          Delete
          <FiTrash2 css={iconCss} />
        </Button.Primary>
      </Flex>
    </Dialog>
  )
}

const Flex = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
`

export default DeleteDialog
