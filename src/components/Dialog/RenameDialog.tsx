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
  label: string
  onClickOutside: () => void
  onCancel: () => void
  onConfirm: (value: string) => void
}

const RenameDialog: FC<DialogProps> = ({
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
    <Form
      loading={false}
      error={undefined}
      rules={{}}
      autoComplete="off"
      onSubmit={handleSubmit}
    >
      <Dialog ref={ref} className={className} isVisible={isVisible}>
        <Flex>
          <DialogLabel>Rename Row</DialogLabel>
          <IconButton onMouseDown={handleCancel}>
            <FiX />
          </IconButton>
        </Flex>
        <Input
          type="text"
          name="label"
          placeholder="Label"
          defaultValue={label}
          css={inputCss}
        />
        <Flex>
          <CancelButton onMouseDown={handleCancel}>Cancel</CancelButton>
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
