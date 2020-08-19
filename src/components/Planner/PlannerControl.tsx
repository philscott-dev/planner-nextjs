/** @jsx jsx */
import styled from '@emotion/styled'
import { jsx } from '@emotion/react'
import { FC } from 'react'
import { IconButton } from 'lib'

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
      <CtrlText>{text}</CtrlText>
    </div>
  )
}

export default styled(PlannerControl)`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: ${({ theme }) => theme.color.blue[700]};
  &:hover {
    > p {
      opacity: 1;
      top: 100%;
    }
  }
`

const CtrlButton = styled(IconButton)`
  padding: 12px 16px;
  background: ${({ theme }) => theme.color.blue[600]};
  border-right: 1px solid ${({ theme }) => theme.color.blue[700]};
  &:hover {
    background: ${({ theme }) => theme.color.blue[500]};
  }
  transition: ${({ theme }) => theme.transition.all};
`

const CtrlText = styled.p`
  position: absolute;
  white-space: nowrap;
  margin: 0;
  margin-top: 4px;
  top: calc(100% - 1px);
  font-weight: 400;
  font-size: 12px;
  color: ${({ theme }) => theme.color.white[100]};
  font-family: ${({ theme }) => theme.font.family};
  opacity: 0;
  transition: ${({ theme }) => theme.transition.all};
`
