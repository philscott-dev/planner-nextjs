/** @jsx jsx */
import styled from '@emotion/styled'
import { FC, createRef } from 'react'
import { jsx } from '@emotion/react'
import { FormButton, IconButton } from 'lib'
import { FiTrash2, FiX } from 'react-icons/fi'
import { useOnClickOutside } from 'hooks'
import { Entries } from 'lib/FormElements/types'
import {
  Dialog,
  DialogLabel,
  DialogText,
  CancelButton,
  deleteCss,
  iconCss,
} from './components'

export interface DialogProps {
  className?: string
  isVisible: boolean
  label: string
  onClickOutside: () => void
  onCancel: () => void
  onConfirm: (value: string) => void
}

const DeleteDialog: FC<DialogProps> = ({
  className,
  isVisible,
  label,
  onClickOutside,
  onConfirm,
  onCancel,
}) => {
  const ref = createRef<HTMLDivElement>()
  useOnClickOutside(ref, onClickOutside, true)

  const handleSubmit = (entries: Entries) => {
    const row = entries.label as string
    if (row && row.length) {
      console.log(row)
      onConfirm(row)
    }
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
        <CancelButton onMouseDown={handleCancel}>Cancel</CancelButton>
        <FormButton css={deleteCss}>
          Delete
          <FiTrash2 css={iconCss} />
        </FormButton>
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
