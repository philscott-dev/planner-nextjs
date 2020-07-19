/** @jsx jsx */
import styled from '@emotion/styled'
import { jsx, css } from '@emotion/react'
import { FC } from 'react'
import { Button, FormButton } from 'components'

interface ActionBarProps {
  className?: string
  onCancel: () => void
}

const ViewportModalActionBar: FC<ActionBarProps> = ({
  className,
  onCancel,
}) => {
  return (
    <div className={className}>
      <FormButton css={buttonCss}>Confirm</FormButton>
      <Button.Tertiary onMouseDown={onCancel} css={buttonCss}>
        Cancel
      </Button.Tertiary>
    </div>
  )
}

export default styled(ViewportModalActionBar)`
  display: flex;
  align-items: center;
  height: 64px;
  padding: 0 24px;
  background: ${({ theme }) => theme.color.blue[700]};
`

const buttonCss = css`
  box-shadow: none;
  margin-right: 16px;
  padding: 10px 32px;
  &:hover {
    box-shadow: none;
  }
`
