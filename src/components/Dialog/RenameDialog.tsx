/** @jsx jsx */
import styled from '@emotion/styled'
import { FC, createRef } from 'react'
import { jsx } from '@emotion/react'
import { FormButton, Form, Input, IconButton, Button } from 'lib'
import { FiX } from 'react-icons/fi'
import { FaCheck } from 'react-icons/fa'
import { useOnClickOutside } from 'hooks'
import { Entries } from 'lib/FormElements/types'
import {
  Dialog,
  DialogLabel,
  CancelButton,
  submitCss,
  inputCss,
  iconCss,
} from './components'

export interface DialogProps {
  className?: string
  isVisible: boolean
  value?: string
  placeholder: string
  onClickOutside: () => void
  onCancel: () => void
  onConfirm: (value: string) => void
}

const RenameDialog: FC<DialogProps> = ({
  className,
  isVisible,
  value,
  placeholder,
  onClickOutside,
  onConfirm,
  onCancel,
}) => {
  const ref = createRef<HTMLDivElement>()
  useOnClickOutside(ref, onClickOutside, isVisible)

  const handleSubmit = (entries: Entries) => {
    const row = entries.label as string
    if (row && row.length) {
      onConfirm(row)
    }
  }
  const handleCancel = () => {
    onCancel()
  }

  return (
    <Form
      loading={false}
      error={undefined}
      rules={{}}
      autoComplete="off"
      onSubmit={handleSubmit}
    >
      <Dialog ref={ref} className={className} isVisible={isVisible}>
        <Flex>
          <DialogLabel>Rename</DialogLabel>
          <IconButton onMouseDown={handleCancel}>
            <FiX />
          </IconButton>
        </Flex>
        <Input
          type="text"
          name="label"
          placeholder={placeholder}
          defaultValue={value}
          css={inputCss}
        />
        <Flex>
          <CancelButton type="button" onMouseDown={handleCancel}>
            Cancel
          </CancelButton>
          <FormButton css={submitCss}>
            Confirm
            <FaCheck css={iconCss} />
          </FormButton>
        </Flex>
      </Dialog>
    </Form>
  )
}

const Flex = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
`

export default RenameDialog
