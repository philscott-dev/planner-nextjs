/** @jsx jsx */
import styled from '@emotion/styled'
import { jsx, css } from '@emotion/react'
import { FC } from 'react'
import { FormButton, Button } from 'lib'

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
      <Button.Tertiary type="reset" css={buttonCss} onMouseDown={onCancel}>
        Cancel
      </Button.Tertiary>
      <FormButton css={buttonCss}>Confirm</FormButton>
    </div>
  )
}

export default styled(ViewportModalActionBar)`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  height: 64px;
  padding: 0 24px;
  background: ${({ theme }) => theme.color.blue[700]};
  @media screen and (max-width: ${({ theme }) => theme.breakpoint.xsmall}) {
    padding: 0 16px;
  }
`

// const CtrlButton = styled(IconButton)`
//   padding: 12px 16px;
//   /* background: ${({ theme }) => theme.color.blue[600]}; */
//   border-right: 1px solid ${({ theme }) => theme.color.blue[700]};
//   &:hover {
//     background: ${({ theme }) => theme.color.blue[500]};
//   }
//   transition: all 0.3s ease-in-out;
// `

const buttonCss = css`
  box-shadow: none;
  margin-left: 16px;
  min-width: 48px;
  padding: 10px 32px;
  &:hover {
    box-shadow: none;
  }
  &:nth-of-type(1) {
    margin-left: 0;
  }
`
