/** @jsx jsx */
import styled from '@emotion/styled'
import { jsx, css } from '@emotion/react'
import { FC } from 'react'
import { FormButton, IconButton } from 'lib'
import { FaTrashAlt, FaCheck } from 'react-icons/fa'

interface ActionBarProps {
  className?: string
  onCancel: () => void
  onDelete?: () => void
}

const ViewportModalActionBar: FC<ActionBarProps> = ({
  className,
  onCancel,
  onDelete,
}) => {
  return (
    <div className={className}>
      <FormButton css={buttonCss}>
        Confirm{' '}
        <FaCheck
          css={css`
            margin-left: 8px;
          `}
        />
      </FormButton>
      <CtrlButton onMouseDown={onDelete}>
        <FaTrashAlt />
      </CtrlButton>
    </div>
  )
}

export default styled(ViewportModalActionBar)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 64px;
  padding: 0 24px;
  background: ${({ theme }) => theme.color.blue[700]};
`

const CtrlButton = styled(IconButton)`
  padding: 12px 16px;
  /* background: ${({ theme }) => theme.color.blue[600]}; */
  border-right: 1px solid ${({ theme }) => theme.color.blue[700]};
  &:hover {
    background: ${({ theme }) => theme.color.blue[500]};
  }
  transition: all 0.3s ease-in-out;
`

const buttonCss = css`
  box-shadow: none;
  margin-right: 16px;
  padding: 10px 32px;
  &:hover {
    box-shadow: none;
  }
`
