/** @jsx jsx */
import styled from '@emotion/styled'
import { jsx } from '@emotion/react'
import { FC } from 'react'
import { IconButton, Text } from 'components'

interface PlannerControlProps {
  className?: string
  onMouseDown: () => void
  text: string
}

const PlannerControl: FC<PlannerControlProps> = ({
  className,
  children,
  text,
  onMouseDown,
}) => {
  return (
    <div className={className}>
      <CtrlButton onMouseDown={onMouseDown}>{children}</CtrlButton>
      {/* <CtrlText>{text}</CtrlText> */}
    </div>
  )
}

export default styled(PlannerControl)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 64px;
  background: ${({ theme }) => theme.color.blue[700]};
`

const CtrlButton = styled(IconButton)`
  padding: 12px 16px;
  background: ${({ theme }) => theme.color.blue[600]};
  border-right: 1px solid ${({ theme }) => theme.color.blue[700]};
  &:hover {
    background: ${({ theme }) => theme.color.blue[500]};
  }
  transition: all 0.3s ease-in-out;
`

const CtrlText = styled.p`
  margin: 0;
  margin-top: 6px;
  font-weight: 400;
  font-size: 10px;
  color: ${({ theme }) => theme.color.white[100]};
  font-family: ${({ theme }) => theme.font.family};
`
